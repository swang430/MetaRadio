import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getSolutions, extractTextFromDescription } from '../../../../lib/api';

export default async function SolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SolutionsIndex' });
  const solutions = await getSolutions(locale);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        {t('pageDescription')}
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {solutions.map((solution) => (
          <Link
            key={solution.id}
            href={`/${locale}/solutions/${solution.slug}`}
            className="block bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold mb-4">{solution.name}</h3>
            <p className="text-gray-600">
              {extractTextFromDescription(solution.description)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
