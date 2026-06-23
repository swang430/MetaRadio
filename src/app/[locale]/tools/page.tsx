import ToolsClient from '@/components/tools/ToolsClient';
import { CinematicHero } from '@/components/layout/CinematicHero';
import { assertVisible } from '../../../../lib/page-visibility';

const COPY = {
  'zh-CN': { eyebrow: '交互工具 · Tools', title: '带走一个真东西，而不只是一句宣传', sub: '四个轻量工具：估算研发节约、预估软基带性能、对照你的研发流程、生成可用的场景模板。' },
  en: { eyebrow: 'Interactive Tools', title: 'Take away something real, not just a tagline', sub: 'Four lightweight tools: estimate R&D savings, gauge soft-baseband performance, match your R&D flow, and generate a usable scenario template.' },
} as const;

export default async function ToolsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  assertVisible('tools');
  const t = COPY[locale === 'en' ? 'en' : 'zh-CN'];

  return (
    <div className="flex flex-col">
      <CinematicHero eyebrow={t.eyebrow} title={t.title} sub={t.sub} />
      <section className="bg-brand-ink-2">
        <div className="container mx-auto px-6 py-16">
          <ToolsClient locale={locale} />
        </div>
      </section>
    </div>
  );
}
