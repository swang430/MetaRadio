const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const CMS_DIR = path.resolve(__dirname, '..', 'cms');
const STRAPI_PACKAGE_PATH = path.resolve(CMS_DIR, 'node_modules', '@strapi', 'strapi');
const {
  mockPages,
  mockSolutions,
  mockCaseStudies,
  mockArticles,
  mockResources,
  mockSiteSettings,
} = require('../lib/mock-data');

const SUPPORTED_LOCALES = ['en', 'zh'];
const LOCALE_PRIORITIES = ['en', 'zh'];
const MEDIA_FIELD_KEYS = new Set(['media', 'bgMedia', 'beforeMedia', 'afterMedia']);

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

function cleanseMediaPlaceholders(value) {
  if (!value) return;
  if (Array.isArray(value)) {
    value.forEach((item) => cleanseMediaPlaceholders(item));
    return;
  }
  if (typeof value !== 'object') return;
  for (const [key, val] of Object.entries(value)) {
    if (MEDIA_FIELD_KEYS.has(key)) {
      if (val == null) {
        value[key] = null;
        continue;
      }
      if (Array.isArray(val)) {
        value[key] = val.filter((entry) => typeof entry === 'number' && Number.isInteger(entry));
        continue;
      }
      if (typeof val === 'number') {
        value[key] = val;
        continue;
      }
      if (typeof val === 'object' && typeof val.id === 'number') {
        value[key] = val.id;
        continue;
      }
      value[key] = null;
      continue;
    }
    cleanseMediaPlaceholders(val);
  }
}

function sanitizePayload(input) {
  if (!input) return null;
  const cloned = cloneDeep(input);
  delete cloned.id;
  delete cloned.locale;
  delete cloned.documentId;
  delete cloned.createdAt;
  delete cloned.updatedAt;
  delete cloned.publishedAt;
  cleanseMediaPlaceholders(cloned);
  return cloned;
}

function extractAttributes(entry) {
  if (!entry) return null;
  if (entry.attributes && typeof entry.attributes === 'object') {
    return entry.attributes;
  }
  return entry;
}

function buildLocalizedSlugMap(collection) {
  const map = new Map();
  for (const locale of SUPPORTED_LOCALES) {
    const localeEntries = collection?.[locale];
    if (!localeEntries) continue;
    if (Array.isArray(localeEntries)) {
      localeEntries.forEach((entry) => {
        const attrs = sanitizePayload(extractAttributes(entry));
        if (!attrs?.slug) return;
        if (!map.has(attrs.slug)) map.set(attrs.slug, {});
        map.get(attrs.slug)[locale] = attrs;
      });
    } else {
      Object.values(localeEntries).forEach((entry) => {
        const attrs = sanitizePayload(extractAttributes(entry));
        if (!attrs?.slug) return;
        if (!map.has(attrs.slug)) map.set(attrs.slug, {});
        map.get(attrs.slug)[locale] = attrs;
      });
    }
  }
  return map;
}

async function cleanupLegacyRecords(strapi, uid, slug) {
  const legacyEntries = await strapi.db.query(uid).findMany({
    where: { slug },
    select: ['id', 'documentId'],
  });
  const orphaned = legacyEntries.filter((entry) => !entry.documentId);
  if (!orphaned.length) return;
  console.log(`  • Removing ${orphaned.length} legacy record(s) without documentId.`);
  for (const entry of orphaned) {
    await strapi.entityService.delete(uid, entry.id);
  }
}

async function ensureLocalizedDocument(strapi, uid, { slug, localesData, label }) {
  const hasLocales = Object.values(localesData || {}).some(Boolean);
  if (!hasLocales) {
    console.log(`\n→ Skipping ${label}${slug ? ` "${slug}"` : ''} (no data available).`);
    return;
  }

  console.log(`\n→ Upserting ${label}${slug ? ` "${slug}"` : ''}`);
  if (slug) {
    await cleanupLegacyRecords(strapi, uid, slug);
  }

  const query = {
    publicationState: 'preview',
    pageSize: 100,
  };
  if (slug) {
    query.filters = { slug: { $eq: slug } };
  }
  const existingDocs = await strapi.documents(uid).findMany(query);
  const documentIds = [...new Set(existingDocs.map((doc) => doc.documentId).filter(Boolean))];
  let documentId = documentIds[0] || null;
  if (documentIds.length > 1) {
    console.log(`  • Detected ${documentIds.length} document entries, keeping the first and deleting the rest.`);
    for (const redundantId of documentIds.slice(1)) {
      await strapi.documents(uid).delete({ documentId: redundantId });
    }
  }

  const existingByLocale = new Map();
  existingDocs.forEach((doc) => {
    if (doc?.locale) {
      existingByLocale.set(doc.locale, doc);
    }
  });

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
    const existingLocaleDoc = existingByLocale.get(locale);
    if (existingLocaleDoc?.documentId) {
      await strapi.documents(uid).update({
        documentId: existingLocaleDoc.documentId,
        locale,
        data: payload,
        status: 'published',
      });
      documentId = existingLocaleDoc.documentId;
    } else {
      const created = await strapi.documents(uid).create({
        documentId: documentId || undefined,
        locale,
        data: payload,
        status: 'published',
      });
      documentId = created.documentId;
    }
  }

  if (documentId) {
    console.log(`  • ${label}${slug ? ` "${slug}"` : ''} synced (documentId=${documentId}).`);
  } else {
    console.warn(`  • Warning: ${label}${slug ? ` "${slug}"` : ''} did not create any document.`);
  }
}

async function seedCollectionFromMock(strapi, { label, uid, collection }) {
  const slugMap = buildLocalizedSlugMap(collection);
  const entries = Array.from(slugMap.entries()).sort(([a], [b]) => a.localeCompare(b));
  for (const [slug, localesData] of entries) {
    await ensureLocalizedDocument(strapi, uid, { slug, localesData, label });
  }
}

async function seedSiteSettings(strapi) {
  const zh = sanitizePayload(mockSiteSettings.attributes);
  const en = sanitizePayload({
    ...cloneDeep(mockSiteSettings.attributes),
    defaultSeo: {
      metaTitle: 'MetaRadio — Electromagnetic Digital Twin',
      metaDescription:
        'MetaRadio delivers ray-tracing powered channel intelligence for communications, automotive, and industrial teams.',
    },
  });
  const localesData = { zh, en };
  await ensureLocalizedDocument(strapi, 'api::site-setting.site-setting', {
    slug: null,
    localesData,
    label: 'Site settings',
  });
}

async function main() {
  console.log('🌱 Seeding Strapi content (pages, solutions, cases, articles, resources, site settings)...');
  const strapi = await bootstrapStrapi();
  try {
    await seedCollectionFromMock(strapi, {
      label: 'Page',
      uid: 'api::page.page',
      collection: mockPages,
    });
    await seedCollectionFromMock(strapi, {
      label: 'Solution',
      uid: 'api::solution.solution',
      collection: mockSolutions,
    });
    await seedCollectionFromMock(strapi, {
      label: 'Case study',
      uid: 'api::case-study.case-study',
      collection: mockCaseStudies,
    });
    await seedCollectionFromMock(strapi, {
      label: 'Article',
      uid: 'api::article.article',
      collection: mockArticles,
    });
    await seedCollectionFromMock(strapi, {
      label: 'Resource',
      uid: 'api::resource.resource',
      collection: mockResources,
    });
    await seedSiteSettings(strapi);
    console.log('\n✅ Seed completed with full mock parity.');
  } catch (error) {
    console.error('\n❌ Seed failed:', error);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
}

main();
