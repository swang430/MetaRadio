# MetaRadio

一个基于 Next.js 14 和 Strapi v5 构建的现代化、国际化的企业级网站系统，采用"CMS 即代码"理念，支持优雅降级到 Mock 数据。

## ✨ 特性

- 🚀 **Next.js 14 App Router** - 使用最新的 React Server Components
- 🌍 **完整国际化** - 支持中文（zh）和英文（en）双语切换
- 📦 **Strapi v5 CMS** - 强大的内容管理系统，Schema 代码化管理
- 🎨 **动态区块系统** - 10+ 可复用的内容区块组件
- 🔄 **优雅降级** - Strapi 不可用时自动使用 Mock 数据
- 💅 **Tailwind CSS** - 现代化的样式系统，支持明暗主题
- ✅ **TypeScript** - 完整的类型安全
- 🧪 **Vitest 测试** - 单元测试和集成测试
- 🔒 **安全加固** - XSS 防护、图片域名白名单、HTML 消毒

## 🚀 快速开始

### 环境要求

- Node.js 20+
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 环境变量配置

创建 `.env.local` 文件（可选，不配置则使用 Mock 数据）：

```env
# Strapi 配置（可选）
STRAPI_API_URL=http://localhost:1337
STRAPI_API_TOKEN=your-token-here
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# ISR 重新验证间隔（秒）
REVALIDATE_SECONDS=120
```

### 开发模式

```bash
# 启动 Next.js 开发服务器
npm run dev

# 如需使用 Strapi，在另一个终端启动 Strapi
cd cms
npm install
npm run develop
```

访问 `http://localhost:3000` 查看网站。

### 生产构建

```bash
npm run build
npm start
```

## 📁 项目结构

```
metaradio/
├── app/[locale]/          # Next.js App Router（国际化路由）
│   ├── marketing/         # 营销页面（解决方案、博客、案例、资源）
│   ├── company/           # 关于我们页面
│   └── contact/           # 联系页面
├── components/
│   ├── blocks/            # 动态区块组件
│   │   ├── renderer.tsx   # 区块渲染引擎
│   │   ├── hero.tsx       # Hero 区块
│   │   ├── feature-grid.tsx
│   │   └── ...            # 其他 10+ 区块
│   └── nav.tsx            # 导航组件
├── lib/
│   ├── strapi.ts          # 数据层核心（Strapi/Mock 降级）
│   ├── strapi-types.ts    # TypeScript 类型定义
│   ├── mock-data.ts       # Mock 数据（TypeScript）
│   └── i18n/              # 国际化工具
│       ├── config.ts      # 语言配置
│       ├── dictionaries.ts # UI 翻译
│       └── navigation.ts  # 链接本地化
├── cms/                   # Strapi v5 CMS 实例
│   └── src/
│       ├── api/           # 内容类型 Schemas
│       └── components/    # 组件 Schemas
├── scripts/
│   ├── seed-strapi.js     # Strapi 数据填充脚本
│   ├── export-strapi.js   # 内容导出脚本
│   └── seed-data/         # Seed 数据源
└── tests/                 # 测试文件

```

## 🎯 核心概念

### "CMS 即代码" 理念

- ✅ 所有 Strapi Schema 通过 JSON 文件管理（`cms/src/`）
- ✅ 永远不要通过 Strapi Admin UI 修改 Schema
- ✅ 内容通过 `export-strapi.js` 导出到代码仓库
- ✅ 迁移环境时通过 `seed-strapi.js` 导入内容

### 优雅降级策略

```
数据请求 → Strapi API
              ↓ (失败)
           Mock 数据 ✓
```

应用可以完全脱离 Strapi 运行，适合：
- 前端独立开发
- CI/CD 测试
- 演示环境

## 🌍 国际化

### 支持的语言

- **zh** - 简体中文（默认）
- **en** - English

### 添加新翻译

1. 在 `lib/i18n/dictionaries.ts` 中添加翻译键值
2. 组件中使用 `dictionary.yourKey`
3. 永远不要在组件中硬编码文本

### 路由结构

- `/` - 重定向到 `/zh`
- `/zh/*` - 中文页面
- `/en/*` - 英文页面

## 🧱 动态区块系统

### 可用区块类型

| 区块组件 | Schema ID | 用途 |
|---------|-----------|------|
| Hero | `hero.hero` | 页面头部 Hero 区块 |
| FeatureGrid | `sections.feature-grid` | 特性卡片网格 |
| StatGroup | `sections.stat-group` | 数据指标展示 |
| BulletList | `sections.bullet-list` | 能力列表 |
| TechFlow | `sections.tech-flow` | 技术流程步骤 |
| BeforeAfter | `sections.before-after` | 前后对比 |
| CaseShowcase | `sections.case-showcase` | 案例展示 |
| PostList | `sections.post-list` | 文章列表 |
| CtaBanner | `sections.cta-banner` | 行动号召横幅 |
| MediaBlock | `content.media-block` | 图文混排区块 |

### 添加新区块

1. 在 `cms/src/components/` 中创建 Schema JSON
2. 在 `lib/strapi-types.ts` 中添加 TypeScript 类型
3. 在 `components/blocks/` 中创建组件
4. 在 `components/blocks/renderer.tsx` 中注册
5. 在 `lib/mock-data.ts` 中同步示例数据

## 📊 数据管理

### 内容类型

- **Page** - 页面（带动态区块）
- **Solution** - 解决方案
- **Case Study** - 客户案例
- **Article** - 博客文章
- **Resource** - 资源下载
- **Site Setting** - 全局设置

### 内容工作流

#### 1. 在 Strapi 中编辑内容
```bash
cd cms
npm run develop
# 访问 http://localhost:1337/admin
```

#### 2. 导出内容到代码仓库
```bash
npm run export:strapi
# 或导出特定类型
npm run export:pages
npm run export:solutions
```

#### 3. 提交到 Git
```bash
git add scripts/seed-data/
git commit -m "chore: Update content from Strapi"
git push
```

#### 4. 在其他环境中同步
```bash
git pull
npm run seed:strapi
```

## 🧪 测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- tests/lib/strapi.test.ts

# 生成覆盖率报告
npm test -- --coverage
```

当前测试覆盖：
- ✅ 数据层（lib/strapi.ts）- 23 tests
- ✅ 国际化（lib/i18n/navigation.ts）- 8 tests

## 🔧 常用命令

### 开发

```bash
npm run dev              # 启动开发服务器
npm run build            # 构建生产版本
npm run start            # 启动生产服务器
npm run lint             # 代码检查
npm test                 # 运行测试
```

### Strapi 管理

```bash
npm run seed:strapi      # 填充所有内容
npm run seed:pages       # 仅填充页面
npm run seed:solutions   # 仅填充解决方案
npm run seed:cases       # 仅填充案例
npm run seed:articles    # 仅填充文章
npm run seed:resources   # 仅填充资源
npm run clear:strapi     # 清空所有数据
npm run export:strapi    # 导出内容到 seed 文件
```

## 🔒 安全特性

- ✅ HTML 内容自动消毒（DOMPurify）
- ✅ 图片域名白名单限制
- ✅ 环境变量保护（不提交 `.env` 文件）
- ✅ TypeScript 严格模式
- ✅ Next.js 内置 CSRF 防护

## 📚 技术栈

- **前端框架**: Next.js 14 (App Router)
- **UI 框架**: React 18
- **样式**: Tailwind CSS 3
- **CMS**: Strapi v5.26.x
- **语言**: TypeScript 5
- **测试**: Vitest 3
- **包管理**: npm

## 🤝 贡献指南

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 遵循 TypeScript 严格模式
- 所有新功能需要添加测试
- 提交信息遵循 Conventional Commits
- 永远不要硬编码文本，使用 i18n 字典

## 📖 文档

- [CLAUDE.md](./CLAUDE.md) - Claude Code 开发指南（中文）
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 部署指南
- [scripts/SEED_V2_GUIDE.md](./scripts/SEED_V2_GUIDE.md) - Seed 系统 v2 使用指南
- [scripts/EXPORT_GUIDE.md](./scripts/EXPORT_GUIDE.md) - 内容导出详细说明

## ❓ 常见问题

### Q: 为什么我的更改没有生效？
A: 检查是否在开发模式下（`npm run dev`）。生产模式有缓存，需要重新构建。

### Q: 如何添加新的语言？
A: 在 `lib/i18n/config.ts` 中添加新语言代码，然后在 `dictionaries.ts` 中添加翻译。

### Q: Strapi 连接失败怎么办？
A: 应用会自动降级到 Mock 数据。检查 `.env.local` 中的 `STRAPI_API_URL` 和 `STRAPI_API_TOKEN` 是否正确。

### Q: 如何重置 Strapi 数据？
A: 运行 `npm run clear:strapi` 清空数据，然后 `npm run seed:strapi` 重新填充。

## 📄 License

本项目采用 MIT 许可证。详见 [LICENSE](./LICENSE) 文件。

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Strapi](https://strapi.io/) - 无头 CMS
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vitest](https://vitest.dev/) - 测试框架

---

**注意**: 这是一个模板项目，请根据实际需求调整内容和配置。
