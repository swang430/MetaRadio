#!/usr/bin/env node

/**
 * Strapi 内容导出脚本
 *
 * 用途：从 Strapi 后台导出已编辑的内容，保存为 seed 数据格式
 * 使用：npm run export:strapi [--only pages|solutions|cases|articles|resources]
 *
 * 示例：
 *   npm run export:strapi              # 导出所有内容
 *   npm run export:strapi --only pages # 仅导出页面
 */

require('dotenv').config({ path: './cms/.env' });
const fs = require('fs');
const path = require('path');

// ========== 配置 ==========
const STRAPI_URL = process.env.STRAPI_API_URL || 'http://localhost:1337';
const API_TOKEN = process.env.STRAPI_API_TOKEN;
const SUPPORTED_LOCALES = ['en', 'zh'];

const CONTENT_TYPES = {
  pages: {
    uid: 'api::page.page',
    path: './scripts/seed-data/pages.js',
    endpoint: '/api/pages',
  },
  solutions: {
    uid: 'api::solution.solution',
    path: './scripts/seed-data/solutions.js',
    endpoint: '/api/solutions',
  },
  cases: {
    uid: 'api::case-study.case-study',
    path: './scripts/seed-data/cases.js',
    endpoint: '/api/case-studies',
  },
  articles: {
    uid: 'api::article.article',
    path: './scripts/seed-data/articles.js',
    endpoint: '/api/articles',
  },
  resources: {
    uid: 'api::resource.resource',
    path: './scripts/seed-data/resources.js',
    endpoint: '/api/resources',
  },
};

// Strapi v5 Dynamic Zones populate 配置
// 参考: https://docs.strapi.io/dev-docs/api/rest/guides/understanding-populate#populate-dynamic-zones
const POPULATE_CONFIG = {
  pages: 'populate[blocks][populate]=*',
  solutions: 'populate[blocks][populate]=*',
  cases: 'populate=*',
  articles: 'populate=*',
  resources: 'populate=*',
};

// ========== 工具函数 ==========

/**
 * 从 Strapi API 获取数据
 */
async function fetchFromStrapi(endpoint, locale, contentType) {
  // 构建 URL，使用 Strapi v5 兼容的 populate 语法
  const populateQuery = POPULATE_CONFIG[contentType] || 'populate=*';
  const url = `${STRAPI_URL}${endpoint}?locale=${locale}&${populateQuery}&pagination[pageSize]=100`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`  ⚠️  响应内容: ${errorText.substring(0, 300)}`);
    throw new Error(`Failed to fetch ${endpoint} (${locale}): ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  return json.data || [];
}

/**
 * 清理数据：移除 Strapi 元数据，只保留业务字段
 */
function cleanData(item) {
  if (!item) return null;

  const cleaned = {};

  // 如果有 attributes，提取出来
  const data = item.attributes || item;

  for (const [key, value] of Object.entries(data)) {
    // 跳过元数据字段
    if (['createdAt', 'updatedAt', 'publishedAt', 'createdBy', 'updatedBy', 'locale', 'localizations'].includes(key)) {
      continue;
    }

    // 递归处理嵌套对象
    if (value && typeof value === 'object') {
      if (Array.isArray(value)) {
        cleaned[key] = value.map(cleanData).filter(Boolean);
      } else if (value.data) {
        // 处理 Strapi 关系字段 { data: {...} }
        if (Array.isArray(value.data)) {
          cleaned[key] = value.data.map(cleanData).filter(Boolean);
        } else {
          cleaned[key] = cleanData(value.data);
        }
      } else {
        cleaned[key] = cleanData(value);
      }
    } else {
      cleaned[key] = value;
    }
  }

  return cleaned;
}

/**
 * 按 slug 分组多语言内容
 */
function groupBySlug(items) {
  const grouped = new Map();

  for (const item of items) {
    const attrs = item.attributes || item;
    const slug = attrs.slug;
    const locale = attrs.locale;

    if (!slug) {
      console.warn('⚠️  跳过无 slug 的条目:', item.id);
      continue;
    }

    if (!grouped.has(slug)) {
      grouped.set(slug, { slug, locales: {} });
    }

    const cleanedData = cleanData(attrs);
    delete cleanedData.slug; // slug 已在顶层

    grouped.get(slug).locales[locale] = cleanedData;
  }

  return Array.from(grouped.values());
}

/**
 * 生成 JavaScript 文件内容
 */
function generateJsFile(data, typeName) {
  const header = `/**
 * ${typeName.charAt(0).toUpperCase() + typeName.slice(1)} 种子数据
 *
 * 🤖 此文件由 export-strapi.js 自动生成
 * 📅 生成时间: ${new Date().toISOString()}
 *
 * ⚠️  注意：如需修改内容，请在 Strapi Admin Panel 中编辑后重新导出
 */

module.exports = ${JSON.stringify(data, null, 2)};
`;

  return header;
}

/**
 * 保存文件（备份旧文件）
 */
function saveFile(filePath, content) {
  const fullPath = path.resolve(process.cwd(), filePath);
  const backupPath = fullPath.replace(/\.js$/, `.backup-${Date.now()}.js`);

  // 备份旧文件
  if (fs.existsSync(fullPath)) {
    fs.copyFileSync(fullPath, backupPath);
    console.log(`  📦 已备份旧文件: ${path.basename(backupPath)}`);
  }

  // 写入新文件
  fs.writeFileSync(fullPath, content, 'utf-8');
  console.log(`  ✅ 已保存: ${filePath}`);
}

/**
 * 导出指定内容类型
 */
async function exportContentType(typeName, config) {
  console.log(`\n📤 正在导出: ${typeName}`);
  console.log(`  端点: ${config.endpoint}`);

  try {
    // 获取所有语言版本的数据
    const allItems = [];
    for (const locale of SUPPORTED_LOCALES) {
      console.log(`  🌍 获取 ${locale} 版本...`);
      const items = await fetchFromStrapi(config.endpoint, locale, typeName);
      allItems.push(...items);
      console.log(`     找到 ${items.length} 条记录`);
    }

    if (allItems.length === 0) {
      console.log(`  ⚠️  无数据，跳过导出`);
      return;
    }

    // 按 slug 分组
    const grouped = groupBySlug(allItems);
    console.log(`  🔗 合并为 ${grouped.length} 个多语言条目`);

    // 生成文件内容
    const fileContent = generateJsFile(grouped, typeName);

    // 保存文件
    saveFile(config.path, fileContent);

    console.log(`  ✨ ${typeName} 导出完成!`);
  } catch (error) {
    console.error(`  ❌ 导出 ${typeName} 失败:`, error.message);
    throw error;
  }
}

/**
 * 主函数
 */
async function main() {
  console.log('🚀 Strapi 内容导出脚本\n');

  // 验证配置
  if (!API_TOKEN) {
    console.error('❌ 错误: 未设置 STRAPI_API_TOKEN 环境变量');
    console.error('   请在 cms/.env 中配置或运行:');
    console.error('   export STRAPI_API_TOKEN=your_token_here');
    process.exit(1);
  }

  console.log(`📍 Strapi URL: ${STRAPI_URL}`);
  console.log(`🌍 支持语言: ${SUPPORTED_LOCALES.join(', ')}`);

  // 解析命令行参数
  const args = process.argv.slice(2);
  const onlyIndex = args.indexOf('--only');
  const targetTypes = onlyIndex !== -1 && args[onlyIndex + 1]
    ? [args[onlyIndex + 1]]
    : Object.keys(CONTENT_TYPES);

  // 验证目标类型
  for (const type of targetTypes) {
    if (!CONTENT_TYPES[type]) {
      console.error(`❌ 错误: 未知的内容类型 "${type}"`);
      console.error(`   可用类型: ${Object.keys(CONTENT_TYPES).join(', ')}`);
      process.exit(1);
    }
  }

  console.log(`📦 导出内容: ${targetTypes.join(', ')}\n`);

  // 执行导出
  for (const type of targetTypes) {
    await exportContentType(type, CONTENT_TYPES[type]);
  }

  console.log('\n✅ 所有导出任务完成!\n');
  console.log('📋 后续步骤:');
  console.log('   1. 检查生成的文件是否正确');
  console.log('   2. 提交到 Git: git add scripts/seed-data/');
  console.log('   3. 推送到仓库: git push');
  console.log('   4. 迁移时运行: npm run seed:strapi\n');
}

// 运行主函数
main().catch((error) => {
  console.error('\n❌ 导出失败:', error);
  process.exit(1);
});
