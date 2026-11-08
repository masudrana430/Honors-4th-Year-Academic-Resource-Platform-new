import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

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
