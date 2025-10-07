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
    <div className="relative">
      <Nav locale={locale} dictionary={dictionary} />
      <Section title={copy.title} intro={copy.intro}>
        <form className="max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-card backdrop-blur">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70" htmlFor="contact-name">
                {copy.nameLabel}
              </label>
              <input
                id="contact-name"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
                placeholder={copy.namePlaceholder}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70" htmlFor="contact-email">
                {copy.emailLabel}
              </label>
              <input
                id="contact-email"
                type="email"
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
                placeholder={copy.emailPlaceholder}
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300/70" htmlFor="contact-need">
                {copy.needLabel}
              </label>
              <textarea
                id="contact-need"
                rows={4}
                className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-400/40"
                placeholder={copy.needPlaceholder}
              />
            </div>
            <div className="md:col-span-2 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-3 text-sm text-slate-200/80">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-white/20 bg-white/10 text-brand-400 focus:ring-brand-300"
                />
                {copy.privacyLabel}
              </label>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-200"
              >
                {copy.submit}
                <span aria-hidden>→</span>
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
