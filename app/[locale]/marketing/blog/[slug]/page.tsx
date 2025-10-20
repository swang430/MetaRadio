import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getArticleBySlug, listArticles } from '@/lib/strapi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 120;

type ArticlePageProps = {
  params: { locale?: string; slug: string };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const locale = resolveLocale(params.locale);
  const dictionary = getDictionary(locale);
  const article = await getArticleBySlug(params.slug, locale);
  if (!article) notFound();

  // Defensive coding: use attributes if they exist, otherwise use the object itself.
  const attrs = article.attributes || article;
  const { title, excerpt, content, tags, cover } = attrs;

  // Create a blocks array to use the standard renderer
  const blocks = [
    {
      __component: 'hero.hero',
      theme: 'dark',
      headline: title,
      summary: excerpt,
      tags: tags,
      bgMedia: cover,
    },
    {
      __component: 'content.media-block',
      theme: 'light',
      body: content,
      media: cover,
    },
  ];

  return (
    <div className="relative bg-white">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={blocks} locale={locale} dictionary={dictionary} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const locale = resolveLocale(params.locale);
  const article = await getArticleBySlug(params.slug, locale);
  if (!article) return { title: 'MetaRadio' };

  const attrs = article.attributes || article;
  const seo = attrs.seo;
  const title = seo?.metaTitle || `${attrs.title} · MetaRadio`;
  const description = seo?.metaDescription || attrs.excerpt || undefined;
  return {
    title,
    description,
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    const posts = await listArticles(locale as Locale);
    posts.forEach((post) => {
      // Defensive coding: use attributes if they exist, otherwise use the object itself.
      const attrs = post.attributes || post;
      if (attrs.slug) {
        params.push({ locale, slug: attrs.slug });
      }
    });
  }
  return params;
}
