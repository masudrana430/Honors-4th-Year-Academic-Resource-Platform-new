export const MAX_NOTE_UPLOAD_BYTES = 25 * 1024 * 1024;

type UploadProgress = (percent: number) => void;

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
  const sessionData = await sessionResponse.json();
  if (!sessionResponse.ok || typeof sessionData.uploadUrl !== 'string') {
    throw new Error(sessionData.error || 'Could not start the Google Drive upload.');
  }

  const uploadedFile = await new Promise<{ id: string }>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', sessionData.uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress?.(Math.min(99, Math.round((event.loaded / event.total) * 100)));
      }
    };
    xhr.onload = () => {
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(`Google Drive upload failed (${xhr.status}). Please try again.`));
        return;
      }
      try {
        const result = JSON.parse(xhr.responseText || '{}');
        if (typeof result.id !== 'string' || !result.id) {
          reject(new Error('Google Drive did not confirm the uploaded file.'));
          return;
        }
        resolve({ id: result.id });
      } catch {
        reject(new Error('Google Drive returned an invalid upload response.'));
      }
    };
    xhr.onerror = () => reject(new Error('Network error while uploading to Google Drive.'));
    xhr.onabort = () => reject(new Error('The upload was cancelled.'));
    xhr.send(file);
  });

  const completeResponse = await fetch('/api/admin/notes/upload-complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-content-upload-password': password,
    },
    body: JSON.stringify({ ...metadata, fileId: uploadedFile.id }),
  });
  const completeData = await completeResponse.json();
  if (!completeResponse.ok) {
    throw new Error(completeData.error || 'The file uploaded, but the note could not be saved.');
  }
  onProgress?.(100);
  return completeData;
}
