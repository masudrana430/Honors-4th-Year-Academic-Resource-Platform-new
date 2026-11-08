import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const chapter = await prisma.chapter.findUnique({
      where: { id: params.id },
      include: {
        subject: true,
        youtubeClasses: {
          orderBy: { lectureNumber: 'asc' },
        },
        topics: {
          orderBy: { topicNumber: 'asc' },
          include: {
            youtubeClasses: { orderBy: { lectureNumber: 'asc' } },
            studyNotes: {
              include: { files: true },
            },
            files: {
              orderBy: { createdAt: 'desc' },
            },
          },
        },
      },
    });

    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.error('GET /api/chapters/[id] error:', error);
    return NextResponse.json({ error: 'Failed to fetch chapter details' }, { status: 500 });
  }
}
