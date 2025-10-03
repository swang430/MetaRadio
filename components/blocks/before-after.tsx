import Image from 'next/image';

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

function MediaPanel({ label, media }: { label: string; media?: BeforeAfterItem['beforeMedia'] }) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</span>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        {media?.url ? (
          <Image
            src={media.url}
            alt={media.alt || `${label} illustration`}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">暂无素材</div>
        )}
      </div>
    </div>
  );
}

export function BeforeAfterSection({ title, items }: BeforeAfterSectionProps) {
  if (!items?.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title ? <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2> : null}
        <div className="mt-10 grid gap-12">
          {items.map((item, index) => (
            <div key={item.id || index} className="grid gap-8 lg:grid-cols-2">
              <div>
                {item.title ? <h3 className="text-2xl font-semibold text-slate-900">{item.title}</h3> : null}
                {item.description ? (
                  <p className="mt-3 text-sm text-slate-600">{item.description}</p>
                ) : null}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <MediaPanel label="Before" media={item.beforeMedia} />
                <MediaPanel label="After" media={item.afterMedia} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
