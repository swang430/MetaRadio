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
    <article className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div>
        {client ? <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">{client}</p> : null}
        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          <Link
            href={localizedHref}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            {title}
          </Link>
        </h3>
        {summary ? <p className="mt-2 text-sm text-slate-600">{summary}</p> : null}
      </div>
      <span className="mt-4 text-xs font-medium text-indigo-600">
        {viewDetailLabel || 'View details →'}
      </span>
    </article>
  );
}
