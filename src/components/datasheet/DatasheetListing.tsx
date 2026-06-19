// 列表页骨架：navy hero（eyebrow/title/sub）+ 若干分组网格。/products 与 /solutions 共用。
import type { Datasheet } from '../../../lib/api';
import { DatasheetCard } from './DatasheetCard';

export type ListingGroup = { heading: string; sub: string; list: Datasheet[] };

export function DatasheetListing({
  locale,
  eyebrow,
  title,
  sub,
  groups,
}: {
  locale: string;
  eyebrow: string;
  title: string;
  sub: string;
  groups: ListingGroup[];
}) {
  return (
    <div>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(900px 500px at 80% -10%, rgba(0,209,255,0.22), transparent 60%)' }}
          aria-hidden
        />
        <div className="container relative mx-auto px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan">{eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{sub}</p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {groups.map((g) =>
          g.list.length ? (
            <section key={g.heading} className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-brand-navy">{g.heading}</h2>
                <p className="mt-1 text-sm text-slate-500">{g.sub}</p>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {g.list.map((d) => (
                  <DatasheetCard key={d.slug} d={d} locale={locale} />
                ))}
              </div>
            </section>
          ) : null,
        )}
      </div>
    </div>
  );
}
