'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

const SolutionsIndexPage = () => {
  const locale = useLocale();
  const t = useTranslations('SolutionsIndex');
  const t_home = useTranslations('Home');

  const solutionCards = [
    {
      href: `/${locale}/solutions/virtual-drive-testing`,
      title: t_home('virtualDriveTestTitle'),
      description: t_home('virtualDriveTestDescription'),
    },
    {
      href: `/${locale}/solutions/mimo-ota`,
      title: t_home('mimoOtaTitle'),
      description: t_home('mimoOtaDescription'),
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        {t('pageDescription')}
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {solutionCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SolutionsIndexPage;