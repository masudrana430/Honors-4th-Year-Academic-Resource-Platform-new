import SearchResults from '@/components/search/SearchResults';

export const dynamic = 'force-dynamic';

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  return <SearchResults initialQuery={searchParams.q || ''} />;
}
