'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Loader2, BookOpen, FileText, Video, Image as ImageIcon, GraduationCap, ArrowUpDown } from 'lucide-react';
import type { SearchResultItem, GlobalSearchResourceType } from '@/types';

type Filter = 'ALL' | GlobalSearchResourceType;

const filters: { value: Filter; label: string }[] = [
  { value: 'ALL', label: 'সব রিসোর্স' },
  { value: 'SUBJECT', label: 'Subject' },
  { value: 'CHAPTER', label: 'Chapter' },
  { value: 'TOPIC', label: 'Topic' },
  { value: 'YOUTUBE', label: 'YouTube' },
  { value: 'PDF', label: 'PDF' },
  { value: 'IMAGE', label: 'Image' },
];

const typeLabels: Record<GlobalSearchResourceType, string> = {
  SUBJECT: 'SUBJECT', CHAPTER: 'CHAPTER', TOPIC: 'TOPIC',
  YOUTUBE: 'YOUTUBE CLASS', PDF: 'PDF NOTE', IMAGE: 'IMAGE',
};

function TypeIcon({ type }: { type: GlobalSearchResourceType }) {
  if (type === 'SUBJECT') return <GraduationCap className="h-5 w-5" />;
  if (type === 'CHAPTER' || type === 'TOPIC') return <BookOpen className="h-5 w-5" />;
  if (type === 'YOUTUBE') return <Video className="h-5 w-5" />;
  if (type === 'IMAGE') return <ImageIcon className="h-5 w-5" />;
  return <FileText className="h-5 w-5" />;
}

export default function SearchResults({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<Filter>('ALL');
  const [sort, setSort] = useState('relevance');
  const [items, setItems] = useState<SearchResultItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = initialQuery.trim();
    setQuery(q);
    if (!q) { setItems([]); setTotal(0); return; }
    const controller = new AbortController();
    setLoading(true);
    setError('');
    const params = new URLSearchParams({ q, type: filter, sort, page: '1', pageSize: '30' });
    fetch('/api/search?' + params.toString(), { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Search request failed');
        return response.json();
      })
      .then((data) => { setItems(data.items || []); setTotal(data.total || 0); })
      .catch((err) => { if (err.name !== 'AbortError') setError('সার্চ ফলাফল লোড করা যায়নি। আবার চেষ্টা করুন।'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [initialQuery, filter, sort]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (value.length < 2) return;
    window.location.href = '/search?q=' + encodeURIComponent(value);
  };

  return (
    <main className="mx-auto min-h-[65vh] max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold text-indigo-600">ACADEMIC RESOURCE SEARCH</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Search Resources</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">বাংলা, English অথবা Banglish-এ Subject, Chapter, Topic, PDF ও Class খুঁজুন।</p>

        <form onSubmit={submitSearch} className="mt-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} minLength={2} required
              placeholder="যেমন: নিউক্লিয়ার পদার্থবিজ্ঞান"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100" />
          </div>
          <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Search</button>
        </form>

        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((item) => (
            <button key={item.value} onClick={() => setFilter(item.value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${filter === item.value ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-300'}`}>
              {item.label}
            </button>
          ))}
          <label className="ml-auto inline-flex items-center gap-2 text-xs text-slate-500">
            <ArrowUpDown className="h-4 w-4" />
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-slate-700">
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="alphabetical">A–Z</option>
            </select>
          </label>
        </div>

        <div className="mt-6 flex items-center justify-between border-b border-slate-200 pb-3">
          <p className="text-sm text-slate-600">{loading ? 'Searching…' : `${total}টি ফলাফল পাওয়া গেছে`}</p>
          {loading && <Loader2 className="h-5 w-5 animate-spin text-indigo-600" />}
        </div>

        {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {!loading && !error && initialQuery.trim().length >= 2 && items.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <Search className="mx-auto h-8 w-8 text-slate-400" />
            <h2 className="mt-3 font-semibold text-slate-800">কোনো রিসোর্স পাওয়া যায়নি</h2>
            <p className="mt-1 text-sm text-slate-500">বানান পরিবর্তন করে বা ছোট keyword দিয়ে আবার সার্চ করুন।</p>
          </div>
        )}

        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <article key={item.type + '-' + item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-indigo-200 hover:shadow-md">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><TypeIcon type={item.type} /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold tracking-wide text-slate-600">{typeLabels[item.type]}</span>
                    {item.subjectName && <span className="truncate text-xs text-slate-500">{item.subjectName}</span>}
                  </div>
                  <h2 className="mt-2 font-bold text-slate-900">{item.title}</h2>
                  {item.chapterTitle && <p className="mt-1 text-xs text-indigo-600">{item.chapterTitle}</p>}
                  {item.subtitle && <p className="mt-1 line-clamp-2 text-sm text-slate-500">{item.subtitle}</p>}
                  <Link href={item.href} className="mt-3 inline-flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-800">Open in Platform →</Link>
                  {item.externalUrl && item.type === 'YOUTUBE' && <a href={item.externalUrl} target="_blank" rel="noreferrer" className="ml-4 text-sm font-semibold text-rose-600">Watch video ↗</a>}
                  {item.externalUrl && (item.type === 'PDF' || item.type === 'IMAGE') && <a href={item.externalUrl} target="_blank" rel="noreferrer" className="ml-4 text-sm font-semibold text-emerald-700">Open file ↗</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
