import { getResourceBySlug } from '../../../../../lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { getTranslations } from 'next-intl/server';

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'Resources' });
  const resource = await getResourceBySlug(slug, locale);

  if (!resource) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link href={`/${locale}/resources`} className="text-blue-600 hover:underline">
        ← {t('backToList')}
      </Link>

      <div className="mt-6 mb-2 flex items-center gap-3">
        <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full">
          {t(resource.type.replace(' ', ''))}
        </span>
        {resource.publicationDate && (
          <span className="text-gray-500 text-sm">{resource.publicationDate}</span>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-8">{resource.Title}</h1>

      <div className="prose max-w-none">
        {resource.Description && <BlocksRenderer content={resource.Description} />}
      </div>
    </div>
  );
}
