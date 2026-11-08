/**
 * Developer-controlled CLI script to upload or sync local PDF / Image study notes
 * into the structured Google Drive folder hierarchy:
 *   Google Drive/Honors_4th_Year/Subject_XX/Chapter_XX/Topic_XX
 * and record the returned driveFileId and share URL in PostgreSQL.
 *
 * Usage:
 *   npm run drive:sync
 */
import { prisma } from '../lib/prisma/client';
import { ensureDriveFolderHierarchy, buildGoogleDriveUrls } from '../lib/google-drive/driveClient';

async function runSync() {
  console.log('🔄 Checking Google Drive OAuth configuration...');
  if (!process.env.GOOGLE_DRIVE_CLIENT_ID || !process.env.GOOGLE_DRIVE_CLIENT_SECRET || !process.env.GOOGLE_DRIVE_REFRESH_TOKEN) {
    console.log(
      'ℹ️ Configure GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REFRESH_TOKEN in .env.'
    );
    console.log(
      'Complete the personal Gmail OAuth setup and re-run `npm run drive:sync` to sync folders.'
    );
    return;
  }

  const subjects = await prisma.subject.findMany({
    include: {
      chapters: {
        include: { topics: true },
      },
    },
  });

  for (const subject of subjects) {
    for (const chapter of subject.chapters) {
      for (const topic of chapter.topics) {
        const segments = [
          `Subject_${subject.code || subject.slug}`,
          `Chapter_${String(chapter.chapterNumber).padStart(2, '0')}`,
          `Topic_${String(topic.topicNumber).padStart(2, '0')}`,
        ];
        const folderId = await ensureDriveFolderHierarchy(segments);
        const urls = buildGoogleDriveUrls(folderId);
        console.log(`✅ Verified Drive folder: ${segments.join('/')} -> ${urls.viewUrl}`);
      }
    }
  }
}

runSync()
  .catch((err) => {
    console.error('❌ Drive sync error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
