type StatProps = {
  label: string;
  value: string | number;
  suffix?: string | null;
};

export function Stat({ label, value, suffix }: StatProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-3xl font-bold text-indigo-600">
        {value}
        {suffix ? <span className="ml-1 text-xl text-slate-500">{suffix}</span> : null}
      </p>
      <p className="mt-2 text-sm text-slate-600">{label}</p>
    </div>
  );
}
