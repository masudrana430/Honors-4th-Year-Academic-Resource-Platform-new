import { NextRequest, NextResponse } from 'next/server';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { google } from 'googleapis';

export const runtime = 'nodejs';

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export async function GET(request: NextRequest) {
  const setupSecret = process.env.GOOGLE_DRIVE_OAUTH_SETUP_SECRET;
  const supplied = request.nextUrl.searchParams.get('key') || '';
  if (!setupSecret || !safeEqual(supplied, setupSecret)) {
    return NextResponse.json({ error: 'Unauthorized OAuth setup request.' }, { status: 401 });
  }

  const { GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI } = process.env;
  if (!GOOGLE_DRIVE_CLIENT_ID || !GOOGLE_DRIVE_CLIENT_SECRET || !GOOGLE_DRIVE_REDIRECT_URI) {
    return NextResponse.json({ error: 'Configure Google OAuth client ID, secret and redirect URI first.' }, { status: 500 });
  }

  const state = randomBytes(32).toString('hex');
  const oauth = new google.auth.OAuth2(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI);
  const url = oauth.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/drive'],
    state,
  });
  const response = NextResponse.redirect(url);
  response.cookies.set('drive_oauth_state', state, {
    httpOnly: true, secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax', path: '/api/google-drive/oauth/callback', maxAge: 600,
  });
  return response;
}
