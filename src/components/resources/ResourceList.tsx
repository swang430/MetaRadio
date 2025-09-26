'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Resource, extractTextFromDescription } from '../../../lib/api'; // 导入我们定义的类型

interface ResourceListProps {
  resources: Resource[]; // 接收从服务器组件传来的数据
}

export default function ResourceList({ resources }: ResourceListProps) {
  const t = useTranslations('Resources');
  const [filter, setFilter] = useState('All');

  // 将Strapi中的类型映射到翻译文本
  const resourceTypes = ['All', 'White Paper', 'Case Study', 'Blog Post'];

  const filteredResources = filter === 'All' 
    ? resources 
    : resources.filter(r => r.type === filter);

  return (
    <div>
      <div className="flex justify-center space-x-4 mb-8">
        {resourceTypes.map(type => (
          <button 
            key={type} 
            onClick={() => setFilter(type)}
            className={`py-2 px-4 rounded-lg font-semibold transition ${filter === type ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
            {t(type.replace(' ', ''))} {/* e.g., t('WhitePaper') */}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
            <h3 className="text-xl font-bold mb-2">{resource.Title}</h3>
            <p className="text-gray-700 flex-grow">{extractTextFromDescription(resource.Description)}</p>
            <a href={`/resources/${resource.slug}`} className="text-blue-600 hover:underline mt-4 self-start">{t('readMore')} →</a>
          </div>
        ))}
      </div>
    </div>
  );
}
