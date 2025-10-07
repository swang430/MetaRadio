import { BlocksRenderer } from '@/components/blocks/renderer';
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

  // Transform the fetched data into the format our BlocksRenderer expects.
  const blocks = [
    {
      __component: 'hero.hero',
      theme: 'dark',
      headline: copy.title,
      summary: copy.intro,
    },
    {
      __component: 'sections.case-showcase',
      theme: 'light',
      title: '',
      intro: '',
      // Defensive coding: use attributes if they exist, otherwise use the object itself.
      cases: cases.map((item) => item.attributes || item),
    },
  ];

  return (
    <div className="relative bg-white">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={blocks} locale={locale} dictionary={dictionary} />
      </main>
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
