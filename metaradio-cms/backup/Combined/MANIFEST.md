# 内容备份 · Combined

- **时间**：2026-06-19T02:46:16.961Z
- **真相源**：content-as-code 的 seed-data/（**不是 Strapi**——Strapi 是从这些 .md 灌出来的派生层，可随时重建）。
- **包含**：
  - datasheets：20 个 .md（产品与方案 L1-L3 / V1-V6 / Liquid RF，中英）
  - pages：8 个 .md（home / foundations / services / about，中英）
  - resources：scripts/seed-data.js
- **图片**：未复制二进制（避免仓库膨胀）。图片不在 Strapi（模型 C），在 `public/images/`（git 已备份），共 11 个，登记如下：
  - public/images/ds-l1-ray-tracing.jpg
  - public/images/ds-l2-virtual-drive-test.jpg
  - public/images/ds-l3-em-twin.jpg
  - public/images/ds-liquid-rf.webp
  - public/images/dual-infrastructure.webp
  - public/images/foundations-hero.webp
  - public/images/hero-silicon.jpg
  - public/images/logo.png
  - public/images/poster-l1l3-stack.jpg
  - public/images/poster-liquid-rf.jpg
  - public/images/poster-verticals.jpg

## 如何恢复
1. **仅文本内容**：把本目录的 `datasheets/` `pages/` 覆盖回 `metaradio-cms/seed-data/` 对应目录、`resources.seed-data.js` 覆盖回 `seed-data/seed-data.js`，然后重灌 Strapi：
   ```
   cd metaradio-cms
   npm run import:datasheets && npm run import:pages && npm run seed
   ```
2. **完整状态（含图片 + 前端代码）**：用 git 恢复点——`git checkout <tag/commit>`（推荐给这次拆分前打个标签，如 `combined-pre-split`）。

> 说明：Strapi 当前可不在线也不影响——前端有优雅降级，且内容真相源是这些文件。
