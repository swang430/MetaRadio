import Link from 'next/link';
import type { Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/navigation';

type CaseCardProps = {
  title: string;
  href: string;
  locale?: Locale;
  client?: string | null;
  summary?: string | null;
  viewDetailLabel?: string | null;
};

export function CaseCard({ title, href, locale, client, summary, viewDetailLabel }: CaseCardProps) {
  const localizedHref = localizeHref(href, locale) || href;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-card transition hover:border-brand-400/40">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(420px_circle_at_0%_-10%,rgba(79,70,229,0.2),transparent)]" />
      </div>
      <div className="relative flex flex-col gap-3">
        {client ? (
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-slate-200/80">
            {client}
          </p>
        ) : null}
        <h3 className="font-display text-xl text-white">
          <Link
            href={localizedHref}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
          >
            {title}
          </Link>
        </h3>
        {summary ? <p className="text-sm text-slate-200/80">{summary}</p> : null}
      </div>
      <span className="relative mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand-200/90 transition group-hover:gap-3">
        {viewDetailLabel || 'View details →'}
        <span aria-hidden className="text-base">
          →
        </span>
      </span>
    </article>
  );
}
