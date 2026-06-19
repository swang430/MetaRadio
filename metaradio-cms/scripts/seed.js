'use strict';
/**
 * metaradio-cms 引导脚本（content-as-code）。
 *
 * 内容现在**全部经 .md 管道导入**：
 *   npm run import:datasheets / import:pages / import:resources
 * 本脚本只做「引导」：确保 en / zh-CN 两个 locale 存在 + 开放 public 角色对三类内容的
 * find / findOne（前端无 token 公共读取）。不再播种/清空任何内容（真相源是 seed-data/**.md）。
 *
 * 用法：cd metaradio-cms && npm run seed
 */
const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const SUPPORTED_LOCALES = ['en', 'zh-CN'];
const APIS = ['resource', 'datasheet', 'page'];

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

async function grantPublicRead(strapi) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) {
    console.warn('  ⚠ 未找到 public 角色，跳过权限设置');
    return;
  }
  for (const api of APIS) {
    for (const action of ['find', 'findOne']) {
      const actionId = `api::${api}.${api}.${action}`;
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

  console.log('🌱 metaradio-cms 引导开始（locale + public 权限；内容走 import:*）');
  await ensureLocales(app);
  await grantPublicRead(app);
  console.log('\n✅ 引导完成');
  await app.destroy();
  process.exit(0);
}

run().catch((e) => {
  console.error('引导失败:', e);
  process.exit(1);
});
