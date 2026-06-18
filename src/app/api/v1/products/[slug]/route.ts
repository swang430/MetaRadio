import { getPublicProduct } from '../../../../../../lib/products';

// 单个产品的干净 JSON（含规格 / 差异化 / 应用）。例：GET /api/v1/products/l1-ray-tracing?locale=en
export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get('locale') === 'zh-CN' ? 'zh-CN' : 'en';
  const data = await getPublicProduct(slug, locale);
  if (!data) {
    return Response.json({ error: 'not_found', slug }, { status: 404, headers: { 'access-control-allow-origin': '*' } });
  }
  return Response.json(
    { data, meta: { locale } },
    { headers: { 'cache-control': 'public, max-age=3600', 'access-control-allow-origin': '*' } },
  );
}
