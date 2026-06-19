'use strict';
/**
 * 内容备份（seed-out 文件版）。
 *
 * 把 content-as-code 的「真相源」——seed-data/ 下的 .md（datasheet/page）+ resources——
 * 快照到 metaradio-cms/backup/<name>/，并写一份 MANIFEST。
 *
 * 重要：本项目的内容真相源是 **.md（git）**，不是 Strapi（Strapi 是从这些 .md 灌出来的派生
 * 服务层）。所以备份直接快照 .md 即可，无需 Strapi 在线。图片不在 Strapi（模型 C），在
 * public/images/（git 已天然备份），这里只在 MANIFEST 里登记引用、不复制二进制以免仓库膨胀。
 *
 * 用法：
 *   cd metaradio-cms && node scripts/backup-content.js Combined
 *   （省略名字则用时间戳；npm run backup -- Combined）
 */
const fs = require('fs');
const path = require('path');

const CMS = path.resolve(__dirname, '..');
const REPO = path.resolve(CMS, '..');
const SRC = path.join(CMS, 'seed-data');

const name = (process.argv[2] || `backup-${new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-')}`).trim();
const OUT = path.join(CMS, 'backup', name);

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  fs.mkdirSync(to, { recursive: true });
  let n = 0;
  for (const f of fs.readdirSync(from)) {
    const s = path.join(from, f);
    if (fs.statSync(s).isFile()) {
      fs.copyFileSync(s, path.join(to, f));
      n++;
    }
  }
  return n;
}

fs.mkdirSync(OUT, { recursive: true });

const counts = {
  datasheets: copyDir(path.join(SRC, 'datasheets'), path.join(OUT, 'datasheets')),
  pages: copyDir(path.join(SRC, 'pages'), path.join(OUT, 'pages')),
};

// resources 内容在 scripts/seed-data.js（content-as-code，非 .md）——一并快照
const resSrc = path.join(CMS, 'scripts', 'seed-data.js');
let resources = '-';
if (fs.existsSync(resSrc)) {
  fs.copyFileSync(resSrc, path.join(OUT, 'resources.seed-data.js'));
  resources = 'scripts/seed-data.js';
}

// 图片：登记引用（不复制二进制）。真备份靠 git（public/images/）。
const imgDir = path.join(REPO, 'public', 'images');
const images = fs.existsSync(imgDir)
  ? fs.readdirSync(imgDir).filter((f) => /\.(jpe?g|png|webp|svg|avif)$/i.test(f)).sort()
  : [];

const manifest = `# 内容备份 · ${name}

- **时间**：${new Date().toISOString()}
- **真相源**：content-as-code 的 seed-data/（**不是 Strapi**——Strapi 是从这些 .md 灌出来的派生层，可随时重建）。
- **包含**：
  - datasheets：${counts.datasheets} 个 .md（产品与方案 L1-L3 / V1-V6 / Liquid RF，中英）
  - pages：${counts.pages} 个 .md（home / foundations / services / about，中英）
  - resources：${resources}
- **图片**：未复制二进制（避免仓库膨胀）。图片不在 Strapi（模型 C），在 \`public/images/\`（git 已备份），共 ${images.length} 个，登记如下：
${images.map((f) => `  - public/images/${f}`).join('\n')}

## 如何恢复
1. **仅文本内容**：把本目录的 \`datasheets/\` \`pages/\` 覆盖回 \`metaradio-cms/seed-data/\` 对应目录、\`resources.seed-data.js\` 覆盖回 \`seed-data/seed-data.js\`，然后重灌 Strapi：
   \`\`\`
   cd metaradio-cms
   npm run import:datasheets && npm run import:pages && npm run seed
   \`\`\`
2. **完整状态（含图片 + 前端代码）**：用 git 恢复点——\`git checkout <tag/commit>\`（推荐给这次拆分前打个标签，如 \`combined-pre-split\`）。

> 说明：Strapi 当前可不在线也不影响——前端有优雅降级，且内容真相源是这些文件。
`;
fs.writeFileSync(path.join(OUT, 'MANIFEST.md'), manifest);

console.log(`✓ 内容备份完成 → metaradio-cms/backup/${name}/`);
console.log(`  datasheets:${counts.datasheets}  pages:${counts.pages}  resources:${resources}  images(登记):${images.length}`);
