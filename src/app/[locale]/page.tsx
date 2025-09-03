import {getTranslations} from 'next-intl/server';

export default async function Home({params}: {params: {locale: string}}) {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'Home'});

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-900 text-white">
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

      {/* Placeholder for Core Platform Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">{t('corePlatformTitle')}</h2>
          <p className="mt-4 text-gray-600">{t('corePlatformDescription')}</p>
        </div>
      </section>

      {/* Placeholder for Solutions Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">{t('solutionsTitle')}</h2>
          <p className="mt-4 text-gray-600">{t('solutionsDescription')}</p>
        </div>
      </section>

      {/* Placeholder for Customer Trust Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">{t('trustTitle')}</h2>
          <p className="mt-4 text-gray-600">{t('trustDescription')}</p>
        </div>
      </section>
    </>
  );
}
