# metaradio-mcp

An [MCP](https://modelcontextprotocol.io) server that exposes the **MetaRadio (乾径科技)** product library — L1-L3 foundational platforms, V1-V6 industry solutions, and the **Liquid RF** AI-Native communication layer — to AI agents (Claude Desktop, IDEs, custom clients).

It is a thin client over the site's public read-only API (`/api/v1/products`), so it always reflects the same content as the website.

## Tools

| Tool | What it does |
|---|---|
| `list_products` | List all products. Optional `category` filter (`horizontal` \| `vertical` \| `ai-comms`). |
| `get_product` | Full specs, differentiators and applications for one `slug` (e.g. `l1-ray-tracing`, `liquid-rf`). |
| `search_products` | Keyword search across title / summary / keywords. |
| `compare_products` | Side-by-side specs + differentiators for two or more `slugs`. |

All tools accept an optional `locale` (`en` \| `zh-CN`).

## Run

```bash
cd metaradio-mcp
npm install
node index.js          # speaks MCP over stdio
```

By default it reads from `https://metaradio.tech`. Point it elsewhere with:

```bash
METARADIO_API_BASE=http://localhost:3000 node index.js
```

## Connect from Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "metaradio": {
      "command": "node",
      "args": ["/absolute/path/to/metaradio-mcp/index.js"]
    }
  }
}
```

Then ask, e.g.: *"Use metaradio to compare L1 ray tracing and V3 ISAC for sub-THz coverage."*

## Smoke test

```bash
METARADIO_API_BASE=http://localhost:3000 node test-smoke.js
```

Connects as an MCP client, lists the tools, and runs `list_products` + `compare_products` against the live API.
