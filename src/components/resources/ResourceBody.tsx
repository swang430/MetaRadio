'use client';

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';

// 资源详情正文：把 Strapi blocks（标题/段落/列表/加粗）用深色排版渲染。
// 站点未装 @tailwindcss/typography，故不用 prose，显式给每种 block 深色类，保证可读。
export default function ResourceBody({ content }: { content: BlocksContent }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className="mb-5 leading-relaxed text-slate-300">{children}</p>,
        heading: ({ children, level }) => {
          if (level <= 2) return <h2 className="mt-10 mb-4 text-2xl font-bold text-white md:text-3xl">{children}</h2>;
          if (level === 3) return <h3 className="mt-8 mb-3 text-xl font-semibold text-white">{children}</h3>;
          return <h4 className="mt-6 mb-2 text-lg font-semibold text-slate-100">{children}</h4>;
        },
        list: ({ children, format }) =>
          format === 'ordered' ? (
            <ol className="mb-5 ml-6 list-decimal space-y-2 text-slate-300 marker:text-brand-cyan">{children}</ol>
          ) : (
            <ul className="mb-5 ml-6 list-disc space-y-2 text-slate-300 marker:text-brand-cyan">{children}</ul>
          ),
        'list-item': ({ children }) => <li className="leading-relaxed">{children}</li>,
        quote: ({ children }) => (
          <blockquote className="mb-5 border-l-2 border-brand-cyan/50 pl-4 italic text-slate-400">{children}</blockquote>
        ),
      }}
      modifiers={{
        bold: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        italic: ({ children }) => <em className="italic">{children}</em>,
      }}
    />
  );
}
