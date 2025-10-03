import { CaseCard } from './case-card';

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
};

export function CaseShowcase({ title, intro, cases }: CaseShowcaseProps) {
  if (!cases?.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title ? <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-600">{intro}</p> : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item) => (
            <CaseCard
              key={item.id || item.slug}
              title={item.title}
              href={`/marketing/cases/${item.slug}`}
              client={item.client}
              summary={item.summary}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
