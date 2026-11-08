import Link from 'next/link';
import { prisma } from '@/lib/prisma/client';
import { BookOpen, Video, FileText, ArrowRight, Search, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [subjects, popularVideos, recentFiles] = await Promise.all([
    prisma.subject.findMany({
      take: 6,
      orderBy: { createdAt: 'asc' },
      include: {
        _count: {
          select: { chapters: true, youtubeClasses: true, studyNotes: true },
        },
      },
    }),
    prisma.youTubeClass.findMany({
      where: { isPopular: true },
      take: 4,
      orderBy: { createdAt: 'desc' },
      include: { subject: true, chapter: true },
    }),
    prisma.file.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
      include: { subject: true, chapter: true, topic: true },
    }),
  ]);

  return (
    <div className="space-y-12 pb-16">
      <section className="bg-slate-900 text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-medium text-indigo-300 border border-indigo-400/30">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Public Academic Portal • No Login Required</span>
          </span>
          <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight">
            Honors 4th Year Academic Resource Platform
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300">
            Find subject-wise and chapter-wise YouTube classes, topic-wise Google Drive PDF & image notes, and instant answers via our bilingual Gemini AI & Voice Search assistant.
          </p>
          <form action="/search" method="GET" className="mt-6 flex flex-col sm:flex-row gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="search"
                name="q"
                required
                minLength={2}
                placeholder="বাংলা, English বা Banglish-এ Subject, Chapter, Topic, PDF বা Class খুঁজুন..."
                aria-label="Search academic resources"
                autoComplete="off"
                className="w-full rounded-xl bg-white pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
            >
              Search Resources
            </button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">All Honors 4th Year Subjects</h2>
            <p className="text-xs text-slate-500">Data-driven PostgreSQL records (Sample data until official list is provided)</p>
          </div>
          <Link href="/subjects" className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono font-semibold text-indigo-600">{subject.code || 'NO-CODE'}</span>
                {subject.isSampleData && (
                  <span className="rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700 border border-amber-200">
                    Sample Data
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-base font-bold text-slate-900">{subject.name}</h3>
              <p className="mt-1 text-xs text-slate-600 line-clamp-2">{subject.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-slate-600">
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                  {subject._count.chapters} Chapters
                </span>
                <span className="inline-flex items-center gap-1">
                  <Video className="h-3.5 w-3.5 text-rose-600" />
                  {subject._count.youtubeClasses} Classes
                </span>
                <span className="inline-flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5 text-emerald-600" />
                  {subject._count.studyNotes} Notes
                </span>
              </div>
              <Link
                href={`/subjects/${subject.id}`}
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600 transition"
              >
                View Subject
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Popular YouTube Classes</h2>
          <div className="mt-4 space-y-3">
            {popularVideos.map((vid) => (
              <div key={vid.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5">
                <div>
                  <span className="text-[11px] font-semibold text-indigo-600">
                    {vid.subject.name} • Ch {vid.chapter.chapterNumber}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{vid.title}</h3>
                </div>
                <a
                  href={vid.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700"
                >
                  Watch
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-slate-900">Recently Uploaded Google Drive Notes</h2>
          <div className="mt-4 space-y-3">
            {recentFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-3.5">
                <div>
                  <span className="text-[11px] font-semibold text-emerald-700">
                    {file.fileType} • {(file.fileSize / 1024).toFixed(0)} KB • {file.subject.name}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{file.fileName}</h3>
                </div>
                <a
                  href={file.driveShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-600"
                >
                  Open Drive
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
