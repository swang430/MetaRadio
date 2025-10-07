import { TechStep } from './tech-step';
import clsx from 'clsx';

type TechFlowProps = {
  title?: string | null;
  intro?: string | null;
  steps: Array<{
    id?: number | string;
    name: string;
    desc?: string | null;
  }>;
  theme?: 'dark' | 'light';
};

export function TechFlow({ title, intro, steps, theme = 'dark' }: TechFlowProps) {
  if (!steps?.length) return null;
  return (
    <section
      className={clsx('relative py-20', {
        'bg-dark-background': theme === 'dark',
        'bg-slate-50': theme === 'light',
      })}
    >
      <div className="container px-6">
        {title ? (
          <h2
            className={clsx('text-center font-display text-3xl md:text-4xl', {
              'text-white': theme === 'dark',
              'text-slate-900': theme === 'light',
            })}
          >
            {title}
          </h2>
        ) : null}
        {intro ? (
          <p
            className={clsx('mx-auto mt-3 max-w-2xl text-center text-base sm:text-lg', {
              'text-slate-200/75': theme === 'dark',
              'text-slate-600': theme === 'light',
            })}
          >
            {intro}
          </p>
        ) : null}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <TechStep
              key={step.id || step.name}
              index={index + 1}
              title={step.name}
              description={step.desc}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}