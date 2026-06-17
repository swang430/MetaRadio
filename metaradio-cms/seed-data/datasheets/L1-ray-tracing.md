---
brand: 乾径科技 MetaRadio
product: Lauraycs
type: horizontal
layer: L1
slug: l1-ray-tracing
title: Lauraycs · 确定性射线跟踪仿真引擎
audience: technical-decision-maker
language: zh-CN
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [射线跟踪, ray tracing, 信道仿真, MIMO, 5G, 6G, 数字孪生, MetaRadio]
design_hint: 主色 navy/blue；封面深色；可使用堆栈/数据卡/规格表组件；2 页 A4
---

# Hero

- **Badge:** Datasheet · L1 / Ray Tracing Simulation
- **Eyebrow:** 产品策略三层结构 · 第一层
- **Headline:** 洞见电磁世界
- **Headline-em:** 确定性射线跟踪仿真引擎
- **Sub:** Lauraycs 以物理学第一性原理，精确复现电磁波在真实三维环境中的反射、绕射与穿透。把不可见的电磁信号，变成可知、可测、可预测的工程对象，为通信、感知与定位的下一代研发提供高保真信道与覆盖数据。

## Hero Metrics

| Value | Label |
| --- | --- |
| L3 级 | 动态仿真能力，业界领先 |
| ≤ 325 GHz | 频段覆盖，含 sub-THz |
| 全平台 | Windows / Linux / macOS / 麒麟 |

# Challenge · 时代挑战

**Title:** 为何无线预测依然困难？
**Description:** 从自动驾驶到智能工厂、从低空经济到 6G，无线连接已成为关键基础设施。但物理世界的复杂性，让依赖统计模型的传统预测方法在保真度、可重复性与极端场景覆盖上全面失效。

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 📈 | 场景的动态复杂性 | 移动的车辆、机器人和人群实时改变着信号传播路径，传统静态、统计模型无法捕捉时变多径与多普勒。 |
| 🏢 | 环境的独特性 | 每个工厂、每条街道、每架飞行的低空走廊都独一无二，"平均"统计模型无法反映特定场景的性能瓶颈。 |
| 💰 | 物理测试的局限 | 真实路测/外场测试成本高、耗时长、不可复现，已成为产品研发与网络部署的严重瓶颈。 |

# Solution · 我们的方案

**Title:** 用确定性射线跟踪构建电磁空间的数字孪生
**Description:** 不依赖"猜测"，以物理学为第一性原理，精确复现电磁波在真实三维环境中的每一次反射、绕射和穿透，将物理世界 1:1 映射到数字空间。Lauraycs 提供从 3D 场景输入、信道生成到工程化输出的端到端能力。

## Solution Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🎯 | 确定性预测 | 基于精确 3D 场景与物理规律，输出"所见即所得"的多径、覆盖与时变结果，而非模糊的统计概率。 |
| 🔬 | 高保真还原 | 精确计算每条多径的强度、时延、AoA/AoD/ZoA/ZoD 与多普勒，可通过实测校正进一步收敛误差。 |
| ♻️ | 无限次可重复 | 在数字世界零成本复现任意危险/极端场景，加速产品迭代、算法验证与网络规划。 |

# Architecture · 工作流

**Title:** 从 3D 场景到工程可用信道，四步闭环
**Description:** Lauraycs 兼容业界主流 3D 数据源、天线模型与材料库，输出格式直接对接信道仿真仪、链路仿真器与系统级仿真平台。

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | 场景与素材输入 | OSM / IFC / CityGML / OBJ / FBX 3D 模型，支持电磁材料库与频变参数。 |
| 02 | 配置 Tx / Rx / 轨迹 | 任意天线方向图、阵列几何、UE/BS/星载/机载链路与运动轨迹。 |
| 03 | RT 引擎计算 | GPU 加速的混合 SBR/Image/UTD 算法，按需选择精度与速度档位。 |
| 04 | 工程化输出 | CIR / PDP / RSRP / SINR 覆盖图、3GPP TR 38.901 兼容多径簇。 |

# Specifications · 技术规格

## Specs Table

| 项目 | 规格 |
| --- | --- |
| 算法 | SBR 弹跳射线 + Image 镜像法 + UTD 一致绕射 + 透射 + 散射；可配置最大反射/绕射/穿透阶数 |
| 频段 | 600 MHz – 325 GHz（含 FR1 / FR2 / FR3 / sub-THz） |
| 带宽 | 任意；典型支持 100 MHz / 400 MHz / 2 GHz 宽带快拍 |
| 天线 | 全向、定向、阵列（URA/ULA/球面）、自定义方向图（CST/HFSS/MAT 导入） |
| 多径输出 | 复数 CIR、PDP、AoA/AoD/ZoA/ZoD、Doppler、簇/子径分组 |
| 覆盖输出 | RSRP / RSRQ / SINR / 路径损耗 / 时延扩展，2D/3D 栅格 |
| 动态仿真 | L3 级时序仿真，支持任意可编程的时变场景与多 Tx/Rx 联合轨迹 |
| 标准对齐 | 3GPP TR 38.901 / 38.873、ITU-R P.2040 系列、IEEE 802.11 信道模型 |
| 操作系统 | Windows 10/11、Ubuntu/CentOS/Debian、macOS（含 Apple Silicon）、银河麒麟 |
| 加速 | GPU CUDA / OptiX；多卡并行；典型 10–100× CPU 提速 |
| 接口 | Python API、命令行批处理、HTTP/REST、MATLAB Toolbox |
| 部署 | 桌面 / 工作站 / 私有云 / 国产化集群（含 ARM）|

# Differentiators · 核心差异化

## Bullets

- **L3 级动态仿真，业界领先：** 真正的时序级仿真，逐时刻刷新多径、多普勒与覆盖，支持任意可编程的复杂动态交互。
- **频段覆盖到 325 GHz：** 单一引擎覆盖 5G FR1/FR2/FR3 与 6G sub-THz 仿真需求，避免多工具切换。
- **全栈国产化与跨平台：** 唯一原生支持麒麟与 Apple Silicon 的商用 RT 引擎，满足关键行业自主可控诉求。
- **3GPP 一致性可证：** 支持与 3GPP TR 38.901 PDP/簇统计直接对比，便于与现有标准链路仿真器互认。
- **工具链生态：** 与主流信道仿真仪、链路/系统仿真平台、数字孪生引擎已有现成对接案例。
- **可校正可解释：** 输出每条多径的物理来源（哪条墙面/边缘/穿透），支持与实测对比闭环优化。

# Applications · 典型应用

| Icon | Title | Text |
| --- | --- | --- |
| 📡 | 5G/6G 信道建模 | 为 Massive MIMO、波束赋形、RIS、ISAC 提供高保真多径数据，支撑算法验证与性能评估。 |
| 🚗 | V2X / 智能网联 | 复现城市峡谷、隧道、立交桥的复杂车路场景，验证车载天线与 T-Box 通信链路。 |
| 🛩 | 无人机与低空 | 仿真城市楼宇间复杂低空信道，规划无人机物流/巡检航线，保障 C2 链路连续性。 |
| 🛰 | 卫星 NTN | 模拟 LEO/GEO 信号在地面建筑群中的覆盖与穿透，评估天地协同终端性能。 |
| 🏭 | 工业与机器人 | 评估复杂产线的信号覆盖，保障 AGV/协作机器人的低时延高可靠通信。 |
| 📍 | 高精度定位 | 通过仿真多径效应校正 ToA/AoA 定位误差，实现复杂室内厘米级定位。 |

# Proof · 客户与生态

**Description:** Lauraycs 已在头部车企、卫星公司、运营商研究院、工业机器人企业的研发与测试流程中部署。同时与主流信道仿真仪与系统仿真平台保持深度集成。

## Proof Stats

| Value | Label |
| --- | --- |
| 30+ | 企业与研究机构客户 |
| 15+ | 集成的信道仿真/链路仿真工具链 |
| 100% | 自主知识产权与国产化 |

# CTA · 联系方式

- **Primary CTA:** 申请试用 Lauraycs
- **Email:** sales@metaradio.tech
- **Tagline:** 让不可见的信号，变得可知、可测、可预测。
- **Sub:** 乾径科技 MetaRadio · 电磁空间数字孪生专家
