import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';
import type { BlockInput } from '@/lib/strapi-types';

export const revalidate = 120;

export default async function CapabilitiesPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('capabilities', locale);
  const rawBlocks = Array.isArray(page?.attributes?.blocks) ? page?.attributes?.blocks : [];
  const ensureHero = () => ({
    __component: 'hero.hero',
    theme: 'dark',
    headline:
      page?.attributes?.title ||
      (locale === 'en' ? 'Capabilities' : '技术能力'),
    summary:
      page?.attributes?.excerpt ||
      (locale === 'en'
        ? 'Materials modelling, ray-tracing solvers, and AI closed-loop calibration for digital twins.'
        : '从材质参数化到 AI 闭环的电磁数字孪生核心能力。'),
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
  const page = await getPageBySlug('capabilities', locale);
  const seo = page?.attributes?.seo;
  const fallbackTitle = locale === 'en' ? 'Capabilities · MetaRadio' : '技术能力 · MetaRadio';
  const fallbackDescription =
    locale === 'en'
      ? 'Materials modeling, ray-tracing solvers, and AI closed-loop calibration for electromagnetic digital twins.'
      : '材质建模、射线追踪、AI 闭环等核心数字孪生能力。';
  return {
    title: seo?.metaTitle || fallbackTitle,
    description: seo?.metaDescription || fallbackDescription,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/capabilities' : `/${loc}/capabilities`])
      ),
    },
  };
}
