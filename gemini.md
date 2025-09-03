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
│   ├── /solutions/
│   ├── /resources/
│   └──...
├── /public/              # 静态资源 (图片, Logo, 字体)
├── /styles/              # 全局样式
└── gemini.md             # 本开发规范文件


---

## 4.0 开发计划与任务分解

### **阶段一：基础架构与核心布局**

1.  **任务 1.1: 项目初始化**
    *   使用 `create-next-app` 初始化项目，并集成 Tailwind CSS。

2.  **任务 1.2: 全局布局**
    *   创建 `Header` 和 `Footer` 组件。
    *   `Header`: 包含公司 Logo、基于站点地图的导航链接、以及两个关键的行动号召 (CTA) 按钮：“请求演示 (Request a Demo)” 和 “登录/注册 (Login/Register)”。后者初期可链接至一个“即将推出”的占位页面。
    *   `Footer`: 包含站点地图链接、联系信息、社交媒体链接和版权声明。

### **阶段二：核心页面内容实现**

3.  **任务 2.1: 首页 (Home)**
    *   **英雄区:** 实现一个引人注目的英雄区，背景采用动态、抽象的视觉效果（如代码生成的射线传播动画）。
    *   **核心价值主张:** 清晰展示 H1 标题：“测量验证仿真：为您的无线网络赋予地面实况”，并附上简洁的副标题。
    *   **内容模块:** 创建模块化组件来介绍核心平台、解决方案亮点和客户信任标志。

4.  **任务 2.2: 平台 (The Platform) 页面**
    *   创建 `/pages/platform/metasim.js` 和 `/pages/platform/raysense.js` 页面，详细介绍软件和硬件产品。内容应结构化，包含功能列表、技术规格和高清产品图片。
    *   **关键任务:** 创建 `/pages/platform/mvs-workflow.js` 页面。实现一个基于垂直滚动的交互式动画 (`MVSWorkflowAnimation.js` 组件)，分步展示“测量 -> 建模 -> 仿真 -> 验证”的完整闭环工作流。

### **阶段三：解决方案与标准化产品**

5.  **任务 3.1: “虚拟路测 (Virtual Drive Testing)” 产品页**
    *   创建 `/pages/solutions/virtual-drive-testing.js`。
    *   **页面标题:** "Horizon One: 新一代虚拟路测平台"。
    *   **交互式 Canvas 演示:**
        *   开发 `VirtualDriveTest.js` Canvas 组件。
        *   功能要求：允许用户通过下拉菜单选择不同场景（如“城市峡谷”、“高速公路”）。
        *   Canvas 根据选择动态渲染该场景的简化 3D 模型，并实时演算射线传播路径。
        *   所有 Canvas 绘图样式（颜色、线宽）必须通过 `/lib/theme.js` 中的配置对象进行管理，以确保风格统一。
    *   **技术规格 (Datasheet) 区域:**
        *   以清晰的表格形式展示所有技术参数。
        *   在该区域右上角放置一个“下载 PDF”按钮。

6.  **任务 3.2: 其他解决方案页面**
    *   创建一个可复用的解决方案页面模板。
    *   根据模板填充“私有 5G/6G 网络”、“智慧场馆”等页面的内容。

### **阶段四：内容中心与后端集成**

7.  **任务 4.1: 资源中心 (Resources)**
    *   创建 `/pages/resources/index.js`，以卡片或列表形式展示所有资源。
    *   实现筛选功能（按类型：白皮书、案例研究、博客等）。
    *   创建不同资源类型的详情页模板。

8.  **任务 4.2: Headless CMS 集成**
    *   在选择的 Headless CMS 中定义内容模型 (Content Models)，包括：`Page`, `Solution`, `Product`, `ResourceArticle`, `TeamMember` 等。
    *   在 `/lib/api.js` 中实现从 CMS 获取数据的函数。
    *   将所有页面的静态内容替换为从 CMS 获取的动态数据。

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

## 7.0 i18n 实现说明

在项目开发过程中，我们遇到并解决了一些关于 `next-intl` 和 Next.js App Router 的具体问题。这些经验对于未来的开发和维护至关重要。

*   **动态元数据 (Dynamic Metadata):**
    *   为了实现多语言的页面标题和描述，我们使用了 Next.js 的 `generateMetadata` 函数。
    *   在 `src/app/[locale]/layout.tsx` 中，`generateMetadata` 会根据当前的 `locale` 参数从相应的翻译文件 (`messages/[locale].json`) 中获取 `Layout.title` 和 `Layout.description`。

*   **`params` 对象的异步特性:**
    *   **问题**: 在 Next.js App Router 中，页面和布局组件的 `params` 对象是一个 `Promise`。
    *   **解决方案**: 不能直接在函数签名中解构 `locale`，例如 `({params: {locale}})`。必须先接收 `params` 对象，然后在函数体内解构，例如 `const {locale} = params;`。
    *   **影响范围**: 此问题影响所有需要从 `params` 中读取 `locale` 的地方，包括 `generateMetadata`, `RootLayout` 以及所有页面组件。

*   **`getTranslations` 的使用:**
    *   为了确保在服务端组件中获取正确的翻译，我们明确地将 `locale` 和 `namespace` 传递给 `getTranslations` 函数。
    *   示例: `const t = await getTranslations({locale, namespace: 'Home'});`

*   **中间件配置 (`middleware.ts`):**
    *   为了实现根路径 `/` 到默认语言路径 `/zh-CN` 的自动重定向，我们使用了 `next-intl` 提供的 `createMiddleware`。
    *   最终有效的 `matcher` 配置为 `['/', '/(zh-CN|en)/:path*']`。这个配置明确地匹配了根路径和所有带语言前缀的路径，确保了中间件在所有相关路径上都能正确执行。

