import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subject = await prisma.subject.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
      include: {
        category: true,
        chapters: {
          orderBy: { chapterNumber: 'asc' },
          include: {
            _count: {
              select: {
                topics: true,
                youtubeClasses: true,
                studyNotes: true,
                files: true,
              },
            },
          },
        },
        _count: {
          select: {
            chapters: true,
            youtubeClasses: true,
            studyNotes: true,
            files: true,
          },
        },
      },
    });

    if (!subject) {
      return NextResponse.json({ error: 'Subject not found' }, { status: 404 });
    }

    return NextResponse.json(subject);
  } catch (error) {
    console.error('GET /api/subjects/[id] error:', error);
    return NextResponse.json({ error: 'Failed to load subject details' }, { status: 500 });
  }
}
