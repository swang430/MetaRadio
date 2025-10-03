import Link from 'next/link';

type CTAItem = {
  id?: number | string;
  name?: string | null;
  url?: string | null;
};

type CTABannerProps = {
  title: string;
  description?: string | null;
  items?: CTAItem[] | null;
};

export function CTABanner({ title, description, items }: CTABannerProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="rounded-3xl bg-indigo-600 px-8 py-12 text-white shadow-lg">
          <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
          {description ? <p className="mt-4 max-w-2xl text-base text-indigo-100">{description}</p> : null}
          {items?.length ? (
            <div className="mt-8 flex flex-wrap gap-4">
              {items.map((item) =>
                item?.name && item?.url ? (
                  <Link
                    key={item.id || item.url}
                    href={item.url}
                    className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-indigo-600 shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {item.name}
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
