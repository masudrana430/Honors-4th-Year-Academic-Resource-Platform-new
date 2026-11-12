import { prisma } from '@/lib/prisma/client';
import type { AIChatResourceLink } from '@/types';

export type AssistantResourceFilter = 'ALL' | 'VIDEO' | 'NOTES' | 'INFO';
export type AssistantLanguage = 'en' | 'bn' | 'mixed';

type SearchInput = {
  query: string;
  keywords: string[];
  subjectQuery?: string;
  topicQuery?: string;
  chapterNumber?: number;
  resourceFilter: AssistantResourceFilter;
};

type SearchOutput = {
  resources: AIChatResourceLink[];
  availableSubjects: string[];
  matchedSubjectNames: string[];
};

const STOP_WORDS = new Set([
  'show', 'find', 'search', 'look', 'get', 'give', 'me', 'i', 'need', 'want',
  'all', 'the', 'a', 'an', 'of', 'for', 'about', 'in', 'on', 'to', 'from',
  'please', 'can', 'you', 'my', 'some', 'any', 'resource', 'resources',
  'subject', 'subjects', 'chapter', 'chapters', 'topic', 'topics', 'wise',
  'video', 'videos', 'youtube', 'class', 'classes', 'lecture', 'lectures',
  'note', 'notes', 'pdf', 'image', 'images', 'file', 'files', 'download',
  'open', 'want', 'showing', 'need', 'related', 'relevant', 'available',
  'দেখাও', 'দেখান', 'দেখতে', 'চাই', 'দাও', 'দিন', 'আমাকে', 'আমার',
  'একটু', 'সব', 'সকল', 'সবগুলো', 'সকলগুলো', 'এর', 'এরপর', 'জন্য',
  'বিষয়', 'বিষয়', 'বিষয়গুলো', 'বিষয়গুলো', 'অধ্যায়', 'অধ্যায়',
  'চ্যাপ্টার', 'টপিক', 'নোট', 'নোটস', 'ভিডিও', 'ক্লাস', 'লেকচার',
  'পিডিএফ', 'ফাইল', 'ছবি', 'সম্পর্কিত', 'দরকার', 'প্রয়োজন', 'প্রয়োজন',
  'হবে', 'কোন', 'কোনো', 'কি', 'কী', 'এবং', 'ও', 'তে', 'এর',
  'dekhao', 'dekhaw', 'dekhan', 'chai', 'dao', 'din', 'amar', 'amake',
  'sob', 'shob', 'shokol', 'bishoy', 'bisoy', 'oddhay', 'adhyay',
  'note', 'notes', 'video', 'class', 'lecture', 'pdf', 'lagbe',
  'dorkar', 'jonno', 'related', 'khujte', 'khuje', 'dao',
]);

/**
 * Query aliases help students use Bangla, English, and Banglish names.
 * These aliases only point to real database concepts; they never create fake
 * subjects, chapters, notes, or video links.
 */
const CONCEPT_ALIASES: Array<{ aliases: string[]; canonical: string[] }> = [
  {
    aliases: [
      'quantum theory', 'quantum mechanics', 'quantum mechanics 2',
      'কোয়ান্টাম তত্ত্ব', 'কোয়ান্টাম তত্ত্ব', 'কোয়ান্টাম মেকানিক্স',
      'কোয়ান্টাম মেকানিক্স', 'কোয়ান্টাম বলবিজ্ঞান', 'কোয়ান্টাম বলবিজ্ঞান',
      'koantam totto', 'quantum totto', 'koantam mechanics',
    ],
    canonical: ['Quantum Mechanics-2', 'কোয়ান্টাম মেকানিক্স-২', 'কোয়ান্টাম বলবিজ্ঞান'],
  },
  {
    aliases: [
      'nuclear physics', 'nuclear physics 2', 'নিউক্লিয়ার পদার্থবিজ্ঞান',
      'নিউক্লিয়ার পদার্থবিজ্ঞান', 'নিউক্লিয় পদার্থবিজ্ঞান', 'নিউক্লিয়ার পদার্থবিজ্ঞান',
      'nuclear podarthobiggan', 'nuclear podartho biggan',
    ],
    canonical: ['Nuclear Physics-2', 'নিউক্লিয়ার পদার্থবিজ্ঞান-২'],
  },
  {
    aliases: [
      'solid state physics', 'condensed matter', 'solid state',
      'কঠিন অবস্থার পদার্থবিজ্ঞান', 'কঠিন অবস্থা পদার্থবিজ্ঞান',
      'kothin obosthar podarthobiggan', 'solid state podarthobiggan',
    ],
    canonical: ['Solid State Physics-2', 'কঠিন অবস্থার পদার্থবিজ্ঞান-২'],
  },
  {
    aliases: [
      'statistical mechanics', 'statistical physics',
      'পরিসংখ্যান বলবিজ্ঞান', 'পরিসাংখ্যান বলবিজ্ঞান',
      'porisongkhan bolbiggan', 'porishongkhan bolbiggan',
    ],
    canonical: ['Statistical Mechanics', 'পরিসংখ্যান বলবিজ্ঞান'],
  },
  {
    aliases: [
      'classical electrodynamics', 'electrodynamics', 'electromagnetism',
      'চিরায়ত তড়িৎগতিবিদ্যা', 'চিরায়ত তড়িৎগতিবিদ্যা',
      'তড়িৎ গতিবিদ্যা', 'তড়িৎ গতিবিদ্যা',
      'chirayot torit gotibidya', 'classical electromagnetic theory',
    ],
    canonical: ['Classical Electrodynamics', 'চিরায়ত তড়িৎগতিবিদ্যা'],
  },
  {
    aliases: [
      'electronics', 'electronics 2', 'ইলেকট্রনিক্স', 'ইলেকট্রনিক্স ২',
      'electronics two', 'ilektronics',
    ],
    canonical: ['Electronics-2', 'ইলেকট্রনিক্স-২'],
  },
  {
    aliases: [
      'atomic and molecular physics', 'atomic molecular physics',
      'molecular physics', 'atomic physics', 'আণবিক পদার্থবিজ্ঞান',
      'আণবিক পদার্থবিজ্ঞানের', 'পরমাণু ও আণবিক পদার্থবিজ্ঞান',
      'anobik podarthobiggan', 'anobik podartho biggan',
    ],
    canonical: ['Atomic and Molecular Physics', 'আণবিক পদার্থবিজ্ঞান'],
  },
  {
    aliases: [
      'molecular spectra', 'molecular spectrum', 'molecular spectroscopy',
      'আণবিক বর্ণালী', 'আণবিক বর্ণালীবিজ্ঞান', 'মলিকিউলার স্পেক্ট্রা',
      'molecular spectro', 'anobik bornali', 'anobik bornali biggan',
    ],
    canonical: ['Molecular Spectra', 'Molecular Spectroscopy', 'আণবিক বর্ণালী'],
  },
  {
    aliases: [
      'bra ket', 'bra-ket', 'dirac notation', 'bra and ket vectors',
      'ব্রা কেট', 'ব্রা ও কেট', 'bra ket notation',
    ],
    canonical: ['Bra Ket', 'Dirac notation', 'ব্রা কেট ভেক্টর'],
  },
  {
    aliases: [
      'eigenvalue', 'eigenvalues', 'eigen vector', 'eigenvector',
      'আইগেন মান', 'আইগেনভ্যালু', 'স্বকীয় মান', 'স্বকীয় মান',
    ],
    canonical: ['eigenvalue', 'eigenvalues', 'আইগেন মান'],
  },
  {
    aliases: [
      'maxwell equation', 'maxwell equations', 'ম্যাক্সওয়েলের সমীকরণ',
      'ম্যাক্সওয়েলের সমীকরণ', 'maxwell er somikoron',
    ],
    canonical: ['Maxwell equations', 'ম্যাক্সওয়েলের সমীকরণ'],
  },
  {
    aliases: [
      'gauss law', 'gauss theorem', 'গসের সূত্র', 'গাউসের সূত্র',
      'gaus er shutro', 'gauss er sutro',
    ],
    canonical: ['Gauss law', 'গসের সূত্র'],
  },
];

function normalizeText(value: string): string {
  return value.toLocaleLowerCase('en')
    .normalize('NFKC')
    .replace(/[ড়ঢ়]/g, 'ড়')
    .replace(/য়/g, 'য়')
    .replace(/পারিসংখ্যান/g, 'পরিসংখ্যান')
    .replace(/তড়িৎ/g, 'তড়িৎ')
    .replace(/[।,;:!?()[\]{}"'’‘“”]/g, ' ')
    .replace(/[-_/]+/g, ' ')
    .replace(/[^a-z0-9\u0980-\u09ff\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value: string): string[] {
  return normalizeText(value).split(' ')
    .filter((token) => token.length > 1 && !STOP_WORDS.has(token));
}

function buildSearchTerms(input: SearchInput): { terms: string[]; scoreTokens: string[] } {
  const sourceText = [
    input.query,
    input.subjectQuery || '',
    input.topicQuery || '',
    ...input.keywords,
  ].join(' ');
  const normalizedSource = normalizeText(sourceText);
  const terms = new Set<string>();
  const scoreTokens = new Set<string>();

  for (const token of tokens(sourceText)) {
    terms.add(token);
    scoreTokens.add(token);
  }

  for (const phrase of [input.query, input.subjectQuery || '', input.topicQuery || '', ...input.keywords]) {
    const normalizedPhrase = normalizeText(phrase);
    if (normalizedPhrase.length > 2) terms.add(normalizedPhrase);
  }

  for (const group of CONCEPT_ALIASES) {
    const isMatched = group.aliases.some((alias) => {
      const normalizedAlias = normalizeText(alias);
      return normalizedAlias.length > 2 && normalizedSource.includes(normalizedAlias);
    });
    if (!isMatched) continue;

    for (const canonical of group.canonical) {
      const normalizedCanonical = normalizeText(canonical);
      if (normalizedCanonical.length > 2) terms.add(normalizedCanonical);
      for (const token of tokens(canonical)) scoreTokens.add(token);
    }
  }

  return {
    terms: Array.from(terms).filter((term) => term.length > 1).slice(0, 24),
    scoreTokens: Array.from(scoreTokens),
  };
}

function scoreCandidate(
  scoreTokens: string[],
  title: string,
  context: string
): number {
  if (scoreTokens.length === 0) return 1;
  const normalizedTitle = normalizeText(title);
  const normalizedContext = normalizeText(context);
  const fullText = normalizedTitle + ' ' + normalizedContext;
  let score = 0;
  let matched = 0;

  for (const token of scoreTokens) {
    if (normalizedTitle.includes(token)) {
      score += 8;
      matched += 1;
    } else if (normalizedContext.includes(token)) {
      score += 3;
      matched += 1;
    }
  }

  if (normalizedTitle && normalizedTitle.includes(normalizeText(scoreTokens.join(' ')))) score += 10;
  return matched === 0 ? 0 : score + matched / scoreTokens.length;
}

function buildContains(term: string, fields: string[]) {
  return fields.map((field) => ({
    [field]: { contains: term, mode: 'insensitive' as const },
  }));
}

export async function searchSmartAcademicResources(input: SearchInput): Promise<SearchOutput> {
  const { terms, scoreTokens } = buildSearchTerms(input);
  const chapterCondition = input.chapterNumber ? { chapterNumber: input.chapterNumber } : undefined;
  const resources: Array<AIChatResourceLink & { relevance: number }> = [];
  const matchedSubjectNames = new Set<string>();

  const addResource = (item: AIChatResourceLink, relevance: number) => {
    if (relevance <= 0) return;
    if (resources.some((resource) => resource.id === item.id && resource.type === item.type)) return;
    resources.push({ ...item, relevance });
    if (item.contextLabel) matchedSubjectNames.add(item.contextLabel.split(' • ')[0]);
  };

  const subjectWhere = terms.length
    ? { OR: terms.flatMap((term) => buildContains(term, ['name', 'code', 'description'])) }
    : undefined;

  if (input.resourceFilter === 'ALL' || input.resourceFilter === 'INFO') {
    const subjects = await prisma.subject.findMany({
      where: subjectWhere,
      orderBy: { name: 'asc' },
      take: terms.length ? 50 : 12,
    });

    for (const subject of subjects) {
      const relevance = scoreCandidate(
        scoreTokens,
        subject.name,
        [subject.code || '', subject.department, subject.description].join(' ')
      );
      addResource({
        id: subject.id,
        type: 'SUBJECT',
        title: subject.name + (subject.code ? ' (' + subject.code + ')' : ''),
        contextLabel: subject.department,
        href: '/subjects/' + subject.id,
      }, relevance);
    }

    const chapterWhere = {
      AND: [
        chapterCondition || {},
        terms.length
          ? {
              OR: terms.flatMap((term) => [
                ...buildContains(term, ['title', 'description']),
                { subject: { name: { contains: term, mode: 'insensitive' as const } } },
                { subject: { code: { contains: term, mode: 'insensitive' as const } } },
              ]),
            }
          : {},
      ],
    };
    const chapters = await prisma.chapter.findMany({
      where: chapterWhere,
      include: { subject: true },
      orderBy: [{ subject: { name: 'asc' } }, { chapterNumber: 'asc' }],
      take: terms.length ? 80 : 20,
    });

    for (const chapter of chapters) {
      const relevance = scoreCandidate(
        scoreTokens,
        chapter.title,
        [chapter.description, chapter.subject.name, chapter.subject.code || '', 'chapter ' + chapter.chapterNumber].join(' ')
      );
      addResource({
        id: chapter.id,
        type: 'CHAPTER',
        title: 'Chapter ' + String(chapter.chapterNumber).padStart(2, '0') + ': ' + chapter.title,
        contextLabel: chapter.subject.name,
        href: '/chapters/' + chapter.id,
      }, relevance);
    }

    const topicWhere = {
      AND: [
        chapterCondition ? { chapter: { chapterNumber: chapterCondition.chapterNumber } } : {},
        terms.length
          ? {
              OR: terms.flatMap((term) => [
                ...buildContains(term, ['title', 'description', 'additionalResources']),
                { chapter: { title: { contains: term, mode: 'insensitive' as const } } },
                { chapter: { subject: { name: { contains: term, mode: 'insensitive' as const } } } },
              ]),
            }
          : {},
      ],
    };
    const topics = await prisma.topic.findMany({
      where: topicWhere,
      include: { chapter: { include: { subject: true } } },
      take: terms.length ? 100 : 30,
    });

    for (const topic of topics) {
      const relevance = scoreCandidate(
        scoreTokens,
        topic.title,
        [topic.description, topic.chapter.title, topic.chapter.subject.name, 'chapter ' + topic.chapter.chapterNumber, 'topic ' + topic.topicNumber].join(' ')
      );
      addResource({
        id: topic.id,
        type: 'TOPIC',
        title: 'Topic ' + String(topic.topicNumber).padStart(2, '0') + ': ' + topic.title,
        contextLabel: topic.chapter.subject.name + ' • Chapter ' + topic.chapter.chapterNumber,
        href: '/chapters/' + topic.chapterId + '#topic-' + topic.id,
      }, relevance);
    }
  }

  if (input.resourceFilter === 'ALL' || input.resourceFilter === 'VIDEO') {
    const videoWhere = {
      AND: [
        chapterCondition ? { chapter: chapterCondition } : {},
        terms.length
          ? {
              OR: terms.flatMap((term) => [
                ...buildContains(term, ['title', 'shortDescription', 'instructorName']),
                { subject: { name: { contains: term, mode: 'insensitive' as const } } },
                { subject: { code: { contains: term, mode: 'insensitive' as const } } },
                { chapter: { title: { contains: term, mode: 'insensitive' as const } } },
                { topic: { title: { contains: term, mode: 'insensitive' as const } } },
                { topic: { description: { contains: term, mode: 'insensitive' as const } } },
              ]),
            }
          : {},
      ],
    };
    const videos = await prisma.youTubeClass.findMany({
      where: videoWhere,
      include: { subject: true, chapter: true, topic: true },
      orderBy: [{ isPopular: 'desc' }, { createdAt: 'desc' }],
      take: terms.length ? 100 : 20,
    });

    for (const video of videos) {
      const context = [
        video.subject.name,
        video.subject.code || '',
        video.chapter.title,
        'chapter ' + video.chapter.chapterNumber,
        video.topic?.title || '',
        video.topic?.description || '',
        video.shortDescription,
        video.instructorName || '',
      ].join(' ');
      const relevance = scoreCandidate(scoreTokens, video.title, context);
      addResource({
        id: video.id,
        type: 'YOUTUBE',
        title: video.title,
        contextLabel: video.subject.name + ' • Chapter ' + video.chapter.chapterNumber + (video.topic ? ' • ' + video.topic.title : ''),
        href: '/chapters/' + video.chapterId + '#video-' + video.id,
        externalUrl: video.youtubeUrl,
      }, relevance);
    }
  }

  if (input.resourceFilter === 'ALL' || input.resourceFilter === 'NOTES') {
    const fileWhere = {
      AND: [
        chapterCondition ? { chapter: chapterCondition } : {},
        terms.length
          ? {
              OR: terms.flatMap((term) => [
                ...buildContains(term, ['fileName']),
                { studyNote: { title: { contains: term, mode: 'insensitive' as const } } },
                { studyNote: { summary: { contains: term, mode: 'insensitive' as const } } },
                { studyNote: { author: { contains: term, mode: 'insensitive' as const } } },
                { subject: { name: { contains: term, mode: 'insensitive' as const } } },
                { subject: { code: { contains: term, mode: 'insensitive' as const } } },
                { chapter: { title: { contains: term, mode: 'insensitive' as const } } },
                { topic: { title: { contains: term, mode: 'insensitive' as const } } },
                { topic: { description: { contains: term, mode: 'insensitive' as const } } },
              ]),
            }
          : {},
      ],
    };
    const files = await prisma.file.findMany({
      where: fileWhere,
      include: { subject: true, chapter: true, topic: true, studyNote: true },
      orderBy: { createdAt: 'desc' },
      take: terms.length ? 120 : 30,
    });

    for (const file of files) {
      const noteTitle = file.studyNote?.title || file.fileName;
      const noteSummary = file.studyNote?.summary || '';
      const context = [
        file.subject.name,
        file.subject.code || '',
        file.chapter.title,
        'chapter ' + file.chapter.chapterNumber,
        file.topic.title,
        file.topic.description,
        noteSummary,
        file.fileName,
      ].join(' ');
      const relevance = scoreCandidate(scoreTokens, noteTitle, context);
      addResource({
        id: file.id,
        type: file.fileType === 'PDF' ? 'PDF' : 'IMAGE',
        title: noteTitle,
        contextLabel: file.subject.name + ' • Chapter ' + file.chapter.chapterNumber + ' • ' + file.topic.title + ' • ' + file.fileType,
        href: '/chapters/' + file.chapterId + '#topic-' + file.topicId,
        externalUrl: file.driveShareUrl,
      }, relevance);
    }
  }

  resources.sort((left, right) => right.relevance - left.relevance);
  const availableSubjects = await prisma.subject.findMany({
    select: { name: true },
    orderBy: { name: 'asc' },
    take: 12,
  });

  return {
    resources: resources.slice(0, 15).map(({ relevance: _relevance, ...resource }) => resource),
    availableSubjects: availableSubjects.map((subject) => subject.name),
    matchedSubjectNames: Array.from(matchedSubjectNames).slice(0, 8),
  };
}

export function buildAcademicAssistantAnswer(
  language: AssistantLanguage,
  resourceFilter: AssistantResourceFilter,
  count: number,
  query: string,
  availableSubjects: string[]
): string {
  const subjectList = availableSubjects.length
    ? availableSubjects.slice(0, 8).join(', ')
    : '';

  if (count > 0) {
    if (language === 'bn') {
      const label = resourceFilter === 'VIDEO' ? 'টি ভিডিও ক্লাস' : resourceFilter === 'NOTES' ? 'টি নোট/PDF/ইমেজ ফাইল' : resourceFilter === 'INFO' ? 'টি বিষয়, অধ্যায় বা টপিক' : 'টি সম্পর্কিত রিসোর্স';
      return 'আপনার "' + query + '" অনুরোধ অনুযায়ী ডাটাবেজে ' + count + label + ' পেয়েছি। নিচের ফলাফল থেকে সরাসরি খুলতে পারবেন।';
    }
    if (language === 'mixed') {
      const label = resourceFilter === 'VIDEO' ? 'ta video class' : resourceFilter === 'NOTES' ? 'ta note/PDF/image file' : resourceFilter === 'INFO' ? 'ta subject, chapter ba topic' : 'ta related resource';
      return 'Apnar "' + query + '" request-er sathe database-e ' + count + label + ' peyechi. Nicher result theke directly open korte parben.';
    }
    const label = resourceFilter === 'VIDEO' ? 'video class(es)' : resourceFilter === 'NOTES' ? 'note/PDF/image file(s)' : resourceFilter === 'INFO' ? 'subject, chapter, or topic' : 'related resource(s)';
    return 'I found ' + count + ' ' + label + ' in the BraKet database for "' + query + '". Open any result below.';
  }

  if (language === 'bn') {
    return 'আপনার "' + query + '" অনুরোধের সঙ্গে মেলে এমন কোনো রিসোর্স বর্তমানে BraKet-এর ডাটাবেজে নেই। বর্তমানে যুক্ত বিষয়গুলো হলো: ' + subjectList + '। অন্য কোনো বিষয় বা keyword দিয়ে খুঁজে দেখতে পারেন।';
  }
  if (language === 'mixed') {
    return 'Apnar "' + query + '" request-er exact kono resource ekhon database-e nei. Currently available subjects: ' + subjectList + '. Onno subject ba keyword diye search korte paren.';
  }
  return 'I could not find an exact resource for "' + query + '" in the current BraKet database. The currently indexed subjects are: ' + subjectList + '. Try a different subject name or keyword.';
}
