import Link from 'next/link';
import { getDatasheets, type Datasheet } from '../../../../lib/api';
import { datasheetSummary } from '@/components/datasheet/DatasheetView';

// 内容由 Strapi 实时提供（支持后端随时编辑），不在构建期冻结。
export const dynamic = 'force-dynamic';

const COPY = {
  'zh-CN': {
    eyebrow: '产品与解决方案',
    title: '电磁空间数字孪生，从共性技术到行业方案',
    sub: '以确定性射线跟踪为底座（L1-L3 共性技术），向低空、卫星、通感、自动驾驶、机器人、6G 等场景延伸（V1-V6 行业方案）。',
    horizontal: '共性技术平台',
    horizontalSub: 'L1-L3 · 可被所有行业方案复用的底层能力',
    vertical: '行业解决方案',
    verticalSub: 'V1-V6 · 面向具体场景的端到端方案',
  },
  en: {
    eyebrow: 'Products & Solutions',
    title: 'An EM-space digital twin, from foundations to verticals',
    sub: 'Built on deterministic ray tracing (L1-L3 foundations), extended to low-altitude, satellite, ISAC, autonomous driving, robotics and 6G (V1-V6 verticals).',
    horizontal: 'Foundational Platforms',
    horizontalSub: 'L1-L3 · core capabilities reused across every vertical',
    vertical: 'Industry Solutions',
    verticalSub: 'V1-V6 · end-to-end solutions for specific scenarios',
  },
} as const;

function DatasheetCard({ d, locale }: { d: Datasheet; locale: string }) {
  return (
    <Link
      href={`/${locale}/datasheets/${d.slug}`}
      className="group flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-cyan hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-md bg-brand-navy px-2.5 py-1 text-xs font-bold text-brand-cyan">{d.code}</span>
        {d.product && <span className="truncate text-xs text-slate-400">{d.product}</span>}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-brand-navy group-hover:text-brand-cyan">{d.title}</h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">{datasheetSummary(d)}</p>
      <span className="mt-4 text-sm font-medium text-brand-cyan">
        {locale === 'en' ? 'View datasheet →' : '查看详情 →'}
      </span>
    </Link>
  );
}

export default async function DatasheetsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = COPY[locale === 'en' ? 'en' : 'zh-CN'];
  const datasheets = await getDatasheets(locale);
  const horizontal = datasheets.filter((d) => d.category === 'horizontal');
  const vertical = datasheets.filter((d) => d.category === 'vertical');

  const Group = ({ heading, sub, list }: { heading: string; sub: string; list: Datasheet[] }) =>
    list.length ? (
      <section className="mb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-navy">{heading}</h2>
          <p className="mt-1 text-sm text-slate-500">{sub}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((d) => (
            <DatasheetCard key={d.slug} d={d} locale={locale} />
          ))}
        </div>
      </section>
    ) : null;

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{ background: 'radial-gradient(900px 500px at 80% -10%, rgba(0,209,255,0.22), transparent 60%)' }}
          aria-hidden
        />
        <div className="container relative mx-auto px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{t.sub}</p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        <Group heading={t.horizontal} sub={t.horizontalSub} list={horizontal} />
        <Group heading={t.vertical} sub={t.verticalSub} list={vertical} />
      </div>
    </div>
  );
}
