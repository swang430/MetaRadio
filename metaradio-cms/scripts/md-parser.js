'use strict';
/**
 * 共享 Markdown 解析器：把带 frontmatter + 分节的 .md 解析为 {data, sections}。
 * 供 import-datasheets.js 与 import-pages.js 复用——"代码即内容"的统一解析底座。
 */

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

/** 把 body 解析为有序分节列表。每节：{id, key, label, heading, level, fields, items, table, bullets, text}。 */
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
      // 标题形如「Challenge · 时代挑战」：· 前是英文结构标记(key，用于分类/id)，
      // · 后是中文小标题(label，作为分节 eyebrow 展示)。两者都保留。
      const segs = headingRaw.split('·').map((s) => s.trim()).filter(Boolean);
      const key = segs[0] || headingRaw;
      const label = segs.slice(1).join(' · ');
      cur = { id: slugify(key), key, label, heading: headingRaw, level: h[1].length, fields: {}, items: [], table: [], bullets: [], text: '' };
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

    // - **Key:** value  → items（带标题的条目）。冒号支持半角 : 与全角 ：。
    let kv = line.match(/^-\s*\*\*(.+?)[:：]\*\*\s*(.*)$/);
    if (kv) {
      cur.items.push({ title: kv[1].trim(), text: kv[2].trim() });
      cur.fields[kv[1].trim()] = kv[2].trim();
      continue;
    }
    // **Key:** value  → fields（如 Title / Description）
    kv = line.match(/^\*\*(.+?)[:：]\*\*\s*(.*)$/);
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

module.exports = { parseFrontmatter, parseTable, slugify, parseBody };
