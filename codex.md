# MetaRadio — 网站工程蓝图（Codex 规范稿）

> 目标：基于 Next.js（App Router）+ TailwindCSS 构建 MetaRadio 官网。内容可由 Strapi v5 提供（REST），前期允许用静态占位数据。支持中英文扩展、ISR、可无障碍升级到预览/草稿发布与图床 Provider。

## 1. 项目概览

- 名称：MetaRadio 官网
- 技术栈：
  - 前端：Next.js 14（App Router, TypeScript, ISR）
  - 样式：TailwindCSS（含 @tailwindcss/typography）
  - 数据：Strapi v5（REST，显式 populate 动态区），允许静态 mock
- 目标特性：
  - 响应式设计（移动优先）
  - 语义化与可访问性（ARIA，键盘导航，合理的色彩对比）
  - SEO 基础（head/meta、开放图、schema.org/JSON-LD 占位）
  - 预留 i18n（默认 zh-CN，可扩 en）
  - 可扩展的页面区块（与 Strapi Dynamic Zones 对齐）

---

## 2. 信息架构（IA）与导航

### 顶部导航（MainMenu）
- 解决方案（/marketing/solutions）
- 核心产品（/marketing/products）
- 技术能力（/capabilities）
- 成功案例（/marketing/cases）
- 洞察（/marketing/blog）
- 资源（/marketing/resources）
- 关于（/company）
- 联系（/contact）

### 页脚（Footer）
- 公司信息、社交链接占位（GitHub/LinkedIn/WeChat 可选）
- 版权声明

---

## 3. 页面与路由

详见首页、解决方案、产品、案例、文章、资源、能力、关于、联系。

---

## 4. 设计规范（UI/UX）

- 颜色：主色 `indigo-600`，文本 `slate-800/600`，边框 `slate-200`
- 圆角：卡片 `rounded-2xl`，按钮 `rounded-xl`，表单 `rounded-lg`
- 阴影：卡片 hover `shadow-lg`，默认 `shadow-sm`
- 栅格：默认 `container mx-auto px-6`
- 排版：正文使用 `.prose`，图片圆角
- 动效：悬停过渡，导航吸顶
- 无障碍：键盘访问、链接焦点、图片 alt

---

## 5. 组件清单

- `Nav`：顶部导航
- `Section`：通用区块
- `Hero`：大标题/CTA
- `FeatureCard`：卖点卡片
- `Stat`：KPI 展示
- `Bullet`：能力点列表
- `BeforeAfter`：对比组件
- `TechStep`：步骤流程
- `MediaBlock`：图文混排
- `CTA`：按钮区域
- `PostCard` / `CaseCard`：文章/案例卡片

---

## 6. 数据模型（Strapi v5）

### Single Types
- `SiteSettings`：`siteName`，`logo`，`socialLinks[]`，`defaultSeo`

### Collection Types
- `Page`：`title`，`slug`，`seo`，`blocks`
- `Solution`：`title`，`slug`，`blocks`，`relatedCases`
- `CaseStudy`：`title`，`slug`，`client`，`challenge`，`approach`，`result`，`kpi[]`
- `Article`：`title`，`slug`，`excerpt`，`cover`，`content`
- `Resource`：`title`，`desc`，`file`

### Components
- `seo/Seo`：`metaTitle`,`metaDescription`,`ogImage`
- `shared/Metric`：`label`,`value`,`unit`
- `shared/Link`：`name`,`url`
- `hero/Hero`：`headline`,`subhead`,`bgMedia`,`ctaPrimary`,`ctaSecondary`
- `grid/FeatureCard`：`icon`,`title`,`desc`,`link`
- `rt/TechStep`：`name`,`desc`
- `rt/BeforeAfter`：`title`,`beforeMedia`,`afterMedia`

---

## 7. 接口契约（REST 示例）

### 首页 Page（slug=landing）
GET /api/pages?filters[slug][$eq]=landing&populate=blocks,seo
### 文章列表
GET /api/articles?sort=publishedAt:desc&pagination[page]=1&pagination[pageSize]=9
### 案例列表
GET /api/case-studies
---

## 8. 示例内容

### 首页 Hero
- 标题：看得见的电磁世界
- 子标题：可预测的连接与性能
- 概述：MetaRadio 以射线跟踪法为核心，提供从通信测试到行业赋能的一体化方案。
- CTA：预约演示 / 查看产品

### 核心产品要点
- Hyper-RT 一体机：射线追踪求解，通道仿真，接口导出
- 动态 MIMO OTA 工具链：空间连续性，暗室/转台
- 虚拟路测平台：轨迹回放，AI 闭环

---

## 9. 目录结构
metaradio/
app/
layout.tsx
page.tsx
marketing/
solutions/
page.tsx
virtual-drive/page.tsx
robotics/page.tsx
products/
page.tsx
hyper-rt/page.tsx
cases/
page.tsx
[slug]/page.tsx
blog/
page.tsx
[slug]/page.tsx
resources/page.tsx
company/page.tsx
contact/page.tsx
components/
nav.tsx
section.tsx
lib/
strapi.ts
scripts/
seed-strapi.mjs
package.json
next.config.mjs
tailwind.config.ts
postcss.config.mjs
---

## 10. 生成规则（Codex 指令）

1. 按目录创建文件并写入基础实现。
2. 页面顶部插入 `<Nav />`。
3. 样式统一 Tailwind。

## 11. 近期路线图与优先级

### 当前进展
- ✅ 多语言架构已落地：目录迁移至 `app/[locale]/**`，默认 `zh` 并支持 `en`，导航/区块/Meta 均接入 `lib/i18n` 字典与链接本地化。
- ✅ 内容分层已覆盖通信、汽车、无人机、机器人、卫星、通感一体、高精定位等行业，`lib/mock-data.ts`、`scripts/seed-strapi.mjs`、`cms/src/seed.ts` 对应扩充。
- ✅ 引入 Vitest，现有单元测试覆盖 `localizeHref` 等数据契约，可通过 `npm test` 运行。
- ⚠️ ESLint 尚未初始化（`npm run lint` 会触发 Next 提示），待团队确认配置方案。

### 多语言（最高优先级）
- 目录调整为 `app/[locale]/...`，默认生成 `zh`，预留 `en`；`app/layout.tsx` 负责检测 locale 并复用导航与区块渲染。
- 统一 `lib/strapi.ts` 接口的 `locale` 参数，所有页面调用时显式传递；若 Strapi 未命中，回退到多语言 mock。
- 在导航、Meta 标签、CTA 等文本位加入语言包（命名空间分组：`common`、`marketing` 等），初始使用简单对象导出，后续可接入翻译服务。
- `next.config.mjs` 内开启 i18n routes（`locales: ['zh', 'en']`）并约定默认语言为 `zh`。

### 内容分层落地
- 基于行业维度扩充 `Solution`、`CaseStudy`、`Article` 模型数据：通信、汽车通信（虚拟路测）、无人机、机器人、卫星、通感一体化、定位。
- Strapi `seed.ts` 与 `scripts/seed-strapi.mjs` 同步新增多行业内容，并通过动态区块体现差异化卖点（如时间线、指标矩阵、合作流程）。
- `lib/mock-data.ts` 与动态区块组件保持同构结构，确保无 CMS 时仍有完整演示。
- 规划新区块组件（如 `sections.industry-matrix`、`sections.timeline`）时优先在此文档登记字段结构，保持 Next 与 Strapi 的 contract 同步。
- 明确内容投放顺序：先补核心行业解决方案页面 → 对应案例/文章 → 资源下载或 CTA。

### 测试与质量
- 引入 `vitest` + `@testing-library/react` 进行组件渲染与数据映射测试，重点覆盖 `BlocksRenderer`、导航、语言切换逻辑。
- 针对 `lib/strapi.ts` 编写单元测试与契约测试，模拟多语言 fallback、缺失字段等场景。
- 在 CI（待配置）中运行 `lint` + `vitest`，并为未来 e2e（Playwright）预留脚本占位。
- 记录测试基线与约定：新增区块/接口必须附带最小测试覆盖或更新现有限定快照。
4. 图片使用 `next/image`。
5. API 降级为 mock 时不报错。

---

## 11. 验收标准

- `npm run dev` 可启动，无报错。
- 响应式适配常见分辨率。
- Lighthouse 四项 ≥ 85。
- 图片含 alt，交互有焦点。

---

## 12. 后续拓展

- 预览模式
- Webhooks
- 图床 Provider
- i18n
- 表单服务端接入

---

## 13. Strapi 自动建模方案（方案一）

- 仓库新增 `cms/` 目录，使用 `npx create-strapi-app@latest cms --quickstart` 初始化 Strapi v5 项目，提交 `package.json`、`config/`、`src/`、`database/` 等核心文件，统一通过 `npm run cms:dev`、`npm run cms:build` 管理。
- 按信息架构定义组件与内容模型：在 `cms/src/components/**/schema.json`、`cms/src/api/**/content-types/**/schema.json` 下描述 codex 中列举的 Single Types、Collection Types 与 Components，保持字段、关系与 Strapi Dynamic Zones 对齐。
- 将数据初始化逻辑写入 `cms/src/index.ts` 的 `bootstrap()` 或保留在仓库已有的 `scripts/seed-strapi.mjs`，脚本读取 `.env` 后批量调用 Strapi REST/Entity Service，保证幂等；首次启动后可一键同步模型与基础内容。
- 在根级 `.env`、`.env.local` 配置 `STRAPI_API_URL`、`STRAPI_API_TOKEN` 等变量，Next 端缺省时使用静态 mock，确保开发环境可独立运行。
- CI/CD 需新增 Strapi 构建校验步骤，确保 schema 与 seed 变更可通过 `npm run cms:build`、`npm run seed:strapi` 完成，避免人工操作。

### 2025-03-14 首页重构更新
- Hero：左右双栏布局，右侧玻璃面板用于展示产品插画/亮点要点，可替换 Strapi 资产。
- Pain Points：12 栅格错落排列，卡片底部保留 figureHint 以对接动效或插图。
- Solution：左侧插图/流程容器（指标卡 + Placeholder），右侧卖点列表与 CTA，适配大图内容。
- Workflow：横向 5 步流程，新增连接线与 token 标签，强调时间线感。
- Applications：引入 wide/standard/banner 三类卡片，使行业卡片尺寸丰富；预留 illustration 文本描述插图。
- Advantages：顶部圆角指标条展示部署/误差/频段，下方四列小卡。
- CTA：保持渐变背景与双 CTA，邮件链接为主。
- 数据结构：`buildHomeContent` 中补充 visual、figureHint、milestones、illustration、metrics 等字段，以驱动上述布局。
- 测试：`npx tsc --noEmit` 受仓库 CJS/ESM 配置冲突影响未通过（verbatimModuleSyntax + NodeNext）；需待全局配置决策后处理。

