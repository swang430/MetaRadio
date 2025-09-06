'use client';

import { getTranslations, useTranslations } from 'next-intl';
import { useEffect, useState, useRef } from 'react';

const MvsWorkflowPage = () => {
  const t = useTranslations('MvsWorkflow');
  const [activeStep, setActiveStep] = useState('measure');
  const stepRefs = {
    measure: useRef<HTMLDivElement>(null),
    model: useRef<HTMLDivElement>(null),
    simulate: useRef<HTMLDivElement>(null),
    validate: useRef<HTMLDivElement>(null),
  };

  const workflowSteps = [
    { id: 'measure', title: t('step1Title'), description: t('step1Description'), icon: '📡' },
    { id: 'model', title: t('step2Title'), description: t('step2Description'), icon: '🗺️' },
    { id: 'simulate', title: t('step3Title'), description: t('step3Description'), icon: '⚙️' },
    { id: 'validate', title: t('step4Title'), description: t('step4Description'), icon: '🖥️' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      let currentStep = '';

      for (const step of workflowSteps) {
        const ref = stepRefs[step.id as keyof typeof stepRefs];
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          // Check if the step is in the middle of the viewport
          if (rect.top < viewportHeight / 2 && rect.bottom > viewportHeight / 2) {
            currentStep = step.id;
            break;
          }
        }
      }

      if (currentStep) {
        setActiveStep(currentStep);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [workflowSteps, stepRefs]);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('description')}</p>
      
      <div className="relative py-12">
        {/* This will be the vertical line */}
        <div className="absolute left-1/2 -ml-px w-0.5 h-full bg-gray-300 top-0"></div>

        <div className="space-y-24">
          {workflowSteps.map((step, index) => (
            <div key={step.id} ref={stepRefs[step.id as keyof typeof stepRefs]} className="flex items-center w-full">
              {/* Content Box */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'} ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                <div className={`p-6 bg-white rounded-lg shadow-lg transition-all duration-500 transform ${activeStep === step.id ? 'scale-105 shadow-2xl' : 'scale-100'}`}>
                  <h3 className="text-2xl font-bold text-blue-600">{step.title}</h3>
                  <p className="mt-2 text-gray-700">{step.description}</p>
                </div>
              </div>

              {/* Icon on the timeline */}
              <div className={`absolute left-1/2 -ml-8 w-16 h-16 bg-white rounded-full border-4 flex items-center justify-center text-3xl transition-all duration-500 ${activeStep === step.id ? 'border-blue-500 scale-110' : 'border-gray-300'}`}>
                {step.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MvsWorkflowPage;
