import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { requireContributionPassword } from '@/lib/contribution-auth';

function extractYouTubeVideoId(value: string): string | null {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    const supportedHosts = ['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com'];

    if (!supportedHosts.includes(hostname)) return null;

    let videoId = '';
    if (hostname === 'youtu.be') {
      videoId = url.pathname.split('/').filter(Boolean)[0] || '';
    } else if (url.pathname === '/watch') {
      videoId = url.searchParams.get('v') || '';
    } else {
      const match = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?]+)/);
      videoId = match?.[1] || '';
    }

    return /^[A-Za-z0-9_-]{11}$/.test(videoId) ? videoId : null;
  } catch {
    return null;
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videos = await prisma.youTubeClass.findMany({
      where: { chapterId: params.id },
      orderBy: { lectureNumber: 'asc' },
      include: { topic: true },
    });
    return NextResponse.json({ items: videos });
  } catch (error) {
    console.error('GET /api/chapters/[id]/videos error:', error);
    return NextResponse.json({ error: 'Failed to fetch chapter videos' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authError = requireContributionPassword(request);
  if (authError) return authError;

  try {
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
      return NextResponse.json({
        error: 'This link is not a valid YouTube video URL. Use a watch, youtu.be, Shorts or embed link.',
      }, { status: 400 });
    }

    const chapter = await prisma.chapter.findUnique({
      where: { id: params.id },
      select: { id: true, subjectId: true },
    });
    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found.' }, { status: 404 });
    }

    if (topicId) {
      const topic = await prisma.topic.findFirst({
        where: { id: topicId, chapterId: chapter.id, subjectId: chapter.subjectId },
        select: { id: true },
      });
      if (!topic) {
        return NextResponse.json({ error: 'The selected topic does not belong to this chapter.' }, { status: 400 });
      }
    }

    const duplicate = await prisma.youTubeClass.findFirst({
      where: { chapterId: chapter.id, youtubeVideoId },
      select: { id: true },
    });
    if (duplicate) {
      return NextResponse.json({ error: 'This YouTube video has already been added to this chapter.' }, { status: 409 });
    }

    const latestLecture = await prisma.youTubeClass.aggregate({
      where: { chapterId: chapter.id },
      _max: { lectureNumber: true },
    });
    const lectureNumber = (latestLecture._max.lectureNumber || 0) + 1;
    const canonicalUrl = `https://www.youtube.com/watch?v=${youtubeVideoId}`;

    const video = await prisma.youTubeClass.create({
      data: {
        subjectId: chapter.subjectId,
        chapterId: chapter.id,
        topicId,
        lectureNumber,
        title,
        shortDescription,
        youtubeUrl: canonicalUrl,
        youtubeVideoId,
        thumbnailUrl: `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`,
        duration: duration || 'Not specified',
        instructorName: instructorName || null,
        isPopular: false,
      },
      include: { topic: true },
    });

    return NextResponse.json({
      message: 'Video added to this chapter.',
      video,
    }, { status: 201 });
  } catch (error) {
    console.error('POST /api/chapters/[id]/videos error:', error);
    return NextResponse.json({ error: 'Could not save this video. Please try again.' }, { status: 500 });
  }
}
