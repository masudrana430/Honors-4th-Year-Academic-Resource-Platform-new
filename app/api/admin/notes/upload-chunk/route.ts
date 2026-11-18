import { NextRequest, NextResponse } from 'next/server';
import { requireContributionPassword } from '@/lib/contribution-auth';

export const runtime = 'nodejs';

const MAX_CHUNK_BYTES = 4 * 1024 * 1024;
const MAX_FILE_BYTES = 25 * 1024 * 1024;

function isValidUploadUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      url.hostname === 'www.googleapis.com' &&
      url.pathname === '/upload/drive/v3/files' &&
      url.searchParams.get('uploadType') === 'resumable' &&
      Boolean(url.searchParams.get('upload_id'));
  } catch {
    return false;
  }
}

export async function PUT(request: NextRequest) {
  const authError = requireContributionPassword(request);
  if (authError) return authError;

  try {
    const uploadUrl = request.headers.get('x-drive-upload-url') || '';
    const contentRange = request.headers.get('content-range') || '';
    const mimeType = request.headers.get('content-type') || 'application/octet-stream';
    const rangeMatch = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(contentRange);

    if (!isValidUploadUrl(uploadUrl)) {
      return NextResponse.json({ error: 'Invalid or expired Google Drive upload session.' }, { status: 400 });
    }
    if (!rangeMatch) {
      return NextResponse.json({ error: 'Invalid upload chunk range.' }, { status: 400 });
    }

    const start = Number(rangeMatch[1]);
    const end = Number(rangeMatch[2]);
    const total = Number(rangeMatch[3]);
    const expectedChunkSize = end - start + 1;

    if (
      !Number.isSafeInteger(start) ||
      !Number.isSafeInteger(end) ||
      !Number.isSafeInteger(total) ||
      start < 0 ||
      end < start ||
      total <= 0 ||
      total > MAX_FILE_BYTES ||
      expectedChunkSize <= 0 ||
      expectedChunkSize > MAX_CHUNK_BYTES
    ) {
      return NextResponse.json({ error: 'Upload chunk is outside the allowed size or range.' }, { status: 400 });
    }

    const chunk = await request.arrayBuffer();
    if (chunk.byteLength !== expectedChunkSize) {
      return NextResponse.json({ error: 'Upload chunk size does not match its Content-Range.' }, { status: 400 });
    }

    const driveResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': mimeType,
        'Content-Length': String(chunk.byteLength),
        'Content-Range': contentRange,
      },
      body: chunk,
      redirect: 'manual',
      cache: 'no-store',
    });

    if (driveResponse.status === 308) {
      return NextResponse.json({
        complete: false,
        range: driveResponse.headers.get('range'),
      });
    }

    if (driveResponse.status !== 200 && driveResponse.status !== 201) {
      const detail = (await driveResponse.text()).slice(0, 1000);
      console.error('Google Drive chunk upload failed:', driveResponse.status, detail);
      return NextResponse.json({
        error: `Google Drive rejected an upload chunk (HTTP ${driveResponse.status}).`,
      }, { status: 502 });
    }

    const result = await driveResponse.json() as { id?: unknown };
    if (typeof result.id !== 'string' || !result.id) {
      return NextResponse.json({ error: 'Google Drive did not confirm the uploaded file.' }, { status: 502 });
    }

    return NextResponse.json({ complete: true, file: { id: result.id } });
  } catch (error) {
    console.error('Google Drive chunk proxy error:', error);
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Could not transfer the upload chunk.',
    }, { status: 500 });
  }
}
