import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { getPlatforms, extractTextFromDescription } from '../../../../lib/api';

export default async function PlatformIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'PlatformIndex' });
  const platforms = await getPlatforms(locale);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        {t('pageDescription')}
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {platforms.map((platform) => (
          <Link
            key={platform.id}
            href={`/${locale}/platform/${platform.slug}`}
            className="block bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
          >
            <Image
              src={'/images/product.png'} // Placeholder image
              alt={platform.name}
              width={120}
              height={120}
              className="mx-auto mb-6"
            />
            <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
            <p className="text-gray-600">
              {extractTextFromDescription(platform.description)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}