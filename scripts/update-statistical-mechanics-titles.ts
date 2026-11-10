import { PrismaClient } from '@prisma/client';
import { loadEnvConfig } from '@next/env';
import {
  buildStatisticalMechanicsLectureTitle,
  STATISTICAL_MECHANICS_QUESTION_BANK,
} from '../lib/academic/statistical-mechanics-question-bank';

loadEnvConfig(process.cwd());
const prisma = new PrismaClient({ log: ['error'] });

async function main() {
  const subject = await prisma.subject.findUnique({ where: { code: 'PHYS-404' } });
  if (!subject) throw new Error('Statistical Mechanics (PHYS-404) subject was not found.');

  let updated = 0;
  let unchanged = 0;
  let missingChapters = 0;
  let missingTopics = 0;
  let missingLectures = 0;
  let skippedUnmapped = 0;

  for (const entry of STATISTICAL_MECHANICS_QUESTION_BANK) {
    const chapter = await prisma.chapter.findUnique({
      where: { subjectId_chapterNumber: { subjectId: subject.id, chapterNumber: entry.chapterNumber } },
    });
    if (!chapter) {
      missingChapters++;
      console.warn('Missing chapter ' + entry.chapterNumber);
      continue;
    }

    const topic = await prisma.topic.findUnique({
      where: { chapterId_topicNumber: { chapterId: chapter.id, topicNumber: entry.topicNumber } },
    });
    if (!topic) {
      missingTopics++;
      console.warn('Missing topic ' + entry.code);
      continue;
    }

    for (const [lectureText, questionNumbers] of Object.entries(entry.lectures)) {
      const lectureNumber = Number(lectureText);
      if (!questionNumbers.length) {
        skippedUnmapped++;
        continue;
      }

      const lecture = await prisma.youTubeClass.findFirst({
        where: {
          subjectId: subject.id,
          chapterId: chapter.id,
          topicId: topic.id,
          lectureNumber,
        },
      });
      if (!lecture) {
        missingLectures++;
        console.warn('Missing video for ' + entry.code + ' Lec ' + lectureNumber + ' (questions ' + questionNumbers.join(', ') + ')');
        continue;
      }

      const title = buildStatisticalMechanicsLectureTitle(
        entry.chapterNumber,
        entry.topicNumber,
        lectureNumber,
        lecture.title
      );
      if (title === lecture.title) {
        unchanged++;
        continue;
      }

      await prisma.youTubeClass.update({
        where: { id: lecture.id },
        data: { title },
      });
      updated++;
      console.log('UPDATED ' + entry.code + ' Lec ' + lectureNumber + ': ' + title);
    }
  }

  console.log(JSON.stringify({
    subject: subject.name,
    updated,
    unchanged,
    missingChapters,
    missingTopics,
    missingLectures,
    skippedUnmapped,
  }, null, 2));
}

main()
  .catch((error) => {
    console.error('Statistical Mechanics title update failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
