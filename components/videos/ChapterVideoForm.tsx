'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

type ChapterTopic = {
  id: string;
  title: string;
  topicNumber: number;
};

export default function ChapterVideoForm({
  chapterId,
  topics,
}: {
  chapterId: string;
  topics: ChapterTopic[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [topicId, setTopicId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  async function submitVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch(`/api/chapters/${chapterId}/videos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      if (!response.ok) throw new Error(data.error || 'Could not add this video.');

      setMessage('Video added successfully. It is now available in this chapter.');
      setTitle('');
      setYoutubeUrl('');
      setDescription('');
      setDuration('');
      setInstructorName('');
      setTopicId('');
      setOpen(false);
      router.refresh();
    } catch (error) {
      setIsError(true);
      setMessage(error instanceof Error ? error.message : 'Could not add this video.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-2xl border border-rose-200 bg-rose-50/60 p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Add a YouTube Video</h3>
          <p className="mt-1 text-xs text-slate-600">
            Share a useful class recording with its title and details for this chapter.
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setOpen((value) => !value); setMessage(''); }}
          aria-expanded={open}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-rose-700"
        >
          {open ? 'Close video form' : '+ Add video'}
        </button>
      </div>

      {message && (
        <p
          role="status"
          className={`mt-3 rounded-xl border p-3 text-xs ${isError ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}
        >
          {message}
        </p>
      )}

      {open && (
        <form onSubmit={submitVideo} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="chapter-video-title" className="mb-1 block text-xs font-semibold text-slate-700">
              Video title *
            </label>
            <input
              id="chapter-video-title"
              required
              minLength={3}
              maxLength={180}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Lecture 1 — Introduction to the topic"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="chapter-video-url" className="mb-1 block text-xs font-semibold text-slate-700">
              YouTube video link *
            </label>
            <input
              id="chapter-video-url"
              type="url"
              required
              maxLength={500}
              value={youtubeUrl}
              onChange={(event) => setYoutubeUrl(event.target.value)}
              placeholder="https://youtu.be/xxxxxxxxxxx"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
            <p className="mt-1 text-[11px] text-slate-500">Supported: youtube.com/watch, youtu.be, Shorts and embed links.</p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="chapter-video-description" className="mb-1 block text-xs font-semibold text-slate-700">
              Video description
            </label>
            <textarea
              id="chapter-video-description"
              rows={3}
              maxLength={2000}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What topics or questions are covered in this video?"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
            />
          </div>

          {topics.length > 0 && (
            <div>
              <label htmlFor="chapter-video-topic" className="mb-1 block text-xs font-semibold text-slate-700">
                Related topic (optional)
              </label>
              <select
                id="chapter-video-topic"
                value={topicId}
                onChange={(event) => setTopicId(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
              >
                <option value="">Chapter-level video</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    Topic {topic.topicNumber}: {topic.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="chapter-video-duration" className="mb-1 block text-xs font-semibold text-slate-700">
              Duration (optional)
            </label>
            <input
              id="chapter-video-duration"
              maxLength={30}
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="e.g. 42:15"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
            />
          </div>

          <div className={topics.length > 0 ? 'sm:col-span-2' : ''}>
            <label htmlFor="chapter-video-instructor" className="mb-1 block text-xs font-semibold text-slate-700">
              Instructor / channel name (optional)
            </label>
            <input
              id="chapter-video-instructor"
              maxLength={120}
              value={instructorName}
              onChange={(event) => setInstructorName(event.target.value)}
              placeholder="Teacher or YouTube channel"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Adding video…' : 'Save video to this chapter'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
