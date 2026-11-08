import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const category = (searchParams.get('category') || '').trim();
    const sort = searchParams.get('sort') || 'alphabetical';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(24, Math.max(1, parseInt(searchParams.get('pageSize') || '9', 10)));

    const whereClause = {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q, mode: 'insensitive' as const } },
                { code: { contains: q, mode: 'insensitive' as const } },
                { description: { contains: q, mode: 'insensitive' as const } },
              ],
            }
          : {},
        category && category !== 'ALL' ? { category: { slug: category } } : {},
      ],
    };

    const orderBy =
      sort === 'newest'
        ? { createdAt: 'desc' as const }
        : { name: 'asc' as const };

    const [total, subjects] = await Promise.all([
      prisma.subject.count({ where: whereClause }),
      prisma.subject.findMany({
        where: whereClause,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          category: true,
          _count: {
            select: {
              chapters: true,
              youtubeClasses: true,
              studyNotes: true,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      items: subjects.map((s) => ({
        id: s.id,
        code: s.code,
        name: s.name,
        slug: s.slug,
        department: s.department,
        description: s.description,
        iconName: s.iconName,
        isSampleData: s.isSampleData,
        categoryName: s.category?.name ?? null,
        chaptersCount: s._count.chapters,
        youtubeClassesCount: s._count.youtubeClasses,
        notesCount: s._count.studyNotes,
        createdAt: s.createdAt.toISOString(),
      })),
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  } catch (error) {
    console.error('GET /api/subjects error:', error);
    return NextResponse.json({ error: 'Failed to fetch subjects' }, { status: 500 });
  }
}
