import { buildLlmsText } from '../../../lib/llms';

// 完整版：附每个 datasheet 的 hero 摘要与规格表。内容随 Strapi 实时变化。
export const dynamic = 'force-dynamic';

export async function GET() {
  const body = await buildLlmsText(true);
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
