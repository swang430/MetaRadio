import { PostCard } from './post-card';
import type { Locale } from '@/lib/i18n/config';
import clsx from 'clsx';

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
  theme?: 'dark' | 'light';
};

function formatReadMinutes(locale: Locale, minutes: number) {
  if (locale === 'en') {
    return `≈ ${minutes} min read · `;
  }
  return `阅读 ${minutes} 分钟 · `;
}

export function PostList({ title, intro, posts, locale = 'zh', theme = 'dark' }: PostListProps) {
  if (!posts?.length) return null;
  return (
    <section
      className={clsx('relative py-20', {
        'bg-dark-background': theme === 'dark',
        'bg-white': theme === 'light',
      })}
    >
      <div className="container relative px-6">
        {title ? (
          <h2
            className={clsx('font-display text-3xl md:text-4xl', {
              'text-white': theme === 'dark',
              'text-slate-900': theme === 'light',
            })}
          >
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p
            className={clsx('mt-3 max-w-2xl text-base sm:text-lg', {
              'text-slate-200/75': theme === 'dark',
              'text-slate-600': theme === 'light',
            })}
          >
            {intro}
          </p>
        ) : null}
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id || post.slug}
              title={post.title}
              excerpt={post.excerpt}
              href={`/marketing/blog/${post.slug}`}
              category={post.category}
              estimateLabel={post.estimate ? formatReadMinutes(locale, post.estimate) : undefined}
              readMoreLabel={post.readMoreLabel}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
