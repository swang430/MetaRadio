import { BlocksRenderer } from '@/components/blocks/renderer';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';
import { Nav } from '@/components/nav';

export const revalidate = 60;

function enhanceHomeBlocks(blocks: Array<Record<string, any>> | undefined) {
  if (!blocks?.length) return [];
  const themeByComponent: Record<string, 'dark' | 'light'> = {
    'hero.hero': 'dark',
    'sections.feature-grid': 'light',
    'content.media-block': 'dark',
    'sections.tech-flow': 'light',
    'sections.stat-group': 'light',
    'sections.cta-banner': 'dark',
  };
  return blocks.map((block) => {
    const theme = block.theme ?? themeByComponent[block.__component] ?? block.theme;
    return theme ? { ...block, theme } : block;
  });
}

export default async function HomePage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('landing', locale);
  const blocks = enhanceHomeBlocks(page?.attributes?.blocks);

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
  const seo = page?.attributes?.seo;
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
