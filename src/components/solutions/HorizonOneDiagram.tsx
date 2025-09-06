'use client';

import { useTranslations } from 'next-intl';

const HorizonOneDiagram = () => {
  const t = useTranslations('VirtualDriveTesting.diagram');

  const modules = [
    { id: 'network', title: t('networkTitle'), description: t('networkDescription'), icon: '📡' },
    { id: 'environment', title: t('environmentTitle'), description: t('environmentDescription'), icon: '🌍' },
    { id: 'interface', title: t('interfaceTitle'), description: t('interfaceDescription'), icon: '🔌' },
    { id: 'automation', title: t('automationTitle'), description: t('automationDescription'), icon: '🤖' },
    { id: 'conversion', title: t('conversionTitle'), description: t('conversionDescription'), icon: '🔄' },
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Core Modules */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {modules.slice(0, 4).map((module) => (
            <div key={module.id} className="flex items-start">
              <div className="text-3xl mr-4">{module.icon}</div>
              <div>
                <h4 className="font-bold text-lg">{module.title}</h4>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Side Module */}
        <div className="flex items-start p-6 bg-blue-50 rounded-lg">
          <div className="text-3xl mr-4">{modules[4].icon}</div>
          <div>
            <h4 className="font-bold text-lg">{modules[4].title}</h4>
            <p className="text-sm text-gray-600">{modules[4].description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizonOneDiagram;
