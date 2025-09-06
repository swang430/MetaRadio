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
│   │   ├── /hyperrt/
│   │   ├── /raysense/
│   │   └── /csi-sensing/
│   ├── /solutions/
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
    *   `Header`: 使用公司 Logo (`/public/images/logo.png`)、基于站点地图的导航链接、以及两个关键的行动号召 (CTA) 按钮：“请求演示 (Request a Demo)” 和 “登录/注册 (Login/Register)”。后者初期可链接至一个“即将推出”的占位页面。
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
    *   创建 `/pages/platform/hyperrt.js`, `/pages/platform/raysense.js`, 和 `/pages/platform/csi-sensing.js` 页面，详细介绍软件和硬件产品。内容应结构化，包含功能列表、技术规格和高清产品图片。
    *   **关键任务:** 创建 `/pages/platform/mvs-workflow.js` 页面。实现一个基于垂直滚动的交互式动画 (`MVSWorkflowAnimation.js` 组件)，分步展示“测量 -> 建模 -> 仿真 -> 验证”的完整闭环工作流。

### **阶段三：解决方案与标准化产品**

5.  **任务 3.1: “虚拟路测 (Virtual Drive Testing)” 解决方案页**
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
    *   **问题**: 在 Next.js App Router 中，页面和布局组件的 `params` 对象是一个 `Promise`。这导致在尝试直接解构 `locale` 时（例如 `({params: {locale}})`），会在服务器日志中产生大量错误 `Error: Route [...] used `params.locale`. `params` should be awaited before using its properties.`。
    *   **已尝试的解决方案**: 我们尝试了多种方法，包括在组件内部解构 (`const {locale} = params;`)、直接使用 `params.locale`、重启开发服务器、暂时移除 `generateMetadata` 函数等，但该问题仍然存在。这可能与 `next-intl` 和 Next.js 15 的某个底层交互有关。
    *   **临时搁置**: 为避免阻塞开发，此问题暂时搁置，留待后续集中解决。它目前不影响页面的正常渲染，但会造成日志混乱。
    *   **影响范围**: 此问题影响所有需要从 `params` 中读取 `locale` 的地方，包括 `generateMetadata`, `RootLayout` 以及所有页面组件。

*   **`getTranslations` 的使用:**
    *   为了确保在服务端组件中获取正确的翻译，我们明确地将 `locale` 和 `namespace` 传递给 `getTranslations` 函数。
    *   示例: `const t = await getTranslations({locale, namespace: 'Home'});`

*   **中间件配置 (`middleware.ts`):**
    *   为了实现根路径 `/` 到默认语言路径 `/zh-CN` 的自动重定向，我们使用了 `next-intl` 提供的 `createMiddleware`。
    *   最终有效的 `matcher` 配置为 `['/', '/(zh-CN|en)/:path*']`。这个配置明确地匹配了根路径和所有带语言前缀的路径，确保了中间件在所有相关路径上都能正确执行。
*   **临时解决方案 (Workaround):**
    *   **问题**: 根路径 `/` 的重定向问题持续存在，为了不阻塞开发，我们采取了临时解决方案。
    *   **方案**: 暂时将 `Header.tsx` 中的Logo链接直接指向 `/zh-CN`，而不是 `/`。这绕过了中间件的重定向问题。
    *   **未来优化**: 这个问题被标记为技术债务，将在未来版本中重新审视并彻底解决中间件的根路径匹配问题。

