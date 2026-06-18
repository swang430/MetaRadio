// 冒烟测试：用 MCP 客户端连接本服务（stdio），列出工具并实跑两个调用。
// 需要本站公开 API 可达（默认 http://localhost:3000，见 METARADIO_API_BASE）。
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

const base = process.env.METARADIO_API_BASE || 'http://localhost:3000';
const transport = new StdioClientTransport({
  command: 'node',
  args: ['index.js'],
  env: { ...process.env, METARADIO_API_BASE: base },
});
const client = new Client({ name: 'smoke', version: '1.0.0' });
await client.connect(transport);

const { tools } = await client.listTools();
console.log('TOOLS:', tools.map((t) => t.name).join(', '));

const list = await client.callTool({ name: 'list_products', arguments: { category: 'ai-comms' } });
console.log('list_products(ai-comms):', list.content[0].text.replace(/\s+/g, ' ').slice(0, 160));

const cmp = await client.callTool({ name: 'compare_products', arguments: { slugs: ['l1-ray-tracing', 'v3-isac'] } });
const cmpData = JSON.parse(cmp.content[0].text);
console.log('compare_products:', cmpData.map((p) => `${p.code}(specs:${p.specs?.length})`).join(' vs '));

await client.close();
console.log('SMOKE OK');
