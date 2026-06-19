---
brand: 乾径科技 MetaRadio
product: Lauraycs Virtual Drive Test (VDT) / HIL Suite
type: horizontal
layer: L2
slug: l2-virtual-drive-test
title: 虚拟路测与 HIL · 把外场带回实验室
audience: technical-decision-maker
language: zh-CN
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [虚拟路测, HIL, 硬件在环, 信道仿真仪, OTA, MIMO, NTN, V2X]
design_hint: 主色 navy/blue + 次色 amber 强调"硬件在环"；2 页 A4
---

# Hero

- **Badge:** Datasheet · L2 / Virtual Drive Test & HIL
- **Eyebrow:** 产品策略三层结构 · 第二层
- **Headline:** 虚拟路测与硬件在环
- **Headline-em:** 把外场稳定带回实验室
- **Sub:** 在 Lauraycs 射线跟踪生成的高保真信道与覆盖驱动下，控制信道仿真仪、信号源、向量信号分析仪与 OTA 暗室，对真实终端、模组与车规设备进行可重复、可回归的硬件在环测试。让"那一次外场难以复现的信号问题"，在实验室里能稳定重放、调参与回归。

## Hero Metrics

| Value | Label |
| --- | --- |
| 1:1 复现 | 外场场景实验室回放 |
| ≥ 4×4 MIMO | 多端口 OTA / 信道仿真仪联调 |
| 多厂家 | 兼容 Keysight / R&S / Spirent / 国产仪器 |

# Challenge · 测试时代挑战

**Title:** 物理路测的困境与新场景的复杂度
**Description:** 5G/6G、V2X、低空、卫星 NTN 终端的研发与认证，越来越依赖"在真实电磁环境下"的端到端测试。但物理路测正在多个维度同时失灵。

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🌧 | 不可重复 | 天气、车流、潮汐式人流让同一段路两次跑出来的数据无法对齐，bug 难复现，回归无法做。 |
| 🚧 | 极端场景缺失 | 隧道、立交、空地一体、星地切换、毫米波遮挡这些关键场景，外场要么不可遇要么不安全。 |
| 💸 | 成本与周期 | 一次车规级路测动辄百万级费用、数月周期；6G/NTN/低空场景甚至缺乏可用的真实路网。 |

# Solution · 解决方案架构

**Title:** 仿真信道驱动真实仪器，硬件在环复现真实世界
**Description:** Lauraycs 输出的确定性多径信道与覆盖序列，作为信道仿真仪/OTA 暗室的输入；DUT（终端、模组、车载 T-Box、卫星终端）在实验室中"看到"和外场完全一致的电磁环境。我们提供三种部署形态，覆盖从快速场景生成到全闭环 HIL 的不同测试需求。

## Solution Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🛰 | 场景生成 | 基于 3D 地图、轨迹与天线，生成时变 CIR/PDP，输出至主流信道仿真仪标准格式（CMX/SCT/SLN）。 |
| 🧪 | 硬件在环 (HIL) | 仿真信道实时回放进入信道仿真仪；DUT 端测得的功率、解调、协议指标 1:1 还原外场。 |
| 📡 | OTA 暗室联调 | 多探头 OTA 系统（典型 16/32 探头），驱动 MIMO/Massive MIMO 终端的方向性、波束化与多径性能验证。 |

# Architecture · 系统架构

**Title:** 从地图到 DUT，端到端可重复的测试链路
**Description:** 整体链路分为四个阶段：场景与地图、射线跟踪信道生成、信道仿真仪/OTA 实时驱动、DUT 测量与回归。每一个环节均提供 API 与脚本化能力，便于嵌入客户现有的自动化测试平台。

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | 场景 & 轨迹建模 | 导入路网/室内/低空/星地 3D 模型，定义 BS/卫星/车辆/UAV 轨迹与天线方向图。 |
| 02 | 高保真信道生成 | Lauraycs 输出时变 CIR、PDP、Doppler、AoA/AoD/ZoA/ZoD 簇。 |
| 03 | 信道格式转换 | 自动转换为信道仿真仪/OTA 工具支持格式（如 PROPSIM、F8800、Vertex、Anritsu MD8475 等）。 |
| 04 | HIL 驱动 & 测量 | 实时驱动仪器，DUT 经接口/暗室连接被测；自动采集 KPI 并回归。 |

# Specifications · 技术规格

## Specs Table

| 项目 | 规格 |
| --- | --- |
| 输入信道源 | Lauraycs RT、外部 CIR/CDL/TDL、3GPP TR 38.901 / 38.873 |
| 仪器兼容 | Keysight PROPSIM / F8800、R&S CMW/CMX、Spirent Vertex/8100、Anritsu MD8475、国产信道仿真仪（多家） |
| MIMO 配置 | 1×1 ~ 64×64；典型 4×4 / 8×8 / 16×16；OTA 暗室 16/32 探头 |
| 频段 | 600 MHz – 100 GHz（含 FR1/FR2/FR3）；专项支持 sub-THz 6G HIL |
| 带宽 | 100 / 200 / 400 / 1000 / 2000 MHz（取决于仪器型号） |
| 时变能力 | L3 级时序回放，时间分辨率 ≤ 1 ms；多 Tx/Rx 联合轨迹 |
| 输出格式 | CMX/F8800 SCT、PROPSIM PSCN、Vertex SCS、CDL/TDL JSON、自定义 |
| 接口 | Python API、命令行批处理、SCPI、与 NI TestStand / 自动化平台集成 |
| 协议层联动 | 4G/5G NSA & SA、NTN（NB-IoT NTN / NR NTN）、V2X (PC5 / Uu)、Wi-Fi 7、LoRa |
| KPI 采集 | 解调吞吐、BLER、TPUT、TTFF、切换成功率、波束跟踪误差等 |
| 部署 | 实验室单机 / 多机协同 / 国产化集群；支持远程实验室 (Remote Lab) |

# Differentiators · 核心差异化

## Bullets

- **场景到 DUT 全闭环：** 国内独有的"3D 地图 → RT 信道 → 信道仿真仪 → DUT"端到端工作流，避免人工拼接。
- **仪器无关：** 一份场景可同时输出主流国际厂家与国产信道仿真仪所需格式，避免厂商锁定。
- **可回归：** 任何外场出现的信号问题，可被转换为可重复脚本，纳入回归测试库。
- **极端场景按需生成：** 立交桥隐性盲区、隧道切换、卫星阴影、低空塔林等"高难度"场景按需生成。
- **国产化与跨平台：** 完整工具链支持 Linux / 麒麟，配合国产仪器厂商可形成"全国产"虚拟路测方案。
- **动态时变 HIL：** L3 级时序级仿真直接进入实时回放，避免只回放"静态切片"的伪 HIL。

# Applications · 典型应用

| Icon | Title | Text |
| --- | --- | --- |
| 🚗 | 车载 T-Box / OBU | 在实验室复现城市/隧道/园区 V2X 与蜂窝双链路，验证切换、定位与远程驾驶。 |
| 📱 | 5G/6G 终端认证 | 在 OTA 暗室回放真实 PDP，对终端 MIMO 解调、波束跟踪进行回归测试。 |
| 🛰 | NTN 终端 | 真实卫星轨迹 + 城市地面阴影，验证 NB-IoT NTN / NR NTN 终端连接稳定性。 |
| 🛩 | UAV / 低空 | 复现低空 C2 链路丢失风险场景，回归飞控通信冗余设计。 |
| 🏭 | 工业终端 | 在产线干扰、金属反射场景下回归 5G LAN / Wi-Fi 7 模组性能。 |
| 🧪 | 协议研究 | 把"外场异常包"转换为可重复信道，定位协议栈/算法 bug。 |

# Proof · 客户与生态

## Proof Stats

| Value | Label |
| --- | --- |
| 8+ | 信道仿真仪 / OTA 主流型号已对接 |
| 50%+ | 路测场景人工拼接工时下降（典型客户实测） |
| 国产 + 国际 | 双轨兼容，避免供应链单点 |

# CTA · 联系方式

- **Primary CTA:** 申请 HIL 演示与样例场景包
- **Email:** sales@metaradio.tech
- **Tagline:** 把外场稳定带回实验室，让通信测试可重复、可回归。
- **Sub:** 乾径科技 MetaRadio · 虚拟路测与 HIL 集成方案
