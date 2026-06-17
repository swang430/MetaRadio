import {getTranslations} from 'next-intl/server';
import React from 'react';

const RaySensePage = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'RaySense'});

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
                <th className="py-3 px-4 border-b text-left">{t('specParameter')}</th>
                <th className="py-3 px-4 border-b text-left">{t('specSpecification')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 border-b">{t('specFreqRange')}</td>
                <td className="py-3 px-4 border-b">{t('specFreqRangeValue')}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">{t('specBandwidth')}</td>
                <td className="py-3 px-4 border-b">{t('specBandwidthValue')}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">{t('specPorts')}</td>
                <td className="py-3 px-4 border-b">{t('specPortsValue')}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 border-b">{t('specDimensions')}</td>
                <td className="py-3 px-4 border-b">{t('specDimensionsValue')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8">{t('mvsWorkflowTitle')}</h2>
        <div className="content-box flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          <div className="text-center"><div className="bg-blue-100 text-blue-800 rounded-full h-20 w-20 flex items-center justify-center mx-auto text-3xl">🗺️</div><p className="mt-2 font-semibold">{t('mvsStep1')}</p></div>
          <div className="text-2xl text-gray-400 transform rotate-90 md:rotate-0">→</div>
          <div className="text-center"><div className="bg-green-100 text-green-800 rounded-full h-20 w-20 flex items-center justify-center mx-auto text-3xl">📡</div><p className="mt-2 font-semibold">{t('mvsStep2')}</p></div>
          <div className="text-2xl text-gray-400 transform rotate-90 md:rotate-0">→</div>
          <div className="text-center"><div className="bg-yellow-100 text-yellow-800 rounded-full h-20 w-20 flex items-center justify-center mx-auto text-3xl">⚙️</div><p className="mt-2 font-semibold">{t('mvsStep3')}</p></div>
          <div className="text-2xl text-gray-400 transform rotate-90 md:rotate-0">→</div>
            <div className="text-center"><div className="bg-purple-100 text-purple-800 rounded-full h-20 w-20 flex items-center justify-center mx-auto text-3xl">🖥️</div><p className="mt-2 font-semibold">{t('mvsStep4')}</p></div>
        </div>
      </div>
    </div>
  );
};

export default RaySensePage;
