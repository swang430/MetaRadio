import { getResourceBySlug } from '../../../../../lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ResourceBody from '@/components/resources/ResourceBody';
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
      <Link href={`/${locale}/resources`} className="text-brand-cyan hover:underline">
        ← {t('backToList')}
      </Link>

      <div className="mt-6 mb-2 flex items-center gap-3">
        <span className="inline-block rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-sm font-semibold text-brand-cyan">
          {t(resource.type.replace(' ', ''))}
        </span>
        {resource.publicationDate && (
          <span className="text-slate-400 text-sm">{resource.publicationDate}</span>
        )}
      </div>

      <h1 className="text-4xl font-bold mb-8 text-white">{resource.Title}</h1>

      {resource.Description && <ResourceBody content={resource.Description} />}
    </div>
  );
}
