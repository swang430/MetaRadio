import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 180;

export default async function AboutPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('company', locale);
  const blocks = page?.attributes.blocks || [];

  return (
    <div>
      <Nav locale={locale} dictionary={dictionary} />
      <BlocksRenderer blocks={blocks} locale={locale} dictionary={dictionary} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const page = await getPageBySlug('company', locale);
  const seo = page?.attributes.seo;
  const fallbackTitle = locale === 'en' ? 'About MetaRadio' : '关于 MetaRadio';
  const fallbackDescription =
    locale === 'en'
      ? 'MetaRadio pioneers ray-tracing based channel intelligence for communications, automotive, and emerging industries.'
      : 'MetaRadio 聚焦射线跟踪法，为通信、汽车与新兴行业提供通道能力与虚拟路测方案。';
  return {
    title: seo?.metaTitle || fallbackTitle,
    description: seo?.metaDescription || fallbackDescription,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/company' : `/${loc}/company`])
      ),
    },
  };
}
