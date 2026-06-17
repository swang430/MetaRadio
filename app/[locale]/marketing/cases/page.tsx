import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug, listCaseStudies } from '@/lib/strapi';
import type { Metadata } from 'next';
import type { BlockInput } from '@/lib/strapi-types';

export const revalidate = 120;

export default async function CasesPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const cases = await listCaseStudies(locale);
  const page = await getPageBySlug('cases', locale);
  const copy = dictionary.pages.cases;

  const pageBlocks = Array.isArray(page?.attributes?.blocks) ? page.attributes.blocks : [];
  const blocks: BlockInput[] = [...pageBlocks];

  const ensureHero = () => ({
    __component: 'hero.hero',
    theme: 'dark',
    headline: page?.attributes?.title || copy.title,
    summary: page?.attributes?.excerpt || copy.intro,
  });

  if (!blocks.some((block) => block?.__component === 'hero.hero')) {
    blocks.unshift(ensureHero());
  }

  const showcaseBlock = {
    __component: 'sections.case-showcase',
    theme: 'light',
    title: page?.attributes?.title || copy.title,
    intro: page?.attributes?.excerpt || copy.intro,
    cases: cases.map((item) => item.attributes || item),
  };

  const existingShowcaseIndex = blocks.findIndex((block) => block?.__component === 'sections.case-showcase');
  if (existingShowcaseIndex >= 0) {
    const existing = (blocks[existingShowcaseIndex] ?? {}) as BlockInput;
    blocks[existingShowcaseIndex] = {
      ...existing,
      theme: existing.theme || showcaseBlock.theme,
      title: existing.title || showcaseBlock.title,
      intro: existing.intro || showcaseBlock.intro,
      cases: showcaseBlock.cases,
    };
  } else {
    blocks.push(showcaseBlock);
  }

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
  const page = await getPageBySlug('cases', locale);
  const copy = getDictionary(locale).pages.cases;
  const seo = page?.attributes?.seo;
  return {
    title: seo?.metaTitle || `${copy.title} · MetaRadio`,
    description: seo?.metaDescription || copy.intro,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/cases' : `/${loc}/marketing/cases`])
      ),
    },
  };
}
