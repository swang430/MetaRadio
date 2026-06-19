import { getDatasheets } from '../../../../lib/api';
import { DatasheetListing } from '@/components/datasheet/DatasheetListing';
import { ProductsHeroArt } from '@/components/illustrations/HeroArt';

// 内容由 Strapi 实时提供（支持后端随时编辑），不在构建期冻结。
export const dynamic = 'force-dynamic';

// 产品 = 横向共性技术平台（L1-L3, horizontal）+ AI-Native 通信（Liquid RF, ai-comms）。
const COPY = {
  'zh-CN': {
    eyebrow: '产品',
    title: '电磁孪生研发底座 + AI-Native 通信',
    sub: '以确定性射线跟踪为底座的共性技术平台（L1-L3），与面向高算力终端的下一代 AI-Native 通信（Liquid RF）——可被所有行业解决方案复用的底层能力。',
    horizontal: '共性技术平台',
    horizontalSub: 'L1-L3 · 可被所有行业方案复用的底层能力',
    aiComms: 'AI-Native 通信',
    aiCommsSub: 'Liquid RF · 面向高算力终端的下一代通信',
  },
  en: {
    eyebrow: 'Products',
    title: 'EM-twin R&D foundation + AI-Native communication',
    sub: 'The deterministic ray-tracing foundations (L1-L3) and next-generation AI-Native communication for high-compute terminals (Liquid RF) — core capabilities reused across every industry solution.',
    horizontal: 'Foundational Platforms',
    horizontalSub: 'L1-L3 · core capabilities reused across every vertical',
    aiComms: 'AI-Native Communication',
    aiCommsSub: 'Liquid RF · next-generation communication for high-compute terminals',
  },
} as const;

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = COPY[locale === 'en' ? 'en' : 'zh-CN'];
  const datasheets = await getDatasheets(locale);
  const horizontal = datasheets.filter((d) => d.category === 'horizontal');
  const aiComms = datasheets.filter((d) => d.category === 'ai-comms');

  return (
    <DatasheetListing
      locale={locale}
      eyebrow={t.eyebrow}
      title={t.title}
      sub={t.sub}
      media={<ProductsHeroArt locale={locale} />}
      groups={[
        { heading: t.horizontal, sub: t.horizontalSub, list: horizontal },
        { heading: t.aiComms, sub: t.aiCommsSub, list: aiComms },
      ]}
    />
  );
}
