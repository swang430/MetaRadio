import {getTranslations} from 'next-intl/server';

export default async function Home({params}: {params: {locale: string}}) {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'Home'});

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white">
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg">
              {t('requestDemo')}
            </button>
          </div>
        </div>
      </section>

      {/* Core Platform Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">{t('corePlatformTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{t('hyperRtTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('hyperRtDescription')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{t('raysenseTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('raysenseDescription')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{t('csiSensingTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('csiSensingDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">{t('solutionsTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{t('virtualDriveTestTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('virtualDriveTestDescription')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{t('mimoOtaTitle')}</h3>
              <p className="mt-2 text-gray-600">{t('mimoOtaDescription')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">{t('trustTitle')}</h2>
          <div className="flex justify-center items-center space-x-8 mt-8">
            <img src="/images/keysight-logo.png" alt="Keysight" className="h-12" />
            <img src="/images/spirent-logo.png" alt="Spirent" className="h-12" />
            <img src="/images/ceyear-logo.png" alt="Ceyear" className="h-12" />
            <img src="/images/k-h-logo.png" alt="K-H" className="h-12" />
          </div>
        </div>
      </section>
    </>
  );
}
