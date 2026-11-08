import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { processAcademicAssistantQuery } from '@/lib/gemini/assistant';

const aiSearchSchema = z.object({
  query: z.string().min(1).max(500),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = aiSearchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid search query' }, { status: 400 });
    }
    const result = await processAcademicAssistantQuery(parsed.data.query);
    return NextResponse.json(result);
  } catch (error) {
    console.error('POST /api/ai/search error:', error);
    return NextResponse.json({ error: 'AI search failed' }, { status: 500 });
  }
}
