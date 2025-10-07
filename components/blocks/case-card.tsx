import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/navigation';
import clsx from 'clsx';
import { BaseCard } from './base-card';

type CaseCardProps = {
  title: string;
  href: string;
  locale?: Locale;
  client?: string | null;
  summary?: string | null;
  viewDetailLabel?: string | null;
  theme?: 'dark' | 'light';
};

export function CaseCard({ title, href, locale, client, summary, viewDetailLabel, theme = 'dark' }: CaseCardProps) {
  const localizedHref = localizeHref(href, locale) || href;
  return (
    <BaseCard href={localizedHref} theme={theme}>
      <div className="relative flex h-full flex-col gap-4 pt-4">
        <div className="flex-grow">
          {client ? (
            <p
              className={clsx(
                'mb-3 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em]',
                {
                  'border-white/15 bg-white/10 text-slate-200/80': theme === 'dark',
                  'border-slate-200 bg-slate-100 text-slate-600': theme === 'light',
                }
              )}
            >
              {client}
            </p>
          ) : null}
          <h3
            className={clsx('font-display text-xl', { 'text-white': theme === 'dark', 'text-slate-900': theme === 'light' })}
          >
            {title}
          </h3>
          {summary ? (
            <p className={clsx('mt-2 text-sm', { 'text-slate-300': theme === 'dark', 'text-slate-600': theme === 'light' })}>
              {summary}
            </p>
          ) : null}
        </div>
        <span
          className={clsx(
            'relative mt-4 inline-flex items-center gap-2 text-xs font-semibold transition group-hover:gap-3',
            {
              'text-brand-300': theme === 'dark',
              'text-brand-500': theme === 'light',
            }
          )}
        >
          {viewDetailLabel || 'View details'}
          <span aria-hidden className="text-base">
            →
          </span>
        </span>
      </div>
    </BaseCard>
  );
}
