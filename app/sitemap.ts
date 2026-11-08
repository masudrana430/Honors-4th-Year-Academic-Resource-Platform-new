import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://honors-4th-year-academic-resource-platform.onrender.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/subjects`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
  ];

  try {
    const [subjects, chapters] = await Promise.all([
      prisma.subject.findMany({ select: { id: true, updatedAt: true } }),
      prisma.chapter.findMany({ select: { id: true, updatedAt: true } }),
    ]);

    const subjectRoutes = subjects.map((s) => ({
      url: `${baseUrl}/subjects/${s.id}`,
      lastModified: s.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    const chapterRoutes = chapters.map((c) => ({
      url: `${baseUrl}/chapters/${c.id}`,
      lastModified: c.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...subjectRoutes, ...chapterRoutes];
  } catch {
    return staticRoutes;
  }
}
