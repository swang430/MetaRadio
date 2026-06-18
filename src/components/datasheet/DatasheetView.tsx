// Datasheet 富版式渲染器（服务端组件）。
// 读取 Strapi datasheet 的 body.sections（由 import-datasheets.js 从 .md 解析而来），
// 按"主分节(#) + 子分节(##)"分组成 band，再依据每段数据形态（表格列名 / items / bullets）
// 分派到对应版式：Hero / 指标 / 卡片 / 工作流 / 规格表 / 差异化 / CTA。
// 这样同一套渲染器即可覆盖 L1-L3、V1-V6 以及未来新增的 datasheet，无需逐个写页面。
import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Datasheet, DatasheetSection } from '../../../lib/api';

// datasheet slug → hero 配图（静态 public/，模型 C）。仅映射有强相关、可直接用的素材，
// 其余 datasheet 维持纯文字 hero（优雅降级）。图为「图卡」形式置于 hero 右栏，与 navy 协调。
type HeroImage = { src: string; width: number; height: number; alt: { 'zh-CN': string; en: string } };
const HERO_IMAGES: Record<string, HeroImage> = {
  'l1-ray-tracing': {
    src: '/images/ds-l1-ray-tracing.jpg', width: 1200, height: 922,
    alt: { 'zh-CN': '射线-探针几何：Probe 与 Target 簇角分布', en: 'Ray-probe geometry: probe & target cluster angles' },
  },
  'l2-virtual-drive-test': {
    src: '/images/ds-l2-virtual-drive-test.jpg', width: 1200, height: 897,
    alt: { 'zh-CN': '微波暗室：虚拟路测与硬件在环验证', en: 'Microwave anechoic chamber: virtual drive test & hardware-in-the-loop' },
  },
  'l3-em-twin': {
    src: '/images/ds-l3-em-twin.jpg', width: 1200, height: 675,
    alt: { 'zh-CN': '电磁孪生验证：射线追踪波束 · RSRP 覆盖热图 · 路测 · 仿真-实测对比', en: 'EM-twin validation: ray-traced beams · RSRP coverage · drive test · sim-vs-measured' },
  },
  'liquid-rf': {
    src: '/images/ds-liquid-rf.jpg', width: 1200, height: 482,
    alt: { 'zh-CN': 'Liquid RF：天线经 GPUDirect 以 1–2ms 直连 GPU', en: 'Liquid RF: antenna to GPU via GPUDirect at 1–2 ms' },
  },
};

type Row = Record<string, string>;

/** 大小写不敏感地取表格单元格（表头可能是 Value/Icon/项目 等）。 */
function cell(row: Row, ...names: string[]): string {
  const keys = Object.keys(row);
  for (const n of names) {
    const k = keys.find((key) => key.toLowerCase() === n.toLowerCase());
    if (k && row[k]) return row[k];
  }
  return '';
}

function tableCols(table: Row[]): string[] {
  return table.length ? Object.keys(table[0]) : [];
}

function hasCols(cols: string[], ...names: string[]): boolean {
  const lower = cols.map((c) => c.toLowerCase());
  return names.every((n) => lower.includes(n.toLowerCase()));
}

type Band = { lead: DatasheetSection; parts: DatasheetSection[] };

/** 把扁平的 sections 按 level===1 的主分节切成 band，后续 ## 子分节归入其下。 */
function toBands(sections: DatasheetSection[]): Band[] {
  const bands: Band[] = [];
  for (const s of sections) {
    if (s.level === 1 || bands.length === 0) bands.push({ lead: s, parts: [] });
    else bands[bands.length - 1].parts.push(s);
  }
  return bands;
}

const isCta = (s: DatasheetSection) =>
  s.id === 'cta' || Boolean(s.fields['Primary CTA']) || s.items.some((i) => /CTA/i.test(i.title));

/** datasheet 列表卡片用：取 hero 的 Sub 作为摘要。 */
export function datasheetSummary(d: Datasheet): string {
  const hero = d.body?.sections?.find((s) => s.id === 'hero');
  return hero?.fields['Sub'] || hero?.fields['Headline'] || d.product || '';
}

// ---------- 各类 payload 版式 ----------

function MetricGrid({ rows, dark }: { rows: Row[]; dark?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl sm:grid-cols-3"
         style={{ background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(10,23,64,0.08)' }}>
      {rows.map((r, i) => (
        <div key={i} className={`px-6 py-8 text-center ${dark ? 'bg-brand-navy' : 'bg-white'}`}>
          <div className={`text-3xl font-bold md:text-4xl ${dark ? 'text-brand-cyan' : 'text-brand-navy'}`}>
            {cell(r, 'Value')}
          </div>
          <div className={`mt-2 text-sm ${dark ? 'text-slate-300' : 'text-slate-500'}`}>
            {cell(r, 'Label')}
          </div>
        </div>
      ))}
    </div>
  );
}

function CardGrid({ rows }: { rows: Row[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rows.map((r, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
          {cell(r, 'Icon') && <div className="mb-3 text-3xl">{cell(r, 'Icon')}</div>}
          <h3 className="mb-2 text-lg font-semibold text-brand-navy">{cell(r, 'Title')}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{cell(r, 'Text')}</p>
        </div>
      ))}
    </div>
  );
}

function WorkflowSteps({ rows }: { rows: Row[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((r, i) => (
        <div key={i} className="relative rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-3 text-2xl font-bold text-brand-cyan">{cell(r, 'Step') || String(i + 1).padStart(2, '0')}</div>
          <h3 className="mb-2 text-base font-semibold text-brand-navy">{cell(r, 'Title')}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{cell(r, 'Desc', 'Text')}</p>
        </div>
      ))}
    </div>
  );
}

function SpecTable({ rows, cols }: { rows: Row[]; cols: string[] }) {
  const [k, v] = cols;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
              <th className="w-1/3 border-b border-slate-200 px-5 py-3 text-left align-top font-semibold text-brand-navy">
                {r[k]}
              </th>
              <td className="border-b border-slate-200 px-5 py-3 align-top text-slate-700">{r[v]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GenericTable({ rows, cols }: { rows: Row[]; cols: string[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-brand-navy text-white">
            {cols.map((c) => (
              <th key={c} className="px-5 py-3 text-left font-semibold">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? 'bg-slate-50' : 'bg-white'}>
              {cols.map((c) => (
                <td key={c} className="border-b border-slate-200 px-5 py-3 align-top text-slate-700">{r[c]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DefinitionList({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {items.map((it, i) => (
        <div key={i} className="flex gap-4">
          <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-brand-emerald" aria-hidden />
          <div>
            <h3 className="mb-1 font-semibold text-brand-navy">{it.title}</h3>
            <p className="text-sm leading-relaxed text-slate-600">{it.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((b, i) => (
        <li key={i} className="flex gap-3 text-slate-700">
          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-cyan" aria-hidden />
          <span className="leading-relaxed">{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** 根据一个 section 的数据形态渲染其主体（表格 / 条目 / bullet / 文本）。 */
function SectionPayload({ section, dark }: { section: DatasheetSection; dark?: boolean }) {
  const cols = tableCols(section.table);
  const out: ReactNode[] = [];

  if (section.table.length) {
    if (hasCols(cols, 'Value', 'Label')) out.push(<MetricGrid key="t" rows={section.table} dark={dark} />);
    else if (hasCols(cols, 'Step')) out.push(<WorkflowSteps key="t" rows={section.table} />);
    else if (hasCols(cols, 'Icon')) out.push(<CardGrid key="t" rows={section.table} />);
    else if (cols.length === 2) out.push(<SpecTable key="t" rows={section.table} cols={cols} />);
    else out.push(<GenericTable key="t" rows={section.table} cols={cols} />);
  }

  if (section.items.length) out.push(<DefinitionList key="i" items={section.items} />);
  else if (section.bullets.length) out.push(<BulletList key="b" items={section.bullets} />);

  if (!out.length && section.text) {
    out.push(
      <p key="x" className="max-w-3xl whitespace-pre-line leading-relaxed text-slate-600">{section.text}</p>,
    );
  }
  return out.length ? <div className="space-y-6">{out}</div> : null;
}

// ---------- band 版式 ----------

function HeroBand({ band, heroImage, locale }: { band: Band; heroImage?: HeroImage; locale: string }) {
  const f = band.lead.fields;
  const metrics = band.parts.find((p) => hasCols(tableCols(p.table), 'Value', 'Label'));
  const text = (
    <div>
      {f['Badge'] && (
        <span className="inline-block rounded-full border border-brand-cyan/40 px-4 py-1 text-xs font-medium text-brand-cyan">
          {f['Badge']}
        </span>
      )}
      {f['Eyebrow'] && (
        <p className="mt-6 text-sm font-medium uppercase tracking-widest text-slate-300">{f['Eyebrow']}</p>
      )}
      <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
        {f['Headline']}
        {f['Headline-em'] && <span className="mt-2 block text-brand-cyan">{f['Headline-em']}</span>}
      </h1>
      {f['Sub'] && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{f['Sub']}</p>}
    </div>
  );
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'radial-gradient(900px 500px at 80% -10%, rgba(0,209,255,0.22), transparent 60%)' }}
        aria-hidden
      />
      <div className="container relative mx-auto px-6 py-20 md:py-28">
        {heroImage ? (
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {text}
            <div className="relative">
              <Image
                src={heroImage.src}
                alt={locale === 'en' ? heroImage.alt.en : heroImage.alt['zh-CN']}
                width={heroImage.width}
                height={heroImage.height}
                priority
                sizes="(min-width: 1024px) 600px, 100vw"
                className="h-auto w-full rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
        ) : (
          text
        )}
        {metrics && (
          <div className="mt-12 max-w-3xl">
            <MetricGrid rows={metrics.table} dark />
          </div>
        )}
      </div>
    </section>
  );
}

function ContentBand({ band, alt }: { band: Band; alt: boolean }) {
  const { lead, parts } = band;
  const title = lead.fields['Title'] || lead.label || lead.key || lead.heading;
  const description = lead.fields['Description'];
  return (
    <section className={alt ? 'bg-slate-50' : 'bg-white'}>
      <div className="container mx-auto px-6 py-16 md:py-20">
        <header className="mb-10 max-w-3xl">
          {lead.label && lead.fields['Title'] && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-emerald">{lead.label}</p>
          )}
          <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-relaxed text-slate-600">{description}</p>}
        </header>
        <div className="space-y-10">
          <SectionPayload section={lead} />
          {parts.map((p) => (
            <SectionPayload key={p.id} section={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBand({ band, locale }: { band: Band; locale: string }) {
  const f: Record<string, string> = { ...band.lead.fields };
  band.lead.items.forEach((it) => (f[it.title] = it.text));
  const email = f['Email'];
  const primary = f['Primary CTA'] || (locale === 'en' ? 'Get in touch' : '联系我们');
  return (
    <section className="bg-brand-navy text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        {f['Tagline'] && <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{f['Tagline']}</h2>}
        {f['Sub'] && <p className="mx-auto mt-4 max-w-2xl text-slate-300">{f['Sub']}</p>}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={email ? `mailto:${email}` : `/${locale}/contact`}
            className="rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110"
          >
            {primary}
          </a>
          <Link
            href={`/${locale}/contact`}
            className="rounded-lg border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            {locale === 'en' ? 'Contact us' : '联系方式'}
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- 顶层 ----------

export default function DatasheetView({ datasheet, locale }: { datasheet: Datasheet; locale: string }) {
  const sections = datasheet.body?.sections ?? [];
  const bands = toBands(sections);
  let altIndex = 0;

  return (
    <article>
      <div className="bg-brand-navy">
        <div className="container mx-auto px-6 pt-6">
          <Link href={`/${locale}/datasheets`} className="text-sm text-slate-300 transition hover:text-brand-cyan">
            ← {locale === 'en' ? 'All datasheets' : '全部产品方案'}
          </Link>
        </div>
      </div>
      {bands.map((band, i) => {
        if (band.lead.id === 'hero') return <HeroBand key={i} band={band} heroImage={HERO_IMAGES[datasheet.slug]} locale={locale} />;
        if (isCta(band.lead)) return <CtaBand key={i} band={band} locale={locale} />;
        const alt = altIndex++ % 2 === 1;
        return <ContentBand key={i} band={band} alt={alt} />;
      })}
    </article>
  );
}
