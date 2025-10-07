import { CaseCard } from './case-card';
import type { Locale } from '@/lib/i18n/config';
import clsx from 'clsx';

type CaseShowcaseProps = {
  title?: string | null;
  intro?: string | null;
  cases: Array<{
    id?: number | string;
    title: string;
    slug: string;
    client?: string | null;
    summary?: string | null;
  }>;
  locale?: Locale;
  viewDetailLabel?: string | null;
  theme?: 'dark' | 'light';
};

export function CaseShowcase({ title, intro, cases, locale, viewDetailLabel, theme = 'dark' }: CaseShowcaseProps) {
  if (!cases?.length) return null;
  return (
    <section
      className={clsx('relative py-20', {
        'bg-dark-background': theme === 'dark',
        'bg-white': theme === 'light',
      })}
    >
      <div className="container px-6">
        {title ? (
          <h2
            className={clsx('font-display text-3xl md:text-4xl', {
              'text-white': theme === 'dark',
              'text-slate-900': theme === 'light',
            })}
          >
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p
            className={clsx('mt-3 max-w-2xl text-base sm:text-lg', {
              'text-slate-200/75': theme === 'dark',
              'text-slate-600': theme === 'light',
            })}
          >
            {intro}
          </p>
        ) : null}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <CaseCard
              key={item.id || item.slug}
              title={item.title}
              href={`/marketing/cases/${item.slug}`}
              locale={locale}
              client={item.client}
              summary={item.summary}
              viewDetailLabel={viewDetailLabel}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}