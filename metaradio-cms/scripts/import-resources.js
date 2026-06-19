'use strict';
/**
 * 把 seed-data/resources/*.md 解析并导入 Strapi 的 resource 内容类型。
 * 与 datasheet / page 同一条 .md 管道——resources 也纳入"同源"（IN）。
 *
 * resource .md：frontmatter(slug/title/type/publicationDate/language) + 正文(Description 纯文本)。
 *
 * 用法：
 *   node scripts/import-resources.js --dry        # 仅解析打印（不连 Strapi）
 *   cd metaradio-cms && npm run import:resources    # 解析 + 写入 Strapi（中英、发布、开放公共读）
 */
const fs = require('fs');
const path = require('path');
const { parseFrontmatter, slugify } = require('./md-parser');

const DIR = path.resolve(__dirname, '..', 'seed-data', 'resources');
const UID = 'api::resource.resource';
const args = process.argv.slice(2);
const DRY = args.includes('--dry');

/** 纯文本 → Strapi blocks 富文本（按空行分段）。 */
const rich = (text) =>
  String(text)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => ({ type: 'paragraph', children: [{ type: 'text', text: p }] }));

/** resource .md → Strapi 记录。 */
function toRecord(filename, raw) {
  const { data, body } = parseFrontmatter(raw);
  const slug = data.slug || slugify(path.basename(filename, '.md').replace(/\.en$/, ''));
  return {
    slug,
    locale: data.language === 'en' ? 'en' : 'zh-CN',
    data: {
      slug,
      Title: data.title || slug,
      Description: rich(body.trim()),
      type: data.type || '',
      publicationDate: data.publicationDate || null,
    },
  };
}

function loadAll() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => toRecord(f, fs.readFileSync(path.join(DIR, f), 'utf8')));
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

/** 同 slug 多 locale 一起 upsert：zh-CN 先建拿 documentId，其余 locale link。 */
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
    console.log(`  ✓ ${slug} [${rec.locale}] ${rec.data.Title}`);
  }
}

async function run() {
  const records = loadAll();
  if (DRY) {
    for (const r of records) console.log(`${r.slug} [${r.locale}]  Title=${r.data.Title}  type=${r.data.type}  date=${r.data.publicationDate}  descBlocks=${r.data.Description.length}`);
    console.log(`\n[dry] 解析 ${records.length} 条 resource 记录，未写入 Strapi。`);
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
  console.log(`🌱 导入 ${groups.size} 个 resource（${records.length} 条 locale 记录）`);
  for (const [slug, recs] of groups) await upsertGroup(app, slug, recs);
  await grantPublicRead(app);
  console.log('✅ resource 导入完成');
  await app.destroy();
  process.exit(0);
}

run().catch((e) => {
  console.error('导入失败:', e);
  process.exit(1);
});
