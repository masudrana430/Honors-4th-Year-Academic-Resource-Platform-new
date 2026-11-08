import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { SearchResultItem } from '@/types';

function normalizeSearchText(value: string): string {
  return value.toLocaleLowerCase('en')
    .normalize('NFKC')
    .replace(/[ড়ঢ়]/g, 'ড়')
    .replace(/য়/g, 'য়')
    .replace(/পারিসংখ্যান/g, 'পরিসংখ্যান')
    .replace(/[।,;:!?()[\]{}"'’‘“”]/g, ' ')
    .replace(/[-_/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function scoreSearchResult(query: string, item: SearchResultItem): number {
  const q = normalizeSearchText(query);
  const title = normalizeSearchText(item.title);
  const context = normalizeSearchText([
    item.subtitle, item.subjectName, item.chapterTitle, item.topicTitle,
  ].filter(Boolean).join(' '));
  const tokens = q.split(' ').filter((token) => token.length > 1);
  if (!tokens.length) return 0;

  let score = 0;
  if (title === q) score += 100;
  else if (title.startsWith(q)) score += 55;
  else if (title.includes(q)) score += 40;
  if (context.includes(q)) score += 18;

  let matched = 0;
  for (const token of tokens) {
    if (title.includes(token)) { score += 12; matched += 1; }
    else if (context.includes(token)) { score += 5; matched += 1; }
  }
  score += (matched / tokens.length) * 15;
  if (matched === 0) return 0;
  return score;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const typeFilter = (searchParams.get('type') || 'ALL').toUpperCase();
    const sort = searchParams.get('sort') || 'relevance';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(30, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10)));

    const results: SearchResultItem[] = [];
    const searchTerms = q ? Array.from(new Set(normalizeSearchText(q).split(' ').filter((term) => term.length > 1))).slice(0, 8) : [];
    const containsAny = (fields: string[]): any[] => searchTerms.flatMap((term) =>
      fields.map((field) => ({ [field]: { contains: term, mode: 'insensitive' as const } }))
    );

    if (typeFilter === 'ALL' || typeFilter === 'SUBJECT') {
      const subjects = await prisma.subject.findMany({
        where: q
          ? {
              OR: containsAny(['name', 'code', 'description']),
            }
          : undefined,
        take: 100,
      });
      for (const s of subjects) {
        results.push({
          id: s.id,
          type: 'SUBJECT',
          title: `${s.name}${s.code ? ` (${s.code})` : ''}`,
          subtitle: s.description,
          subjectName: s.name,
          href: `/subjects/${s.id}`,
          createdAt: s.createdAt.toISOString(),
        });
      }
    }

    if (typeFilter === 'ALL' || typeFilter === 'CHAPTER') {
      const numMatch = q.match(/^(?:chapter|ch\.?|অধ্যায়|অধ্যায়|চ্যাপ্টার)?\s*0*(\d+)$/i);
      const chapters = await prisma.chapter.findMany({
        where: q
          ? {
              OR: [
                ...containsAny(['title', 'description']),
                ...searchTerms.map((term) => ({ subject: { name: { contains: term, mode: 'insensitive' as const } } })),
                ...(numMatch ? [{ chapterNumber: parseInt(numMatch[0], 10) }] : []),
              ],
            }
          : undefined,
        include: { subject: true },
        take: 100,
      });
      for (const c of chapters) {
        results.push({
          id: c.id,
          type: 'CHAPTER',
          title: `Chapter ${String(c.chapterNumber).padStart(2, '0')}: ${c.title}`,
          subtitle: c.description,
          subjectName: c.subject.name,
          chapterTitle: c.title,
          href: `/chapters/${c.id}`,
          createdAt: c.createdAt.toISOString(),
        });
      }
    }

    if (typeFilter === 'ALL' || typeFilter === 'TOPIC') {
      const topics = await prisma.topic.findMany({
        where: q
          ? {
              OR: [
                ...containsAny(['title', 'description']),
                ...searchTerms.flatMap((term) => [
                  { chapter: { title: { contains: term, mode: 'insensitive' as const } } },
                  { chapter: { subject: { name: { contains: term, mode: 'insensitive' as const } } } },
                ]),
              ],
            }
          : undefined,
        include: { chapter: { include: { subject: true } } },
        take: 100,
      });
      for (const t of topics) {
        results.push({
          id: t.id,
          type: 'TOPIC',
          title: `Topic ${String(t.topicNumber).padStart(2, '0')}: ${t.title}`,
          subtitle: t.description,
          subjectName: t.chapter.subject.name,
          chapterTitle: `Ch ${t.chapter.chapterNumber}: ${t.chapter.title}`,
          topicTitle: t.title,
          href: `/chapters/${t.chapterId}#topic-${t.id}`,
          createdAt: t.createdAt.toISOString(),
        });
      }
    }

    if (typeFilter === 'ALL' || typeFilter === 'YOUTUBE') {
      const videos = await prisma.youTubeClass.findMany({
        where: q
          ? {
              OR: [
                ...containsAny(['title', 'shortDescription']),
                ...searchTerms.flatMap((term) => [
                  { subject: { name: { contains: term, mode: 'insensitive' as const } } },
                  { chapter: { title: { contains: term, mode: 'insensitive' as const } } },
                ]),
              ],
            }
          : undefined,
        include: { subject: true, chapter: true },
        take: 25,
      });
      for (const v of videos) {
        results.push({
          id: v.id,
          type: 'YOUTUBE',
          title: v.title,
          subtitle: v.shortDescription,
          subjectName: v.subject.name,
          chapterTitle: `Ch ${v.chapter.chapterNumber}: ${v.chapter.title}`,
          href: `/chapters/${v.chapterId}`,
          externalUrl: v.youtubeUrl,
          createdAt: v.createdAt.toISOString(),
        });
      }
    }

    if (typeFilter === 'ALL' || typeFilter === 'PDF' || typeFilter === 'IMAGE') {
      const files = await prisma.file.findMany({
        where: {
          AND: [
            q
              ? {
                  OR: searchTerms.flatMap((term) => [
                    { fileName: { contains: term, mode: 'insensitive' as const } },
                    { studyNote: { title: { contains: term, mode: 'insensitive' as const } } },
                    { topic: { title: { contains: term, mode: 'insensitive' as const } } },
                    { subject: { name: { contains: term, mode: 'insensitive' as const } } },
                    { chapter: { title: { contains: term, mode: 'insensitive' as const } } },
                  ]),
                }
              : {},
            typeFilter === 'PDF' ? { fileType: 'PDF' } : {},
            typeFilter === 'IMAGE'
              ? { fileType: { in: ['JPG', 'PNG', 'JPEG', 'WEBP'] } }
              : {},
          ],
        },
        include: { subject: true, chapter: true, topic: true, studyNote: true },
        take: 100,
      });
      for (const f of files) {
        results.push({
          id: f.id,
          type: f.fileType === 'PDF' ? 'PDF' : 'IMAGE',
          title: f.studyNote?.title || f.fileName,
          subtitle: `File: ${f.fileName} (${(f.fileSize / 1024).toFixed(0)} KB)`,
          subjectName: f.subject.name,
          chapterTitle: `Ch ${f.chapter.chapterNumber}: ${f.chapter.title}`,
          topicTitle: f.topic.title,
          href: `/chapters/${f.chapterId}#topic-${f.topicId}`,
          externalUrl: f.driveShareUrl,
          fileType: f.fileType,
          fileSize: f.fileSize,
          createdAt: f.createdAt.toISOString(),
        });
      }
    }

    if (q && sort === 'relevance') {
      results.sort((a, b) => scoreSearchResult(q, b) - scoreSearchResult(q, a));
      // Remove weak incidental matches while keeping partial multi-word matches useful.
      for (let i = results.length - 1; i >= 0; i -= 1) {
        if (scoreSearchResult(q, results[i]) <= 0) results.splice(i, 1);
      }
    } else if (sort === 'alphabetical') {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === 'newest') {
      results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const total = results.length;
    const pagedItems = results.slice((page - 1) * pageSize, page * pageSize);

    return NextResponse.json({
      items: pagedItems,
      total,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil(total / pageSize)),
    });
  } catch (error) {
    console.error('GET /api/search error:', error);
    return NextResponse.json({ error: 'Global search failed' }, { status: 500 });
  }
}
