import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';
import type { BlockInput } from '@/lib/strapi-types';

export const revalidate = 120;

export default async function ProductsPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('products', locale);
  const rawBlocks = Array.isArray(page?.attributes?.blocks) ? page?.attributes?.blocks : [];
  const ensureHero = () => ({
    __component: 'hero.hero',
    theme: 'dark',
    headline:
      page?.attributes?.title ||
      (locale === 'en' ? 'Products' : '核心产品'),
    summary:
      page?.attributes?.excerpt ||
      (locale === 'en'
        ? 'Ray-tracing solvers, dynamic OTA toolchains, and virtual drive platforms for communications R&D.'
        : '覆盖通信仿真、动态 OTA 与虚拟路测的一体化产品组合。'),
  });

  const blocksWithTheme: BlockInput[] =
    rawBlocks.length > 0
      ? rawBlocks.map((block, index) => {
          if (block?.theme) return block;
          const defaultTheme = index % 2 === 0 ? 'dark' : 'light';
          return { ...block, theme: defaultTheme };
        })
      : [ensureHero()];

  if (!blocksWithTheme.some((block) => block?.__component === 'hero.hero')) {
    blocksWithTheme.unshift(ensureHero());
  }

  return (
    <div className="relative bg-white">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={blocksWithTheme} locale={locale} dictionary={dictionary} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const page = await getPageBySlug('products', locale);
  const seo = page?.attributes?.seo;
  const fallbackTitle = locale === 'en' ? 'Products · MetaRadio' : '核心产品 · MetaRadio';
  const fallbackDescription =
    locale === 'en'
      ? 'MetaRadio offers ray-tracing solvers, dynamic OTA toolchains, and virtual drive platforms across the R&D lifecycle.'
      : 'MetaRadio 的射线追踪引擎、动态 OTA 工具链与虚拟路测平台，覆盖通信研发与验证全流程。';
  return {
    title: seo?.metaTitle || fallbackTitle,
    description: seo?.metaDescription || fallbackDescription,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/products' : `/${loc}/marketing/products`])
      ),
    },
  };
}
