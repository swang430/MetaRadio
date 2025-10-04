import { PostCard } from './post-card';
import type { Locale } from '@/lib/i18n/config';

type PostListProps = {
  title?: string | null;
  intro?: string | null;
  posts: Array<{
    id?: number | string;
    title: string;
    slug: string;
    excerpt?: string | null;
    category?: string | null;
    estimate?: number | null;
    readMoreLabel?: string | null;
  }>;
  locale?: Locale;
};

function formatReadMinutes(locale: Locale, minutes: number) {
  if (locale === 'en') {
    return `≈ ${minutes} min read · `;
  }
  return `阅读 ${minutes} 分钟 · `;
}

export function PostList({ title, intro, posts, locale = 'zh' }: PostListProps) {
  if (!posts?.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title ? <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-600">{intro}</p> : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id || post.slug}
              title={post.title}
              excerpt={post.excerpt}
              href={`/marketing/blog/${post.slug}`}
              category={post.category}
              estimateLabel={
                post.estimate ? formatReadMinutes(locale, post.estimate) : undefined
              }
              readMoreLabel={post.readMoreLabel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
