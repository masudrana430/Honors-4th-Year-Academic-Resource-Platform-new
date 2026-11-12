'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicNoteDeleteButton({
  noteId,
  title = '',
  summary = '',
  author = '',
  fileName = '',
}: {
  noteId: string;
  title?: string;
  summary?: string;
  author?: string | null;
  fileName?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [noteTitle, setNoteTitle] = useState(title);
  const [noteSummary, setNoteSummary] = useState(summary);
  const [noteAuthor, setNoteAuthor] = useState(author || '');
  const [password, setPassword] = useState('');
  const [replacementFile, setReplacementFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  async function updateNote(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setIsError(false);
    try {
      const body = new FormData();
      body.set('noteId', noteId);
      body.set('title', noteTitle);
      body.set('summary', noteSummary);
      body.set('author', noteAuthor);
      if (replacementFile) body.set('file', replacementFile);

      const response = await fetch('/api/admin/notes', {
        method: 'PATCH',
        headers: { 'x-content-upload-password': password },
        body,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not update this note.');
      setMessage('Note updated successfully.');
      setEditing(false);
      setPassword('');
      setReplacementFile(null);
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Could not update this note.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote() {
    setDeleting(true);
    setMessage('');
    setIsError(false);
    try {
      const response = await fetch('/api/admin/notes', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-content-upload-password': password,
        },
        body: JSON.stringify({ noteId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Delete failed.');
      setMessage('Note and uploaded file deleted successfully.');
      setConfirmDelete(false);
      setPassword('');
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Could not delete note.');
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  }

  if (!noteId) return null;

  return (
    <div className="mt-3 space-y-2">
      {message && (
        <p role="status" className={`rounded-lg border p-2 text-[11px] ${isError ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
          {message}
        </p>
      )}

      {!editing && !confirmDelete && (
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => { setEditing(true); setMessage(''); setConfirmDelete(false); }}
            className="rounded-lg border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-50">
            Update note
          </button>
          <button type="button" onClick={() => { setConfirmDelete(true); setMessage(''); setEditing(false); }}
            className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50">
            Delete note
          </button>
        </div>
      )}

      {editing && (
        <form onSubmit={updateNote} className="space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
          <p className="text-xs font-bold text-slate-800">Update study note</p>
          <div>
            <label htmlFor={`note-title-${noteId}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Note title *</label>
            <input id={`note-title-${noteId}`} required minLength={3} maxLength={180} value={noteTitle}
              onChange={(event) => setNoteTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs" />
          </div>
          <div>
            <label htmlFor={`note-summary-${noteId}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Description</label>
            <textarea id={`note-summary-${noteId}`} rows={2} maxLength={2000} value={noteSummary}
              onChange={(event) => setNoteSummary(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs" />
          </div>
          <div>
            <label htmlFor={`note-author-${noteId}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Author</label>
            <input id={`note-author-${noteId}`} maxLength={120} value={noteAuthor}
              onChange={(event) => setNoteAuthor(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs" />
          </div>
          <div>
            <label htmlFor={`note-file-${noteId}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Replace file (optional, PDF or image up to 4 MB)</label>
            <input id={`note-file-${noteId}`} type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
              onChange={(event) => setReplacementFile(event.target.files?.[0] || null)}
              className="w-full rounded-lg border border-dashed border-slate-300 bg-white p-2 text-xs" />
            {replacementFile && <p className="mt-1 text-[10px] text-slate-500">New file: {replacementFile.name}</p>}
            {!replacementFile && fileName && <p className="mt-1 text-[10px] text-slate-500">Current file: {fileName}</p>}
          </div>
          <div>
            <label htmlFor={`note-update-password-${noteId}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Content password *</label>
            <input id={`note-update-password-${noteId}`} type="password" required autoComplete="current-password" value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs" placeholder="Enter the shared content password" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="submit" disabled={saving} className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50">
              {saving ? 'Saving…' : 'Save updates'}
            </button>
            <button type="button" disabled={saving} onClick={() => { setEditing(false); setPassword(''); }}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
          </div>
        </form>
      )}

      {confirmDelete && (
        <div className="space-y-3 rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-800">Delete this note and its Google Drive file permanently?</p>
          <div>
            <label htmlFor={`note-delete-password-${noteId}`} className="mb-1 block text-[11px] font-semibold text-red-800">Content password *</label>
            <input id={`note-delete-password-${noteId}`} type="password" required autoComplete="current-password" value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-xs text-slate-900" placeholder="Enter the shared content password" />
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={deleteNote} disabled={deleting || !password}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50">
              {deleting ? 'Deleting…' : 'Confirm delete'}
            </button>
            <button type="button" onClick={() => { setConfirmDelete(false); setPassword(''); }} disabled={deleting}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
