import { Nav } from '@/components/nav';
import { Section } from '@/components/section';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import type { Metadata } from 'next';

export const revalidate = 180;

export default async function ContactPage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const copy = dictionary.pages.contact;

  return (
    <div>
      <Nav locale={locale} dictionary={dictionary} />
      <Section title={copy.title} intro={copy.intro}>
        <form className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm text-slate-600" htmlFor="contact-name">
                {copy.nameLabel}
              </label>
              <input
                id="contact-name"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder={copy.namePlaceholder}
              />
            </div>
            <div>
              <label className="text-sm text-slate-600" htmlFor="contact-email">
                {copy.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder={copy.emailPlaceholder}
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-slate-600" htmlFor="contact-need">
                {copy.needLabel}
              </label>
              <textarea
                id="contact-need"
                rows={4}
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                placeholder={copy.needPlaceholder}
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                {copy.privacyLabel}
              </label>
              <button
                type="button"
                className="rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {copy.submit}
              </button>
            </div>
          </div>
        </form>
      </Section>
    </div>
  );
}

export function generateMetadata({ params }: { params: { locale?: string } }): Metadata {
  const locale: Locale = resolveLocale(params?.locale);
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
