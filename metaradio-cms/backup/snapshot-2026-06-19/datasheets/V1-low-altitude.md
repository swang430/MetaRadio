---
brand: 乾径科技 MetaRadio
product: MetaRadio · Low Altitude Solution
type: vertical
vertical: low-altitude
slug: v1-low-altitude
title: 低空经济 · 城市低空通信的电磁孪生
audience: technical-decision-maker
language: zh-CN
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [低空经济, 无人机, eVTOL, UAM, UTM, C2 链路, 图传, 电磁孪生]
design_hint: 主色 cyan/blue + sky；体现城市楼宇 + 低空航线
---

# Hero

- **Badge:** Vertical Datasheet · 低空 / Low Altitude
- **Eyebrow:** 行业垂直市场解决方案
- **Headline:** 城市低空通信的电磁孪生
- **Headline-em:** 让无人机的"看不见的航道"先在仿真里跑通
- **Sub:** 低空经济的核心矛盾，是几百米高度的复杂电磁环境与对 C2、图传、定位"零中断"的极高要求之间的张力。乾径以射线跟踪 + 虚拟路测 + 电磁孪生三层方案，在城市楼宇、塔林与空地一体网络中，把这张看不见的低空电磁图，变成可仿真、可测试、可运营的工程基础设施。

## Hero Metrics

| Value | Label |
| --- | --- |
| 0–600 m | 城市低空高度全覆盖 |
| C2 / 图传 / 5G-A | 多链路联合仿真 |
| UTM 对接 | 与无人机管理平台联动 |

# Challenge · 低空场景的电磁挑战

**Title:** 城市低空，是无线信号最不确定的一段空间
**Description:** 低空 50–600 m 区间，介于地面蜂窝主瓣与卫星覆盖之间，恰好是电磁覆盖最不确定的"夹层"。无人机物流、城市巡检、eVTOL 通勤等业务对通信连续性要求接近航空级，但底层电磁环境却几乎是空白。

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🏙 | 楼宇与塔林反射 | 城市建筑群在低空形成密集反射与遮挡，地面蜂窝主瓣朝下，低空覆盖呈"漏斗状"洞穴。 |
| 📡 | C2 链路高可靠 | 控制链路要求毫秒级时延、≥ 99.999% 可用性，传统统计模型给不出确定性结论。 |
| 🛂 | UTM 监管协同 | 低空管理需要"电磁航道"语义，但当前 UTM 系统普遍缺失电磁层数据。 |

# Solution · 三层产品在低空的部署

**Title:** 射线跟踪 → 虚拟路测 → 电磁孪生，闭环服务低空
**Description:** 三层方案逐级映射低空研发、测试与运营三个阶段。从仿真航道、地面台站规划，到无人机 C2/图传 HIL 测试，再到与 UTM 联动的实时电磁孪生，形成端到端低空电磁工具链。

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | 射线跟踪 / Lauraycs | 城市低空 3D 信道仿真：楼宇 + 塔林 + 多基站，输出航线沿线 RSRP/SINR/多径与 Doppler。 |
| L2 | 虚拟路测 / HIL | 仿真信道驱动信道仿真仪与 UAV 通信测试台，对 C2、图传、5G-A 模组开展 HIL 回归。 |
| L3 | 电磁孪生 / EM-Twin | 与 UTM 平台对接的城市低空电磁孪生，实时输出航线推荐与异常预警。 |

# Architecture · 端到端工作流

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | 城市低空建模 | 高精度 3D 城市模型 + 现网基站配置 + 计划航线/起降点。 |
| 02 | 航道电磁仿真 | RT 引擎沿航线生成时变多径、覆盖盲区、多普勒与切换风险图。 |
| 03 | C2/图传 HIL | 信道仿真仪驱动真实 UAV 模组/地面站，做断链/抖动/切换回归。 |
| 04 | UTM 闭环运营 | 实时电磁态势接入 UTM，动态调整航道与起降时间窗口。 |

# Specifications · 行业特定规格

## Specs Table

| 项目 | 规格 |
| --- | --- |
| 高度范围 | 0 – 600 m（含起降近地复杂电磁场区域） |
| 频段 | C2: 蜂窝 FR1 / FR2 / 5G-A、专用 C2 频段、Wi-Fi 6/7；图传：5.8 GHz、毫米波 |
| 业务模型 | 城市物流、巡检、警用、应急、eVTOL UAM、植保、测绘 |
| 信道输出 | 沿航线 CIR/PDP、覆盖洞、Doppler、多基站联合 SINR 时序 |
| HIL 对象 | 无人机模组、地面站、5G-A 高频模组、Mesh 自组网 |
| UTM 对接 | 已支持主流 UTM 数据格式 (USS/UAS Service Supplier) |
| 监管对齐 | 与各地低空运行规程协同，可输出电磁航道审批证据链 |
| 部署 | 公有/私有云、边缘节点；支持试点城市级集群 |

# Differentiators · 核心差异化

## Bullets

- **"低空夹层"专项电磁建模：** 同时考虑地面蜂窝下倾主瓣、楼宇反射与塔林遮挡。
- **C2 链路的确定性 KPI：** 不只给覆盖图，给出毫秒级时延、丢包概率与切换路径。
- **HIL 直驱 UAV 真实模组：** 复现外场难以遇见的"瞬间失联"场景。
- **UTM 数据兼容：** 输出可与无人机交通管理平台对接的"电磁航道"信息层。
- **空地一体规划：** 同一引擎支持地面网络、低空网络、卫星 NTN 协同评估。
- **可视化交付：** 3D 电磁航道、风险热力、波束阴影一图可视。

# Applications · 典型场景

| Icon | Title | Text |
| --- | --- | --- |
| 📦 | 城市无人机物流 | 物流公司航线规划与 C2 链路 SLA 设计。 |
| 🛫 | eVTOL / UAM | 通勤航线电磁覆盖与多基站切换可靠性验证。 |
| 🚓 | 警用与应急 | 突发事件区域临时电磁航道生成与应急回传。 |
| 🛠 | 城市巡检 | 桥梁、电力、燃气巡检航线的图传链路保障。 |
| 🌾 | 农业植保 | 大田作业蜂窝覆盖与图传可靠性预测。 |
| 🛰 | 空地一体 | 地面 + 卫星 + 低空多链路融合规划。 |

# Proof · 客户与生态

## Proof Stats

| Value | Label |
| --- | --- |
| 多个 | 试点城市低空电磁孪生项目 |
| 头部 | UAV/eVTOL OEM 与运营方合作 |
| UTM | 与多家无人机管理平台对接 |

# CTA · 联系方式

- **Primary CTA:** 申请低空电磁孪生方案
- **Email:** sales@metaradio.tech
- **Tagline:** 让低空经济，先在电磁孪生里跑通。
- **Sub:** 乾径科技 MetaRadio · 低空垂直解决方案
