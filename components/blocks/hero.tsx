import Image from 'next/image';
import Link from 'next/link';

type Action = {
  name?: string | null;
  url?: string | null;
};

type Media = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type HeroProps = {
  headline: string;
  subhead?: string | null;
  summary?: string | null;
  primaryAction?: Action | null;
  secondaryAction?: Action | null;
  media?: Media | null;
};

export function Hero({ headline, subhead, summary, primaryAction, secondaryAction, media }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto grid gap-12 px-6 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
            {headline}
            {subhead ? <span className="mt-3 block text-indigo-600 md:text-6xl">{subhead}</span> : null}
          </h1>
          {summary ? <p className="mt-6 text-lg text-slate-600">{summary}</p> : null}
          <div className="mt-8 flex flex-wrap gap-4">
            {primaryAction?.name && primaryAction?.url ? (
              <Link
                href={primaryAction.url}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {primaryAction.name}
              </Link>
            ) : null}
            {secondaryAction?.name && secondaryAction?.url ? (
              <Link
                href={secondaryAction.url}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              >
                {secondaryAction.name}
              </Link>
            ) : null}
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-indigo-500/10 via-white to-sky-400/10 shadow-sm">
            {media?.url ? (
              <Image
                src={media.url}
                alt={media.alt || 'Hero illustration'}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center p-10 text-center text-sm text-slate-500">
                <span>可替换为媒体资源</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
