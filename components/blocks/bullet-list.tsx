import { Bullet, type BulletProps } from './bullet';
import clsx from 'clsx';

type BulletListProps = {
  title?: string | null;
  intro?: string | null;
  items: Omit<BulletProps, 'theme'>[];
  theme?: 'dark' | 'light';
};

export function BulletList({ title, intro, items, theme = 'dark' }: BulletListProps) {
  if (!items?.length) return null;
  return (
    <section
      className={clsx('relative py-20', {
        'bg-dark-background': theme === 'dark',
        'bg-white': theme === 'light',
      })}
    >
      <div className="container px-6">
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
              'text-slate-200/80': theme === 'dark',
              'text-slate-600': theme === 'light',
            })}
          >
            {intro}
          </p>
        ) : null}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Bullet key={item.title + index} {...item} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}