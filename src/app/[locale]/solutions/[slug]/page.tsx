import { DatasheetDetail, datasheetMetadata } from '@/components/datasheet/DatasheetDetail';

// 内容由 Strapi 实时提供（支持后端随时编辑），不在构建期冻结。
export const dynamic = 'force-dynamic';

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return <DatasheetDetail slug={slug} locale={locale} group="solutions" />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  return datasheetMetadata(slug, locale);
}
