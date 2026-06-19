'use strict';
/**
 * Strapi → JSON 导出（seed-out）。
 *
 * 把 Strapi 里的**已发布内容**（含后台 GUI 的改动）导出为 git 可版本化的 JSON：
 *   seed-data/_export/<type>/<slug>.json   （按 slug，内含 zh-CN / en 两个 locale）
 *
 * 实现：直读 Strapi 的 SQLite（readonly，不抢锁、不需要 HTTP，也不程序化 boot Strapi）。
 * 为什么不走 /api：本机 Strapi 的 HTTP(:1337) 当前不响应；直读库最稳。
 * 局限：耦合 Strapi 内部表结构（datasheets/pages/resources）；若以后 /api 恢复，可换成走 API（更稳）。
 * 只导**已发布**（published_at 非空）= 站点实际在发的内容；草稿不含。
 *
 * 用法：cd metaradio-cms && npm run export
 */
const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const CMS = path.resolve(__dirname, '..');
const DB_PATH = process.env.DATABASE_FILENAME
  ? path.resolve(CMS, process.env.DATABASE_FILENAME)
  : path.join(CMS, '.tmp', 'data.db');
const OUT = path.join(CMS, 'seed-data', '_export');

// 各内容类型表 + 哪些列是 JSON（需 parse，避免双重转义）
const TYPES = [
  { table: 'datasheets', json: ['keywords', 'body'] },
  { table: 'pages', json: ['body'] },
  { table: 'resources', json: ['description'] },
];

// Strapi 内部列，导出时剔除
const SKIP = new Set([
  'id', 'document_id', 'created_at', 'updated_at', 'published_at', 'created_by_id', 'updated_by_id', 'locale',
]);

function projectRow(row, jsonCols) {
  const o = {};
  for (const [k, v] of Object.entries(row)) {
    if (SKIP.has(k)) continue;
    if (jsonCols.includes(k) && typeof v === 'string') {
      try { o[k] = JSON.parse(v); } catch { o[k] = v; }
    } else {
      o[k] = v;
    }
  }
  return o;
}

function run() {
  if (!fs.existsSync(DB_PATH)) {
    console.error('找不到 Strapi 库:', DB_PATH, '\n（先让 Strapi 跑起来并 seed，再导出）');
    process.exit(1);
  }
  const db = new Database(DB_PATH, { readonly: true, fileMustExist: true });
  fs.mkdirSync(OUT, { recursive: true });

  const counts = {};
  for (const t of TYPES) {
    const dir = path.join(OUT, t.table);
    fs.mkdirSync(dir, { recursive: true });
    const rows = db
      .prepare(`SELECT * FROM "${t.table}" WHERE published_at IS NOT NULL ORDER BY slug, locale`)
      .all();
    const bySlug = {};
    for (const r of rows) {
      if (!r.slug) continue;
      (bySlug[r.slug] ||= { slug: r.slug });
      bySlug[r.slug][r.locale] = projectRow(r, t.json);
    }
    for (const [slug, doc] of Object.entries(bySlug)) {
      fs.writeFileSync(path.join(dir, `${slug}.json`), JSON.stringify(doc, null, 2) + '\n');
    }
    counts[t.table] = Object.keys(bySlug).length;
    console.log(`  ✓ ${t.table}: ${counts[t.table]} 个文档（${rows.length} 行含 locale）`);
  }
  db.close();

  fs.writeFileSync(
    path.join(OUT, '_index.json'),
    JSON.stringify(
      { exportedAt: new Date().toISOString(), source: 'strapi sqlite (.tmp/data.db, published only)', counts },
      null,
      2,
    ) + '\n',
  );
  console.log('✅ Strapi → JSON 导出完成 → metaradio-cms/seed-data/_export/');
}

run();
