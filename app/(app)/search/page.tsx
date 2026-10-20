import { SectionStructuredData } from '@/components/seo/section-structured-data';
import { AnimatedSuspense } from '@/components/ui/animated-suspense';
import ErrorBoundary from '@/components/ui/error-boundary';
import { PageWrapper } from '@/components/ui/page-layout';
import { Skeleton } from '@/components/ui/skeleton';
import { PodcastSearch } from '@/features/podcast/components/podcast-search';
import { Search } from '@/features/search/components/search';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search',
};

export default function SearchPage({ searchParams }: PageProps<'/search'>) {
  return (
    <PageWrapper title="Search">
      <SectionStructuredData type="SearchResultsPage" name="Search Neurodiversity Nation" description="Search Neurodiversity Nation podcast shows and episodes." url="/search" />
      <Search>
        <ErrorBoundary title="Search is taking a breather">
          <AnimatedSuspense fallback={<Skeleton className="h-32 w-full" />}>
            {searchParams.then(sp => {
              const q = typeof sp.q === 'string' ? sp.q : '';
              if (!q) {
                return (
                  <>
                    <div className="mb-5"><p className="text-accent text-xs font-bold uppercase tracking-[0.18em]">Podcast discovery</p><h2 className="mt-1 text-2xl font-bold">Find your next conversation</h2><p className="text-muted mt-2 text-sm">Search live Spreaker episodes and shows from Neurodiversity Nation.</p></div>
                    <PodcastSearch query="Neurodiversity Nation" />
                  </>
                );
              }
              return (
                <div className="space-y-10">
                  <section>
                    <div className="mb-4 flex items-baseline justify-between gap-4">
                      <h2>Episodes and shows</h2>
                      <span className="text-muted text-sm">From Spreaker</span>
                    </div>
                    <PodcastSearch query={q} />
                  </section>
                </div>
              );
            })}
          </AnimatedSuspense>
        </ErrorBoundary>
      </Search>
    </PageWrapper>
  );
}
