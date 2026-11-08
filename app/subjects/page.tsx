import Link from 'next/link';
import { prisma } from '@/lib/prisma/client';
import { BookOpen, Video, FileText } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SubjectsListingPage({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string; page?: string };
}) {
  const q = (searchParams.q || '').trim();
  const sort = searchParams.sort || 'alphabetical';
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const pageSize = 9;

  const where = q
    ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' as const } },
          { code: { contains: q, mode: 'insensitive' as const } },
        ],
      }
    : {};

  const [total, subjects] = await Promise.all([
    prisma.subject.count({ where }),
    prisma.subject.findMany({
      where,
      orderBy: sort === 'newest' ? { createdAt: 'desc' } : { name: 'asc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        _count: {
          select: { chapters: true, youtubeClasses: true, studyNotes: true },
        },
      },
    }),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Honors 4th Year Subjects</h1>
          <p className="text-xs text-slate-500">
            Showing {subjects.length} of {total} database subject records
          </p>
        </div>
        <form method="GET" className="flex flex-wrap gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Search subject or code..."
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
          />
          <select
            name="sort"
            defaultValue={sort}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm"
          >
            <option value="alphabetical">Alphabetical (A-Z)</option>
            <option value="newest">Newest Added</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white"
          >
            Apply
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject) => (
          <div key={subject.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <span className="text-xs font-mono font-semibold text-indigo-600">
              {subject.code || 'SAMPLE'}
            </span>
            <h2 className="mt-1 text-base font-bold text-slate-900">{subject.name}</h2>
            <p className="mt-1 text-xs text-slate-600">{subject.description}</p>
            <div className="mt-4 flex items-center gap-4 text-xs text-slate-600">
              <span className="inline-flex items-center gap-1">
                <BookOpen className="h-3.5 w-3.5 text-indigo-600" />
                {subject._count.chapters} Ch
              </span>
              <span className="inline-flex items-center gap-1">
                <Video className="h-3.5 w-3.5 text-rose-600" />
                {subject._count.youtubeClasses} Videos
              </span>
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3.5 w-3.5 text-emerald-600" />
                {subject._count.studyNotes} Notes
              </span>
            </div>
            <Link
              href={`/subjects/${subject.id}`}
              className="mt-4 inline-flex w-full justify-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-600"
            >
              View Subject
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
