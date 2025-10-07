import clsx from 'clsx';

export type TechStepProps = {
  index: number;
  title: string;
  description?: string | null;
  theme?: 'dark' | 'light';
};

export function TechStep({ index, title, description, theme = 'dark' }: TechStepProps) {
  return (
    <div
      className={clsx(
        'group relative rounded-3xl p-6 pt-9 shadow-card transition',
        {
          'border border-slate-700 bg-slate-800 hover:border-brand-300/40': theme === 'dark',
          'border border-slate-200 bg-white hover:border-brand-500 hover:shadow-lg': theme === 'light',
        }
      )}
    >
      <span className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-sky-400 text-sm font-semibold text-white shadow-glow">
        {String(index).padStart(2, '0')}
      </span>
      <h3 className={clsx('font-display text-lg', { 'text-white': theme === 'dark', 'text-slate-900': theme === 'light' })}>{title}</h3>
      {description ? (
        <p className={clsx('mt-3 text-sm', { 'text-slate-200/80': theme === 'dark', 'text-slate-600': theme === 'light' })}>
          {description}
        </p>
      ) : null}
    </div>
  );
}