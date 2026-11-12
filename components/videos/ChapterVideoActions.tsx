'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type VideoToManage = {
  id: string;
  title: string;
  youtubeUrl: string;
  shortDescription: string;
  duration: string;
  instructorName: string | null;
  topicId: string | null;
};

type ChapterTopic = {
  id: string;
  title: string;
  topicNumber: number;
};

export default function ChapterVideoActions({
  chapterId,
  video,
  topics,
}: {
  chapterId: string;
  video: VideoToManage;
  topics: ChapterTopic[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [title, setTitle] = useState(video.title);
  const [youtubeUrl, setYoutubeUrl] = useState(video.youtubeUrl);
  const [description, setDescription] = useState(video.shortDescription);
  const [duration, setDuration] = useState(video.duration === 'Not specified' ? '' : video.duration);
  const [instructorName, setInstructorName] = useState(video.instructorName || '');
  const [topicId, setTopicId] = useState(video.topicId || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function saveChanges(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch(`/api/chapters/${chapterId}/videos/${video.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          youtubeUrl,
          shortDescription: description,
          duration,
          instructorName,
          topicId: topicId || null,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not update this video.');

      setMessage('Video details updated successfully.');
      setEditing(false);
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Could not update this video.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteVideo() {
    setDeleting(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch(`/api/chapters/${chapterId}/videos/${video.id}`, {
        method: 'DELETE',
        headers: {},
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not delete this video.');

      setMessage('Video deleted successfully.');
      setConfirmDelete(false);
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Could not delete this video.');
      setConfirmDelete(false);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="mt-3 border-t border-slate-100 pt-3">
      {message && (
        <p
          role="status"
          className={`mb-2 rounded-lg border p-2 text-[11px] ${isError ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}
        >
          {message}
        </p>
      )}

      {!editing && !confirmDelete && (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => { setEditing(true); setMessage(''); setConfirmDelete(false); }}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            Edit details
          </button>
          <button
            type="button"
            onClick={() => { setConfirmDelete(true); setMessage(''); setEditing(false); }}
            className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"
          >
            Delete video
          </button>
        </div>
      )}

      {confirmDelete && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3">
          <p className="text-xs font-semibold text-red-800">Delete this video from the chapter?</p>
          <p className="mt-1 break-words text-[11px] text-red-700">{video.title}</p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={deleteVideo}
              disabled={deleting}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {deleting ? 'Deleting…' : 'Yes, delete video'}
            </button>
            <button
              type="button"
              onClick={() => setConfirmDelete(false)}
              disabled={deleting}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {editing && (
        <form onSubmit={saveChanges} className="space-y-3 rounded-xl border border-indigo-100 bg-indigo-50/50 p-3">
          <p className="text-xs font-bold text-slate-800">Edit video details</p>

          <div>
            <label htmlFor={`edit-video-title-${video.id}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Video title *</label>
            <input
              id={`edit-video-title-${video.id}`}
              required
              minLength={3}
              maxLength={180}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label htmlFor={`edit-video-url-${video.id}`} className="mb-1 block text-[11px] font-semibold text-slate-700">YouTube link *</label>
            <input
              id={`edit-video-url-${video.id}`}
              type="url"
              required
              maxLength={500}
              value={youtubeUrl}
              onChange={(event) => setYoutubeUrl(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
            />
          </div>

          <div>
            <label htmlFor={`edit-video-description-${video.id}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Description</label>
            <textarea
              id={`edit-video-description-${video.id}`}
              rows={2}
              maxLength={2000}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
            />
          </div>

          {topics.length > 0 && (
            <div>
              <label htmlFor={`edit-video-topic-${video.id}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Related topic</label>
              <select
                id={`edit-video-topic-${video.id}`}
                value={topicId}
                onChange={(event) => setTopicId(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
              >
                <option value="">Chapter-level video</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>Topic {topic.topicNumber}: {topic.title}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label htmlFor={`edit-video-duration-${video.id}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Duration</label>
              <input
                id={`edit-video-duration-${video.id}`}
                maxLength={30}
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                placeholder="e.g. 42:15"
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label htmlFor={`edit-video-instructor-${video.id}`} className="mb-1 block text-[11px] font-semibold text-slate-700">Instructor / channel</label>
              <input
                id={`edit-video-instructor-${video.id}`}
                maxLength={120}
                value={instructorName}
                onChange={(event) => setInstructorName(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              disabled={saving}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
