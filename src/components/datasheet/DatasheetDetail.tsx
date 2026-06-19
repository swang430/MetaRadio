// 共享的 datasheet 详情渲染：/products/[slug] 与 /solutions/[slug] 两个路由复用同一套逻辑。
// 按 category 校验分组（防止 /products/<行业方案 slug> 这类错配产生重复内容），
// 并把 JSON-LD 的 canonical url 指向当前分组路径。
import { notFound } from 'next/navigation';
import { getDatasheetBySlug, datasheetGroup, type Datasheet } from '../../../lib/api';
import DatasheetView from './DatasheetView';

type Group = 'products' | 'solutions';

/** 取出该 datasheet（找不到或分组不匹配 → 404）。 */
async function resolve(slug: string, locale: string, group: Group): Promise<Datasheet> {
  const datasheet = await getDatasheetBySlug(slug, locale);
  if (!datasheet) notFound();
  // 产品 slug 不应在 /solutions 下渲染，反之亦然——避免同一内容出现在两个 URL。
  if (datasheetGroup(datasheet.category) !== group) notFound();
  return datasheet;
}

export async function DatasheetDetail({ slug, locale, group }: { slug: string; locale: string; group: Group }) {
  const datasheet = await resolve(slug, locale, group);

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
    url: `${base}/${locale}/${group}/${datasheet.slug}`,
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

/** generateMetadata 共享实现（两个路由各自转发到这里）。 */
export async function datasheetMetadata(slug: string, locale: string) {
  const datasheet = await getDatasheetBySlug(slug, locale);
  if (!datasheet) return {};
  return {
    title: `${datasheet.title} · MetaRadio`,
    description: datasheet.product || undefined,
  };
}
