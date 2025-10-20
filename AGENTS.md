# MetaRadio Codex 开发代理手册

## 起手动作
- 先阅读 `codex.md`（总体蓝图）与 `gemini.md`（近期决策），确保理解“CMS 即代码”哲学与多语言路线。
- 使用 `npm install` 同步依赖，常用命令：`npm run dev`、`npm run build`、`npm start`、`npm test`、`npm run seed:strapi`、`npm run clear:strapi`。
- 若涉及 Strapi，确认 `.env.local` 已配置 `STRAPI_API_URL`、`STRAPI_API_TOKEN`；前端缺参时自动降级至 mock，请勿删除备份逻辑。
- 遵循 CLI 规范：命令通过 `bash -lc` 执行，必要时使用 `rg` 检索；编辑文件保持 ASCII，新增注释需有明确价值。

## 项目骨架
- **Next.js 应用**：位于 `app/`，采用 App Router；顶层 `app/page.tsx` 与 `app/[locale]/**` 协同实现多语言路由，`layout.tsx` 注入字体与 `<body>` 基础样式。
- **组件层**：`components/blocks/**` 定义动态区块，与 Strapi Dynamic Zone 一一对应；`components/nav.tsx` 为顶部导航，依赖字典与 `localizeHref`。
- **数据层**：`lib/strapi.ts` 是唯一数据入口，内部封装 API 请求与 mock 回退；类型定义集中在 `lib/strapi-types.ts`，mock 数据使用 CommonJS (`lib/mock-data.js`)。
- **国际化**：`lib/i18n` 提供 locale 解析（默认 `zh`）、词典与链接本地化工具。任何新文案请落在字典或 Strapi 数据，而非硬编码。
- **测试/配置**：Vitest 配置在 `vitest.config.ts`，`tailwind.config.js` 管理设计令牌；`tsconfig.json` 采用 `module: nodenext` 与 `verbatimModuleSyntax`，注意混用 CJS/ESM 时的导入方式。

## 前端实现准则
- **页面结构**：所有页面需在 `<main>` 前渲染 `<Nav locale={...} dictionary={...} />`，主体通过 `BlocksRenderer` 渲染区块数组；确保向 BlocksRenderer 传入 `locale` 与 `dictionary`。
- **区块扩展**：新增区块同时更新：
  1. Strapi 组件 schema（`cms/src/components`），
  2. `lib/strapi-types.ts` 与必要的 TypeScript 类型，
  3. `components/blocks/**` 具体实现，
  4. `components/blocks/renderer.tsx` switch 映射。
- **多语言链接**：统一调用 `localizeHref`；当链接指向内部路由时，确保默认语言（`zh`）也带前缀（除首页）。
- **Mock 对齐**：维护 `lib/mock-data.js` 结构与 Strapi 模型同步；任何字段变更需同步更新 mock、`scripts/seed-strapi.js` 以及相关页面映射逻辑。
- **错误兜底**：调用 `getPageBySlug`、`listSolutions` 等 API 后务必使用“防御式”属性访问（参考现有 `attributes || item` 写法），保证 CMS/Mock 双栈兼容。

## 样式体系
- 全局基础样式仅放在 `app/globals.css`；具体视觉由组件 Tailwind 类控制。新增样式优先复用 `tailwind.config.js` 中的 `colors.brand`、自定义 `boxShadow.glow` 等令牌。
- 尽量复用 `BaseCard` 封装的卡片动效（hover、焦点、主题）；新卡片如无必要不要重写外壳。
- 深浅主题通过 `theme` 属性切换。`BlocksRenderer` 默认 `light`，个别组件如 `BeforeAfterSection` 目前仅暗色方案，扩展时需补全。
- 图片统一使用 `next/image`，保留 `alt`；无素材时维持占位以免布局跳动。

## CMS 即代码工作流
- 禁止通过 Strapi Admin 修改结构。所有模型、组件 schema 必须在 `cms/src/api/**/schema.json` 与 `cms/src/components/**/schema.json` 更新。
- Schema 变更后：
  1. 运行 `npm run cms:build`（若需要）以验证编译，
  2. 根据需要更新 `scripts/seed-strapi.js` 或单独的 seed 脚本，
  3. 本地启动 Strapi 后执行 `npm run seed:strapi` 以导入初始内容。
- 保持多语言字段 `pluginOptions.i18n.localized: true` 与前端 `locale` 请求一致；如需新增语言，先扩展 `SUPPORTED_LOCALES`，再同步 Strapi 配置与 seed。

## 数据管线与种子脚本
- `lib/strapi.ts` 会自动日志标记数据来源（Strapi/Mock）。新增函数时复用 `api()`、`log()` 工具，保持回退逻辑一致。
- `npm run clear:strapi` 通过 Strapi 实例的 entity service 清空集合与媒体，无需手动启动服务器；操作前确认已备份生产数据。
- `npm run seed:strapi` 会复用同样的内嵌 Strapi 实例，先清空集合，再写入 mock 内容：默认以 `en` 生成 slug，随后针对每个 `documentId` 调用 `strapi.documents(uid).create({ documentId, locale: 'zh' })` 写入中文版本，确保多语言条目共用 slug。后台检查“中文（zh）”时即可看到内容。
- 单类型（site-setting）同样通过 entity service upsert，必要时可照此模式扩展其它种子逻辑。
- 首页区块（slug=`landing`）及解决方案详情页现完全依赖 `Page` / `Solution` 动态区块，请在 Strapi 中维护对应 blocks 并同步更新种子。
- 列表与详情链接统一使用 `localizeHref` 生成（例如文章卡片），确保语言切换后 URL 前缀正确，避免跨语言跳转。

## 测试与质量门槛
- 默认运行 `npm test`（Vitest）确保 `localizeHref` 等逻辑稳定。新增工具函数时添加相应单测。
- 暂无 ESLint 配置；若引入，应与团队确认，并避免阻塞现有 CI。
- 新增页面或区块提交前至少自测：本地访问两种语言、检查响应式布局、确认无 Tailwind 冲突。

## 常见任务清单
- **新增页面（多语言）**：
  1. 在 `app/[locale]/...` 创建页面组件，复用 `BlocksRenderer`，并提供默认 blocks 或数据拉取逻辑。
  2. 若需根路由直达，记得在 `app/...` 下创建对应桥接文件并复用 `DEFAULT_LOCALE`。
  3. 追加 `generateMetadata`、`generateStaticParams`（视需要）。
- **新增区块类型**：完成“区块扩展”四步，并更新 seed/mock 以提供示例数据。
- **调整导航/文案**：修改 `lib/i18n/dictionaries.ts`，同步单元测试或截图；不要直接在组件内硬编码文本。
- **对接真实接口**：在 `.env.local` 配置 Strapi URL/Token，验证 `get*` 函数是否命中实时数据；缺字段时及时扩充 schema。

## 已知事项与后续建议
- ESLint 尚未启用；如需加入请整理现有规则，避免与 `module: nodenext` 冲突。
- `BeforeAfterSection` 等旧组件仅支持暗底，需要时增补亮色主题支持并更新 Tailwind 样式。
- `tsconfig.json` 启用 `verbatimModuleSyntax`，引入第三方库时注意使用 `import` 与 `require` 的兼容性。
- 持续跟踪 `codex.md` 路线图（如首页重构字段），确保 `buildHomeContent` 与 CMS schema 同步演进。
