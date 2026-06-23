import Link from 'next/link';
import { assertVisible } from '../../../../lib/page-visibility';
import { CinematicHero } from '@/components/layout/CinematicHero';
import { getPage, type Page } from '../../../../lib/api';

export const dynamic = 'force-dynamic';

// 关于乾径 / About — 设计纲要 §6 + §1.1「底牌」三幕。
// 文案由 Strapi page（seed-data/pages/about.md）提供，内容源不可达时降级到内联 COPY。
// 回扣立意：一支同时拥有电磁第一性原理与 GPU 工程能力的团队，一套贯穿仿真到终端的
// GPU 加速电磁计算栈，一组与晶泰/高通同构的混合商业模式。纯静态、中英双语。
// 具体融资/奖项数字与团队人像待业务侧素材，先以"敬请期待"占位。

type Locale = 'zh-CN' | 'en';
const pick = (l: string): Locale => (l === 'en' ? 'en' : 'zh-CN');

const COPY = {
  'zh-CN': {
    eyebrow: '关于乾径 · About MetaRadio',
    title: '站在同一场迁移的轴线上',
    sub: '通信正从专用器件迁移到通用算力，无线研发正从外场试错迁移到电磁孪生 + AI 闭环。这不是两件事，是同一场迁移的两端——乾径站在这条轴线上。',
    cardsTitle: '我们的底牌',
    cards: [
      { accent: 'cyan', tag: '团队', title: '电磁第一性原理 × GPU 工程能力', body: '北交大 / 北理工教授团队提供电磁与信道的第一性原理，三星 / 滴滴 / VIAVI 出身的实战派提供 GPU 与系统工程能力。两种基因，一个团队。' },
      { accent: 'emerald', tag: '技术栈', title: '贯穿仿真到终端的 GPU 加速电磁计算栈', body: 'Lauraycs（仿真）↔ Liquid RF（终端运行时）共享同一套 GPU 加速电磁计算栈与 AI-Native 方法论——一份电磁，两端基础设施。' },
      { accent: 'amber', tag: '商业模式', title: '研发基础设施 + 终端连接平台', body: '与晶泰同构——做 AI for Wireless 的研发基础设施；与高通同构——做下一代终端的连接平台。从研发服务到平台许可的混合模式。' },
    ],
    teamTitle: '公司与团队',
    teamBody: '乾径由一支跨学科团队组成：一端是深耕电磁理论与信道建模的高校教授，另一端是来自头部通信与出行企业、做过大规模 GPU 与系统工程的实战派。我们相信，下一代无线的突破，恰恰发生在"电磁第一性原理"与"通用算力工程"的交叉点上。',
    teamNote: '团队成员介绍与人像 · 敬请期待',
    partnersTitle: '客户与合作伙伴',
    partners: ['北京交通大学', '北京理工大学', '中国信通院', '上海物理智能与机器人研究院'],
    locationsTitle: '据点',
    locations: ['北京', '上海', '行业实验室：重庆 · 东莞 · 昆山'],
    ctaTitle: '想更深入了解乾径？',
    ctaPrimary: '预约一次战略对话',
    ctaSecondary: '浏览产品与方案',
  },
  en: {
    eyebrow: 'About MetaRadio',
    title: 'On the axis of one great migration',
    sub: 'Communication is migrating from dedicated silicon to general compute; wireless R&D is migrating from field trial-and-error to EM twin + AI loop. Not two things — two ends of one migration. MetaRadio stands on that axis.',
    cardsTitle: 'What we are',
    cards: [
      { accent: 'cyan', tag: 'Team', title: 'EM first principles × GPU engineering', body: 'Professors from BJTU / BIT bring the first principles of electromagnetics and channels; practitioners from Samsung / DiDi / VIAVI bring GPU and systems engineering. Two kinds of DNA, one team.' },
      { accent: 'emerald', tag: 'Tech stack', title: 'A GPU-accelerated EM compute stack from simulation to terminal', body: 'Lauraycs (simulation) ↔ Liquid RF (terminal runtime) share one GPU-accelerated EM compute stack and AI-Native methodology — one EM reality, two infrastructures.' },
      { accent: 'amber', tag: 'Business model', title: 'R&D infrastructure + terminal connectivity platform', body: 'Like XtalPi — R&D infrastructure for AI-for-Wireless; like Qualcomm — the connectivity platform for next-gen terminals. A hybrid model from R&D services to platform licensing.' },
    ],
    teamTitle: 'Company & Team',
    teamBody: 'MetaRadio is an interdisciplinary team: on one end, university professors deep in electromagnetic theory and channel modeling; on the other, practitioners from leading comms and mobility companies who have shipped large-scale GPU and systems engineering. We believe the next wireless breakthrough happens precisely at the intersection of EM first principles and general-compute engineering.',
    teamNote: 'Team bios and portraits · coming soon',
    partnersTitle: 'Customers & partners',
    partners: ['Beijing Jiaotong University', 'Beijing Institute of Technology', 'CAICT', 'Shanghai Inst. of Physical Intelligence & Robotics'],
    locationsTitle: 'Locations',
    locations: ['Beijing', 'Shanghai', 'Industry labs: Chongqing · Dongguan · Kunshan'],
    ctaTitle: 'Want to know MetaRadio more deeply?',
    ctaPrimary: 'Book a strategy call',
    ctaSecondary: 'Explore products & solutions',
  },
};

const ACCENT: Record<string, string> = { cyan: 'text-brand-cyan', emerald: 'text-brand-emerald', amber: 'text-brand-amber' };

/** Strapi page 分节 → COPY 形状；缺关键分节则回退内联 COPY。 */
function fromSections(page: Page, locale: string): typeof COPY['zh-CN'] {
  const secs = page.body?.sections ?? [];
  const S = (id: string) => secs.find((s) => s.id === id);
  const f = (id: string, k: string) => S(id)?.fields?.[k] ?? '';
  const cards = (S('cards')?.table ?? []).map((r) => ({ accent: r['Accent'], tag: r['Tag'], title: r['Title'], body: r['Body'] }));
  const partners = S('partners')?.bullets ?? [];
  const locations = S('locations')?.bullets ?? [];
  if (!S('hero') || cards.length < 3) return COPY[pick(locale)];
  return {
    eyebrow: f('hero', 'Eyebrow'), title: f('hero', 'Title'), sub: f('hero', 'Sub'),
    cardsTitle: f('hero', 'CardsTitle'), cards,
    teamTitle: f('hero', 'TeamTitle'), teamBody: f('hero', 'TeamBody'), teamNote: f('hero', 'TeamNote'),
    partnersTitle: f('hero', 'PartnersTitle'), partners,
    locationsTitle: f('hero', 'LocationsTitle'), locations,
    ctaTitle: f('hero', 'CtaTitle'), ctaPrimary: f('hero', 'CtaPrimary'), ctaSecondary: f('hero', 'CtaSecondary'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  assertVisible('about');
  const page = await getPage('about', locale);
  const t = page ? fromSections(page, locale) : COPY[pick(locale)];

  return (
    <div className="flex flex-col">
      {/* Hero — 全站统一影院式（满幅电磁射线场） */}
      <CinematicHero eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

      {/* 公司与团队（移到「底牌」之前） */}
      <section className="bg-brand-ink">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{t.teamTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-300">{t.teamBody}</p>
            <p className="mt-6 inline-block rounded-full border border-slate-300 px-4 py-1.5 text-sm text-slate-400">{t.teamNote}</p>
          </div>
        </div>
      </section>

      {/* 底牌 */}
      <section className="bg-brand-ink-2">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="mb-10 text-2xl font-bold text-white md:text-3xl">{t.cardsTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.cards.map((c) => (
              <div key={c.tag} className="flex flex-col rounded-2xl border border-white/10 bg-brand-surface p-7">
                <span className={`text-xs font-semibold uppercase tracking-widest ${ACCENT[c.accent]}`}>{c.tag}</span>
                <h3 className="mt-2 text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客户与合作伙伴 + 据点 */}
      <section className="bg-brand-ink">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-xl font-bold text-white">{t.partnersTitle}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.partners.map((p) => (
                  <span key={p} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200">{p}</span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{t.locationsTitle}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {t.locations.map((l) => (
                  <li key={l} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-cyan" aria-hidden />
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{t.ctaTitle}</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${locale}/contact`} className="rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110">{t.ctaPrimary}</Link>
            <Link href={`/${locale}/products`} className="rounded-lg border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10">{t.ctaSecondary}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
