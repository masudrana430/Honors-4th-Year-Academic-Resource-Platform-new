import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const filter = searchParams.get('filter') || 'ALL';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10)));

    const whereClause = {
      subjectId: params.id,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' as const } },
              { description: { contains: q, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(filter === 'HAS_VIDEOS' ? { youtubeClasses: { some: {} } } : {}),
      ...(filter === 'HAS_NOTES' ? { files: { some: {} } } : {}),
    };

    const [total, chapters] = await Promise.all([
      prisma.chapter.count({ where: whereClause }),
      prisma.chapter.findMany({
        where: whereClause,
        orderBy: { chapterNumber: 'asc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
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
      }),
    ]);

    return NextResponse.json({
      items: chapters,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  } catch (error) {
    console.error('GET /api/subjects/[id]/chapters error:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}
