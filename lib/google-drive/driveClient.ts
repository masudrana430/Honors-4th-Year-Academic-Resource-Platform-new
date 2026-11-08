import { google, drive_v3 } from 'googleapis';

/**
 * Personal Gmail OAuth client. The refresh token belongs to the Google account
 * that owns the Drive files; it stays on the server and is never sent to browsers.
 */
export function getGoogleDriveClient(): drive_v3.Drive {
  const { GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REFRESH_TOKEN } = process.env;
  if (!GOOGLE_DRIVE_CLIENT_ID || !GOOGLE_DRIVE_CLIENT_SECRET || !GOOGLE_DRIVE_REFRESH_TOKEN) {
    throw new Error(
      'Google Drive OAuth is not configured. Set GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET and GOOGLE_DRIVE_REFRESH_TOKEN in the server environment.'
    );
  }

  const redirectUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
  const auth = new google.auth.OAuth2(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, redirectUri);
  auth.setCredentials({ refresh_token: GOOGLE_DRIVE_REFRESH_TOKEN });
  return google.drive({ version: 'v3', auth });
}

/** Builds direct embed/preview and download URLs from a Google Drive File ID. */
export function buildGoogleDriveUrls(driveFileId: string): {
  previewUrl: string; viewUrl: string; downloadUrl: string; thumbnailUrl: string;
} {
  return {
    previewUrl: `https://drive.google.com/file/d/${encodeURIComponent(driveFileId)}/preview`,
    viewUrl: `https://drive.google.com/file/d/${encodeURIComponent(driveFileId)}/view?usp=sharing`,
    downloadUrl: `https://drive.google.com/uc?export=download&id=${encodeURIComponent(driveFileId)}`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${encodeURIComponent(driveFileId)}&sz=w1000`,
  };
}

/**
 * Creates/locates folders under the user's My Drive folder configured by
 * GOOGLE_DRIVE_FOLDER_ID. Create this root folder manually once in My Drive.
 */
export async function ensureDriveFolderHierarchy(pathSegments: string[]): Promise<string> {
  const drive = getGoogleDriveClient();
  const rootSearch = await drive.files.list({
    q: "name = 'Honors_4th_Year' and mimeType = 'application/vnd.google-apps.folder' and 'root' in parents and trashed = false",
    fields: 'files(id, name)',
    spaces: 'drive',
  });
  let parentId = rootSearch.data.files?.[0]?.id;
  if (!parentId) {
    const rootCreated = await drive.files.create({
      requestBody: { name: 'Honors_4th_Year', mimeType: 'application/vnd.google-apps.folder' },
      fields: 'id',
    });
    parentId = rootCreated.data.id;
  }
  if (!parentId) throw new Error('Could not create or locate the Honors_4th_Year folder in My Drive.');
  for (const folderName of pathSegments) {
    const escapedName = folderName.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const response = await drive.files.list({
      q: `'${parentId}' in parents and name = '${escapedName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    });
    const existingId = response.data.files?.[0]?.id;
    if (existingId) {
      parentId = existingId;
      continue;
    }
    const created = await drive.files.create({
      requestBody: { name: folderName, mimeType: 'application/vnd.google-apps.folder', parents: [parentId] },
      fields: 'id',
    });
    if (!created.data.id) throw new Error(`Failed to create Google Drive folder: ${folderName}`);
    parentId = created.data.id;
  }
  return parentId;
}
