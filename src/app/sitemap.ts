import type { MetadataRoute } from 'next';
import { getDatasheets, datasheetGroup } from '../../lib/api';

const BASE = process.env.SITE_URL || 'https://metaradio.tech';
const LOCALES = ['zh-CN', 'en'];
const STATIC_PATHS = ['', '/products', '/solutions', '/foundations', '/services', '/about', '/resources', '/contact'];

// /sitemap.xml —— 覆盖中英所有静态页 + 每个 datasheet 详情。内容源不可达时仅省略 datasheet 条目。
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  for (const loc of LOCALES) {
    for (const p of STATIC_PATHS) {
      entries.push({ url: `${BASE}/${loc}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 });
    }
  }

  let datasheets: Awaited<ReturnType<typeof getDatasheets>> = [];
  try {
    datasheets = await getDatasheets('en');
  } catch {
    datasheets = [];
  }
  for (const loc of LOCALES) {
    for (const d of datasheets) {
      entries.push({ url: `${BASE}/${loc}/${datasheetGroup(d.category)}/${d.slug}`, changeFrequency: 'monthly', priority: 0.6 });
    }
  }

  return entries;
}
