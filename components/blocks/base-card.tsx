import Link from 'next/link';
import clsx from 'clsx';
import type { ReactNode } from 'react';

export type BaseCardProps = {
  children: ReactNode;
  href?: string | null;
  theme?: 'dark' | 'light';
  className?: string;
};

export function BaseCard({ children, href, theme = 'dark', className }: BaseCardProps) {
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
        },
        className
      )}
    >
      {/* Accent border */}
      <div
        className={clsx('absolute top-0 left-0 h-1 w-full bg-brand-500 opacity-60 transition-all duration-300 group-hover:opacity-100')}
      />
      {children}
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
