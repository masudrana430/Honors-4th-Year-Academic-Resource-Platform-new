import Link from 'next/link';
import { FileText, BookOpen, FolderOpen, Plus, Download, ExternalLink } from 'lucide-react';
import { prisma } from '@/lib/prisma/client';
import { buildGoogleDriveUrls } from '@/lib/google-drive/driveClient';
import NoteManagementActions from '@/components/notes/PublicNoteDeleteButton';

export const dynamic = 'force-dynamic';

export default async function NotesHubPage() {
  const subjects = await prisma.subject.findMany({
    orderBy: { name: 'asc' },
    include: {
      chapters: {
        orderBy: { chapterNumber: 'asc' },
        include: {
          studyNotes: {
            orderBy: { createdAt: 'desc' },
            include: {
              topic: { select: { id: true, title: true, topicNumber: true } },
              files: { orderBy: { createdAt: 'asc' } },
            },
          },
        },
      },
    },
  });

  const chapterCount = subjects.reduce((total, subject) => total + subject.chapters.length, 0);
  const noteCount = subjects.reduce(
    (total, subject) => total + subject.chapters.reduce((chapterTotal, chapter) => chapterTotal + chapter.studyNotes.length, 0),
    0
  );
  const fileCount = subjects.reduce(
    (total, subject) => total + subject.chapters.reduce(
      (chapterTotal, chapter) => chapterTotal + chapter.studyNotes.reduce((noteTotal, note) => noteTotal + note.files.length, 0),
      0
    ),
    0
  );

  return (
    <div className="mx-auto max-w-7xl space-y-7 px-4 py-8 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-400/10 px-3 py-1 text-xs font-semibold text-indigo-200">
              <FileText className="h-3.5 w-3.5" /> Community Study Library
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Subject & Chapter-wise Notes</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Browse all shared study notes by subject, chapter and topic. Students can contribute new PDFs or images for everyone.
            </p>
          </div>
          <Link href="/notes/upload" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-950/30 transition hover:bg-indigo-400">
            <Plus className="h-4 w-4" /> Add a Note
          </Link>
        </div>
        <div className="mt-7 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
          <div><p className="text-2xl font-bold tabular-nums">{subjects.length}</p><p className="mt-1 text-[11px] text-slate-400">Subjects</p></div>
          <div><p className="text-2xl font-bold tabular-nums">{chapterCount}</p><p className="mt-1 text-[11px] text-slate-400">Chapters</p></div>
          <div><p className="text-2xl font-bold tabular-nums">{noteCount}</p><p className="mt-1 text-[11px] text-slate-400">Study notes</p></div>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Browse the library</h2>
          <p className="text-xs text-slate-500">{noteCount} notes across {subjects.length} subjects and {chapterCount} chapters · {fileCount} attached files</p>
        </div>
        <Link href="/notes/upload" className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-700">
          <Plus className="h-3.5 w-3.5" /> Upload study material
        </Link>
      </div>

      {subjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-slate-400" />
          <p className="mt-3 text-sm font-semibold text-slate-800">No subjects found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject) => {
            const subjectNotes = subject.chapters.reduce((count, chapter) => count + chapter.studyNotes.length, 0);
            return (
              <details key={subject.id} open className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 bg-slate-50 px-5 py-4 marker:hidden hover:bg-indigo-50/60">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700"><BookOpen className="h-5 w-5" /></span>
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">{subject.code || subject.department}</p>
                      <h3 className="truncate text-base font-bold text-slate-900">{subject.name}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span>{subject.chapters.length} chapters</span>
                    <span className="rounded-full bg-indigo-100 px-2.5 py-1 font-semibold text-indigo-700">{subjectNotes} notes</span>
                    <span className="text-lg transition group-open:rotate-180">⌄</span>
                  </div>
                </summary>

                <div className="space-y-3 p-3 sm:p-5">
                  {subject.chapters.map((chapter) => (
                    <details key={chapter.id} className="overflow-hidden rounded-xl border border-slate-200">
                      <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-2 px-4 py-3 hover:bg-slate-50 marker:hidden">
                        <div className="flex min-w-0 items-center gap-2.5">
                          <FolderOpen className="h-4 w-4 shrink-0 text-amber-600" />
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase text-slate-500">Chapter {String(chapter.chapterNumber).padStart(2, '0')}</p>
                            <h4 className="text-sm font-semibold text-slate-900">{chapter.title}</h4>
                          </div>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{chapter.studyNotes.length} notes</span>
                      </summary>

                      <div className="border-t border-slate-100 bg-slate-50/50 p-3 sm:p-4">
                        {chapter.studyNotes.length === 0 ? (
                          <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-dashed border-slate-300 bg-white p-4 sm:flex-row sm:items-center">
                            <p className="text-xs text-slate-500">No notes have been uploaded for this chapter yet.</p>
                            <Link href="/notes/upload" className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700">
                              <Plus className="h-3.5 w-3.5" /> Add the first note
                            </Link>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            {chapter.studyNotes.map((note) => (
                              <article key={note.id} className="rounded-xl border border-slate-200 bg-white p-4">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-indigo-600">
                                      {note.topic ? `Topic ${String(note.topic.topicNumber).padStart(2, '0')} · ${note.topic.title}` : 'Chapter note'}
                                    </p>
                                    <h5 className="mt-1 break-words text-sm font-bold text-slate-900">{note.title}</h5>
                                  </div>
                                  <span className="shrink-0 rounded-lg bg-slate-100 p-2 text-slate-600"><FileText className="h-4 w-4" /></span>
                                </div>
                                {note.summary && <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-slate-600">{note.summary}</p>}
                                {note.author && <p className="mt-2 text-[11px] text-slate-500">Author: {note.author}</p>}

                                {note.files.length > 0 ? (
                                  <div className="mt-3 space-y-2">
                                    {note.files.map((file) => {
                                      const urls = buildGoogleDriveUrls(file.driveFileId);
                                      return (
                                        <div key={file.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 p-2.5">
                                          <div className="min-w-0">
                                            <p className="break-all text-[11px] font-semibold text-slate-700">{file.fileName}</p>
                                            <p className="mt-0.5 text-[10px] text-slate-500">{file.fileType} · {(file.fileSize / 1024).toFixed(0)} KB</p>
                                          </div>
                                          <div className="flex shrink-0 gap-2">
                                            <a href={file.driveShareUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-2.5 py-1.5 text-[11px] font-semibold text-white hover:bg-indigo-600">
                                              <ExternalLink className="h-3 w-3" /> Open
                                            </a>
                                            <a href={urls.downloadUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-100">
                                              <Download className="h-3 w-3" /> Download
                                            </a>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  <p className="mt-3 text-[11px] italic text-amber-700">No file is attached to this note.</p>
                                )}

                                <NoteManagementActions
                                  noteId={note.id}
                                  title={note.title}
                                  summary={note.summary}
                                  author={note.author}
                                  fileName={note.files[0]?.fileName || ''}
                                />
                              </article>
                            ))}
                          </div>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
