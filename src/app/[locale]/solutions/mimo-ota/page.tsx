import {getTranslations} from 'next-intl/server';

const MimoOtaPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const t = await getTranslations({locale, namespace: 'MimoOta'});

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('description')}</p>

      {/* The Challenge Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">{t('challengeTitle')}</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">{t('challengeDescription')}</p>
      </section>

      {/* The Solution Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">{t('solutionTitle')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">{t('solutionDescription')}</p>
        </div>
      </section>

      {/* Software Showcase Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">{t('softwareTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <img src="/images/sw_img1.png" alt={t('feature1Title')} className="software-img mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{t('feature1Title')}</h3>
          </div>
          <div>
            <img src="/images/sw_img2.png" alt={t('feature2Title')} className="software-img mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{t('feature2Title')}</h3>
          </div>
          <div>
            <img src="/images/sw_img3.png" alt={t('feature3Title')} className="software-img mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{t('feature3Title')}</h3>
          </div>
        </div>
      </section>

      {/* Hardware Ecosystem Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">{t('hardwareTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg text-gray-600 mb-4">{t('hardwareDescription')}</p>
            </div>
            <div className="max-w-sm mx-auto">
              <img src="/images/sw_img4.png" alt={t('hardwareImageAlt')} className="software-img" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MimoOtaPage;