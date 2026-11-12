import { MathTitle } from '@/components/ui/MathTitle';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';
import { buildGoogleDriveUrls } from '@/lib/google-drive/driveClient';
import PublicNoteDeleteButton from '@/components/notes/PublicNoteDeleteButton';
import ChapterVideoForm from '@/components/videos/ChapterVideoForm';

export const dynamic = 'force-dynamic';

export default async function ChapterDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const chapter = await prisma.chapter.findUnique({
    where: { id: params.id },
    include: {
      subject: true,
      youtubeClasses: { orderBy: { lectureNumber: 'asc' }, include: { topic: true } },
      topics: {
        orderBy: { topicNumber: 'asc' },
        include: {
          files: { orderBy: { createdAt: 'desc' }, include: { studyNote: true } },
          studyNotes: true,
        },
      },
    },
  });

  if (!chapter) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <p className="text-xs text-indigo-300">
          {chapter.subject.name} — Chapter {String(chapter.chapterNumber).padStart(2, '0')}
        </p>
        <h1 className="mt-1 text-2xl font-bold">{chapter.title}</h1>
        <p className="mt-2 text-sm text-slate-300">{chapter.description}</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Topic-Wise Study Notes & Google Drive Files</h2>
        {chapter.topics.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">No topics or study notes uploaded for this chapter yet.</p>
            <p className="mt-1 text-xs text-slate-500">Check back soon or ask the AI Assistant for related chapters.</p>
          </div>
        ) : (
          chapter.topics.map((topic) => (
            <div key={topic.id} id={`topic-${topic.id}`} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase text-indigo-600">
                  Topic {String(topic.topicNumber).padStart(2, '0')}
                </span>
                <h3 className="text-base font-bold text-slate-900">{topic.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{topic.description}</p>
                <a href="/notes/upload" className="mt-2 inline-flex rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700">Upload a note to this topic</a>
              </div>
              {topic.files.length === 0 ? (
                <p className="text-xs italic text-slate-500">No Google Drive PDF or Image notes linked to this topic yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {topic.files.map((file) => {
                    const driveUrls = buildGoogleDriveUrls(file.driveFileId);
                    return (
                      <div key={file.id} className="rounded-xl border border-slate-200 p-3.5 flex flex-col justify-between">
                        <div>
                          <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            {file.fileType} • {(file.fileSize / 1024).toFixed(0)} KB
                          </span>
                          <p className="mt-1.5 text-xs font-semibold text-slate-900 break-all">{file.studyNote?.title || file.fileName}</p>
                          {file.studyNote?.summary && <p className="mt-1 text-xs text-slate-600">{file.studyNote.summary}</p>}
                          {file.studyNote?.author && <p className="mt-1 text-[11px] text-slate-500">By {file.studyNote.author}</p>}
                          <p className="mt-1 text-[11px] text-slate-500 break-all">{file.fileName}</p>
                          <p className="text-[11px] text-slate-400">{file.driveFolderPath}</p>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <a
                            href={file.driveShareUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600"
                          >
                            {file.fileType === 'PDF' ? 'Open PDF' : 'Preview Image'}
                          </a>
                          <PublicNoteDeleteButton noteId={file.studyNoteId || ''} />
                          <a
                            href={driveUrls.downloadUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))
        )}
      </section>

      <ChapterVideoForm
        chapterId={chapter.id}
        topics={chapter.topics.map((topic) => ({
          id: topic.id,
          title: topic.title,
          topicNumber: topic.topicNumber,
        }))}
      />

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Chapter YouTube Classes</h2>
        {chapter.youtubeClasses.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-sm font-semibold text-slate-700">No YouTube classes recorded for this chapter yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {chapter.youtubeClasses.map((vid) => (
              <div key={vid.id} id={`video-${vid.id}`} className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="aspect-video bg-slate-900 relative">
                  <img
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-[11px] font-semibold text-white">
                    Lecture {String(vid.lectureNumber).padStart(2, '0')} • {vid.duration}
                  </span>
                </div>
                <div className="p-4">
                  <MathTitle text={vid.title} className="block break-words text-sm font-bold leading-relaxed text-slate-900" mathClassName="text-[0.98em]" />
                  <p className="mt-1 text-xs text-slate-600 line-clamp-2">{vid.shortDescription}</p>
                  {vid.instructorName && (
                    <p className="mt-2 text-[11px] font-medium text-slate-500">Instructor / Channel: {vid.instructorName}</p>
                  )}
                  {vid.topic && (
                    <p className="mt-1 text-[11px] text-indigo-600">Topic {vid.topic.topicNumber}: {vid.topic.title}</p>
                  )}
                  <a
                    href={vid.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-full justify-center rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
