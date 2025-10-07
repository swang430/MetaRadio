import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { listResources } from '@/lib/strapi';
import { localizeHref } from '@/lib/i18n/navigation';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function ResourcesPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const resources = await listResources(locale);
  const copy = dictionary.pages.resources;

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
      items: resources.map((item) => {
        // Defensive coding: use attributes if they exist, otherwise use the object itself.
        const attrs = item.attributes || item;
        const rawUrl = attrs.link?.url;
        const href = localizeHref(rawUrl, locale) || rawUrl;
        return {
          icon: '📄',
          title: attrs.title,
          description: attrs.desc,
          href: href,
          linkLabel: attrs.link?.name || copy.viewDetail,
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
