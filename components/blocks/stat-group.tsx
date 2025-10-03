import { Stat } from './stat';

type StatGroupProps = {
  title?: string | null;
  description?: string | null;
  metrics: Array<{
    id?: number | string;
    label: string;
    value: string | number;
    suffix?: string | null;
  }>;
};

export function StatGroup({ title, description, metrics }: StatGroupProps) {
  if (!metrics?.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title ? <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2> : null}
        {description ? <p className="mt-3 max-w-2xl text-base text-slate-600">{description}</p> : null}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((metric, index) => (
            <Stat key={(metric.id || metric.label) ?? index} {...metric} />
          ))}
        </div>
      </div>
    </section>
  );
}
