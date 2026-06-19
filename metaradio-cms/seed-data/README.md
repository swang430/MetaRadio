# 内容即代码 · 同源工作流

本目录是**全站文字内容的唯一真相源**。所有内容都是 git 版本管理的 `.md`，Strapi 只是中间的**编辑面 + API**——内容双向都以 `.md` 为准（"同源"）。

```
        ┌──────────── seed-data/**/*.md（唯一真相源，git）────────────┐
        │                                                            │
   import:* （IN）                                              sync:md （OUT）
   .md → Strapi                                                Strapi → .md
        │                                                            │
        └────────────────► Strapi（后台 GUI 编辑 + 公开 /api）◄────────┘
```

## 内容类型与 `.md` 格式

| 类型 | 目录 | 文件 | 格式 |
|---|---|---|---|
| **datasheet** | `datasheets/` | `L1-ray-tracing.md` / `.en.md`（10×中英） | frontmatter（slug/title/product/category/version/audience/keywords…）+ 分节 body（`# Hero`、`**Key:** 值`、表格、bullet） |
| **page** | `pages/` | `home.md` / `.en.md`（4×中英） | frontmatter（slug/title/language）+ 分节 body |
| **resource** | `resources/` | `xxx.md` / `.en.md`（5×中英） | frontmatter（slug/title/type/publicationDate/language）+ 正文（描述纯文本） |

> 同一份内容的中英是两个文件：`<slug>.md`（zh-CN）+ `<slug>.en.md`（en），靠 frontmatter 的 `slug` 配对、`language` 区分。

## 命令

| 命令 | 作用 |
|---|---|
| `npm run seed` | **引导**：确保 en/zh-CN locale 存在 + 开放 public 只读权限（不播种内容） |
| `npm run import:datasheets` / `import:pages` / `import:resources` | **IN**：把 `.md` 灌进 Strapi（删同 slug 后重建，中英、发布） |
| `npm run sync:md` | **OUT**：把 Strapi 已发布内容**外科式逐行回写**进 `.md`（只改变化的值，格式全保留） |
| `npm run backup [名字]` | 把 `seed-data/**.md` 快照到 `backup/<名字>/` + MANIFEST |

## 两条编辑路径

1. **开发者 / AI**：直接改 `.md` → `npm run import:*` → Strapi 更新 → 前端可见。
2. **非编程人员**：在 Strapi 后台 GUI 改 → `npm run sync:md` → `git diff` 审阅 → commit。

### ⚠️ 纪律（避免丢数据）
- `import:*` 是 **"删了重建"**，会**覆盖未导出的 GUI 改动**。所以：**GUI 改完先 `sync:md` 再 commit**；`import:*` 只在用 `.md` 主动覆盖时跑。
- `sync:md` 保真：内容一致时跑它是 **0 改动**；只有真改动才产生 diff。
- **只跑一个 Strapi 实例**（`npm run dev:all` 已是单实例）。别同时起两个，会抢 `:1337` 导致连不上。

## 不在文字同源内

- **图片（二进制）**：不走 `.md` 文字同源。分两类：
  - **datasheet hero 图**：可在 Strapi 后台 GUI 管理（`heroImage` media 字段，PR-IMG-3）——见下「datasheet 配图」。
  - **其余图**（首页 Hero / Foundations / 资源海报 / 场景 SVG）：`public/images/` 静态资源 + 代码 `slug→图` 映射（git，非 GUI）。
- **/tools 交互工具**：交互逻辑，文案内联在前端代码（设计边界：逻辑留代码）。

## datasheet 配图（Strapi 媒体 / heroImage）

datasheet 的 hero 图走 Strapi `heroImage`（media 字段），后台 GUI 可换图。前端渲染优先级（叠加式）：
**heroImage（Strapi 媒体）→ 代码侧静态 `HERO_IMAGES` → `VerticalScene` SVG**（不传则回退静态/场景）。

- **预填现有图**：`npm run upload:images`（把 `public/images/ds-*.jpg` 灌进媒体库并挂到对应 datasheet；需先停 develop，脚本会自己 boot Strapi）。
- 之后非编程人员在后台 Media Library / `datasheet.heroImage` 直接换图。
- **存储**：dev = 本地 provider（`public/uploads/`，git 忽略；云端 serverless 上重部署会丢）。**生产 = 阿里云 OSS**：`config/plugins.ts` 已按 `OSS_*` 环境变量切换，启用三步——① `npm i strapi-provider-upload-oss` ② 设 `OSS_ACCESS_KEY_ID / OSS_ACCESS_KEY_SECRET / OSS_REGION / OSS_BUCKET / OSS_BASE_URL` ③ 在前端 `next.config.mjs` 的 `images.remotePatterns` 加 OSS/CDN 域名。

## 新产品上线流程（产品线 → 网站）

产品线决定发布新产品，交给网站管理员三样：**新产品系列图 + 宣传文案 + 解决方案文档**。更新流程：

1. **产品线** → 网站管理员：交付 系列图 + 文案 + 方案文档（原始素材）。
2. **网站管理员** → 把素材交给 **AI（Claude）**：「加一个新产品 datasheet」。
3. **AI** 把文案/方案文档**结构化**成 `seed-data/datasheets/<slug>.md`（+ `.en.md`）——frontmatter（code/category/slug…）+ 分节（Hero/挑战/方案/规格/差异化/应用/CTA），提交 git。
4. `npm run import:datasheets` → Strapi 新增该产品（中英、发布）。
5. **网站管理员** 在 Strapi 后台给该 datasheet 的 `heroImage` 上传「系列图」→ 存阿里云 OSS。
6. 前端**自动上线**：产品列表多一项 + 详情页（双语 + OSS hero 图）。

> 为什么第 3 步要 AI：datasheet 是**结构化**内容（不是一段大文字），需把素材拆成规整分节。这正是「AI 灵活更新内容」的用法。
> 日常**改文案**（已上线产品）：网站管理员在后台 GUI 改 → `npm run sync:md` → commit（`.md` 始终是源）。
> 日常**换图**：后台 Media Library 直接换（走 OSS），无需改代码。

## 恢复

- **只回内容**：把要恢复的 `.md` 覆盖回本目录 → `npm run seed && import:datasheets && import:pages && import:resources`。
- **完整恢复（含图片+前端代码）**：`git checkout <tag/commit>`（如拆分前的 `combined-pre-split`）。
