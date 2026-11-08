import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { processAcademicAssistantQuery } from '@/lib/gemini/assistant';

const chatRequestSchema = z.object({
  query: z.string().min(1, 'Query is required').max(500),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = chatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query payload', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const responsePayload = await processAcademicAssistantQuery(parsed.data.query);
    return NextResponse.json(responsePayload);
  } catch (error) {
    console.error('POST /api/ai/chat error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI academic assistant request' },
      { status: 500 }
    );
  }
}
