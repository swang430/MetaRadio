import HorizonOneDiagram from '@/components/solutions/HorizonOneDiagram';
import {getTranslations} from 'next-intl/server';

const VirtualDriveTestingPage = async ({ params: { locale } }: { params: { locale: string } }) => {
  const t = await getTranslations({locale, namespace: 'VirtualDriveTesting'});

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('description')}</p>

      {/* The Challenge Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">{t('challengeTitle')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-red-600">{t('challenge1Title')}</h3>
            <p>{t('challenge1Description')}</p>
          </div>
          <div className="card p-6">
            <h3 className="text-xl font-semibold mb-3 text-red-600">{t('challenge2Title')}</h3>
            <p>{t('challenge2Description')}</p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">{t('solutionTitle')}</h2>
          <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('solutionDescription')}</p>
          <HorizonOneDiagram translations={{
            networkTitle: t('diagram.networkTitle'),
            networkDescription: t('diagram.networkDescription'),
            environmentTitle: t('diagram.environmentTitle'),
            environmentDescription: t('diagram.environmentDescription'),
            interfaceTitle: t('diagram.interfaceTitle'),
            interfaceDescription: t('diagram.interfaceDescription'),
            automationTitle: t('diagram.automationTitle'),
            automationDescription: t('diagram.automationDescription'),
            conversionTitle: t('diagram.conversionTitle'),
            conversionDescription: t('diagram.conversionDescription'),
          }} />
        </div>
      </section>

      {/* The Workflow Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8">{t('workflowTitle')}</h2>
        <div className="grid md:grid-cols-3 gap-4 items-start">
          {/* Step 1 */}
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="text-xl font-semibold mb-3">{t('step1Title')}</h3>
            <p className="text-sm text-gray-600">{t('step1Description')}</p>
          </div>

          <div className="text-center text-4xl text-gray-300 mt-16">→</div>

          {/* Step 2 */}
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="text-xl font-semibold mb-3">{t('step2Title')}</h3>
            <p className="text-sm text-gray-600">{t('step2Description')}</p>
            <ul className="text-xs mt-3 space-y-1 list-disc list-inside text-left">
              <li>{t('step2Detail1')}</li>
              <li>{t('step2Detail2')}</li>
              <li>{t('step2Detail3')}</li>
            </ul>
          </div>

          <div className="text-center text-4xl text-gray-300 mt-16">→</div>

          {/* Step 3 */}
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="text-xl font-semibold mb-3">{t('step3Title')}</h3>
            <p className="text-sm text-gray-600">{t('step3Description')}</p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">{t('benefitsTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">{t('benefit1Title')}</h3>
              <p>{t('benefit1Description')}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">{t('benefit2Title')}</h3>
              <p>{t('benefit2Description')}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-3">{t('benefit3Title')}</h3>
              <p>{t('benefit3Description')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualDriveTestingPage;
