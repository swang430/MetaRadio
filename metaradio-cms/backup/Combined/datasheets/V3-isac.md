---
brand: 乾径科技 MetaRadio
product: MetaRadio · ISAC Solution
type: vertical
vertical: isac
slug: v3-isac
title: ISAC 通感一体 · 让感知与通信在同一份电磁图中工作
audience: technical-decision-maker
language: zh-CN
version: 2026.04
contact_email: sales@metaradio.tech
keywords: [ISAC, 通感一体化, JCAS, 感知, 雷达, 通信, 多基站协同, 6G]
design_hint: 主色 navy/blue + emerald；强调"双输出"信道
---

# Hero

- **Badge:** Vertical Datasheet · ISAC / Integrated Sensing and Communication
- **Eyebrow:** 行业垂直市场解决方案
- **Headline:** 让感知与通信在同一份电磁图中工作
- **Headline-em:** ISAC 通感一体的电磁孪生
- **Sub:** ISAC 是 5G-A/6G 最具想象力的方向之一，但它也对信道建模与测试提出了新挑战：同一束信号同时承载通信与感知，回波、镜像、镜面与多径不再是干扰而是"信号"。乾径以三层产品同时输出感知雷达回波与通信多径，让 ISAC 算法、终端与网络可以在同一份高保真电磁孪生中开发与验证。

## Hero Metrics

| Value | Label |
| --- | --- |
| 双输出 | 感知回波 + 通信多径 |
| Bistatic / Multistatic | 多基站感知协同 |
| 5G-A / 6G | 标准对齐 |

# Challenge · ISAC 的建模与测试难题

**Title:** 通信与感知的"共生信道"，传统模型给不出答案
**Description:** 传统信道仿真只关心通信侧 PDP/CDL，雷达仿真只关心 RCS 与回波；ISAC 同时需要两者的物理一致性。多基站协同 (Bistatic/Multistatic) 感知更让"同一物体在不同链路上的回波是否一致"成为关键问题。

## Challenge Cards

| Icon | Title | Text |
| --- | --- | --- |
| 🎯 | 双输出一致性 | 同一时刻同一目标的通信多径与感知回波必须物理一致，传统工具难以同时给出。 |
| 🛰 | 多站协同感知 | Bistatic/Multistatic 配置下的几何与多径相互依赖，需要全场同时仿真。 |
| 🤖 | 算法与硬件迭代 | 感知算法、波形与硬件需要快速回归测试，但缺少可重复的高保真 ISAC 信道。 |

# Solution · 三层产品在 ISAC 的部署

**Title:** 一份射线跟踪，同时输出"通信信道 + 感知回波"
**Description:** Lauraycs 在同一次仿真中同时输出通信侧 CIR/PDP 和感知侧的目标回波（含 RCS、多径、Doppler），构成 ISAC 算法与硬件的统一信道源。L2 提供 ISAC 终端 HIL，L3 把 ISAC 网络做成可订阅的孪生服务。

## Stack Layers

| Layer | Layer Name | Description |
| --- | --- | --- |
| L1 | 射线跟踪 / Lauraycs | 同时输出感知回波与通信多径；支持目标 RCS、动目标轨迹、多基站协同。 |
| L2 | 虚拟路测 / HIL | 用 ISAC 信道驱动信道仿真仪与雷达测试台，对 ISAC 模组/终端做联合 HIL。 |
| L3 | 电磁孪生 / EM-Twin | 多基站 ISAC 网络的电磁态势孪生，作为感知服务的运行时基础设施。 |

# Architecture · 端到端工作流

## Workflow

| Step | Title | Desc |
| --- | --- | --- |
| 01 | 场景与目标建模 | 城市/园区/工厂 3D + 动目标（人车物）轨迹 + 目标 RCS 模型。 |
| 02 | ISAC 双输出仿真 | 同一仿真同时输出通信 CIR 与感知回波（含目标多径分解）。 |
| 03 | ISAC HIL | 信道仿真仪 + 雷达测试台联合驱动，回归感知与通信 KPI。 |
| 04 | 网络孪生服务 | 多基站感知态势孪生，提供目标级 API 与可视化。 |

# Specifications · 行业特定规格

## Specs Table

| 项目 | 规格 |
| --- | --- |
| 工作模式 | 通信、感知、ISAC 同模、ISAC 异模、Bistatic、Multistatic |
| 频段 | FR1 / FR2 / FR3 / sub-THz；典型 ISAC 频段 26/28/60/77/140 GHz |
| 感知输出 | 目标 RCS、距离-Doppler、AoA/AoD、回波多径簇、目标级标注 |
| 通信输出 | CIR/PDP、AoA/AoD/ZoA/ZoD、Doppler、3GPP TR 38.901 兼容 |
| 动目标 | 任意可编程轨迹；支持人、车、机器人、无人机；含微多普勒可选 |
| 标准对齐 | 3GPP ISAC 进展（Rel-19/20）、IEEE 802.11bf、ITU-R 6G 框架 |
| HIL 对接 | 通信信道仿真仪 + 雷达测试台 + ISAC 终端 OTA |
| 训练数据 | 自动产出标注的目标-信道双视角数据集，可用于 ISAC 算法训练 |
| 部署 | 私有云、GPU 集群；支持工厂/园区级部署 |

# Differentiators · 核心差异化

## Bullets

- **物理一致的双输出：** 通信多径与感知回波来自同一份射线追踪，避免人工拼接不一致。
- **多站协同原生支持：** Bistatic/Multistatic 几何下全场同时刷新，符合真实 ISAC 网络。
- **可标注训练数据：** 直接产出 ISAC 算法所需的目标级 + 信道级标注数据集。
- **覆盖多频段：** 从 FR1 一直到 sub-THz，单一引擎跨 5G-A/6G ISAC 研究路径。
- **HIL 与孪生联动：** 算法在 HIL 上回归后，可直接接入电磁孪生做现网态势评估。
- **可解释：** 每条回波/多径可追溯物理来源，便于算法 debug 与论文复现。

# Applications · 典型场景

| Icon | Title | Text |
| --- | --- | --- |
| 👥 | 人体动作感知 | 室内/园区基于 5G-A 信号的人员存在与姿态感知。 |
| 🚗 | 车路感知 | 路侧 ISAC 站对车辆/行人/非机动车的协同感知。 |
| 🏭 | 工厂安全 | 重型设备区域的人员闯入检测、AGV 路径感知。 |
| 🛩 | 低空感知 | 城市低空对小目标无人机的探测与跟踪。 |
| 🌳 | 城市态势 | 重点区域人车流密度与异常行为感知。 |
| 🤖 | 6G AI 训练 | 大规模高保真 ISAC 数据用于 AI-native 算法训练。 |

# Proof · 客户与生态

## Proof Stats

| Value | Label |
| --- | --- |
| 头部 | 国内 ISAC 研究院与设备商联合验证 |
| 论文 | 公开发表的 ISAC 仿真案例支撑 |
| 6G | 进入 6G 通感一体研究主流工具链 |

# CTA · 联系方式

- **Primary CTA:** 申请 ISAC 联合仿真方案
- **Email:** sales@metaradio.tech
- **Tagline:** 让感知与通信，在同一份电磁图中诞生。
- **Sub:** 乾径科技 MetaRadio · ISAC 垂直解决方案
