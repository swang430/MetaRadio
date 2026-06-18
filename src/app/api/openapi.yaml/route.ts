// /api/openapi.yaml —— 公开只读 API 的 OpenAPI 规范，便于接入侧 Agent 自动生成调用代码（§4.2 #7）。
const BASE = process.env.SITE_URL || 'https://metaradio.tech';

const SPEC = `openapi: 3.1.0
info:
  title: MetaRadio Public Product API
  version: 1.0.0
  description: >-
    Public read-only API for MetaRadio (乾径科技) products — L1-L3 foundational platforms,
    V1-V6 industry solutions, and the Liquid RF AI-Native communication layer.
    No auth required. Designed for client Agents to read specs instead of parsing PDFs.
servers:
  - url: ${BASE}
paths:
  /api/v1/products:
    get:
      summary: List all products
      parameters:
        - name: locale
          in: query
          schema: { type: string, enum: [en, zh-CN], default: en }
        - name: category
          in: query
          schema: { type: string, enum: [horizontal, vertical, ai-comms] }
      responses:
        '200':
          description: List of products
          content:
            application/json:
              schema:
                type: object
                properties:
                  data: { type: array, items: { $ref: '#/components/schemas/Product' } }
                  meta: { type: object, properties: { count: { type: integer }, locale: { type: string } } }
  /api/v1/products/{slug}:
    get:
      summary: Get one product by slug
      parameters:
        - name: slug
          in: path
          required: true
          schema: { type: string }
          example: l1-ray-tracing
        - name: locale
          in: query
          schema: { type: string, enum: [en, zh-CN], default: en }
      responses:
        '200':
          description: Single product
          content:
            application/json:
              schema:
                type: object
                properties:
                  data: { $ref: '#/components/schemas/Product' }
        '404':
          description: Not found
components:
  schemas:
    Product:
      type: object
      properties:
        code: { type: string, example: L1 }
        slug: { type: string, example: l1-ray-tracing }
        category: { type: string, enum: [horizontal, vertical, ai-comms] }
        version: { type: string }
        title: { type: string }
        product: { type: string }
        summary: { type: string }
        url: { type: string, format: uri }
        keywords: { type: array, items: { type: string } }
        specs:
          type: array
          items:
            type: object
            properties: { name: { type: string }, value: { type: string } }
        differentiators:
          type: array
          items:
            type: object
            properties: { title: { type: string }, text: { type: string } }
        applications:
          type: array
          items:
            type: object
            properties: { name: { type: string }, text: { type: string } }
`;

export async function GET() {
  return new Response(SPEC, {
    headers: { 'content-type': 'application/yaml; charset=utf-8', 'access-control-allow-origin': '*' },
  });
}
