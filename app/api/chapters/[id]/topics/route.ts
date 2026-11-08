import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const topics = await prisma.topic.findMany({
      where: { chapterId: params.id },
      orderBy: { topicNumber: 'asc' },
      include: {
        youtubeClasses: { orderBy: { lectureNumber: 'asc' } },
        studyNotes: { include: { files: true } },
        files: true,
      },
    });
    return NextResponse.json({ items: topics });
  } catch (error) {
    console.error('GET /api/chapters/[id]/topics error:', error);
    return NextResponse.json({ error: 'Failed to fetch chapter topics' }, { status: 500 });
  }
}
