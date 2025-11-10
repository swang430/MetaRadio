import type { ReactNode } from 'react';
import clsx from 'clsx';
import { BaseCard } from './base-card';

export type FeatureCardProps = {
  title: string;
  description?: string | null;
  href?: string | null;
  icon?: ReactNode;
  linkLabel?: string | null;
  theme?: 'dark' | 'light';
};

export function FeatureCard({ title, description, href, icon, linkLabel, theme = 'dark' }: FeatureCardProps) {
  const renderIcon = () => {
    if (typeof icon === 'string') {
      return (
        <span className="block text-xs font-semibold uppercase tracking-wide text-current whitespace-nowrap">
          {icon}
        </span>
      );
    }
    return icon;
  };

  return (
    <BaseCard href={href} theme={theme}>
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
          {renderIcon()}
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
    </BaseCard>
  );
}
