import { prisma } from '../lib/prisma/client';
import { buildClassicalElectrodynamicsLectureTitle, CLASSICAL_ELECTRODYNAMICS_QUESTION_BANK } from '../lib/academic/classical-electrodynamics-question-bank';

async function main() {
  const subject = await prisma.subject.findUnique({ where: { code: 'PHYS-405' } });
  if (!subject) throw new Error('Classical Electrodynamics (PHYS-405) subject was not found.');

  let updated = 0;
  let unchanged = 0;
  let missingChapters = 0;
  let missingTopics = 0;
  let missingLectures = 0;

  for (const entry of CLASSICAL_ELECTRODYNAMICS_QUESTION_BANK) {
    const chapter = await prisma.chapter.findUnique({
      where: { subjectId_chapterNumber: { subjectId: subject.id, chapterNumber: entry.chapterNumber } },
    });
    if (!chapter) { missingChapters++; console.warn(`Missing chapter ${entry.chapterNumber}`); continue; }

    const topic = await prisma.topic.findUnique({
      where: { chapterId_topicNumber: { chapterId: chapter.id, topicNumber: entry.topicNumber } },
    });
    if (!topic) { missingTopics++; console.warn(`Missing topic ${entry.code}`); continue; }

    for (const [lectureText, questionNumbers] of Object.entries(entry.lectures)) {
      const lectureNumber = Number(lectureText);
      const lecture = await prisma.youTubeClass.findFirst({
        where: { subjectId: subject.id, chapterId: chapter.id, topicId: topic.id, lectureNumber },
      });
      if (!lecture) { missingLectures++; console.warn(`Missing video for ${entry.code} Lec ${lectureNumber} (questions ${questionNumbers.join(', ')})`); continue; }

      const title = buildClassicalElectrodynamicsLectureTitle(
        entry.chapterNumber, entry.topicNumber, lectureNumber, lecture.title
      );
      if (title === lecture.title) { unchanged++; continue; }

      await prisma.youTubeClass.update({ where: { id: lecture.id }, data: { title } });
      updated++;
      console.log(`UPDATED ${entry.code} Lec ${lectureNumber}: ${title}`);
    }
  }

  console.log(JSON.stringify({ updated, unchanged, missingChapters, missingTopics, missingLectures }));
}

main().catch((error) => {
  console.error('Classical Electrodynamics title update failed:', error);
  process.exitCode = 1;
}).finally(async () => {
  await prisma.$disconnect();
});
