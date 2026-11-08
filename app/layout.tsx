import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Search, Layers, Sparkles } from 'lucide-react';
import './globals.css';
import { AcademicAIAssistant } from '@/components/ai/AcademicAIAssistant';

export const metadata: Metadata = {
  title: {
    default: 'Honors 4th Year Academic Resource Platform',
    template: '%s | Honors 4th Year Academic Resource Platform',
  },
  description:
    'Public Honours 4th Year academic resource platform organizing subject-wise and chapter-wise YouTube classes, topic-wise study notes, Google Drive PDFs/images, and Gemini AI + Voice search.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-indigo-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                  Honors 4th Year
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  Academic Resource Platform
                </span>
              </div>
            </Link>
            <nav className="flex items-center gap-2 sm:gap-5 text-sm font-medium text-slate-700 dark:text-slate-200">
              <Link href="/" className="hover:text-indigo-600 px-2 py-1">
                Home
              </Link>
              <Link href="/subjects" className="inline-flex items-center gap-1 hover:text-indigo-600 px-2 py-1">
                <Layers className="h-4 w-4" />
                <span>Subjects</span>
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-indigo-50 hover:text-indigo-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Search className="h-3.5 w-3.5" />
                <span>Global Search</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>
              Honors 4th Year Academic Resource Platform • Public Read-Only Access • PostgreSQL + Prisma + Google Drive + Gemini AI
            </p>
            <p className="inline-flex items-center gap-1 text-indigo-600 font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Sample Data Mode (Editable via Prisma Seed)</span>
            </p>
          </div>
        </footer>
        <AcademicAIAssistant />
      </body>
    </html>
  );
}
