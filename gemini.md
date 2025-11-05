# MetaRadio Codex 开发日志 (Gemini)

## 核心原则
- **CMS 即代码 (CMS as Code)**：所有 Strapi 的内容类型、组件和种子数据都应通过代码（JSON schema, seed scripts）管理，而不是通过管理后台手动操作。这确保了环境的一致性和可重复性。
- **国际化 (i18n) 优先**：所有面向用户的内容（从页面到组件）都必须支持多语言。默认语言为中文 (`zh`)，并支持英文 (`en`)。
- **Mock 数据作为后备**：前端应用在无法连接到 Strapi API 时，应能无缝回退到本地的 mock 数据。这保证了开发和演示的稳定性。

## 关键决策与上下文
- **Strapi 版本**：项目使用 Strapi v5。v4 到 v5 在插件 API、中间件和程序化使用方面有较大变化。特别是，v5 强化了通过 `strapi.entityService` 和 `strapi.db.query` 进行数据操作的模式。
- **i18n 插件**：`@strapi/plugin-i18n` 是实现国际化的核心。在内容类型的 schema 中，通过 `pluginOptions: { i18n: { localized: true } }` 来标记需要本地化的字段。
- **种子脚本 (`seed-strapi.mjs`)**：
    - **执行方式**：这是一个独立的 ES Module 脚本，通过 `node scripts/seed-strapi.mjs` 执行。它直接与 Strapi 的 REST API 交互，因此需要在 `.env` 文件中配置 `STRAPI_API_URL` 和 `STRAPI_API_TOKEN`。
    - **逻辑**：脚本采用 `upsert` 逻辑。它首先根据 `slug` 或其他唯一标识符查询条目是否存在。如果存在，则更新；如果不存在，则创建。这使得脚本可以重复运行而不会产生重复数据。
    - **国际化处理**：目前的种子脚本主要填充了 `zh`（中文）内容。要实现完整的双语填充，需要对脚本进行扩展：
        1.  首先创建 `en`（英文）版本的内容。
        2.  然后，使用返回的 `id`，为 `zh` 版本创建一个新的条目，并通过 `localizations` 字段将其与英文版本关联起来。
- **清理脚本 (`clear-strapi.js`)**：
    - **执行方式**：这是一个 CommonJS 脚本，通过 `node scripts/clear-strapi.js` 执行。
    - **逻辑**：它以编程方式启动一个 Strapi 实例（`bootstrapStrapi`），然后使用 `strapi.db.query` API 来查找并删除所有集合类型中的数据。这种方式比直接操作数据库更安全，因为它会触发 Strapi 的生命周期钩子。
- **前端数据获取 (`lib/strapi.ts`)**：
    - 封装了所有对 Strapi API 的请求。
    - 包含一个 `try...catch` 块，当 API 请求失败时（例如网络错误或 Strapi 服务未运行），它会 `console.error` 并返回 `null` 或空数组。
    - 调用此模块的更高层函数（例如页面组件中的 `getStaticProps` 或 `getServerSideProps`）负责处理 `null` 情况并加载 `lib/mock-data.js` 中的 mock 数据。

## 后续步骤与改进方向
1.  **完善 `seed-strapi.mjs` 的 i18n 支持**：
    -   将现有的中文数据调整为英文 (`en`) 作为基础语言。
    -   在创建完英文条目后，紧接着为每个条目创建中文 (`zh`) 版本，并正确设置 `localizations` 关联。
2.  **统一脚本执行环境**：`seed-strapi.mjs` (ESM) 和 `clear-strapi.js` (CJS) 使用了不同的模块系统。可以考虑将 `clear-strapi.js` 也重构为 ESM，以保持一致性。
3.  **在 `package.json` 中添加统一的命令**：
    -   `"seed:strapi": "node scripts/seed-strapi.mjs"`
    -   `"clear:strapi": "node scripts/clear-strapi.js"`
    -   `"reset:strapi": "npm run clear:strapi && npm run seed:strapi"`
    这样可以简化开发流程。
4.  **Strapi v5 插件配置**：`cms/config/plugins.ts` 文件当前为空。对于 i18n，虽然默认配置通常足够，但任何需要自定义的行为（例如默认区域设置）都应在此处明确配置。例如：
    ```typescript
    export default {
      'i18n': {
        enabled: true,
        config: {
          defaultLocale: 'zh',
          locales: ['zh', 'en'],
        },
      },
    };
    ```
    需要验证这是否是 v5 的正确配置方式。

---
### Strapi v5 控制与数据管理总结

本文档总结了项目如何以“代码即 CMS”的原则来管理 Strapi v5 的内容。

#### 1. Strapi 版本
项目 CMS 使用 **Strapi v5.26.0**。所有操作都应与此版本兼容。

#### 2. 核心控制方式
本项目通过两种主要方式与 Strapi 交互：

*   **A) REST API 交互 (外部脚本)**
    *   **用途**: 数据填充 (Seeding)。
    *   **脚本**: `scripts/seed-strapi.mjs`
    *   **工作原理**: 此脚本通过 `fetch` 直接调用 Strapi 的 REST API (`/api/...`)。它使用 `upsert` 逻辑，根据 `slug` 检查内容是否存在，然后决定是创建还是更新。
    *   **执行前提**: Strapi 服务必须正在运行，且环境变量 `STRAPI_API_URL` 和 `STRAPI_API_TOKEN` 必须在脚本运行环境中可用。
    *   **优点**: 逻辑清晰，与 Strapi 服务解耦，易于通过 HTTP 调试。

*   **B) 程序化 Strapi 实例 (内部脚本)**
    *   **用途**: 数据清理和批量操作。
    *   **脚本**: `scripts/clear-strapi.js`
    *   **工作原理**: 此脚本会以编程方式加载一个完整的 Strapi 应用实例。加载后，它使用 `strapi.db.query()` API 直接与数据库交互来删除数据。
    *   **执行前提**: 无需运行 Strapi 服务，脚本本身会引导一个实例。
    *   **优点**: 功能强大，性能高，可以访问所有 Strapi 内部服务，无需 API Token。

#### 3. 国际化 (i18n) 内容管理
Strapi 的 i18n 功能允许内容存在多种语言版本。正确的创建流程如下：

1.  **创建主语言条目**: 首先，创建一个语言版本的内容（例如 `locale: 'en'`）。
2.  **获取主语言 ID**: 从创建操作的响应中获得该条目的 `id`。
3.  **创建并关联本地化条目**: 接着，创建其他语言版本（例如 `locale: 'zh'`）。在创建这个新版本时，必须在其数据中包含 `localizations` 字段，指向主语言条目的 `id`。

**示例 (伪代码)**：
```javascript
// 1. 创建英文版本
const enEntry = await strapi.entityService.create('api::article.article', {
  data: { title: 'Hello World', slug: 'hello', locale: 'en' }
});

// 2. 使用其 ID 创建中文版本并关联
const zhEntry = await strapi.entityService.create('api::article.article', {
  data: {
    title: '你好世界',
    slug: 'hello', // slug 可以相同
    locale: 'zh',
    localizations: [enEntry.id] // 关键步骤
  }
});
```
当前的 `seed-strapi.mjs` 脚本为每个条目设置了 `locale: 'zh'`，但没有实现与其他语言版本的关联。这是导致之前国际化数据混乱的关键原因。

#### 4. 推荐的开发流程
1.  **修改结构**: 在 `cms/src/api` 或 `cms/src/components` 中修改 JSON schema 文件。
2.  **更新种子数据**: 根据结构变化，调整 `scripts/seed-strapi.mjs` 中的数据和逻辑。确保遵循上述的 i18n 创建流程。
3.  **重置数据库**: 在本地开发时，运行 `npm run clear:strapi` 清理旧数据。
4.  **填充新数据**: 运行 `npm run seed:strapi` 将更新后的内容注入 Strapi。

---
