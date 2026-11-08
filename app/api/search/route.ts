import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma/client';
import { SearchResultItem } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const typeFilter = (searchParams.get('type') || 'ALL').toUpperCase();
    const sort = searchParams.get('sort') || 'relevance';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const pageSize = Math.min(30, Math.max(1, parseInt(searchParams.get('pageSize') || '10', 10)));

    const results: SearchResultItem[] = [];

    if (typeFilter === 'ALL' || typeFilter === 'SUBJECT') {
      const subjects = await prisma.subject.findMany({
        where: q
          ? {
              OR: [
                { name: { contains: q, mode: 'insensitive' } },
                { code: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
              ],
            }
          : undefined,
        take: 20,
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
      const numMatch = q.match(/^\d+$/);
      const chapters = await prisma.chapter.findMany({
        where: q
          ? {
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                ...(numMatch ? [{ chapterNumber: parseInt(numMatch[0], 10) }] : []),
              ],
            }
          : undefined,
        include: { subject: true },
        take: 25,
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
                { title: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
              ],
            }
          : undefined,
        include: { chapter: { include: { subject: true } } },
        take: 25,
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
                { title: { contains: q, mode: 'insensitive' } },
                { shortDescription: { contains: q, mode: 'insensitive' } },
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
                  OR: [
                    { fileName: { contains: q, mode: 'insensitive' } },
                    { studyNote: { title: { contains: q, mode: 'insensitive' } } },
                    { topic: { title: { contains: q, mode: 'insensitive' } } },
                  ],
                }
              : {},
            typeFilter === 'PDF' ? { fileType: 'PDF' } : {},
            typeFilter === 'IMAGE'
              ? { fileType: { in: ['JPG', 'PNG', 'JPEG', 'WEBP'] } }
              : {},
          ],
        },
        include: { subject: true, chapter: true, topic: true, studyNote: true },
        take: 30,
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

    if (sort === 'alphabetical') {
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
