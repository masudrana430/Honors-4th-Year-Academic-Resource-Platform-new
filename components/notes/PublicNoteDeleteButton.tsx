'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PublicNoteDeleteButton({ noteId }: { noteId: string }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function deleteNote() {
    if (!noteId || !window.confirm('Delete this note and its uploaded file permanently? Anyone can do this.')) return;
    setDeleting(true);
    try {
      const response = await fetch('/api/admin/notes', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ noteId }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Delete failed.');
      router.refresh();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Could not delete note.');
      setDeleting(false);
    }
  }

  if (!noteId) return null;
  return (
    <button type="button" onClick={deleteNote} disabled={deleting}
      className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">
      {deleting ? 'Deleting…' : 'Delete'}
    </button>
  );
}
