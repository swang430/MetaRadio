import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

type Action = {
  id?: number | string;
  name?: string | null;
  url?: string | null;
};

type Media = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type MediaBlockProps = {
  title: string;
  body?: string | null;
  media?: Media | null;
  orientation?: 'left' | 'right';
  actions?: Action[] | null;
  theme?: 'dark' | 'light';
};

export function MediaBlock({
  title,
  body,
  media,
  orientation = 'left',
  actions,
  theme = 'dark',
}: MediaBlockProps) {
  const mediaWrapperClasses = clsx(
    'relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-card',
    {
      'border border-white/10 bg-white/5': theme === 'dark',
      'border border-slate-200 bg-slate-100': theme === 'light',
    },
    orientation === 'right' ? 'lg:order-2' : ''
  );
  const textWrapperClasses = clsx(
    'flex flex-col justify-center',
    orientation === 'right' ? 'lg:order-1' : ''
  );

  const image = media?.url ? (
    <div className={mediaWrapperClasses}>
      {theme === 'dark' && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_25%_0%,rgba(14,165,233,0.15),transparent)]" />
      )}
      <Image
        src={media.url}
        alt={media.alt || 'media block image'}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />
      <span
        className={clsx('pointer-events-none absolute inset-4 rounded-3xl border', {
          'border-white/10': theme === 'dark',
          'border-slate-900/10': theme === 'light',
        })}
      />
    </div>
  ) : (
    <div
      className={clsx(
        'flex h-full min-h-[240px] w-full items-center justify-center rounded-3xl border border-dashed',
        {
          'border-white/20 bg-white/5 text-sm text-slate-200/70': theme === 'dark',
          'border-slate-300 bg-slate-100 text-sm text-slate-500': theme === 'light',
        },
        orientation === 'right' ? 'lg:order-2' : ''
      )}
    >
      媒体占位符
    </div>
  );

  return (
    <section
      className={clsx('relative py-20', { 'bg-dark-background': theme === 'dark', 'bg-white': theme === 'light' })}
    >
      <div className="container flex flex-col gap-10 px-6 lg:grid lg:grid-cols-2 lg:gap-16">
        {image}
        <div className={textWrapperClasses}>
          <h2
            className={clsx('font-display text-3xl sm:text-4xl', {
              'text-white': theme === 'dark',
              'text-slate-900': theme === 'light',
            })}
          >
            {title}
          </h2>
          {body ? (
            <div
              className={clsx('prose mt-5', {
                'prose-invert': theme === 'dark',
                'prose-slate': theme === 'light',
              })}
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : null}
          {actions?.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) =>
                action?.name && action?.url ? (
                  <Link
                    key={action.id || action.url}
                    href={action.url}
                    className={clsx(
                      'inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium transition',
                      {
                        'border-white/15 bg-white/10 text-slate-100 hover:border-brand-300 hover:bg-brand-300/20':
                          theme === 'dark',
                        'border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200':
                          theme === 'light',
                      }
                    )}
                  >
                    {action.name}
                  </Link>
                ) : null
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}