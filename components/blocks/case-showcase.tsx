import { CaseCard } from './case-card';
import type { Locale } from '@/lib/i18n/config';

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
};

export function CaseShowcase({ title, intro, cases, locale, viewDetailLabel }: CaseShowcaseProps) {
  if (!cases?.length) return null;
  return (
    <section className="relative py-20">
      <div className="container px-6">
        {title ? <h2 className="font-display text-3xl text-white md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-200/75 sm:text-lg">{intro}</p> : null}
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
