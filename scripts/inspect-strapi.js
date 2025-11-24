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

async function inspectCollection(strapi, uid, name) {
  console.log(`\n🔍 Inspecting ${name} (${uid})...`);
  console.log('---------------------------------------------------');

  // Fetch all English entries
  const enEntries = await strapi.entityService.findMany(uid, {
    filters: { locale: 'en' },
    populate: ['localizations'],
  });

  // Fetch all Chinese entries
  const zhEntries = await strapi.entityService.findMany(uid, {
    filters: { locale: 'zh' },
    populate: ['localizations'],
  });

  console.log(`Found ${enEntries.length} English entries and ${zhEntries.length} Chinese entries.`);

  // Helper to find matching entry by documentId
  const findByDocId = (entries, docId) => entries.find(e => e.documentId === docId);

  // Check EN -> ZH links
  if (enEntries.length > 0) {
    console.log('\n[ English Entries Analysis ]');
    for (const en of enEntries) {
      // Method 1: Check localizations array (Legacy/Compat)
      const zhLinkViaLoc = en.localizations && en.localizations.find(loc => loc.locale === 'zh');
      
      // Method 2: Check matching documentId in zhEntries (Strapi v5 native way)
      const zhMatchViaDocId = findByDocId(zhEntries, en.documentId);

      let status = '❌ ORPHAN';
      let details = '';

      if (zhMatchViaDocId) {
        status = '✅ LINKED (via documentId)';
        details = `| docId: ${en.documentId}`;
      } else if (zhLinkViaLoc) {
        status = '⚠️ LINKED (via localizations only?)'; 
        details = `| locId: ${zhLinkViaLoc.id}`;
      } else {
         details = `| docId: ${en.documentId}`;
      }

      console.log(`  - [ID: ${en.id}] Slug: "${en.slug || en.title}" ${status} ${details}`);
    }
  }
}

async function main() {
  console.log('🕵️  Starting Strapi Content Inspection...');
  let strapi;
  try {
    strapi = await bootstrapStrapi();
    console.log('✅ Strapi instance loaded.');

    const collections = [
      { uid: 'api::page.page', name: 'Pages' },
      { uid: 'api::solution.solution', name: 'Solutions' },
      { uid: 'api::case-study.case-study', name: 'Cases' },
      { uid: 'api::article.article', name: 'Articles' },
      { uid: 'api::resource.resource', name: 'Resources' },
    ];

    for (const col of collections) {
      await inspectCollection(strapi, col.uid, col.name);
    }

    console.log('\n🏁 Inspection complete.\n');

  } catch (error) {
    console.error('\n❌ An error occurred during inspection:');
    console.error(error);
  } finally {
    if (strapi) await strapi.destroy();
  }
}

main();
