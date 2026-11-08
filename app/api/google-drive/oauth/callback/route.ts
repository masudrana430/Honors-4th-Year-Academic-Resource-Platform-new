import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const savedState = request.cookies.get('drive_oauth_state')?.value;
  if (!code || !state || !savedState || state !== savedState) {
    return NextResponse.json({ error: 'Invalid or expired OAuth state. Start setup again.' }, { status: 400 });
  }

  const { GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI } = process.env;
  if (!GOOGLE_DRIVE_CLIENT_ID || !GOOGLE_DRIVE_CLIENT_SECRET || !GOOGLE_DRIVE_REDIRECT_URI) {
    return NextResponse.json({ error: 'Google OAuth environment variables are missing.' }, { status: 500 });
  }

  try {
    const oauth = new google.auth.OAuth2(GOOGLE_DRIVE_CLIENT_ID, GOOGLE_DRIVE_CLIENT_SECRET, GOOGLE_DRIVE_REDIRECT_URI);
    const { tokens } = await oauth.getToken(code);
    if (!tokens.refresh_token) {
      return NextResponse.json({
        error: 'Google did not return a refresh token. Revoke this app access from your Google Account and run OAuth setup again.',
      }, { status: 400 });
    }
    const response = NextResponse.json({
      message: 'OAuth connected. Copy this refresh token into Vercel as GOOGLE_DRIVE_REFRESH_TOKEN, then redeploy.',
      refresh_token: tokens.refresh_token,
      reminder: 'Treat this token like a password. Do not share it or commit it to GitHub.',
    });
    response.headers.set('Cache-Control', 'no-store, private');
    response.cookies.delete('drive_oauth_state');
    return response;
  } catch (error) {
    console.error('Google Drive OAuth callback failed:', error);
    return NextResponse.json({ error: 'Google OAuth code exchange failed. Check the redirect URI and OAuth client settings.' }, { status: 500 });
  }
}
