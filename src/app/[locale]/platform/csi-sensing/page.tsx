import {getTranslations} from 'next-intl/server';

const CsiSensingPage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'CsiSensing'});

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('description')}</p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">{t('feature1Title')}</h3>
          <p>{t('feature1Description')}</p>
        </div>
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-3 text-blue-600">{t('feature2Title')}</h3>
          <p>{t('feature2Description')}</p>
        </div>
      </div>

    </div>
  );
};

export default CsiSensingPage;