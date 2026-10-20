'use client';

import { Search as SearchIcon, X } from 'lucide-react';
import Form from 'next/form';
import { useRouter } from 'next/navigation';
import { useId, useRef, useTransition } from 'react';
import { Boundary } from '@/components/demo/boundary';
import { SeedFromSearchParam } from '@/components/scripts/seed-from-search-param';
import { useSyncInputToSearchParam } from '@/hooks/use-sync-input-to-search-param';
import type { Route } from 'next';

export function Search({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const [isPending, startTransition] = useTransition();

  useSyncInputToSearchParam(inputRef, 'q');

  return (
    <Boundary label="Search">
      <Form action="/search" replace scroll={false} className="relative mb-8 flex items-center">
        <SearchIcon aria-hidden="true" className="text-gray pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          name="q"
          autoComplete="off"
          aria-label="Search podcast episodes and shows"
          placeholder="Search episodes, shows, or topics"
          enterKeyHint="search"
          suppressHydrationWarning
          onChange={event => {
            const value = event.target.value;
            startTransition(() => {
              router.replace((value ? `/search?q=${encodeURIComponent(value)}` : '/search') as Route, {
                scroll: false,
              });
            });
          }}
          className="!rounded-full !py-3 !pr-11 !pl-12 !text-base"
        />
        <button type="button" aria-label="Clear search" onClick={() => router.replace('/search')} className="text-muted hover:text-foreground absolute top-1/2 right-3 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full transition-colors" tabIndex={0}>
          <X aria-hidden="true" className="h-4 w-4" />
        </button>
        <SeedFromSearchParam targetId={inputId} param="q" />
      </Form>
      <div
        className="transition-opacity duration-200 ease-out data-pending:opacity-60"
        data-pending={isPending ? '' : undefined}
      >
        {children}
      </div>
    </Boundary>
  );
}
