---
brand: 乾径科技 MetaRadio
product: MetaRadio · Autonomous Driving Solution
type: vertical
vertical: autonomous-driving
slug: v4-autonomous-driving
title: 自动驾驶 · V2X 与车路云通信的电磁孪生
audience: technical-decision-maker
language: zh-CN
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [自动驾驶, V2X, C-V2X, PC5, T-Box, 车路云, ADAS, 高精定位]
design_hint: 主色 navy/blue + amber 强调"路-车-云"三方
---

# Hero

- **Badge:** Vertical Datasheet · 自动驾驶 / Autonomous Driving
- **Eyebrow:** 行业垂直市场解决方案
- **Headline:** 让自动驾驶的"通信不出错"
- **Headline-em:** V2X 与车路云的电磁孪生
- **Sub:** 高阶自动驾驶离不开 V2X、蜂窝、卫星、Wi-Fi 多链路协同。但城市峡谷、隧道、立交、地库等复杂场景下，通信链路是 ADAS/AD 安全闭环里最容易被忽视的薄弱环。乾径以三层产品在车路云体系中提供 V2X 信道仿真、T-Box/OBU/RSU 的 HIL 测试，以及路网级电磁孪生能力。

## Hero Metrics

| Value | Label |
| --- | --- |
| C-V2X / NR V2X | Uu + PC5 双链路 |
| 城市/隧道/立交 | 全场景仿真 |
| 路-车-云 | 端到端电磁孪生 |

# Challenge · 智能网联汽车的通信难题

**Title:** 自动驾驶的"长尾场景"，相当一部分藏在通信里
**Description:** 智能驾驶的功能安全演进，已经从感知和决策延伸到通信。一次切换失败、一个隐性盲区，可能就让远程驾驶、协同变道、车路协同感知功能失效。

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🌉 | 立交与隧道 | 立交桥、隧道口的多径与切换问题，传统统计模型无法精确刻画。 |
| 🏙 | 城市峡谷 | 高楼街区下的 GNSS 与蜂窝多径同时出现问题，影响定位与通信。 |
| 🅿 | 地库与园区 | 室内停车场、园区低层的覆盖与切换是高阶 AVP 自动泊车的隐藏门槛。 |

# Solution · 三层产品在自动驾驶的部署

**Title:** 把"那条路"先在仿真里跑一万遍
**Description:** Lauraycs 提供路网 + 车辆 + RSU 联合的高保真信道，L2 用 HIL 复现真实路测，L3 与车路协同平台联动形成路网级电磁孪生。整体支持从单车终端测试到路口/路段/城市级路网验证。

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | 射线跟踪 / Lauraycs | 路网/隧道/立交/园区 3D + 车辆轨迹 + 多 RSU/基站联合，输出 V2X Uu/PC5 信道。 |
| L2 | 虚拟路测 / HIL | 用真实路网信道驱动 T-Box/OBU/RSU HIL，回归切换、远程驾驶、定位 KPI。 |
| L3 | 电磁孪生 / EM-Twin | 路口/路段级电磁孪生，与车路协同平台、ETC/MEC 联动。 |

# Architecture · 端到端工作流

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | 路网与车辆建模 | 高精地图 + 车流轨迹 + 现网基站/RSU 配置。 |
| 02 | V2X 信道仿真 | Uu (蜂窝) + PC5 (直连) 双链路联合时变多径与切换。 |
| 03 | 车端/路端 HIL | 信道仿真仪驱动 T-Box/OBU/RSU，回归切换/丢包/定位。 |
| 04 | 路网孪生 | 路口/路段电磁态势孪生，与车路协同平台对接。 |

# Specifications · 行业特定规格

## Specs Table

| 项目 | 规格 |
| --- | --- |
| 标准对齐 | 3GPP C-V2X (Rel-14/15)、NR V2X (Rel-16/17/18)、IEEE 802.11p/bd、CCSA YD/T |
| 频段 | 蜂窝 FR1/FR2、5.9 GHz 直连、毫米波远期、卫星辅助 |
| 场景库 | 城市峡谷、立交、隧道、桥梁、园区、地库、高速、农村快速路 |
| 移动 | 任意可编程车辆/UAV/RSU 轨迹；支持多车协同与编队 |
| HIL 对象 | T-Box、OBU、RSU、4D 雷达、毫米波模组 |
| KPI | PER、TPUT、RSRP/SINR、PC5 链路稳定性、远程驾驶 RTT、AVP 切换 |
| 与 ADAS 的对接 | 支持与 SiL/HiL 自动驾驶仿真平台 (CARLA/Prescan/VTD) 对接 |
| 部署 | 实验室 + 路口/路段试点；与车厂自动化测试平台集成 |

# Differentiators · 核心差异化

## Bullets

- **路网级 RT：** 把整个路口/路段一次性纳入仿真，避免单基站近似。
- **Uu + PC5 双链路：** 同一仿真同时输出蜂窝与直连两路信道。
- **可对接 ADAS 仿真：** 把通信侧"接入"现有自动驾驶 SiL/HiL 流程。
- **场景库丰富：** 立交、隧道、地库等 ADAS 长尾场景已成型并可复用。
- **可重复路测：** 把外场某次"差点出事"的事件转换为可重复脚本。
- **国产可控：** 配合国产仪器与 RSU 厂商形成全国产 V2X HIL 方案。

# Applications · 典型场景

| Icon | Title | Text |
| --- | --- | --- |
| 🚗 | T-Box / OBU 测试 | 复现真实路况，对终端的远程驾驶、协同变道做回归测试。 |
| 📡 | RSU 路口部署 | 不同 RSU 位置/天线方案的路口覆盖与切换性能仿真。 |
| 🛣 | 高速 V2X | 高速场景下高速移动 + 切换/编队的链路稳定性评估。 |
| 🅿 | AVP 自动泊车 | 地库 + 园区的电磁覆盖与定位精度联合评估。 |
| 🚛 | 商用车队 | 物流 + 矿山 + 港口的远程驾驶/编队链路保障。 |
| 🌐 | 车路云协同 | MEC + 路口 + 车端的端到端 KPI 仿真。 |

# Proof · 客户与生态

## Proof Stats

| Value | Label |
| --- | --- |
| 头部车企 | 联合开展虚拟路测/V2X HIL 案例 |
| 路侧 RSU | 与多家 RSU 设备商集成 |
| 自动化测试 | 与车规级自动化测试平台已对接 |

# CTA · 联系方式

- **Primary CTA:** 申请 V2X / 车路云方案
- **Email:** sales@metaradio.tech
- **Tagline:** 把自动驾驶的"通信长尾"先在电磁孪生里跑通。
- **Sub:** 乾径科技 MetaRadio · 自动驾驶垂直解决方案
