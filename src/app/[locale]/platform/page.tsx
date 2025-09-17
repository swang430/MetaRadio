'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';

const PlatformIndexPage = () => {
  const locale = useLocale();
  const t = useTranslations('PlatformIndex');
  const t_home = useTranslations('Home');

  const platformCards = [
    {
      href: `/${locale}/platform/hyperrt`,
      imgSrc: '/images/product.png',
      alt: 'HyperRT',
      title: t_home('hyperRtTitle'),
      description: t_home('hyperRtDescription'),
    },
    {
      href: `/${locale}/platform/raysense`,
      imgSrc: '/images/product.png',
      alt: 'RaySense',
      title: t_home('raysenseTitle'),
      description: t_home('raysenseDescription'),
    },
    {
      href: `/${locale}/platform/csi-sensing`,
      imgSrc: '/images/product.png',
      alt: 'CSI Sensing',
      title: t_home('csiSensingTitle'),
      description: t_home('csiSensingDescription'),
    },
    {
      href: `/${locale}/platform/mvs-workflow`,
      imgSrc: '/images/product.png',
      alt: 'MVS Workflow',
      title: t('MvsWorkflowCard.title'),
      description: t('MvsWorkflowCard.description'),
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        {t('pageDescription')}
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {platformCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="block bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={card.imgSrc}
              alt={card.alt}
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlatformIndexPage;
