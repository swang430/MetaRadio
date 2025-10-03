import Image from 'next/image';
import Link from 'next/link';

type Action = {
  id?: number | string;
  name?: string | null;
  url?: string | null;
};

type Media = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

type MediaBlockProps = {
  title: string;
  body?: string | null;
  media?: Media | null;
  orientation?: 'left' | 'right';
  actions?: Action[] | null;
};

export function MediaBlock({ title, body, media, orientation = 'left', actions }: MediaBlockProps) {
  const mediaWrapperClasses = `relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 ${
    orientation === 'right' ? 'lg:order-2' : ''
  }`;
  const textWrapperClasses = `flex flex-col justify-center ${orientation === 'right' ? 'lg:order-1' : ''}`;

  const image = media?.url ? (
    <div className={mediaWrapperClasses}>
      <Image
        src={media.url}
        alt={media.alt || 'media block image'}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  ) : (
    <div
      className={`flex h-full min-h-[240px] w-full items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white text-sm text-slate-400 ${
        orientation === 'right' ? 'lg:order-2' : ''
      }`}
    >
      媒体占位符
    </div>
  );

  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col gap-10 px-6 lg:grid lg:grid-cols-2">
        {image}
        <div className={textWrapperClasses}>
          <h2 className="text-3xl font-bold text-slate-900">{title}</h2>
          {body ? <div className="prose prose-slate mt-4" dangerouslySetInnerHTML={{ __html: body }} /> : null}
          {actions?.length ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {actions.map((action) =>
                action?.name && action?.url ? (
                  <Link
                    key={action.id || action.url}
                    href={action.url}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-900 hover:border-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    {action.name}
                  </Link>
                ) : null
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
