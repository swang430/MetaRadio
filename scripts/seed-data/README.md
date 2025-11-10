# Strapi 种子数据管理

## 目录结构

```
seed-data/
├── index.js          # 入口文件，导出所有数据
├── pages.js          # Page 内容类型数据
├── solutions.js      # Solution 内容类型数据
├── cases.js          # Case Study 内容类型数据
├── articles.js       # Article 内容类型数据
└── resources.js      # Resource 内容类型数据
```

## 数据格式

每个文件导出一个数组，数组中每个条目的结构：

```javascript
{
  slug: 'unique-identifier',  // 唯一标识符
  locales: {
    zh: {
      // 中文版本的所有字段
      title: '标题',
      blocks: [...],
      // ...其他字段
    },
    en: {
      // 英文版本的所有字段
      title: 'Title',
      blocks: [...],
      // ...其他字段
    }
  }
}
```

## 添加新内容

### 1. 添加一条新的 Page

编辑 `pages.js`，在数组末尾追加：

```javascript
{
  slug: 'new-page',
  locales: {
    zh: {
      title: '新页面',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '欢迎',
          summary: '这是一个新页面',
        }
      ],
    },
    en: {
      title: 'New Page',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Welcome',
          summary: 'This is a new page',
        }
      ],
    },
  },
}
```

### 2. 只添加一种语言

如果暂时只有中文内容，可以只写 `zh`：

```javascript
{
  slug: 'chinese-only-page',
  locales: {
    zh: {
      title: '仅中文页面',
      blocks: [...],
    },
    // 稍后可以补充 en
  },
}
```

### 3. 删除某条内容

直接从数组中移除对应条目即可。

## 运行 Seed

### 全量 Seed（所有内容类型）

```bash
node scripts/seed-strapi-v2.js
```

### 只 Seed 特定类型

```bash
# 只更新 pages
node scripts/seed-strapi-v2.js --only pages

# 只更新 solutions 和 cases
node scripts/seed-strapi-v2.js --only solutions,cases

# 只更新 articles
node scripts/seed-strapi-v2.js --only articles
```

### 添加到 npm scripts

在 `package.json` 中：

```json
{
  "scripts": {
    "seed:strapi": "node scripts/seed-strapi-v2.js",
    "seed:pages": "node scripts/seed-strapi-v2.js --only pages",
    "seed:solutions": "node scripts/seed-strapi-v2.js --only solutions",
    "seed:cases": "node scripts/seed-strapi-v2.js --only cases",
    "seed:articles": "node scripts/seed-strapi-v2.js --only articles",
    "seed:resources": "node scripts/seed-strapi-v2.js --only resources"
  }
}
```

然后就可以用：

```bash
npm run seed:pages
npm run seed:solutions
# ...
```

## 工作原理

1. **Locale 合并**：脚本会自动将同一个 `slug` 的不同语言版本合并到同一个 `documentId`
2. **优先级**：默认优先创建 `en`（英文），然后创建 `zh`（中文），确保 documentId 稳定
3. **增量更新**：
   - 如果某个 `slug` 已存在，会更新对应语言版本
   - 如果某个 `slug` 的某个语言版本不存在，会创建新版本并关联到同一文档
4. **自动发布**：所有创建/更新的内容都会自动发布（`status: 'published'`）

## 优势对比

### 旧方式（mock-data.js）
- ❌ 所有内容混在一起，难以查找
- ❌ 中英文数据重复度高
- ❌ 每次 seed 都是全量替换
- ❌ 无法选择性更新某些内容

### 新方式（seed-data/）
- ✅ 按内容类型分文件，清晰易维护
- ✅ 中英文并列存储，一目了然
- ✅ 支持增量更新，按需 seed
- ✅ 可以只更新某个条目的某个语言版本
- ✅ 便于团队协作，减少冲突

## 注意事项

1. **Node 版本**：确保使用 Node 20+ (`nvm use 20`)
2. **Strapi 启动**：seed 脚本会自动启动 Strapi 实例，无需手动运行 `npm run cms:dev`
3. **环境变量**：确保 `cms/.env` 文件存在
4. **备份**：在正式环境 seed 前建议先备份数据库

## 示例工作流

### 场景 1：添加一篇新文章

1. 编辑 `articles.js`，追加新条目：

```javascript
{
  slug: 'new-article-2024',
  locales: {
    zh: {
      title: '2024 年新文章',
      excerpt: '摘要',
      content: '正文内容...',
    },
  },
}
```

2. 运行 seed：

```bash
npm run seed:articles
```

3. 打开 Strapi 后台，即可看到新文章

### 场景 2：为已有文章补充英文版本

1. 找到对应条目，添加 `en` 键：

```javascript
{
  slug: 'existing-article',
  locales: {
    zh: {
      // 已有的中文内容
    },
    en: {
      title: 'Existing Article',
      excerpt: 'Summary',
      content: 'Content...',
    },
  },
}
```

2. 运行 seed：

```bash
npm run seed:articles
```

3. 脚本会自动将英文版本关联到已有的中文文档

### 场景 3：修改首页内容

1. 编辑 `pages.js`，找到 `slug: 'landing'` 的条目
2. 修改对应语言的字段
3. 运行：

```bash
npm run seed:pages
```

## 迁移指南

如果想从旧的 `mock-data.js` 迁移到新结构：

1. 保留 `mock-data.js`（前端仍然需要它作为 fallback）
2. 从 `mock-data.js` 提取数据，按新格式重新组织到 `seed-data/` 各文件
3. 运行 `npm run seed:strapi` 确保数据正确导入
4. 后续新增/修改内容时：
   - 更新 `seed-data/` 文件
   - 运行对应的 seed 命令
   - 同时同步更新 `mock-data.js`（保持前端 fallback 可用）
