type DiagramTranslations = {
  networkTitle: string;
  networkDescription: string;
  environmentTitle: string;
  environmentDescription: string;
  interfaceTitle: string;
  interfaceDescription: string;
  automationTitle: string;
  automationDescription: string;
  conversionTitle: string;
  conversionDescription: string;
};

type DiagramProps = {
  translations: DiagramTranslations;
};

const HorizonOneDiagram = ({ translations }: DiagramProps) => {
  const modules = [
    { id: 'network', title: translations.networkTitle, description: translations.networkDescription, icon: '📡' },
    { id: 'environment', title: translations.environmentTitle, description: translations.environmentDescription, icon: '🌍' },
    { id: 'interface', title: translations.interfaceTitle, description: translations.interfaceDescription, icon: '🔌' },
    { id: 'automation', title: translations.automationTitle, description: translations.automationDescription, icon: '🤖' },
    { id: 'conversion', title: translations.conversionTitle, description: translations.conversionDescription, icon: '🔄' },
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
