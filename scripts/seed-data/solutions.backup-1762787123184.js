/**
 * Solutions 种子数据
 */

module.exports = [
  {
    slug: 'virtual-drive-testing',
    locales: {
      zh: {
        title: '虚拟路测',
        excerpt: '以电磁数字孪生替代部分实车路测，降低成本、提升覆盖率。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '虚拟路测解决方案',
            summary: '通过高精度射线跟踪仿真，在虚拟环境中复现真实路况下的信号覆盖与性能。',
            ctaPrimary: { name: '了解更多', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '核心能力',
            items: [
              {
                icon: '🚗',
                title: '轨迹回放',
                description: '导入实际路测轨迹，精确重现车辆位置与天线姿态。',
              },
              {
                icon: '📊',
                title: 'KPI 输出',
                description: '自动生成 RSRP/SINR/吞吐量等关键指标报告。',
              },
              {
                icon: '🔄',
                title: 'AI 闭环',
                description: '结合实测数据校准模型，持续提升仿真准确度。',
              },
            ],
          },
          {
            __component: 'sections.stat-group',
            title: '性能指标',
            metrics: [
              { label: '成本降低', value: '40', unit: '%' },
              { label: '周期缩短', value: '50', unit: '%' },
              { label: '场景覆盖', value: '10x', unit: '' },
            ],
          },
        ],
      },
      en: {
        title: 'Virtual Drive Testing',
        excerpt: 'Replace physical drive tests with EM digital twin simulations to reduce costs and increase coverage.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Virtual Drive Testing Solution',
            summary: 'Reproduce real-world signal coverage and performance in virtual environments through high-precision ray tracing.',
            ctaPrimary: { name: 'Learn More', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Core Capabilities',
            items: [
              {
                icon: '🚗',
                title: 'Trajectory Replay',
                description: 'Import actual drive test routes to precisely recreate vehicle positions and antenna orientations.',
              },
              {
                icon: '📊',
                title: 'KPI Output',
                description: 'Automatically generate reports for key metrics like RSRP, SINR, and throughput.',
              },
              {
                icon: '🔄',
                title: 'AI Loop',
                description: 'Calibrate models with measured data to continuously improve simulation accuracy.',
              },
            ],
          },
          {
            __component: 'sections.stat-group',
            title: 'Performance Metrics',
            metrics: [
              { label: 'Cost Reduction', value: '40', unit: '%' },
              { label: 'Cycle Time', value: '-50', unit: '%' },
              { label: 'Scenario Coverage', value: '10x', unit: '' },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'robotics-connectivity',
    locales: {
      zh: {
        title: '机器人连接',
        excerpt: '为移动机器人提供可预测的无线覆盖与性能分析。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '机器人连接解决方案',
            summary: '在工厂、仓库等复杂环境中优化 AGV、AMR 的无线连接质量。',
            ctaPrimary: { name: '预约演示', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '核心能力',
            items: [
              {
                icon: '📶',
                title: '覆盖优化',
                description: '仿真不同 AP 位置，找到最优部署方案。',
              },
              {
                icon: '🔍',
                title: '盲区识别',
                description: '提前发现信号盲区和干扰热点。',
              },
              {
                icon: '⚙️',
                title: '运动预测',
                description: '模拟机器人运动轨迹，预测切换性能。',
              },
            ],
          },
        ],
      },
      en: {
        title: 'Robotics Connectivity',
        excerpt: 'Provide predictable wireless coverage and performance analysis for mobile robots.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Robotics Connectivity Solution',
            summary: 'Optimize wireless connectivity quality for AGVs and AMRs in complex environments like factories and warehouses.',
            ctaPrimary: { name: 'Book Demo', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Core Capabilities',
            items: [
              {
                icon: '📶',
                title: 'Coverage Optimization',
                description: 'Simulate different AP placements to find optimal deployment.',
              },
              {
                icon: '🔍',
                title: 'Blind Spot Detection',
                description: 'Identify signal dead zones and interference hotspots in advance.',
              },
              {
                icon: '⚙️',
                title: 'Motion Prediction',
                description: 'Simulate robot trajectories to predict handover performance.',
              },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'v2x-communications',
    locales: {
      zh: {
        title: 'V2X 车联网',
        excerpt: '为车路协同提供高精度的 V2X 覆盖仿真与部署优化。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'V2X 车联网解决方案',
            summary: '仿真 RSU 覆盖、V2V 通信、多场景验证，保障智能驾驶安全可靠。',
            ctaPrimary: { name: '了解详情', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '应用场景',
            items: [
              {
                icon: '🚦',
                title: '路口安全',
                description: '仿真红绿灯路口的 V2I 信号覆盖，确保碰撞预警可靠性。',
              },
              {
                icon: '🛣️',
                title: '高速公路',
                description: '验证长距离 V2V 编队通信性能。',
              },
              {
                icon: '🌉',
                title: '隧道/桥梁',
                description: '优化复杂场景下的 RSU 部署方案。',
              },
            ],
          },
        ],
      },
      en: {
        title: 'V2X Communications',
        excerpt: 'High-precision V2X coverage simulation and deployment optimization for vehicle-to-everything communications.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'V2X Communications Solution',
            summary: 'Simulate RSU coverage, V2V communication, and multi-scenario validation to ensure safe and reliable intelligent driving.',
            ctaPrimary: { name: 'Learn More', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Application Scenarios',
            items: [
              {
                icon: '🚦',
                title: 'Intersection Safety',
                description: 'Simulate V2I signal coverage at traffic lights to ensure collision warning reliability.',
              },
              {
                icon: '🛣️',
                title: 'Highway',
                description: 'Validate long-distance V2V platooning communication performance.',
              },
              {
                icon: '🌉',
                title: 'Tunnel/Bridge',
                description: 'Optimize RSU deployment in complex scenarios.',
              },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'uav-communications',
    locales: {
      zh: {
        title: '无人机通信',
        excerpt: '为无人机网络提供三维空间的覆盖仿真与链路预测。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '无人机通信解决方案',
            summary: '精确仿真无人机在不同高度、速度下的信号质量，优化地空通信网络。',
            ctaPrimary: { name: '预约咨询', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '核心能力',
            items: [
              {
                icon: '🚁',
                title: '三维覆盖',
                description: '仿真无人机在不同高度的信号覆盖与干扰。',
              },
              {
                icon: '📡',
                title: '动态链路',
                description: '预测高速移动场景下的链路质量与切换性能。',
              },
              {
                icon: '🌍',
                title: '大范围部署',
                description: '支持城市、郊区、农村等多场景仿真。',
              },
            ],
          },
        ],
      },
      en: {
        title: 'UAV Communications',
        excerpt: '3D coverage simulation and link prediction for UAV networks.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'UAV Communications Solution',
            summary: 'Accurately simulate signal quality at different altitudes and speeds to optimize air-to-ground networks.',
            ctaPrimary: { name: 'Schedule Consultation', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Core Capabilities',
            items: [
              {
                icon: '🚁',
                title: '3D Coverage',
                description: 'Simulate signal coverage and interference at different UAV altitudes.',
              },
              {
                icon: '📡',
                title: 'Dynamic Links',
                description: 'Predict link quality and handover performance in high-speed scenarios.',
              },
              {
                icon: '🌍',
                title: 'Wide-Area Deployment',
                description: 'Support simulation across urban, suburban, and rural scenarios.',
              },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'satellite-communications',
    locales: {
      zh: {
        title: '卫星通信',
        excerpt: '为卫星网络提供地面覆盖仿真与星地链路分析。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '卫星通信解决方案',
            summary: '仿真 LEO/MEO/GEO 卫星覆盖，优化地面终端部署与波束规划。',
            ctaPrimary: { name: '了解更多', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '应用场景',
            items: [
              {
                icon: '🛰️',
                title: 'LEO 星座',
                description: '仿真低轨卫星群的动态覆盖与切换。',
              },
              {
                icon: '📶',
                title: '地面终端',
                description: '优化用户终端天线指向与选址。',
              },
              {
                icon: '🌐',
                title: '全球覆盖',
                description: '支持大范围地形与建筑遮挡分析。',
              },
            ],
          },
        ],
      },
      en: {
        title: 'Satellite Communications',
        excerpt: 'Ground coverage simulation and satellite-to-ground link analysis for satellite networks.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Satellite Communications Solution',
            summary: 'Simulate LEO/MEO/GEO satellite coverage to optimize ground terminal deployment and beam planning.',
            ctaPrimary: { name: 'Learn More', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Application Scenarios',
            items: [
              {
                icon: '🛰️',
                title: 'LEO Constellation',
                description: 'Simulate dynamic coverage and handovers of low-orbit satellite networks.',
              },
              {
                icon: '📶',
                title: 'Ground Terminals',
                description: 'Optimize user terminal antenna pointing and site selection.',
              },
              {
                icon: '🌐',
                title: 'Global Coverage',
                description: 'Support large-scale terrain and building obstruction analysis.',
              },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'high-precision-positioning',
    locales: {
      zh: {
        title: '高精度定位',
        excerpt: '为室内外定位系统提供信号覆盖与精度仿真。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '高精度定位解决方案',
            summary: '仿真 UWB、5G、WiFi 等定位信号覆盖，优化锚点部署与算法参数。',
            ctaPrimary: { name: '预约演示', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '核心能力',
            items: [
              {
                icon: '📍',
                title: 'UWB 定位',
                description: '仿真 UWB 锚点覆盖，优化 TDOA/TOA 定位精度。',
              },
              {
                icon: '📶',
                title: '5G 定位',
                description: '基于射线追踪的 5G 定位信号仿真。',
              },
              {
                icon: '🏢',
                title: '室内定位',
                description: '支持复杂室内环境的多径分析与精度预测。',
              },
            ],
          },
        ],
      },
      en: {
        title: 'High-Precision Positioning',
        excerpt: 'Signal coverage and accuracy simulation for indoor and outdoor positioning systems.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'High-Precision Positioning Solution',
            summary: 'Simulate UWB, 5G, WiFi positioning signal coverage to optimize anchor deployment and algorithm parameters.',
            ctaPrimary: { name: 'Book Demo', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Core Capabilities',
            items: [
              {
                icon: '📍',
                title: 'UWB Positioning',
                description: 'Simulate UWB anchor coverage to optimize TDOA/TOA positioning accuracy.',
              },
              {
                icon: '📶',
                title: '5G Positioning',
                description: 'Ray tracing-based 5G positioning signal simulation.',
              },
              {
                icon: '🏢',
                title: 'Indoor Positioning',
                description: 'Support multipath analysis and accuracy prediction in complex indoor environments.',
              },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'integrated-sensing-communication',
    locales: {
      zh: {
        title: '通感一体化',
        excerpt: '为通感一体化系统提供感知与通信性能联合仿真。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '通感一体化解决方案',
            summary: '仿真 ISAC 系统的感知探测与通信性能，优化波形设计与资源分配。',
            ctaPrimary: { name: '了解详情', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '应用场景',
            items: [
              {
                icon: '🎯',
                title: '目标探测',
                description: '仿真雷达回波与目标识别性能。',
              },
              {
                icon: '📡',
                title: '通信性能',
                description: '同时评估数据传输质量与吞吐量。',
              },
              {
                icon: '⚖️',
                title: '资源优化',
                description: '平衡感知与通信的频谱资源分配。',
              },
            ],
          },
        ],
      },
      en: {
        title: 'Integrated Sensing and Communication',
        excerpt: 'Joint simulation of sensing and communication performance for ISAC systems.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Integrated Sensing and Communication Solution',
            summary: 'Simulate ISAC system sensing detection and communication performance to optimize waveform design and resource allocation.',
            ctaPrimary: { name: 'Learn More', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Application Scenarios',
            items: [
              {
                icon: '🎯',
                title: 'Target Detection',
                description: 'Simulate radar echoes and target recognition performance.',
              },
              {
                icon: '📡',
                title: 'Communication Performance',
                description: 'Simultaneously evaluate data transmission quality and throughput.',
              },
              {
                icon: '⚖️',
                title: 'Resource Optimization',
                description: 'Balance spectrum resource allocation between sensing and communication.',
              },
            ],
          },
        ],
      },
    },
  },

  {
    slug: '5g-6g-network-planning',
    locales: {
      zh: {
        title: '5G/6G 网络规划',
        excerpt: '为运营商提供精准的 5G/6G 网络规划与优化仿真。',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '5G/6G 网络规划解决方案',
            summary: '高精度射线跟踪仿真，支持大规模蜂窝网络的覆盖预测与容量规划。',
            ctaPrimary: { name: '预约咨询', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '核心能力',
            items: [
              {
                icon: '📡',
                title: '站点选址',
                description: '仿真不同站点位置的覆盖与容量，优化选址决策。',
              },
              {
                icon: '🎛️',
                title: '参数优化',
                description: '优化天线方位角、下倾角、功率等参数。',
              },
              {
                icon: '📊',
                title: 'KPI 预测',
                description: '预测 RSRP、SINR、吞吐量等关键性能指标。',
              },
              {
                icon: '🔄',
                title: '干扰分析',
                description: '识别同频干扰与邻区冲突。',
              },
            ],
          },
          {
            __component: 'sections.stat-group',
            title: '应用效果',
            metrics: [
              { label: '规划周期', value: '-40', unit: '%' },
              { label: '覆盖准确度', value: '95+', unit: '%' },
              { label: '投资优化', value: '20', unit: '%' },
            ],
          },
        ],
      },
      en: {
        title: '5G/6G Network Planning',
        excerpt: 'Precise 5G/6G network planning and optimization simulation for operators.',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '5G/6G Network Planning Solution',
            summary: 'High-precision ray tracing simulation supporting coverage prediction and capacity planning for large-scale cellular networks.',
            ctaPrimary: { name: 'Schedule Consultation', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Core Capabilities',
            items: [
              {
                icon: '📡',
                title: 'Site Selection',
                description: 'Simulate coverage and capacity at different site locations to optimize placement decisions.',
              },
              {
                icon: '🎛️',
                title: 'Parameter Optimization',
                description: 'Optimize antenna azimuth, tilt, power, and other parameters.',
              },
              {
                icon: '📊',
                title: 'KPI Prediction',
                description: 'Predict key performance indicators like RSRP, SINR, and throughput.',
              },
              {
                icon: '🔄',
                title: 'Interference Analysis',
                description: 'Identify co-channel interference and neighbor cell conflicts.',
              },
            ],
          },
          {
            __component: 'sections.stat-group',
            title: 'Application Results',
            metrics: [
              { label: 'Planning Cycle', value: '-40', unit: '%' },
              { label: 'Coverage Accuracy', value: '95+', unit: '%' },
              { label: 'Investment Optimization', value: '20', unit: '%' },
            ],
          },
        ],
      },
    },
  },
];
