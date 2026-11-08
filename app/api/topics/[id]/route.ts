import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topic = await prisma.topic.findUnique({
      where: { id: params.id },
      include: {
        chapter: { include: { subject: true } },
        youtubeClasses: { orderBy: { lectureNumber: 'asc' } },
        studyNotes: { include: { files: true } },
        files: true,
      },
    });
    if (!topic) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json(topic);
  } catch (error) {
    console.error('GET /api/topics/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}
