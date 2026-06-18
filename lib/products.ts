// 把 datasheet 转成"干净的"公开产品 JSON：客户的 Agent 可直接 GET specs，而非解析 PDF（§4.2 #4）。
import { getDatasheets, getDatasheetBySlug, type Datasheet, type DatasheetSection } from './api';

const BASE = process.env.SITE_URL || 'https://metaradio.tech';

type Row = Record<string, string>;
function cell(row: Row, ...names: string[]): string {
  const keys = Object.keys(row);
  for (const n of names) {
    const k = keys.find((key) => key.toLowerCase() === n.toLowerCase());
    if (k && row[k]) return row[k];
  }
  return '';
}

export interface PublicProduct {
  code: string;
  slug: string;
  category: string;
  version: string;
  title: string;
  product: string;
  summary: string;
  url: string;
  keywords: string[];
  specs: { name: string; value: string }[];
  differentiators: { title: string; text: string }[];
  applications: { name: string; text: string }[];
}

export function toPublicProduct(d: Datasheet, locale: string): PublicProduct {
  const sec = (id: string): DatasheetSection | undefined => d.body?.sections?.find((s) => s.id === id);
  const hero = sec('hero');
  const specsTable = sec('specs-table')?.table ?? [];
  const diff = sec('bullets')?.items ?? [];
  const appsTable = sec('applications')?.table ?? [];
  return {
    code: d.code ?? '',
    slug: d.slug,
    category: d.category ?? '',
    version: d.version ?? '',
    title: d.title,
    product: d.product ?? '',
    summary: hero?.fields['Sub'] ?? hero?.fields['Headline'] ?? '',
    url: `${BASE}/${locale}/datasheets/${d.slug}`,
    keywords: Array.isArray(d.keywords) ? d.keywords : [],
    specs: specsTable.map((r) => {
      const cols = Object.keys(r);
      return { name: r[cols[0]] ?? '', value: r[cols[1]] ?? '' };
    }),
    differentiators: diff.map((i) => ({ title: i.title, text: i.text })),
    applications: appsTable.map((r) => ({ name: cell(r, 'Title'), text: cell(r, 'Text') })),
  };
}

export async function getPublicProducts(locale: string): Promise<PublicProduct[]> {
  const ds = await getDatasheets(locale);
  return ds.map((d) => toPublicProduct(d, locale));
}

export async function getPublicProduct(slug: string, locale: string): Promise<PublicProduct | null> {
  const d = await getDatasheetBySlug(slug, locale);
  return d ? toPublicProduct(d, locale) : null;
}
