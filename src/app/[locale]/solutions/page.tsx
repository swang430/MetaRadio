import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

// 更新接口以匹配扁平化的API响应
interface Solution {
  id: number;
  name: string;
  // description 是一个复杂的富文本对象，我们暂时只关心它的文本内容
  description: any;
  slug: string;
}

async function getSolutions(locale: string): Promise<Solution[]> {
  const res = await fetch(
    `http://localhost:1337/api/solutions?locale=${locale}`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch solutions from Strapi');
  }

  const json = await res.json();
  return json.data;
}

// 一个辅助函数，从Strapi的富文本格式中提取纯文本
function extractTextFromDescription(description: any): string {
  if (
    Array.isArray(description) &&
    description[0]?.children[0]?.text
  ) {
    return description[0].children[0].text;
  }
  // 如果结构不同或为空，返回提示信息
  return 'Description not available.';
}

export default async function SolutionsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'SolutionsIndex' });
  const solutions = await getSolutions(locale);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        {t('pageDescription')}
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* 直接访问solution的属性，不再通过.attributes */}
        {solutions.map((solution) => (
          <Link
            key={solution.id}
            href={`/${locale}/solutions/${solution.slug}`}
            className="block bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold mb-4">{solution.name}</h3>
            {/* 使用辅助函数来安全地提取和显示描述文本 */}
            <p className="text-gray-600">
              {extractTextFromDescription(solution.description)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}