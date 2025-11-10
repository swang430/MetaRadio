# Strapi v5 Seed 系统 v2 - 快速指南

## 🎯 核心改进

### 旧系统的问题
- ❌ 所有内容混在一个大文件 `mock-data.js` 中，难以维护
- ❌ 中英文内容重复度高，修改容易遗漏
- ❌ 每次 seed 都是全量操作，无法增量更新
- ❌ 添加/删除内容需要修改大量代码

### 新系统的优势
- ✅ **模块化**：按内容类型分文件（pages.js, solutions.js 等）
- ✅ **中英文并列**：同一条目的多语言版本放在一起，一目了然
- ✅ **增量更新**：可以只更新某个内容类型，甚至某条记录
- ✅ **易于维护**：添加/删除内容只需操作对应数组
- ✅ **自动关联**：多语言版本自动共享同一个 documentId

## 📁 新的文件结构

```
scripts/
├── seed-data/
│   ├── index.js          # 入口，导出所有数据
│   ├── pages.js          # Page 数据（首页、解决方案列表页等）
│   ├── solutions.js      # Solution 数据（虚拟路测、机器人等）
│   ├── cases.js          # Case Study 数据
│   ├── articles.js       # Article 数据（博客文章）
│   ├── resources.js      # Resource 数据（下载资源）
│   └── README.md         # 详细使用文档
├── seed-strapi-v2.js     # 新的 seed 脚本
└── seed-strapi.js        # 旧脚本（保留作为备份）
```

## 📝 数据格式示例

每个文件导出一个数组，每条记录包含 `slug` 和 `locales`：

```javascript
// scripts/seed-data/solutions.js
module.exports = [
  {
    slug: 'virtual-drive-testing',  // 唯一标识
    locales: {
      zh: {
        // 中文版本的完整数据
        title: '虚拟路测',
        excerpt: '以电磁数字孪生替代部分实车路测...',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '虚拟路测解决方案',
            // ...
          },
        ],
      },
      en: {
        // 英文版本的完整数据
        title: 'Virtual Drive Testing',
        excerpt: 'Replace physical drive tests...',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Virtual Drive Testing Solution',
            // ...
          },
        ],
      },
    },
  },

  // 添加更多条目只需追加到数组
  {
    slug: 'robotics-connectivity',
    locales: {
      zh: { /* ... */ },
      en: { /* ... */ },
    },
  },
];
```

## 🚀 使用方法

### 1. 全量 Seed（所有内容类型）

```bash
npm run seed:strapi
```

这会 seed 所有的 pages、solutions、cases、articles、resources。

### 2. 增量 Seed（特定内容类型）

```bash
# 只更新 pages
npm run seed:pages

# 只更新 solutions
npm run seed:solutions

# 只更新 cases
npm run seed:cases

# 只更新 articles
npm run seed:articles

# 只更新 resources
npm run seed:resources
```

### 3. 手动指定多个类型

```bash
# 只更新 solutions 和 cases
node scripts/seed-strapi-v2.js --only solutions,cases
```

## 📋 常见操作

### 操作 1：添加一条新的解决方案

1. 编辑 `scripts/seed-data/solutions.js`
2. 在数组末尾追加：

```javascript
{
  slug: 'new-solution',
  locales: {
    zh: {
      title: '新解决方案',
      excerpt: '简介',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '标题',
          summary: '摘要',
        }
      ],
    },
    en: {
      title: 'New Solution',
      excerpt: 'Brief intro',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Headline',
          summary: 'Summary',
        }
      ],
    },
  },
}
```

3. 运行 `npm run seed:solutions`
4. 打开 Strapi 后台查看新条目

### 操作 2：只添加中文版本，稍后补充英文

```javascript
{
  slug: 'chinese-first',
  locales: {
    zh: {
      title: '仅中文',
      blocks: [/* ... */],
    },
    // 暂时不写 en，可以之后补充
  },
}
```

之后补充英文版本：

```javascript
{
  slug: 'chinese-first',
  locales: {
    zh: {
      title: '仅中文',
      blocks: [/* ... */],
    },
    en: {
      title: 'English Version',
      blocks: [/* ... */],
    },
  },
}
```

再次运行 `npm run seed:solutions`，英文版本会自动关联到已有的中文文档。

### 操作 3：删除某条记录

1. 从对应文件的数组中移除该条目
2. 重新运行 seed（脚本不会自动删除 Strapi 中的数据）
3. 如需清理，手动在 Strapi 后台删除，或者使用 `npm run clear:strapi` 后重新 seed

### 操作 4：修改现有内容

1. 找到对应的文件和条目（通过 `slug` 搜索）
2. 修改对应语言的字段
3. 运行对应的 seed 命令（如 `npm run seed:pages`）
4. 脚本会自动更新已有记录

## 🔄 工作原理

1. **自动查找现有文档**：脚本会根据 `slug` 查询 Strapi 中是否已有对应文档
2. **去重**：如果发现同一个 `slug` 有多个 documentId，只保留第一个
3. **Locale 合并**：
   - 优先创建 `en`（英文）版本，获得 documentId
   - 使用相同的 documentId 创建 `zh`（中文）版本
   - 两个语言版本在 Strapi 后台显示为同一个文档的不同语言
4. **增量更新**：
   - 如果某个语言版本已存在，执行 `update` 操作
   - 如果某个语言版本不存在，执行 `create` 操作并关联到同一 documentId
5. **自动发布**：所有内容都设置为 `status: 'published'`

## ⚙️ 技术细节

### 为什么优先创建英文版本？

Strapi v5 的 Documents API 要求多语言版本共享同一个 `documentId`。我们选择先创建 `en`，然后用这个 `documentId` 创建 `zh`，这样可以确保：

1. documentId 稳定（始终来自英文版本）
2. 在 Strapi 后台更容易管理（英文作为主版本）
3. 如果只有中文数据，也能正常创建（会自动调整顺序）

### 清理遗留数据

脚本会自动检测并删除没有 `documentId` 的遗留记录（Strapi v4 升级 v5 后可能存在）。

### 与 mock-data.js 的关系

- `mock-data.js` 仍然需要保留，供前端在没有 Strapi 时作为 fallback
- `seed-data/` 目录的数据用于 Strapi 初始化
- 两者结构相似，但维护方式不同：
  - `seed-data/` 更易维护（模块化、增量更新）
  - `mock-data.js` 需要手动同步更新（保持前端 fallback 可用）

## 🎓 最佳实践

1. **每次修改后立即 seed**：避免忘记同步到 Strapi
2. **使用增量 seed**：修改 solutions 就只运行 `npm run seed:solutions`，速度更快
3. **版本控制**：seed-data/ 目录下的文件应纳入 Git
4. **团队协作**：不同成员可以修改不同的文件，减少冲突
5. **备份再 seed**：在生产环境 seed 前先备份数据库

## 🆚 对比旧系统

### 添加一条新的 Solution

**旧方式**：
1. 打开 `lib/mock-data.js`（1000+ 行）
2. 找到 `mockSolutions` 的 `zh` 部分
3. 复制粘贴一大段 blocks 代码
4. 找到 `mockSolutions` 的 `en` 部分
5. 再复制粘贴一大段 blocks 代码
6. 运行 `npm run seed:strapi`（所有内容都重新 seed）

**新方式**：
1. 打开 `scripts/seed-data/solutions.js`（清晰的结构）
2. 在数组末尾追加一条记录，中英文并列
3. 运行 `npm run seed:solutions`（只更新 solutions）

### 修改首页某个区块的文案

**旧方式**：
1. 打开 1000+ 行的 `mock-data.js`
2. 搜索对应的文案
3. 改完中文，再搜索英文位置
4. 运行全量 seed

**新方式**：
1. 打开 `scripts/seed-data/pages.js`
2. 找到 `slug: 'landing'`
3. 中英文在同一个对象里，一目了然
4. 运行 `npm run seed:pages`（只更新 pages）

## 📞 需要帮助？

- 详细文档：`scripts/seed-data/README.md`
- 数据示例：查看 `scripts/seed-data/*.js` 文件
- 旧脚本备份：`scripts/seed-strapi.js`（如需回退可用 `npm run seed:strapi:legacy`）
