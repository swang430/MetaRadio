import {getTranslations} from 'next-intl/server';

const CsiSensingPage = async ({params}: {params: {locale: string}}) => {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'CsiSensing'});

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('description')}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div class="p-6 rounded-lg section-card">
              <h3 class="text-xl font-bold text-center mb-4">{t('feature1Title')}</h3>
              <p class="text-center text-sm text-gray-500 mb-6">{t('feature1Description')}</p>
          </div>
          <div class="p-6 rounded-lg section-card">
              <h3 class="text-xl font-bold text-center mb-4">{t('feature2Title')}</h3>
              <p class="text-center text-sm text-gray-500 mb-6">{t('feature2Description')}</p>
          </div>
      </div>
    </div>
  );
};

export default CsiSensingPage;
