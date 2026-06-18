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

  // 结构化数据：把规格表暴露为 schema.org Product.additionalProperty，便于 LLM/搜索精确摘取。
  const base = process.env.SITE_URL || 'https://metaradio.tech';
  const hero = datasheet.body?.sections?.find((s) => s.id === 'hero');
  const specs = datasheet.body?.sections?.find((s) => s.id === 'specs-table');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: datasheet.title,
    description: hero?.fields['Sub'] || datasheet.product || '',
    category: datasheet.category,
    sku: datasheet.code,
    brand: { '@type': 'Brand', name: 'MetaRadio' },
    url: `${base}/${locale}/datasheets/${datasheet.slug}`,
    ...(specs?.table?.length
      ? {
          additionalProperty: specs.table.map((row) => {
            const cols = Object.keys(row);
            return { '@type': 'PropertyValue', name: row[cols[0]], value: row[cols[1]] };
          }),
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DatasheetView datasheet={datasheet} locale={locale} />
    </>
  );
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
