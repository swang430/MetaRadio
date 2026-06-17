import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug, listResources } from '@/lib/strapi';
import type { Metadata } from 'next';
import type { BlockInput } from '@/lib/strapi-types';

export const revalidate = 120;

export default async function ResourcesPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const resources = await listResources(locale);
  const page = await getPageBySlug('resources', locale);
  const copy = dictionary.pages.resources;

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

  const resourceCards = resources
    .map((resource) => {
      const attrs = resource.attributes || (resource as any);
      if (!attrs?.title) return null;
      const linkName = attrs.link?.name || copy.viewDetail;
      const linkUrl = attrs.link?.url || null;
      return {
        icon: '📄',
        title: attrs.title,
        description: attrs.description,
        link: linkUrl
          ? {
              name: linkName,
              url: linkUrl,
            }
          : undefined,
      };
    })
    .filter(Boolean);

  if (resourceCards.length) {
    const placeholderIndex = baseBlocks.findIndex(
      (block) => block?.__component === 'sections.feature-grid' && (!block.items || block.items.length === 0)
    );
    const defaultBlock = {
      __component: 'sections.feature-grid',
      theme: 'light',
      title: copy.title,
      intro: copy.intro,
      items: resourceCards,
    };
    if (placeholderIndex >= 0) {
      const existing = (baseBlocks[placeholderIndex] ?? {}) as BlockInput;
      baseBlocks[placeholderIndex] = {
        ...existing,
        items: resourceCards,
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
  const page = await getPageBySlug('resources', locale);
  const copy = dictionary.pages.resources;
  const seo = page?.attributes?.seo;
  const title = seo?.metaTitle || `${copy.title} · MetaRadio`;
  const description = seo?.metaDescription || copy.intro;
  return {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/resources' : `/${loc}/marketing/resources`])
      ),
    },
  };
}
