import { PrismaClient } from '@prisma/client';
import { loadEnvConfig } from '@next/env';
import {
  buildSolidStatePhysics2LectureTitle,
  SOLID_STATE_PHYSICS_2_QUESTION_BANK,
} from '../lib/academic/solid-state-physics-2-question-bank';

loadEnvConfig(process.cwd());
const prisma = new PrismaClient({ log: ['error'] });

async function main() {
  const subject = await prisma.subject.findUnique({ where: { code: 'PHYS-403' } });
  if (!subject) throw new Error('Solid State Physics-2 (PHYS-403) subject was not found.');

  let updated = 0;
  let unchanged = 0;
  let missingChapters = 0;
  let missingTopics = 0;
  let missingLectures = 0;
  let skippedUnmapped = 0;

  for (const entry of SOLID_STATE_PHYSICS_2_QUESTION_BANK) {
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
        console.warn('Missing video for Chapter ' + entry.code + ' Lec ' + lectureNumber + ' (questions ' + questionNumbers.join(', ') + ')');
        continue;
      }

      const title = buildSolidStatePhysics2LectureTitle(
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
      console.log('UPDATED Chapter ' + entry.code + ' Lec ' + lectureNumber + ': ' + title);
    }
  }

  console.log(JSON.stringify({
    subject: subject.name,
    questionCount: SOLID_STATE_PHYSICS_2_QUESTION_BANK.reduce((sum, entry) => sum + entry.questions.length, 0),
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
    console.error('Solid State Physics-2 title update failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
