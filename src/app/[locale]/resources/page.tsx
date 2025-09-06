'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

const ResourcesPage = () => {
  const t = useTranslations('Resources');

  const allResources = [
    { id: 1, type: 'whitepaper', title: t('whitepaper1Title'), description: t('whitepaper1Desc'), href: '#' },
    { id: 2, type: 'case_study', title: t('caseStudy1Title'), description: t('caseStudy1Desc'), href: '#' },
    { id: 3, type: 'blog', title: t('blog1Title'), description: t('blog1Desc'), href: '#' },
    { id: 4, type: 'whitepaper', title: t('whitepaper2Title'), description: t('whitepaper2Desc'), href: '#' },
  ];

  const [filter, setFilter] = useState('all');

  const filteredResources = filter === 'all' 
    ? allResources 
    : allResources.filter(r => r.type === filter);

  const filterButtons = [
    { id: 'all', label: t('filterAll') },
    { id: 'whitepaper', label: t('filterWhitepapers') },
    { id: 'case_study', label: t('filterCaseStudies') },
    { id: 'blog', label: t('filterBlogs') },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">{t('description')}</p>

      <div className="flex justify-center space-x-4 mb-8">
        {filterButtons.map(btn => (
          <button 
            key={btn.id} 
            onClick={() => setFilter(btn.id)}
            className={`py-2 px-4 rounded-lg font-semibold transition ${filter === btn.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            {btn.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map(resource => (
          <div key={resource.id} className="card p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
            <p className="text-gray-700 flex-grow">{resource.description}</p>
            <a href={resource.href} className="text-blue-600 hover:underline mt-4 self-start">{t('readMore')} →</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourcesPage;
