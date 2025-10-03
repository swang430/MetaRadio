export type TechStepProps = {
  index: number;
  title: string;
  description?: string | null;
};

export function TechStep({ index, title, description }: TechStepProps) {
  return (
    <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
        {index}
      </span>
      <h3 className="mt-4 text-base font-semibold text-slate-900">{title}</h3>
      {description ? <p className="mt-3 text-sm text-slate-600">{description}</p> : null}
    </div>
  );
}
