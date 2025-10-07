import Link from 'next/link';

type PostCardProps = {
  title: string;
  excerpt?: string | null;
  href: string;
  category?: string | null;
  estimateLabel?: string | null;
  readMoreLabel?: string | null;
};

export function PostCard({ title, excerpt, href, category, estimateLabel, readMoreLabel }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-card transition hover:border-brand-400/40">
      <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
        <div className="h-full w-full bg-[radial-gradient(420px_circle_at_0%_0%,rgba(14,165,233,0.18),transparent)]" />
      </div>
      <div className="relative flex-1 space-y-3">
        {category ? (
          <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.35em] text-brand-200/80">
            {category}
          </span>
        ) : null}
        <h3 className="font-display text-xl text-white">
          <Link
            href={href}
            className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
          >
            {title}
          </Link>
        </h3>
        {excerpt ? <p className="text-sm text-slate-200/80">{excerpt}</p> : null}
      </div>
      <div className="relative mt-6 flex items-center justify-between text-xs font-semibold text-slate-300/80">
        {estimateLabel ? <span>{estimateLabel}</span> : <span />}
        <span className="inline-flex items-center gap-2 text-brand-200 group-hover:gap-3">
          {readMoreLabel || 'Continue reading'}
          <span aria-hidden className="text-sm">
            →
          </span>
        </span>
      </div>
    </article>
  );
}
