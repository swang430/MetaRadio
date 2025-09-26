Gemini.md: Metaradio.tech 下一代网站开发规范
1.0 项目愿景与核心设计原则
项目目标: 开发 Metaradio.tech 的新一代官方网站。该网站不仅是公司的数字名片，更是一个可扩展的、动态的内容与产品交付平台，旨在清晰传达我们的核心价值，建立技术信誉，并为未来的用户社区和产品服务奠定基础。

核心设计原则: 所有开发工作必须遵循以下四大原则：

清晰 (Clarity): 访客必须在几秒钟内理解我们的核心价值主张——“测量验证仿真 (Measurement-Validated Simulation, MVS)”，即我们通过真实世界的数据为仿真提供“地面实况” 。   

信誉 (Credibility): 网站必须通过专业、详实的内容（技术规格、白皮书、案例研究）来建立技术权威性和市场信任感，效仿行业领导者如 Remcom 和 Ranplan 的资源中心模式 。   

动态 (Dynamism): 充分利用数字媒介的优势，通过交互式图表、动画和嵌入式 Canvas 演示来生动地展示我们的技术实力，特别是那些静态 PDF 无法呈现的内容。

可扩展 (Scalability): 采用“API 优先”和“内容即服务”的理念进行架构设计。今天的网站必须是明天的平台，能够无缝集成用户门户、动态文档生成等未来功能。

2.0 技术栈与架构
前端框架: Next.js (推荐) 或 Nuxt.js - 用于服务器端渲染 (SSR)、静态站点生成 (SSG) 和 API 路由，提供优秀的性能和开发体验。

内容管理系统 (CMS): Headless CMS (无头内容管理系统)，如 Strapi (开源自托管) 或 Sanity (云服务)，用于解耦内容与展示。

样式: Tailwind CSS - 用于快速、一致的 UI 开发。所有样式应通过 @apply 指令或配置文件进行管理，以确保品牌一致性。

动态 PDF 生成: 后端 API 路由，使用 Puppeteer 或类似库，根据 CMS 内容动态生成 PDF。

交互式 Canvas: 原生 HTML5 Canvas API 或使用轻量级库如 Konva.js 进行封装，以简化交互逻辑。

用户认证 (未来): 预留接口，为未来集成 Auth0, NextAuth.js 或 Firebase Authentication 做准备。

3.0 文件与组件结构
/
├── /api/                 # API 路由 (Next.js)
│   ├── /auth/            # [未来] 用户认证接口
│   └── generate-pdf.js   # 动态 PDF 生成接口
├── /components/          # 可复用 UI 组件
│   ├── /canvas/          # 交互式 Canvas 模块
│   │   └── VirtualDriveTest.js
│   ├── /layout/          # 页面布局 (Header, Footer)
│   ├── /ui/              # 基础 UI 元素 (Button, Card, Icon)
│   └── MVSWorkflowAnimation.js
├── /lib/                 # 辅助函数和第三方服务客户端
│   ├── api.js            # CMS API 客户端
│   └── theme.js          # 样式主题配置 (颜色, 字体)
├── /pages/               # 页面组件 (对应网站路由)
│   ├── /platform/
│   │   ├── index.js        # [新增] 平台索引页, 概述所有平台产品
│   │   ├── /hyperrt/
│   │   ├── /raysense/
│   │   └── /csi-sensing/
│   ├── /solutions/
│   │   ├── index.js        # [新增] 解决方案索引页, 概述所有解决方案
│   │   ├── /mimo-ota/
│   │   └── /virtual-drive-testing/
│   ├── /resources/
│   └──...
├── /public/              # 静态资源 (图片, Logo, 字体)
├── /styles/              # 全局样式
├── /old_website/         # 旧网站内容备份，用于内容迁移
└── gemini.md             # 本开发规范文件


---

## 4.0 开发计划与任务分解

### **阶段一：基础架构与核心布局**

1.  **任务 1.1: 项目初始化**
    *   使用 `create-next-app` 初始化项目，并集成 Tailwind CSS。

2.  **任务 1.2: 全局布局**
    *   创建 `Header` 和 `Footer` 组件。
    *   `Header`: 使用公司 Logo (`/public/images/logo.png`)、基于站点地图的导航链接、以及两个关键的行动号召 (CTA) 按钮：“请求演示 (Request a Demo)” 和 “登录/注册 (Login/Register)”。导航链接中的“平台”和“解决方案”应指向各自的索引页 (`/platform` 和 `/solutions`)，而不是具体的产品/方案页面。后者初期可链接至一个“即将推出”的占位页面。
    *   `Footer`: 包含站点地图链接、联系信息、社交媒体链接和版权声明。

### **阶段二：核心页面内容实现**

3.  **任务 2.1: 首页 (Home)**
    *   **英雄区:** 实现一个引人注目的英雄区，背景采用动态、抽象的视觉效果（如代码生成的射线传播动画）。
    *   **核心价值主张:** 结合 `地平线一号1.1.html` 和 `gemini.md` 的内容，创建引人注目的英雄区。H1标题使用“地平线一号：市场领先的虚拟集成测试解决方案”，副标题使用“我们聚焦于汽车和卫星通信等高增长领域，通过融合确定性信道与标准化模型的软硬件一体化产品，解决客户最紧迫的测试挑战。”
    *   **内容模块:** 
        *   **核心平台:** 介绍 “HyperRT” 仿真引擎、“RaySense” 信道探测仪和 “CSI-based Positioning and Sensing” 平台。
        *   **解决方案:** 重点展示“虚拟路测”和“MIMO OTA”等应用领域。
        *   **客户信任:** 使用 `MIMO OTA DataSheet.html` 中提到的合作伙伴（Keysight, Spirent, 思仪, 坤恒）作为客户信任的标志。 (暂时移除，待Logo文件提供后添加)

4.  **任务 2.2: 平台 (The Platform) 页面**
    *   **[新增] 创建平台索引页**: 创建 `/pages/platform/index.js`，作为平台板块的着陆页。该页面应清晰地展示并链接到所有核心平台产品。
    *   创建 `/pages/platform/hyperrt.js`, `/pages/platform/raysense.js`, 和 `/pages/platform/csi-sensing.js` 页面，详细介绍软件和硬件产品。内容应结构化，包含功能列表、技术规格和高清产品图片。
    *   **关键任务:** 创建 `/pages/platform/mvs-workflow.js` 页面。实现一个基于垂直滚动的交互式动画 (`MVSWorkflowAnimation.js` 组件)，分步展示“测量 -> 建模 -> 仿真 -> 验证”的完整闭环工作流。

### **阶段三：解决方案与标准化产品**

5.  **任务 3.1: “虚拟路测 (Virtual Drive Testing)” 解决方案页**
    *   **[新增] 创建解决方案索引页**: 创建 `/pages/solutions/index.js`，作为解决方案板块的着陆页，展示并链接到所有解决方案。
    *   创建 `/pages/solutions/virtual-drive-testing.js`。
    *   **页面核心**: 重点阐述“地平线一号”产品中的“路测数据转换”模块，突出将真实路测数据转化为可重复、高保真的实验室测试场景的核心价值。
    *   **内容结构**:
        *   **挑战**: 阐述物理路测的痛点（成本、效率、可重复性）。
        *   **解决方案**: 介绍“地平线一号”如何通过数据转换和实验室复现来解决这些痛点。
        *   **核心流程**: 以图文形式，分步展示“数据采集 → 自动化处理 → 虚拟场景复现”的核心工作流。
        *   **客户价值**: 总结方案带来的好处，如降本增效、提升测试覆盖率等。

6.  **任务 3.2: MIMO OTA 解决方案页面**
    *   创建 `/pages/solutions/mimo-ota.js` 页面，详细介绍 MIMO OTA 测试解决方案。

### **阶段四：内容中心与后端集成**

7.  **任务 4.1: 资源中心 (Resources)**
    *   创建 `/pages/resources/index.js`，以卡片或列表形式展示所有资源。
    *   实现筛选功能（按类型：白皮书、案例研究、博客等）。
    *   创建不同资源类型的详情页模板。

8.  **任务 4.2: Headless CMS 集成**
    *   **目标**: 将网站的静态内容（如产品介绍、解决方案描述等）迁移到Headless CMS中，实现内容与代码的分离。
    *   **技术选型**: 以 Strapi (开源, 本地部署) 为例进行初步集成。
    *   **步骤**:
        1.  **设置Strapi**: 在本地环境中快速搭建一个Strapi项目。
        2.  **定义内容模型**: 在Strapi后台，根据现有页面定义`Product`, `Solution`, `ResourceArticle`等内容类型 (Content-Types)。
        3.  **创建API客户端**: 在 `/lib/api.js` 中，实现与Strapi API交互的函数，用于获取各类内容。
        4.  **概念验证 (POC)**: 将“资源中心”页面的模拟数据，替换为通过API从Strapi获取的真实数据，验证整个流程的通畅性。

### 4.2.1 集成实现笔记 (Implementation Notes)

在本地集成 Strapi 作为 Headless CMS 的概念验证过程中，我们确定了以下关键实践和设计决策：

1.  **项目结构**: Strapi 项目 (`metaradio-cms`) 被创建在主网站项目的根目录下。
    *   **配置冲突解决**: 为了解决 Strapi 的 Vite 构建系统与主项目 `postcss.config.mjs` 的冲突，在 `metaradio-cms` 目录内创建了一个空的 `postcss.config.mjs` 文件进行覆盖。

2.  **API 响应格式**: 本地 Strapi 实例的 API 响应默认是**扁平化 (flat)** 的，它不包含 `attributes` 包装层。所有前端获取逻辑都必须直接访问 `data.name` 而不是 `data.attributes.name`。

3.  **内容模型 (Content-Types)**:
    *   **`Solution` 模型**: 已创建，包含 `name` (Text), `description` (Rich Text), 和 `slug` (UID, 附加到 name 字段) 字段。

4.  **权限管理**: 对于需要在前端公开访问的任何内容类型（如 `Solution`），必须在 "Settings" -> "Roles" -> "Public" 中，为其勾选 `find` 和 `findOne` 权限。

5.  **国际化 (i18n) 与内容获取**: 
    *   **挑战**: Strapi 的 `slug` (UID 类型) 字段为了生成 URL 友好的ID，通常需要附加到一个基于英文的字段上（如 `title`），这导致前端直接获取该字段时，即使在中文页面也会显示英文标题。
    *   **解决方案**: 必须使用 Strapi 内置的 **i18n (Internationalization) 插件**来解决此问题。需要为每一个需要翻译的“集合类型”（如 `Solution`, `Platform`）启用本地化支持。
    *   **字段级配置**: 启用后，可以将 `slug` 这样的字段设置为“非本地化”（所有语言版本共享同一个 slug 值），而将 `title`, `description` 等字段设置为“本地化”（每个语言版本可以有独立的翻译内容）。
    *   **前端请求**: 前端代码在请求 API 时，通过 `?locale=zh-CN` 或 `?locale=en` 查询参数来请求特定语言版本的内容。Strapi 会自动返回对应语言的 `title` 和 `description`，而 `slug` 保持不变。此策略已在现有 `lib/api.ts` 的 `getSolutions` 等函数中实现。
    *   **内容创建流程**: 为确保 `slug` 的正确生成和共享，必须遵循“**先英文，后中文**”的原则：先创建内容的英文版，使其根据英文标题生成一个唯一的、非本地化的 `slug`；然后，再从该英文条目中创建中文的本地化版本，此时 `slug` 字段会被锁定，而中文标题则可以自由填写。

6.  **前端数据获取**:
    *   所有与 Strapi 的交互逻辑都被抽象到 `/lib/api.ts` 文件中，以便复用。
    *   页面组件（如 `solutions/page.tsx`）应为服务器组件，直接调用 `lib/api.ts` 中的函数来获取数据。

9.  **任务 4.3: 动态 PDF 生成**
    *   创建 API 路由 `/api/generate-pdf.js`。
    *   该接口接收一个参数（如 `solutionSlug`）。
    *   接口内部逻辑：
        1.  根据 `solutionSlug` 从 CMS 获取相应的内容。
        2.  使用 Puppeteer 将这些内容填充到一个预先设计好的 HTML 模板中。
        3.  将渲染后的 HTML 页面导出为 PDF。
        4.  将 PDF 文件流作为响应返回给前端。
    *   将“虚拟路测”页面上的“下载 PDF”按钮链接到此 API 接口。

### **阶段五：未来功能接口预留**

10. **任务 5.1: 用户认证 API 预留**
    *   创建 `/api/auth/[...nextauth].js` (如果使用 NextAuth.js) 或类似的路由结构。
    *   实现基本的登录、注册、登出接口，目前仅返回 `501 Not Implemented` 或一个表示“即将推出”的 JSON 消息。
    *   确保前端的“登录/注册”按钮已准备好在未来调用这些接口。

---

## 5.0 验收标准

*   **响应式设计:** 网站在桌面、平板和移动设备上均有完美的视觉和交互体验。
*   **性能:** 遵循 Web Vitals 标准，特别是 Largest Contentful Paint (LCP) 和 First Input Delay (FID)。利用 Next.js 的 SSG/ISR 功能进行优化。
*   **可访问性 (A11y):** 所有交互元素都必须是键盘可访问的，图片有 `alt` 标签，并遵循 WCAG 2.1 AA 标准。
*   **代码质量:** 代码必须整洁、有注释，并遵循模块化和可复用的原则。

---

## 6.0 国际化 (i18n) 规范

为了支持多语言内容，项目采用以下国际化策略：

*   **技术库 (Library):** `next-intl`
    *   我们使用 `next-intl` 库来处理路由、翻译加载和文本渲染。它与 Next.js App Router 深度集成。

*   **支持语言 (Supported Locales):**
    *   `zh-CN` (简体中文): 默认语言。
    *   `en` (English): 英文版。

*   **路由策略 (Routing Strategy):**
    *   采用基于路径名的路由策略 (`/zh-CN/...`, `/en/...`)。
    *   根路径 `/` 会根据 `middleware.ts` 的配置自动重定向到默认语言路径 `/zh-CN`。

*   **翻译文件 (Translation Files):**
    *   所有翻译文本都存储在根目录下的 `/messages` 文件夹中。
    *   文件按语言代码命名，例如 `zh-CN.json` 和 `en.json`。
    *   JSON 文件内部采用嵌套结构，按组件或页面进行组织，以方便管理。例如：`"Header": { "title": "..." }`。

*   **开发流程 (Development Workflow):**
    1.  当在组件中需要添加新的静态文本时，必须先在 `messages/zh-CN.json` 和 `messages/en.json` 中添加对应的键值对。
    2.  在组件中，使用 `next-intl` 提供的 `useTranslations` 钩子来获取翻译函数 `t`。
    3.  通过 `t('keyName')` 的方式在组件中渲染文本，**严禁在代码中硬编码任何面向用户的文本**。

---

## 7.0 i18n 实现说明与核心开发原则

为了彻底解决在开发中遇到的 i18n “震荡”问题，我们确立以下核心开发原则，所有组件的开发和重构都必须严格遵守。

### 7.1 核心原则：服务器组件优先与客户端组件隔离

问题的根源在于 Next.js App Router 的核心设计：**服务器组件 (Server Components)** 与 **客户端组件 (Client Components)** 的分离。我们必须根据组件的职责来选择正确的类型和对应的 i18n 实现方式。

1.  **默认一切皆为服务器组件 (Server-First)**
    *   **职责**: 负责数据获取、文件访问、和绝大部分的页面渲染。
    *   **i18n 实现**: 必须显式地从页面/布局的 `params` 中获取 `locale`，然后使用 `getTranslations` **异步**获取翻译文本。
    *   **示例**: `const t = await getTranslations({locale, namespace: 'Page'});`

2.  **仅在必要时使用客户端组件 (Isolate Interactivity)**
    *   **“必要时”是指**: 组件需要处理用户交互（如 `onClick`）、管理状态（如 `useState`）、或使用浏览器独有的 API 时。
    *   **i18n 实现**: 在组件顶部声明 `'use client'`。使用 `useTranslations` **Hook** 来获取翻译。它无需关心 `locale` 来自何处，因为 `NextIntlClientProvider` 会通过 React Context 提供。
    *   **示例**: `const t = useTranslations('Component');`

3.  **严禁为了便利而滥用 `'use client'`**
    *   **反模式**: 一个纯展示性组件（如 `Header`, `Footer`）为了方便使用 `useTranslations` Hook 而被声明为 `'use client'`。
    *   **正确模式**: 纯展示性组件应保持为**服务器组件**。其所需的翻译文本应由其父级服务器组件通过 `getTranslations` 获取后，以 **props** 的形式传递下来。
    *   **收益**: 显著减少发送到客户端的 JavaScript 体积，优化初始加载性能。

### 7.2 架构蓝图：`layout.tsx` 作为桥梁

我们的根布局 `src/app/[locale]/layout.tsx` 是实践上述原则的完美范例：
*   它自身是一个**服务器组件**，负责接收 `locale` 参数并获取 `messages`。
*   它使用 `<NextIntlClientProvider>` 将 `locale` 和 `messages` **注入**到客户端世界。
*   这使得所有嵌套在其中的**客户端组件**都能通过 `useTranslations` Hook 访问到 i18n 上下文，而**服务器组件**则继续通过 `getTranslations` 和 `props` 传递来工作。

所有未来的开发都将以此为蓝图，通过“服务器包裹客户端”的模式，清晰地分离职责，确保应用的性能和可维护性。原有的 `params` 异步问题和中间件问题，将在此统一架构下得到妥善管理。