const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const CMS_DIR = path.resolve(__dirname, '..', 'cms');
const STRAPI_PACKAGE_PATH = path.resolve(CMS_DIR, 'node_modules', '@strapi', 'strapi');

// Duplicated from clear-strapi.js
async function bootstrapStrapi() {
  process.chdir(CMS_DIR);
  require('dotenv').config({ path: path.resolve(CMS_DIR, '.env') });
  const { compileStrapi, createStrapi } = require(STRAPI_PACKAGE_PATH);
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();
  return strapi;
}

const PAGES_EN = {
  solutions: {
    slug: 'solutions',
    title: 'Solutions',
    seo: {
      metaTitle: 'Industry Solutions · MetaRadio',
      metaDescription: 'Solutions for robotics, UAVs, V2X, high-precision positioning, and more.',
    },
  },
};

const PAGES_ZH = {
  solutions: {
    slug: 'solutions',
    title: '解决方案',
    seo: {
      metaTitle: '行业解决方案 · MetaRadio',
      metaDescription: '机器人、无人机、车联网、高精度定位等行业方案。',
    },
  },
};

async function main() {
  console.log('🌱 Seeding solutions page (en/zh) using programmatic API...');
  const strapi = await bootstrapStrapi();
  const uid = 'api::page.page';
  const slug = 'solutions';

  try {
    // --- Step 1: Upsert English version and get its documentId ---
    console.log('Upserting English page...');
    let enEntry = await strapi.db.query(uid).findOne({ where: { slug, locale: 'en' } });
    let documentId;

    const enData = {
      ...PAGES_EN.solutions,
      publishedAt: new Date(),
    };

    if (enEntry) {
      const updated = await strapi.entityService.update(uid, enEntry.id, { data: enData });
      documentId = updated.documentId;
      console.log(`Updated English page, documentId: ${documentId}`);
    } else {
      const created = await strapi.entityService.create(uid, { data: { ...enData, locale: 'en' } });
      documentId = created.documentId;
      console.log(`Created English page, documentId: ${documentId}`);
    }

    if (!documentId) {
      throw new Error('Could not obtain documentId for the English entry.');
    }

    // --- Step 2: Upsert Chinese version using the same documentId ---
    console.log(`Upserting Chinese page with documentId: ${documentId}...`);
    const zhData = {
      ...PAGES_ZH.solutions,
      locale: 'zh',
      publishedAt: new Date(),
      documentId,
    };

    const zhEntry = await strapi.db.query(uid).findOne({ where: { documentId, locale: 'zh' } });

    if (zhEntry) {
      await strapi.entityService.update(uid, zhEntry.id, { data: zhData });
      console.log(`Updated Chinese page.`);
    } else {
      // This is the key part from AGENTS.md
      await strapi.documents(uid).create(zhData);
      console.log(`Created new Chinese page linked to documentId: ${documentId}`);
    }

    console.log('\n✅ Solutions page seeding completed successfully.\n');

  } catch (error) {
    console.error('\n❌ An error occurred during seeding:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
}

main();
