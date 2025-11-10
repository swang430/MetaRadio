/**
 * Articles 种子数据
 */

module.exports = [
  {
    slug: 'ray-tracing-basics',
    locales: {
      zh: {
        title: '射线跟踪技术入门：从原理到应用',
        excerpt: '深入浅出介绍射线跟踪在无线通信仿真中的基本原理与应用场景。',
        category: '技术原理',
        publishedAt: '2024-01-15',
        content: `
## 什么是射线跟踪

射线跟踪（Ray Tracing）是一种基于几何光学的电磁波传播建模方法，通过追踪电磁波在三维空间中的传播路径，计算反射、绕射、散射等物理现象，最终预测接收端的信号强度与质量。

## 核心优势

- **高精度**：可达 1-2 dB 误差基线，远超传统统计模型
- **高效率**：GPU 加速支持大规模场景仿真
- **可解释**：每条路径都有明确的物理意义，便于调试与优化

## 应用场景

1. 5G/6G 网络规划与优化
2. 车联网 V2X 覆盖仿真
3. 室内定位系统设计
4. 无人机通信网络规划
        `,
      },
      en: {
        title: 'Ray Tracing Basics: From Principles to Applications',
        excerpt: 'An accessible introduction to ray tracing principles and applications in wireless communication simulation.',
        category: 'Technical',
        publishedAt: '2024-01-15',
        content: `
## What is Ray Tracing

Ray tracing is a geometrical optics-based electromagnetic wave propagation modeling method that predicts signal strength and quality by tracking EM wave propagation paths in 3D space and calculating physical phenomena like reflection, diffraction, and scattering.

## Core Advantages

- **High Accuracy**: 1-2 dB error baseline, far exceeding traditional statistical models
- **High Efficiency**: GPU acceleration for large-scale scenario simulation
- **Interpretable**: Each path has clear physical meaning for easy debugging and optimization

## Application Scenarios

1. 5G/6G network planning and optimization
2. V2X coverage simulation
3. Indoor positioning system design
4. UAV communication network planning
        `,
      },
    },
  },

  {
    slug: 'digital-twin-for-wireless',
    locales: {
      zh: {
        title: '无线通信中的数字孪生技术',
        excerpt: '探讨如何利用数字孪生技术提升无线系统的可预测性与可维护性。',
        category: '行业洞察',
        publishedAt: '2024-02-20',
        content: `
## 数字孪生的定义

数字孪生是物理实体在虚拟空间中的精确映射，能够实时同步物理世界的状态，并通过仿真预测未来行为。

## 在无线通信中的应用

- **网络性能预测**：提前预知覆盖盲区与容量瓶颈
- **故障诊断与定位**：快速识别信号干扰源
- **优化方案验证**：在虚拟环境中测试部署方案

## 实现路径

1. 建立高精度三维场景模型
2. 集成实时测量数据
3. 运行射线跟踪仿真
4. 持续校准与优化
        `,
      },
      en: {
        title: 'Digital Twin Technology in Wireless Communications',
        excerpt: 'Exploring how digital twin technology improves predictability and maintainability of wireless systems.',
        category: 'Industry Insights',
        publishedAt: '2024-02-20',
        content: `
## Definition of Digital Twin

A digital twin is a precise virtual representation of a physical entity that synchronizes real-world states in real-time and predicts future behavior through simulation.

## Applications in Wireless Communications

- **Network Performance Prediction**: Anticipate coverage gaps and capacity bottlenecks
- **Fault Diagnosis**: Quickly identify interference sources
- **Optimization Validation**: Test deployment plans in virtual environments

## Implementation Path

1. Build high-precision 3D scene models
2. Integrate real-time measurement data
3. Run ray tracing simulations
4. Continuous calibration and optimization
        `,
      },
    },
  },

  {
    slug: 'v2x-technology-evolution',
    locales: {
      zh: {
        title: 'V2X 技术演进：从 LTE-V 到 5G-V2X',
        excerpt: '梳理车联网通信技术的发展历程，分析 5G-V2X 的技术优势与应用前景。',
        category: '行业洞察',
        publishedAt: '2024-03-10',
        content: `
## V2X 技术概述

V2X（Vehicle-to-Everything）是车辆与外界进行信息交换的通信技术，包括 V2V（车车通信）、V2I（车路通信）、V2P（车人通信）等。

## 从 LTE-V 到 5G-V2X

- **LTE-V2X**：基于 LTE 的车联网通信，支持基础安全类应用
- **5G-V2X**：低时延、高可靠性，支持自动驾驶级应用

## 关键技术挑战

1. 高速移动场景下的可靠通信
2. 复杂城市环境的覆盖优化
3. 超低时延的端到端保障

## 射线跟踪的价值

通过精确仿真 RSU 覆盖、隧道盲区、路口多径等场景，提前优化部署方案，降低实测成本。
        `,
      },
      en: {
        title: 'V2X Technology Evolution: From LTE-V to 5G-V2X',
        excerpt: 'Tracing the development of V2X communication technology and analyzing the technical advantages and prospects of 5G-V2X.',
        category: 'Industry Insights',
        publishedAt: '2024-03-10',
        content: `
## V2X Technology Overview

V2X (Vehicle-to-Everything) is communication technology for information exchange between vehicles and the external world, including V2V, V2I, and V2P.

## From LTE-V to 5G-V2X

- **LTE-V2X**: LTE-based V2X supporting basic safety applications
- **5G-V2X**: Low latency and high reliability for autonomous driving applications

## Key Technical Challenges

1. Reliable communication in high-speed scenarios
2. Coverage optimization in complex urban environments
3. Ultra-low latency end-to-end guarantee

## Value of Ray Tracing

Precisely simulate RSU coverage, tunnel blind spots, intersection multipath scenarios to optimize deployment and reduce field testing costs.
        `,
      },
    },
  },

  {
    slug: '5g-6g-network-evolution',
    locales: {
      zh: {
        title: '从 5G 到 6G：无线网络的演进方向',
        excerpt: '展望 6G 技术的发展趋势，探讨通感一体化、太赫兹通信等前沿方向。',
        category: '技术原理',
        publishedAt: '2024-04-05',
        content: `
## 5G 的成就与局限

5G 实现了 Gbps 级速率、毫秒级时延，但在覆盖范围、能耗、频谱效率等方面仍有提升空间。

## 6G 的关键技术方向

1. **太赫兹通信**：支持 100 Gbps 以上速率
2. **通感一体化**：融合通信与雷达感知
3. **空天地一体化**：卫星、无人机、地面网络融合
4. **AI 原生网络**：全流程 AI 优化

## 射线跟踪在 6G 中的作用

6G 频段更高、场景更复杂，传统统计模型失效，确定性射线跟踪成为必备工具。
        `,
      },
      en: {
        title: 'From 5G to 6G: The Evolution of Wireless Networks',
        excerpt: 'Exploring 6G technology trends including integrated sensing and communication, terahertz communication.',
        category: 'Technical',
        publishedAt: '2024-04-05',
        content: `
## 5G Achievements and Limitations

5G achieved Gbps-level rates and millisecond latency, but still has room for improvement in coverage, energy efficiency, and spectrum efficiency.

## Key 6G Technology Directions

1. **Terahertz Communication**: Supporting 100+ Gbps rates
2. **Integrated Sensing and Communication**: Merging communication and radar sensing
3. **Air-Space-Ground Integration**: Satellite, UAV, and terrestrial network convergence
4. **AI-Native Networks**: Full-process AI optimization

## Role of Ray Tracing in 6G

Higher frequencies and more complex scenarios in 6G make traditional statistical models obsolete, with deterministic ray tracing becoming essential.
        `,
      },
    },
  },

  {
    slug: 'mimo-ota-testing-fundamentals',
    locales: {
      zh: {
        title: 'MIMO OTA 测试基础：原理与挑战',
        excerpt: '介绍 MIMO 空口测试的基本原理、测试方法与技术挑战。',
        category: '技术原理',
        publishedAt: '2024-05-12',
        content: `
## MIMO OTA 测试的重要性

MIMO 技术是 5G 的核心，但传统传导测试无法评估天线性能，OTA（空口）测试成为必需。

## 主流测试方法

1. **暗室法**：模拟真实信道环境
2. **MPAC 法**：多探头暗室法
3. **动态 OTA**：模拟运动场景

## 技术挑战

- 空间连续性难以保证
- 多径环境难以复现
- 测试成本高

## 射线跟踪的辅助作用

通过仿真预测真实环境的多径特性，指导暗室参数配置，提升测试精度。
        `,
      },
      en: {
        title: 'MIMO OTA Testing Fundamentals: Principles and Challenges',
        excerpt: 'Introduction to MIMO over-the-air testing principles, methods, and technical challenges.',
        category: 'Technical',
        publishedAt: '2024-05-12',
        content: `
## Importance of MIMO OTA Testing

MIMO is core to 5G, but traditional conducted tests cannot evaluate antenna performance, making OTA testing essential.

## Mainstream Testing Methods

1. **Anechoic Chamber**: Simulating real channel environments
2. **MPAC**: Multi-probe anechoic chamber
3. **Dynamic OTA**: Simulating motion scenarios

## Technical Challenges

- Spatial continuity difficult to guarantee
- Multipath environments hard to reproduce
- High testing costs

## Auxiliary Role of Ray Tracing

Simulate multipath characteristics of real environments to guide chamber parameter configuration and improve testing accuracy.
        `,
      },
    },
  },

  {
    slug: 'material-modeling-for-em-simulation',
    locales: {
      zh: {
        title: '电磁仿真中的材质建模技术',
        excerpt: '探讨如何建立准确的材质参数库，提升射线跟踪仿真的精度。',
        category: '技术原理',
        publishedAt: '2024-06-18',
        content: `
## 材质参数的重要性

材料的电磁特性（介电常数、磁导率、电导率）直接影响电磁波的反射、透射与吸收，是仿真精度的关键。

## 材质参数获取方法

1. **文献查找**：利用已有测量数据
2. **实验测量**：使用网络分析仪测量
3. **反演校准**：根据实测信号反推参数

## 常见材质特性

- **混凝土**：εr ≈ 6-8，吸收较强
- **玻璃**：εr ≈ 6，透射为主
- **金属**：高反射，低透射

## 建立材质库的最佳实践

1. 分类管理（建筑、植被、地形等）
2. 版本控制与追溯
3. 持续校准与更新
        `,
      },
      en: {
        title: 'Material Modeling Techniques in EM Simulation',
        excerpt: 'Exploring how to build accurate material parameter libraries to improve ray tracing simulation accuracy.',
        category: 'Technical',
        publishedAt: '2024-06-18',
        content: `
## Importance of Material Parameters

EM properties of materials (permittivity, permeability, conductivity) directly affect reflection, transmission, and absorption, being key to simulation accuracy.

## Methods for Obtaining Material Parameters

1. **Literature Search**: Using existing measurement data
2. **Experimental Measurement**: Using network analyzers
3. **Inversion Calibration**: Deriving parameters from measured signals

## Common Material Characteristics

- **Concrete**: εr ≈ 6-8, strong absorption
- **Glass**: εr ≈ 6, mainly transmission
- **Metal**: High reflection, low transmission

## Best Practices for Building Material Libraries

1. Categorical management (building, vegetation, terrain)
2. Version control and traceability
3. Continuous calibration and updates
        `,
      },
    },
  },

  {
    slug: 'gpu-acceleration-for-ray-tracing',
    locales: {
      zh: {
        title: 'GPU 加速射线跟踪：原理与优化',
        excerpt: '分析 GPU 加速在射线跟踪中的应用，介绍性能优化技巧。',
        category: '技术原理',
        publishedAt: '2024-07-22',
        content: `
## 为什么需要 GPU 加速

射线跟踪计算量巨大，单条路径可能涉及数十次反射与绕射，大规模场景下 CPU 计算耗时数小时甚至数天。

## GPU 并行计算的优势

- **大规模并行**：数千核心同时计算
- **高带宽内存**：快速访问场景数据
- **专用加速单元**：如 RTX 光追核心

## 优化策略

1. **空间分割**：KD-tree、BVH 等加速结构
2. **路径剪枝**：舍弃弱信号路径
3. **批量处理**：多条射线同时追踪

## 实际效果

GPU 加速可将仿真时间从数小时缩短至数分钟，实现实时交互式仿真。
        `,
      },
      en: {
        title: 'GPU Acceleration for Ray Tracing: Principles and Optimization',
        excerpt: 'Analyzing GPU acceleration in ray tracing and introducing performance optimization techniques.',
        category: 'Technical',
        publishedAt: '2024-07-22',
        content: `
## Why GPU Acceleration is Needed

Ray tracing is computationally intensive, with a single path potentially involving dozens of reflections and diffractions, requiring hours or days on CPUs for large-scale scenarios.

## Advantages of GPU Parallel Computing

- **Massive Parallelism**: Thousands of cores computing simultaneously
- **High-Bandwidth Memory**: Fast access to scene data
- **Specialized Acceleration**: E.g., RTX ray tracing cores

## Optimization Strategies

1. **Spatial Partitioning**: KD-tree, BVH acceleration structures
2. **Path Pruning**: Discarding weak signal paths
3. **Batch Processing**: Tracing multiple rays simultaneously

## Practical Results

GPU acceleration can reduce simulation time from hours to minutes, enabling real-time interactive simulation.
        `,
      },
    },
  },

  {
    slug: 'integrated-sensing-communication-isac',
    locales: {
      zh: {
        title: '通感一体化（ISAC）技术前瞻',
        excerpt: '探讨通感一体化的技术原理、应用场景与未来发展。',
        category: '行业洞察',
        publishedAt: '2024-08-30',
        content: `
## 什么是通感一体化

ISAC（Integrated Sensing and Communication）是指在同一系统中同时实现通信与感知（如雷达）功能，共享频谱与硬件资源。

## 核心技术挑战

1. **波形设计**：兼顾通信与感知性能
2. **资源分配**：动态平衡频谱使用
3. **干扰管理**：通信与感知信号互不干扰

## 应用场景

- 自动驾驶：同时实现 V2X 通信与障碍物探测
- 智能工厂：机器人通信与环境感知
- 无人机：编队通信与避障

## 射线跟踪的支持

仿真通感一体化系统的雷达回波与通信信号，优化波形参数与部署方案。
        `,
      },
      en: {
        title: 'Integrated Sensing and Communication (ISAC) Technology Outlook',
        excerpt: 'Exploring ISAC technical principles, application scenarios, and future development.',
        category: 'Industry Insights',
        publishedAt: '2024-08-30',
        content: `
## What is ISAC

ISAC (Integrated Sensing and Communication) achieves both communication and sensing (e.g., radar) functions in the same system, sharing spectrum and hardware resources.

## Core Technical Challenges

1. **Waveform Design**: Balancing communication and sensing performance
2. **Resource Allocation**: Dynamically balancing spectrum use
3. **Interference Management**: Preventing mutual interference

## Application Scenarios

- Autonomous Driving: V2X communication + obstacle detection
- Smart Factory: Robot communication + environmental sensing
- UAV: Formation communication + collision avoidance

## Ray Tracing Support

Simulate radar echoes and communication signals in ISAC systems to optimize waveform parameters and deployment.
        `,
      },
    },
  },
];
