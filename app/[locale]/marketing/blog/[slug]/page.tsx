import Image from 'next/image';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getArticleBySlug, listArticles } from '@/lib/strapi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type ArticlePageProps = {
  params: { locale?: string; slug: string };
};

function renderCover(article: Awaited<ReturnType<typeof getArticleBySlug>>) {
  const media = article?.attributes.cover;
  if (!media?.data) return null;
  const attr: any = media.data.attributes || media.data;
  if (!attr?.url) return null;
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-card">
      <Image
        src={attr.url}
        alt={attr.alternativeText || article?.attributes.title || 'article cover'}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <span className="pointer-events-none absolute inset-4 rounded-3xl border border-white/10" />
    </div>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = getDictionary(locale);
  const article = await getArticleBySlug(params.slug, locale);
  if (!article) notFound();
  const { title, excerpt, content, tags } = article.attributes;

  return (
    <div className="relative">
      <Nav locale={locale} dictionary={dictionary} />
      <article className="relative pb-24">
        <header className="relative py-20">
          <div className="container px-6">
            <div className="max-w-3xl space-y-4">
              {tags?.length ? (
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-200/80">
                  {tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              <h1 className="font-display text-3xl text-white md:text-4xl lg:text-[2.75rem]">{title}</h1>
              {excerpt ? <p className="text-base text-slate-200/80 sm:text-lg">{excerpt}</p> : null}
            </div>
          </div>
        </header>
        <div className="container space-y-12 px-6">
          {renderCover(article)}
          {content ? <div className="prose prose-lg" dangerouslySetInnerHTML={{ __html: content }} /> : null}
        </div>
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const locale: Locale = resolveLocale(params.locale);
  const article = await getArticleBySlug(params.slug, locale);
  if (!article) return { title: 'MetaRadio' };
  const seo = article.attributes.seo;
  const title =
    seo?.metaTitle ||
    (locale === 'en' ? `${article.attributes.title} · Insights` : `${article.attributes.title} · 洞察`);
  const description = seo?.metaDescription || article.attributes.excerpt || undefined;
  return {
    title,
    description,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [
          loc,
          loc === 'zh'
            ? `/marketing/blog/${article.attributes.slug}`
            : `/${loc}/marketing/blog/${article.attributes.slug}`,
        ])
      ),
    },
  };
}

export async function generateStaticParams() {
  const locales = SUPPORTED_LOCALES;
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    const posts = await listArticles(locale as Locale);
    posts.forEach((post) => {
      params.push({ locale, slug: post.attributes.slug });
    });
  }
  return params;
}
