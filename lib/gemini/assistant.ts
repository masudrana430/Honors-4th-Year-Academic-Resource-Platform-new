import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/prisma/client';
import { AIChatResponsePayload, AIChatResourceLink } from '@/types';

interface ParsedAcademicQuery {
  language: 'en' | 'bn' | 'mixed';
  keywords: string[];
  chapterNumber?: number;
  resourceFilter: 'ALL' | 'VIDEO' | 'NOTES' | 'INFO';
  conversationalIntro: string;
}

/**
 * Uses Google Gemini API strictly to interpret natural-language Bangla/English student queries,
 * while PostgreSQL remains the sole source of truth for all returned links and resources.
 */
export async function processAcademicAssistantQuery(
  userQuery: string
): Promise<AIChatResponsePayload> {
  const trimmed = userQuery.trim();

  // Handle assistant identity questions locally, without calling Gemini or the database.
  const identityIntent = detectIdentityIntent(trimmed);
  if (identityIntent) {
    return buildIdentityResponse(identityIntent, fallbackLanguage(trimmed));
  }
  const hasBanglaChars = /[\u0980-\u09FF]/.test(trimmed);
  const hasLatinChars = /[a-zA-Z]/.test(trimmed);
  const fallbackLang: 'en' | 'bn' | 'mixed' =
    hasBanglaChars && hasLatinChars ? 'mixed' : hasBanglaChars ? 'bn' : 'en';

  let parsed: ParsedAcademicQuery = {
    language: fallbackLang,
    keywords: extractFallbackKeywords(trimmed),
    chapterNumber: extractChapterNumber(trimmed),
    resourceFilter: detectResourceFilter(trimmed),
    conversationalIntro: '',
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const systemPrompt = `You are an intent parser for an Honours 4th Year Academic Resource Platform.
Analyze the student's query (which may be in English, Bangla, or mixed Banglish) and output ONLY valid JSON with this exact shape:
{
  "language": "en" | "bn" | "mixed",
  "keywords": ["english search term 1", "english search term 2"],
  "chapterNumber": number | null,
  "resourceFilter": "ALL" | "VIDEO" | "NOTES" | "INFO",
  "conversationalIntro": "A helpful 1-sentence intro in the student's language explaining what you searched for in the database (do NOT invent any links or subject codes). If the student writes Banglish (Bangla expressed with Latin letters), reply in natural Banglish using Latin letters; if Bangla script, reply in Bangla script; if English, reply in English. Do not mix scripts unless the student does."
}
Student query: "${trimmed.replace(/"/g, '\\"')}"`;

      const result = await model.generateContent(systemPrompt);
      const rawText = result.response.text().trim();
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const aiJson = JSON.parse(jsonMatch[0]);
        parsed = {
          language: aiJson.language || fallbackLang,
          keywords:
            Array.isArray(aiJson.keywords) && aiJson.keywords.length > 0
              ? aiJson.keywords.map((k: unknown) => String(k))
              : parsed.keywords,
          chapterNumber:
            typeof aiJson.chapterNumber === 'number'
              ? aiJson.chapterNumber
              : parsed.chapterNumber,
          resourceFilter: ['ALL', 'VIDEO', 'NOTES', 'INFO'].includes(aiJson.resourceFilter)
            ? aiJson.resourceFilter
            : parsed.resourceFilter,
          conversationalIntro: String(aiJson.conversationalIntro || ''),
        };
      }
    } catch (err) {
      console.warn('Gemini intent parsing fell back to deterministic keyword parser:', err);
    }
  }

  // Query PostgreSQL as the strict source of truth
  const searchTerms = parsed.keywords.length > 0 ? parsed.keywords : [trimmed];
  const orConditions = searchTerms.flatMap((term) => [
    { title: { contains: term, mode: 'insensitive' as const } },
    { shortDescription: { contains: term, mode: 'insensitive' as const } },
  ]);

  const resources: AIChatResourceLink[] = [];

  if (parsed.resourceFilter === 'ALL' || parsed.resourceFilter === 'INFO') {
    const subjects = await prisma.subject.findMany({
      where: {
        OR: searchTerms.flatMap((term) => [
          { name: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
          { code: { contains: term, mode: 'insensitive' } },
        ]),
      },
      take: 4,
    });

    for (const sub of subjects) {
      resources.push({
        id: sub.id,
        type: 'SUBJECT',
        title: `${sub.name}${sub.code ? ` (${sub.code})` : ''}`,
        contextLabel: sub.department,
        href: `/subjects/${sub.id}`,
      });
    }

    const chapters = await prisma.chapter.findMany({
      where: {
        AND: [
          parsed.chapterNumber ? { chapterNumber: parsed.chapterNumber } : {},
          {
            OR: searchTerms.flatMap((term) => [
              { title: { contains: term, mode: 'insensitive' } },
              { description: { contains: term, mode: 'insensitive' } },
              { subject: { name: { contains: term, mode: 'insensitive' } } },
            ]),
          },
        ],
      },
      include: { subject: true },
      take: 5,
    });

    for (const ch of chapters) {
      resources.push({
        id: ch.id,
        type: 'CHAPTER',
        title: `Chapter ${String(ch.chapterNumber).padStart(2, '0')}: ${ch.title}`,
        contextLabel: ch.subject.name,
        href: `/chapters/${ch.id}`,
      });
    }
  }

  if (parsed.resourceFilter === 'ALL' || parsed.resourceFilter === 'VIDEO') {
    const videos = await prisma.youTubeClass.findMany({
      where: {
        AND: [
          parsed.chapterNumber ? { chapter: { chapterNumber: parsed.chapterNumber } } : {},
          orConditions.length > 0 ? { OR: orConditions } : {},
        ],
      },
      include: { subject: true, chapter: true },
      take: 5,
    });

    for (const vid of videos) {
      resources.push({
        id: vid.id,
        type: 'YOUTUBE',
        title: `Lecture ${String(vid.lectureNumber).padStart(2, '0')}: ${vid.title}`,
        contextLabel: `${vid.subject.name} • Ch ${vid.chapter.chapterNumber}`,
        href: `/chapters/${vid.chapterId}`,
        externalUrl: vid.youtubeUrl,
      });
    }
  }

  if (parsed.resourceFilter === 'ALL' || parsed.resourceFilter === 'NOTES') {
    const files = await prisma.file.findMany({
      where: {
        AND: [
          parsed.chapterNumber ? { chapter: { chapterNumber: parsed.chapterNumber } } : {},
          {
            OR: searchTerms.flatMap((term) => [
              { fileName: { contains: term, mode: 'insensitive' } },
              { topic: { title: { contains: term, mode: 'insensitive' } } },
              { studyNote: { title: { contains: term, mode: 'insensitive' } } },
            ]),
          },
        ],
      },
      include: { subject: true, chapter: true, topic: true },
      take: 6,
    });

    for (const f of files) {
      resources.push({
        id: f.id,
        type: f.fileType === 'PDF' ? 'PDF' : 'IMAGE',
        title: f.fileName,
        contextLabel: `${f.subject.name} • Ch ${f.chapter.chapterNumber} • ${f.topic.title}`,
        href: `/chapters/${f.chapterId}`,
        externalUrl: f.driveShareUrl,
      });
    }
  }

  const answer =
    resources.length > 0
      ? parsed.conversationalIntro ||
        (parsed.language === 'bn'
          ? `আপনার প্রশ্নের সাথে মিল রয়েছে এমন ${resources.length}টি একাডেমিক রিসোর্স ডাটাবেস থেকে পাওয়া গেছে:`
          : `I found ${resources.length} verified academic resource(s) in the PostgreSQL database matching your query:`)
      : parsed.language === 'bn'
      ? 'দুঃখিত, আপনার প্রশ্নের সাথে সরাসরি মিলে এমন কোনো রিসোর্স ডাটাবেসে পাওয়া যায়নি। নিচের প্রস্তাবিত বিষয়গুলো দেখতে পারেন:'
      : 'No exact database records matched your query. Remember that I only return verified resources stored in PostgreSQL. Try one of the suggested queries below:';

  return {
    answer,
    detectedLanguage: parsed.language,
    interpretedIntent: {
      subjectQuery: parsed.keywords.join(', '),
      chapterNumber: parsed.chapterNumber,
      resourceFilter: parsed.resourceFilter,
    },
    resources,
    suggestions: [
      'Show me all fourth-year physics subjects',
      'Find the third chapter of Atomic and Molecular Physics',
      'I need Quantum Theory video classes',
      'Show me PDF notes about molecular spectra',
      'Find chapter-wise classes about electromagnetic theory',
    ],
  };
}

function extractFallbackKeywords(query: string): string[] {
  const stopWords = new Set([
    'show', 'me', 'all', 'fourth', 'year', '4th', 'honors', 'honours', 'find',
    'the', 'of', 'i', 'need', 'about', 'for', 'this', 'subject', 'chapter',
    'video', 'videos', 'classes', 'class', 'pdf', 'notes', 'note', 'open',
    'topic', 'wise', 'and', 'in', 'to', 'a', 'an',
  ]);
  const words = query
    .toLowerCase()
    .replace(/[^\w\s\u0980-\u09FF]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));
  return words.length > 0 ? words : ['physics'];
}

function extractChapterNumber(query: string): number | undefined {
  const lower = query.toLowerCase();
  if (lower.includes('first chapter') || lower.includes('chapter 1') || lower.includes('chapter one') || lower.includes('প্রথম অধ্যায়')) return 1;
  if (lower.includes('second chapter') || lower.includes('chapter 2') || lower.includes('chapter two') || lower.includes('দ্বিতীয় অধ্যায়')) return 2;
  if (lower.includes('third chapter') || lower.includes('chapter 3') || lower.includes('chapter three') || lower.includes('তৃতীয় অধ্যায়')) return 3;
  if (lower.includes('fourth chapter') || lower.includes('chapter 4') || lower.includes('chapter four') || lower.includes('চতুর্থ অধ্যায়')) return 4;
  const match = lower.match(/chapter\s*0?(\d+)/);
  return match ? parseInt(match[1], 10) : undefined;
}

function detectResourceFilter(query: string): 'ALL' | 'VIDEO' | 'NOTES' | 'INFO' {
  const lower = query.toLowerCase();
  if (lower.includes('video') || lower.includes('youtube') || lower.includes('class') || lower.includes('lecture') || lower.includes('ভিডিও') || lower.includes('ক্লাস')) {
    return 'VIDEO';
  }
  if (lower.includes('pdf') || lower.includes('note') || lower.includes('image') || lower.includes('নোট') || lower.includes('পিডিএফ')) {
    return 'NOTES';
  }
  return 'ALL';
}



type IdentityIntent = 'name' | 'creator' | 'about';

const ASSISTANT_NAME = 'Campus Assistant';
const ASSISTANT_CREATOR = 'Masud Rana';

function fallbackLanguage(query: string): 'en' | 'bn' | 'mixed' {
  const hasBangla = /[\u0980-\u09FF]/.test(query);
  const hasLatin = /[a-zA-Z]/.test(query);
  return hasBangla && hasLatin ? 'mixed' : hasBangla ? 'bn' : 'en';
}

function detectIdentityIntent(query: string): IdentityIntent | null {
  const q = query.toLowerCase()
    .replace(/\bwhat['’]s\b/g, 'what is')
    .replace(/[?!.,'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (
    /\b(who|which person)\s+(created|made|developed|built)\s+you\b/.test(q) ||
    /\bwho is your (creator|developer|owner|maker)\b/.test(q) ||
    /\b(your creator|your developer|your maker)\b/.test(q) ||
    /তোমাকে কে (তৈরি|বানিয়েছে|বানিয়েছে|ডেভেলপ করেছে)/.test(q) ||
    /আপনাকে কে (তৈরি|বানিয়েছে|বানিয়েছে|ডেভেলপ করেছে)/.test(q) ||
    /(তোমার|আপনার) (নির্মাতা|ডেভেলপার|ক্রিয়েটর|ক্রিয়েটর) কে/.test(q) ||
    /\bke (tomake|apnake) (toiri|baniyeche|develop koreche|create koreche)\b/.test(q)
  ) return 'creator';

  if (
    /\b(what is|tell me)\s+your\s+name\b/.test(q) ||
    /\bwhat should i call you\b/.test(q) ||
    /\byour name\b/.test(q) ||
    /(তোমার|আপনার) নাম (কি|কী)/.test(q) ||
    /(তোমার|আপনার) নাম বল/.test(q) ||
    /\b(tomar|apnar) nam (ki|bolo)\b/.test(q)
  ) return 'name';

  if (
    /\b(who are you|what are you|introduce yourself|tell me about yourself)\b/.test(q) ||
    /তুমি কে|আপনি কে|তোমার পরিচয় কি|তোমার পরিচয় কি|নিজের পরিচয় দাও|নিজের পরিচয় দাও/.test(q) ||
    /\b(tumi ke|apni ke|nijer porichoy dao)\b/.test(q)
  ) return 'about';

  return null;
}

function buildIdentityResponse(
  intent: IdentityIntent,
  language: 'en' | 'bn' | 'mixed'
): AIChatResponsePayload {
  let answer: string;

  if (language === 'bn') {
    if (intent === 'name') answer = `আমার নাম ${ASSISTANT_NAME}। আমি তোমার একাডেমিক সহকারী।`;
    else if (intent === 'creator') answer = `আমাকে তৈরি ও ডেভেলপ করেছেন ${ASSISTANT_CREATOR}।`;
    else answer = `আমি ${ASSISTANT_NAME}, এই Honors 4th Year Academic Resource Platform-এর AI একাডেমিক সহকারী। আমাকে তৈরি ও ডেভেলপ করেছেন ${ASSISTANT_CREATOR}।`;
  } else if (language === 'mixed') {
    if (intent === 'name') answer = `Amar naam ${ASSISTANT_NAME}. Ami apnar academic assistant.`;
    else if (intent === 'creator') answer = `Amake create ebong develop korechen ${ASSISTANT_CREATOR}.`;
    else answer = `Assalamu Alaikum! Ami ${ASSISTANT_NAME}. Amake ${ASSISTANT_CREATOR} build korechen. Bolun, apnar kon chapter-ti proyojon?`;
  } else {
    if (intent === 'name') answer = `My name is ${ASSISTANT_NAME}. I'm your academic assistant.`;
    else if (intent === 'creator') answer = `I was created and developed by ${ASSISTANT_CREATOR}.`;
    else answer = `Assalamu Alaikum! I am ${ASSISTANT_NAME}. I was created by ${ASSISTANT_CREATOR}. Which chapter do you need?`;
  }

  return {
    answer,
    detectedLanguage: language,
    interpretedIntent: { subjectQuery: '', chapterNumber: undefined, resourceFilter: 'INFO' },
    resources: [],
    suggestions: [
      'Show me all fourth-year physics subjects',
      'Find Quantum Mechanics lecture videos',
      'Show me available PDF notes',
    ],
  };
}
