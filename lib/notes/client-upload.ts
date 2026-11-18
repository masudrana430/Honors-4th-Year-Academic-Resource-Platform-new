export const MAX_NOTE_UPLOAD_BYTES = 25 * 1024 * 1024;

const UPLOAD_CHUNK_BYTES = 4 * 1024 * 1024;
type UploadProgress = (percent: number) => void;

async function readJsonResponse(response: Response): Promise<Record<string, any>> {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function uploadStudyNoteFile({
  file,
  password,
  metadata,
  onProgress,
}: {
  file: File;
  password: string;
  metadata: Record<string, string>;
  onProgress?: UploadProgress;
}): Promise<{ message?: string; note?: { id: string; title: string } }> {
  if (file.size <= 0 || file.size > MAX_NOTE_UPLOAD_BYTES) {
    throw new Error('Choose a file between 1 byte and 25 MB.');
  }

  const signature = Array.from(
    new Uint8Array(await file.slice(0, 12).arrayBuffer())
  );

  const sessionResponse = await fetch('/api/admin/notes/upload-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-content-upload-password': password,
    },
    body: JSON.stringify({
      ...metadata,
      fileName: file.name,
      mimeType: file.type,
      fileSize: file.size,
      signature,
    }),
  });
  const sessionData = await readJsonResponse(sessionResponse);
  if (!sessionResponse.ok || typeof sessionData.uploadUrl !== 'string') {
    throw new Error(sessionData.error || 'Could not start the Google Drive upload.');
  }

  let uploadedFileId = '';
  for (let start = 0; start < file.size; start += UPLOAD_CHUNK_BYTES) {
    const endExclusive = Math.min(start + UPLOAD_CHUNK_BYTES, file.size);
    const end = endExclusive - 1;
    const chunk = file.slice(start, endExclusive);

    const chunkResponse = await fetch('/api/admin/notes/upload-chunk', {
      method: 'PUT',
      headers: {
        'Content-Type': file.type || 'application/octet-stream',
        'Content-Range': `bytes ${start}-${end}/${file.size}`,
        'x-content-upload-password': password,
        'x-drive-upload-url': sessionData.uploadUrl,
      },
      body: chunk,
      cache: 'no-store',
    });
    const chunkData = await readJsonResponse(chunkResponse);

    if (!chunkResponse.ok) {
      throw new Error(chunkData.error || `Upload chunk failed (HTTP ${chunkResponse.status}).`);
    }

    if (chunkData.complete === true && typeof chunkData.file?.id === 'string') {
      uploadedFileId = chunkData.file.id;
    } else if (chunkData.complete !== false) {
      throw new Error('Google Drive returned an unexpected chunk upload response.');
    }

    onProgress?.(Math.min(99, Math.round((endExclusive / file.size) * 100)));
  }

  if (!uploadedFileId) {
    throw new Error('Google Drive did not confirm the completed file upload.');
  }

  const completeResponse = await fetch('/api/admin/notes/upload-complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-content-upload-password': password,
    },
    body: JSON.stringify({ ...metadata, fileId: uploadedFileId }),
  });
  const completeData = await readJsonResponse(completeResponse);
  if (!completeResponse.ok) {
    throw new Error(completeData.error || 'The file uploaded, but the note could not be saved.');
  }
  onProgress?.(100);
  return completeData;
}
