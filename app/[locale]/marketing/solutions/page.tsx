import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { resolveLocale, type Locale } from '@/lib/i18n/config';
import { listSolutions } from '@/lib/strapi';
import { localizeHref } from '@/lib/i18n/navigation';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function SolutionsIndex({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const solutions = await listSolutions(locale);
  const copy = dictionary.pages.solutions;

  // Transform the fetched data into the format our BlocksRenderer expects.
  const blocks = [
    {
      __component: 'hero.hero',
      theme: 'dark',
      headline: copy.title,
      summary: copy.intro,
    },
    {
      __component: 'sections.feature-grid',
      theme: 'light',
      items: solutions.map((solution) => {
        // Defensive coding: use attributes if they exist, otherwise use the object itself.
        const attrs = solution.attributes || solution;
        const href = localizeHref(`/marketing/solutions/${attrs.slug}`, locale) || `/marketing/solutions/${attrs.slug}`;
        return {
          icon: '💡',
          title: attrs.title,
          description: attrs.excerpt,
          href: href,
          linkLabel: copy.learnMore,
        };
      }),
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
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.solutions;
  return {
    title: `${copy.title} · MetaRadio`,
    description: copy.intro,
    alternates: {
      languages: {
        zh: '/marketing/solutions',
        en: '/en/marketing/solutions',
      },
    },
  };
}
