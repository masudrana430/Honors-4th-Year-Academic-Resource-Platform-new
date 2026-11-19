import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { requireContributionPassword } from '@/lib/contribution-auth';
import { parseVideoLink } from '@/lib/video-platform';

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
        youtubeUrl: videoLink.canonicalUrl,
        youtubeVideoId,
        thumbnailUrl: videoLink.thumbnailUrl,
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
