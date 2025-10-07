import type { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export type FeatureCardProps = {
  title: string;
  description?: string | null;
  href?: string | null;
  icon?: ReactNode;
  linkLabel?: string | null;
  theme?: 'dark' | 'light';
};

export function FeatureCard({ title, description, href, icon, linkLabel, theme = 'dark' }: FeatureCardProps) {
  const content = (
    <div
      className={clsx(
        'group relative h-full overflow-hidden rounded-2xl p-7 transition-all duration-300',
        {
          // Dark theme styles
          'border border-slate-700 bg-slate-800 hover:border-brand-400/60 hover:shadow-lg hover:shadow-brand-500/10':
            theme === 'dark',
          // Light theme styles
          'border border-slate-200 bg-white hover:border-brand-500/80 hover:shadow-lg hover:shadow-brand-500/20':
            theme === 'light',
        }
      )}
    >
      {/* Accent border */}
      <div
        className={clsx('absolute top-0 left-0 h-1 w-full bg-brand-500 opacity-60 transition-all duration-300 group-hover:opacity-100')}
      />

      <div className="relative flex h-full flex-col gap-5 pt-4">
        {icon ? (
          <div
            className={clsx(
              'flex h-12 w-12 items-center justify-center rounded-lg text-2xl',
              {
                'bg-slate-700 text-brand-200': theme === 'dark',
                'bg-slate-100 text-brand-500': theme === 'light',
              }
            )}
          >
            {icon}
          </div>
        ) : null}
        <div className="flex-grow">
          <h3 className={clsx('font-display text-xl', { 'text-white': theme === 'dark', 'text-slate-900': theme === 'light' })}>{title}</h3>
          {description ? (
            <p className={clsx('mt-2 text-sm', { 'text-slate-300': theme === 'dark', 'text-slate-600': theme === 'light' })}>
              {description}
            </p>
          ) : null}
        </div>
        {href ? (
          <span
            className={clsx(
              'mt-auto inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group-hover:gap-3',
              {
                'text-brand-300': theme === 'dark',
                'text-brand-500': theme === 'light',
              }
            )}
          >
            {linkLabel || 'Learn more'}
            <span aria-hidden className="-translate-x-px text-base transition-transform duration-300 group-hover:translate-x-0">
              →
            </span>
          </span>
        ) : null}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={clsx('block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4', {
          'focus-visible:outline-brand-300': theme === 'dark',
          'focus-visible:outline-brand-500': theme === 'light',
        })}
      >
        {content}
      </Link>
    );
  }

  return content;
}