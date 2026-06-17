# Metaradio.tech 下一代官方网站 (Next Gen)

> **测量验证仿真 (Measurement-Validated Simulation, MVS)** 的数字体验平台。

本项目是 Metaradio.tech 的全新一代官方网站，采用 **Headless CMS** 架构，将内容管理与前端展示完全解耦，旨在构建一个高性能、可扩展、且具备深度国际化能力的现代 Web 应用。

---

## 🏗 核心架构：双端分离

本项目由两个独立但紧密协作的应用组成：

1.  **前端 (Frontend)**: 基于 **Next.js 15** 构建的现代化 Web 应用，负责极致的用户体验、SEO 和交互逻辑。
2.  **后端内容源 (Content Backend)**: 基于 **Strapi 5** 构建的无头内容管理系统 (Headless CMS)，负责结构化数据的存储、API 提供以及富文本管理。

### 核心技术栈

| 领域 | 技术选型 | 版本/特性 |
| :--- | :--- | :--- |
| **前端框架** | **Next.js** | **v15** (App Router, Server Components) |
| **UI 库** | **React** | **v19** (RSC 架构深度集成) |
| **样式系统** | **Tailwind CSS** | **v4** (原子化 CSS 引擎) |
| **语言** | **TypeScript** | 全栈类型安全 |
| **CMS** | **Strapi** | **v5** (Headless, 自托管, SQLite/Postgres) |
| **国际化** | **next-intl** | 深度集成 App Router 的 i18n 方案 |
| **PDF 生成** | **Puppeteer** | 服务端动态 PDF 生成 |

---

## 🌟 关键特性详解

### 1. 内容即服务 (Content as a Service)
我们将“内容”视为一种可被多端消费的服务，而不仅仅是网页上的文字。
*   **Headless CMS**: 所有产品介绍、解决方案、博客文章均存储在 Strapi 中，通过 RESTful API 提供给前端。
*   **结构化数据**: 内容被拆分为独立的字段（如 `Title`, `Slug`, `Summary`, `Body`, `CoverImage`），而非传统的整页 HTML，这使得内容可以被灵活复用（如生成 PDF、移动端展示）。
*   **富文本渲染**: 使用官方 `@strapi/blocks-react-renderer`，将 Strapi 的富文本 JSON 数据安全、语义化地渲染为 React 组件，**杜绝**了传统的 `dangerouslySetInnerHTML` 安全风险。

### 2. 深度国际化 (i18n) 架构
为了支持 **English** 和 **简体中文 (zh-CN)**，我们设计了一套从路由到 CMS 的完整 i18n 方案：
*   **路由级 i18n**: 基于 `next-intl`，采用 `/[locale]/path` 的路由结构（如 `/en/solutions/mimo-ota` 和 `/zh-CN/solutions/mimo-ota`）。
*   **CMS 本地化策略**:
    *   **Slug (URL 标识符)**: **非本地化 (Non-localized)**。所有语言版本共享同一个 Slug（基于英文标题生成），确保 URL 结构的一致性和 SEO 权重集中。
    *   **内容字段**: **本地化 (Localized)**。标题、描述、正文等字段在不同语言下独立存储。
    *   **API 请求**: 前端通过 `?locale=zh-CN` 参数自动获取对应语言的内容。

### 3. 服务器组件优先 (Server Components First)
严格遵循 Next.js 15 的架构原则，以获得最佳性能和 SEO：
*   **数据获取 (Fetching)**: 所有的 CMS 数据获取均在 **Server Components** (`page.tsx`, `layout.tsx`) 中进行，直接在服务端完成渲染，无需客户端请求瀑布流。
*   **交互隔离**: 仅在需要用户交互（点击、状态管理）的组件（如 `Carousel`, `Navbar`）中使用 `'use client'`。
*   **i18n 注入**: 根布局 (`layout.tsx`) 负责获取翻译字典，并通过 `<NextIntlClientProvider>` 注入给客户端组件。

### 4. 动态 PDF 生成
集成 `puppeteer` 实现内容的二次分发：
*   **API 路由**: `/api/generate-pdf` 接收产品 Slug。
*   **实时生成**: 后端实时抓取对应产品的 CMS 数据，填充到专门的打印模板中，并生成 PDF 流返回给用户。
*   **价值**: 确保下载的技术规格书 (Datasheet) 永远与网站内容保持同步，无需手动更新 PDF 文件。

---

## 📂 项目结构

```bash
/
├── metaradio-cms/          # [后端] Strapi CMS 项目目录
│   ├── src/api/            # 内容类型定义 (Schema) 与控制器
│   ├── config/             # 数据库、插件配置
│   ├── public/uploads/     # 上传的媒体文件 (图片/视频)
│   └── ...
├── src/                    # [前端] Next.js 源码目录
│   ├── app/                # App Router 路由与页面
│   │   ├── [locale]/       # 国际化路由入口
│   │   │   ├── platform/   # 平台产品页
│   │   │   ├── solutions/  # 解决方案页
│   │   │   └── ...
│   │   └── api/            # Next.js API 路由 (如 PDF 生成)
│   ├── components/         # React 组件库
│   ├── lib/                # 工具库
│   │   ├── api.ts          # Strapi API 客户端 (Fetch 封装)
│   │   └── ...
│   └── messages/           # UI 静态文本翻译 (en.json, zh-CN.json)
├── public/                 # 静态资源 (Logo, Icons)
├── gemini.md               # 项目开发规范与备忘录
└── README.md               # 本文档
```

---

## 🚀 快速开始 (Getting Started)

### 环境要求
*   **Node.js**: >= 18.0.0
*   **NPM**: >= 9.0.0

### ⚡ 一键启动（推荐）

在项目根目录用**一条命令**同时拉起 **Strapi CMS** 与 **前端**（基于 `concurrently`，输出带 `cms` / `web` 前缀，`Ctrl+C` 同时退出两者）：

```bash
# 首次：安装依赖 + 灌入双语示例内容（自动生成 .env、seed、开放公共读）
npm install
npm --prefix metaradio-cms install
npm run seed:cms

# 之后每次：一键启动两端
npm run dev:all
```

*   **前端 (Website)**: [http://localhost:3000](http://localhost:3000)
*   **Strapi Admin**: [http://localhost:1337/admin](http://localhost:1337/admin)

> Strapi 启动较慢；在其就绪前，前端会用 Mock 内容优雅降级，就绪后自动切换为真实数据。

### 分别启动（可选）

如需单独调试某一端，也可分两个终端分别启动：

### 1. 启动后端 (Strapi CMS)

```bash
cd metaradio-cms

# 安装依赖 (首次运行)
npm install

# 启动开发服务器
npm run develop
```
*   **Admin Panel**: [http://localhost:1337/admin](http://localhost:1337/admin) (请先注册管理员账号)
*   **API Endpoint**: [http://localhost:1337/api](http://localhost:1337/api)

### 2. 启动前端 (Next.js)

打开一个新的终端窗口：

```bash
# 回到项目根目录
cd .. 

# 安装依赖 (首次运行)
npm install

# 启动开发服务器
npm run dev
```
*   **Website**: [http://localhost:3000](http://localhost:3000)

---

## 🛠 开发指南

### 内容管理流程 (CMS Workflow)
1.  进入 **Strapi Admin** -> **Content Manager**。
2.  **创建内容 (Create)**: 选择一个集合类型（如 `Solution`）。
3.  **多语言录入规范**:
    *   👉 **第一步**: 必须先创建 **英文版 (English)** 内容。填写英文标题以自动生成 Slug。
    *   👉 **第二步**: 保存后，点击右侧的 "Locales" 下拉菜单切换到 **Chinese (zh-CN)**。
    *   👉 **第三步**: 点击 "Fill in from another locale" (可选)，然后翻译标题和正文。**注意：Slug 字段是锁定的，与英文版保持一致。**
4.  **发布 (Publish)**: 记得分别为英文版和中文版点击 "Publish" 按钮。

### Git 分支策略
*   **`main`**: 当前活跃的开发分支（V2.0 架构）。
*   **`legacy`**: 旧版本代码备份（V1.0 架构）。

---

## 📄 许可证
Private Property of Metaradio.tech. All rights reserved.
