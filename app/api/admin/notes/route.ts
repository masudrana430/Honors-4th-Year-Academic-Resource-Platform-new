import { NextRequest, NextResponse } from 'next/server';
import { Readable } from 'node:stream';
import { prisma } from '@/lib/prisma/client';
import { ensureDriveFolderHierarchy, getGoogleDriveClient } from '@/lib/google-drive/driveClient';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 4 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, 'PDF' | 'JPG' | 'PNG' | 'WEBP'> = {
  'application/pdf': 'PDF',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
};

function hasValidFileSignature(bytes: Buffer, mimeType: string): boolean {
  if (mimeType === 'application/pdf') return bytes.subarray(0, 5).toString() === '%PDF-';
  if (mimeType === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (mimeType === 'image/png') return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  if (mimeType === 'image/webp') return bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP';
  return false;
}

export async function GET(_request: NextRequest) {
  try {
    const subjects = await prisma.subject.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        chapters: {
          orderBy: { chapterNumber: 'asc' },
          select: {
            id: true,
            title: true,
            chapterNumber: true,
            topics: {
              orderBy: { topicNumber: 'asc' },
              select: { id: true, title: true, topicNumber: true },
            },
          },
        },
      },
    });
    return NextResponse.json({ subjects });
  } catch (error) {
    console.error('Admin note taxonomy error:', error);
    return NextResponse.json({ error: 'Could not load subjects and topics.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let uploadedDriveFileId: string | undefined;

  try {
    const formData = await request.formData();
    const subjectId = String(formData.get('subjectId') || '');
    const chapterId = String(formData.get('chapterId') || '');
    const topicId = String(formData.get('topicId') || '');
    const title = String(formData.get('title') || '').trim();
    const summary = String(formData.get('summary') || '').trim();
    const author = String(formData.get('author') || '').trim();
    const file = formData.get('file');

    if (!subjectId || !chapterId || !topicId || !title) {
      return NextResponse.json({ error: 'Subject, chapter, topic and note title are required.' }, { status: 400 });
    }
    if (title.length > 180 || summary.length > 2000 || author.length > 120) {
      return NextResponse.json({ error: 'Title, description or author exceeds the allowed length.' }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Choose a PDF, JPG, PNG or WEBP file.' }, { status: 400 });
    }
    if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File must be between 1 byte and 4 MB.' }, { status: 400 });
    }
    const fileType = ALLOWED_TYPES[file.type];
    if (!fileType) {
      return NextResponse.json({ error: 'Only PDF, JPG, PNG and WEBP files are supported.' }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (!hasValidFileSignature(bytes, file.type)) {
      return NextResponse.json({ error: 'The file content does not match its selected PDF or image type.' }, { status: 400 });
    }

    const topic = await prisma.topic.findFirst({
      where: { id: topicId, chapterId, subjectId },
      include: { chapter: { include: { subject: true } } },
    });
    if (!topic) {
      return NextResponse.json({ error: 'The selected topic does not belong to the selected chapter and subject.' }, { status: 400 });
    }

    const folderId = await ensureDriveFolderHierarchy([
      'Honors_4th_Year',
      `Subject_${topic.chapter.subject.code || topic.chapter.subject.slug}`,
      `Chapter_${String(topic.chapter.chapterNumber).padStart(2, '0')}`,
      `Topic_${String(topic.topicNumber).padStart(2, '0')}`,
    ]);

    const drive = getGoogleDriveClient();
    const driveResponse = await drive.files.create({
      requestBody: {
        name: file.name.split(String.fromCharCode(92)).join('_').replaceAll('/', '_'),
        mimeType: file.type,
        parents: [folderId],
      },
      media: { mimeType: file.type, body: Readable.from(bytes) },
      fields: 'id, webViewLink, size',
      supportsAllDrives: true,
    });

    uploadedDriveFileId = driveResponse.data.id || undefined;
    if (!uploadedDriveFileId) throw new Error('Google Drive did not return a file ID.');

    await drive.permissions.create({
      fileId: uploadedDriveFileId,
      requestBody: { type: 'anyone', role: 'reader' },
      fields: 'id',
      supportsAllDrives: true,
    });

    const driveShareUrl = driveResponse.data.webViewLink ||
      `https://drive.google.com/file/d/${uploadedDriveFileId}/view`;
    const driveFolderPath = [
      'Google Drive/Honors_4th_Year',
      `Subject_${topic.chapter.subject.code || topic.chapter.subject.slug}`,
      `Chapter_${String(topic.chapter.chapterNumber).padStart(2, '0')}`,
      `Topic_${String(topic.topicNumber).padStart(2, '0')}`,
    ].join('/');

    const saved = await prisma.$transaction(async (tx) => {
      const note = await tx.studyNote.create({
        data: {
          subjectId,
          chapterId,
          topicId,
          title,
          summary,
          author: author || null,
        },
      });
      const savedFile = await tx.file.create({
        data: {
          subjectId,
          chapterId,
          topicId,
          studyNoteId: note.id,
          fileName: file.name,
          fileType,
          mimeType: file.type,
          driveFileId: uploadedDriveFileId!,
          driveShareUrl,
          driveFolderPath,
          fileSize: file.size,
        },
      });
      return { note, file: savedFile };
    });

    return NextResponse.json({
      message: 'Study note uploaded and linked to the selected topic.',
      note: { id: saved.note.id, title: saved.note.title },
      file: { id: saved.file.id, fileName: saved.file.fileName, driveShareUrl: saved.file.driveShareUrl },
    }, { status: 201 });
  } catch (error) {
    if (uploadedDriveFileId) {
      try {
        await getGoogleDriveClient().files.delete({ fileId: uploadedDriveFileId, supportsAllDrives: true });
      } catch (cleanupError) {
        console.error('Could not clean up an unlinked Drive upload:', cleanupError);
      }
    }
    console.error('Admin topic note upload error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Upload failed. Check server logs and Google Drive configuration.',
    }, { status: 500 });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    const { noteId } = await request.json();
    if (typeof noteId !== 'string' || !noteId.trim()) {
      return NextResponse.json({ error: 'A valid note ID is required.' }, { status: 400 });
    }

    const note = await prisma.studyNote.findUnique({
      where: { id: noteId },
      include: { files: true },
    });
    if (!note) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });

    const drive = getGoogleDriveClient();
    for (const file of note.files) {
      await drive.files.delete({ fileId: file.driveFileId, supportsAllDrives: true });
    }
    await prisma.studyNote.delete({ where: { id: noteId } });

    return NextResponse.json({ message: 'Note and its uploaded files were deleted.' });
  } catch (error) {
    console.error('Public note deletion error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Could not delete this note.',
    }, { status: 500 });
  }
}
