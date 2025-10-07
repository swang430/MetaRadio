import { Stat } from './stat';
import clsx from 'clsx';

type StatGroupProps = {
  title?: string | null;
  description?: string | null;
  metrics: Array<{
    id?: number | string;
    label: string;
    value: string | number;
    suffix?: string | null;
  }>;
  theme?: 'dark' | 'light';
};

export function StatGroup({ title, description, metrics, theme = 'dark' }: StatGroupProps) {
  if (!metrics?.length) return null;
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
        {description ? (
          <p
            className={clsx('mt-3 max-w-2xl text-base sm:text-lg', {
              'text-slate-200/80': theme === 'dark',
              'text-slate-600': theme === 'light',
            })}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <Stat key={(metric.id || metric.label) ?? index} {...metric} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
}