import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';

export const revalidate = 180;

export default async function ContactPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.contact;

  return (
    <div className="relative bg-white">
      <Nav locale={locale} dictionary={dictionary} />
      <main className="py-20">
        <div className="container px-6">
          {/* Page Header */}
          <div className="max-w-3xl space-y-4">
            <h1 className="font-display text-3xl text-slate-900 md:text-4xl">{copy.title}</h1>
            <p className="text-base text-slate-600 sm:text-lg">{copy.intro}</p>
          </div>

          {/* Form */}
          <form className="mt-12 max-w-2xl space-y-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="contact-name">
                  {copy.nameLabel}
                </label>
                <input
                  id="contact-name"
                  className="w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  placeholder={copy.namePlaceholder}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="contact-email">
                  {copy.emailLabel}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  className="w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  placeholder={copy.emailPlaceholder}
                />
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="contact-need">
                  {copy.needLabel}
                </label>
                <textarea
                  id="contact-need"
                  rows={4}
                  className="w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                  placeholder={copy.needPlaceholder}
                />
              </div>
              <div className="md:col-span-2 flex flex-col items-center justify-between gap-6 sm:flex-row">
                <label className="inline-flex items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                  />
                  {copy.privacyLabel}
                </label>
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 sm:w-auto"
                >
                  {copy.submit}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.contact;
  return {
    title: `${copy.title} · MetaRadio`,
    description: copy.intro,
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/contact' : `/${loc}/contact`])
      ),
    },
  };
}