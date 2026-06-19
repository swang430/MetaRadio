import Link from 'next/link';
import { HeroFieldBg } from '@/components/illustrations/HeroFieldBg';
import { getPage, type Page } from '../../../../lib/api';

// 共性技术 / Foundations —— 设计纲要 §3.2 的"轴心页"。四项共性能力显性化，
// 说明它们同时支撑数字世界（Lauraycs/MetaRadio）与物理世界（Liquid RF）。
// 文案由 Strapi page（seed-data/pages/foundations.md）提供，内容源不可达时降级到内联 COPY。
export const dynamic = 'force-dynamic';

type Locale = 'zh-CN' | 'en';
const pick = (l: string): Locale => (l === 'en' ? 'en' : 'zh-CN');

const COPY = {
  'zh-CN': {
    eyebrow: '共性技术 · Foundations',
    title: '一份电磁，两端基础设施',
    sub: '为什么乾径是一家公司，而不是两家——四项共性能力，同时支撑数字世界的 Lauraycs/MetaRadio 与物理世界的 Liquid RF。',
    dualBadge: '同时支撑 Lauraycs / MetaRadio 与 Liquid RF',
    capabilities: [
      {
        n: '01',
        title: '电磁世界观',
        lede: '从 Maxwell 方程到工程级射线追踪——把不可见的电磁波，变成可知、可测、可预测的工程对象。',
        points: ['确定性射线跟踪 SBR / Image / UTD', '600 MHz – 325 GHz 单引擎', '3GPP TR 38.901 一致性可证'],
      },
      {
        n: '02',
        title: 'GPU 加速计算栈',
        lede: '把电磁计算搬上 GPU——零拷贝显存、单引擎覆盖至 325 GHz，让仿真与终端运行时共享同一套加速底座。',
        points: ['GPU CUDA / OptiX 加速', '零拷贝显存级协同', '典型 10–100× CPU 提速'],
      },
      {
        n: '03',
        title: 'AI-Native 方法论',
        lede: '把 PHY / MAC 写成可训练模型——OTA 演进、灰度发布、安全回滚，让通信像软件一样持续迭代。',
        points: ['可训练 PHY / MAC', 'OTA 演进与版本管理', '灰度发布 + 安全回滚'],
      },
      {
        n: '04',
        title: '数据飞轮',
        lede: '公开数据集 + 公开训练管线 + 公开评测基准——仿真生成、终端实跑、反哺孪生，越转越逼近现实。',
        points: ['开放数据集', '可复现训练管线', '统一评测基准'],
      },
    ],
    ctaTitle: '把这套底座，用到你的下一代终端上',
    ctaPrimary: '探索产品与方案',
    ctaSecondary: '预约研发咨询',
  },
  en: {
    eyebrow: 'Foundations',
    title: 'One EM reality, two infrastructures',
    sub: 'Why MetaRadio is one company, not two — four shared capabilities that power both the digital world (Lauraycs/MetaRadio) and the physical world (Liquid RF).',
    dualBadge: 'Powers both Lauraycs / MetaRadio and Liquid RF',
    capabilities: [
      {
        n: '01',
        title: 'Electromagnetic Worldview',
        lede: 'From Maxwell’s equations to engineering-grade ray tracing — turning invisible waves into knowable, measurable, predictable engineering objects.',
        points: ['Deterministic ray tracing SBR / Image / UTD', '600 MHz – 325 GHz single engine', 'Provable 3GPP TR 38.901 consistency'],
      },
      {
        n: '02',
        title: 'GPU-Accelerated Stack',
        lede: 'Bringing EM computation onto the GPU — zero-copy VRAM, a single engine to 325 GHz, so simulation and the terminal runtime share one accelerated base.',
        points: ['GPU CUDA / OptiX acceleration', 'Zero-copy VRAM-level synergy', 'Typically 10–100× over CPU'],
      },
      {
        n: '03',
        title: 'AI-Native Methodology',
        lede: 'Writing PHY / MAC as trainable models — OTA evolution, staged rollout, safe rollback — so communication iterates like software.',
        points: ['Trainable PHY / MAC', 'OTA evolution & versioning', 'Staged rollout + safe rollback'],
      },
      {
        n: '04',
        title: 'The Data Flywheel',
        lede: 'Open datasets + open training pipelines + open benchmarks — simulate, run on terminals, feed back the twin; each turn closer to reality.',
        points: ['Open datasets', 'Reproducible training pipelines', 'Unified benchmarks'],
      },
    ],
    ctaTitle: 'Put this foundation to work in your next-generation terminal',
    ctaPrimary: 'Explore products & solutions',
    ctaSecondary: 'Book an R&D consult',
  },
};

/** Strapi page 分节 → COPY 形状；缺关键分节则回退内联 COPY。 */
function fromSections(page: Page, locale: string): typeof COPY['zh-CN'] {
  const secs = page.body?.sections ?? [];
  const S = (id: string) => secs.find((s) => s.id === id);
  const f = (id: string, k: string) => S(id)?.fields?.[k] ?? '';
  const caps = ['capability-1', 'capability-2', 'capability-3', 'capability-4']
    .map((id) => S(id))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))
    .map((s) => ({ n: s.fields['N'], title: s.fields['Title'], lede: s.fields['Lede'], points: s.bullets }));
  if (!S('hero') || caps.length < 4) return COPY[pick(locale)];
  return {
    eyebrow: f('hero', 'Eyebrow'), title: f('hero', 'Title'), sub: f('hero', 'Sub'),
    dualBadge: f('hero', 'DualBadge'), capabilities: caps,
    ctaTitle: f('hero', 'CtaTitle'), ctaPrimary: f('hero', 'CtaPrimary'), ctaSecondary: f('hero', 'CtaSecondary'),
  };
}

export default async function FoundationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const page = await getPage('foundations', locale);
  const t = page ? fromSections(page, locale) : COPY[pick(locale)];

  return (
    <div className="flex flex-col">
      {/* Hero（满幅影院射线场，与全站统一） */}
      <section className="relative isolate flex min-h-[62vh] items-center overflow-hidden text-white" style={{ backgroundColor: '#060B1A' }}>
        <HeroFieldBg className="absolute inset-0 h-full w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{ background: 'linear-gradient(90deg, rgba(6,11,26,0.92) 0%, rgba(6,11,26,0.55) 42%, rgba(6,11,26,0) 78%)' }}
        />
        <div className="container relative z-10 mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan">{t.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl" style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}>{t.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">{t.sub}</p>
          </div>
        </div>
      </section>

      {/* 四项共性能力 */}
      {t.capabilities.map((c, i) => (
        <section key={c.n} className={i % 2 ? 'bg-brand-ink-2' : 'bg-brand-ink'}>
          <div className="container mx-auto px-6 py-16 md:py-20">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
              <div className="text-5xl font-bold text-brand-cyan md:text-6xl">{c.n}</div>
              <div>
                <h2 className="text-2xl font-bold text-white md:text-3xl">{c.title}</h2>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{c.lede}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {c.points.map((p) => (
                    <span key={p} className="rounded-lg border border-white/10 bg-brand-surface px-4 py-2 text-sm font-medium text-slate-200">
                      {p}
                    </span>
                  ))}
                </div>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-emerald/10 px-4 py-1.5 text-sm font-medium text-brand-emerald">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-emerald" aria-hidden />
                  {t.dualBadge}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="bg-brand-navy text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{t.ctaTitle}</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${locale}/products`} className="rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110">
              {t.ctaPrimary}
            </Link>
            <Link href={`/${locale}/contact`} className="rounded-lg border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10">
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
