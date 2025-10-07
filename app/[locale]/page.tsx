import { BlocksRenderer } from '@/components/blocks/renderer';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';
import { Nav } from '@/components/nav';

export const revalidate = 60;

export default async function HomePage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  await getPageBySlug('landing', locale); // Keep for metadata needs

  const { blocks } = buildHomeContent(locale);

  return (
    <div className="relative min-h-screen bg-white text-slate-800">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={blocks} locale={locale} dictionary={dictionary} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('landing', locale);
  const seo = page?.attributes.seo;
  const fallbackDescription =
    locale === 'en'
      ? 'MetaRadio delivers ray-tracing driven channel insights, OTA validation, and virtual drive testing.'
      : 'MetaRadio 以射线跟踪法为核心，提供通信仿真、动态 OTA 与虚拟路测能力。';
  const title = seo?.metaTitle || dictionary.common.brandName;
  const description = seo?.metaDescription || fallbackDescription;
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical: '/',
      languages: Object.fromEntries(SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/' : `/${loc}`])),
    },
  };
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

function buildHomeContent(locale: Locale) {
  // English content
  if (locale === 'en') {
    return {
      blocks: [
        { __component: 'hero.hero', theme: 'dark', headline: 'See the electromagnetic world clearly', subhead: 'HyperRT · Digital Twin', summary: 'MetaRadio delivers physics-grounded ray tracing...', primaryAction: { name: 'Explore solutions', url: '/en/marketing/solutions' }, secondaryAction: { name: 'Book a demo', url: '/en/contact' } },
        { __component: 'sections.feature-grid', theme: 'light', title: 'Why is reliable prediction still so difficult?', intro: 'Moving vehicles, complex factories...', items: [ { icon: '🌐', title: 'Dynamic scenes', description: 'Vehicles, robots, and people...' }, { icon: '🏙️', title: 'Unique environments', description: 'Every factory floor and street canyon...' }, { icon: '🧪', title: 'Costly field tests', description: 'Drive tests cost weeks, budgets...' } ] },
        { __component: 'content.media-block', theme: 'dark', title: 'Build an electromagnetic digital twin', body: 'Our engine fuses precise 3D geometry...', media: { url: '/img/placeholder-solution.jpg', alt: '...' }, actions: [{ name: 'Meet HyperRT', url: '/en/marketing/products' }] },
        { __component: 'sections.tech-flow', theme: 'light', title: 'Integrated simulation engine architecture', intro: 'Five tightly coupled modules...', steps: [ { name: 'Scenario ingestion', desc: 'Import CAD, GIS, LiDAR...' }, { name: 'Geometry modelling', desc: 'Normalise meshes, assign materials...' }, { name: 'Electromagnetic solver', desc: 'Track reflection, diffraction...' }, { name: 'Simulation acceleration', desc: 'Leverage CPU and GPU...' }, { name: 'Channel output', desc: 'Deliver multi-path datasets...' } ] },
        { __component: 'sections.stat-group', theme: 'light', title: 'Global-leading advantages', description: 'HyperRT sets the benchmark...', metrics: [ { label: 'DEPLOYMENTS', value: '120+' }, { label: 'MEDIAN ERROR', value: '<=1.5 dB' }, { label: 'FREQUENCY RANGE', value: '0.1-325 GHz' } ] },
        { __component: 'sections.cta-banner', theme: 'dark', title: 'Start your precise prediction journey', description: 'Discover how physics-grounded ray tracing...', links: [ { name: 'Book a demo', url: 'mailto:sales@metaradio.tech?subject=MetaRadio%20Demo' }, { name: 'Explore solutions', url: '/en/marketing/solutions' } ] },
      ],
    };
  }
  // Chinese content
  return {
    blocks: [
        { __component: 'hero.hero', theme: 'dark', headline: '洞见电磁世界，精准预测未来连接', subhead: 'HyperRT · 数字孪生', summary: '乾径科技（HyperRT）以确定性射线跟踪为引擎...', primaryAction: { name: '探索应用领域', url: '/zh/marketing/solutions' }, secondaryAction: { name: '预约演示', url: '/zh/contact' } },
        { __component: 'sections.feature-grid', theme: 'light', title: '连接无处不在，为何预测依然困难？', intro: '从自动驾驶到智能工厂...', items: [ { icon: '📡', title: '场景的动态复杂性', description: '移动的车辆、机器人和人群...' }, { icon: '🏭', title: '环境的独特性', description: '每个工厂、每条街道的几何与材质都不同...' }, { icon: '🧪', title: '物理测试的局限', description: '真实路测成本高、周期长且难复现...' } ] },
        { __component: 'content.media-block', theme: 'dark', title: '我们的方案：构建电磁空间的数字孪生', body: 'HyperRT 将高精度三维几何...', media: { url: '/img/placeholder-solution.jpg', alt: '...' }, actions: [{ name: '了解 HyperRT 产品', url: '/zh/marketing/products' }] },
        { __component: 'sections.tech-flow', theme: 'light', title: '一体化仿真引擎架构', intro: '五大核心模块协同工作...', steps: [ { name: '仿真输入', desc: '导入 CAD、GIS、激光点云...' }, { name: '几何模型', desc: '统一网格、材质与边界条件...' }, { name: '电磁模型', desc: '确定性求解反射、绕射...' }, { name: '仿真加速', desc: 'CPU/GPU 异构并行...' }, { name: '仿真输出', desc: '生成多径数据、KPI 指标与接口...' } ] },
        { __component: 'sections.stat-group', theme: 'light', title: '全球领先的核心优势', description: 'HyperRT 在动态仿真、平台适配...', metrics: [ { label: '累计部署', value: '120+ 套' }, { label: '误差基线', value: '<=1.5 dB' }, { label: '频段范围', value: '0.1-325 GHz' } ] },
        { __component: 'sections.cta-banner', theme: 'dark', title: '开启您的精准预测之旅', description: '欢迎联系 MetaRadio 专家团队...', links: [ { name: '预约演示', url: 'mailto:sales@metaradio.tech?subject=预约演示' }, { name: '浏览解决方案', url: '/zh/marketing/solutions' } ] },
    ],
  };
}
