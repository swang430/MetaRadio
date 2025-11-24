# MetaRadio Codex 开发日志 (Gemini)

## 核心原则
- **CMS 即代码 (CMS as Code)**：所有 Strapi 的内容类型、组件和种子数据都应通过代码（JSON schema, seed scripts）管理，而不是通过管理后台手动操作。这确保了环境的一致性和可重复性。
- **国际化 (i18n) 优先**：所有面向用户的内容（从页面到组件）都必须支持多语言。默认语言为中文 (`zh`)，并支持英文 (`en`)。
- **Mock 数据作为后备**：前端应用在无法连接到 Strapi API 时，应能无缝回退到本地的 mock 数据。这保证了开发和演示的稳定性。

## 关键决策与上下文
- **Strapi 版本**：项目使用 Strapi v5。v4 到 v5 在插件 API、中间件和程序化使用方面有较大变化。特别是，v5 强化了通过 `strapi.entityService` 和 `strapi.db.query` 进行数据操作的模式。
- **i18n 插件**：`@strapi/plugin-i18n` 是实现国际化的核心。在内容类型的 schema 中，通过 `pluginOptions: { i18n: { localized: true } }` 来标记需要本地化的字段。
- **种子脚本 (`seed-strapi.js`)**：
    - **执行方式**：这是一个 CommonJS 脚本，通过 `npm run db:seed` 执行。它通过加载 Strapi 实例直接与数据库交互，比 REST API 更快且更可靠。
    - **数据源**：数据存储在 `scripts/seed-data/` 目录下的独立文件中。
    - **逻辑**：脚本采用智能同步逻辑。它首先清理遗留数据，然后创建主语言（英文）版本，获取 `documentId`，再创建次语言（中文）版本并关联到同一个 `documentId`。
- **清理脚本 (`clear-strapi.js`)**：
    - **执行方式**：这是一个 CommonJS 脚本，通过 `npm run db:clear` 执行。
    - **逻辑**：它以编程方式启动一个 Strapi 实例，然后使用 `strapi.db.query` API 来查找并删除所有集合类型中的数据。
- **前端数据获取 (`lib/strapi.ts`)**：
    - 封装了所有对 Strapi API 的请求。
    - 包含一个 `try...catch` 块，当 API 请求失败时（例如网络错误或 Strapi 服务未运行），它会 `console.error` 并返回 `null` 或空数组。
    - 调用此模块的更高层函数（例如页面组件中的 `getStaticProps` 或 `getServerSideProps`）负责处理 `null` 情况并加载 `lib/mock-data.js` 中的 mock 数据。

## 常用命令 (Package.json)
- **`npm run db:reset`**: 一键重置数据库（先清理后填充）。这是开发时的首选命令。
- **`npm run db:seed`**: 仅运行填充脚本。
- **`npm run db:clear`**: 仅运行清理脚本。
- **`npm run db:inspect`**: 运行数据诊断工具，检查内容完整性和 i18n 关联。
- **`npm run db:export`**: 将当前 Strapi 内容导出到 `scripts/seed-data/`。

## 网站搬迁与数据迁移操作指南

为了支持项目在不同环境（如本地到生产，或服务器迁移）之间的迁移，本项目提供了一套完整的**导出/导入**流程。

### 1. 导出数据 (Backup/Export)
此操作将当前 Strapi 数据库中的所有内容（包括所有语言版本）提取并保存为本地代码文件。这相当于对 CMS 内容进行“快照”。

*   **命令**: `npm run db:export`
*   **输出位置**: `scripts/seed-data/` 目录下的 `.js` 文件。
*   **注意**: 运行前请确保 `scripts/seed-data/` 下的文件已提交到 Git，以便在导出后可以清晰地看到 diff 变化。

### 2. 注入数据 (Restore/Import)
此操作将本地 `scripts/seed-data/` 中的内容重新写入到 Strapi 数据库中。

*   **场景 A: 全新环境或重置环境 (推荐)**
    *   **命令**: `npm run db:reset`
    *   **作用**: 先清空数据库，再重新写入。这是最干净、最安全的迁移方式，避免数据冲突。

*   **场景 B: 增量更新**
    *   **命令**: `npm run db:seed`
    *   **作用**: 尝试更新现有条目或创建新条目。脚本具有幂等性（Idempotent），但为了保证关联关系的准确性，推荐使用 `db:reset`。

### 3. 完整迁移流程示例
假设你要将本地开发环境的内容迁移到生产服务器：

1.  **本地**: 运行 `npm run db:export` 导出最新内容。
2.  **本地**: 检查 Git 变更，提交并推送到远程仓库 (`git commit -am "chore: update seed data" && git push`)。
3.  **服务器**: 拉取最新代码 (`git pull`)。
4.  **服务器**: 运行 `npm run db:reset` 重置并填充数据库。

---
### Strapi v5 控制与数据管理总结

本文档总结了项目如何以“代码即 CMS”的原则来管理 Strapi v5 的内容。

#### 1. Strapi 版本
项目 CMS 使用 **Strapi v5.26.0**。所有操作都应与此版本兼容。

#### 2. 核心控制方式 (统一编程接口)
本项目所有数据管理脚本都位于 `scripts/` 目录下，统一使用 CommonJS (`.js`) 格式，通过引导 Strapi 实例 (`bootstrapStrapi`) 直接操作数据库。不再使用 REST API 进行数据填充。

*   **填充 (Seeding)**: `scripts/seed-strapi.js`
*   **清理 (Cleaning)**: `scripts/clear-strapi.js`
*   **诊断 (Inspection)**: `scripts/inspect-strapi.js`
*   **导出 (Exporting)**: `scripts/export-strapi.js`

#### 3. 国际化 (i18n) 内容管理
Strapi 的 i18n 功能允许内容存在多种语言版本。正确的创建流程如下：

1.  **清洗数据**: 在创建前，必须从源数据中移除 `id`, `documentId` 等与特定环境绑定的字段。
2.  **创建主语言条目**: 首先，创建一个语言版本的内容（例如 `locale: 'en'`）。
3.  **获取 `documentId`**: 从创建操作的响应中获得该条目的 `documentId`。这是 Strapi v5 识别“同一文档不同版本”的唯一标识。
4.  **创建次语言条目**: 创建其他语言版本（例如 `locale: 'zh'`）。**关键步骤**：必须将主语言版本的 `documentId` 显式传递给创建函数，确保它们被视为同一个文档的变体。

**示例 (核心逻辑)**：
```javascript
// 1. 创建英文版本
const enDoc = await strapi.documents(uid).create({
  locale: 'en',
  data: { title: 'Hello', slug: 'hello' }
});

// 2. 使用其 documentId 创建中文版本
await strapi.documents(uid).create({
  documentId: enDoc.documentId, // <--- 关键关联
  locale: 'zh',
  data: { title: '你好', slug: 'hello' } // slug 可以相同
});
```

---

### [2025-11-23 更新] 数据诊断工具与最终 i18n 修复方案

为了解决难以手动验证 Strapi 数据关联状态的问题，我们开发了诊断工具并修复了种子脚本的逻辑缺陷。

#### 1. 新增工具：`scripts/inspect-strapi.js`
这是一个专门的“侦探脚本”，用于快速诊断 Strapi 数据库中的内容状态。
*   **功能**: 检查 Pages, Articles, Solutions, Cases, Resources 等核心内容类型的 i18n 关联。
*   **原理**: 直接查询 entityService，并对比 EN 和 ZH 版本的 `documentId`。在 Strapi v5 中，互为翻译版本的条目必须共享同一个 `documentId`。
*   **用法**: `npm run db:inspect`

#### 2. `seed-strapi.js` 关键修复
在修复 i18n 关联问题时，我们发现如果 `seed-data` 源文件中包含硬编码的旧 `documentId` (通常来自导出)，会导致 Strapi 在创建时混淆，从而创建两个独立的文档而不是关联它们。

**修复逻辑**:
1.  **清洗 Payload**: 在创建或更新条目之前，必须从 payload 中**删除** `id`, `documentId`, `createdAt`, `updatedAt`, `publishedAt` 等字段。
2.  **显式关联**: 在创建第二个语言版本时，必须将第一个版本生成的 `documentId` **同时**作为 `create()` 方法的参数**和** payload 数据的一部分传入。

此修复已验证通过，能够正确生成双语关联数据。
