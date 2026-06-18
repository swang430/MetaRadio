#!/usr/bin/env node
// MetaRadio MCP Server（§4.2 #5）：让客户的 Claude / GPT 客户端一键接入，直接对话乾径产品库
// （"帮我比较 L1 与某方案在 sub-THz 下的覆盖"）。数据经本站公开只读 API，stdio 传输。
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { listProducts, getProduct, searchProducts, compareProducts } from './lib.js';

const server = new McpServer({ name: 'metaradio', version: '1.0.0' });

const ok = (obj) => ({ content: [{ type: 'text', text: typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2) }] });
const fail = (e) => ({ content: [{ type: 'text', text: `Error: ${e?.message || e}` }], isError: true });
const locale = z.enum(['en', 'zh-CN']).optional().describe('Content locale, default en');

server.registerTool(
  'list_products',
  {
    title: 'List products',
    description:
      'List MetaRadio products: L1-L3 foundational platforms, V1-V6 industry solutions, and the Liquid RF AI-Native communication layer. Optional category filter (horizontal | vertical | ai-comms).',
    inputSchema: { category: z.enum(['horizontal', 'vertical', 'ai-comms']).optional(), locale },
  },
  async (args) => {
    try { return ok(await listProducts(args)); } catch (e) { return fail(e); }
  },
);

server.registerTool(
  'get_product',
  {
    title: 'Get product',
    description:
      'Get one product by slug with full specifications, differentiators and applications. Example slugs: l1-ray-tracing, liquid-rf, v3-isac.',
    inputSchema: { slug: z.string().describe('Product slug, e.g. l1-ray-tracing'), locale },
  },
  async (args) => {
    try { return ok(await getProduct(args)); } catch (e) { return fail(e); }
  },
);

server.registerTool(
  'search_products',
  {
    title: 'Search products',
    description: 'Search products by keyword across title, summary, product name and keywords.',
    inputSchema: { query: z.string().describe('Search keyword'), locale },
  },
  async (args) => {
    try { return ok(await searchProducts(args)); } catch (e) { return fail(e); }
  },
);

server.registerTool(
  'compare_products',
  {
    title: 'Compare products',
    description: 'Compare two or more products side by side by slug (specifications + differentiators).',
    inputSchema: { slugs: z.array(z.string()).min(2).describe('Two or more product slugs'), locale },
  },
  async (args) => {
    try { return ok(await compareProducts(args)); } catch (e) { return fail(e); }
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('metaradio-mcp running on stdio');
