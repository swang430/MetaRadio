import Link from 'next/link';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { listSolutions } from '@/lib/strapi';
import { localizeHref } from '@/lib/i18n/navigation';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function SolutionsIndex({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const solutions = await listSolutions(locale);
  const copy = dictionary.pages.solutions;

  return (
    <div>
      <Nav locale={locale} dictionary={dictionary} />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{copy.title}</h1>
            <p className="mt-4 text-base text-slate-600">{copy.intro}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={localizeHref(`/marketing/solutions/${solution.attributes.slug}`, locale) || `/marketing/solutions/${solution.attributes.slug}`}
                className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
              >
                <h2 className="text-lg font-semibold text-slate-900">{solution.attributes.title}</h2>
                {solution.attributes.excerpt ? (
                  <p className="mt-3 text-sm text-slate-600">{solution.attributes.excerpt}</p>
                ) : null}
                <span className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600">
                  {copy.learnMore}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.solutions;
  return {
    title: `${copy.title} · MetaRadio`,
    description: copy.intro,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/solutions' : `/${loc}/marketing/solutions`])
      ),
    },
  };
}
