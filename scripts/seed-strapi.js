const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const {
  mockPages,
  mockSolutions,
  mockCaseStudies,
  mockArticles,
  mockResources,
  mockSiteSettings,
} = require('../lib/mock-data.js');

const CMS_DIR = path.resolve(__dirname, '..', 'cms');
const STRAPI_PACKAGE_PATH = path.resolve(CMS_DIR, 'node_modules', '@strapi', 'strapi');

const SUPPORTED_LOCALES = ['en', 'zh'];
const DEFAULT_LOCALE = SUPPORTED_LOCALES[0];

function loadCmsEnv() {
  const envPath = path.resolve(CMS_DIR, '.env');
  require('dotenv').config({ path: envPath });
}

async function bootstrapStrapi() {
  loadCmsEnv();
  process.chdir(CMS_DIR);

  const { compileStrapi, createStrapi } = require(STRAPI_PACKAGE_PATH);
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();
  return strapi;
}

function sanitize(value) {
  if (Array.isArray(value)) {
    return value.map(sanitize);
  }
  if (value && typeof value === 'object') {
    return Object.entries(value).reduce((acc, [key, val]) => {
      if (key === 'id' || key === 'suffix' || key === 'locale' || key === 'publishedAt') {
        return acc;
      }
      acc[key] = sanitize(val);
      return acc;
    }, {});
  }
  return value;
}

async function clearCollection(strapi, uid) {
  console.log(`  Clearing collection: ${uid}...`);
  const records = await strapi.db.query(uid).findMany({ select: ['id'], limit: null });
  if (!records.length) {
    console.log('  - Collection already empty.');
    return;
  }
  for (const record of records) {
    await strapi.db.query(uid).delete({ where: { id: record.id } });
  }
  console.log(`  - Deleted ${records.length} entries.`);
}

async function resetSiteSetting(strapi, data) {
  console.log('  Seeding single type: api::site-setting.site-setting');
  const sanitized = sanitize(data);
  const existing = await strapi.db.query('api::site-setting.site-setting').findOne({ select: ['id'] });
  if (existing) {
    await strapi.entityService.update('api::site-setting.site-setting', existing.id, {
      data: sanitized,
    });
    console.log('  - Updated existing Site Setting.');
  } else {
    await strapi.entityService.create('api::site-setting.site-setting', {
      data: sanitized,
    });
    console.log('  - Created Site Setting.');
  }
}

function normalizeMockCollection(collectionByLocale) {
  const map = new Map();

  for (const [locale, records] of Object.entries(collectionByLocale)) {
    if (!SUPPORTED_LOCALES.includes(locale)) continue;
    const items = Array.isArray(records) ? records : Object.values(records || {});

    for (const item of items) {
      const rawAttrs = item.attributes || item;
      const attrs = sanitize(rawAttrs);
      const slug = attrs.slug;

      if (!slug) {
        console.warn(`    ⚠️  Skipping entry without slug in locale ${locale}.`);
        continue;
      }

      if (!map.has(slug)) {
        map.set(slug, {});
      }
      map.get(slug)[locale] = attrs;
    }
  }

  return map;
}

async function seedLocalizedCollection(strapi, uid, collectionByLocale) {
  const localeMap = normalizeMockCollection(collectionByLocale);

  for (const [slug, localeData] of localeMap.entries()) {
    const baseData = localeData[DEFAULT_LOCALE];
    if (!baseData) {
      console.warn(`    ⚠️  Skip "${slug}" because default locale (${DEFAULT_LOCALE}) data is missing.`);
      continue;
    }

    const baseDocument = await strapi.documents(uid).create({
      locale: DEFAULT_LOCALE,
      status: 'published',
      data: {
        ...baseData,
        slug,
      },
    });
    console.log(`    • Created ${uid} (${slug}) [${DEFAULT_LOCALE}]`);

    for (const locale of SUPPORTED_LOCALES) {
      if (locale === DEFAULT_LOCALE) continue;
      const localizedData = localeData[locale];
      if (!localizedData) continue;

      await strapi.documents(uid).create({
        documentId: baseDocument.documentId,
        locale,
        status: 'published',
        data: {
          ...localizedData,
          slug,
        },
      });
      console.log(`    • Added locale ${locale} for ${slug}`);
    }
  }
}

async function main() {
  console.log('🌱 Starting Strapi content seeding (entity service)...');
  const strapi = await bootstrapStrapi();

  try {
    const collectionUids = [
      'api::page.page',
      'api::solution.solution',
      'api::case-study.case-study',
      'api::article.article',
      'api::resource.resource',
    ];

    console.log('PHASE 1: Clearing existing content via Strapi core APIs...');
    for (const uid of collectionUids) {
      await clearCollection(strapi, uid);
    }
    await clearCollection(strapi, 'plugin::upload.file');
    await clearCollection(strapi, 'plugin::upload.folder');

    console.log('PHASE 2: Seeding single types...');
    await resetSiteSetting(strapi, mockSiteSettings.attributes || mockSiteSettings);

    console.log('PHASE 3: Seeding collection types with localized entries...');
    await seedLocalizedCollection(strapi, 'api::page.page', mockPages);
    await seedLocalizedCollection(strapi, 'api::solution.solution', mockSolutions);
    await seedLocalizedCollection(strapi, 'api::case-study.case-study', mockCaseStudies);
    await seedLocalizedCollection(strapi, 'api::article.article', mockArticles);
    await seedLocalizedCollection(strapi, 'api::resource.resource', mockResources);

    console.log('\n✅ Strapi seed completed successfully.\n');
  } catch (error) {
    console.error('\n❌ An error occurred during seeding:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
}

main();
