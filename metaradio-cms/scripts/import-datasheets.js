'use strict';
/**
 * 把 seed-data/datasheets/*.md（结构化 datasheet 内容）解析并导入 Strapi 的 datasheet 内容类型。
 * 这是"代码即内容"的落地：内容以 .md 存于仓库（可由 AI 编辑/翻译），seed 进 Strapi 供前端/API/Agent 消费。
 *
 * 用法：
 *   node scripts/import-datasheets.js --dry          # 仅解析并打印 JSON（不连 Strapi）
 *   node scripts/import-datasheets.js --dry --only l1-ray-tracing
 *   cd metaradio-cms && npm run import:datasheets    # 解析 + 写入 Strapi（zh-CN, 发布, 开放公共读）
 */
const fs = require('fs');
const path = require('path');

const DATASHEET_DIR = path.resolve(__dirname, '..', 'seed-data', 'datasheets');
const UID = 'api::datasheet.datasheet';
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const onlyIdx = args.indexOf('--only');
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

// ---------- 解析 ----------

/** 解析 YAML frontmatter（扁平 key: value，含 [a, b] 数组）。返回 {data, body}。 */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: raw };
  const data = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1];
    let val = kv[2].trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
    }
    data[key] = val;
  }
  return { data, body: m[2] };
}

/** 解析 markdown 表格行（已是 | 开头的行数组）→ [{header: cell}]。 */
function parseTable(rows) {
  const cells = (line) => line.split('|').slice(1, -1).map((c) => c.trim());
  if (rows.length < 2) return [];
  const headers = cells(rows[0]);
  const out = [];
  for (let i = 2; i < rows.length; i++) {
    // 跳过 i=1（分隔行 ---）
    const c = cells(rows[i]);
    if (!c.length) continue;
    const obj = {};
    headers.forEach((h, idx) => (obj[h] = c[idx] ?? ''));
    out.push(obj);
  }
  return out;
}

const slugify = (s) =>
  s.toLowerCase().replace(/[·•]/g, ' ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** 把 body 解析为有序分节列表。每节：{id, heading, level, fields, items, table, bullets, text}。 */
function parseBody(body) {
  const lines = body.split('\n');
  const sections = [];
  let cur = null;
  let tableBuf = [];

  const flushTable = () => {
    if (cur && tableBuf.length) cur.table = parseTable(tableBuf);
    tableBuf = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) {
      flushTable();
      const headingRaw = h[2].trim();
      const heading = headingRaw.split('·')[0].trim() || headingRaw;
      cur = { id: slugify(heading), heading, level: h[1].length, fields: {}, items: [], table: [], bullets: [], text: '' };
      sections.push(cur);
      continue;
    }
    if (!cur) continue;
    if (line.startsWith('|')) {
      tableBuf.push(line);
      continue;
    }
    flushTable();
    if (!line.trim()) continue;

    // - **Key:** value  → items（带标题的条目，如 Hero 字段 / 差异化条目 / CTA）
    let kv = line.match(/^-\s*\*\*(.+?):\*\*\s*(.*)$/);
    if (kv) {
      cur.items.push({ title: kv[1].trim(), text: kv[2].trim() });
      cur.fields[kv[1].trim()] = kv[2].trim();
      continue;
    }
    // **Key:** value  → fields（如 Title / Description）
    kv = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
    if (kv) {
      cur.fields[kv[1].trim()] = kv[2].trim();
      continue;
    }
    // 普通 bullet
    const b = line.match(/^[-*]\s+(.*)$/);
    if (b) {
      cur.bullets.push(b[1].trim());
      continue;
    }
    cur.text += (cur.text ? '\n' : '') + line.trim();
  }
  flushTable();
  return sections;
}

/** .md → Strapi datasheet 记录（zh-CN）。 */
function toRecord(filename, raw) {
  const { data, body } = parseFrontmatter(raw);
  const sections = parseBody(body);
  const slug = data.slug || slugify(path.basename(filename, '.md'));
  const code = (data.layer || slug.split('-')[0] || '').toUpperCase();
  return {
    slug,
    locale: data.language === 'en' ? 'en' : 'zh-CN',
    shared: { slug, category: data.type === 'vertical' ? 'vertical' : 'horizontal', code, version: data.version || '' },
    localized: {
      title: data.title || slug,
      product: data.product || '',
      audience: data.audience || '',
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      body: { sections },
    },
  };
}

function loadAll() {
  const files = fs.readdirSync(DATASHEET_DIR).filter((f) => f.endsWith('.md'));
  return files
    .filter((f) => !ONLY || f.toLowerCase().includes(ONLY.toLowerCase()))
    .map((f) => toRecord(f, fs.readFileSync(path.join(DATASHEET_DIR, f), 'utf8')));
}

// ---------- 写入 Strapi ----------

async function grantPublicRead(strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!role) return;
  for (const action of ['find', 'findOne']) {
    const actionId = `api::datasheet.datasheet.${action}`;
    const exists = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action: actionId, role: role.id } });
    if (!exists) {
      await strapi.db.query('plugin::users-permissions.permission').create({ data: { action: actionId, role: role.id } });
      console.log(`  • 授予 public: ${actionId}`);
    }
  }
}

async function upsert(strapi, rec) {
  const existing = await strapi.documents(UID).findMany({ filters: { slug: { $eq: rec.slug } }, locale: '*' });
  for (const id of [...new Set((existing || []).map((d) => d.documentId).filter(Boolean))]) {
    await strapi.documents(UID).delete({ documentId: id });
  }
  await strapi.documents(UID).create({
    locale: rec.locale,
    status: 'published',
    data: { ...rec.shared, ...rec.localized },
  });
  console.log(`  ✓ ${rec.shared.code} ${rec.slug} (${rec.localized.title})`);
}

async function run() {
  const records = loadAll();
  if (DRY) {
    for (const r of records) {
      console.log(`\n===== ${r.shared.code} · ${r.slug} (${r.locale}) =====`);
      console.log('shared:', JSON.stringify(r.shared));
      console.log('sections:', r.localized.body.sections.map((s) => `${s.id}[L${s.level}] fields:${Object.keys(s.fields).length} items:${s.items.length} table:${s.table.length} bullets:${s.bullets.length}`).join('\n          '));
    }
    console.log(`\n[dry] 解析 ${records.length} 个 datasheet，未写入 Strapi。`);
    process.exit(0);
  }

  try {
    require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
  } catch {}
  const { compileStrapi, createStrapi } = require('@strapi/strapi');
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';

  console.log(`🌱 导入 ${records.length} 个 datasheet`);
  for (const r of records) await upsert(app, r);
  await grantPublicRead(app);
  console.log('✅ datasheet 导入完成');
  await app.destroy();
  process.exit(0);
}

run().catch((e) => {
  console.error('导入失败:', e);
  process.exit(1);
});
