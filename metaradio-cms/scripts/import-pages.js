'use strict';
/**
 * 把 seed-data/pages/*.md（叙事页文案，分节结构）解析并导入 Strapi 的 page 内容类型。
 * 让首页/Foundations/服务/关于等页面的文案后台可编辑、中英同步——与 datasheet 同一条管道。
 * 版式/图表/交互逻辑仍在前端代码里，这里只管"内容"。
 *
 * 用法：
 *   node scripts/import-pages.js --dry            # 仅解析打印（不连 Strapi）
 *   cd metaradio-cms && npm run import:pages       # 解析 + 写入 Strapi（中英、发布、开放公共读）
 */
const fs = require('fs');
const path = require('path');
const { parseFrontmatter, slugify, parseBody } = require('./md-parser');

const PAGES_DIR = path.resolve(__dirname, '..', 'seed-data', 'pages');
const UID = 'api::page.page';
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const onlyIdx = args.indexOf('--only');
const ONLY = onlyIdx >= 0 ? args[onlyIdx + 1] : null;

/** .md → Strapi page 记录。 */
function toRecord(filename, raw) {
  const { data, body } = parseFrontmatter(raw);
  const sections = parseBody(body);
  const slug = data.slug || slugify(path.basename(filename, '.md').replace(/\.en$/, ''));
  return {
    slug,
    locale: data.language === 'en' ? 'en' : 'zh-CN',
    data: { slug, title: data.title || slug, body: { sections } },
  };
}

function loadAll() {
  if (!fs.existsSync(PAGES_DIR)) return [];
  return fs
    .readdirSync(PAGES_DIR)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => !ONLY || f.toLowerCase().includes(ONLY.toLowerCase()))
    .map((f) => toRecord(f, fs.readFileSync(path.join(PAGES_DIR, f), 'utf8')));
}

async function grantPublicRead(strapi) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!role) return;
  for (const action of ['find', 'findOne']) {
    const actionId = `${UID}.${action}`;
    const exists = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { action: actionId, role: role.id } });
    if (!exists) {
      await strapi.db.query('plugin::users-permissions.permission').create({ data: { action: actionId, role: role.id } });
      console.log(`  • 授予 public: ${actionId}`);
    }
  }
}

/** 同 slug 的多 locale 一起 upsert：zh-CN 先建拿 documentId，其余 locale link。 */
async function upsertGroup(strapi, slug, recs) {
  recs.sort((a, b) => (a.locale === 'zh-CN' ? -1 : b.locale === 'zh-CN' ? 1 : 0));
  await strapi.db.query(UID).deleteMany({ where: { slug } });
  let documentId = null;
  for (const rec of recs) {
    if (!documentId) {
      const doc = await strapi.documents(UID).create({ locale: rec.locale, status: 'published', data: rec.data });
      documentId = doc.documentId;
    } else {
      await strapi.documents(UID).update({ documentId, locale: rec.locale, status: 'published', data: rec.data });
    }
    console.log(`  ✓ ${slug} [${rec.locale}] ${rec.data.title}`);
  }
}

async function run() {
  const records = loadAll();
  if (DRY) {
    for (const r of records) {
      console.log(`\n===== ${r.slug} (${r.locale}) =====`);
      console.log('sections:', r.data.body.sections.map((s) => `${s.id}[L${s.level}] fields:${Object.keys(s.fields).length} items:${s.items.length} table:${s.table.length} bullets:${s.bullets.length}`).join('\n          '));
    }
    console.log(`\n[dry] 解析 ${records.length} 个 page 记录，未写入 Strapi。`);
    process.exit(0);
  }

  try {
    require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
  } catch {}
  const { compileStrapi, createStrapi } = require('@strapi/strapi');
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';

  const groups = new Map();
  for (const r of records) {
    if (!groups.has(r.slug)) groups.set(r.slug, []);
    groups.get(r.slug).push(r);
  }
  console.log(`🌱 导入 ${groups.size} 个 page（${records.length} 条 locale 记录）`);
  for (const [slug, recs] of groups) await upsertGroup(app, slug, recs);
  await grantPublicRead(app);
  console.log('✅ page 导入完成');
  await app.destroy();
  process.exit(0);
}

run().catch((e) => {
  console.error('导入失败:', e);
  process.exit(1);
});
