import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { google } from 'googleapis';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const requestSchema = z.object({
  text: z.string().trim().min(1).max(1500),
  language: z.enum(['bn-BD', 'en-US', 'mixed']).default('mixed'),
  gender: z.enum(['female', 'male']).default('female'),
});

type VoiceConfig = {
  languageCode: 'bn-IN' | 'en-IN' | 'en-US';
  name: string;
};

// Reuse the OAuth client between warm serverless invocations to avoid an extra token exchange per sentence.
let cachedTtsAuth: any = null;
let cachedCredentialsJson: string | null = null;

function selectVoice(text: string, language: 'bn-BD' | 'en-US' | 'mixed', gender: 'female' | 'male'): VoiceConfig {
  const hasBanglaScript = /[\u0980-\u09FF]/.test(text);
  const banglishWords = /\b(ami|amra|apni|tumi|tomar|amar|amake|apnake|kemon|keno|kothay|ki|korbo|korte|chai|lagbe|ache|nei|hobe|dekhao|bolo|bolun|dorkar|ekhon|ekhane|okhane|bhalo|valo|dhonnobad)\b/i;
  const isBanglish = !hasBanglaScript && banglishWords.test(text);

  if (language === 'bn-BD' || (language === 'mixed' && hasBanglaScript)) {
    return {
      languageCode: 'bn-IN',
      name: gender === 'female' ? 'bn-IN-Chirp3-HD-Leda' : 'bn-IN-Chirp3-HD-Orus',
    };
  }

  if (isBanglish) {
    return {
      languageCode: 'en-IN',
      name: gender === 'female' ? 'en-IN-Chirp3-HD-Leda' : 'en-IN-Chirp3-HD-Orus',
    };
  }

  return {
    languageCode: 'en-US',
    name: gender === 'female' ? 'en-US-Chirp3-HD-Aoede' : 'en-US-Chirp3-HD-Charon',
  };
}

export async function POST(request: NextRequest) {
  try {
    const origin = request.headers.get('origin');
    const requestHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
    if (origin && requestHost) {
      const originHost = new URL(origin).host.toLowerCase();
      if (originHost !== requestHost.split(',')[0].trim().toLowerCase()) {
        return NextResponse.json({ error: 'CROSS_ORIGIN_REQUEST', message: 'Cross-origin TTS requests are not allowed.' }, { status: 403 });
      }
    }

    const body = await request.json();
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'INVALID_TTS_REQUEST', message: 'Text must be between 1 and 1500 characters.' }, { status: 400 });
    }


    if (Buffer.byteLength(parsed.data.text, 'utf8') > 4500) {
      return NextResponse.json({
        error: 'TTS_TEXT_TOO_LONG',
        message: 'Voice-এর জন্য text অনেক বড়। অনুগ্রহ করে সংক্ষিপ্ত করে আবার চেষ্টা করুন।',
      }, { status: 400 });
    }

    const serviceAccountJson = process.env.GOOGLE_CLOUD_TTS_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      return NextResponse.json({
        error: 'TTS_NOT_CONFIGURED',
        message: 'Google Cloud TTS সেটআপ হয়নি। Vercel Environment Variables-এ GOOGLE_CLOUD_TTS_SERVICE_ACCOUNT_JSON যোগ করুন।',
      }, { status: 503 });
    }

    let credentials: Record<string, unknown>;
    try {
      credentials = JSON.parse(serviceAccountJson) as Record<string, unknown>;
    } catch {
      return NextResponse.json({
        error: 'INVALID_TTS_CREDENTIALS',
        message: 'Google Cloud service-account JSON সঠিক JSON format-এ নেই।',
      }, { status: 503 });
    }

    if (credentials.type !== 'service_account' || typeof credentials.client_email !== 'string' || typeof credentials.private_key !== 'string') {
      return NextResponse.json({
        error: 'INVALID_TTS_CREDENTIALS',
        message: 'Service-account JSON-এ client_email ও private_key থাকতে হবে।',
      }, { status: 503 });
    }

    if (!cachedTtsAuth || cachedCredentialsJson !== serviceAccountJson) {
      cachedTtsAuth = new google.auth.GoogleAuth({
        credentials: credentials as any,
        scopes: ['https://www.googleapis.com/auth/cloud-platform'],
      });
      cachedCredentialsJson = serviceAccountJson;
    }
    const accessToken = await cachedTtsAuth.getAccessToken();
    if (!accessToken) {
      return NextResponse.json({
        error: 'TTS_AUTH_FAILED',
        message: 'Google Cloud authentication token পাওয়া যায়নি। Service-account credentials যাচাই করুন।',
      }, { status: 502 });
    }

    const voice = selectVoice(parsed.data.text, parsed.data.language, parsed.data.gender);
    const googleResponse = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + accessToken,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: { text: parsed.data.text },
        voice,
        // Chirp 3 HD does not accept SSML, speakingRate, or pitch parameters.
        audioConfig: { audioEncoding: 'MP3' },
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(25000),
    });

    if (!googleResponse.ok) {
      console.error('Google Cloud TTS returned HTTP status:', googleResponse.status);
      const message = googleResponse.status === 403
        ? 'Google Cloud TTS request প্রত্যাখ্যান করেছে। API enable, billing এবং service-account project access যাচাই করুন।'
        : 'Google Cloud TTS থেকে voice তৈরি করা যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।';
      return NextResponse.json({
        error: 'TTS_PROVIDER_ERROR',
        message,
      }, { status: 502 });
    }

    const result = await googleResponse.json() as { audioContent?: string };
    if (!result.audioContent) {
      return NextResponse.json({
        error: 'EMPTY_TTS_AUDIO',
        message: 'Google Cloud TTS কোনো audio ফেরত দেয়নি। আবার চেষ্টা করুন।',
      }, { status: 502 });
    }

    const audioBytes = new Uint8Array(Buffer.from(result.audioContent, 'base64'));
    return new NextResponse(audioBytes, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    const isTimeout = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    console.error('POST /api/tts failed:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json({
      error: isTimeout ? 'TTS_TIMEOUT' : 'TTS_SERVER_ERROR',
      message: isTimeout
        ? 'Voice তৈরি করতে বেশি সময় লাগছে। আবার চেষ্টা করুন।'
        : 'Google Cloud TTS authentication বা server error হয়েছে। Credentials ও IAM permission যাচাই করুন।',
    }, { status: isTimeout ? 504 : 502 });
  }
}
