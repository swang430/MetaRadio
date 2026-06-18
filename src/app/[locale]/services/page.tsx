import Link from 'next/link';
import { getPage, type Page } from '../../../../lib/api';

export const dynamic = 'force-dynamic';

// 研发服务 / R&D Services — 设计纲要 §3.3：把战略文档的"五类标准服务包"产品化。
// 文案由 Strapi page（seed-data/pages/services.md）提供，内容源不可达时降级到内联 COPY。
// 每个服务包：一句话价值（减少几轮样机/外场返工）+ 客户画像 + 交付物 + 周期/报价区间 + 典型场景。
// 单设 Customization & Co-development 栏，把定制正面定位为"年度框架的最高形态"。纯静态、中英双语。

type Locale = 'zh-CN' | 'en';
const pick = (l: string): Locale => (l === 'en' ? 'en' : 'zh-CN');

const COPY = {
  'zh-CN': {
    eyebrow: '研发服务 · R&D Services',
    title: '从评估到共建，五类标准服务包',
    sub: '我们卖的不是工时，而是"少走几轮样机、少跑几次外场"。以电磁孪生 + AI-Native 方法论为杠杆，把研发服务做成可复利的基础设施。',
    priceNote: '周期为典型值，报价为指示性区间，最终以具体方案为准。',
    packages: [
      {
        tier: '01', name: '设计前评估包',
        value: '在画第一版 PCB 之前，先用电磁孪生看清覆盖与链路风险，省下一轮样机。',
        persona: '消费电子 / 任务型移动终端的早期选型阶段',
        deliverables: ['场景电磁孪生', '覆盖 / 链路风险报告', '天线与频段选型建议'],
        cadence: '1–2 周', price: '指示性 ¥3–8 万',
        story: '典型场景：移动终端在选型期发现关键频段的覆盖盲区，提前调整天线布局，避免量产后返工。',
      },
      {
        tier: '02', name: '研发验证 Sprint',
        value: '用你的真实场景跑通一次端到端验证，拿到可量化、可复现的结果。',
        persona: '已有方向、需要快速验证的研发团队',
        deliverables: ['场景模板', '失效模式定位', '自动化验证报告', '私有知识库沉淀'],
        cadence: '约 1 周', price: '指示性 ¥1–3 万',
        story: '典型场景：车载链路在隧道与立交场景下偶发掉线，一周内定位到多径遮挡根因并给出改进项。',
      },
      {
        tier: '03', name: '全流程预验证',
        value: '从信道建模到硬件在环，把外场难复现的问题在实验室稳定重放、回归。',
        persona: '进入工程化、需要可重复回归的项目',
        deliverables: ['HIL 测试台搭建', '回归用例库', '多场景覆盖矩阵', '阶段性验证报告'],
        cadence: '4–8 周', price: '指示性 ¥10–30 万',
        story: '典型场景：把一次性的外场异常固化成实验室可重放用例，每次固件迭代自动回归。',
      },
      {
        tier: '04', name: '年度框架服务',
        value: '把研发服务变成持续供给：场景模板、失效模式库与数据资产逐年复利。',
        persona: '有持续研发节奏的中大型客户',
        deliverables: ['年度服务额度', '专属场景模板库', '失效模式私有库', '季度方法学评审'],
        cadence: '一年', price: '年度框架 · 详询',
        story: '典型场景：客户把多条产品线的电磁孪生与验证统一到一个年度框架下，边际成本逐季下降。',
      },
      {
        tier: '05', name: '联合实验室共建',
        value: '基础设施级研发合作——共建电磁孪生平台与场景化软基带，沉淀为你的长期资产。',
        persona: '头部客户 / 战略级合作',
        deliverables: ['定制电磁孪生平台', '场景化软基带', '联合团队与流程', '可复用资产库'],
        cadence: '长期', price: '战略合作 · 详询',
        story: '典型场景：与头部客户共建联合实验室，把研发能力内化为客户自身的平台。',
      },
    ],
    custom: {
      eyebrow: 'Customization & Co-development',
      title: '定制，不是外包，而是年度框架的最高形态',
      body: '我们与头部客户共建联合实验室、定制电磁孪生平台与场景化软基带。这是基础设施级的研发合作——标准化服务包做骨架、平台与自研硬件做杠杆、模板与数据资产做复利。每一个共建项目，都会沉淀为下一个客户的起跑线。',
    },
    ctaTitle: '从一次 30 分钟的研发咨询开始',
    ctaPrimary: '预约研发咨询',
    ctaSecondary: '浏览产品与方案',
  },
  en: {
    eyebrow: 'R&D Services',
    title: 'From assessment to co-build — five standard service packages',
    sub: 'We don’t sell hours; we sell "fewer prototype rounds and fewer field trips." With the EM twin and AI-Native methodology as leverage, R&D services become compounding infrastructure.',
    priceNote: 'Durations are typical; prices are indicative ranges — final pricing depends on the specific plan.',
    packages: [
      {
        tier: '01', name: 'Pre-Design Assessment',
        value: 'Before the first PCB, see coverage and link risk on an EM twin — and save a prototype round.',
        persona: 'Consumer electronics / mission-mobile terminals at early selection',
        deliverables: ['Scene EM twin', 'Coverage / link risk report', 'Antenna & band selection advice'],
        cadence: '1–2 weeks', price: 'Indicative ¥30–80k',
        story: 'Representative: a terminal finds a coverage blind spot in a key band during selection and adjusts the antenna layout before mass production.',
      },
      {
        tier: '02', name: 'R&D Validation Sprint',
        value: 'Run one end-to-end validation on your real scenario — quantified and reproducible.',
        persona: 'R&D teams with a direction that needs fast validation',
        deliverables: ['Scenario template', 'Failure-mode localization', 'Automated validation report', 'Private knowledge base'],
        cadence: '~1 week', price: 'Indicative ¥10–30k',
        story: 'Representative: intermittent drops in tunnels/overpasses are root-caused to multipath blockage within a week, with fixes proposed.',
      },
      {
        tier: '03', name: 'Full-Flow Pre-Validation',
        value: 'From channel modeling to hardware-in-the-loop — replay and regress hard-to-reproduce field issues in the lab.',
        persona: 'Projects in engineering that need repeatable regression',
        deliverables: ['HIL test bench', 'Regression case library', 'Multi-scenario coverage matrix', 'Phased validation reports'],
        cadence: '4–8 weeks', price: 'Indicative ¥100–300k',
        story: 'Representative: a one-off field anomaly is hardened into a replayable lab case that auto-regresses on every firmware iteration.',
      },
      {
        tier: '04', name: 'Annual Framework',
        value: 'Turn R&D services into continuous supply — scenario templates, failure-mode libraries and data assets compound year over year.',
        persona: 'Mid-to-large customers with continuous R&D cadence',
        deliverables: ['Annual service quota', 'Dedicated template library', 'Private failure-mode library', 'Quarterly methodology reviews'],
        cadence: 'One year', price: 'Annual framework · inquire',
        story: 'Representative: a customer unifies EM-twin and validation across product lines under one annual framework; marginal cost falls each quarter.',
      },
      {
        tier: '05', name: 'Joint Lab Co-build',
        value: 'Infrastructure-grade R&D partnership — co-build an EM-twin platform and scenario-specific soft baseband as your long-term asset.',
        persona: 'Leading customers / strategic partnerships',
        deliverables: ['Custom EM-twin platform', 'Scenario-specific soft baseband', 'Joint team & process', 'Reusable asset library'],
        cadence: 'Long-term', price: 'Strategic · inquire',
        story: 'Representative: a joint lab with a leading customer internalizes R&D capability into the customer’s own platform.',
      },
    ],
    custom: {
      eyebrow: 'Customization & Co-development',
      title: 'Customization is not outsourcing — it is the highest form of the annual framework',
      body: 'We co-build joint labs, custom EM-twin platforms and scenario-specific soft basebands with leading customers. This is infrastructure-grade R&D partnership — standardized packages as the skeleton, platform and in-house hardware as leverage, templates and data assets as compounding interest. Every co-build becomes the starting line for the next customer.',
    },
    ctaTitle: 'Start with a 30-minute R&D consult',
    ctaPrimary: 'Book an R&D consult',
    ctaSecondary: 'Explore products & solutions',
  },
};

/** Strapi page 分节 → COPY 形状；缺关键分节则回退内联 COPY。 */
function fromSections(page: Page, locale: string): typeof COPY['zh-CN'] {
  const secs = page.body?.sections ?? [];
  const S = (id: string) => secs.find((s) => s.id === id);
  const f = (id: string, k: string) => S(id)?.fields?.[k] ?? '';
  const pkgs = ['package-1', 'package-2', 'package-3', 'package-4', 'package-5']
    .map((id) => S(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({
      tier: s.fields['Tier'], name: s.fields['Name'], value: s.fields['Value'], persona: s.fields['Persona'],
      deliverables: s.bullets, cadence: s.fields['Cadence'], price: s.fields['Price'], story: s.fields['Story'],
    }));
  if (!S('hero') || pkgs.length < 5 || !S('custom')) return COPY[pick(locale)];
  return {
    eyebrow: f('hero', 'Eyebrow'), title: f('hero', 'Title'), sub: f('hero', 'Sub'), priceNote: f('hero', 'PriceNote'),
    packages: pkgs,
    custom: { eyebrow: f('custom', 'Eyebrow'), title: f('custom', 'Title'), body: f('custom', 'Body') },
    ctaTitle: f('hero', 'CtaTitle'), ctaPrimary: f('hero', 'CtaPrimary'), ctaSecondary: f('hero', 'CtaSecondary'),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getPage('services', locale);
  const t = page ? fromSections(page, locale) : COPY[pick(locale)];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: 'radial-gradient(900px 500px at 80% -10%, rgba(245,158,11,0.18), transparent 60%)' }} aria-hidden />
        <div className="container relative mx-auto px-6 py-20 md:py-28">
          <p className="text-sm font-medium uppercase tracking-widest text-brand-amber">{t.eyebrow}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{t.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{t.sub}</p>
        </div>
      </section>

      {/* 五类服务包 */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {t.packages.map((p) => (
              <div key={p.tier} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:shadow-md">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-brand-amber">{p.tier}</span>
                  <h2 className="text-xl font-bold text-brand-navy">{p.name}</h2>
                </div>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{p.value}</p>
                <p className="mt-4 text-sm text-slate-500"><span className="font-semibold text-brand-navy">适用 · </span>{p.persona}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.deliverables.map((d) => (
                    <span key={d} className="rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-brand-navy">{d}</span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                  <span className="text-slate-500">周期 / Cadence：<span className="font-semibold text-brand-navy">{p.cadence}</span></span>
                  <span className="text-slate-500">报价 / Price：<span className="font-semibold text-brand-emerald">{p.price}</span></span>
                </div>
                <p className="mt-4 border-l-2 border-brand-cyan/40 pl-3 text-sm italic leading-relaxed text-slate-500">{p.story}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-slate-400">{t.priceNote}</p>
        </div>
      </section>

      {/* Customization & Co-development */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl rounded-2xl border border-brand-amber/30 bg-white p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-amber">{t.custom.eyebrow}</p>
            <h2 className="mt-2 text-2xl font-bold text-brand-navy md:text-3xl">{t.custom.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600">{t.custom.body}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{t.ctaTitle}</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${locale}/contact`} className="rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110">{t.ctaPrimary}</Link>
            <Link href={`/${locale}/datasheets`} className="rounded-lg border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10">{t.ctaSecondary}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
