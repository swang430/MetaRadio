import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function CapabilitiesPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('capabilities', locale);
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
  const page = await getPageBySlug('capabilities', locale);
  const seo = page?.attributes.seo;
  const fallbackTitle = locale === 'en' ? 'Capabilities · MetaRadio' : '技术能力 · MetaRadio';
  const fallbackDescription =
    locale === 'en'
      ? 'Materials modeling, ray-tracing solvers, and AI closed-loop calibration for electromagnetic digital twins.'
      : '材质建模、射线追踪、AI 闭环等核心数字孪生能力。';
  return {
    title: seo?.metaTitle || fallbackTitle,
    description: seo?.metaDescription || fallbackDescription,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/capabilities' : `/${loc}/capabilities`])
      ),
    },
  };
}
