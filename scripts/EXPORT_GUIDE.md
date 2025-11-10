# Strapi 内容导出指南

## 功能说明

`export-strapi.js` 脚本用于从 Strapi 后台导出已编辑的内容，并保存为 seed 数据格式。这样可以：

✅ **版本控制**：将 Strapi 中的内容变更纳入 Git 管理
✅ **环境迁移**：轻松将生产环境内容同步到开发/测试环境
✅ **备份恢复**：自动备份旧文件，支持快速回滚
✅ **团队协作**：内容编辑可以提交到代码仓库供团队审查

---

## 使用方法

### 1. 导出所有内容

```bash
npm run export:strapi
```

这会导出所有内容类型（pages, solutions, cases, articles, resources）。

### 2. 导出指定内容类型

```bash
npm run export:pages       # 仅导出页面
npm run export:solutions   # 仅导出解决方案
npm run export:cases       # 仅导出案例研究
npm run export:articles    # 仅导出文章
npm run export:resources   # 仅导出资源
```

---

## 工作流程示例

### 场景 1：内容管理员在 Strapi 中编辑内容

**步骤：**

1. **在 Strapi Admin Panel 编辑内容**
   - 登录 `https://cms.metaradio.tech/admin`
   - 修改文章、更新案例研究、调整页面布局等

2. **本地导出内容**
   ```bash
   # 确保已配置环境变量（cms/.env）
   npm run export:strapi
   ```

3. **检查生成的文件**
   ```bash
   # 查看修改内容
   git diff scripts/seed-data/
   ```

4. **提交到 Git**
   ```bash
   git add scripts/seed-data/
   git commit -m "chore: Update content from Strapi"
   git push
   ```

5. **其他环境同步**（可选）
   ```bash
   # 在开发环境或其他部署环境拉取最新代码
   git pull

   # 重新 seed
   npm run seed:strapi
   ```

---

### 场景 2：将生产环境内容同步到开发环境

**步骤：**

1. **从生产环境导出**
   ```bash
   # 在本地配置生产环境的 Strapi 连接
   # cms/.env
   STRAPI_API_URL=https://cms.metaradio.tech
   STRAPI_API_TOKEN=production_token_here

   # 导出
   npm run export:strapi
   ```

2. **切换到开发环境 Strapi**
   ```bash
   # 修改 cms/.env 为本地 Strapi
   STRAPI_API_URL=http://localhost:1337
   STRAPI_API_TOKEN=local_token_here

   # 导入内容
   npm run seed:strapi
   ```

3. **验证**
   - 访问 `http://localhost:1337/admin` 检查内容是否正确导入

---

### 场景 3：回滚错误的内容修改

如果导出的内容有问题，可以使用自动备份的文件：

```bash
# 查看备份文件
ls scripts/seed-data/*.backup-*.js

# 恢复备份（例如恢复 pages.js）
cp scripts/seed-data/pages.backup-1705312345678.js \
   scripts/seed-data/pages.js

# 重新 seed
npm run seed:pages
```

---

## 配置要求

### 环境变量

在 `cms/.env` 中配置：

```env
# Strapi 服务器地址
STRAPI_API_URL=https://cms.metaradio.tech

# API Token（从 Strapi Admin → Settings → API Tokens 生成）
STRAPI_API_TOKEN=your_api_token_here
```

### API Token 权限

推荐配置：
- **类型**：Read-Only（仅导出）或 Full Access（导出+导入）
- **有效期**：Unlimited
- **名称**：Content Export

---

## 输出文件说明

### 文件位置

导出的文件会覆盖 `scripts/seed-data/` 目录下的对应文件：

```
scripts/seed-data/
├── pages.js          # 页面内容
├── solutions.js      # 解决方案
├── cases.js          # 案例研究
├── articles.js       # 文章
├── resources.js      # 资源
└── *.backup-*.js     # 自动备份文件
```

### 文件格式

生成的文件格式与原 seed 数据一致：

```javascript
/**
 * Pages 种子数据
 *
 * 🤖 此文件由 export-strapi.js 自动生成
 * 📅 生成时间: 2024-01-15T10:30:00.000Z
 */

module.exports = [
  {
    slug: 'home',
    locales: {
      zh: {
        title: '首页',
        blocks: [
          { __component: 'hero.hero', headline: '...', ... },
          // ...
        ],
      },
      en: {
        title: 'Home',
        blocks: [
          { __component: 'hero.hero', headline: '...', ... },
          // ...
        ],
      },
    },
  },
  // ...
];
```

### 自动备份

每次导出时，脚本会自动备份旧文件：

```
pages.backup-1705312345678.js  # 时间戳：2024-01-15 10:30:45
```

可以安全删除旧备份文件，或保留用于回滚。

---

## 数据处理说明

### 自动清理

导出脚本会自动清理以下 Strapi 元数据：

- ✂️ `createdAt` / `updatedAt` / `publishedAt`
- ✂️ `createdBy` / `updatedBy`
- ✂️ `locale` / `localizations`（顶层）
- ✂️ `id` / `documentId`（自动生成）

这样生成的 seed 数据更简洁，适合版本控制。

### 多语言合并

脚本会自动将同一内容的多个语言版本合并为一个对象：

**Strapi 原始数据：**
```json
[
  { "id": 1, "slug": "home", "locale": "zh", "title": "首页" },
  { "id": 2, "slug": "home", "locale": "en", "title": "Home" }
]
```

**导出后：**
```javascript
{
  slug: 'home',
  locales: {
    zh: { title: '首页' },
    en: { title: 'Home' }
  }
}
```

---

## 常见问题

### Q1: 导出时提示 "STRAPI_API_TOKEN 未设置"

**解决方法：**
```bash
# 方法 1: 在 cms/.env 中配置
echo "STRAPI_API_TOKEN=your_token" >> cms/.env

# 方法 2: 临时设置环境变量
export STRAPI_API_TOKEN=your_token
npm run export:strapi
```

### Q2: 导出的文件为空或数据不完整

**可能原因：**
1. API Token 权限不足（需要至少 Read-Only 权限）
2. Strapi 中确实没有该类型的内容
3. 内容未发布（Strapi 只导出已发布的内容）

**排查方法：**
```bash
# 测试 API 连接
curl -H "Authorization: Bearer YOUR_TOKEN" \
     https://cms.metaradio.tech/api/pages?locale=zh
```

### Q3: 导出后 seed 失败

**可能原因：**
- 数据结构与 Strapi Schema 不匹配
- 缺少必填字段

**解决方法：**
1. 检查导出的 `.js` 文件格式是否正确
2. 对比 Strapi Schema (`cms/src/api/`) 和导出的数据
3. 手动调整导出文件或在 Strapi 中补充缺失字段后重新导出

### Q4: 如何导出特定 slug 的内容？

脚本目前不支持按 slug 过滤，但可以手动修改导出文件：

```bash
# 导出所有内容
npm run export:pages

# 手动编辑 scripts/seed-data/pages.js，删除不需要的条目
```

---

## 高级用法

### 定时自动导出（CI/CD）

在 GitHub Actions 中配置定时导出：

```yaml
# .github/workflows/export-content.yml
name: Export Strapi Content

on:
  schedule:
    - cron: '0 2 * * 1'  # 每周一凌晨 2 点

jobs:
  export:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Export content
        env:
          STRAPI_API_URL: ${{ secrets.STRAPI_API_URL }}
          STRAPI_API_TOKEN: ${{ secrets.STRAPI_API_TOKEN }}
        run: npm run export:strapi

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v5
        with:
          commit-message: 'chore: Auto-export Strapi content'
          title: 'Update content from Strapi'
          branch: auto-export-content
```

### 导出到不同目录

修改 `scripts/export-strapi.js` 中的路径配置：

```javascript
const CONTENT_TYPES = {
  pages: {
    uid: 'api::page.page',
    path: './backup/seed-data/pages.js',  // 自定义路径
    endpoint: '/api/pages',
  },
  // ...
};
```

---

## 最佳实践

1. **定期导出**：建议每次内容编辑后导出并提交到 Git
2. **Code Review**：将内容变更纳入 PR 流程，团队审查
3. **环境隔离**：生产/开发环境使用不同的 API Token
4. **备份保留**：定期清理旧备份文件，避免占用过多空间
5. **文档同步**：在 seed 数据文件头部添加注释说明修改原因

---

## 相关命令

| 命令 | 说明 |
|------|------|
| `npm run export:strapi` | 导出所有内容 |
| `npm run seed:strapi` | 导入所有内容到 Strapi |
| `npm run clear:strapi` | 清空 Strapi 所有内容 |
| `npm run export:pages` | 仅导出页面 |
| `npm run seed:pages` | 仅导入页面 |

**完整工作流：**
```bash
# 1. 从生产环境导出
npm run export:strapi

# 2. 提交到 Git
git add scripts/seed-data/
git commit -m "chore: Update content"
git push

# 3. 在其他环境导入
npm run seed:strapi
```

---

**文档版本**: v1.0
**最后更新**: 2024-01-15
**维护者**: MetaRadio 技术团队
