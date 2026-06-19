import ToolsClient from '@/components/tools/ToolsClient';
import { ToolsHeroArt } from '@/components/illustrations/HeroArt';

const COPY = {
  'zh-CN': { eyebrow: '交互工具 · Tools', title: '带走一个真东西，而不只是一句宣传', sub: '四个轻量工具：估算研发节约、预估软基带性能、对照你的研发流程、生成可用的场景模板。' },
  en: { eyebrow: 'Interactive Tools', title: 'Take away something real, not just a tagline', sub: 'Four lightweight tools: estimate R&D savings, gauge soft-baseband performance, match your R&D flow, and generate a usable scenario template.' },
} as const;

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = COPY[locale === 'en' ? 'en' : 'zh-CN'];

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: 'radial-gradient(900px 500px at 80% -10%, rgba(0,209,255,0.2), transparent 60%)' }} aria-hidden />
        <div className="container relative mx-auto px-6 py-20 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-brand-cyan">{t.eyebrow}</p>
              <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{t.title}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{t.sub}</p>
            </div>
            <div className="relative">
              <ToolsHeroArt locale={locale} />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-brand-ink-2">
        <div className="container mx-auto px-6 py-16">
          <ToolsClient locale={locale} />
        </div>
      </section>
    </div>
  );
}
