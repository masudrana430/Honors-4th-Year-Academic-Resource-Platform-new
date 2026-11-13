import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Prisma Postgres provides separate direct and pooled endpoints.
 * Keep DATABASE_URL pointed at the direct endpoint for Prisma CLI/migrations,
 * but route application queries through the pooler in production.
 *
 * DATABASE_URL_POOLED can be supplied explicitly. When it is not present,
 * derive Prisma Postgres's pooled hostname from the direct DATABASE_URL.
 */
function getRuntimeDatabaseUrl(): string | undefined {
  const explicitPooledUrl = process.env.DATABASE_URL_POOLED;
  const sourceUrl = explicitPooledUrl || process.env.DATABASE_URL;

  if (!sourceUrl) return undefined;

  try {
    const url = new URL(sourceUrl);

    if (!explicitPooledUrl && url.hostname === 'db.prisma.io') {
      url.hostname = 'pooled.db.prisma.io';
    }

    // Vercel Functions are serverless; keep each warm instance's local pool
    // small so many instances do not exhaust the database connection quota.
    if (process.env.NODE_ENV === 'production' && url.protocol.startsWith('postgres')) {
      url.searchParams.set('connection_limit', '1');
    }

    return url.toString();
  } catch {
    // Preserve custom connection strings that are not URL-parseable.
    return sourceUrl;
  }
}

const runtimeDatabaseUrl = getRuntimeDatabaseUrl();

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    ...(runtimeDatabaseUrl
      ? { datasources: { db: { url: runtimeDatabaseUrl } } }
      : {}),
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
