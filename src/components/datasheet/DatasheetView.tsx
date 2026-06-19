// Datasheet 富版式渲染器（服务端组件）。
// 读取 Strapi datasheet 的 body.sections（由 import-datasheets.js 从 .md 解析而来），
// 按"主分节(#) + 子分节(##)"分组成 band，再依据每段数据形态（表格列名 / items / bullets）
// 分派到对应版式：Hero / 指标 / 卡片 / 工作流 / 规格表 / 差异化 / CTA。
// 这样同一套渲染器即可覆盖 L1-L3、V1-V6 以及未来新增的 datasheet，无需逐个写页面。
import Link from 'next/link';
import Image from 'next/image';
import type { ReactNode } from 'react';
import type { Datasheet, DatasheetSection } from '../../../lib/api';
import VerticalScene, { hasScene } from './VerticalScene';
import { HeroFieldBg } from '../illustrations/HeroFieldBg';
import { datasheetGroup } from '../../../lib/api';

// datasheet hero 媒体优先级：Strapi heroImage（后台 GUI 可上传深色图）→ 深色矢量场景（VerticalScene，全 10 款）。
// 历史白底静态图卡（ds-*.jpg）已下线——深色站上白图不协调，统一改用深色矢量场景示意图。

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
        <div key={i} className={`px-6 py-8 text-center ${dark ? 'bg-brand-navy' : 'bg-brand-surface'}`}>
          <div className={`text-3xl font-bold md:text-4xl ${dark ? 'text-brand-cyan' : 'text-white'}`}>
            {cell(r, 'Value')}
          </div>
          <div className={`mt-2 text-sm ${dark ? 'text-slate-300' : 'text-slate-400'}`}>
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
        <div key={i} className="rounded-xl border border-white/10 bg-brand-surface p-6 transition hover:shadow-md">
          {cell(r, 'Icon') && <div className="mb-3 text-3xl">{cell(r, 'Icon')}</div>}
          <h3 className="mb-2 text-lg font-semibold text-white">{cell(r, 'Title')}</h3>
          <p className="text-sm leading-relaxed text-slate-300">{cell(r, 'Text')}</p>
        </div>
      ))}
    </div>
  );
}

function WorkflowSteps({ rows }: { rows: Row[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((r, i) => (
        <div key={i} className="relative rounded-xl border border-white/10 bg-brand-surface p-6">
          <div className="mb-3 text-2xl font-bold text-brand-cyan">{cell(r, 'Step') || String(i + 1).padStart(2, '0')}</div>
          <h3 className="mb-2 text-base font-semibold text-white">{cell(r, 'Title')}</h3>
          <p className="text-sm leading-relaxed text-slate-300">{cell(r, 'Desc', 'Text')}</p>
        </div>
      ))}
    </div>
  );
}

function SpecTable({ rows, cols }: { rows: Row[]; cols: string[] }) {
  const [k, v] = cols;
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 ? 'bg-white/5' : ''}>
              <th className="w-1/3 border-b border-white/10 px-5 py-3 text-left align-top font-semibold text-white">
                {r[k]}
              </th>
              <td className="border-b border-white/10 px-5 py-3 align-top text-slate-300">{r[v]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GenericTable({ rows, cols }: { rows: Row[]; cols: string[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
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
            <tr key={i} className={i % 2 ? 'bg-white/5' : ''}>
              {cols.map((c) => (
                <td key={c} className="border-b border-white/10 px-5 py-3 align-top text-slate-300">{r[c]}</td>
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
            <h3 className="mb-1 font-semibold text-white">{it.title}</h3>
            <p className="text-sm leading-relaxed text-slate-300">{it.text}</p>
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
        <li key={i} className="flex gap-3 text-slate-300">
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
      <p key="x" className="max-w-3xl whitespace-pre-line leading-relaxed text-slate-300">{section.text}</p>,
    );
  }
  return out.length ? <div className="space-y-6">{out}</div> : null;
}

// ---------- band 版式 ----------

function HeroBand({ band }: { band: Band }) {
  const f = band.lead.fields;
  const metrics = band.parts.find((p) => hasCols(tableCols(p.table), 'Value', 'Label'));
  // 全站统一影院式 Hero：满幅电磁射线场 + 左侧渐变压暗 + 文案叠加（与首页/列表页同款）。
  // 代表图不在此处——已下放到底部收尾段（CtaBand 的「产品速览」）。
  return (
    <section className="relative isolate flex min-h-[62vh] items-center overflow-hidden text-white" style={{ backgroundColor: '#060B1A' }}>
      <HeroFieldBg className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: 'linear-gradient(90deg, rgba(6,11,26,0.92) 0%, rgba(6,11,26,0.55) 42%, rgba(6,11,26,0) 78%)' }}
      />
      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="max-w-2xl">
          {f['Badge'] && (
            <span className="inline-block rounded-full border border-brand-cyan/40 px-4 py-1 text-xs font-medium text-brand-cyan">
              {f['Badge']}
            </span>
          )}
          {f['Eyebrow'] && (
            <p className="mt-6 text-sm font-medium uppercase tracking-widest text-brand-cyan">{f['Eyebrow']}</p>
          )}
          <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl" style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}>
            {f['Headline']}
            {f['Headline-em'] && <span className="mt-2 block text-brand-cyan">{f['Headline-em']}</span>}
          </h1>
          {f['Sub'] && <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">{f['Sub']}</p>}
        </div>
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
    <section className={alt ? 'bg-brand-ink-2' : 'bg-brand-ink'}>
      <div className="container mx-auto px-6 py-16 md:py-20">
        <header className="mb-10 max-w-3xl">
          {lead.label && lead.fields['Title'] && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-emerald">{lead.label}</p>
          )}
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
          {description && <p className="mt-4 text-base leading-relaxed text-slate-300">{description}</p>}
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

function CtaBand({ band, locale, media }: { band: Band; locale: string; media?: ReactNode }) {
  const f: Record<string, string> = { ...band.lead.fields };
  band.lead.items.forEach((it) => (f[it.title] = it.text));
  const email = f['Email'];
  const primary = f['Primary CTA'] || (locale === 'en' ? 'Get in touch' : '联系我们');
  const buttons = (
    <>
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
    </>
  );
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden
        style={{ background: 'radial-gradient(900px 500px at 85% -10%, rgba(0,209,255,0.18), transparent 60%)' }}
      />
      <div className="container relative mx-auto px-6 py-20">
        {media ? (
          // 收尾总结：紧凑速览图（图为辅）+ 收尾文案/CTA（文为主），整体居中收束、体量相称。
          <div className="mx-auto grid max-w-4xl items-center gap-8 sm:grid-cols-[240px_1fr] sm:gap-12">
            {media}
            <div>
              {f['Tagline'] && <h2 className="text-2xl font-bold leading-tight md:text-3xl">{f['Tagline']}</h2>}
              {f['Sub'] && <p className="mt-4 text-slate-300">{f['Sub']}</p>}
              <div className="mt-8 flex flex-wrap gap-4">{buttons}</div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl text-center">
            {f['Tagline'] && <h2 className="text-3xl font-bold leading-tight md:text-4xl">{f['Tagline']}</h2>}
            {f['Sub'] && <p className="mx-auto mt-4 max-w-2xl text-slate-300">{f['Sub']}</p>}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">{buttons}</div>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 顶层 ----------

export default function DatasheetView({ datasheet, locale }: { datasheet: Datasheet; locale: string }) {
  const sections = datasheet.body?.sections ?? [];
  const bands = toBands(sections);
  const group = datasheetGroup(datasheet.category);
  // 代表该 datasheet 的深色矢量场景（全 10 款均有；无场景才回退 Strapi heroImage，需为深色图）。
  // 安置到底部收尾段（CtaBand 的「产品速览」），不占用 Hero、也不孤悬页面中部。
  const cms = datasheet.heroImage;
  const media = hasScene(datasheet.slug) ? (
    <VerticalScene slug={datasheet.slug} locale={locale} />
  ) : cms?.url ? (
    <Image
      src={cms.url}
      alt={cms.alternativeText || datasheet.title}
      width={cms.width || 1600}
      height={cms.height || 900}
      sizes="(min-width: 1024px) 600px, 100vw"
      className="h-auto w-full rounded-xl border border-white/10 shadow-md"
    />
  ) : null;
  let altIndex = 0;
  let mediaPlaced = false;

  return (
    <article>
      <div className="bg-brand-navy">
        <div className="container mx-auto px-6 pt-6">
          <Link href={`/${locale}/${group}`} className="text-sm text-slate-300 transition hover:text-brand-cyan">
            ← {group === 'solutions' ? (locale === 'en' ? 'All solutions' : '全部解决方案') : (locale === 'en' ? 'All products' : '全部产品')}
          </Link>
        </div>
      </div>
      {bands.map((band, i) => {
        if (band.lead.id === 'hero') return <HeroBand key={i} band={band} />;
        if (isCta(band.lead)) {
          mediaPlaced = true;
          return <CtaBand key={i} band={band} locale={locale} media={media} />;
        }
        const alt = altIndex++ % 2 === 1;
        return <ContentBand key={i} band={band} alt={alt} />;
      })}
      {/* 兜底：datasheet 无 CTA 段时，仍把速览图收在底部一个收尾段里（不丢、不乱放）。 */}
      {media && !mediaPlaced && (
        <section className="relative overflow-hidden bg-brand-navy text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            aria-hidden
            style={{ background: 'radial-gradient(900px 500px at 85% -10%, rgba(0,209,255,0.18), transparent 60%)' }}
          />
          <div className="container relative mx-auto max-w-md px-6 py-20">
            {media}
          </div>
        </section>
      )}
    </article>
  );
}
