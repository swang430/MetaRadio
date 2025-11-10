import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug, listArticles } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function BlogPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const posts = await listArticles(locale);
  const page = await getPageBySlug('blog', locale);
  const copy = dictionary.pages.blog;

  const pageBlocks = Array.isArray(page?.attributes?.blocks) ? page.attributes.blocks : [];
  const blocks = [...pageBlocks];

  const ensureHero = () => ({
    __component: 'hero.hero',
    theme: 'dark',
    headline: page?.attributes?.title || copy.title,
    summary: page?.attributes?.excerpt || copy.intro,
  });

  if (!blocks.some((block) => block?.__component === 'hero.hero')) {
    blocks.unshift(ensureHero());
  }

  const postListBlock = {
    __component: 'sections.post-list',
    theme: 'light',
    title: page?.attributes?.title || copy.title,
    intro: page?.attributes?.excerpt || copy.intro,
    posts: posts.map((post) => post.attributes || post),
  };

  const postListIndex = blocks.findIndex((block) => block?.__component === 'sections.post-list');
  if (postListIndex >= 0) {
    const existing = blocks[postListIndex] || {};
    blocks[postListIndex] = {
      ...existing,
      theme: existing.theme || postListBlock.theme,
      title: existing.title || postListBlock.title,
      intro: existing.intro || postListBlock.intro,
      posts: postListBlock.posts,
    };
  } else {
    blocks.push(postListBlock);
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
  const page = await getPageBySlug('blog', locale);
  const copy = getDictionary(locale).pages.blog;
  const seo = page?.attributes?.seo;
  return {
    title: seo?.metaTitle || `${copy.title} · MetaRadio`,
    description: seo?.metaDescription || copy.intro,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/blog' : `/${loc}/marketing/blog`])
      ),
    },
  };
}
