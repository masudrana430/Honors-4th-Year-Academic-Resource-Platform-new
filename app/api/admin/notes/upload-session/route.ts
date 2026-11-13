import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { getGoogleDriveAccessToken, ensureDriveFolderHierarchy } from '@/lib/google-drive/driveClient';
import { requireContributionPassword } from '@/lib/contribution-auth';

export const runtime = 'nodejs';

const MAX_FILE_SIZE = 25 * 1024 * 1024;
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

function safeFileName(value: string): string {
  return value
    .split(String.fromCharCode(92)).join('_')
    .replaceAll('/', '_')
    .replace(/[\u0000-\u001f]/g, '_')
    .trim()
    .slice(0, 180);
}

export async function POST(request: NextRequest) {
  const authError = requireContributionPassword(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const mode = body.mode;
    const fileName = typeof body.fileName === 'string' ? safeFileName(body.fileName) : '';
    const mimeType = typeof body.mimeType === 'string' ? body.mimeType : '';
    const fileSize = Number(body.fileSize);
    const fileType = ALLOWED_TYPES[mimeType];
    const signature = Array.isArray(body.signature) &&
      body.signature.length <= 12 &&
      body.signature.every((value: unknown) => Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 255)
      ? Buffer.from(body.signature)
      : Buffer.alloc(0);

    if (mode !== 'create' && mode !== 'replace') {
      return NextResponse.json({ error: 'Invalid upload operation.' }, { status: 400 });
    }
    if (!fileName || !fileType || !Number.isSafeInteger(fileSize) || fileSize <= 0 || fileSize > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'Choose a PDF, JPG, PNG or WEBP file no larger than 25 MB.' }, { status: 400 });
    }
    if (!hasValidFileSignature(signature, mimeType)) {
      return NextResponse.json({ error: 'The selected file does not have a valid PDF or image signature.' }, { status: 400 });
    }

    let folderSegments: string[];

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

      folderSegments = [
        `Subject_${topic.chapter.subject.code || topic.chapter.subject.slug}`,
        `Chapter_${String(topic.chapter.chapterNumber).padStart(2, '0')}`,
        `Topic_${String(topic.topicNumber).padStart(2, '0')}`,
      ];
    } else {
      const noteId = String(body.noteId || '').trim();
      if (!noteId) return NextResponse.json({ error: 'A valid note ID is required.' }, { status: 400 });

      const note = await prisma.studyNote.findUnique({
        where: { id: noteId },
        include: { topic: true, chapter: { include: { subject: true } } },
      });
      if (!note) return NextResponse.json({ error: 'Note not found.' }, { status: 404 });

      folderSegments = [
        `Subject_${note.chapter.subject.code || note.chapter.subject.slug}`,
        `Chapter_${String(note.chapter.chapterNumber).padStart(2, '0')}`,
        `Topic_${String(note.topic.topicNumber).padStart(2, '0')}`,
      ];
    }

    const folderId = await ensureDriveFolderHierarchy(folderSegments);
    const accessToken = await getGoogleDriveAccessToken();
    const uploadEndpoint = new URL('https://www.googleapis.com/upload/drive/v3/files');
    uploadEndpoint.searchParams.set('uploadType', 'resumable');
    uploadEndpoint.searchParams.set('supportsAllDrives', 'true');
    uploadEndpoint.searchParams.set('fields', 'id,name,mimeType,size,webViewLink,parents');

    const driveResponse = await fetch(uploadEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Type': mimeType,
        'X-Upload-Content-Length': String(fileSize),
      },
      body: JSON.stringify({
        name: fileName,
        mimeType,
        parents: [folderId],
      }),
      cache: 'no-store',
    });

    if (!driveResponse.ok) {
      const detail = await driveResponse.text();
      console.error('Google Drive upload session error:', driveResponse.status, detail);
      return NextResponse.json({ error: 'Google Drive could not start the upload. Please try again.' }, { status: 502 });
    }

    const uploadUrl = driveResponse.headers.get('location');
    if (!uploadUrl || !uploadUrl.startsWith('https://www.googleapis.com/upload/drive/v3/files?')) {
      return NextResponse.json({ error: 'Google Drive did not return a valid upload session.' }, { status: 502 });
    }

    return NextResponse.json({ uploadUrl });
  } catch (error) {
    console.error('Note upload session error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Could not start the upload.',
    }, { status: 500 });
  }
}
