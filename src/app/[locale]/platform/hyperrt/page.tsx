import {getTranslations} from 'next-intl/server';
import React from 'react';

const MetaSimPage = async ({params}: {params: {locale: string}}) => {
  const {locale} = params;
  const t = await getTranslations({locale, namespace: 'MetaSim'});

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">
        {t('pageTitle')}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('aboutTitle')}</h2>
          <p className="text-gray-700 leading-relaxed">
            {t('aboutDescription')}
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">{t('featuresTitle')}</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>{t('feature1')}</li>
            <li>{t('feature2')}</li>
            <li>{t('feature3')}</li>
            <li>{t('feature4')}</li>
            <li>{t('feature5')}</li>
          </ul>
        </div>
        <div>
          {/* Placeholder for a high-quality product image */}
          <div className="bg-gray-200 w-full h-80 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">{t('imagePlaceholder')}</p>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">{t('specsTitle')}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-left">{t('specFeature')}</th>
                <th className="py-3 px-4 border-b text-left">{t('specSpecification')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">{t('specFreqBands')}</td>
                <td className="py-3 px-4 border-b">{t('specFreqBandsValue')}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">{t('specScale')}</td>
                <td className="py-3 px-4 border-b">{t('specScaleValue')}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">{t('specDeployment')}</td>
                <td className="py-3 px-4 border-b">{t('specDeploymentValue')}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">{t('specInput')}</td>
                <td className="py-3 px-4 border-b">{t('specInputValue')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MetaSimPage;
