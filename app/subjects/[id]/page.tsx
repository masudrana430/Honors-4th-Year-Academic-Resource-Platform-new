import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export default async function SubjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const subject = await prisma.subject.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
    include: {
      chapters: {
        orderBy: { chapterNumber: 'asc' },
        include: {
          _count: {
            select: { topics: true, youtubeClasses: true, files: true },
          },
        },
      },
    },
  });

  if (!subject) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <span className="text-xs font-mono text-indigo-300">{subject.code} • {subject.department}</span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-bold">{subject.name}</h1>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl">{subject.description}</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Complete Chapter List ({subject.chapters.length})</h2>
        <div className="grid grid-cols-1 gap-4">
          {subject.chapters.map((ch) => (
            <div
              key={ch.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div>
                <span className="text-xs font-bold uppercase text-indigo-600">
                  Chapter {String(ch.chapterNumber).padStart(2, '0')}
                </span>
                <h3 className="text-base font-bold text-slate-900">{ch.title}</h3>
                <p className="mt-1 text-xs text-slate-600">{ch.description}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-700">
                    {ch._count.topics} Topics
                  </span>
                  <span className="rounded-full bg-rose-50 px-2.5 py-0.5 text-rose-700">
                    {ch._count.youtubeClasses} YouTube Classes
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-emerald-700">
                    {ch._count.files} Google Drive Files
                  </span>
                </div>
              </div>
              <Link
                href={`/chapters/${ch.id}`}
                className="shrink-0 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Open Chapter →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
