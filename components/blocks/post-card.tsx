import Link from 'next/link';

type PostCardProps = {
  title: string;
  excerpt?: string | null;
  href: string;
  category?: string | null;
  estimate?: number | null;
};

export function PostCard({ title, excerpt, href, category, estimate }: PostCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex-1">
        {category ? <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600">{category}</span> : null}
        <h3 className="mt-3 text-lg font-semibold text-slate-900">
          <Link href={href} className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            {title}
          </Link>
        </h3>
        {excerpt ? <p className="mt-2 text-sm text-slate-600">{excerpt}</p> : null}
      </div>
      <div className="mt-4 text-xs text-slate-500">
        {estimate ? <span>阅读 {estimate} 分钟 · </span> : null}
        <span>继续阅读 →</span>
      </div>
    </article>
  );
}
