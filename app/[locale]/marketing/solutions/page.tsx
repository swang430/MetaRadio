import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug, listSolutions } from '@/lib/strapi';
import type { Metadata } from 'next';
import type { BlockInput } from '@/lib/strapi-types';

export const revalidate = 120;

export default async function SolutionsIndex({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const solutions = await listSolutions(locale);
  const page = await getPageBySlug('solutions', locale);
  const copy = dictionary.pages.solutions;

  const strapiBlocks = Array.isArray(page?.attributes?.blocks) ? page?.attributes?.blocks : [];
  const baseBlocks: BlockInput[] = [...(strapiBlocks || [])];
  const ensureHero = () => ({
    __component: 'hero.hero',
    theme: 'dark',
    headline: page?.attributes?.title || copy.title,
    summary: page?.attributes?.excerpt || copy.intro,
  });

  if (!baseBlocks.length) {
    baseBlocks.push(ensureHero());
  } else if (!baseBlocks.some((block) => block?.__component === 'hero.hero')) {
    baseBlocks.unshift(ensureHero());
  }

  const solutionCards = solutions
    .map((solution) => {
      const attrs = solution.attributes || (solution as any);
      const slug = attrs?.slug;
      if (!slug) return null;
      return {
        icon: '💡',
        title: attrs?.title,
        description: attrs?.excerpt,
        link: {
          name: copy.learnMore,
          url: `/marketing/solutions/${slug}`,
        },
      };
    })
    .filter(Boolean);

  if (solutionCards.length) {
    const placeholderIndex = baseBlocks.findIndex(
      (block) => block?.__component === 'sections.feature-grid' && (!block.items || block.items.length === 0)
    );
    const defaultBlock = {
      __component: 'sections.feature-grid',
      theme: 'light',
      title: copy.title,
      intro: copy.intro,
      items: solutionCards,
    };
    if (placeholderIndex >= 0) {
      const existing = (baseBlocks[placeholderIndex] ?? {}) as BlockInput;
      baseBlocks[placeholderIndex] = {
        ...existing,
        items: solutionCards,
        title: existing.title || defaultBlock.title,
        intro: existing.intro || defaultBlock.intro,
        theme: existing.theme || defaultBlock.theme,
      };
    } else {
      baseBlocks.push(defaultBlock);
    }
  }

  return (
    <div className="relative bg-white">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={baseBlocks} locale={locale} dictionary={dictionary} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('solutions', locale);
  const copy = dictionary.pages.solutions;
  const seo = page?.attributes?.seo;
  const title = seo?.metaTitle || `${copy.title} · MetaRadio`;
  const description = seo?.metaDescription || copy.intro;
  return {
    title,
    description,
    alternates: {
      languages: {
        zh: '/marketing/solutions',
        en: '/en/marketing/solutions',
      },
    },
  };
}
