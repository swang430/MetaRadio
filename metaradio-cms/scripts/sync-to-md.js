'use strict';
/**
 * Strapi → .md 同步（OUT，"同源"）。
 *
 * 把 Strapi 已发布内容的改动**外科式逐行回写**进对应 .md：只替换变化的「值」，
 * 其余一律不动（全角冒号 ：/间距/Strapi 没存的 frontmatter 字段都原样保留）。
 * IN（import:*）与 OUT（本脚本）共用同一份 .md 真相源，git diff 只显示真正改动。
 *
 * 覆盖（全站文字内容）：
 *   - datasheet：frontmatter(version/title/product/audience/keywords) + body(分节字段/表格/bullet)
 *   - page：frontmatter(title) + body(分节)
 *   - resource：frontmatter(title/type/publicationDate) + 正文(Description blocks→纯文本)
 * 不覆盖：图片（不在 Strapi，模型 C，是 public/images 静态资源）。
 *
 * 用法：cd metaradio-cms && node scripts/sync-to-md.js   然后 git diff 审阅，再提交。
 */
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const { parseFrontmatter } = require('./md-parser');

const CMS = path.resolve(__dirname, '..');
const DB = path.join(CMS, '.tmp', 'data.db');

// 每类型：fm = { Strapi列: .md frontmatter key }；body = 'sections'（分节）| 'description'（resource 正文）
const TYPES = [
  { table: 'datasheets', dir: 'datasheets', fm: { version: 'version', title: 'title', product: 'product', audience: 'audience', keywords: 'keywords' }, body: 'sections' },
  { table: 'pages', dir: 'pages', fm: { title: 'title' }, body: 'sections' },
  { table: 'resources', dir: 'resources', fm: { title: 'title', type: 'type', publication_date: 'publicationDate' }, body: 'description' },
];

const fmtVal = (v) => (Array.isArray(v) ? '[' + v.join(', ') + ']' : String(v));
const blocksToText = (b) => (Array.isArray(b) ? b : []).map((p) => (p.children || []).map((c) => c.text || '').join('')).join('\n\n');

/** slug → { 'zh-CN': path, en: path }，解析目录下每个 .md 的 frontmatter（slug + language）。 */
function mapMdFiles(dir) {
  const map = {};
  const abs = path.join(CMS, 'seed-data', dir);
  if (!fs.existsSync(abs)) return map;
  for (const f of fs.readdirSync(abs)) {
    if (!f.endsWith('.md')) continue;
    const p = path.join(abs, f);
    const { data } = parseFrontmatter(fs.readFileSync(p, 'utf8'));
    if (!data.slug) continue;
    (map[data.slug] ||= {})[data.language === 'en' ? 'en' : 'zh-CN'] = p;
  }
  return map;
}

/** 就地替换 frontmatter 里某 key 的值行。 */
function patchFrontmatter(text, key, newVal) {
  const lines = text.split('\n');
  let s = -1, e = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') { if (s < 0) s = i; else { e = i; break; } }
  }
  if (s < 0 || e < 0) return text;
  for (let i = s + 1; i < e; i++) {
    const m = lines[i].match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m && m[1] === key) {
      const nl = `${key}: ${fmtVal(newVal)}`;
      if (lines[i] !== nl) lines[i] = nl;
      break;
    }
  }
  return lines.join('\n');
}

/** 逐行就地修补 body：按节标题匹配 Strapi 分节，替换变化的字段值/表格单元格/bullet。 */
function patchBody(text, sections) {
  const byHeading = {};
  for (const sec of sections || []) byHeading[sec.heading] = sec;
  const lines = text.split('\n');
  let cur = null, bulletIdx = 0;
  let inTable = false, headers = null, rowIdx = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) { cur = byHeading[h[2].trim()] || null; bulletIdx = 0; inTable = false; headers = null; rowIdx = 0; continue; }
    if (!cur) continue;

    if (line.trim().startsWith('|')) {
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      if (!inTable) { inTable = true; headers = cells; rowIdx = 0; continue; }
      if (cells.every((c) => /^-+$/.test(c))) continue;
      const row = (cur.table || [])[rowIdx];
      if (row) {
        const nc = cells.map((c, ci) => { const sv = row[headers[ci]]; return sv != null && sv !== c ? sv : c; });
        if (nc.some((c, ci) => c !== cells[ci])) lines[i] = '| ' + nc.join(' | ') + ' |';
      }
      rowIdx++;
      continue;
    }
    inTable = false; headers = null;

    const fm = line.match(/^(-\s*)?\*\*(.+?)([:：])\*\*(\s*)(.*)$/);
    if (fm) {
      const sv = cur.fields ? cur.fields[fm[2].trim()] : undefined;
      if (sv != null && sv !== fm[5]) lines[i] = `${fm[1] || ''}**${fm[2]}${fm[3]}**${fm[4]}${sv}`;
      continue;
    }
    const b = line.match(/^(\s*[-*]\s+)(.*)$/);
    if (b) {
      const sv = (cur.bullets || [])[bulletIdx];
      if (sv != null && sv !== b[2]) lines[i] = b[1] + sv;
      bulletIdx++;
      continue;
    }
  }
  return lines.join('\n');
}

/** 替换 frontmatter 之后的正文（resource 的 Description 纯文本）。 */
function patchDescription(text, newDesc) {
  const lines = text.split('\n');
  let s = -1, e = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') { if (s < 0) s = i; else { e = i; break; } }
  }
  if (s < 0 || e < 0) return text;
  const body = lines.slice(e + 1).join('\n').trim();
  if (body === newDesc.trim()) return text;
  return lines.slice(0, e + 1).join('\n') + '\n\n' + newDesc.trim() + '\n';
}

function run() {
  const db = new Database(DB, { readonly: true, fileMustExist: true });
  let changed = 0;
  const report = [];

  for (const t of TYPES) {
    const rows = db.prepare(`SELECT * FROM "${t.table}" WHERE published_at IS NOT NULL`).all();
    const bySlugLoc = {};
    for (const r of rows) (bySlugLoc[r.slug] ||= {})[r.locale] = r;
    const files = mapMdFiles(t.dir);

    for (const [slug, locs] of Object.entries(bySlugLoc)) {
      const paths = files[slug];
      if (!paths) continue;
      for (const loc of ['zh-CN', 'en']) {
        const row = locs[loc], p = paths[loc];
        if (!row || !p) continue;
        const before = fs.readFileSync(p, 'utf8');
        let text = before;
        const { data } = parseFrontmatter(text);

        // frontmatter
        for (const [col, key] of Object.entries(t.fm)) {
          let sv = row[col];
          if (col === 'keywords' && typeof sv === 'string') { try { sv = JSON.parse(sv); } catch { /* keep */ } }
          if (col === 'publication_date' && sv != null) sv = String(sv).slice(0, 10); // 只取日期部分
          if (sv == null) continue;
          if (fmtVal(sv) !== (data[key] == null ? '' : fmtVal(data[key]))) text = patchFrontmatter(text, key, sv);
        }

        // body
        if (t.body === 'sections' && row.body) {
          let sec = row.body;
          if (typeof sec === 'string') { try { sec = JSON.parse(sec); } catch { sec = null; } }
          if (sec && sec.sections) text = patchBody(text, sec.sections);
        } else if (t.body === 'description' && row.description) {
          let blocks = row.description;
          if (typeof blocks === 'string') { try { blocks = JSON.parse(blocks); } catch { blocks = null; } }
          if (blocks) text = patchDescription(text, blocksToText(blocks));
        }

        if (text !== before) { fs.writeFileSync(p, text); changed++; report.push(`  ${t.dir}/${path.basename(p)}`); }
      }
    }
  }
  db.close();
  console.log(changed ? `✓ Strapi → .md 同步：改了 ${changed} 个文件` : '✓ 无差异：.md 已与 Strapi 一致');
  report.forEach((r) => console.log(r));
}

run();
