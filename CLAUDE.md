# CLAUDE.md

本文件为 Claude Code (claude.ai/code) 提供在此代码库中工作的指导。

## 开发命令

```bash
npm run dev          # 启动 Next.js 开发服务器
npm run build        # 构建生产环境版本
npm run start        # 启动生产服务器
npm run test         # 运行 Vitest 测试
npm run lint         # 运行 Next.js 代码检查
npm run seed:strapi  # 使用模拟数据填充 Strapi（需要 Strapi 实例）
npm run clear:strapi # 清空所有 Strapi 数据（需要 Strapi 实例）
npm run export:strapi # 导出 Strapi 内容到 seed 文件（需要 Strapi 实例）
```

**测试**：运行单个测试文件使用 `npm test -- path/to/test.ts`

## 架构概览

### 内容管理理念："CMS 即代码"

本项目实现了双栈内容策略，Strapi v5 作为主要 CMS，当 Strapi 不可用时**优雅降级到模拟数据**。所有 schema 变更都通过 `cms/src/` 中的代码管理 - 永远不要通过 Strapi admin UI 修改 schema。

**核心原则**：前端必须能够独立使用模拟数据进行开发，Strapi 在生产环境中提供增强功能。

### 项目结构

```
metaradio/
├── app/[locale]/          # 国际化的 Next.js 路由（App Router）
│   ├── marketing/         # 营销页面（解决方案、博客、案例、资源）
│   ├── company/           # 关于页面
│   └── contact/           # 联系页面
├── components/blocks/     # 动态区块组件（映射到 Strapi Dynamic Zones）
│   └── renderer.tsx       # 中央区块渲染逻辑
├── lib/
│   ├── strapi.ts          # 单一数据源，自动 Strapi/Mock 降级
│   ├── strapi-types.ts    # Strapi 实体的 TypeScript 类型
│   ├── mock-data.ts       # TypeScript 模拟数据（必须与 Strapi schemas 保持同步）
│   └── i18n/              # 国际化工具
│       ├── config.ts      # 语言定义（zh, en）
│       ├── dictionaries.ts # UI 翻译
│       └── navigation.ts   # 链接本地化助手
├── cms/                   # Strapi v5.26.x 实例
│   └── src/
│       ├── api/           # 内容类型 schemas（JSON）
│       └── components/    # 可复用组件 schemas（JSON）
└── scripts/
    ├── seed-strapi.js     # 通过内部 API 程序化填充 Strapi
    └── clear-strapi.js    # 数据库清理脚本
```

### 数据流架构

1. **页面**（`app/[locale]/`）通过 `lib/strapi.ts` 函数获取数据
2. **`lib/strapi.ts`** 首先尝试 Strapi API，失败则降级到 `lib/mock-data.ts`
3. **所有数据源** 都记录到 `datasource.log` 用于调试
4. **BlocksRenderer**（`components/blocks/renderer.tsx`）转换数据并渲染相应组件

**关键**：所有数据获取函数都接受 `locale` 参数，并处理 Strapi 的响应格式（带 `attributes` 包装器）和模拟数据格式（扁平对象）。

## 国际化（i18n）

- **支持的语言**：`zh`（默认）、`en`
- **路由结构**：`/[locale]/path`（例如 `/zh/marketing/blog`、`/en/marketing/blog`）
- **默认语言**：中文（`zh`）- 除首页外始终使用语言前缀
- **链接本地化**：所有内部链接使用 `lib/i18n/navigation.ts` 中的 `localizeHref(url, locale)`
- **字典**：UI 字符串位于 `lib/i18n/dictionaries.ts` - 永远不要在组件中硬编码文本
- **Strapi i18n**：内容通过 `locale` 查询参数本地化，schemas 中设置 `pluginOptions.i18n.localized: true`

**添加新页面时**：
1. 在 `app/[locale]/...` 下创建
2. 导出带本地化元数据的 `generateMetadata` 函数
3. 将 `locale` 和 `dictionary` 传递给所有需要翻译的组件

## 使用动态区块

动态区块驱动整个网站内容。扩展时：

### 1. 更新 Strapi Schema
编辑 `cms/src/components/[category]/[name]/schema.json` 中的组件 schema

### 2. 更新 TypeScript 类型
在 `lib/strapi-types.ts` 中添加/修改类型

### 3. 创建/更新组件
在 `components/blocks/[name].tsx` 中实现

### 4. 在渲染器中注册
在 `components/blocks/renderer.tsx` 中添加 switch case：
```typescript
case 'sections.your-block':
  return <YourBlock key={`your-block-${index}`} {...block} />
```

### 5. 更新模拟数据
在 `lib/mock-data.ts` 中同步结构以匹配 Strapi schema

### 6. 更新 Seed 脚本
扩展 `scripts/seed-strapi.js` 以填充新字段

**可用的区块类型**：
- `hero.hero` - 带 CTA 按钮的 Hero 区块
- `sections.feature-grid` - 特性卡片网格
- `sections.stat-group` - 指标/KPI 展示
- `sections.bullet-list` - 带图标的能力列表
- `sections.tech-flow` - 分步流程
- `sections.before-after` - 前后对比
- `sections.case-showcase` - 案例研究卡片
- `sections.post-list` - 博客文章卡片
- `sections.cta-banner` - 行动号召横幅
- `content.media-block` - 图片/文本区块

## Strapi v5 数据管理

### 内容类型
- **单一类型**：`site-setting`（全局设置）
- **集合类型**：`page`、`solution`、`case-study`、`article`、`resource`

### 多语言内容创建

**关键工作流程**（Strapi v5.26.x Documents API）：

```javascript
// 1. 首先创建英文版本
const enDoc = await strapi.documents(uid).create({
  locale: 'en',
  data: { slug, title, ...fields },
  status: 'published',
});

// 2. 使用相同的 documentId 创建中文版本
await strapi.documents(uid).create({
  documentId: enDoc.documentId,  // 链接到英文版本
  locale: 'zh',
  data: { slug, title: '中文标题', ...fields },
  status: 'published',
});
```

**为什么重要**：共享 `documentId` 确保两种语言在 Strapi admin 中显示为一个文档，防止孤立条目和删除问题。

### Seeding 最佳实践

- **环境**：始终使用 Node 20+（`nvm use 20`）以避免 `better-sqlite3` ABI 错误
- **Seeding 方式**：`scripts/seed-strapi.js` 使用程序化 Strapi 实例（不需要服务器）
- **Upsert 逻辑**：按 `slug` 查询，存在则更新，不存在则创建
- **发布**：始终设置 `status: 'published'` 或调用 `strapi.documents(uid).publish()`
- **清理**：重新 seed 前使用 `npm run clear:strapi` 避免重复

### Strapi Populate 策略

动态区域需要显式填充。`lib/strapi.ts` 使用 `BLOCK_POPULATE_PATHS`：
```javascript
const BLOCK_POPULATE_PATHS = [
  'blocks.ctaPrimary',
  'blocks.ctaSecondary',
  'blocks.bgMedia',
  'blocks.items',
  'blocks.media',
  // ... 等等
];
```

在区块中添加新的关系字段时，将其路径追加到此数组。

## 样式系统

- **框架**：Tailwind CSS 配合自定义设计令牌
- **主题切换**：组件接受 `theme` 属性（`'light'` | `'dark'`）
- **设计令牌**：在 `tailwind.config.js` 中定义
  - `colors.brand.*` - 主要品牌色
  - 自定义 `boxShadow.glow`、扩展渐变
- **全局样式**：仅在 `app/globals.css` 中 - 组件样式通过 Tailwind 类
- **可复用组件**：优先使用 `BaseCard` 包装器以获得一致的悬停/聚焦效果
- **图片**：始终使用 `next/image` 并提供正确的 `alt` 属性

## 测试

- **框架**：Vitest（在 `vitest.config.ts` 中配置）
- **覆盖率**：针对 `lib/i18n` 工具（特别是 `localizeHref`）
- **模拟环境**：测试使用空 Strapi 环境变量运行，强制使用模拟数据
- **添加测试**：放在 `tests/` 目录中，镜像源结构

**已知限制**：构建期 ESLint 因 Next 14.2 与 ESLint 9 不兼容而跳过（`next.config.js` 的 `eslint.ignoreDuringBuilds`，待对齐版本后恢复）；TypeScript 严格检查由 `tsconfig.json` 提供（`strict`、`exactOptionalPropertyTypes`、`noUncheckedIndexedAccess`、`verbatimModuleSyntax` 等），`npm run build` 会执行完整类型检查。

## TypeScript 配置说明

- **模块系统**：`"module": "esnext"` + `"moduleResolution": "bundler"`（Next 推荐），配合 `verbatimModuleSyntax`（类型导入必须用 `import type`）
- **动态区块类型**：运行时构造/传入 `BlocksRenderer` 的松散区块用 `BlockInput`（容忍额外字段），结构化实体（`PageAttributes` 等）保持严格类型
- **混合 CJS/ESM**：前端代码与 `lib/mock-data.ts` 为 ESM；`scripts/*.js` seed 脚本为 CommonJS（用 `require()`）
- **路径别名**：`@/` 映射到项目根目录（在 `tsconfig.json` 和 `vitest.config.ts` 中配置）

## 常见开发工作流程

### 添加新的营销页面

1. 创建路由：`app/[locale]/marketing/[page-name]/page.tsx`
2. 从 `lib/strapi.ts` 获取数据（例如 `getPageBySlug`）
3. 使用 `<BlocksRenderer blocks={data?.attributes?.blocks} locale={locale} dictionary={dictionary} />` 渲染
4. 将页面条目添加到 Strapi `page` 集合或模拟数据
5. 如需要，在 `lib/i18n/dictionaries.ts` 中更新导航

### 修改现有区块

1. 阅读 `components/blocks/[name].tsx` 中的当前实现
2. 检查 `cms/src/components/` 中的 Strapi schema
3. 如添加字段，更新 schema JSON
4. 修改组件属性和渲染
5. 将更改同步到 `lib/mock-data.ts`
6. 如受影响，更新 `scripts/seed-strapi.js`

### 调试数据源问题

- 检查 `datasource.log` 查看 Strapi/Mock 解析日志
- 控制台显示 `[DATA_SOURCE] ✅ Strapi` 或 `[DATA_SOURCE] 🟡 Mock` 前缀
- 验证 `.env.local` 中有 `STRAPI_API_URL` 和 `STRAPI_API_TOKEN`
- 测试 Strapi 不可用时以确保模拟数据降级有效

### 使用导航组件

- 位置：`components/nav.tsx`
- 属性：`locale` 和 `dictionary`（用于翻译）
- 链接生成：内部使用 `localizeHref`
- 始终在每个页面的 `<main>` 之前渲染

### 从 Strapi 导出内容

在 Strapi Admin Panel 中编辑内容后，将其导出到 seed 文件以进行版本控制和迁移：

1. **导出所有内容**：
   ```bash
   npm run export:strapi
   ```

2. **导出特定内容类型**：
   ```bash
   npm run export:pages      # 仅页面
   npm run export:solutions  # 仅解决方案
   npm run export:cases      # 仅案例
   npm run export:articles   # 仅文章
   npm run export:resources  # 仅资源
   ```

3. **审查并提交**：
   ```bash
   git diff scripts/seed-data/
   git add scripts/seed-data/
   git commit -m "chore: Update content from Strapi"
   git push
   ```

4. **同步到其他环境**：
   ```bash
   git pull
   npm run seed:strapi
   ```

**重要说明**：
- 导出脚本自动备份旧文件（`.backup-*.js`）
- 多语言内容按 `slug` 合并
- Strapi 元数据（createdAt、updatedAt 等）自动移除
- 需要在 `cms/.env` 中配置 `STRAPI_API_TOKEN`
- 使用 Strapi v5 兼容的 populate 语法：动态区域使用 `populate[blocks][populate]=*`
- 详见 `scripts/EXPORT_GUIDE.md`

**故障排查**：
- 如果导出失败并显示 "Invalid key" 错误，检查 `scripts/export-strapi.js` 中的 `POPULATE_CONFIG`
- 确保 API Token 至少有只读权限
- 从项目根目录运行（不是 `cms/`）

## 环境变量

Strapi 集成所需（开发环境可选）：
```
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
REVALIDATE_SECONDS=120  # ISR 重新验证间隔
```

没有这些变量时，应用自动使用模拟数据。

## 关键约束

1. **永远不要删除模拟数据降级逻辑** - 这对开发至关重要
2. **保持模拟数据结构与 Strapi 响应一致** - 特别是 `attributes` 包装器
3. **始终使用防御性属性访问** - 例如 `attributes || item` 模式
4. **所有 Strapi schema 更改必须在 JSON 文件中** - 永远不要使用 admin UI 修改结构
5. **多语言内容必须共享 `documentId`** - 参见上面的 Strapi v5 工作流程
6. **没有 `alt` 属性的图片将无法通过无障碍审核**
7. **内部链接必须通过 `localizeHref`** - 以支持语言切换

## 已知问题和未来工作

- ESLint 配置不完整（Next.js lint 未完全启用）
- 一些旧组件（例如 `BeforeAfterSection`）仅支持深色主题
- TypeScript `verbatimModuleSyntax` 可能导致第三方库的导入/导出边缘情况
- 考虑将首页 `buildHomeContent` 逻辑提取为专用构建器模式
