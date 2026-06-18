import { getPublicProducts } from '../../../../../lib/products';

// 公开只读产品 API（§4.2 #4）。客户/Agent 可直接 GET 干净 JSON，无需解析 PDF。
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') === 'zh-CN' ? 'zh-CN' : 'en';
  const category = searchParams.get('category');
  let data = await getPublicProducts(locale);
  if (category) data = data.filter((p) => p.category === category);
  return Response.json(
    { data, meta: { count: data.length, locale } },
    { headers: { 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' } },
  );
}
