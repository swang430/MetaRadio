import { SafeImage } from './safe-image';

type BeforeAfterItem = {
  id?: number | string;
  title?: string | null;
  beforeMedia?: {
    url?: string | null;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  afterMedia?: {
    url?: string | null;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  description?: string | null;
};

type BeforeAfterSectionProps = {
  title?: string | null;
  items: BeforeAfterItem[];
};

function MediaPanel({ label, media, itemTitle }: { label: string; media?: BeforeAfterItem['beforeMedia']; itemTitle?: string | null | undefined }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-200/80">
        {label}
      </span>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-card">
        {media?.url ? (
          <SafeImage
            src={media.url}
            alt={media.alt || (itemTitle ? `${label}: ${itemTitle}` : `${label} illustration`)}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-200/70">
            暂无素材
          </div>
        )}
        <span className="pointer-events-none absolute inset-4 rounded-3xl border border-white/10" />
      </div>
    </div>
  );
}

export function BeforeAfterSection({ title, items }: BeforeAfterSectionProps) {
  if (!items?.length) return null;
  return (
    <section className="relative py-20">
      <div className="container px-6">
        {title ? <h2 className="font-display text-3xl text-white md:text-4xl">{title}</h2> : null}
        <div className="mt-12 grid gap-14">
          {items.map((item, index) => (
            <div key={item.id || index} className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-3">
                {item.title ? <h3 className="font-display text-2xl text-white">{item.title}</h3> : null}
                {item.description ? (
                  <p className="text-sm text-slate-200/75 sm:text-base">{item.description}</p>
                ) : null}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <MediaPanel label="Before" media={item.beforeMedia} itemTitle={item.title} />
                <MediaPanel label="After" media={item.afterMedia} itemTitle={item.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
