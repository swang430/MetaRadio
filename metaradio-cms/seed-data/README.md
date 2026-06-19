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

- **图片**：不在 Strapi（部署模型 C），是 `public/images/` 的静态资源（git 管理）、代码里按 `slug→图` 映射引用。要让非编程人员在后台也能换图，需另上 Strapi media + S3。
- **/tools 交互工具**：交互逻辑，文案内联在前端代码（设计边界：逻辑留代码）。

## 恢复

- **只回内容**：把要恢复的 `.md` 覆盖回本目录 → `npm run seed && import:datasheets && import:pages && import:resources`。
- **完整恢复（含图片+前端代码）**：`git checkout <tag/commit>`（如拆分前的 `combined-pre-split`）。
