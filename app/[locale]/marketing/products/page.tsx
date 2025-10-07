import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function ProductsPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('products', locale);
  const originalBlocks = page?.attributes.blocks || [];

  // Inject the alternating theme property into each block
  const blocks = originalBlocks.map((block, index) => ({
    ...block,
    theme: index % 2 === 0 ? 'dark' : 'light',
  }));

  return (
    <div className="relative bg-white">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={blocks} locale={locale} dictionary={dictionary} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const page = await getPageBySlug('products', locale);
  const seo = page?.attributes.seo;
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