import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { requireContributionPassword } from '@/lib/contribution-auth';
import { parseVideoLink } from '@/lib/video-platform';

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
    if (!youtubeUrl || youtubeUrl.length > 2000) {
      return NextResponse.json({ error: 'A video link up to 2,000 characters is required.' }, { status: 400 });
    }
    if (shortDescription.length > 2000 || duration.length > 30 || instructorName.length > 120) {
      return NextResponse.json({ error: 'One or more video details exceed the allowed length.' }, { status: 400 });
    }

    const videoLink = parseVideoLink(youtubeUrl);
    if (!videoLink) {
      return NextResponse.json({ error: 'Enter a valid public HTTPS video link (YouTube, Facebook, Vimeo, Dailymotion, TikTok, Instagram, Google Drive or another video host).' }, { status: 400 });
    }
    const youtubeVideoId = videoLink.key;

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
    const canonicalUrl = videoLink.canonicalUrl;

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
        thumbnailUrl: videoLink.thumbnailUrl,
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
