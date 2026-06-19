'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import { Resource, extractTextFromDescription } from '../../../lib/api'; // 导入我们定义的类型

/** 宣传海报作为目录条目（标题/标签已本地化），点击在新标签打开完整图。 */
interface Poster {
  src: string;
  title: string;
  tag: string;
}

interface ResourceListProps {
  resources: Resource[]; // 接收从服务器组件传来的数据
  posters?: Poster[]; // 宣传海报，与白皮书/博客等并列为目录条目
}

export default function ResourceList({ resources, posters = [] }: ResourceListProps) {
  const t = useTranslations('Resources');
  const locale = useLocale();
  const [filter, setFilter] = useState('All');

  // 将Strapi中的类型映射到翻译文本；Poster 为代码侧静态条目（非 Strapi 类型）。
  const resourceTypes = ['All', 'White Paper', 'Case Study', 'Blog Post', 'Poster'];

  const filteredResources = filter === 'All'
    ? resources
    : resources.filter(r => r.type === filter);
  // 海报在「全部」或「宣传海报」筛选下出现，与其他资源同列展示。
  const showPosters = filter === 'All' || filter === 'Poster';

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {resourceTypes.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`py-2 px-4 rounded-lg font-semibold transition ${filter === type ? 'bg-brand-cyan text-brand-navy' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}>
            {t(type.replace(' ', ''))} {/* e.g., t('WhitePaper') */}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-brand-surface border border-white/10 p-6 rounded-lg flex flex-col">
            <h3 className="text-xl font-bold mb-2 text-white">{resource.Title}</h3>
            <p className="text-slate-300 flex-grow">{extractTextFromDescription(resource.Description)}</p>
            <a href={`/${locale}/resources/${resource.slug}`} className="text-brand-cyan hover:underline mt-4 self-start">{t('readMore')} →</a>
          </div>
        ))}

        {showPosters && posters.map(p => (
          <a
            key={p.src}
            href={p.src}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-brand-surface border border-white/10 p-6 rounded-lg flex flex-col transition hover:border-brand-cyan"
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-emerald mb-2">{p.tag}</p>
            <h3 className="text-xl font-bold mb-2 text-white group-hover:text-brand-cyan">{p.title}</h3>
            <span className="text-brand-cyan hover:underline mt-auto self-start">{t('viewPoster')} →</span>
          </a>
        ))}
      </div>
    </div>
  );
}
