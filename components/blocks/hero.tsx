import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

type Action = {
  name?: string | null;
  url?: string | null;
};

type Media = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type HeroProps = {
  headline: string;
  subhead?: string | null;
  summary?: string | null;
  primaryAction?: Action | null;
  secondaryAction?: Action | null;
  media?: Media | null;
  theme?: 'dark' | 'light';
};

export function Hero({
  headline,
  subhead,
  summary,
  primaryAction,
  secondaryAction,
  media,
  theme = 'dark',
}: HeroProps) {
  return (
    <section
      className={clsx('relative overflow-hidden py-20 lg:py-28', {
        'bg-dark-background': theme === 'dark',
        'bg-white': theme === 'light',
      })}
    >
      {theme === 'dark' && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(750px_circle_at_10%_10%,rgba(99,102,241,0.35),transparent),radial-gradient(550px_circle_at_90%_0,rgba(14,165,233,0.25),transparent)]" />
      )}

      <div className="relative container grid gap-14 px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
        <div className="space-y-7">
          {subhead ? (
            <span
              className={clsx(
                'inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-medium uppercase tracking-[0.4em]',
                {
                  'border-white/10 bg-white/10 text-brand-200': theme === 'dark',
                  'border-slate-200 bg-slate-100 text-brand-600': theme === 'light',
                }
              )}
            >
              {subhead}
            </span>
          ) : null}
          <h1
            className={clsx('font-display text-4xl leading-tight sm:text-5xl lg:text-6xl', {
              'text-slate-200': theme === 'dark',
              'text-slate-900': theme === 'light',
            })}
          >
            {headline}
          </h1>
          {summary ? (
            <p
              className={clsx('max-w-2xl text-base sm:text-lg', {
                'text-slate-200/80': theme === 'dark',
                'text-slate-600': theme === 'light',
              })}
            >
              {summary}
            </p>
          ) : null}
          <div className="flex flex-wrap items-center gap-4">
            {primaryAction?.name && primaryAction?.url ? (
              <Link
                href={primaryAction.url}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
              >
                {primaryAction.name}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
            {secondaryAction?.name && secondaryAction?.url ? (
              <Link
                href={secondaryAction.url}
                className={clsx(
                  'inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
                  {
                    'border-white/15 bg-white/10 text-slate-100 hover:border-brand-300/60 hover:bg-brand-300/10 focus-visible:outline-brand-200':
                      theme === 'dark',
                    'border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200 focus-visible:outline-brand-500':
                      theme === 'light',
                  }
                )}
              >
                {secondaryAction.name}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative">
          <div
            className={clsx(
              'glass-panel relative aspect-[16/10] w-full overflow-hidden shadow-card',
              {
                'border-white/10 bg-gradient-to-br from-brand-500/20 via-indigo-500/10 to-sky-400/20':
                  theme === 'dark',
                'border-slate-200 bg-slate-100/80': theme === 'light',
              }
            )}
          >
            {media?.url ? (
              <Image
                src={media.url}
                alt={media.alt || 'Hero illustration'}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover opacity-90"
              />
            ) : (
              <div
                className={clsx(
                  'flex h-full w-full items-center justify-center p-10 text-center text-sm',
                  {
                    'text-slate-200/70': theme === 'dark',
                    'text-slate-500': theme === 'light',
                  }
                )}
              >
                <span>可替换为媒体资源</span>
              </div>
            )}
            <span
              className={clsx('pointer-events-none absolute inset-6 rounded-3xl border', {
                'border-white/10': theme === 'dark',
                'border-slate-900/10': theme === 'light',
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}