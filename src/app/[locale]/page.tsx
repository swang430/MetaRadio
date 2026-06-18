import Link from 'next/link';
import Image from 'next/image';
import { getPage, type Page } from '../../../lib/api';

// 首页五屏叙事（设计纲要 §3.1）：Hero（首句方案 C）→ 双重基础设施 → 数据飞轮 →
// 客户与场景 → 进入路径。回扣 §0 立意「一份电磁，两端基础设施」，面向投资人 + 大客户。
// 文案由 Strapi page 内容类型提供（seed-data/pages/home.md 导入，后台可编辑、中英同步），
// 内容源不可达时降级到内联 COPY 兜底；版式 / 链接 / 视觉逻辑留在本组件。
export const dynamic = 'force-dynamic';

type Locale = 'zh-CN' | 'en';
const pick = (l: string): Locale => (l === 'en' ? 'en' : 'zh-CN');

const COPY = {
  'zh-CN': {
    hero: {
      eyebrow: '乾径科技 MetaRadio · AI-Native Wireless',
      title: 'AI-Native 无线，',
      titleEm: '从这里开始',
      sub: '在数字世界用电磁孪生做研发底座，在物理世界用神经网络软基带做终端底座。一份电磁，两端基础设施。',
      ctaPrimary: '浏览产品与方案',
      ctaSecondary: '预约研发咨询',
      pillars: [
        { k: 'L1–L3', v: '共性技术 · 仿真到孪生' },
        { k: 'V1–V6', v: '行业方案 · 六类高算力终端' },
        { k: 'Liquid RF', v: 'AI-Native 终端运行时' },
      ],
    },
    dual: {
      eyebrow: '双重基础设施 · Dual Infrastructure',
      title: '一份电磁，两端基础设施',
      sub: '同一套 GPU 加速电磁计算栈，贯穿从研发到终端的两端。',
      digital: {
        tag: '数字世界',
        name: 'Lauraycs / MetaRadio',
        desc: '电磁孪生研发底座：确定性射线跟踪、虚拟路测与硬件在环、电磁孪生（L1–L3）。',
        cta: '查看共性技术 →',
        href: 'datasheets',
      },
      physical: {
        tag: '物理世界',
        name: 'Liquid RF',
        desc: '神经网络软基带终端底座：让通信从独立模组走向系统能力（AI-Native 通信）。',
        cta: '了解 Liquid RF →',
        href: 'datasheets/liquid-rf',
      },
      bridge: ['GPU 加速电磁计算栈', 'AI-Native 方法论', '电磁孪生数据'],
    },
    flywheel: {
      eyebrow: '数据飞轮 · The Data Flywheel',
      title: '同一个飞轮的两半',
      sub: '这不是两条产品线的并行，而是同一个飞轮的两半——每一圈都让仿真更逼近现实。',
      steps: ['仿真生成信道', '训练软基带', '终端实跑数据', '反哺电磁孪生', '更逼近现实的信道'],
    },
    scenarios: {
      eyebrow: '客户与场景 · Customers & Scenarios',
      title: '六类高算力终端，一份电磁底座',
      sub: '无线链路直接决定业务结果的地方，正是价值最先释放的地方。',
      items: [
        { icon: '🚗', name: '自动驾驶 · V2X', line: '城市峡谷、隧道、立交的车路云通信验证。', slug: 'v4-autonomous-driving' },
        { icon: '🤖', name: '机器人与智能工厂', line: '产线级电磁孪生，保障 AGV/协作机器人可靠通信。', slug: 'v5-robotics' },
        { icon: '🛩', name: '低空经济', line: '城市楼宇间的低空信道与 C2 链路连续性。', slug: 'v1-low-altitude' },
        { icon: '🛰', name: '卫星 NTN', line: '星地一体覆盖与终端链路保障。', slug: 'v2-satellite-ntn' },
        { icon: '📡', name: '通感一体 ISAC', line: '同一束电磁波，同时服务通信与感知。', slug: 'v3-isac' },
        { icon: '🌐', name: '6G 前沿研究', line: 'sub-THz、ISAC、智能超表面的可验证底座。', slug: 'v6-6g' },
      ],
    },
    ladder: {
      eyebrow: '进入路径 · How to Engage',
      title: '从试用到共建，三级阶梯',
      sub: '无论你是评估方向的投资人，还是要落地的研发负责人，都有清晰的下一步。',
      steps: [
        { step: '01', name: '试用', meta: '30 分钟 · 免费', desc: '在线体验产品与信道演示，快速判断是否契合你的场景。' },
        { step: '02', name: '评估', meta: '一周 · 研发验证 Sprint', desc: '用你的真实场景跑通一次端到端验证，拿到可量化的结果。' },
        { step: '03', name: '共建', meta: '一年 · 标准服务包 / 联合实验室', desc: '从研发服务到平台许可，深度共建下一代终端的电磁与通信底座。' },
      ],
      cta: '预约咨询',
    },
  },
  en: {
    hero: {
      eyebrow: 'MetaRadio · AI-Native Wireless',
      title: 'AI-Native Wireless',
      titleEm: 'Starts Here',
      sub: 'In the digital world, an EM twin as the R&D foundation; in the physical world, a neural-network soft baseband as the terminal foundation. One electromagnetic reality, two infrastructures.',
      ctaPrimary: 'Explore products & solutions',
      ctaSecondary: 'Book an R&D consult',
      pillars: [
        { k: 'L1–L3', v: 'Foundations · simulation to twin' },
        { k: 'V1–V6', v: 'Verticals · six terminal classes' },
        { k: 'Liquid RF', v: 'AI-Native terminal runtime' },
      ],
    },
    dual: {
      eyebrow: 'Dual Infrastructure',
      title: 'One EM reality, two infrastructures',
      sub: 'One GPU-accelerated electromagnetic compute stack spanning both ends — from R&D to terminal.',
      digital: {
        tag: 'Digital world',
        name: 'Lauraycs / MetaRadio',
        desc: 'The EM-twin R&D foundation: deterministic ray tracing, virtual drive test & HIL, EM twin (L1–L3).',
        cta: 'View foundations →',
        href: 'datasheets',
      },
      physical: {
        tag: 'Physical world',
        name: 'Liquid RF',
        desc: 'The neural-network soft-baseband terminal foundation: communication moves from module to system capability.',
        cta: 'Explore Liquid RF →',
        href: 'datasheets/liquid-rf',
      },
      bridge: ['GPU-accelerated EM compute stack', 'AI-Native methodology', 'EM-twin data'],
    },
    flywheel: {
      eyebrow: 'The Data Flywheel',
      title: 'Two halves of one flywheel',
      sub: 'Not two parallel product lines, but two halves of one flywheel — each turn brings simulation closer to reality.',
      steps: ['Simulate channels', 'Train soft baseband', 'Run on terminals', 'Feed back the twin', 'Channels closer to reality'],
    },
    scenarios: {
      eyebrow: 'Customers & Scenarios',
      title: 'Six high-compute terminal classes, one EM foundation',
      sub: 'Value is released first where the wireless link directly determines the business outcome.',
      items: [
        { icon: '🚗', name: 'Autonomous Driving · V2X', line: 'Validate vehicle-road-cloud comms in canyons, tunnels and overpasses.', slug: 'v4-autonomous-driving' },
        { icon: '🤖', name: 'Robotics & Smart Factory', line: 'Production-line EM twin for reliable AGV/cobot communication.', slug: 'v5-robotics' },
        { icon: '🛩', name: 'Low-Altitude Economy', line: 'Low-altitude channels between buildings and C2-link continuity.', slug: 'v1-low-altitude' },
        { icon: '🛰', name: 'Satellite NTN', line: 'Space-ground coverage and terminal link assurance.', slug: 'v2-satellite-ntn' },
        { icon: '📡', name: 'ISAC', line: 'One beam of waves serving communication and sensing at once.', slug: 'v3-isac' },
        { icon: '🌐', name: '6G Research', line: 'A verifiable base for sub-THz, ISAC and RIS.', slug: 'v6-6g' },
      ],
    },
    ladder: {
      eyebrow: 'How to Engage',
      title: 'From trial to co-build, a three-step ladder',
      sub: 'Whether you are an investor assessing the direction or an R&D lead ready to deploy, there is a clear next step.',
      steps: [
        { step: '01', name: 'Trial', meta: '30 min · free', desc: 'Try the products and channel demos online to judge fit fast.' },
        { step: '02', name: 'Evaluate', meta: 'One week · validation Sprint', desc: 'Run one end-to-end validation on your real scenario, with quantified results.' },
        { step: '03', name: 'Co-build', meta: 'One year · service packages / joint lab', desc: 'From R&D services to platform licensing — co-build the EM and communication base of next-gen terminals.' },
      ],
      cta: 'Book a consult',
    },
  },
};

/** 把 Strapi page 的分节映射回 COPY 形状；任一关键分节缺失则整体回退到内联 COPY。 */
function fromSections(page: Page, locale: string): typeof COPY['zh-CN'] {
  const secs = page.body?.sections ?? [];
  const S = (id: string) => secs.find((s) => s.id === id);
  const f = (id: string, k: string) => S(id)?.fields?.[k] ?? '';
  const table = (id: string) => S(id)?.table ?? [];
  const bullets = (id: string) => S(id)?.bullets ?? [];
  if (!S('hero') || !S('dual') || !S('flywheel') || !S('scenarios') || !S('ladder')) return COPY[pick(locale)];
  return {
    hero: {
      eyebrow: f('hero', 'Eyebrow'), title: f('hero', 'Title'), titleEm: f('hero', 'TitleEm'),
      sub: f('hero', 'Sub'), ctaPrimary: f('hero', 'CtaPrimary'), ctaSecondary: f('hero', 'CtaSecondary'),
      pillars: table('pillars').map((r) => ({ k: r.Key, v: r.Value })),
    },
    dual: {
      eyebrow: f('dual', 'Eyebrow'), title: f('dual', 'Title'), sub: f('dual', 'Sub'),
      digital: { tag: f('digital', 'Tag'), name: f('digital', 'Name'), desc: f('digital', 'Desc'), cta: f('digital', 'Cta'), href: f('digital', 'Href') },
      physical: { tag: f('physical', 'Tag'), name: f('physical', 'Name'), desc: f('physical', 'Desc'), cta: f('physical', 'Cta'), href: f('physical', 'Href') },
      bridge: bullets('bridge'),
    },
    flywheel: {
      eyebrow: f('flywheel', 'Eyebrow'), title: f('flywheel', 'Title'), sub: f('flywheel', 'Sub'),
      steps: bullets('flywheel-steps'),
    },
    scenarios: {
      eyebrow: f('scenarios', 'Eyebrow'), title: f('scenarios', 'Title'), sub: f('scenarios', 'Sub'),
      items: table('items').map((r) => ({ icon: r.Icon, name: r.Name, line: r.Line, slug: r.Slug })),
    },
    ladder: {
      eyebrow: f('ladder', 'Eyebrow'), title: f('ladder', 'Title'), sub: f('ladder', 'Sub'),
      steps: table('ladder-steps').map((r) => ({ step: r.Step, name: r.Name, meta: r.Meta, desc: r.Desc })),
      cta: f('ladder', 'Cta'),
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getPage('home', locale);
  const t = page ? fromSections(page, locale) : COPY[pick(locale)];

  return (
    <div className="flex flex-col">
      {/* 第一屏 · Hero */}
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(1000px 600px at 80% -10%, rgba(0,209,255,0.22), transparent 60%), radial-gradient(700px 500px at 0% 110%, rgba(16,185,129,0.14), transparent 60%)' }}
          aria-hidden
        />
        <div className="container relative mx-auto px-6 py-20 md:py-28">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
          <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan">{t.hero.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            {t.hero.title}
            <span className="block text-brand-cyan">{t.hero.titleEm}</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{t.hero.sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={`/${locale}/datasheets`} className="rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110">
              {t.hero.ctaPrimary}
            </Link>
            <Link href={`/${locale}/contact`} className="rounded-lg border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10">
              {t.hero.ctaSecondary}
            </Link>
          </div>
            </div>
            <div className="relative">
              <Image
                src="/images/hero-emtwin.jpg"
                alt="EM-twin 验证：射线追踪波束 · RSRP 覆盖热图 · 路测 · 仿真-实测对比"
                width={2556}
                height={1438}
                priority
                className="h-auto w-full rounded-2xl border border-white/10 shadow-2xl"
              />
            </div>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-xl sm:grid-cols-3" style={{ background: 'rgba(255,255,255,0.12)' }}>
            {t.hero.pillars.map((p) => (
              <div key={p.k} className="bg-brand-navy px-6 py-6">
                <div className="text-xl font-bold text-brand-cyan">{p.k}</div>
                <div className="mt-1 text-sm text-slate-300">{p.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 第二屏 · 双重基础设施 */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">{t.dual.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-navy md:text-4xl">{t.dual.title}</h2>
            <p className="mt-4 text-slate-600">{t.dual.sub}</p>
          </header>
          {/* 双重基础设施主图（设计 §3.1 第二屏）—— 静态品牌视觉，来自 MWC 物料「产品战略图」。 */}
          <div className="mx-auto mb-12 max-w-5xl overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <Image
              src="/images/dual-infrastructure.png"
              alt="MetaRadio + Lauraycs 双引擎产品体系：终端连接底座与无线世界模型训练平台"
              width={2016}
              height={926}
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
            <Link href={`/${locale}/${t.dual.digital.href}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-8 transition hover:border-brand-cyan hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">{t.dual.digital.tag}</span>
              <span className="mt-2 text-2xl font-bold text-brand-navy">{t.dual.digital.name}</span>
              <span className="mt-3 flex-grow text-sm leading-relaxed text-slate-600">{t.dual.digital.desc}</span>
              <span className="mt-5 text-sm font-medium text-brand-cyan">{t.dual.digital.cta}</span>
            </Link>
            <div className="flex flex-col items-center justify-center gap-3 py-2 lg:px-2">
              {t.dual.bridge.map((b) => (
                <span key={b} className="rounded-full border border-brand-navy/15 bg-white px-4 py-2 text-center text-xs font-medium text-brand-navy">{b}</span>
              ))}
            </div>
            <Link href={`/${locale}/${t.dual.physical.href}`} className="group flex flex-col rounded-2xl border border-slate-200 bg-brand-navy p-8 text-white transition hover:shadow-md">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">{t.dual.physical.tag}</span>
              <span className="mt-2 text-2xl font-bold">{t.dual.physical.name}</span>
              <span className="mt-3 flex-grow text-sm leading-relaxed text-slate-300">{t.dual.physical.desc}</span>
              <span className="mt-5 text-sm font-medium text-brand-cyan">{t.dual.physical.cta}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 第三屏 · 数据飞轮 */}
      <section className="bg-slate-50">
        <div className="container mx-auto px-6 py-20">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">{t.flywheel.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-navy md:text-4xl">{t.flywheel.title}</h2>
            <p className="mt-4 text-slate-600">{t.flywheel.sub}</p>
          </header>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {t.flywheel.steps.map((s, i) => (
              <div key={s} className="flex items-center gap-3">
                <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-center text-sm font-medium text-brand-navy shadow-sm">{s}</div>
                <span className="text-xl text-brand-cyan" aria-hidden>{i === t.flywheel.steps.length - 1 ? '↻' : '→'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 第四屏 · 客户与场景 */}
      <section className="bg-white">
        <div className="container mx-auto px-6 py-20">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">{t.scenarios.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold text-brand-navy md:text-4xl">{t.scenarios.title}</h2>
            <p className="mt-4 text-slate-600">{t.scenarios.sub}</p>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {t.scenarios.items.map((it) => (
              <Link key={it.slug} href={`/${locale}/datasheets/${it.slug}`} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-cyan hover:shadow-md">
                <div className="mb-3 text-3xl">{it.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-brand-navy group-hover:text-brand-cyan">{it.name}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{it.line}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 第五屏 · 进入路径 */}
      <section className="bg-brand-navy text-white">
        <div className="container mx-auto px-6 py-20">
          <header className="mx-auto mb-12 max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan">{t.ladder.eyebrow}</p>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">{t.ladder.title}</h2>
            <p className="mt-4 text-slate-300">{t.ladder.sub}</p>
          </header>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.ladder.steps.map((s) => (
              <div key={s.step} className="rounded-2xl border border-white/15 bg-white/5 p-7">
                <div className="text-3xl font-bold text-brand-cyan">{s.step}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm font-medium text-brand-emerald">{s.meta}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={`/${locale}/contact`} className="inline-block rounded-lg bg-brand-cyan px-8 py-3 font-semibold text-brand-navy transition hover:brightness-110">
              {t.ladder.cta}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
