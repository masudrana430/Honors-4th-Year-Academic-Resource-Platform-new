import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { requireContributionPassword } from '@/lib/contribution-auth';

function extractYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    if (!['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(hostname)) return null;

    let videoId = '';
    if (hostname === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] || '';
    } else if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v') || '';
    } else {
      videoId = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?]+)/)?.[1] || '';
    }

    return /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}



type RouteContext = {
  params: { id: string; videoId: string };
};

export async function PATCH(request: NextRequest, { params }: RouteContext) {
  const passwordError = requireContributionPassword(request);
  if (passwordError) return passwordError;

  try {
    const existing = await prisma.youTubeClass.findFirst({
      where: { id: params.videoId, chapterId: params.id },
      select: { id: true, subjectId: true, chapterId: true },
    });
    if (!existing) {
      return NextResponse.json({ error: 'Video not found in this chapter.' }, { status: 404 });
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Please submit valid video details.' }, { status: 400 });
    }

    const title = typeof body.title === 'string' ? body.title.trim() : '';
    const youtubeUrl = typeof body.youtubeUrl === 'string' ? body.youtubeUrl.trim() : '';
    const shortDescription = typeof body.shortDescription === 'string' ? body.shortDescription.trim() : '';
    const duration = typeof body.duration === 'string' ? body.duration.trim() : '';
    const instructorName = typeof body.instructorName === 'string' ? body.instructorName.trim() : '';
    const topicId = typeof body.topicId === 'string' && body.topicId.trim() ? body.topicId.trim() : null;

    if (title.length < 3 || title.length > 180) {
      return NextResponse.json({ error: 'Video title must be between 3 and 180 characters.' }, { status: 400 });
    }
    if (!youtubeUrl || youtubeUrl.length > 500) {
      return NextResponse.json({ error: 'A valid YouTube video link is required.' }, { status: 400 });
    }
    if (shortDescription.length > 2000 || duration.length > 30 || instructorName.length > 120) {
      return NextResponse.json({ error: 'One or more video details exceed the allowed length.' }, { status: 400 });
    }

    const youtubeVideoId = extractYouTubeVideoId(youtubeUrl);
    if (!youtubeVideoId) {
      return NextResponse.json({ error: 'This is not a valid YouTube video URL.' }, { status: 400 });
    }

    if (topicId) {
      const topic = await prisma.topic.findFirst({
        where: { id: topicId, chapterId: params.id, subjectId: existing.subjectId },
        select: { id: true },
      });
      if (!topic) {
        return NextResponse.json({ error: 'The selected topic does not belong to this chapter.' }, { status: 400 });
      }
    }

    const duplicate = await prisma.youTubeClass.findFirst({
      where: {
        chapterId: params.id,
        youtubeVideoId,
        id: { not: params.videoId },
      },
      select: { id: true },
    });
    if (duplicate) {
      return NextResponse.json({ error: 'Another video with this YouTube link already exists in this chapter.' }, { status: 409 });
    }

    const video = await prisma.youTubeClass.update({
      where: { id: params.videoId },
      data: {
        title,
        shortDescription,
        youtubeUrl: `https://www.youtube.com/watch?v=${youtubeVideoId}`,
        youtubeVideoId,
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`,
        duration: duration || 'Not specified',
        instructorName: instructorName || null,
        topicId,
      },
      include: { topic: true },
    });

    return NextResponse.json({ message: 'Video details updated.', video });
  } catch (error) {
    console.error('PATCH /api/chapters/[id]/videos/[videoId] error:', error);
    return NextResponse.json({ error: 'Could not update this video. Please try again.' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const passwordError = requireContributionPassword(request);
  if (passwordError) return passwordError;

  try {
    const video = await prisma.youTubeClass.findFirst({
      where: { id: params.videoId, chapterId: params.id },
      select: { id: true, title: true },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found in this chapter.' }, { status: 404 });
    }

    await prisma.youTubeClass.delete({ where: { id: video.id } });
    return NextResponse.json({ message: 'Video deleted.', videoId: video.id });
  } catch (error) {
    console.error('DELETE /api/chapters/[id]/videos/[videoId] error:', error);
    return NextResponse.json({ error: 'Could not delete this video. Please try again.' }, { status: 500 });
  }
}
