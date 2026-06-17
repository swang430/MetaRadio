---
brand: 乾径科技 MetaRadio
product: MetaRadio · Satellite NTN Solution
type: vertical
vertical: satellite-ntn
slug: v2-satellite-ntn
title: 卫星 NTN · 星地一体的电磁孪生
audience: technical-decision-maker
language: zh-CN
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [NTN, 非地面网络, LEO, GEO, 卫星, 直连手机, NB-IoT NTN, NR NTN]
design_hint: 主色 navy/cyan + 深空蓝；强调"星-地"双侧
---

# Hero

- **Badge:** Vertical Datasheet · 卫星 NTN / Satellite Non-Terrestrial Network
- **Eyebrow:** 行业垂直市场解决方案
- **Headline:** 星地一体的电磁孪生
- **Headline-em:** 让卫星信号在城市楼宇间，不再"看天吃饭"
- **Sub:** LEO 大规模星座、直连手机、NB-IoT NTN、NR NTN 正把"卫星到地面"的链路推进到 3GPP 主流。但城市建筑遮挡、低仰角阴影、多波束/多星切换让 NTN 终端的链路保障成为新的难题。乾径以三层产品在星地一体场景中提供从仿真、HIL 到电磁孪生的完整工具链。

## Hero Metrics

| Value | Label |
| --- | --- |
| LEO / MEO / GEO | 多轨道协同建模 |
| NB-IoT NTN / NR NTN | 3GPP 标准对齐 |
| 直连手机 | 城市穿透与多波束仿真 |

# Challenge · 卫星到地面的真实困境

**Title:** "卫星到地面"看似简单，地面那一公里最难
**Description:** NTN 的链路预算往往按"自由空间 + 阴影裕度"近似，但在城市、山区、室内的真实部署中，多径、穿透、阴影与多波束/多星切换让链路远比模型复杂。

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🌆 | 城市楼宇阴影 | 高密度建筑造成低仰角下的频繁阴影衰落与多径，决定能否真正"直连手机"。 |
| 🔄 | 多星多波束切换 | LEO 星座下波束切换密集、星间切换时延敏感，容易导致掉线与重连延迟。 |
| 🏠 | 室内穿透 | 终端在室内、车内、大众交通工具内的穿透损耗模型经验性强，缺乏确定性预测。 |

# Solution · 三层产品在 NTN 的部署

**Title:** 用射线跟踪精确还原"那最后一公里"，再用 HIL 与孪生闭环验证
**Description:** 三层方案分别承担信道生成、终端测试与运营级电磁态势三个阶段，让 NTN 业务级 KPI 可仿真、可测试、可持续监测。

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | 射线跟踪 / Lauraycs | 卫星轨迹 + 城市/山区 3D + 室内穿透；输出星地链路时变多径与阴影序列。 |
| L2 | 虚拟路测 / HIL | 真实星地信道驱动 NB-IoT NTN / NR NTN 终端模组的 HIL 测试与回归。 |
| L3 | 电磁孪生 / EM-Twin | 与 NTN 网管/调度对接，实时呈现星座覆盖、波束着陆点与终端可达性。 |

# Architecture · 端到端工作流

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | 星座 + 地面建模 | TLE 星历 + 多波束方向图 + 城市/山区/室内 3D 模型。 |
| 02 | 星地信道生成 | 沿轨迹生成时变 CIR/PDP、Doppler、阴影、波束切换序列。 |
| 03 | NTN 终端 HIL | 信道仿真仪驱动 NB-IoT/NR NTN 模组，回归 TTFF、切换、丢包。 |
| 04 | 网管闭环 | 电磁孪生输出业务级覆盖与可达性指标，反馈调度策略。 |

# Specifications · 行业特定规格

## Specs Table

| 项目 | 规格 |
| --- | --- |
| 轨道类型 | LEO / MEO / GEO；支持自定义星历与星座配置 |
| 标准对齐 | 3GPP NB-IoT NTN (Rel-17/18)、NR NTN (Rel-17/18/19)、ITU-R P.681 |
| 频段 | L/S/C/Ku/Ka/Q/V；支持直连手机 (D2D) 与宽带 NTN |
| 多波束 | 可配置数十至数百波束；包含波束着陆轨迹与功率谱 |
| 终端类型 | 手持终端、IoT 终端、车载终端、固定 VSAT、低空/海事终端 |
| 城市/室内 | 含建筑物穿透、车辆穿透、室内多径模型；与实测可校正 |
| 仿真输出 | 链路裕度、可达概率、切换风险、星间换星策略评估 |
| HIL 对接 | 卫星信道仿真器、5G NTN gNB、终端 OTA 暗室 |
| 部署 | 私有云、边缘；支持星座运营商网管对接 |

# Differentiators · 核心差异化

## Bullets

- **真正"端到端"NTN：** 同时建模卫星轨迹与城市/室内地面端，避免传统"天上写公式、地上靠经验"。
- **多星切换确定性：** LEO 星座下波束/星间切换的可重复评估与回归。
- **直连手机仿真：** 城市楼宇阴影下的直连手机链路可达性给出确定性结论。
- **国产可控：** 与国产 NTN gNB 与终端模组厂家形成联合 HIL 方案。
- **业务级 KPI：** 不只链路裕度，输出 TTFF、丢包、切换成功率等业务级指标。
- **与孪生联动：** 把 NTN 覆盖叠加到城市/园区电磁孪生，形成天地一体视图。

# Applications · 典型场景

| Icon | Title | Text |
| --- | --- | --- |
| 📱 | 直连手机 | 城市/郊区直连手机覆盖可达性与切换性能预测。 |
| 🌐 | NB-IoT NTN | 海量低速 IoT 终端的覆盖与上行可达性评估。 |
| 🚗 | 车载 NTN | 高速移动场景下星地链路稳定性与盲区评估。 |
| 🚢 | 海事/航空 | 远海与低空航线的可达性评估与备份链路设计。 |
| 🏙 | 应急通信 | 灾区临时 NTN 覆盖与城市再入业务规划。 |
| 🛰 | 星座规划 | 不同星座配置下的端到端业务能力对比仿真。 |

# Proof · 客户与生态

## Proof Stats

| Value | Label |
| --- | --- |
| 头部 | 国产 LEO 星座研究院 / 卫星运营方合作 |
| 标准 | 与 3GPP NTN 标准跟进同步 |
| 端到端 | 卫星 + gNB + 终端联合 HIL 案例 |

# CTA · 联系方式

- **Primary CTA:** 申请 NTN 端到端方案
- **Email:** sales@metaradio.tech
- **Tagline:** 让卫星信号在城市楼宇间，从经验估算变成确定性工程。
- **Sub:** 乾径科技 MetaRadio · 卫星 NTN 垂直解决方案
