import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getCaseStudyBySlug, listCaseStudies } from '@/lib/strapi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

function renderRich(text?: string | null) {
  if (!text) return null;
  return <div className="prose prose-slate" dangerouslySetInnerHTML={{ __html: text }} />;
}

type CasePageProps = {
  params: { locale?: string; slug: string };
};

export default async function CasePage({ params }: CasePageProps) {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.caseDetail;
  const caseStudy = await getCaseStudyBySlug(params.slug, locale);
  if (!caseStudy) notFound();
  const { title, client, summary, challenge, approach, result, kpi } = caseStudy.attributes;

  return (
    <div>
      <Nav locale={locale} dictionary={dictionary} />
      <section className="bg-slate-50 py-12">
        <div className="container mx-auto px-6">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
            {client || copy.clientFallback}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
          {summary ? <p className="mt-4 max-w-2xl text-base text-slate-600">{summary}</p> : null}
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto grid gap-12 px-6 lg:grid-cols-[2fr,1fr]">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.challenge}</h2>
              {renderRich(challenge) || (
                <p className="mt-3 text-sm text-slate-600">{copy.contentFallback}</p>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.approach}</h2>
              {renderRich(approach) || (
                <p className="mt-3 text-sm text-slate-600">{copy.contentFallback}</p>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{copy.result}</h2>
              {renderRich(result) || (
                <p className="mt-3 text-sm text-slate-600">{copy.contentFallback}</p>
              )}
            </div>
          </div>
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{copy.metricsHeading}</h3>
              <ul className="mt-4 space-y-3">
                {kpi?.length
                  ? kpi.map((metric) => (
                      <li key={metric.label} className="flex items-baseline justify-between text-sm text-slate-600">
                        <span>{metric.label}</span>
                        <span className="text-xl font-semibold text-indigo-600">
                          {metric.value}
                          {metric.unit ? <span className="ml-1 text-sm text-slate-500">{metric.unit}</span> : null}
                        </span>
                      </li>
                    ))
                  : null}
              </ul>
              {!kpi?.length ? <p className="text-sm text-slate-500">{copy.metricsFallback}</p> : null}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

export async function generateMetadata({ params }: CasePageProps): Promise<Metadata> {
  const locale: Locale = resolveLocale(params.locale);
  const caseStudy = await getCaseStudyBySlug(params.slug, locale);
  if (!caseStudy) return { title: 'MetaRadio' };
  const { title, summary } = caseStudy.attributes;
  return {
    title: locale === 'en' ? `${title} · Case Study` : `${title} · 成功案例`,
    description: summary || undefined,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [
          loc,
          loc === 'zh'
            ? `/marketing/cases/${caseStudy.attributes.slug}`
            : `/${loc}/marketing/cases/${caseStudy.attributes.slug}`,
        ])
      ),
    },
  };
}

export async function generateStaticParams() {
  const locales = SUPPORTED_LOCALES;
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    const cases = await listCaseStudies(locale as Locale);
    cases
      .filter((item) => item?.attributes?.slug)
      .forEach((item) => {
        params.push({ locale, slug: item.attributes.slug });
      });
  }
  return params;
}
