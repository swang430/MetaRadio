// 数据层：MCP 工具通过本站公开只读 API（/api/v1/products）读取产品库。
// 可用 METARADIO_API_BASE 切换到本地（http://localhost:3000）或生产（默认 https://metaradio.tech）。
const API_BASE = process.env.METARADIO_API_BASE || 'https://metaradio.tech';

async function api(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`MetaRadio API ${res.status} for ${path}`);
  return res.json();
}

export async function listProducts({ category, locale = 'en' } = {}) {
  const q = new URLSearchParams({ locale });
  if (category) q.set('category', category);
  const { data } = await api(`/api/v1/products?${q.toString()}`);
  // 列表只回精简字段，省 token。
  return data.map((p) => ({ code: p.code, slug: p.slug, category: p.category, title: p.title, summary: p.summary }));
}

export async function getProduct({ slug, locale = 'en' }) {
  const { data } = await api(`/api/v1/products/${encodeURIComponent(slug)}?locale=${locale}`);
  return data;
}

export async function searchProducts({ query, locale = 'en' }) {
  const { data } = await api(`/api/v1/products?locale=${locale}`);
  const q = String(query).toLowerCase();
  return data
    .filter((p) => [p.title, p.summary, p.product, ...(p.keywords || [])].join(' ').toLowerCase().includes(q))
    .map((p) => ({ code: p.code, slug: p.slug, category: p.category, title: p.title, summary: p.summary }));
}

export async function compareProducts({ slugs, locale = 'en' }) {
  const products = await Promise.all(slugs.map((slug) => getProduct({ slug, locale })));
  return products.map((p) => ({
    code: p.code,
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    specs: p.specs,
    differentiators: p.differentiators,
  }));
}
