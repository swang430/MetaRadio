import type { ReactNode } from 'react';

export function Section({
  id,
  title,
  intro,
  children,
}: {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="relative py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container relative px-6">
        <div className="max-w-3xl space-y-4">
          <span className="inline-flex h-2 w-16 items-center rounded-full bg-gradient-to-r from-brand-400 via-brand-300 to-sky-300" />
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{title}</h2>
          {intro ? <p className="text-base text-slate-200/80 sm:text-lg">{intro}</p> : null}
        </div>
        <div className="mt-10 space-y-10">{children}</div>
      </div>
    </section>
  );
}
