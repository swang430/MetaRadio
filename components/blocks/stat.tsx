import clsx from 'clsx';

type StatProps = {
  label: string;
  value: string | number;
  suffix?: string | null;
  theme?: 'dark' | 'light';
};

export function Stat({ label, value, suffix, theme = 'dark' }: StatProps) {
  return (
    <div
      className={clsx('group relative overflow-hidden rounded-3xl p-7 shadow-card transition', {
        'border border-slate-700 bg-slate-800 hover:border-brand-400/40': theme === 'dark',
        'border border-slate-200 bg-white hover:border-brand-500 hover:shadow-lg': theme === 'light',
      })}
    >
      <div
        className={clsx('pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100', {
          'bg-[radial-gradient(400px_circle_at_0%_0%,rgba(129,140,248,0.25),transparent)]': theme === 'dark',
          'bg-[radial-gradient(400px_circle_at_0%_0%,rgba(129,140,248,0.1),transparent)]': theme === 'light',
        })}
      />
      <div className="relative flex flex-col gap-3">
        <span
          className={clsx('text-xs uppercase tracking-[0.3em]', {
            'text-slate-300/60': theme === 'dark',
            'text-slate-500': theme === 'light',
          })}
        >
          {label}
        </span>
        <p
          className={clsx('font-display text-4xl sm:text-5xl', {
            'text-white': theme === 'dark',
            'text-slate-900': theme === 'light',
          })}
        >
          {value}
          {suffix ? (
            <span
              className={clsx('ml-2 align-baseline text-lg', {
                'text-slate-200/70': theme === 'dark',
                'text-slate-500': theme === 'light',
              })}
            >
              {suffix}
            </span>
          ) : null}
        </p>
      </div>
    </div>
  );
}