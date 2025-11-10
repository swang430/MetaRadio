/**
 * Case Studies 种子数据
 */

module.exports = [
  {
    slug: 'automotive-oem-v2x',
    locales: {
      zh: {
        title: '某车企 V2X 预部署验证',
        client: '某头部车企',
        industry: 'automotive',
        summary: '在虚拟环境中完成 V2X 场景覆盖测试，缩短 30% 验证周期。',
        challenge: '传统路测成本高、周期长，难以覆盖所有路口与隧道场景。',
        approach: '使用 HyperRT 构建城市三维模型，仿真 RSU 覆盖范围与车辆接收质量。',
        result: '提前识别 12 处信号盲区，优化部署方案后实测通过率达 98%。',
        kpi: [
          { label: '验证周期缩短', value: '30', unit: '%' },
          { label: '信号盲区识别', value: '12', unit: '处' },
          { label: '实测通过率', value: '98', unit: '%' },
        ],
      },
      en: {
        title: 'Automotive OEM V2X Pre-deployment Validation',
        client: 'Leading Automotive OEM',
        industry: 'automotive',
        summary: 'Completed V2X scenario coverage testing in virtual environments, reducing validation cycle by 30%.',
        challenge: 'Traditional drive tests are costly and time-consuming, unable to cover all intersection and tunnel scenarios.',
        approach: 'Built 3D city model with HyperRT to simulate RSU coverage and vehicle reception quality.',
        result: 'Identified 12 signal blind spots in advance; optimized deployment achieved 98% pass rate in field tests.',
        kpi: [
          { label: 'Cycle Reduction', value: '30', unit: '%' },
          { label: 'Blind Spots Found', value: '12', unit: 'sites' },
          { label: 'Field Pass Rate', value: '98', unit: '%' },
        ],
      },
    },
  },

  {
    slug: 'warehouse-amr-deployment',
    locales: {
      zh: {
        title: '智能仓储 AMR 网络优化',
        client: '某物流科技公司',
        industry: 'logistics',
        summary: '通过仿真优化仓库 WiFi 部署，保障 50+ AMR 稳定运行。',
        challenge: '仓库货架密集、金属反射严重，WiFi 信号覆盖不均。',
        approach: '建立仓库电磁模型，仿真不同 AP 位置下的信号分布与干扰。',
        result: 'AP 数量减少 20%，覆盖率提升至 99%，AMR 掉线率降低 85%。',
        kpi: [
          { label: 'AP 数量优化', value: '-20', unit: '%' },
          { label: '覆盖率提升', value: '99', unit: '%' },
          { label: '掉线率降低', value: '85', unit: '%' },
        ],
      },
      en: {
        title: 'Smart Warehouse AMR Network Optimization',
        client: 'Logistics Technology Company',
        industry: 'logistics',
        summary: 'Optimized warehouse WiFi deployment through simulation to ensure stable operation of 50+ AMRs.',
        challenge: 'Dense shelving and metal reflections caused uneven WiFi coverage in warehouses.',
        approach: 'Built warehouse EM model to simulate signal distribution and interference under different AP placements.',
        result: 'Reduced AP count by 20%, increased coverage to 99%, and decreased AMR disconnection rate by 85%.',
        kpi: [
          { label: 'AP Count Reduction', value: '-20', unit: '%' },
          { label: 'Coverage Rate', value: '99', unit: '%' },
          { label: 'Disconnect Reduction', value: '85', unit: '%' },
        ],
      },
    },
  },

  {
    slug: 'manufacturing-robot-network',
    locales: {
      zh: {
        title: '制造业 AGV 无线网络规划',
        client: '某汽车制造厂',
        industry: 'manufacturing',
        summary: '为汽车装配线 AGV 系统规划 5G 专网，实现零掉线目标。',
        challenge: '生产线密集金属设备导致信号多径严重，AGV 频繁掉线影响生产节拍。',
        approach: '基于工厂三维 CAD 建模，仿真 5G 小站覆盖与 AGV 运行轨迹，优化频点与功率。',
        result: '网络掉线率从 5% 降至接近 0，AGV 运行效率提升 25%。',
        kpi: [
          { label: '掉线率', value: '<0.1', unit: '%' },
          { label: 'AGV 效率提升', value: '25', unit: '%' },
          { label: '基站数量优化', value: '-15', unit: '%' },
        ],
      },
      en: {
        title: 'Manufacturing AGV Wireless Network Planning',
        client: 'Automotive Manufacturing Plant',
        industry: 'manufacturing',
        summary: 'Planned 5G private network for assembly line AGV system, achieving zero disconnection target.',
        challenge: 'Dense metal equipment caused severe signal multipath, leading to frequent AGV disconnections affecting production pace.',
        approach: 'Built 3D CAD model of factory, simulated 5G small cell coverage and AGV trajectories, optimized frequency and power.',
        result: 'Network disconnection rate dropped from 5% to near 0, AGV operational efficiency increased by 25%.',
        kpi: [
          { label: 'Disconnection Rate', value: '<0.1', unit: '%' },
          { label: 'AGV Efficiency', value: '+25', unit: '%' },
          { label: 'Base Station Reduction', value: '-15', unit: '%' },
        ],
      },
    },
  },

  {
    slug: 'uav-inspection-network',
    locales: {
      zh: {
        title: '电力巡检无人机网络覆盖',
        client: '某省电力公司',
        industry: 'energy',
        summary: '为山区输电线路巡检无人机规划 4G/5G 覆盖方案。',
        challenge: '山区地形复杂，传统地面基站覆盖不足，无人机信号时断时续。',
        approach: '结合地形 DEM 数据与无人机飞行路线，仿真不同高度的信号强度与切换性能。',
        result: '优化基站位置与天线参数，无人机全程信号覆盖率达 95%，视频回传稳定性提升 80%。',
        kpi: [
          { label: '覆盖率', value: '95', unit: '%' },
          { label: '视频稳定性', value: '+80', unit: '%' },
          { label: '巡检效率', value: '+40', unit: '%' },
        ],
      },
      en: {
        title: 'UAV Inspection Network Coverage for Power Lines',
        client: 'Provincial Power Company',
        industry: 'energy',
        summary: 'Planned 4G/5G coverage for power line inspection UAVs in mountainous areas.',
        challenge: 'Complex terrain resulted in insufficient coverage from traditional ground base stations, causing intermittent UAV signals.',
        approach: 'Combined terrain DEM data with UAV flight routes to simulate signal strength and handover performance at different altitudes.',
        result: 'Optimized base station positions and antenna parameters, achieving 95% signal coverage and 80% improvement in video transmission stability.',
        kpi: [
          { label: 'Coverage Rate', value: '95', unit: '%' },
          { label: 'Video Stability', value: '+80', unit: '%' },
          { label: 'Inspection Efficiency', value: '+40', unit: '%' },
        ],
      },
    },
  },

  {
    slug: 'satellite-iot-coverage',
    locales: {
      zh: {
        title: '卫星物联网全球覆盖仿真',
        client: '某卫星通信公司',
        industry: 'satellite',
        summary: '为 LEO 卫星星座规划地面终端覆盖与容量分配。',
        challenge: '低轨卫星快速移动，需要预测全球任意位置的可见卫星数量与信号质量。',
        approach: '基于轨道参数与地面站分布，仿真卫星运行轨迹与地面覆盖区域。',
        result: '识别覆盖盲区与热点区域，优化卫星数量与轨道参数，用户可达性提升 35%。',
        kpi: [
          { label: '覆盖盲区减少', value: '35', unit: '%' },
          { label: '用户可达性', value: '+35', unit: '%' },
          { label: '卫星利用率', value: '92', unit: '%' },
        ],
      },
      en: {
        title: 'Satellite IoT Global Coverage Simulation',
        client: 'Satellite Communications Company',
        industry: 'satellite',
        summary: 'Planned ground terminal coverage and capacity allocation for LEO satellite constellation.',
        challenge: 'Fast-moving LEO satellites require prediction of visible satellite count and signal quality at any global location.',
        approach: 'Simulated satellite trajectories and ground coverage based on orbital parameters and ground station distribution.',
        result: 'Identified coverage gaps and hotspots, optimized satellite count and orbital parameters, improving user reachability by 35%.',
        kpi: [
          { label: 'Coverage Gap Reduction', value: '35', unit: '%' },
          { label: 'User Reachability', value: '+35', unit: '%' },
          { label: 'Satellite Utilization', value: '92', unit: '%' },
        ],
      },
    },
  },

  {
    slug: '5g-metro-deployment',
    locales: {
      zh: {
        title: '城市地铁 5G 网络部署',
        client: '某移动运营商',
        industry: 'telecom',
        summary: '为地铁隧道与站台规划 5G 覆盖，保障乘客高速上网体验。',
        challenge: '隧道内多径严重、列车高速移动导致频繁切换，传统方案覆盖不足。',
        approach: '建立地铁三维模型，仿真漏缆与小站的覆盖与切换性能，优化部署方案。',
        result: '实现全线 99% 覆盖率，平均下载速率达 800 Mbps，切换成功率 99.5%。',
        kpi: [
          { label: '覆盖率', value: '99', unit: '%' },
          { label: '平均速率', value: '800', unit: 'Mbps' },
          { label: '切换成功率', value: '99.5', unit: '%' },
        ],
      },
      en: {
        title: 'Urban Metro 5G Network Deployment',
        client: 'Mobile Operator',
        industry: 'telecom',
        summary: 'Planned 5G coverage for metro tunnels and platforms to ensure high-speed internet for passengers.',
        challenge: 'Severe multipath in tunnels and high-speed train movement caused frequent handovers, with insufficient coverage from traditional solutions.',
        approach: 'Built 3D metro model to simulate leaky cable and small cell coverage and handover performance, optimizing deployment plan.',
        result: 'Achieved 99% coverage across entire line, average download speed of 800 Mbps, and 99.5% handover success rate.',
        kpi: [
          { label: 'Coverage Rate', value: '99', unit: '%' },
          { label: 'Average Speed', value: '800', unit: 'Mbps' },
          { label: 'Handover Success', value: '99.5', unit: '%' },
        ],
      },
    },
  },

  {
    slug: 'indoor-positioning-mall',
    locales: {
      zh: {
        title: '大型商场室内定位系统',
        client: '某商业地产公司',
        industry: 'retail',
        summary: '为购物中心部署 UWB 室内定位系统，实现米级精度导航。',
        challenge: '商场多楼层、复杂结构，WiFi 定位精度不足，无法满足精准导航需求。',
        approach: '仿真 UWB 锚点在不同位置的覆盖与定位精度，优化锚点数量与布局。',
        result: '定位精度达 0.5 米，锚点数量比初始方案减少 30%，系统成本降低 25%。',
        kpi: [
          { label: '定位精度', value: '0.5', unit: '米' },
          { label: '锚点优化', value: '-30', unit: '%' },
          { label: '成本降低', value: '25', unit: '%' },
        ],
      },
      en: {
        title: 'Indoor Positioning System for Large Shopping Mall',
        client: 'Commercial Real Estate Company',
        industry: 'retail',
        summary: 'Deployed UWB indoor positioning system for shopping center with meter-level precision navigation.',
        challenge: 'Multi-floor complex structure made WiFi positioning insufficient for precise navigation needs.',
        approach: 'Simulated UWB anchor coverage and positioning accuracy at different locations to optimize anchor count and layout.',
        result: 'Achieved 0.5-meter positioning accuracy, reduced anchor count by 30% from initial plan, lowered system cost by 25%.',
        kpi: [
          { label: 'Positioning Accuracy', value: '0.5', unit: 'm' },
          { label: 'Anchor Reduction', value: '-30', unit: '%' },
          { label: 'Cost Reduction', value: '25', unit: '%' },
        ],
      },
    },
  },

  {
    slug: 'mining-underground-communication',
    locales: {
      zh: {
        title: '矿山井下无线通信网络',
        client: '某矿业集团',
        industry: 'mining',
        summary: '为井下作业区域规划 WiFi6 网络，保障人员定位与通信安全。',
        challenge: '井下巷道狭长、拐弯多，传统 WiFi 覆盖不足且盲区多。',
        approach: '基于矿井三维模型，仿真不同 AP 位置的信号传播与覆盖范围。',
        result: '实现 98% 区域覆盖，AP 数量减少 20%，人员定位精度达 3 米。',
        kpi: [
          { label: '覆盖率', value: '98', unit: '%' },
          { label: 'AP 数量优化', value: '-20', unit: '%' },
          { label: '定位精度', value: '3', unit: '米' },
        ],
      },
      en: {
        title: 'Underground Mining Communication Network',
        client: 'Mining Group',
        industry: 'mining',
        summary: 'Planned WiFi6 network for underground work areas to ensure personnel positioning and communication safety.',
        challenge: 'Long narrow tunnels with many turns resulted in insufficient traditional WiFi coverage with many blind spots.',
        approach: 'Simulated signal propagation and coverage at different AP locations based on 3D mine model.',
        result: 'Achieved 98% area coverage, reduced AP count by 20%, and personnel positioning accuracy of 3 meters.',
        kpi: [
          { label: 'Coverage Rate', value: '98', unit: '%' },
          { label: 'AP Reduction', value: '-20', unit: '%' },
          { label: 'Positioning Accuracy', value: '3', unit: 'm' },
        ],
      },
    },
  },
];
