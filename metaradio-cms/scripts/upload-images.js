'use strict';
/**
 * 把现有静态 hero 图上传进 Strapi 媒体库，并挂到对应 datasheet 的 heroImage。
 * 一次性预填（与前端 DatasheetView 的 HERO_IMAGES 对齐）；之后非编程人员可在后台 GUI 换图。
 * 本地 provider 存 metaradio-cms/public/uploads/；生产配 S3（见 config/plugins + README）。
 *
 * 用法：cd metaradio-cms && npm run upload:images   （会程序化 boot Strapi，需先停 develop）
 */
const fs = require('fs');
const path = require('path');

const PUBLIC_IMG = path.resolve(__dirname, '..', '..', 'public', 'images');
const UID = 'api::datasheet.datasheet';

// slug → public/images 文件名（与 DatasheetView 的 HERO_IMAGES 一致）
const MAP = {
  'l1-ray-tracing': 'ds-l1-ray-tracing.jpg',
  'l2-virtual-drive-test': 'ds-l2-virtual-drive-test.jpg',
  'l3-em-twin': 'ds-l3-em-twin.jpg',
  'liquid-rf': 'ds-liquid-rf.webp',
};
const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };

async function run() {
  try { require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') }); } catch {}
  const { compileStrapi, createStrapi } = require('@strapi/strapi');
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';
  const uploadSvc = app.plugin('upload').service('upload');

  let n = 0;
  for (const [slug, fname] of Object.entries(MAP)) {
    const abs = path.join(PUBLIC_IMG, fname);
    if (!fs.existsSync(abs)) { console.warn(`  ⚠ 缺图 ${fname}`); continue; }
    const docs = await app.documents(UID).findMany({ filters: { slug }, locale: 'zh-CN', status: 'published' });
    const doc = docs[0];
    if (!doc) { console.warn(`  ⚠ 无 datasheet ${slug}`); continue; }

    const [file] = await uploadSvc.upload({
      data: { fileInfo: { name: fname, alternativeText: `${doc.title} 配图` } },
      files: {
        filepath: abs,
        originalFilename: fname,
        mimetype: MIME[path.extname(fname).toLowerCase()] || 'application/octet-stream',
        size: fs.statSync(abs).size,
      },
    });
    await app.documents(UID).update({ documentId: doc.documentId, data: { heroImage: file.id }, status: 'published' });
    console.log(`  ✓ ${slug} ← ${fname}  (file#${file.id} ${file.url})`);
    n++;
  }
  console.log(`✅ 上传完成：${n} 张 hero 图挂到 datasheet`);
  await app.destroy();
  process.exit(0);
}

run().catch((e) => { console.error('上传失败:', e); process.exit(1); });
