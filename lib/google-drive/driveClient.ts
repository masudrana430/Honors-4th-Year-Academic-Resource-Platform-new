import { google, drive_v3 } from 'googleapis';

/**
 * Server-side Google Drive API client using Service Account credentials.
 * Credentials are strictly read from server environment variables and never exposed to the client.
 */
export function getGoogleDriveClient(): drive_v3.Drive {
  const clientEmail = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_DRIVE_PRIVATE_KEY;

  if (!clientEmail || !rawPrivateKey) {
    throw new Error(
      'Missing GOOGLE_DRIVE_CLIENT_EMAIL or GOOGLE_DRIVE_PRIVATE_KEY in server environment variables.'
    );
  }

  const privateKey = rawPrivateKey.replace(/\\n/g, '\n');

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });

  return google.drive({ version: 'v3', auth });
}

/**
 * Builds direct embed/preview and download URLs from a Google Drive File ID.
 */
export function buildGoogleDriveUrls(driveFileId: string) {
  return {
    previewUrl: `https://drive.google.com/file/d/${encodeURIComponent(driveFileId)}/preview`,
    viewUrl: `https://drive.google.com/file/d/${encodeURIComponent(driveFileId)}/view?usp=sharing`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${encodeURIComponent(driveFileId)}`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveFileId)}&sz=w1000`,
  };
}

/**
 * Ensures a structured folder hierarchy exists inside Google Drive:
 * Google Drive / Honors_4th_Year / Subject_XX / Chapter_XX / Topic_XX
 */
export async function ensureDriveFolderHierarchy(
  pathSegments: string[]
): Promise<string> {
  const drive = getGoogleDriveClient();
  let currentParentId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!currentParentId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured.');
  }

  for (const folderName of pathSegments) {
    const escapedName = folderName.replace(/'/g, "\\'");
    const listRes = await drive.files.list({
      q: `'${currentParentId}' in parents and name = '${escapedName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });

    if (listRes.data.files && listRes.data.files.length > 0 && listRes.data.files[0].id) {
      currentParentId = listRes.data.files[0].id;
    } else {
      const createRes = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [currentParentId],
        },
        fields: 'id',
      });
      if (!createRes.data.id) {
        throw new Error(`Failed to create Google Drive folder: ${folderName}`);
      }
      currentParentId = createRes.data.id;
    }
  }

  return currentParentId;
}
