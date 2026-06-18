// 生成 /llms.txt 与 /llms-full.txt（遵循 llmstxt.org 提案）：告诉 LLM 本站核心内容与怎么读。
// 产品清单从 datasheet 派生（getDatasheets，优雅降级）；full 版附每个产品的 hero 摘要与规格。
import { getDatasheets, type Datasheet } from './api';

const BASE = process.env.SITE_URL || 'https://metaradio.tech';

function heroSub(d: Datasheet): string {
  const h = d.body?.sections?.find((s) => s.id === 'hero');
  return h?.fields['Sub'] || h?.fields['Headline'] || d.product || '';
}

const productLine = (d: Datasheet) =>
  `- [${d.code} ${d.title}](${BASE}/en/datasheets/${d.slug}): ${heroSub(d)}`;

export async function buildLlmsText(full: boolean): Promise<string> {
  let ds: Datasheet[] = [];
  try {
    ds = await getDatasheets('en');
  } catch {
    ds = [];
  }
  const horizontal = ds.filter((d) => d.category === 'horizontal');
  const vertical = ds.filter((d) => d.category === 'vertical');
  const aiComms = ds.filter((d) => d.category === 'ai-comms');

  const L: string[] = [];
  L.push('# MetaRadio (乾径科技)');
  L.push('');
  L.push('> The dual infrastructure for AI-Native wireless: an EM-twin R&D base (Lauraycs / MetaRadio) in the digital world, and a neural-network soft-baseband terminal base (Liquid RF) in the physical world. One electromagnetic reality, two infrastructures.');
  L.push('');
  L.push('MetaRadio builds GPU-accelerated electromagnetic computation spanning simulation (Lauraycs / MetaRadio EM-Twin) and the terminal runtime (Liquid RF). Products are organized as L1–L3 foundational platforms, V1–V6 industry solutions, and the Liquid RF AI-Native communication layer. The site is bilingual (English + 简体中文); replace `/en/` with `/zh-CN/` for Chinese.');
  L.push('');
  L.push('## Foundational platforms (L1–L3)');
  horizontal.forEach((d) => L.push(productLine(d)));
  L.push('');
  L.push('## Industry solutions (V1–V6)');
  vertical.forEach((d) => L.push(productLine(d)));
  L.push('');
  L.push('## AI-Native communication');
  aiComms.forEach((d) => L.push(productLine(d)));
  L.push('');
  L.push('## Foundations & services');
  L.push(`- [Foundations](${BASE}/en/foundations): four shared capabilities — EM worldview, GPU-accelerated stack, AI-Native methodology, data flywheel.`);
  L.push(`- [R&D Services](${BASE}/en/services): five standard packages, from pre-design assessment to joint-lab co-build.`);
  L.push(`- [About](${BASE}/en/about) · [Contact](${BASE}/en/contact)`);
  L.push('');
  L.push('## For machines');
  L.push(`- [Products API](${BASE}/api/v1/products): clean public read-only JSON (specs, differentiators, applications). Append \`?locale=en\` or \`?category=horizontal\`. Single: \`/api/v1/products/{slug}\`.`);
  L.push(`- [OpenAPI spec](${BASE}/api/openapi.yaml) · [Datasheets API (raw Strapi)](${BASE}/api/datasheets)`);
  L.push(`- [Sitemap](${BASE}/sitemap.xml)`);

  if (full) {
    L.push('');
    L.push('---');
    L.push('');
    L.push('# Full product details');
    for (const d of ds) {
      L.push('');
      L.push(`## ${d.code} · ${d.title}`);
      L.push(`Product: ${d.product || '—'} · Category: ${d.category || '—'} · URL: ${BASE}/en/datasheets/${d.slug}`);
      L.push('');
      L.push(heroSub(d));
      const specs = d.body?.sections?.find((s) => s.id === 'specs-table');
      if (specs?.table?.length) {
        const cols = Object.keys(specs.table[0]);
        L.push('');
        L.push('Specifications:');
        for (const row of specs.table) L.push(`- ${row[cols[0]]}: ${row[cols[1]]}`);
      }
    }
  }

  return L.join('\n') + '\n';
}
