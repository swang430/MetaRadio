// 列表页骨架：满幅影院射线场 hero（eyebrow/title/sub 叠加）+ 若干分组网格。/products 与 /solutions 共用。
// hero 与首页同款（HeroFieldBg），形成全站统一的「电磁射线场」品牌纹理；差异由文案承载。
import type { Datasheet } from '../../../lib/api';
import { DatasheetCard } from './DatasheetCard';
import { HeroFieldBg } from '../illustrations/HeroFieldBg';

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
      <section className="relative isolate flex min-h-[62vh] items-center overflow-hidden text-white" style={{ backgroundColor: '#060B1A' }}>
        <HeroFieldBg className="absolute inset-0 h-full w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: 'linear-gradient(90deg, rgba(6,11,26,0.92) 0%, rgba(6,11,26,0.55) 42%, rgba(6,11,26,0) 78%)' }}
        />
        <div className="container relative z-10 mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl" style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}>{title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">{sub}</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {groups.map((g) =>
          g.list.length ? (
            <section key={g.heading} className="mb-16">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">{g.heading}</h2>
                <p className="mt-1 text-sm text-slate-400">{g.sub}</p>
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
