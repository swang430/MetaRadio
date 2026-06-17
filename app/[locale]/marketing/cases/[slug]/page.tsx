import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getCaseStudyBySlug, listCaseStudies } from '@/lib/strapi';
import type { Metadata } from 'next';
import type { BlockInput } from '@/lib/strapi-types';
import { notFound } from 'next/navigation';

type CasePageProps = {
  params: { locale?: string; slug: string };
};

export default async function CasePage({ params }: CasePageProps) {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.caseDetail;
  const caseStudy = await getCaseStudyBySlug(params.slug, locale);
  if (!caseStudy) notFound();

  // Defensive coding: use attributes if they exist, otherwise use the object itself.
  const attrs = caseStudy.attributes || caseStudy;
  const { title, client, summary, challenge, approach, result, kpi } = attrs;

  // Transform the page data into a blocks array
  const blocks: BlockInput[] = [
    {
      __component: 'hero.hero',
      theme: 'dark',
      headline: title,
      subhead: client || copy.clientFallback,
      summary: summary,
    },
    {
      __component: 'content.media-block',
      theme: 'light',
      title: copy.challenge,
      body: challenge,
    },
    {
      __component: 'content.media-block',
      theme: 'dark',
      title: copy.approach,
      body: approach,
      orientation: 'right',
    },
    {
      __component: 'content.media-block',
      theme: 'light',
      title: copy.result,
      body: result,
    },
  ];

  // Add KPI stats as a separate block if they exist
  if (kpi && kpi.length > 0) {
    blocks.push({
      __component: 'sections.stat-group',
      theme: 'dark',
      title: copy.metricsHeading,
      metrics: kpi.map((metric: any) => ({
        ...metric,
        suffix: metric.unit,
      })),
    });
  }

  return (
    <div className="relative bg-white">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={blocks} locale={locale} dictionary={dictionary} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const locale: Locale = resolveLocale(params.locale);
  const caseStudy = await getCaseStudyBySlug(params.slug, locale);
  if (!caseStudy) return { title: 'MetaRadio' };

  const attrs = caseStudy.attributes || caseStudy;
  const { title, summary } = attrs;

  return {
    title: locale === 'en' ? `${title} · Case Study` : `${title} · 成功案例`,
    description: summary || null,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? `/marketing/cases/${attrs.slug}` : `/${loc}/marketing/cases/${attrs.slug}`])
      ),
    },
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of SUPPORTED_LOCALES) {
    const cases = await listCaseStudies(locale as Locale);
    cases.forEach((item) => {
      // Defensive coding: use attributes if they exist, otherwise use the object itself.
      const attrs = item.attributes || item;
      if (attrs.slug) {
        params.push({ locale, slug: attrs.slug });
      }
    });
  }
  return params;
}