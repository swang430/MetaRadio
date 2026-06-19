---
brand: 乾径科技 MetaRadio
product: <产品全名，如 MetaRadio · XXX Solution>
type: <horizontal | vertical | ai-comms>
vertical: <type=vertical 时填行业代号，如 v7-xxx；否则删此行>
slug: <kebab-小写-唯一，如 v7-quantum-radar>
title: <一句话标题（中文）>
audience: technical-decision-maker
language: zh-CN
version: 2026.06
contact_email: sales@metaradio.tech
keywords: [关键词1, 关键词2, 关键词3]
design_hint: <视觉提示，如 主色 navy + cyan>
---

<!--
  新产品模板。用法：
  1) 复制本文件为 seed-data/datasheets/<slug>.md（中文）和 <slug>.en.md（英文：language: en，值译成英文，slug 不变）。
  2) 把 <…> 占位换成真实内容；用不到的「## 子分节」可整段删除（Hero / Specifications / CTA 建议保留）。
  3) cd metaradio-cms && npm run import:datasheets
  4) 配图（系列图）在 Strapi 后台给该 datasheet 的 heroImage 上传（走 OSS），命名见 seed-data/README「图片命名规范」。
  语法：# 主分节 / ## 子分节；标题写「英文Key · 中文小标题」（· 前英文=结构标记，· 后中文=小标题）；
        **Key:** 值 = 字段；- **Key:** 值 = 带标题条目；表格用 | 列 |；- 文本 = 普通 bullet。
  （本注释块在 import 时会被忽略，可留可删。）
-->

# Hero

- **Badge:** <顶部小标签，如 Vertical Datasheet · XXX>
- **Eyebrow:** <行业 / 品类>
- **Headline:** <主标题第一行>
- **Headline-em:** <主标题第二行（高亮色显示）>
- **Sub:** <导语 2–3 句：这份 datasheet 解决什么、给谁。>

## Hero Metrics

| Value | Label |
| --- | --- |
| <数值1> | <说明1> |
| <数值2> | <说明2> |
| <数值3> | <说明3> |

# Challenge · <中文小标题，如 时代挑战>

**Title:** <挑战主张一句话>
**Description:** <2–3 句描述客户面临的问题。>

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 📈 | <挑战1标题> | <挑战1说明> |
| 🧠 | <挑战2标题> | <挑战2说明> |
| 🛰 | <挑战3标题> | <挑战3说明> |

# Solution · <中文小标题，如 解决方案>

**Title:** <方案主张一句话>
**Description:** <2–3 句描述乾径如何解决。>

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | 射线跟踪 / Lauraycs | <这一层在本场景做什么> |
| L2 | 虚拟路测 / HIL | <…> |
| L3 | 电磁孪生 / EM-Twin | <…> |

# Architecture · <中文小标题，如 工作流>

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | <步骤1> | <说明> |
| 02 | <步骤2> | <说明> |
| 03 | <步骤3> | <说明> |
| 04 | <步骤4> | <说明> |

# Specifications · <中文小标题，如 规格>

## Specs Table

| 项目 | 规格 |
| --- | --- |
| <规格项1> | <值> |
| <规格项2> | <值> |
| <规格项3> | <值> |

# Differentiators · <中文小标题，如 核心差异化>

## Bullets

- **<差异点1>：** <说明>
- **<差异点2>：** <说明>
- **<差异点3>：** <说明>

# Applications · <中文小标题，如 典型场景>

| Icon | Title | Text |
| --- | --- | --- |
| 📡 | <场景1> | <说明> |
| 🤖 | <场景2> | <说明> |
| 🌍 | <场景3> | <说明> |

# Proof · <中文小标题，如 客户与生态>

## Proof Stats

| Value | Label |
| --- | --- |
| <数值> | <说明> |
| <数值> | <说明> |

# CTA · <中文小标题，如 联系方式>

- **Primary CTA:** <行动号召，如 申请 XXX 演示>
- **Email:** sales@metaradio.tech
- **Tagline:** <一句收尾标语>
- **Sub:** 乾径科技 MetaRadio · <产品 / 垂直名>
