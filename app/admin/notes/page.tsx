'use client';

import { useMemo, useState } from 'react';
import { MAX_NOTE_UPLOAD_BYTES, uploadStudyNoteFile } from '@/lib/notes/client-upload';

type Topic = { id: string; title: string; topicNumber: number };
type Chapter = { id: string; title: string; chapterNumber: number; topics: Topic[] };
type Subject = { id: string; name: string; chapters: Chapter[] };

export default function AdminNotesPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [subjectId, setSubjectId] = useState('');
  const [chapterId, setChapterId] = useState('');
  const [topicId, setTopicId] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [author, setAuthor] = useState('');
  const [uploadPassword, setUploadPassword] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState('');

  const selectedSubject = subjects.find((item) => item.id === subjectId);
  const chapters = selectedSubject?.chapters || [];
  const selectedChapter = chapters.find((item) => item.id === chapterId);
  const topics = selectedChapter?.topics || [];

  const fileSizeLabel = useMemo(() => file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : '', [file]);

  async function loadSubjects() {
    setMessage('');
    setLoadingTopics(true);
    try {
      const response = await fetch('/api/admin/notes');
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not authenticate.');
      setSubjects(data.subjects || []);
      setMessage('Choose a topic and share your study note with everyone.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not load subjects.');
    } finally {
      setLoadingTopics(false);
    }
  }

  async function uploadNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!subjectId || !chapterId || !topicId) {
      setMessage('Please select a subject, chapter and topic.');
      return;
    }
    if (!file) {
      setMessage('Please choose a PDF or image file.');
      return;
    }
    if (file.size > MAX_NOTE_UPLOAD_BYTES) {
      setMessage('File size cannot exceed 25 MB.');
      return;
    }
    setUploading(true);
    setUploadProgress(0);
    setMessage('Preparing secure Google Drive upload…');
    try {
      const data = await uploadStudyNoteFile({
        file,
        password: uploadPassword,
        metadata: { mode: 'create', subjectId, chapterId, topicId, title, summary, author },
        onProgress: (percent) => {
          setUploadProgress(percent);
          setMessage(`Uploading directly to Google Drive: ${percent}%`);
        },
      });
      setMessage(`Success: “${data.note?.title || title}” uploaded and linked to the selected topic.`);
      setTitle('');
      setSummary('');
      setAuthor('');
      setUploadPassword('');
      setFile(null);
      setUploadProgress(0);
      const input = document.getElementById('note-file') as HTMLInputElement | null;
      if (input) input.value = '';
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl bg-slate-900 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Community contributions</p>
        <h1 className="mt-2 text-2xl font-bold">Share a Study Note</h1>
        <p className="mt-2 text-sm text-slate-300">Anyone can upload a PDF or image and share topic-wise study materials with all students.</p>
        <button type="button" onClick={loadSubjects} disabled={loadingTopics} className="mt-4 rounded-xl bg-indigo-500 px-5 py-2 text-sm font-semibold text-white disabled:opacity-50">{loadingTopics ? 'Loading…' : subjects.length ? 'Refresh subjects' : 'Load subjects and topics'}</button>
      </div>

      {subjects.length > 0 && (
        <form onSubmit={uploadNote} className="mt-6 space-y-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">1. Subject</label>
            <select required value={subjectId} onChange={(event) => { setSubjectId(event.target.value); setChapterId(''); setTopicId(''); }} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm">
              <option value="">Select subject</option>
              {subjects.map((subject) => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">2. Chapter</label>
            <select required value={chapterId} onChange={(event) => { setChapterId(event.target.value); setTopicId(''); }} disabled={!subjectId} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm">
              <option value="">Select chapter</option>
              {chapters.map((chapter) => <option key={chapter.id} value={chapter.id}>Chapter {chapter.chapterNumber}: {chapter.title}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">3. Topic</label>
            <select required value={topicId} onChange={(event) => setTopicId(event.target.value)} disabled={!chapterId} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm">
              <option value="">Select topic</option>
              {topics.map((topic) => <option key={topic.id} value={topic.id}>Topic {topic.topicNumber}: {topic.title}</option>)}
            </select>
            {chapterId && topics.length === 0 && <p className="mt-1 text-xs text-amber-700">No topics exist in this chapter yet. Add the topic before uploading its note.</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">4. Note title</label>
            <input required maxLength={180} value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" placeholder="e.g. Detailed notes on electromagnetic induction" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Short description (optional)</label>
            <textarea rows={3} maxLength={2000} value={summary} onChange={(event) => setSummary(event.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" placeholder="What does this note cover?" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Author (optional)</label>
            <input maxLength={120} value={author} onChange={(event) => setAuthor(event.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" placeholder="Author or teacher name" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Upload password *</label>
            <input type="password" autoComplete="current-password" required value={uploadPassword} onChange={(event) => setUploadPassword(event.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm" placeholder="Enter the content upload password" />
          </div>
          <div>
            <label htmlFor="note-file" className="mb-1 block text-sm font-semibold text-slate-700">5. Select PDF or image (maximum 25 MB)</label>
            <input id="note-file" required type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" onChange={(event) => setFile(event.target.files?.[0] || null)} className="w-full rounded-xl border border-dashed border-slate-300 p-3 text-sm" />
            {file && <p className={`mt-1 text-xs ${file.size > MAX_NOTE_UPLOAD_BYTES ? 'text-red-600' : 'text-slate-500'}`}>{file.name} · {fileSizeLabel}{file.size > MAX_NOTE_UPLOAD_BYTES ? ' · File exceeds 25 MB' : ''}</p>}
          </div>
          <button type="submit" disabled={uploading || !topicId || topics.length === 0 || Boolean(file && file.size > MAX_NOTE_UPLOAD_BYTES)} className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-50">{uploading ? `Uploading to Google Drive… ${uploadProgress}%` : 'Upload note to this topic'}</button>
        </form>
      )}

      {message && <p role="status" className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">{message}</p>}
    </div>
  );
}
