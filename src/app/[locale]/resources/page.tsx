import { getTranslations } from 'next-intl/server';
import { getResources } from '../../../../lib/api';
import ResourceList from '../../../components/resources/ResourceList';

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Resources' });
  const resources = await getResources(locale);

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        {t('description')}
      </p>
      
      <ResourceList resources={resources} />
    </div>
  );
}