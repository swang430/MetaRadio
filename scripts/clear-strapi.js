const path = require('path');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const CMS_DIR = path.resolve(__dirname, '..', 'cms');
const STRAPI_PACKAGE_PATH = path.resolve(CMS_DIR, 'node_modules', '@strapi', 'strapi');

async function bootstrapStrapi() {
  process.chdir(CMS_DIR);

  require('dotenv').config({ path: path.resolve(CMS_DIR, '.env') });

  const { compileStrapi, createStrapi } = require(STRAPI_PACKAGE_PATH);
  const appContext = await compileStrapi();
  const strapi = await createStrapi(appContext).load();
  return strapi;
}

async function clearCollection(strapi, uid) {
  console.log(`  Clearing collection: ${uid}...`);
  const records = await strapi.db
    .query(uid)
    .findMany({ select: ['id'], limit: null });

  if (!records.length) {
    console.log('  - Collection already empty.');
    return;
  }

  for (const record of records) {
    await strapi.db.query(uid).delete({ where: { id: record.id } });
  }

  console.log(`  - Deleted ${records.length} entries.`);
}

async function clearSingleType(strapi, uid) {
  console.log(`  Clearing single type: ${uid}...`);
  const entry = await strapi.db.query(uid).findOne({ select: ['id'] });
  if (!entry) {
    console.log('  - No entry to reset.');
    return;
  }
  await strapi.db.query(uid).update({
    where: { id: entry.id },
    data: {},
  });
  console.log('  - Single type reset to empty payload.');
}

async function main() {
  console.log('🧹 Starting Strapi content cleanup via entity service...');
  const strapi = await bootstrapStrapi();

  try {
    const collections = [
      'api::page.page',
      'api::solution.solution',
      'api::case-study.case-study',
      'api::article.article',
      'api::resource.resource',
    ];

    for (const uid of collections) {
      await clearCollection(strapi, uid);
    }

    await clearSingleType(strapi, 'api::site-setting.site-setting');

    console.log('\n✅ Strapi collections have been cleared.\n');
  } catch (error) {
    console.error('\n❌ An error occurred during cleanup:');
    console.error(error);
    process.exitCode = 1;
  } finally {
    await strapi.destroy();
  }
}

main();
