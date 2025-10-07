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
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(600px_circle_at_10%_10%,rgba(14,165,233,0.1),transparent)]" />
      <div className="container relative px-6">
        {title ? <h2 className="font-display text-3xl text-white md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-200/75 sm:text-lg">{intro}</p> : null}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
