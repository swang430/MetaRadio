import { notFound } from 'next/navigation';
import { getDatasheetBySlug } from '../../../../../lib/api';
import DatasheetView from '@/components/datasheet/DatasheetView';

// 内容由 Strapi 实时提供（支持后端随时编辑），不在构建期冻结。
export const dynamic = 'force-dynamic';

export default async function DatasheetDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const datasheet = await getDatasheetBySlug(slug, locale);

  if (!datasheet) {
    notFound();
  }

  return <DatasheetView datasheet={datasheet} locale={locale} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const datasheet = await getDatasheetBySlug(slug, locale);
  if (!datasheet) return {};
  return {
    title: `${datasheet.title} · MetaRadio`,
    description: datasheet.product || undefined,
  };
}
