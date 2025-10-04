import { CaseCard } from '@/components/blocks/case-card';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { listCaseStudies } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function CasesPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const cases = await listCaseStudies(locale);
  const copy = dictionary.pages.cases;

  return (
    <div>
      <Nav locale={locale} dictionary={dictionary} />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{copy.title}</h1>
            <p className="mt-4 text-base text-slate-600">{copy.intro}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <CaseCard
                key={item.id}
                title={item.attributes.title}
                href={`/marketing/cases/${item.attributes.slug}`}
                locale={locale}
                client={item.attributes.client}
                summary={item.attributes.summary}
                viewDetailLabel={copy.viewDetail}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const copy = getDictionary(locale).pages.cases;
  return {
    title: `${copy.title} · MetaRadio`,
    description: copy.intro,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/marketing/cases' : `/${loc}/marketing/cases`])
      ),
    },
  };
}
