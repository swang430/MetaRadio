import { TechStep } from './tech-step';

type TechFlowProps = {
  title?: string | null;
  intro?: string | null;
  steps: Array<{
    id?: number | string;
    name: string;
    desc?: string | null;
  }>;
};

export function TechFlow({ title, intro, steps }: TechFlowProps) {
  if (!steps?.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title ? <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-600">{intro}</p> : null}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <TechStep key={step.id || step.name} index={index + 1} title={step.name} description={step.desc} />
          ))}
        </div>
      </div>
    </section>
  );
}
