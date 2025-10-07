import Link from 'next/link';
import clsx from 'clsx';

type CTAItem = {
  id?: number | string;
  name?: string | null;
  url?: string | null;
};

type CTABannerProps = {
  title: string;
  description?: string | null;
  items?: CTAItem[] | null;
  theme?: 'dark' | 'light';
};

export function CTABanner({ title, description, items, theme = 'dark' }: CTABannerProps) {
  return (
    <section
      className={clsx('relative py-20', { 'bg-dark-background': theme === 'dark', 'bg-slate-50': theme === 'light' })}
    >
      <div className="container px-6">
        <div
          className={clsx('relative overflow-hidden rounded-4xl p-10 sm:p-14', {
            'border border-white/10 bg-gradient-to-br from-brand-500/60 via-brand-500/50 to-sky-400/60 shadow-glow':
              theme === 'dark',
            'border border-slate-200 bg-gradient-to-br from-brand-50 via-white to-sky-50':
              theme === 'light',
          })}
        >
          {theme === 'dark' && (
            <>
              <div className="pointer-events-none absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-white/20 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 -top-12 h-64 w-64 rounded-full border border-white/25" />
            </>
          )}
          <div className="relative space-y-6">
            <h2
              className={clsx('font-display text-3xl sm:text-4xl lg:text-[2.6rem]', {
                'text-white': theme === 'dark',
                'text-slate-900': theme === 'light',
              })}
            >
              {title}
            </h2>
            {description ? (
              <p
                className={clsx('max-w-3xl text-base sm:text-lg', {
                  'text-white/85': theme === 'dark',
                  'text-slate-600': theme === 'light',
                })}
              >
                {description}
              </p>
            ) : null}
            {items?.length ? (
              <div className="flex flex-wrap gap-4">
                {items.map((item) =>
                  item?.name && item?.url ? (
                    <Link
                      key={item.id || item.url}
                      href={item.url}
                      className={clsx(
                        'inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition',
                        {
                          'bg-white/90 text-brand-600 hover:bg-white': theme === 'dark',
                          'bg-brand-500 text-white shadow-lg hover:bg-brand-600': theme === 'light',
                        }
                      )}
                    >
                      {item.name}
                      <span aria-hidden>→</span>
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
