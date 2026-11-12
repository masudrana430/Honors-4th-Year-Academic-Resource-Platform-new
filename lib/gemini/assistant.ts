import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/prisma/client';
import { AIChatResponsePayload, AIChatResourceLink } from '@/types';
import {
  CLASSICAL_ELECTRODYNAMICS_QUESTION_BANK,
  getLectureNumbersForQuestion,
} from '@/lib/academic/classical-electrodynamics-question-bank';
import { STATISTICAL_MECHANICS_QUESTION_BANK } from '@/lib/academic/statistical-mechanics-question-bank';
import { SOLID_STATE_PHYSICS_2_QUESTION_BANK } from '@/lib/academic/solid-state-physics-2-question-bank';
import { QUANTUM_MECHANICS_2_QUESTION_BANK } from '@/lib/academic/quantum-mechanics-2-question-bank';
import { NUCLEAR_PHYSICS_2_QUESTION_BANK } from '@/lib/academic/nuclear-physics-2-question-bank';
import { ELECTRONICS_2_QUESTION_BANK } from '@/lib/academic/electronics-2-question-bank';

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

      const systemPrompt = `You are an intent parser for an BraKet (⟨φ|ψ⟩).
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


  // Match question-first queries against the supplied Nuclear Physics-2 QC list.
  // Match question-first queries against the supplied Solid State Physics-2 QC list.
  const solidStatePhysics2QuestionMatches = await findAcademicQuestionMatches(
    trimmed,
    parsed.keywords,
    SOLID_STATE_PHYSICS_2_QUESTION_BANK,
    'PHYS-403'
  );
  if (solidStatePhysics2QuestionMatches.length === 1) {
    const match = solidStatePhysics2QuestionMatches[0];
    const language = parsed.language || fallbackLang;
    if (match.video) {
      const video = match.video;
      return {
        answer: language === 'en'
          ? "I matched your Solid State Physics-2 question to chapter " + match.topic.code + ", question " + match.question.number + ". Opening the exact lecture."
          : language === 'mixed'
            ? "Solid State Physics-2 er chapter " + match.topic.code + ", question " + match.question.number + " match korechi. Exact lecture-ti open korchi."
            : "কঠিন অবস্থার পদার্থবিজ্ঞান-২-এর অধ্যায় " + match.topic.code + "-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি। সংশ্লিষ্ট ভিডিও ক্লাসটি খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: video.subject.name,
          chapterNumber: video.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'VIDEO',
        },
        resources: [{
          id: video.id,
          type: 'YOUTUBE',
          title: video.title,
          contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
          externalUrl: video.youtubeUrl,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
        },
        suggestions: [],
      };
    }

    if (match.topicRecord) {
      const topicRecord = match.topicRecord;
      return {
        answer: language === 'en'
          ? "I identified Solid State Physics-2 question " + match.question.number + ", but no YouTube lecture is linked to it. Opening its chapter topic."
          : language === 'mixed'
            ? "Solid State Physics-2 er question " + match.question.number + " identify korechi, kintu ei question-er jonno kono video linked nei. Topic-ti open korchi."
            : "কঠিন অবস্থার পদার্থবিজ্ঞান-২-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি, তবে এই প্রশ্নের জন্য কোনো নির্দিষ্ট ভিডিও যুক্ত নেই। সংশ্লিষ্ট অধ্যায়ের Topic খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: topicRecord.chapter.subject.name,
          chapterNumber: topicRecord.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'INFO',
        },
        resources: [{
          id: topicRecord.id,
          type: 'TOPIC',
          title: match.topic.code + " — " + topicRecord.title,
          contextLabel: topicRecord.chapter.subject.name + " • Chapter " + topicRecord.chapter.chapterNumber,
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        },
        suggestions: [],
      };
    }
  } else if (solidStatePhysics2QuestionMatches.length > 1) {
    const language = parsed.language || fallbackLang;
    return {
      answer: language === 'en'
        ? "I found more than one closely matching Solid State Physics-2 question. Choose the exact lecture below."
        : language === 'mixed'
          ? "Solid State Physics-2 er ekadhik matching question peyechi. Nicher list theke exact lecture-ti select korun."
          : "কঠিন অবস্থার পদার্থবিজ্ঞান-২-এ একাধিক কাছাকাছি প্রশ্নের মিল পেয়েছি। নিচের তালিকা থেকে সঠিক অধ্যায় ও ভিডিও ক্লাস নির্বাচন করুন।",
      detectedLanguage: language,
      interpretedIntent: {
        subjectQuery: "Solid State Physics-2 (কঠিন অবস্থার পদার্থবিজ্ঞান-২)",
        resourceFilter: 'VIDEO',
      },
      resources: solidStatePhysics2QuestionMatches.map((match) => {
        const video = match.video;
        return video
          ? {
              id: video.id,
              type: 'YOUTUBE' as const,
              title: video.title,
              contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
              href: "/chapters/" + video.chapterId + "#video-" + video.id,
              externalUrl: video.youtubeUrl,
            }
          : {
              id: match.topicRecord?.id || "solid-state-physics-2-chapter-" + match.topic.chapterNumber,
              type: 'TOPIC' as const,
              title: match.topic.code + " — " + match.topic.title + " (প্রশ্ন " + toBengaliQuestionNumber(match.question.number) + ")",
              contextLabel: "Solid State Physics-2",
              href: match.topicRecord
                ? "/chapters/" + match.topicRecord.chapterId + "#topic-" + match.topicRecord.id
                : "/subjects/sub-solid-403",
            };
      }),
      suggestions: [],
    };
  }

  // Match question-first queries against the supplied Quantum Mechanics-2 QC list.
  const quantumMechanics2QuestionMatches = await findAcademicQuestionMatches(
    trimmed,
    parsed.keywords,
    QUANTUM_MECHANICS_2_QUESTION_BANK,
    'PHYS-402'
  );
  if (quantumMechanics2QuestionMatches.length === 1) {
    const match = quantumMechanics2QuestionMatches[0];
    const language = parsed.language || fallbackLang;
    if (match.video) {
      const video = match.video;
      return {
        answer: language === 'en'
          ? "I matched your Quantum Mechanics-2 question to chapter " + match.topic.code + ", question " + match.question.number + ". Opening the exact lecture."
          : language === 'mixed'
            ? "Quantum Mechanics-2 er chapter " + match.topic.code + ", question " + match.question.number + " match korechi. Exact lecture-ti open korchi."
            : "কোয়ান্টাম মেকানিক্স-২-এর অধ্যায় " + match.topic.code + "-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি। সংশ্লিষ্ট ভিডিও ক্লাসটি খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: video.subject.name,
          chapterNumber: video.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'VIDEO',
        },
        resources: [{
          id: video.id,
          type: 'YOUTUBE',
          title: video.title,
          contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
          externalUrl: video.youtubeUrl,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
        },
        suggestions: [],
      };
    }

    if (match.topicRecord) {
      const topicRecord = match.topicRecord;
      return {
        answer: language === 'en'
          ? "I identified Quantum Mechanics-2 question " + match.question.number + ", but no YouTube lecture is linked to it. Opening its chapter topic."
          : language === 'mixed'
            ? "Quantum Mechanics-2 er question " + match.question.number + " identify korechi, kintu ei question-er jonno kono video linked nei. Topic-ti open korchi."
            : "কোয়ান্টাম মেকানিক্স-২-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি, তবে এই প্রশ্নের জন্য কোনো নির্দিষ্ট ভিডিও যুক্ত নেই। সংশ্লিষ্ট অধ্যায়ের Topic খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: topicRecord.chapter.subject.name,
          chapterNumber: topicRecord.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'INFO',
        },
        resources: [{
          id: topicRecord.id,
          type: 'TOPIC',
          title: match.topic.code + " — " + topicRecord.title,
          contextLabel: topicRecord.chapter.subject.name + " • Chapter " + topicRecord.chapter.chapterNumber,
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        },
        suggestions: [],
      };
    }
  } else if (quantumMechanics2QuestionMatches.length > 1) {
    const language = parsed.language || fallbackLang;
    return {
      answer: language === 'en'
        ? "I found more than one closely matching Quantum Mechanics-2 question. Choose the exact lecture below."
        : language === 'mixed'
          ? "Quantum Mechanics-2 er ekadhik matching question peyechi. Nicher list theke exact lecture-ti select korun."
          : "কোয়ান্টাম মেকানিক্স-২-এ একাধিক কাছাকাছি প্রশ্নের মিল পেয়েছি। নিচের তালিকা থেকে সঠিক অধ্যায় ও ভিডিও ক্লাস নির্বাচন করুন।",
      detectedLanguage: language,
      interpretedIntent: {
        subjectQuery: "Quantum Mechanics-2 (কোয়ান্টাম মেকানিক্স-২)",
        resourceFilter: 'VIDEO',
      },
      resources: quantumMechanics2QuestionMatches.map((match) => {
        const video = match.video;
        return video
          ? {
              id: video.id,
              type: 'YOUTUBE' as const,
              title: video.title,
              contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
              href: "/chapters/" + video.chapterId + "#video-" + video.id,
              externalUrl: video.youtubeUrl,
            }
          : {
              id: match.topicRecord?.id || "quantum-mechanics-2-chapter-" + match.topic.chapterNumber,
              type: 'TOPIC' as const,
              title: match.topic.code + " — " + match.topic.title + " (প্রশ্ন " + toBengaliQuestionNumber(match.question.number) + ")",
              contextLabel: "Quantum Mechanics-2",
              href: match.topicRecord
                ? "/chapters/" + match.topicRecord.chapterId + "#topic-" + match.topicRecord.id
                : "/subjects/sub-qm-402",
            };
      }),
      suggestions: [],
    };
  }

  const nuclearPhysics2QuestionMatches = await findAcademicQuestionMatches(
    trimmed,
    parsed.keywords,
    NUCLEAR_PHYSICS_2_QUESTION_BANK,
    'PHYS-401'
  );
  if (nuclearPhysics2QuestionMatches.length === 1) {
    const match = nuclearPhysics2QuestionMatches[0];
    const language = parsed.language || fallbackLang;
    if (match.video) {
      const video = match.video;
      return {
        answer: language === 'en'
          ? "I matched your Nuclear Physics-2 question to chapter " + match.topic.code + ", question " + match.question.number + ". Opening the exact lecture."
          : language === 'mixed'
            ? "Nuclear Physics-2 er chapter " + match.topic.code + ", question " + match.question.number + " match korechi. Exact lecture-ti open korchi."
            : "নিউক্লিয়ার পদার্থবিজ্ঞান-২-এর অধ্যায় " + match.topic.code + "-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি। সংশ্লিষ্ট ভিডিও ক্লাসটি খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: video.subject.name,
          chapterNumber: video.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'VIDEO',
        },
        resources: [{
          id: video.id,
          type: 'YOUTUBE',
          title: video.title,
          contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
          externalUrl: video.youtubeUrl,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
        },
        suggestions: [],
      };
    }

    if (match.topicRecord) {
      const topicRecord = match.topicRecord;
      return {
        answer: language === 'en'
          ? "I identified Nuclear Physics-2 question " + match.question.number + ", but no YouTube lecture is linked to it. Opening its chapter topic."
          : language === 'mixed'
            ? "Nuclear Physics-2 er question " + match.question.number + " identify korechi, kintu ei question-er jonno kono video linked nei. Topic-ti open korchi."
            : "নিউক্লিয়ার পদার্থবিজ্ঞান-২-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি, তবে এই প্রশ্নের জন্য কোনো নির্দিষ্ট ভিডিও যুক্ত নেই। সংশ্লিষ্ট অধ্যায়ের Topic খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: topicRecord.chapter.subject.name,
          chapterNumber: topicRecord.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'INFO',
        },
        resources: [{
          id: topicRecord.id,
          type: 'TOPIC',
          title: match.topic.code + " — " + topicRecord.title,
          contextLabel: topicRecord.chapter.subject.name + " • Chapter " + topicRecord.chapter.chapterNumber,
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        },
        suggestions: [],
      };
    }
  } else if (nuclearPhysics2QuestionMatches.length > 1) {
    const language = parsed.language || fallbackLang;
    return {
      answer: language === 'en'
        ? "I found more than one closely matching Nuclear Physics-2 question. Choose the exact lecture below."
        : language === 'mixed'
          ? "Nuclear Physics-2 er ekadhik matching question peyechi. Nicher list theke exact lecture-ti select korun."
          : "নিউক্লিয়ার পদার্থবিজ্ঞান-২-এ একাধিক কাছাকাছি প্রশ্নের মিল পেয়েছি। নিচের তালিকা থেকে সঠিক অধ্যায় ও ভিডিও ক্লাস নির্বাচন করুন।",
      detectedLanguage: language,
      interpretedIntent: {
        subjectQuery: "Nuclear Physics-2 (নিউক্লিয়ার পদার্থবিজ্ঞান-২)",
        resourceFilter: 'VIDEO',
      },
      resources: nuclearPhysics2QuestionMatches.map((match) => {
        const video = match.video;
        return video
          ? {
              id: video.id,
              type: 'YOUTUBE' as const,
              title: video.title,
              contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
              href: "/chapters/" + video.chapterId + "#video-" + video.id,
              externalUrl: video.youtubeUrl,
            }
          : {
              id: match.topicRecord?.id || "nuclear-physics-2-chapter-" + match.topic.chapterNumber,
              type: 'TOPIC' as const,
              title: match.topic.code + " — " + match.topic.title + " (প্রশ্ন " + toBengaliQuestionNumber(match.question.number) + ")",
              contextLabel: "Nuclear Physics-2",
              href: match.topicRecord
                ? "/chapters/" + match.topicRecord.chapterId + "#topic-" + match.topicRecord.id
                : "/subjects/sub-nuclear-401",
            };
      }),
      suggestions: [],
    };
  }


  // Match question-first queries against the supplied Electronics-2 QC list.
  // PostgreSQL remains the source of truth for the actual chapter/topic/video IDs and URLs.
  const electronics2QuestionMatches = await findAcademicQuestionMatches(
    trimmed,
    parsed.keywords,
    ELECTRONICS_2_QUESTION_BANK,
    'PHYS-406'
  );
  if (electronics2QuestionMatches.length === 1) {
    const match = electronics2QuestionMatches[0];
    const language = parsed.language || fallbackLang;
    if (match.video) {
      const video = match.video;
      return {
        answer: language === 'en'
          ? "I matched your Electronics-2 question to chapter " + match.topic.code + ", question " + match.question.number + ". Opening the exact lecture."
          : language === 'mixed'
            ? "Electronics-2 er chapter " + match.topic.code + ", question " + match.question.number + " match korechi. Exact lecture-ti open korchi."
            : "ইলেকট্রনিক্স-২-এর অধ্যায় " + match.topic.code + "-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি। সংশ্লিষ্ট ভিডিও ক্লাসটি খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: video.subject.name,
          chapterNumber: video.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'VIDEO',
        },
        resources: [{
          id: video.id,
          type: 'YOUTUBE',
          title: video.title,
          contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
          externalUrl: video.youtubeUrl,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + video.chapterId + "#video-" + video.id,
        },
        suggestions: [],
      };
    }

    if (match.topicRecord) {
      const topicRecord = match.topicRecord;
      return {
        answer: language === 'en'
          ? "I identified Electronics-2 question " + match.question.number + ", but no YouTube lecture is linked to it. Opening its chapter topic."
          : language === 'mixed'
            ? "Electronics-2 er question " + match.question.number + " identify korechi, kintu ei question-er jonno kono video linked nei. Topic-ti open korchi."
            : "ইলেকট্রনিক্স-২-এর প্রশ্ন নং " + toBengaliQuestionNumber(match.question.number) + " শনাক্ত করেছি, তবে এই প্রশ্নের জন্য কোনো নির্দিষ্ট ভিডিও যুক্ত নেই। সংশ্লিষ্ট অধ্যায়ের Topic খুলে দিচ্ছি।",
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: topicRecord.chapter.subject.name,
          chapterNumber: topicRecord.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'INFO',
        },
        resources: [{
          id: topicRecord.id,
          type: 'TOPIC',
          title: match.topic.code + " — " + topicRecord.title,
          contextLabel: topicRecord.chapter.subject.name + " • Chapter " + topicRecord.chapter.chapterNumber,
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: "/chapters/" + topicRecord.chapterId + "#topic-" + topicRecord.id,
        },
        suggestions: [],
      };
    }
  } else if (electronics2QuestionMatches.length > 1) {
    const language = parsed.language || fallbackLang;
    return {
      answer: language === 'en'
        ? "I found more than one closely matching Electronics-2 question. Choose the exact lecture below."
        : language === 'mixed'
          ? "Electronics-2 er ekadhik matching question peyechi. Nicher list theke exact lecture-ti select korun."
          : "ইলেকট্রনিক্স-২-এ একাধিক কাছাকাছি প্রশ্নের মিল পেয়েছি। নিচের তালিকা থেকে সঠিক অধ্যায় ও ভিডিও ক্লাস নির্বাচন করুন।",
      detectedLanguage: language,
      interpretedIntent: {
        subjectQuery: "Electronics-2 (ইলেকট্রনিক্স-২)",
        resourceFilter: 'VIDEO',
      },
      resources: electronics2QuestionMatches.map((match) => {
        const video = match.video;
        return video
          ? {
              id: video.id,
              type: 'YOUTUBE' as const,
              title: video.title,
              contextLabel: video.subject.name + " • Chapter " + match.topic.code + " • Lec " + video.lectureNumber,
              href: "/chapters/" + video.chapterId + "#video-" + video.id,
              externalUrl: video.youtubeUrl,
            }
          : {
              id: match.topicRecord?.id || "electronics-2-chapter-" + match.topic.chapterNumber,
              type: 'TOPIC' as const,
              title: match.topic.code + " — " + match.topic.title + " (প্রশ্ন " + toBengaliQuestionNumber(match.question.number) + ")",
              contextLabel: "Electronics-2",
              href: match.topicRecord
                ? "/chapters/" + match.topicRecord.chapterId + "#topic-" + match.topicRecord.id
                : "/subjects/sub-elec-406",
            };
      }),
      suggestions: [],
    };
  }

  const statisticalMechanicsQuestionMatches = await findAcademicQuestionMatches(
    trimmed,
    parsed.keywords,
    STATISTICAL_MECHANICS_QUESTION_BANK,
    'PHYS-404'
  );
  if (statisticalMechanicsQuestionMatches.length === 1) {
    const match = statisticalMechanicsQuestionMatches[0];
    const language = parsed.language || fallbackLang;
    if (match.video) {
      const video = match.video;
      return {
        answer: language === 'en'
          ? `I matched your Statistical Mechanics question to chapter ${match.topic.code}, question ${match.question.number}. Opening the exact lecture.`
          : language === 'mixed'
            ? `Statistical Mechanics-er chapter ${match.topic.code}, question ${match.question.number} match korechi. Exact lecture-ti open korchi.`
            : `পরিসংখ্যান বলবিজ্ঞানের অধ্যায় ${match.topic.code}-এর প্রশ্ন নং ${toBengaliQuestionNumber(match.question.number)} শনাক্ত করেছি। সংশ্লিষ্ট ভিডিও ক্লাসটি খুলে দিচ্ছি।`,
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: video.subject.name,
          chapterNumber: video.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'VIDEO',
        },
        resources: [{
          id: video.id,
          type: 'YOUTUBE',
          title: video.title,
          contextLabel: `${video.subject.name} • Chapter ${match.topic.code} • Lec ${video.lectureNumber}`,
          href: `/chapters/${video.chapterId}#video-${video.id}`,
          externalUrl: video.youtubeUrl,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: `/chapters/${video.chapterId}#video-${video.id}`,
        },
        suggestions: [],
      };
    }

    if (match.topicRecord) {
      const topicRecord = match.topicRecord;
      return {
        answer: language === 'en'
          ? `I identified Statistical Mechanics question ${match.question.number}, but no YouTube lecture is linked to it. Opening its chapter topic.`
          : language === 'mixed'
            ? `Statistical Mechanics-er question ${match.question.number} identify korechi, kintu ei question-er jonno kono video linked nei. Topic-ti open korchi.`
            : `পরিসংখ্যান বলবিজ্ঞানের প্রশ্ন নং ${toBengaliQuestionNumber(match.question.number)} শনাক্ত করেছি, তবে এই প্রশ্নের জন্য কোনো নির্দিষ্ট ভিডিও যুক্ত নেই। সংশ্লিষ্ট অধ্যায়ের Topic খুলে দিচ্ছি।`,
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: topicRecord.chapter.subject.name,
          chapterNumber: topicRecord.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'INFO',
        },
        resources: [{
          id: topicRecord.id,
          type: 'TOPIC',
          title: `${match.topic.code} — ${topicRecord.title}`,
          contextLabel: `${topicRecord.chapter.subject.name} • Chapter ${topicRecord.chapter.chapterNumber}`,
          href: `/chapters/${topicRecord.chapterId}#topic-${topicRecord.id}`,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: `/chapters/${topicRecord.chapterId}#topic-${topicRecord.id}`,
        },
        suggestions: [],
      };
    }
  } else if (statisticalMechanicsQuestionMatches.length > 1) {
    const language = parsed.language || fallbackLang;
    return {
      answer: language === 'en'
        ? 'I found more than one closely matching Statistical Mechanics lecture. Choose the exact one below.'
        : language === 'mixed'
          ? 'Statistical Mechanics-er ekadhik matching lecture peyechi. Nicher list theke exact lecture-ti select korun.'
          : 'পরিসংখ্যান বলবিজ্ঞানে একাধিক কাছাকাছি প্রশ্নের মিল পেয়েছি। নিচের তালিকা থেকে সঠিক অধ্যায় ও ভিডিও ক্লাস নির্বাচন করুন।',
      detectedLanguage: language,
      interpretedIntent: {
        subjectQuery: 'Statistical Mechanics (পরিসংখ্যান বলবিজ্ঞান)',
        resourceFilter: 'VIDEO',
      },
      resources: statisticalMechanicsQuestionMatches.map((match) => {
        const video = match.video;
        return video
          ? {
              id: video.id,
              type: 'YOUTUBE' as const,
              title: video.title,
              contextLabel: `${video.subject.name} • Chapter ${match.topic.code} • Lec ${video.lectureNumber}`,
              href: `/chapters/${video.chapterId}#video-${video.id}`,
              externalUrl: video.youtubeUrl,
            }
          : {
              id: match.topicRecord?.id || `stat-404-${match.topic.chapterNumber}`,
              type: 'TOPIC' as const,
              title: `${match.topic.code} — ${match.topic.title} (প্রশ্ন ${toBengaliQuestionNumber(match.question.number)})`,
              contextLabel: 'Statistical Mechanics',
              href: match.topicRecord
                ? `/chapters/${match.topicRecord.chapterId}#topic-${match.topicRecord.id}`
                : '/subjects/sub-stat-404',
            };
      }),
      suggestions: [],
    };
  }

  const classicalQuestionMatches = await findAcademicQuestionMatches(
    trimmed,
    parsed.keywords,
    CLASSICAL_ELECTRODYNAMICS_QUESTION_BANK,
    'PHYS-405'
  );
  if (classicalQuestionMatches.length === 1) {
    const match = classicalQuestionMatches[0];
    const language = parsed.language || fallbackLang;
    if (match.video) {
      const video = match.video;
      return {
        answer: language === 'en'
          ? `I matched your question to ${match.topic.code}, question ${match.question.number}. Opening the exact lecture.`
          : language === 'mixed'
            ? `${match.topic.code} er question ${match.question.number} match korechi. Exact lecture-ti open korchi.`
            : `${match.topic.code} অধ্যায়ের প্রশ্ন নং ${toBengaliQuestionNumber(match.question.number)} শনাক্ত করেছি। সংশ্লিষ্ট ভিডিও ক্লাসটি খুলে দিচ্ছি।`,
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: video.subject.name,
          chapterNumber: video.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'VIDEO',
        },
        resources: [{
          id: video.id,
          type: 'YOUTUBE',
          title: video.title,
          contextLabel: `${video.subject.name} • ${match.topic.code} • Lec ${video.lectureNumber}`,
          href: `/chapters/${video.chapterId}#video-${video.id}`,
          externalUrl: video.youtubeUrl,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: `/chapters/${video.chapterId}#video-${video.id}`,
        },
        suggestions: [],
      };
    }

    if (match.topicRecord) {
      const topicRecord = match.topicRecord;
      return {
        answer: language === 'en'
          ? `I identified question ${match.question.number}, but no YouTube lecture is currently linked to it. Opening its topic.`
          : language === 'mixed'
            ? `Question ${match.question.number} identify korechi, kintu ei question-er jonno kono YouTube lecture linked nei. Topic-ti open korchi.`
            : `প্রশ্ন নং ${toBengaliQuestionNumber(match.question.number)} শনাক্ত করেছি, তবে এই প্রশ্নের জন্য বর্তমানে কোনো YouTube ক্লাস যুক্ত নেই। সংশ্লিষ্ট Topic খুলে দিচ্ছি।`,
        detectedLanguage: language,
        interpretedIntent: {
          subjectQuery: topicRecord.chapter.subject.name,
          chapterNumber: topicRecord.chapter.chapterNumber,
          topicQuery: match.topic.title,
          resourceFilter: 'INFO',
        },
        resources: [{
          id: topicRecord.id,
          type: 'TOPIC',
          title: `${match.topic.code} — ${topicRecord.title}`,
          contextLabel: `${topicRecord.chapter.subject.name} • Chapter ${topicRecord.chapter.chapterNumber}`,
          href: `/chapters/${topicRecord.chapterId}#topic-${topicRecord.id}`,
        }],
        navigationTarget: {
          type: 'CHAPTER',
          href: `/chapters/${topicRecord.chapterId}#topic-${topicRecord.id}`,
        },
        suggestions: [],
      };
    }
  } else if (classicalQuestionMatches.length > 1) {
    const language = parsed.language || fallbackLang;
    return {
      answer: language === 'en'
        ? 'I found more than one closely matching question. Choose the exact lecture below.'
        : language === 'mixed'
          ? 'Ekadhik question match koreche. Nicher list theke exact lecture-ti select korun.'
          : 'একাধিক কাছাকাছি প্রশ্নের মিল পেয়েছি। নিচের তালিকা থেকে সঠিক প্রশ্নের ভিডিও ক্লাস নির্বাচন করুন।',
      detectedLanguage: language,
      interpretedIntent: {
        subjectQuery: 'চিরায়ত তড়িৎগতিবিদ্যা (Classical Electrodynamics)',
        resourceFilter: 'VIDEO',
      },
      resources: classicalQuestionMatches.map((match) => {
        const video = match.video;
        return video
          ? {
              id: video.id,
              type: 'YOUTUBE' as const,
              title: video.title,
              contextLabel: `${video.subject.name} • ${match.topic.code} • Lec ${video.lectureNumber}`,
              href: `/chapters/${video.chapterId}#video-${video.id}`,
              externalUrl: video.youtubeUrl,
            }
          : {
              id: match.topic.code,
              type: 'TOPIC' as const,
              title: `${match.topic.code} — ${match.topic.title} (প্রশ্ন ${toBengaliQuestionNumber(match.question.number)})`,
              contextLabel: 'চিরায়ত তড়িৎগতিবিদ্যা',
              href: match.topicRecord
                ? `/chapters/${match.topicRecord.chapterId}#topic-${match.topicRecord.id}`
                : '/subjects/sub-ced-405',
            };
      }),
      suggestions: [],
    };
  }

  // Resolve explicit navigation requests and chapter-title-only queries before broad resource search.
  const explicitChapterNavigation = isChapterNavigationRequest(trimmed);
  const chapterTitleOnlyQuery = !explicitChapterNavigation && isChapterNameOnlyRequest(trimmed);
  if (explicitChapterNavigation || chapterTitleOnlyQuery) {
    const matches = await findChapterNavigationMatches(trimmed, parsed.keywords, parsed.chapterNumber);
    if (matches.length === 1) {
      const chapter = matches[0];
      const language = parsed.language || fallbackLang;
      return {
        answer: language === 'en' ? `Opening ${chapter.title}.` : language === 'mixed' ? `${chapter.title} open korchi.` : `${chapter.title} খুলে দিচ্ছি।`,
        detectedLanguage: language,
        interpretedIntent: { subjectQuery: chapter.subject.name, chapterNumber: chapter.chapterNumber, resourceFilter: 'INFO' },
        resources: [{ id: chapter.id, type: 'CHAPTER', title: chapter.title, contextLabel: chapter.subject.name, href: `/chapters/${chapter.id}` }],
        navigationTarget: { type: 'CHAPTER', href: `/chapters/${chapter.id}` },
        suggestions: [],
      };
    }
    if (matches.length > 1) {
      return {
        answer: parsed.language === 'en' ? 'I found multiple matching chapters. Please choose the correct one below.' : parsed.language === 'mixed' ? 'Ekadhik matching chapter peyechi. Nicher list theke subject shoho thik chapter-ti select korun.' : 'একাধিক মিল থাকা চ্যাপ্টার পেয়েছি। নিচের তালিকা থেকে Subject-সহ সঠিক Chapter-টি নির্বাচন করুন।',
        detectedLanguage: parsed.language,
        interpretedIntent: { subjectQuery: parsed.keywords.join(', '), chapterNumber: parsed.chapterNumber, resourceFilter: 'INFO' },
        resources: matches.slice(0, 8).map((chapter) => ({ id: chapter.id, type: 'CHAPTER', title: chapter.title, contextLabel: chapter.subject.name, href: `/chapters/${chapter.id}` })),
        suggestions: [],
      };
    }
    if (explicitChapterNavigation) {
      return {
        answer: parsed.language === 'en' ? 'I could not identify that chapter in the database. Please include its subject name or chapter number.' : parsed.language === 'mixed' ? 'Database-e chapter-ti identify korte parini. Subject-er naam ba chapter number diye abar bolun.' : 'ডাটাবেজে এই নামে নির্দিষ্ট Chapter শনাক্ত করতে পারিনি। Subject-এর নাম অথবা Chapter নম্বরসহ আবার বলুন।',
        detectedLanguage: parsed.language,
        interpretedIntent: { subjectQuery: parsed.keywords.join(', '), chapterNumber: parsed.chapterNumber, resourceFilter: 'INFO' },
        resources: [], suggestions: [],
      };
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


type AcademicQuestionTopic = {
  chapterNumber: number;
  topicNumber: number;
  code: string;
  title: string;
  lectures: Record<number, string[]>;
  questions: Array<{ number: string; text: string; aliases: string[] }>;
};

type AcademicQuestionMatch = {
  topic: AcademicQuestionTopic;
  question: AcademicQuestionTopic['questions'][number];
  score: number;
  video: {
    id: string;
    title: string;
    lectureNumber: number;
    chapterId: string;
    youtubeUrl: string;
    topic: { topicNumber: number } | null;
    subject: { name: string };
    chapter: { chapterNumber: number };
  } | null;
  topicRecord: {
    id: string;
    title: string;
    chapterId: string;
    chapter: { chapterNumber: number; subject: { name: string } };
  } | null;
};

function toBengaliQuestionNumber(value: string): string {
  return value.replace(/[0-9]/g, (digit) => '০১২৩৪৫৬৭৮৯'[Number(digit)] || digit);
}

function normalizeQuestionMatchText(value: string): string {
  return value
    .toLocaleLowerCase('bn-BD')
    .normalize('NFKC')
    .replace(/[ড়ঢ়]/g, 'ড়')
    .replace(/য়/g, 'য়')
    .replace(/গাউসের/g, 'গসের')
    .replace(/গাউস/g, 'গস')
    .replace(/কুলম্ব্/g, 'কুলম্ব')
    .replace(/তড়িৎ/g, 'তড়িৎ')
    .replace(/চৌম্বকীয়/g, 'চৌম্বকীয়')
    .replace(/\\vec\{([^{}]+)\}/g, ' $1 ')
    .replace(/\\hat\{([^{}]+)\}/g, ' $1 ')
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, ' $1 $2 ')
    .replace(/\\[a-zA-Z]+/g, ' ')
    .replace(/[^a-z0-9\u0980-\u09ff]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function questionMatchTokens(value: string): string[] {
  const stopWords = new Set([
    'এবং', 'ও', 'আর', 'এর', 'এক', 'একটি', 'কোন', 'কোনো', 'কী', 'কি',
    'হতে', 'থেকে', 'যে', 'যা', 'যার', 'যেখানে', 'হলে', 'হয়', 'হয়',
    'করে', 'কর', 'করা', 'করতে', 'দাও', 'দিন', 'এই', 'ঐ', 'উক্ত',
    'মধ্যে', 'উপর', 'নিচে', 'জন্য', 'সাথে', 'সহ', 'প্রতীকগুলো',
    'প্রচলিত', 'অর্থ', 'বহন', 'নং', 'প্রশ্ন', 'অধ্যায়', 'অধ্যায়',
    'chapter', 'question', 'no', 'the', 'a', 'an', 'of', 'to', 'and',
    'is', 'are', 'for', 'show', 'prove', 'derive', 'explain',
  ]);
  return value.split(' ').filter((token) => token.length > 1 && !stopWords.has(token));
}

function scoreQuestionText(query: string, candidate: string): number {
  const normalizedQuery = normalizeQuestionMatchText(query);
  const normalizedCandidate = normalizeQuestionMatchText(candidate);
  if (!normalizedQuery || !normalizedCandidate) return 0;
  if (normalizedCandidate.includes(normalizedQuery) && normalizedQuery.length >= 10) return 1;

  const queryTokens = new Set(questionMatchTokens(normalizedQuery));
  const candidateTokens = new Set(questionMatchTokens(normalizedCandidate));
  if (queryTokens.size < 2 || candidateTokens.size === 0) return 0;

  const overlap = Array.from(queryTokens).filter((token) => candidateTokens.has(token)).length;
  const queryCoverage = overlap / queryTokens.size;
  const candidateCoverage = overlap / candidateTokens.size;
  return queryCoverage * 0.82 + candidateCoverage * 0.18;
}

async function findAcademicQuestionMatches(
  query: string,
  keywords: string[],
  bank: AcademicQuestionTopic[],
  subjectCode: string
): Promise<AcademicQuestionMatch[]> {
  const queryVariants = [query, ...keywords].filter(Boolean);
  const scoredQuestions: Array<{
    topic: AcademicQuestionTopic;
    question: AcademicQuestionTopic['questions'][number];
    score: number;
    lectureNumbers: number[];
  }> = [];

  for (const topic of bank) {
    for (const question of topic.questions) {
      const searchableTexts = [question.text, ...question.aliases];
      let score = 0;
      for (const queryVariant of queryVariants) {
        for (const candidateText of searchableTexts) {
          score = Math.max(score, scoreQuestionText(queryVariant, candidateText));
        }
      }
      if (score >= 0.76) {
        scoredQuestions.push({
          topic,
          question,
          score,
          lectureNumbers: getLectureNumbersForQuestion(topic, question.number),
        });
      }
    }
  }

  if (!scoredQuestions.length) return [];
  scoredQuestions.sort((left, right) => right.score - left.score);
  const bestScore = scoredQuestions[0].score;
  const selected = scoredQuestions.filter((entry) => entry.score >= Math.max(0.76, bestScore - 0.1));
  const targets = new Map<string, {
    topic: AcademicQuestionTopic;
    lectureNumber: number | null;
    question: AcademicQuestionTopic['questions'][number];
    score: number;
  }>();

  for (const entry of selected) {
    if (entry.lectureNumbers.length) {
      for (const lectureNumber of entry.lectureNumbers) {
        const key = `${entry.topic.chapterNumber}:${entry.topic.topicNumber}:${lectureNumber}`;
        const previous = targets.get(key);
        if (!previous || previous.score < entry.score) {
          targets.set(key, { topic: entry.topic, lectureNumber, question: entry.question, score: entry.score });
        }
      }
    } else {
      const key = `${entry.topic.chapterNumber}:${entry.topic.topicNumber}:unassigned`;
      const previous = targets.get(key);
      if (!previous || previous.score < entry.score) {
        targets.set(key, { topic: entry.topic, lectureNumber: null, question: entry.question, score: entry.score });
      }
    }
  }

  const targetEntries = Array.from(targets.entries());
  const videoTargets = targetEntries
    .filter(([, target]) => target.lectureNumber !== null)
    .map(([key, target]) => ({
      key,
      chapterNumber: target.topic.chapterNumber,
      topicNumber: target.topic.topicNumber,
      lectureNumber: target.lectureNumber as number,
    }));

  const videos = videoTargets.length
    ? await prisma.youTubeClass.findMany({
        where: {
          subject: { code: subjectCode },
          OR: videoTargets.map((target) => ({
            chapter: { chapterNumber: target.chapterNumber },
            topic: { topicNumber: target.topicNumber },
            lectureNumber: target.lectureNumber,
          })),
        },
        include: {
          subject: { select: { name: true } },
          chapter: { select: { chapterNumber: true } },
          topic: { select: { topicNumber: true } },
        },
      })
    : [];

  const matches: AcademicQuestionMatch[] = [];
  for (const [, target] of targetEntries) {
    if (target.lectureNumber !== null) {
      const video = videos.find((entry) =>
        entry.chapter.chapterNumber === target.topic.chapterNumber &&
        entry.topic?.topicNumber === target.topic.topicNumber &&
        entry.lectureNumber === target.lectureNumber
      );
      if (video) {
        matches.push({
          topic: target.topic,
          question: target.question,
          score: target.score,
          video,
          topicRecord: null,
        });
      }
    } else {
      const topicRecord = await prisma.topic.findFirst({
        where: {
          chapter: {
            subject: { code: subjectCode },
            chapterNumber: target.topic.chapterNumber,
          },
          topicNumber: target.topic.topicNumber,
        },
        include: {
          chapter: {
            select: {
              chapterNumber: true,
              subject: { select: { name: true } },
            },
          },
        },
      });
      if (topicRecord) {
        matches.push({
          topic: target.topic,
          question: target.question,
          score: target.score,
          video: null,
          topicRecord,
        });
      }
    }
  }

  matches.sort((left, right) => right.score - left.score);
  return matches.slice(0, 5);
}

function normalizeChapterText(value: string): string {
  return value.toLocaleLowerCase('en').normalize('NFKC')
    .replace(/[ড়ঢ়]/g, 'ড়').replace(/য়/g, 'য়')
    .replace(/পারিসংখ্যান/g, 'পরিসংখ্যান')
    .replace(/তড়িৎচুম্বকীয়|তড়িৎচুম্বকীয়|তড়িৎচৌম্বকীয়/g, 'তড়িৎ চৌম্বক')
    .replace(/[^a-z0-9\u0980-\u09ff]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function isChapterNavigationRequest(query: string): boolean {
  return /(খুলে দাও|খুলে দিন|খুলে দে|নিয়ে যাও|নিয়ে যাও|যেতে চাই|দেখাও|ওপেন কর|open|go to|take me to|navigate|visit).*(অধ্যায়|অধ্যায়|চ্যাপ্টার|chapter|unit)|((অধ্যায়|অধ্যায়|চ্যাপ্টার|chapter).*(খুলে|open|দেখাও|যাও|নিয়ে যাও|নিয়ে যাও))/i.test(query);
}

function isChapterNameOnlyRequest(query: string): boolean {
  const normalized = normalizeChapterText(query);
  if (!normalized || normalized.split(' ').length < 2) return false;
  // Requests for notes, videos, lectures, subject lists, or explanations remain resource searches.
  if (/(video|youtube|class|lecture|pdf|note|notes|image|resource|subject|all subjects|ক্লাস|ভিডিও|নোট|পিডিএফ|বিষয়|বিষয়|সকল বিষয়|সব বিষয়|ব্যাখ্যা|বুঝিয়ে|সমাধান)/i.test(normalized)) return false;
  return true;
}

async function findChapterNavigationMatches(query: string, keywords: string[], chapterNumber?: number) {
  const chapters = await prisma.chapter.findMany({ include: { subject: true } });
  const stopWords = new Set(['please','open','show','me','take','go','to','the','chapter','chapters','unit','অধ্যায়','অধ্যায়','চ্যাপ্টার','খুলে','দাও','দিন','দে','নিয়ে','নিয়ে','যাও','দেখাও','আমাকে','এর','টা','টি','এই','ওই']);
  const normalizedQuery = normalizeChapterText(query);
  const queryTokens = new Set(normalizedQuery.split(' ').filter((token) => token.length > 1 && !stopWords.has(token)));
  const keywordTexts = keywords.map(normalizeChapterText).filter(Boolean);
  const scored = chapters.map((chapter) => {
    const title = normalizeChapterText(chapter.title);
    const slug = normalizeChapterText(chapter.slug);
    const titleTokens = new Set((title + ' ' + slug).split(' ').filter((token) => token.length > 1));
    let score = 0;
    if (normalizedQuery && title.length > 3 && normalizedQuery.includes(title)) score += 12;
    for (const term of keywordTexts) {
      if (term.length > 2 && title.includes(term)) score += 10;
      const parts = term.split(' ').filter((token) => token.length > 1);
      const overlap = parts.filter((token) => titleTokens.has(token)).length;
      if (parts.length) score += (overlap / parts.length) * 7;
    }
    let overlap = 0;
    queryTokens.forEach((token) => {
      if (titleTokens.has(token)) overlap += 1;
    });
    if (queryTokens.size) score += (overlap / queryTokens.size) * 8;
    if (chapterNumber && chapter.chapterNumber === chapterNumber && overlap > 0) score += 1.5;
    return { chapter, score, overlap };
  }).filter((item) => item.score >= 5 && item.overlap > 0);
  scored.sort((left, right) => right.score - left.score);
  if (!scored.length) return [];
  const bestScore = scored[0].score;
  const close = scored.filter((item) => item.score >= Math.max(5, bestScore - 1.5));
  if (close.length === 1 && bestScore >= 7) return [close[0].chapter];
  return close.slice(0, 8).map((item) => item.chapter);
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
    else answer = `আমি ${ASSISTANT_NAME}, এই BraKet (⟨φ|ψ⟩)-এর AI একাডেমিক সহকারী। আমাকে তৈরি ও ডেভেলপ করেছেন ${ASSISTANT_CREATOR}।`;
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
