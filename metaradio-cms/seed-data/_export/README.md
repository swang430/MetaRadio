# Strapi → JSON 导出（seed-out 记录）

由 `npm run export`（`scripts/export-content.js`）生成：直读 Strapi 的 SQLite，把**已发布**内容导出为按 slug 的 JSON（内含 `zh-CN` / `en` 两个 locale）。

## 用途
- **版本化记录**：把 Strapi（含后台 GUI 改动）的当前状态落到 git，可 diff、可回滚、可备份。
- 与 `seed-data/*.md`（AI / 开发者的编辑入口）互补。

## ⚠️ 两个编辑入口的纪律（重要）
内容可从两处改：`.md`（AI / 开发者）或 Strapi 后台 GUI（非编程人员）。
`npm run import:*` 是 **.md → Strapi 的「删了重建」**，会**抹掉未导出的 GUI 改动**。所以：

1. 非编程人员在 GUI 改完 → 先 `npm run export` → commit（保住改动、留 diff）。
2. `npm run import:*` 只在「开发者 / AI 主动用 .md 覆盖」时跑。
3. **别在有未导出 GUI 改动时跑 import**，否则丢数据。

## 待定：源真相方向（过渡期）
长期需二选一：
- **JSON 成为唯一 seed 源**（再加 `import:from-json`，GUI → export → JSON → git → import，`.md` 退役/只做迁移）；
- 或 **`.md` 永远是源**（则不开放 GUI 编辑，Strapi 退为只读 API 层）。

当前处于过渡期，本目录作为安全网 + 版本化记录。
