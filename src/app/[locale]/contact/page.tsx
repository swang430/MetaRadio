import { getTranslations } from 'next-intl/server';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });

  return (
    <div className="container mx-auto px-6 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-slate-300 max-w-2xl mx-auto mb-12">{t('description')}</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-brand-surface border border-white/10 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{t('emailTitle')}</h2>
          <a href={`mailto:${t('email')}`} className="text-brand-cyan hover:underline break-all">
            {t('email')}
          </a>
        </div>
        <div className="bg-brand-surface border border-white/10 p-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{t('phoneTitle')}</h2>
          <p className="text-slate-300">{t('phone')}</p>
        </div>
      </div>

      <div className="mt-12 text-center bg-gradient-to-br from-blue-900 to-teal-600 text-white p-10 rounded-2xl">
        <h2 className="text-2xl font-bold mb-2">{t('ctaTitle')}</h2>
        <p className="mb-6 text-white/80">{t('ctaDescription')}</p>
        <a
          href={`mailto:${t('email')}`}
          className="inline-block bg-white text-blue-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {t('ctaTitle')}
        </a>
      </div>
    </div>
  );
}
