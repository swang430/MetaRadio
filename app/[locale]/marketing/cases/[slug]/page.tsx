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
    <div className="relative">
      <Nav locale={locale} dictionary={dictionary} />
      <main className="relative space-y-24 pb-24">
        <section className="relative py-20">
          <div className="container px-6">
            <div className="max-w-3xl space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-brand-200/80">
                {client || copy.clientFallback}
              </span>
              <h1 className="font-display text-3xl text-white md:text-4xl lg:text-[2.75rem]">{title}</h1>
              {summary ? <p className="text-base text-slate-200/80 sm:text-lg">{summary}</p> : null}
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="container grid gap-12 px-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-2xl text-white">{copy.challenge}</h2>
                {renderRich(challenge) || (
                  <p className="mt-4 text-sm text-slate-200/75">{copy.contentFallback}</p>
                )}
              </div>
              <div>
                <h2 className="font-display text-2xl text-white">{copy.approach}</h2>
                {renderRich(approach) || (
                  <p className="mt-4 text-sm text-slate-200/75">{copy.contentFallback}</p>
                )}
              </div>
              <div>
                <h2 className="font-display text-2xl text-white">{copy.result}</h2>
                {renderRich(result) || (
                  <p className="mt-4 text-sm text-slate-200/75">{copy.contentFallback}</p>
                )}
              </div>
            </div>
            <aside className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card">
                <h3 className="font-display text-lg text-white">{copy.metricsHeading}</h3>
                <ul className="mt-6 space-y-3">
                  {kpi?.length
                    ? kpi.map((metric) => (
                        <li key={metric.label} className="flex items-baseline justify-between text-sm text-slate-200/80">
                          <span>{metric.label}</span>
                          <span className="font-display text-2xl text-brand-200">
                            {metric.value}
                            {metric.unit ? <span className="ml-1 text-sm text-slate-300/70">{metric.unit}</span> : null}
                          </span>
                        </li>
                      ))
                    : null}
                </ul>
                {!kpi?.length ? <p className="text-sm text-slate-400/80">{copy.metricsFallback}</p> : null}
              </div>
            </aside>
          </div>
        </section>
      </main>
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
