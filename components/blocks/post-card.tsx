import Link from 'next/link';
import clsx from 'clsx';
import { BaseCard } from './base-card';

type PostCardProps = {
  title: string;
  excerpt?: string | null;
  href: string;
  category?: string | null;
  estimateLabel?: string | null;
  readMoreLabel?: string | null;
  theme?: 'dark' | 'light';
};

export function PostCard({ title, excerpt, href, category, estimateLabel, readMoreLabel, theme = 'dark' }: PostCardProps) {
  return (
    <BaseCard href={href} theme={theme}>
      <div className="relative flex h-full flex-col gap-4 pt-4">
        <div className="flex-grow space-y-3">
          {category ? (
            <span
              className={clsx(
                'inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.35em]',
                {
                  'border-white/15 bg-white/10 text-brand-200/80': theme === 'dark',
                  'border-slate-200 bg-slate-100 text-brand-600': theme === 'light',
                }
              )}
            >
              {category}
            </span>
          ) : null}
          <h3
            className={clsx('font-display text-xl', { 'text-white': theme === 'dark', 'text-slate-900': theme === 'light' })}
          >
            {title}
          </h3>
          {excerpt ? (
            <p className={clsx('text-sm', { 'text-slate-300': theme === 'dark', 'text-slate-600': theme === 'light' })}>
              {excerpt}
            </p>
          ) : null}
        </div>
        <div
          className={clsx('relative mt-4 flex items-center justify-between text-xs font-semibold', {
            'text-slate-300/80': theme === 'dark',
            'text-slate-500': theme === 'light',
          })}
        >
          {estimateLabel ? <span>{estimateLabel}</span> : <span />}
          <span
            className={clsx('inline-flex items-center gap-2 group-hover:gap-3', {
              'text-brand-300': theme === 'dark',
              'text-brand-500': theme === 'light',
            })}
          >
            {readMoreLabel || 'Continue reading'}
            <span aria-hidden className="text-sm">
              →
            </span>
          </span>
        </div>
      </div>
    </BaseCard>
  );
}
