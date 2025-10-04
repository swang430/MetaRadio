import { PostCard } from '@/components/blocks/post-card';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { listArticles } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

function formatReadMinutes(locale: Locale, minutes: number) {
  if (locale === 'en') {
    return `≈ ${minutes} min read · `;
  }
  return `阅读 ${minutes} 分钟 · `;
}

export default async function BlogPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const posts = await listArticles(locale);
  const copy = dictionary.pages.blog;

  return (
    <div>
      <Nav locale={locale} dictionary={dictionary} />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{copy.title}</h1>
            <p className="mt-4 text-base text-slate-600">{copy.intro}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.attributes.title}
                excerpt={post.attributes.excerpt}
                href={`/marketing/blog/${post.attributes.slug}`}
                category={post.attributes.tags?.[0]}
                estimateLabel={formatReadMinutes(locale, 5)}
                readMoreLabel={dictionary.components.postCard.readMore}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const copy = getDictionary(locale).pages.blog;
  return {
    title: `${copy.title} · MetaRadio`,
    description: copy.intro,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/blog' : `/${loc}/marketing/blog`])
      ),
    },
  };
}
