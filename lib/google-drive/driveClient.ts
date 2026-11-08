import { google, drive_v3 } from 'googleapis';

/**
 * Server-side Google Drive API client using Service Account credentials.
 * The service account must be a member of a Google Shared Drive because service
 * accounts do not have personal Drive storage quota.
 */
export function getGoogleDriveClient(): drive_v3.Drive {
  const clientEmail: string | undefined = process.env.GOOGLE_DRIVE_CLIENT_EMAIL;
  const rawPrivateKey: string | undefined = process.env.GOOGLE_DRIVE_PRIVATE_KEY;

  if (!clientEmail || !rawPrivateKey) {
    throw new Error(
      'Missing GOOGLE_DRIVE_CLIENT_EMAIL or GOOGLE_DRIVE_PRIVATE_KEY in server environment variables.'
    );
  }

  const privateKey: string = rawPrivateKey.replace(/\\n/g, '\n');

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
export function buildGoogleDriveUrls(driveFileId: string): {
  previewUrl: string;
  viewUrl: string;
  downloadUrl: string;
  thumbnailUrl: string;
} {
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
  const drive: drive_v3.Drive = getGoogleDriveClient();
  const rootFolderId: string | undefined = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!rootFolderId) {
    throw new Error('GOOGLE_DRIVE_FOLDER_ID is not configured.');
  }

  let currentParentId: string = rootFolderId;

  for (const folderName of pathSegments) {
    const escapedName: string = folderName.replace(/'/g, "\\'");
    const listResponse = await drive.files.list({
      q: `'${currentParentId}' in parents and name = '${escapedName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive',
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
    });
    const files: drive_v3.Schema$File[] =
      (listResponse.data as drive_v3.Schema$FileList).files ?? [];

    const existingId: string | null | undefined = files[0]?.id;
    if (existingId) {
      currentParentId = existingId;
    } else {
      const createResponse = await drive.files.create({
        requestBody: {
          name: folderName,
          mimeType: 'application/vnd.google-apps.folder',
          parents: [currentParentId],
        },
        fields: 'id',
        supportsAllDrives: true,
      });
      const createdId: string | null | undefined =
        (createResponse.data as drive_v3.Schema$File).id;

      if (!createdId) {
        throw new Error(`Failed to create Google Drive folder: ${folderName}`);
      }
      currentParentId = createdId;
    }
  }

  return currentParentId;
}
