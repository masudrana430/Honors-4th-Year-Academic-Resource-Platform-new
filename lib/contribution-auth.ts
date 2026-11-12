import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

/** Shared password for community video and study-note submissions. */
export function requireContributionPassword(request: NextRequest): NextResponse | null {
  const expected = process.env.CONTENT_UPLOAD_PASSWORD;
  const supplied = request.headers.get('x-content-upload-password');
  if (!expected || !supplied) {
    return NextResponse.json({ error: 'A valid content upload password is required. Please configure CONTENT_UPLOAD_PASSWORD.' }, { status: 401 });
  }
  const expectedBytes = Buffer.from(expected);
  const suppliedBytes = Buffer.from(supplied);
  if (expectedBytes.length !== suppliedBytes.length || !timingSafeEqual(expectedBytes, suppliedBytes)) {
    return NextResponse.json({ error: 'Incorrect content upload password.' }, { status: 401 });
  }
  return null;
}
