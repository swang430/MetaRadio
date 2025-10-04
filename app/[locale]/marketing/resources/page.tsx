import Link from 'next/link';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/navigation';
import { listResources } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function ResourcesPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const resources = await listResources(locale);
  const copy = dictionary.pages.resources;

  return (
    <div>
      <Nav locale={locale} dictionary={dictionary} />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{copy.title}</h1>
            <p className="mt-4 text-base text-slate-600">{copy.intro}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {resources.map((item) => {
              const rawUrl = item.attributes.link?.url;
              const href = localizeHref(rawUrl, locale) || rawUrl;
              const isExternal = href ? /^(https?:)?\/\//.test(href) : false;
              return (
                <article key={item.id} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{item.attributes.title}</h2>
                    {item.attributes.desc ? <p className="mt-3 text-sm text-slate-600">{item.attributes.desc}</p> : null}
                  </div>
                  {href ? (
                    <Link
                      href={href}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      {item.attributes.link?.name || copy.viewDetail}
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const copy = getDictionary(locale).pages.resources;
  return {
    title: `${copy.title} · MetaRadio`,
    description: copy.intro,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/resources' : `/${loc}/marketing/resources`])
      ),
    },
  };
}
