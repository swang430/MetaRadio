/**
 * Strapi v5 种子脚本 (Unified)
 *
 * 改进点：
 * 1. 数据源从 seed-data/ 目录读取，按内容类型分文件
 * 2. 支持增量更新：可选择只 seed 特定类型或特定条目
 * 3. 中英文 locale 自动合并到同一个 documentId
 * 4. 提供 --only 参数指定只 seed 某些内容
 *
 * 用法：
 *   node scripts/seed-strapi.js                    # 全量 seed
 *   node scripts/seed-strapi.js --only pages       # 只 seed pages
 *   node scripts/seed-strapi.js --only solutions,cases  # 只 seed solutions 和 cases
 */

const path = require('path');
const seedData = require('./seed-data');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const CMS_DIR = path.resolve(__dirname, '..', 'cms');
const STRAPI_PACKAGE_PATH = path.resolve(CMS_DIR, 'node_modules', '@strapi', 'strapi');

const SUPPORTED_LOCALES = ['en', 'zh'];
const LOCALE_PRIORITIES = ['en', 'zh']; // 优先创建 en，确保 documentId 稳定

// 内容类型配置
const CONTENT_TYPES = {
  pages: {
    uid: 'api::page.page',
    label: 'Page',
  },
  solutions: {
    uid: 'api::solution.solution',
    label: 'Solution',
  },
  cases: {
    uid: 'api::case-study.case-study',
    label: 'Case Study',
  },
  articles: {
    uid: 'api::article.article',
    label: 'Article',
  },
  resources: {
    uid: 'api::resource.resource',
    label: 'Resource',
  },
};

async function bootstrapStrapi() {
  process.chdir(CMS_DIR);
  require('dotenv').config({ path: path.resolve(CMS_DIR, '.env') });
  const { compileStrapi, createStrapi } = require(STRAPI_PACKAGE_PATH);
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();
  return strapi;
}

function cloneDeep(value) {
  if (typeof global.structuredClone === 'function') {
    return global.structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

/**
 * 清理遗留的无 documentId 记录
 */
async function cleanupLegacyRecords(strapi, uid, slug) {
  const legacyEntries = await strapi.db.query(uid).findMany({
    where: { slug },
    select: ['id', 'documentId'],
  });
  const orphaned = legacyEntries.filter((entry) => !entry.documentId);
  if (orphaned.length > 0) {
    console.log(`  • 清理 ${orphaned.length} 条无 documentId 的遗留记录`);
    for (const entry of orphaned) {
      await strapi.entityService.delete(uid, entry.id);
    }
  }
}

/**
 * 确保多语言文档存在且已发布
 *
 * @param {object} strapi - Strapi 实例
 * @param {string} uid - 内容类型 UID
 * @param {string} slug - 条目的 slug
 * @param {object} localesData - { zh: {...}, en: {...} } 各语言的数据
 * @param {string} label - 日志标签
 */
async function ensureLocalizedDocument(strapi, uid, { slug, localesData, label }) {
  const hasData = Object.values(localesData || {}).some(Boolean);
  if (!hasData) {
    console.log(`\n→ 跳过 ${label} "${slug}" (无数据)`);
    return;
  }

  console.log(`\n→ 处理 ${label} "${slug}"`);

  // 清理遗留数据
  await cleanupLegacyRecords(strapi, uid, slug);

  // 查询所有语言版本的现有文档
  const allExistingDocs = [];
  for (const locale of SUPPORTED_LOCALES) {
    const docs = await strapi.documents(uid).findMany({
      filters: { slug: { $eq: slug } },
      locale,
      publicationState: 'preview',
      pageSize: 100,
    });
    if (docs && docs.length > 0) {
      allExistingDocs.push(...docs);
      console.log(`  • 找到已有 ${locale} 版本 (documentId: ${docs[0]?.documentId})`);
    }
  }

  // 去重：保留第一个 documentId，删除其他
  const documentIds = [...new Set(allExistingDocs.map((doc) => doc.documentId).filter(Boolean))];
  let documentId = documentIds[0] || null;

  if (documentIds.length > 1) {
    console.log(`  • 发现 ${documentIds.length} 个重复文档，保留第一个并删除其余`);
    for (const redundantId of documentIds.slice(1)) {
      await strapi.documents(uid).delete({ documentId: redundantId });
    }
  }

  // 构建现有文档的 locale 映射
  const existingByLocale = new Map();
  allExistingDocs.forEach((doc) => {
    if (doc?.locale && doc.documentId === documentId) {
      existingByLocale.set(doc.locale, doc);
    }
  });

  // 按优先级处理各语言
  const localesInOrder = [
    ...LOCALE_PRIORITIES.filter((locale) => localesData[locale]),
    ...SUPPORTED_LOCALES.filter(
      (locale) => !LOCALE_PRIORITIES.includes(locale) && localesData[locale]
    ),
  ];

  for (const locale of localesInOrder) {
    const data = localesData[locale];
    if (!data) continue;

    const payload = cloneDeep(data);

    // Remove conflicting fields
    delete payload.id;
    delete payload.documentId; // Remove the one from seed data
    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.publishedAt;

    if (slug && !payload.slug) {
      payload.slug = slug;
    }

    const existingLocaleDoc = existingByLocale.get(locale);

    if (existingLocaleDoc?.documentId) {
      // 更新
      await strapi.documents(uid).update({
        documentId: existingLocaleDoc.documentId,
        locale,
        data: payload,
        status: 'published',
      });
      console.log(`  • ${locale}: 已更新 (docId: ${existingLocaleDoc.documentId})`);
      documentId = existingLocaleDoc.documentId;
    } else {
      // 创建
      // IMPORTANT: If we have a documentId (from the first locale), we MUST put it in the payload
      // for Strapi to link it.
      if (documentId) {
        payload.documentId = documentId;
      }

      console.log(`  • Creating ${locale} version. Parent documentId: ${documentId}`);
      const created = await strapi.documents(uid).create({
        documentId: documentId || undefined, // Top level
        locale,
        data: payload,
        status: 'published',
      });
      console.log(`  • ${locale}: 已创建 -> Result docId: ${created.documentId}`);
      
      if (documentId && created.documentId !== documentId) {
        console.error(`  ⚠️ WARNING: Strapi created a NEW documentId instead of linking! Expected: ${documentId}, Got: ${created.documentId}`);
      }
      
      documentId = created.documentId;
    }
  }

  if (documentId) {
    console.log(`  ✓ ${label} "${slug}" 同步完成 (documentId=${documentId})`);
  } else {
    console.warn(`  ✗ ${label} "${slug}" 未能创建文档`);
  }
}

/**
 * Seed 指定的内容类型
 */
async function seedContentType(strapi, typeKey) {
  const config = CONTENT_TYPES[typeKey];
  if (!config) {
    console.error(`✗ 未知的内容类型: ${typeKey}`);
    return;
  }

  const data = seedData[typeKey];
  if (!data || !Array.isArray(data)) {
    console.warn(`⚠ ${config.label} 数据为空或格式不正确`);
    return;
  }

  console.log(`\n━━━ 开始 seed ${config.label} (${data.length} 条) ━━━`);

  for (const entry of data) {
    const { slug, locales } = entry;
    if (!slug || !locales) {
      console.warn(`⚠ 跳过无效条目:`, entry);
      continue;
    }

    await ensureLocalizedDocument(strapi, config.uid, {
      slug,
      localesData: locales,
      label: config.label,
    });
  }
}

/**
 * 主函数
 */
async function main() {
  // 解析命令行参数
  const args = process.argv.slice(2);
  const onlyIndex = args.indexOf('--only');
  let typesToSeed = Object.keys(CONTENT_TYPES);

  if (onlyIndex !== -1 && args[onlyIndex + 1]) {
    typesToSeed = args[onlyIndex + 1].split(',').map((s) => s.trim());
  }

  console.log('🌱 Strapi v5 种子脚本 (Unified)');
  console.log(`📦 准备 seed: ${typesToSeed.join(', ')}`);
  console.log(`🌍 支持语言: ${SUPPORTED_LOCALES.join(', ')}\n`);

  const strapi = await bootstrapStrapi();

  try {
    for (const typeKey of typesToSeed) {
      await seedContentType(strapi, typeKey);
    }
    console.log('\n✅ Seed 完成！');
  } catch (error) {
    console.error('\n❌ Seed 失败:', error);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
}

main();