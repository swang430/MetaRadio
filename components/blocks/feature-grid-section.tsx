import type { ReactNode } from 'react';
import clsx from 'clsx';
import { FeatureCard, type FeatureCardProps } from './feature-card';

type FeatureGridSectionProps = {
  title?: string | null;
  intro?: string | null;
  items: Omit<FeatureCardProps, 'theme'>[];
  theme?: 'dark' | 'light';
  layout?: 'full' | 'inset';
};

export function FeatureGridSection({ title, intro, items, theme = 'dark', layout = 'full' }: FeatureGridSectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <section
      className={clsx('relative py-20', {
        'bg-dark-background': theme === 'dark',
        'bg-white': theme === 'light',
      })}
    >
      <div
        className={clsx('px-6', {
          container: layout === 'full',
          'mx-auto max-w-5xl': layout === 'inset',
        })}
      >
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
              'text-slate-200/70': theme === 'dark',
              'text-slate-600': theme === 'light',
            })}
          >
            {intro}
          </p>
        ) : null}
        <div className="mt-12 grid grid-cols-3 gap-6">
          {items.map((item, index) => (
            <FeatureCard key={item.title + index} {...item} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}
