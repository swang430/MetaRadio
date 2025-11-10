# MetaRadio 网站部署指南

本文档为技术团队提供完整的 MetaRadio 前后端系统部署指导，适用于 SaaS 平台（Vercel、Railway、AWS 等）部署场景。

---

## 目录

1. [架构概述](#架构概述)
2. [技术栈](#技术栈)
3. [部署前准备](#部署前准备)
4. [Strapi 后端部署](#strapi-后端部署)
5. [Next.js 前端部署](#nextjs-前端部署)
6. [内容初始化](#内容初始化)
7. [域名与 SSL 配置](#域名与-ssl-配置)
8. [持续部署流程](#持续部署流程)
9. [监控与维护](#监控与维护)
10. [故障排查](#故障排查)

---

## 架构概述

### 系统组成

```
┌─────────────────┐         ┌─────────────────┐
│   Next.js 前端   │◄────────│   用户浏览器     │
│  (Vercel/CDN)   │         │                 │
└────────┬────────┘         └─────────────────┘
         │
         │ REST API
         │
┌────────▼────────┐         ┌─────────────────┐
│   Strapi CMS    │◄────────│   内容管理员     │
│ (Railway/AWS)   │         │   (Admin Panel)  │
└────────┬────────┘         └─────────────────┘
         │
         ▼
┌─────────────────┐
│  PostgreSQL DB  │
│   (托管数据库)   │
└─────────────────┘
```

### 关键特性

- **双栈架构**：Strapi CMS 主用，Mock 数据降级（开发环境无需 Strapi）
- **多语言支持**：中文（zh）/英文（en）双语内容，共享 documentId
- **动态区块系统**：Strapi Dynamic Zones 映射到 React 组件
- **ISR 增量静态再生**：120 秒缓存刷新周期
- **CMS as Code**：所有 Schema 定义在代码中，版本可控

---

## 技术栈

### 前端
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3+
- **Styling**: Tailwind CSS 3.4
- **i18n**: 基于 URL 路由的国际化 (`/[locale]/...`)
- **Image Optimization**: Next.js Image Component

### 后端
- **CMS**: Strapi v5.26.x
- **Database**: PostgreSQL 14+ (生产) / SQLite (开发)
- **Node.js**: v20.x LTS
- **ORM**: Strapi 内置（基于 Knex.js）

### 推荐 SaaS 平台

| 组件 | 推荐平台 | 备选方案 |
|------|---------|---------|
| **前端** | Vercel | Netlify, AWS Amplify |
| **后端** | Railway | Render, DigitalOcean App Platform |
| **数据库** | Railway PostgreSQL | Supabase, AWS RDS |
| **媒体存储** | Cloudinary | AWS S3, UploadThing |

---

## 部署前准备

### 1. 代码仓库准备

确保代码库包含以下关键文件：

```bash
metaradio/
├── .env.example              # 环境变量模板
├── package.json              # 项目依赖
├── next.config.js            # Next.js 配置
├── cms/                      # Strapi 实例
│   ├── package.json
│   └── config/
│       └── database.ts       # 数据库配置
└── scripts/
    ├── seed-strapi-v2.js     # 内容初始化脚本
    └── seed-data/            # 种子数据
```

### 2. 环境变量清单

**前端 (Next.js)**
```env
# .env.local (或 Vercel 环境变量面板)
STRAPI_API_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=your_api_token_here
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
REVALIDATE_SECONDS=120
```

**后端 (Strapi)**
```env
# cms/.env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4  # 至少 4 个随机字符串
API_TOKEN_SALT=random_string
ADMIN_JWT_SECRET=random_string
TRANSFER_TOKEN_SALT=random_string
JWT_SECRET=random_string

# 数据库配置（PostgreSQL）
DATABASE_CLIENT=postgres
DATABASE_HOST=your-db-host.railway.app
DATABASE_PORT=5432
DATABASE_NAME=railway
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_db_password
DATABASE_SSL=true

# 媒体存储（推荐使用云存储）
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. 生成安全密钥

使用 Node.js 生成随机密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

为以下变量各生成一个密钥：
- `APP_KEYS` (需要 4 个，逗号分隔)
- `API_TOKEN_SALT`
- `ADMIN_JWT_SECRET`
- `TRANSFER_TOKEN_SALT`
- `JWT_SECRET`

---

## Strapi 后端部署

### 方案 A: Railway 部署（推荐）

#### 步骤 1: 创建 PostgreSQL 数据库

1. 登录 [Railway.app](https://railway.app)
2. 创建新项目 → 选择 "Provision PostgreSQL"
3. 记录连接信息（Host, Port, User, Password, Database）

#### 步骤 2: 部署 Strapi 应用

1. Railway 项目中点击 "New Service" → "GitHub Repo"
2. 选择 `metaradio` 仓库
3. 配置构建设置：
   ```
   Root Directory: cms
   Build Command: npm install && npm run build
   Start Command: npm run start
   ```

4. 设置环境变量（Settings → Variables）：
   ```env
   NODE_VERSION=20.11.0
   HOST=0.0.0.0
   PORT=1337
   APP_KEYS=<生成的密钥1>,<生成的密钥2>,<生成的密钥3>,<生成的密钥4>
   API_TOKEN_SALT=<生成的密钥>
   ADMIN_JWT_SECRET=<生成的密钥>
   TRANSFER_TOKEN_SALT=<生成的密钥>
   JWT_SECRET=<生成的密钥>
   DATABASE_CLIENT=postgres
   DATABASE_HOST=${{Postgres.PGHOST}}
   DATABASE_PORT=${{Postgres.PGPORT}}
   DATABASE_NAME=${{Postgres.PGDATABASE}}
   DATABASE_USERNAME=${{Postgres.PGUSER}}
   DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
   DATABASE_SSL=true
   ```

   **注意**：`${{Postgres.PGHOST}}` 等变量会自动引用数据库服务的连接信息。

5. 点击 "Deploy" 等待构建完成

#### 步骤 3: 配置域名

1. Railway 项目 → Settings → Public Networking
2. 点击 "Generate Domain" 获取 `xxx.railway.app` 域名
3. （可选）添加自定义域名：
   - 点击 "Custom Domain"
   - 输入域名（如 `cms.metaradio.tech`）
   - 在 DNS 提供商添加 CNAME 记录：
     ```
     cms.metaradio.tech → xxx.railway.app
     ```

#### 步骤 4: 创建管理员账户

部署成功后：

1. 访问 `https://your-strapi-domain.com/admin`
2. 首次访问会提示创建管理员账户
3. 填写信息并记录凭证（**保存到安全位置**）

#### 步骤 5: 生成 API Token

1. 登录 Strapi Admin Panel
2. Settings → API Tokens → Create new API Token
3. 配置：
   - Name: `Frontend Access`
   - Token type: `Read-Only` (推荐) 或 `Full Access`
   - Token duration: `Unlimited`
4. 复制生成的 Token（**只显示一次！**）

### 方案 B: Docker 部署

如果团队使用 AWS ECS、DigitalOcean 等容器平台，可使用 Docker：

**cms/Dockerfile**
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "start"]
```

**docker-compose.yml** (本地测试用)
```yaml
version: '3.8'

services:
  strapi:
    build: ./cms
    ports:
      - '1337:1337'
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: db
      DATABASE_PORT: 5432
      DATABASE_NAME: strapi
      DATABASE_USERNAME: strapi
      DATABASE_PASSWORD: strapi
      DATABASE_SSL: false
    volumes:
      - ./cms/public/uploads:/app/public/uploads
    depends_on:
      - db

  db:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: strapi
      POSTGRES_USER: strapi
      POSTGRES_PASSWORD: strapi
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

---

## Next.js 前端部署

### 方案 A: Vercel 部署（推荐）

#### 步骤 1: 连接 GitHub 仓库

1. 登录 [Vercel](https://vercel.com)
2. New Project → Import Git Repository
3. 选择 `metaradio` 仓库

#### 步骤 2: 配置项目设置

**Framework Preset**: Next.js
**Root Directory**: `.` (项目根目录)
**Build Command**: `npm run build`
**Output Directory**: `.next` (自动检测)
**Install Command**: `npm install`

#### 步骤 3: 设置环境变量

在 Vercel 项目 → Settings → Environment Variables 添加：

```env
STRAPI_API_URL=https://your-strapi-domain.com
STRAPI_API_TOKEN=<步骤5生成的Token>
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-domain.com
REVALIDATE_SECONDS=120
```

**重要**：
- `STRAPI_API_URL` 和 `STRAPI_API_TOKEN` 仅服务端可见（SSR/ISR）
- `NEXT_PUBLIC_STRAPI_URL` 会暴露到客户端（用于图片 URL）
- 为 Production / Preview / Development 环境分别配置

#### 步骤 4: 部署

1. 点击 "Deploy" 开始首次部署
2. 等待构建完成（约 2-5 分钟）
3. 访问生成的 URL（如 `metaradio.vercel.app`）验证网站

#### 步骤 5: 配置自定义域名

1. Vercel 项目 → Settings → Domains
2. 添加域名（如 `metaradio.tech`）
3. 在 DNS 提供商配置：
   ```
   A Record:  metaradio.tech → 76.76.21.21
   CNAME:     www.metaradio.tech → cname.vercel-dns.com
   ```
4. 等待 SSL 证书自动生成（几分钟内完成）

### 方案 B: 其他平台部署

**Netlify**
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

**AWS Amplify**
```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

---

## 内容初始化

### 前提条件

- Strapi 后端已成功部署并可访问
- 已创建管理员账户
- 已生成并保存 API Token

### 方法 1: 本地执行 Seed（推荐）

#### 步骤 1: 准备本地环境

```bash
# 克隆代码仓库
git clone https://github.com/your-org/metaradio.git
cd metaradio

# 切换到 Node 20
nvm use 20

# 安装依赖
npm install
cd cms && npm install && cd ..
```

#### 步骤 2: 配置环境变量

创建 `cms/.env` 文件：

```env
STRAPI_API_URL=https://your-production-strapi-domain.com
STRAPI_API_TOKEN=<生产环境 API Token>
```

#### 步骤 3: 执行内容初始化

```bash
# 初始化所有内容（页面、解决方案、案例、文章、资源）
npm run seed:strapi

# 或分批执行（推荐，便于排查问题）
npm run seed:pages      # 8 个页面
npm run seed:solutions  # 8 个解决方案
npm run seed:cases      # 8 个案例研究
npm run seed:articles   # 8 篇文章
npm run seed:resources  # 6 个资源
```

#### 步骤 4: 验证内容

1. 登录 Strapi Admin: `https://your-strapi-domain.com/admin`
2. 检查 Content Manager：
   - **Pages**: 应看到 8 条记录（每条有中/英两个语言版本）
   - **Solutions**: 8 条记录
   - **Case Studies**: 8 条记录
   - **Articles**: 8 条记录
   - **Resources**: 6 条记录

3. 检查多语言：
   - 点击任一内容条目
   - 右上角应显示"EN | ZH"切换按钮
   - 两个语言版本应共享同一 documentId

#### 步骤 5: 验证前端显示

访问前端网站，确认页面内容已正确加载：

```
https://metaradio.tech/zh              # 首页（中文）
https://metaradio.tech/en              # 首页（英文）
https://metaradio.tech/zh/marketing/solutions  # 解决方案列表
https://metaradio.tech/en/marketing/cases      # 案例研究列表
```

### 方法 2: CI/CD 自动化 Seed

在 GitHub Actions 中添加部署后自动 Seed：

**.github/workflows/deploy.yml**
```yaml
name: Deploy and Seed

on:
  push:
    branches: [main]

jobs:
  deploy-strapi:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: |
          npm install
          cd cms && npm install

      - name: Run seed script
        env:
          STRAPI_API_URL: ${{ secrets.STRAPI_API_URL }}
          STRAPI_API_TOKEN: ${{ secrets.STRAPI_API_TOKEN }}
        run: npm run seed:strapi
```

### 内容更新流程

**场景 1: 添加新内容**

1. 在 Strapi Admin Panel 中直接创建（推荐日常运营）
2. 或修改 `scripts/seed-data/` 中的数据文件，重新运行 seed

**场景 2: 修改现有内容**

- Strapi 中直接编辑即可（内容管理员操作）
- 前端会在 120 秒后自动刷新（ISR 机制）

**场景 3: 导出内容到代码仓库（版本控制）**

在 Strapi Admin Panel 中编辑内容后，将内容导出保存到 Git：

```bash
# 1. 导出所有内容
npm run export:strapi

# 或导出特定类型
npm run export:pages
npm run export:solutions

# 2. 查看变更
git diff scripts/seed-data/

# 3. 提交到仓库
git add scripts/seed-data/
git commit -m "chore: Update content from Strapi"
git push
```

**用途**：
- 版本控制：内容变更可追溯和回滚
- 环境迁移：将生产环境内容同步到开发/测试环境
- 团队协作：内容编辑通过 PR 流程审查
- 备份恢复：自动备份为 `.backup-*.js` 文件

**注意事项**：
- 导出前确保 `cms/.env` 中配置了 `STRAPI_API_TOKEN`
- API Token 需要至少 Read-Only 权限
- 导出会自动备份旧文件
- 详见 `scripts/EXPORT_GUIDE.md`

**场景 4: 添加新 Schema 字段**

1. 修改 `cms/src/api/` 或 `cms/src/components/` 中的 JSON Schema
2. 重启 Strapi 使 Schema 生效
3. 更新 `lib/strapi-types.ts` 中的 TypeScript 类型
4. 更新对应组件以显示新字段
5. 更新 seed 数据和脚本

---

## 域名与 SSL 配置

### 域名结构建议

```
metaradio.tech              → 前端 (Vercel)
www.metaradio.tech          → 前端 (Vercel)
cms.metaradio.tech          → Strapi 后端 (Railway)
cdn.metaradio.tech          → 媒体 CDN (可选，Cloudinary)
```

### DNS 配置示例

假设使用 Cloudflare DNS：

```
# 前端
A      metaradio.tech          → 76.76.21.21 (Vercel)
CNAME  www.metaradio.tech      → cname.vercel-dns.com

# 后端
CNAME  cms.metaradio.tech      → production-metaradio-xxx.railway.app

# 媒体存储（如使用 Cloudinary）
CNAME  cdn.metaradio.tech      → res.cloudinary.com
```

### SSL 证书

- **Vercel**: 自动提供并续期 Let's Encrypt 证书
- **Railway**: 自动提供 SSL（custom domain 需手动添加）
- **其他平台**: 参考平台文档配置 SSL

### CORS 配置

在 Strapi 中配置跨域请求：

**cms/config/middlewares.ts**
```typescript
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com', // 如使用 Cloudinary
          ],
          'media-src': ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'https://metaradio.tech',
        'https://www.metaradio.tech',
        'http://localhost:3000', // 开发环境
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization'],
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

---

## 持续部署流程

### Git 工作流

```
main (production)    → Vercel 自动部署到生产环境
  ├─ develop         → Vercel Preview 部署
  └─ feature/*       → Vercel Preview 部署
```

### 自动部署触发

**Vercel (前端)**
- Push 到 `main` → 部署到生产环境
- Pull Request → 创建 Preview 部署，生成唯一 URL

**Railway (后端)**
- Push 到 `main` → 自动重新构建部署
- 或使用 Railway CLI 手动触发：
  ```bash
  railway up
  ```

### 回滚策略

**前端 (Vercel)**
1. Vercel Dashboard → Deployments
2. 找到之前的成功部署
3. 点击 "Promote to Production"

**后端 (Railway)**
1. Railway Dashboard → Deployments
2. 点击之前的部署版本
3. 点击 "Redeploy"

### 数据库备份

**Railway PostgreSQL**
```bash
# 手动备份
pg_dump -h your-db-host.railway.app \
        -U postgres \
        -d railway \
        -f backup-$(date +%Y%m%d).sql

# 恢复备份
psql -h your-db-host.railway.app \
     -U postgres \
     -d railway \
     -f backup-20240115.sql
```

**自动备份建议**
- Railway Pro 计划提供自动备份功能
- 或使用 GitHub Actions 定期备份：

```yaml
name: DB Backup

on:
  schedule:
    - cron: '0 2 * * *'  # 每天凌晨 2 点

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Backup Database
        run: |
          pg_dump ${{ secrets.DATABASE_URL }} > backup.sql

      - name: Upload to S3
        uses: aws-actions/configure-aws-credentials@v1
        # ... S3 上传配置
```

---

## 监控与维护

### 性能监控

**Vercel Analytics**
- 自动启用（Vercel Pro 计划）
- 监控指标：TTFB, FCP, LCP, CLS

**Railway Metrics**
- CPU/Memory 使用率
- 请求响应时间
- 错误率

### 日志查看

**Vercel 日志**
```bash
vercel logs [deployment-url]
```

**Railway 日志**
- Railway Dashboard → Service → Logs
- 或使用 CLI：
  ```bash
  railway logs
  ```

### Uptime 监控

推荐工具：
- **UptimeRobot**: 免费，5 分钟检测间隔
- **Pingdom**: 详细性能报告
- **Better Stack**: 现代化监控面板

配置检测：
```
前端: https://metaradio.tech
后端: https://cms.metaradio.tech/_health
```

### 安全更新

**依赖更新**
```bash
# 每月检查一次
npm outdated

# 更新依赖
npm update

# 更新 Strapi
cd cms
npm update @strapi/strapi @strapi/plugin-*
```

**Strapi 安全设置**
1. 定期更换 API Tokens（每 90 天）
2. 启用 2FA（Settings → Users → Two-Factor Authentication）
3. 限制 Admin Panel IP（生产环境使用 VPN）

---

## 故障排查

### 问题 1: 前端显示 "Failed to fetch data"

**原因**: Strapi API 不可访问或 Token 无效

**排查步骤**:
1. 检查 Vercel 环境变量 `STRAPI_API_URL` 是否正确
2. 验证 `STRAPI_API_TOKEN` 是否有效（在 Strapi Admin 重新生成）
3. 测试 API 连接：
   ```bash
   curl -H "Authorization: Bearer YOUR_TOKEN" \
        https://cms.metaradio.tech/api/pages?locale=zh
   ```
4. 检查 Strapi CORS 配置是否允许前端域名

**解决方案**:
- 如 Strapi 不可用，前端会自动降级到 Mock 数据（检查 `datasource.log`）
- 重新部署 Vercel 使环境变量生效

### 问题 2: Strapi Admin Panel 无法访问

**原因**: 数据库连接失败或内存不足

**排查步骤**:
1. Railway 检查服务状态（Dashboard → Service）
2. 查看日志寻找错误信息：
   ```
   Error: connect ECONNREFUSED
   → 数据库连接失败

   Error: JavaScript heap out of memory
   → 内存不足，需升级 Railway 计划
   ```
3. 测试数据库连接：
   ```bash
   psql $DATABASE_URL -c "SELECT version();"
   ```

**解决方案**:
- 重启 Strapi 服务（Railway Dashboard → Restart）
- 检查数据库连接字符串和凭证
- 升级 Railway 计划（推荐 $5/月 Pro 计划）

### 问题 3: 图片无法显示

**原因**: 图片 URL 配置错误或存储服务不可用

**排查步骤**:
1. 检查浏览器控制台图片请求 URL
2. 验证 `NEXT_PUBLIC_STRAPI_URL` 是否正确
3. 如使用 Cloudinary，检查环境变量配置

**解决方案**:
- 确保 Next.js `next.config.js` 中 `images.domains` 包含图片域名：
  ```javascript
  images: {
    domains: ['cms.metaradio.tech', 'res.cloudinary.com'],
  }
  ```
- 重新上传图片到正确的存储服务

### 问题 4: 多语言内容丢失

**原因**: Seed 时未正确共享 documentId

**排查步骤**:
1. Strapi Admin 检查内容是否有语言切换按钮
2. 查看数据库：
   ```sql
   SELECT document_id, locale, title FROM pages;
   ```
3. 同一内容的不同语言版本应有相同 document_id

**解决方案**:
- 删除错误内容：`npm run clear:strapi`
- 重新执行 seed：`npm run seed:strapi`
- 确保使用最新版本的 `seed-strapi-v2.js`

### 问题 5: 部署时 Node.js 版本错误

**错误信息**:
```
Error: The module 'better_sqlite3.node' was compiled against
a different Node.js version using NODE_MODULE_VERSION 115
```

**解决方案**:
- 确保部署平台使用 Node.js 20：
  ```env
  # Railway / Render
  NODE_VERSION=20.11.0

  # Vercel (在 package.json 中指定)
  "engines": {
    "node": ">=20.0.0"
  }
  ```
- 重新构建部署

### 问题 6: ISR 缓存未更新

**原因**: Vercel ISR 缓存未在预期时间刷新

**排查步骤**:
1. 检查 `REVALIDATE_SECONDS` 环境变量（默认 120 秒）
2. 在 Strapi 更新内容后等待缓存过期时间

**解决方案**:
- 手动触发重新验证（需在代码中添加 API Route）：
  ```bash
  curl -X POST https://metaradio.tech/api/revalidate?secret=YOUR_SECRET
  ```
- 或降低 `REVALIDATE_SECONDS` 值（会增加 Strapi 负载）
- 清除 Vercel 缓存：Dashboard → Deployments → ... → Clear Cache

---

## 附录

### A. 环境变量完整清单

**前端 (Vercel)**
| 变量名 | 示例值 | 说明 |
|-------|--------|------|
| `STRAPI_API_URL` | `https://cms.metaradio.tech` | Strapi API 地址 |
| `STRAPI_API_TOKEN` | `abc123...` | Strapi API Token |
| `NEXT_PUBLIC_STRAPI_URL` | `https://cms.metaradio.tech` | 客户端可见的 Strapi 地址 |
| `REVALIDATE_SECONDS` | `120` | ISR 缓存时间（秒） |

**后端 (Railway)**
| 变量名 | 示例值 | 说明 |
|-------|--------|------|
| `NODE_VERSION` | `20.11.0` | Node.js 版本 |
| `HOST` | `0.0.0.0` | 服务监听地址 |
| `PORT` | `1337` | 服务端口 |
| `APP_KEYS` | `key1,key2,key3,key4` | 加密密钥（4 个） |
| `API_TOKEN_SALT` | `random_string` | API Token 加盐 |
| `ADMIN_JWT_SECRET` | `random_string` | Admin JWT 密钥 |
| `TRANSFER_TOKEN_SALT` | `random_string` | 传输 Token 加盐 |
| `JWT_SECRET` | `random_string` | JWT 密钥 |
| `DATABASE_CLIENT` | `postgres` | 数据库类型 |
| `DATABASE_HOST` | `xxx.railway.app` | 数据库主机 |
| `DATABASE_PORT` | `5432` | 数据库端口 |
| `DATABASE_NAME` | `railway` | 数据库名称 |
| `DATABASE_USERNAME` | `postgres` | 数据库用户名 |
| `DATABASE_PASSWORD` | `xxxxx` | 数据库密码 |
| `DATABASE_SSL` | `true` | 启用 SSL |

### B. 常用命令速查

```bash
# 本地开发
npm run dev              # 启动 Next.js 开发服务器
cd cms && npm run develop # 启动 Strapi 开发模式

# 构建
npm run build            # 构建 Next.js
cd cms && npm run build   # 构建 Strapi

# 测试
npm run test             # 运行单元测试
npm run lint             # 代码检查

# 内容管理
npm run seed:strapi      # 初始化所有内容
npm run seed:pages       # 仅初始化页面
npm run clear:strapi     # 清空 Strapi 内容
npm run export:strapi    # 导出所有内容到 seed 文件
npm run export:pages     # 仅导出页面

# 部署
vercel                   # 部署到 Vercel
vercel --prod            # 部署到生产环境
railway up               # 部署到 Railway
```

### C. 支持联系方式

如遇到本文档未涵盖的问题，请联系：

- **技术负责人**: [您的邮箱]
- **文档仓库**: https://github.com/your-org/metaradio
- **Strapi 官方文档**: https://docs.strapi.io/
- **Next.js 官方文档**: https://nextjs.org/docs
- **Vercel 文档**: https://vercel.com/docs
- **Railway 文档**: https://docs.railway.app/

---

**文档版本**: v1.0
**最后更新**: 2024-01-15
**维护者**: MetaRadio 技术团队
