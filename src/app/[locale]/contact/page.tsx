import { getTranslations } from 'next-intl/server';
import { CinematicHero } from '@/components/layout/CinematicHero';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  return (
    <div className="flex flex-col">
      {/* Hero — 全站统一影院式（满幅电磁射线场） */}
      <CinematicHero title={t('pageTitle')} sub={t('description')} minHClass="min-h-[48vh]" />

      <section className="bg-brand-ink">
        <div className="container mx-auto max-w-4xl px-6 py-16">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-white/10 bg-brand-surface p-8">
              <h2 className="mb-2 text-xl font-semibold text-white">{t('emailTitle')}</h2>
              <a href={`mailto:${t('email')}`} className="break-all text-brand-cyan hover:underline">
                {t('email')}
              </a>
            </div>
            <div className="rounded-lg border border-white/10 bg-brand-surface p-8">
              <h2 className="mb-2 text-xl font-semibold text-white">{t('phoneTitle')}</h2>
              <p className="text-slate-300">{t('phone')}</p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border border-brand-cyan/30 bg-brand-surface p-10 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">{t('ctaTitle')}</h2>
            <p className="mb-6 text-slate-300">{t('ctaDescription')}</p>
            <a
              href={`mailto:${t('email')}`}
              className="inline-block rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110"
            >
              {t('ctaTitle')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
