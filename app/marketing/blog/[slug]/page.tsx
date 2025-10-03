import Image from 'next/image';
import { Nav } from '@/components/nav';
import { getArticleBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type ArticlePageProps = {
  params: { slug: string };
};

function renderCover(article: Awaited<ReturnType<typeof getArticleBySlug>>) {
  const media = article?.attributes.cover;
  if (!media?.data) return null;
  const attr: any = media.data.attributes || media.data;
  if (!attr?.url) return null;
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200">
      <Image src={attr.url} alt={attr.alternativeText || article?.attributes.title || 'article cover'} fill sizes="100vw" className="object-cover" />
    </div>
  );
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();
  const { title, excerpt, content, tags } = article.attributes;

  return (
    <div>
      <Nav />
      <article className="pb-16">
        <header className="bg-slate-50 py-12">
          <div className="container mx-auto px-6">
            {tags?.length ? (
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-600">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
            {excerpt ? <p className="mt-4 max-w-3xl text-base text-slate-600">{excerpt}</p> : null}
          </div>
        </header>
        <div className="container mx-auto space-y-10 px-6 pt-10">
          {renderCover(article)}
          {content ? <div className="prose prose-lg prose-slate" dangerouslySetInnerHTML={{ __html: content }} /> : null}
        </div>
      </article>
    </div>
  );
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: 'MetaRadio' };
  const seo = article.attributes.seo;
  const title = seo?.metaTitle || `${article.attributes.title} · 洞察`;
  const description = seo?.metaDescription || article.attributes.excerpt || undefined;
  return {
    title,
    description,
  };
}
