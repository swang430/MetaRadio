import {getTranslations} from 'next-intl/server';

const MimoOtaPage = async ({params}: {params: {locale: string}}) => {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'MimoOta'});

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('description')}</p>
      <div className="grid lg:grid-cols-3 gap-8 text-center">
          <div>
              <img src="/images/sw_img1.png" alt="Probe Power Contribution" className="software-img mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{t('feature1Title')}</h3>
          </div>
          <div>
              <img src="/images/sw_img2.png" alt="Cluster Angle and Probe Distribution" className="software-img mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{t('feature2Title')}</h3>
          </div>
          <div>
                <img src="/images/sw_img3.png" alt="Cluster-to-Probe Power Matrix" className="software-img mb-4" />
              <h3 className="text-lg font-semibold text-gray-800">{t('feature3Title')}</h3>
          </div>
      </div>
    </div>
  );
};

export default MimoOtaPage;
