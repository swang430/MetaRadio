import { getSolutionBySlug } from '../../../../../lib/api';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// 这是一个动态页面，它会接收 slug 作为参数
export default async function SolutionDetailPage({ params: { locale, slug } }: { params: { locale: string, slug: string } }) {
  const t = await getTranslations({ locale, namespace: 'VirtualDriveTesting' });
  const solution = await getSolutionBySlug(slug, locale);

  // 如果根据 slug 找不到解决方案，显示404页面
  if (!solution) {
    notFound();
  }

  const descriptionText = Array.isArray(solution.description) && solution.description[0]?.children[0]?.text
    ? solution.description[0].children[0].text
    : 'Description not available.';

  return (
    <div className="container mx-auto px-6 py-12">
      {/* 动态内容区域 */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{solution.name}</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">{descriptionText}</p>
        
        {/* 下载PDF按钮 */}
        <Link 
          href={`/api/generate-pdf?slug=${solution.slug}&locale=${locale}`}
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          target="_blank" // 在新标签页中打开以开始下载
        >
          下载 PDF 版本
        </Link>
      </div>

      {/* 以下是原有的静态布局内容，未来也可以考虑动态化 */}
      <div className="mt-16 border-t pt-12">
        {/* The Challenge Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8">{t('challengeTitle')}</h2>
          {/* ... 此处可以保留静态内容，或未来从Strapi获取 ... */}
        </section>

        {/* The Solution Section */}
        <section className="py-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-center mb-8">{t('solutionTitle')}</h2>
          {/* ... */}
        </section>

        {/* ... 其他部分 ... */}
      </div>
    </div>
  );
}