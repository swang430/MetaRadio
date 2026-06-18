'use strict';
/**
 * metaradio-cms Seed 脚本（Strapi 5, content-as-code）。
 *
 * - 程序化启动 Strapi，seed platform / solution / resource 三个内容类型（双语 + 已发布）
 * - 确保 en / zh-CN 两个 locale 存在
 * - 开放 public 角色对三个类型的 find/findOne（前端无 token 公共读取）
 * - 幂等：按 slug 先删后建，可重复运行
 *
 * 用法：cd metaradio-cms && npm run seed
 */
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const SUPPORTED_LOCALES = ['en', 'zh-CN']; // en 优先，确保 documentId 稳定
const COLLECTIONS = [
  // platform / solution 内容类型已随命名迁移退役（前端走 datasheet）；此处仅保留 resource。
  { key: 'resources', uid: 'api::resource.resource', api: 'resource', label: 'Resource' },
];

const seedData = require('./seed-data');
const clone = (v) => JSON.parse(JSON.stringify(v));

async function ensureLocales(strapi) {
  const localesService = strapi.plugin('i18n').service('locales');
  const existing = await localesService.find();
  const codes = new Set((existing || []).map((l) => l.code));
  const names = { en: 'English (en)', 'zh-CN': 'Chinese (China) (zh-CN)' };
  for (const code of SUPPORTED_LOCALES) {
    if (!codes.has(code)) {
      await localesService.create({ code, name: names[code] || code });
      console.log(`  • 创建 locale ${code}`);
    }
  }
}

async function seedEntry(strapi, uid, label, slug, locales) {
  // 幂等：删除同 slug 的现有文档（连带所有语言/草稿/已发布）
  const existing = await strapi.documents(uid).findMany({ filters: { slug: { $eq: slug } }, locale: '*' });
  const ids = [...new Set((existing || []).map((d) => d.documentId).filter(Boolean))];
  for (const id of ids) {
    await strapi.documents(uid).delete({ documentId: id });
  }

  let documentId = null;
  for (const locale of SUPPORTED_LOCALES) {
    const data = locales[locale];
    if (!data) continue;
    const payload = clone(data);
    payload.slug = slug;
    if (documentId) payload.documentId = documentId; // 链接到同一文档
    const created = await strapi.documents(uid).create({
      documentId: documentId || undefined,
      locale,
      data: payload,
      status: 'published',
    });
    documentId = created.documentId;
  }
  console.log(`  ✓ ${label} "${slug}" (documentId=${documentId})`);
}

async function grantPublicRead(strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) {
    console.warn('  ⚠ 未找到 public 角色，跳过权限设置');
    return;
  }
  for (const c of COLLECTIONS) {
    for (const action of ['find', 'findOne']) {
      const actionId = `api::${c.api}.${c.api}.${action}`;
      const exists = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({ where: { action: actionId, role: publicRole.id } });
      if (!exists) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .create({ data: { action: actionId, role: publicRole.id } });
        console.log(`  • 授予 public: ${actionId}`);
      }
    }
  }
}

async function run() {
  try {
    require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
  } catch {
    /* Strapi 自身也会加载 .env */
  }
  const { compileStrapi, createStrapi } = require('@strapi/strapi');
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';

  console.log('🌱 metaradio-cms seed 开始');
  await ensureLocales(app);
  for (const c of COLLECTIONS) {
    console.log(`\n→ ${c.label}`);
    // 清空该集合旧条目（含已迁移命名的残留），保证 seed 是干净的全量重建。
    await app.db.query(c.uid).deleteMany({ where: {} });
    for (const entry of seedData[c.key] || []) {
      await seedEntry(app, c.uid, c.label, entry.slug, entry.locales);
    }
  }
  await grantPublicRead(app);
  console.log('\n✅ seed 完成');
  await app.destroy();
  process.exit(0);
}

run().catch((e) => {
  console.error('seed 失败:', e);
  process.exit(1);
});
