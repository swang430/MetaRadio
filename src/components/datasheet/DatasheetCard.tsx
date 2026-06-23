// 列表页用的 datasheet 卡片。链接经 datasheetHref 自动按 category 归入 /products 或 /solutions。
import Link from 'next/link';
import { datasheetHref, type Datasheet } from '../../../lib/api';
import { datasheetSummary } from './DatasheetView';

export function DatasheetCard({ d, locale }: { d: Datasheet; locale: string }) {
  return (
    <Link
      href={datasheetHref(locale, d)}
      className="group flex flex-col rounded-xl border border-white/10 bg-brand-surface p-6 transition hover:-translate-y-0.5 hover:border-brand-cyan hover:shadow-md"
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="rounded-md bg-brand-navy px-2.5 py-1 text-xs font-bold text-brand-cyan">{d.code}</span>
        {d.product && <span className="truncate text-xs text-slate-400">{d.product}</span>}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-brand-cyan">{d.title}</h3>
      <p className="line-clamp-3 text-sm leading-relaxed text-slate-300">{datasheetSummary(d)}</p>
      <span className="mt-4 text-sm font-medium text-brand-cyan">
        {locale === 'en' ? 'View datasheet →' : '查看详情 →'}
      </span>
    </Link>
  );
}
