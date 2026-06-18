import { buildLlmsText } from '../../../lib/llms';

// 内容随 Strapi 实时变化，不在构建期冻结。
export const dynamic = 'force-dynamic';

export async function GET() {
  const body = await buildLlmsText(false);
  return new Response(body, {
    headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' },
  });
}
