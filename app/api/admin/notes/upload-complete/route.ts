import { NextRequest, NextResponse } from 'next/server';
import { drive_v3 } from 'googleapis';
import { prisma } from '@/lib/prisma/client';
import { ensureDriveFolderHierarchy, getGoogleDriveClient } from '@/lib/google-drive/driveClient';
import { requireContributionPassword } from '@/lib/contribution-auth';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES: Record<string, 'PDF' | 'JPG' | 'PNG' | 'WEBP'> = {
  'application/pdf': 'PDF',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
};

function buildFolderSegments(subjectCode: string, subjectSlug: string, chapterNumber: number, topicNumber: number) {
  return [
    `Subject_${subjectCode || subjectSlug}`,
    `Chapter_${String(chapterNumber).padStart(2, '0')}`,
    `Topic_${String(topicNumber).padStart(2, '0')}`,
  ];
}

async function getValidatedDriveFile(fileId: string, folderId: string) {
  const drive = getGoogleDriveClient();
  const response: { data: drive_v3.Schema$File } = await drive.files.get({
    fileId,
    fields: 'id,name,mimeType,size,webViewLink,parents,trashed',
    supportsAllDrives: true,
  });
  const file = response.data;
  const fileSize = Number(file.size);
  const fileType = file.mimeType ? ALLOWED_TYPES[file.mimeType] : undefined;

  if (!file.id || file.trashed || !file.parents?.includes(folderId)) {
    throw new Error('The uploaded file could not be verified in the selected topic folder.');
  }
  if (!file.name || !fileType || !Number.isSafeInteger(fileSize) || fileSize <= 0 || fileSize > MAX_FILE_SIZE) {
    throw new Error('The uploaded file must be a valid PDF or image no larger than 25 MB.');
  }

  return {
    fileName: file.name,
    fileType,
    mimeType: file.mimeType!,
    fileSize,
    driveShareUrl: file.webViewLink || `https://drive.google.com/file/d/${file.id}/view`,
    driveFileId: file.id,
  };
}

export async function POST(request: NextRequest) {
  const authError = requireContributionPassword(request);
  if (authError) return authError;

  let uploadedDriveFileId: string | undefined;
  let verifiedInTargetFolder = false;

  try {
    const body = await request.json();
    const mode = body.mode;
    const fileId = typeof body.fileId === 'string' ? body.fileId.trim() : '';
    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const summary = typeof body.summary === 'string' ? body.summary.trim() : '';
    const author = typeof body.author === 'string' ? body.author.trim() : '';

    if (!fileId || !/^[a-zA-Z0-9_-]{10,200}$/.test(fileId)) {
      return NextResponse.json({ error: 'A valid uploaded Drive file is required.' }, { status: 400 });
    }
    if (title.length < 3 || title.length > 180 || summary.length > 2000 || author.length > 120) {
      return NextResponse.json({ error: 'Title, description or author exceeds the allowed length.' }, { status: 400 });
    }

    const drive = getGoogleDriveClient();

    if (mode === 'create') {
      const subjectId = String(body.subjectId || '');
      const chapterId = String(body.chapterId || '');
      const topicId = String(body.topicId || '');
      if (!subjectId || !chapterId || !topicId) {
        return NextResponse.json({ error: 'Subject, chapter and topic are required.' }, { status: 400 });
      }

      const topic = await prisma.topic.findFirst({
        where: { id: topicId, chapterId, subjectId },
        include: { chapter: { include: { subject: true } } },
      });
      if (!topic) {
        return NextResponse.json({ error: 'The selected topic does not belong to the selected chapter and subject.' }, { status: 400 });
      }

      const folderSegments = buildFolderSegments(
        topic.chapter.subject.code || '',
        topic.chapter.subject.slug,
        topic.chapter.chapterNumber,
        topic.topicNumber
      );
      const folderId = await ensureDriveFolderHierarchy(folderSegments);
      const fileData = await getValidatedDriveFile(fileId, folderId);
      uploadedDriveFileId = fileData.driveFileId;
      verifiedInTargetFolder = true;

      await drive.permissions.create({
        fileId,
        requestBody: { type: 'anyone', role: 'reader' },
        fields: 'id',
        supportsAllDrives: true,
      });

      const driveFolderPath = ['Google Drive/Honors_4th_Year', ...folderSegments].join('/');
      const saved = await prisma.$transaction(async (tx) => {
        const note = await tx.studyNote.create({
          data: { subjectId, chapterId, topicId, title, summary, author: author || null },
        });
        const file = await tx.file.create({
          data: {
            subjectId,
            chapterId,
            topicId,
            studyNoteId: note.id,
            ...fileData,
            driveFolderPath,
          },
        });
        return { note, file };
      });

      return NextResponse.json({
        message: 'Study note uploaded and linked to the selected topic.',
        note: { id: saved.note.id, title: saved.note.title },
        file: { id: saved.file.id, fileName: saved.file.fileName, driveShareUrl: saved.file.driveShareUrl },
      }, { status: 201 });
    }

    if (mode === 'replace') {
      const noteId = typeof body.noteId === 'string' ? body.noteId.trim() : '';
      if (!noteId) return NextResponse.json({ error: 'A valid note ID is required.' }, { status: 400 });

      const note = await prisma.studyNote.findUnique({
        where: { id: noteId },
        include: {
          topic: true,
          chapter: { include: { subject: true } },
          files: { orderBy: { createdAt: 'asc' } },
        },
      });
      if (!note) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });

      const folderSegments = buildFolderSegments(
        note.chapter.subject.code || '',
        note.chapter.subject.slug,
        note.chapter.chapterNumber,
        note.topic.topicNumber
      );
      const folderId = await ensureDriveFolderHierarchy(folderSegments);
      const fileData = await getValidatedDriveFile(fileId, folderId);
      uploadedDriveFileId = fileData.driveFileId;
      verifiedInTargetFolder = true;

      await drive.permissions.create({
        fileId,
        requestBody: { type: 'anyone', role: 'reader' },
        fields: 'id',
        supportsAllDrives: true,
      });

      const driveFolderPath = ['Google Drive/Honors_4th_Year', ...folderSegments].join('/');
      await prisma.$transaction(async (tx) => {
        await tx.studyNote.update({
          where: { id: noteId },
          data: { title, summary, author: author || null },
        });

        const existingFile = note.files[0];
        if (existingFile) {
          await tx.file.update({ where: { id: existingFile.id }, data: { ...fileData, driveFolderPath } });
        } else {
          await tx.file.create({
            data: {
              ...fileData,
              driveFolderPath,
              subjectId: note.subjectId,
              chapterId: note.chapterId,
              topicId: note.topicId,
              studyNoteId: note.id,
            },
          });
        }
      });

      if (note.files[0]) {
        try {
          await drive.files.delete({ fileId: note.files[0].driveFileId, supportsAllDrives: true });
        } catch (cleanupError) {
          console.error('Could not delete replaced Google Drive note file:', cleanupError);
        }
      }

      return NextResponse.json({ message: 'Study note and its replacement file updated successfully.' });
    }

    return NextResponse.json({ error: 'Invalid upload operation.' }, { status: 400 });
  } catch (error) {
    if (uploadedDriveFileId && verifiedInTargetFolder) {
      try {
        await getGoogleDriveClient().files.delete({ fileId: uploadedDriveFileId, supportsAllDrives: true });
      } catch (cleanupError) {
        console.error('Could not clean up an unlinked Drive upload:', cleanupError);
      }
    }
    console.error('Complete note upload error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Could not save the uploaded note.',
    }, { status: 500 });
  }
}
