import type { MetadataRoute } from 'next';

const BASE = process.env.SITE_URL || 'https://metaradio.tech';

// /robots.txt —— 对人和爬虫都开放，并指向 sitemap 与 llms.txt（AI 友好）。
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE}/sitemap.xml`,
    host: BASE,
  };
}
