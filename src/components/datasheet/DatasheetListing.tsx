// 列表页骨架：满幅影院射线场 hero（eyebrow/title/sub 叠加）+ 若干分组网格。/products 与 /solutions 共用。
// hero 与首页同款（HeroFieldBg），形成全站统一的「电磁射线场」品牌纹理；差异由文案承载。
import type { Datasheet } from '../../../lib/api';
import { DatasheetCard } from './DatasheetCard';
import { CinematicHero } from '../layout/CinematicHero';

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
      <CinematicHero eyebrow={eyebrow} title={title} sub={sub} minHClass="min-h-[62vh]" />

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
