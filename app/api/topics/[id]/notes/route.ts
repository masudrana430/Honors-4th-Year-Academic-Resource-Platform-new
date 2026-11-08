import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const notes = await prisma.studyNote.findMany({
      where: { topicId: params.id },
      orderBy: { createdAt: 'desc' },
      include: { files: true },
    });
    return NextResponse.json({ items: notes });
  } catch (error) {
    console.error('GET /api/topics/[id]/notes error:', error);
    return NextResponse.json({ error: 'Failed to fetch topic notes' }, { status: 500 });
  }
}
