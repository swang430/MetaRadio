// This file is converted from the original .ts file to standard CommonJS JavaScript.

const zhPages = {
  landing: {
    id: 1,
    attributes: {
      title: 'MetaRadio 首页',
      slug: 'landing',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '洞见电磁世界，精准预测未来连接',
          subhead: 'HyperRT · 数字孪生',
          summary: '乾径科技（HyperRT）以确定性射线跟踪为引擎，将复杂场景转化为可计算、可验证、可落地的电磁数字孪生。',
          ctaPrimary: { name: '探索应用领域', url: '/marketing/solutions' },
          ctaSecondary: { name: '预约演示', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: '连接无处不在，为何预测依然困难？',
          intro: '从自动驾驶到智能工厂，电磁环境的动态复杂性让传统测试手段难以覆盖全部场景。',
          items: [
            {
              icon: '📡',
              title: '场景的动态复杂性',
              description: '移动的车辆、机器人与人群不断改变传播路径，要求模型实时更新。',
            },
            {
              icon: '🏭',
              title: '环境的极端差异',
              description: '材料、电气设备与空间布局完全不同，无法套用同一参数。',
            },
            {
              icon: '🧪',
              title: '物理测试的高成本',
              description: '长周期路测与暗室实验昂贵且难复现，阻碍快速迭代。',
            },
          ],
        },
        {
          __component: 'content.media-block',
          title: '我们的方案：构建精细化电磁数字孪生',
          body: '<p>HyperRT 引擎融合高精度三维几何、材质库与射线跟踪算法，覆盖场景建模、仿真计算与指标输出的全流程。</p><ul><li>支持 CAD / GIS / LiDAR 多源数据导入</li><li>仿真结果与实测数据闭环校准</li><li>通过 API 与脚本接入现有研发流程</li></ul>',
          orientation: 'right',
          actions: [{ name: '了解 HyperRT 产品', url: '/marketing/products' }],
        },
        {
          __component: 'sections.tech-flow',
          title: '一体化仿真流程',
          intro: '从原始数据到部署决策的全过程由五大模块衔接。',
          steps: [
            { name: '场景构建', desc: '整合 CAD / GIS / 点云，生成高精度三维模型。' },
            { name: '材质建模', desc: '根据测量数据配置介质、电参数与边界条件。' },
            { name: '射线追踪', desc: '计算反射、绕射、散射与穿透路径，获得全矢量场。' },
            { name: '算力调度', desc: 'CPU/GPU 异构加速，支持批量仿真与参数扫描。' },
            { name: '指标导出', desc: '输出功率延迟、路径损耗、KPI 与 API 接口。' },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: '值得信赖的领先指标',
          description: '我们持续对比实测数据，保证仿真精度与可扩展性。',
          metrics: [
            { label: '部署规模', value: '120+', unit: '套' },
            { label: '误差基线', value: '<=1.5', unit: 'dB' },
            { label: '频段范围', value: '0.1-325', unit: 'GHz' },
          ],
        },
        {
          __component: 'sections.cta-banner',
          title: '开启可预测的连接体验',
          body: '联系我们的技术顾问，获取行业场景演示与联合测试方案。',
          links: [
            { name: '预约演示', url: 'mailto:sales@metaradio.tech?subject=预约MetaRadio演示' },
            { name: '浏览解决方案', url: '/marketing/solutions' },
          ],
        },
      ],
    },
  },
  solutions: {
    id: 3,
    attributes: {
      title: '解决方案',
      slug: 'solutions',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '行业解决方案',
          summary: '覆盖虚拟路测、机器人、V2X、高精定位等场景，以电磁数字孪生驱动可预测的部署表现。',
          ctaPrimary: { name: '联系顾问', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: '典型场景',
          intro: '以下区块会由 CMS 动态填充各类解决方案。',
          items: [],
        },
      ],
    },
  },
  cases: {
    id: 6,
    attributes: {
      title: '成功案例',
      slug: 'cases',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '跨行业成功案例',
          summary: '运营商、工业、汽车等客户借助 MetaRadio 加速验证与部署。',
        },
      ],
    },
  },
  blog: {
    id: 7,
    attributes: {
      title: '洞察',
      slug: 'blog',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '洞察与指南',
          summary: '聚焦射线追踪、OTA、虚拟路测的实战经验与方法论。',
        },
      ],
    },
  },
  resources: {
    id: 8,
    attributes: {
      title: '资料中心',
      slug: 'resources',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '资料与白皮书',
          summary: '获取产品白皮书、规格资料与演示内容，支持销售与交付团队协作。',
        },
        {
          __component: 'sections.feature-grid',
          title: '精选资料',
          intro: '以下卡片将由 Strapi 资源列表自动填充。',
          items: [],
        },
      ],
    },
  },
  products: {
    id: 2,
    attributes: {
      title: '核心产品',
      slug: 'products',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '核心产品矩阵',
          summary:
            'MetaRadio 提供覆盖通信研发与验证的完整产品组合，兼容主流 CAD、天线与 OTA 工具链。',
          ctaPrimary: { name: '预约演示', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: '产品组合',
          items: [
            { title: 'Hyper-RT 一体机', description: '高性能射线追踪引擎，支持批量算例与接口导出。' },
            { title: '动态 OTA 工具链', description: '覆盖暗室、转台与行驶场景的 OTA 测试系统。' },
            { title: '虚拟路测平台', description: '自动化轨迹回放与仿真校准，实现城市级部署。' },
          ],
        },
        {
          __component: 'sections.bullet-list',
          title: '产品亮点',
          items: [
            { title: '高保真引擎', description: '支持反射、绕射、透射等多径建模，兼容毫米波场景。' },
            { title: '开放接口', description: 'REST/SDK/API 多形态输出，便于二次开发。' },
            { title: '全流程协同', description: '仿真、测量、回放闭环，助力快速迭代。' },
          ],
        },
      ],
    },
  },
  capabilities: {
    id: 4,
    attributes: {
      title: '技术能力',
      slug: 'capabilities',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '技术能力体系',
          summary: '从材料建模、射线追踪到 AI 调优，构建高保真且可执行的电磁数字孪生。',
        },
        {
          __component: 'sections.bullet-list',
          title: '核心能力',
          items: [
            { title: '材质参数化', description: '支持多种介质库与测量导入，提升仿真准确度。' },
            { title: '多径求解', description: '面向室内外复杂场景的反射、绕射、散射计算。' },
            { title: 'AI 闭环', description: '结合实测反馈自动调参，持续优化覆盖表现。' },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: '性能指标',
          metrics: [
            { label: '射线追踪精度', value: '95', unit: '%' },
            { label: '仿真速度', value: '10', unit: 'x' },
            { label: 'AI 收敛周期', value: '3', unit: '天' },
          ],
        },
      ],
    },
  },
  company: {
    id: 5,
    attributes: {
      title: '关于我们',
      slug: 'company',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '关于 MetaRadio',
          summary: '我们以射线跟踪与电磁仿真为核心，服务通信、汽车与新兴行业的连接体验。',
        },
        {
          __component: 'content.media-block',
          title: '使命与定位',
          body: '<p>通过电磁数字孪生，让复杂场景下的连接表现可预测、可验证、可部署。</p>',
          orientation: 'right',
          actions: [{ name: '联系团队', url: '/contact' }],
        },
      ],
    },
  },
};

const enPages = {
  landing: {
    id: 11,
    attributes: {
      title: 'MetaRadio Landing',
      slug: 'landing',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'See the Electromagnetic World Clearly',
          subhead: 'HyperRT · Digital Twin',
          summary: 'HyperRT turns complex RF environments into predictable, verifiable digital twins for deployment.',
          ctaPrimary: { name: 'Explore solutions', url: '/marketing/solutions' },
          ctaSecondary: { name: 'Book a demo', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: 'Why is reliable prediction still so difficult?',
          intro: 'Moving vehicles, reflective factories, and dense cities continuously reshape propagation paths.',
          items: [
            {
              icon: '🌐',
              title: 'Dynamic scenes',
              description: 'Robots, vehicles, and people create ever-changing multipath conditions.',
            },
            {
              icon: '🏙️',
              title: 'Unique environments',
              description: 'Every facility has different materials and geometry — no single template works.',
            },
            {
              icon: '🧪',
              title: 'Costly field tests',
              description: 'Drive tests and chamber campaigns consume weeks of effort yet remain hard to reproduce.',
            },
          ],
        },
        {
          __component: 'content.media-block',
          title: 'Build an electromagnetic digital twin',
          body: '<p>Our engine fuses high-fidelity geometry, material libraries, and deterministic ray tracing to deliver engineering-grade insight.</p><ul><li>Multi-source ingestion for CAD, GIS, and LiDAR data</li><li>Closed-loop calibration against measurements</li><li>API-first outputs that plug into existing workflows</li></ul>',
          orientation: 'right',
          actions: [{ name: 'Meet HyperRT', url: '/marketing/products' }],
        },
        {
          __component: 'sections.tech-flow',
          title: 'Integrated simulation workflow',
          intro: 'Five tightly coupled modules cover the end-to-end lifecycle from scenario ingestion to KPI delivery.',
          steps: [
            { name: 'Scenario ingestion', desc: 'Normalize CAD, GIS, and point-cloud data into simulation-ready meshes.' },
            { name: 'Material modelling', desc: 'Assign frequency-dependent parameters from trusted libraries or measurements.' },
            { name: 'Deterministic solver', desc: 'Track reflections, diffractions, scattering, and penetration paths.' },
            { name: 'Acceleration', desc: 'Leverage CPU/GPU clusters for batch runs and parameter sweeps.' },
            { name: 'Insights delivery', desc: 'Export ray data, RF KPIs, and APIs that connect to downstream tooling.' },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: 'Trusted performance benchmarks',
          description: 'Validated with tier-one operators and OEMs across automotive, industrial, and aerospace scenarios.',
          metrics: [
            { label: 'DEPLOYMENTS', value: '120+' },
            { label: 'MEDIAN ERROR', value: '<=1.5', unit: 'dB' },
            { label: 'FREQUENCY RANGE', value: '0.1-325', unit: 'GHz' },
          ],
        },
        {
          __component: 'sections.cta-banner',
          title: 'Start your precise prediction journey',
          body: 'Let our engineering team walk you through reference deployments and joint validation workflows.',
          links: [
            { name: 'Book a demo', url: 'mailto:sales@metaradio.tech?subject=MetaRadio%20Demo' },
            { name: 'Explore solutions', url: '/marketing/solutions' },
          ],
        },
      ],
    },
  },
  solutions: {
    id: 13,
    attributes: {
      title: 'Solutions',
      slug: 'solutions',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Industry Solutions',
          summary: 'Virtual drive, robotics, V2X, and positioning programs run on MetaRadio’s electromagnetic twins.',
          ctaPrimary: { name: 'Talk to an expert', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: 'Solution catalog',
          intro: 'This placeholder grid is replaced by Strapi content at runtime.',
          items: [],
        },
      ],
    },
  },
  cases: {
    id: 16,
    attributes: {
      title: 'Case Studies',
      slug: 'cases',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Case studies',
          summary: 'Carriers, factories, and automotive teams shorten validation cycles with MetaRadio.',
        },
      ],
    },
  },
  blog: {
    id: 17,
    attributes: {
      title: 'Insights',
      slug: 'blog',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Insights & Guides',
          summary: 'Stories about ray tracing, OTA validation, and virtual drive testing.',
        },
      ],
    },
  },
  resources: {
    id: 18,
    attributes: {
      title: 'Resources',
      slug: 'resources',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Resource center',
          summary: 'Whitepapers, spec sheets, and demo kits to keep stakeholders aligned.',
        },
        {
          __component: 'sections.feature-grid',
          title: 'Featured resources',
          intro: 'Actual resource cards are injected based on Strapi content.',
          items: [],
        },
      ],
    },
  },
  products: {
    id: 12,
    attributes: {
      title: 'Products',
      slug: 'products',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Product Portfolio',
          summary:
            'Ray-tracing solvers, dynamic OTA toolchains, and virtual drive platforms for communications R&D.',
          ctaPrimary: { name: 'Book a demo', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: 'Products',
          items: [
            { title: 'Hyper-RT Appliance', description: 'Batch ray tracing with exportable datasets.' },
            { title: 'Dynamic OTA Toolchain', description: 'Chamber, turntable, and drive-by OTA validation.' },
            { title: 'Virtual Drive Platform', description: 'AI-assisted calibration across complex city routes.' },
          ],
        },
        {
          __component: 'sections.bullet-list',
          title: 'Highlights',
          items: [
            { title: 'High-fidelity solver', description: 'Captures reflections, diffractions, and transmissions for mmWave.' },
            { title: 'Open interfaces', description: 'REST/SDK integrations that connect to downstream workflows.' },
            { title: 'Closed-loop workflow', description: 'Simulation, measurement, and replay in one toolchain.' },
          ],
        },
      ],
    },
  },
  capabilities: {
    id: 14,
    attributes: {
      title: 'Capabilities',
      slug: 'capabilities',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Technology Stack',
          summary: 'Material modelling, ray-tracing solvers, and AI calibration for actionable digital twins.',
        },
        {
          __component: 'sections.bullet-list',
          title: 'Key capabilities',
          items: [
            { title: 'Material parametrisation', description: 'Extensive libraries and measurement ingestion pipelines.' },
            { title: 'Multi-path solvers', description: 'Indoor/outdoor reflections, diffractions, and scattering.' },
            { title: 'AI closed loop', description: 'Leverage field feedback to auto-tune coverage models.' },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: 'Performance metrics',
          metrics: [
            { label: 'Ray-tracing accuracy', value: '95', unit: '%' },
            { label: 'Simulation speed', value: '10', unit: 'x' },
            { label: 'AI convergence', value: '3', unit: 'days' },
          ],
        },
      ],
    },
  },
  company: {
    id: 15,
    attributes: {
      title: 'About MetaRadio',
      slug: 'company',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'About MetaRadio',
          summary: 'We deliver ray-tracing powered channel intelligence for communications, automotive, and emerging industries.',
        },
        {
          __component: 'content.media-block',
          title: 'Our mission',
          body: '<p>Make connectivity predictable in the most complex environments through electromagnetic digital twins.</p>',
          orientation: 'right',
          actions: [{ name: 'Contact the team', url: '/contact' }],
        },
      ],
    },
  },
};

const zhSolutions = [
  {
    id: 1,
    attributes: {
      title: '虚拟路测',
      slug: 'virtual-drive',
      locale: 'zh',
      excerpt: '结合数字孪生与射线跟踪，实现可重复的通信路测验证。',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '虚拟路测解决方案',
          summary: '基于真实城市模型和射线跟踪仿真，重建车辆行驶过程中的信道变化，实现闭环优化。',
          ctaPrimary: { name: '预约演示', url: '/contact' },
          ctaSecondary: { name: '浏览成功案例', url: '/marketing/cases/virtual-drive-platform' },
        },
        {
          __component: 'sections.feature-grid',
          title: '典型能力',
          intro: '覆盖从数据采集、仿真评估到指标输出的全流程能力。',
          items: [
            { title: '轨迹复现', description: '导入 GPS 与 IMU 数据，复现车辆行驶路径。' },
            { title: '设备抽象', description: '统一建模天线、终端与基站参数，支持多频段。' },
            { title: '仿真-实测对比', description: '实时对比 KPI，快速定位网络盲点。' },
          ],
        },
        {
          __component: 'sections.bullet-list',
          title: '落地亮点',
          intro: '从算法、算力到部署交付，全面提升虚拟路测效率。',
          items: [
            { title: '高精度建模', description: '厘米级场景建模与材质管理，保留关键传播特征。' },
            { title: '自动化流程', description: '仿真、测量、校准全流程自动化，缩短优化周期。' },
            { title: '开放接口', description: '支持 REST / SDK 接入现有测试平台与数据看板。' },
          ],
        },
        {
          __component: 'content.media-block',
          title: '测前预估到测后复现的一体化闭环',
          body: '<p>在复杂城市道路上，通过虚拟路测提前定位关键路段，结合实测数据自动校准模型，显著降低现场排障与重复测试成本。</p>',
          actions: [{ name: '查看技术能力', url: '/marketing/products' }],
          media: { url: '/img/placeholder-solution.jpg', alt: '虚拟路测示意图' },
        },
        {
          __component: 'sections.tech-flow',
          title: '交付流程',
          intro: '五个阶段完成从场景采集到部署上线。',
          steps: [
            { name: '数据采集', desc: '采集道路、周边建筑、交通设施等环境信息。' },
            { name: '模型构建', desc: '建立城市级几何与材质模型，生成仿真场景。' },
            { name: '方案仿真', desc: '基于虚拟路测进行覆盖、切换、干扰评估。' },
            { name: '方案验证', desc: '将仿真结果与实测数据闭环比对，迭代优化。' },
            { name: '上线交付', desc: '输出部署指南、接口脚本与持续优化工具。' },
          ],
        },
        {
          __component: 'sections.case-showcase',
          title: '成功案例',
          intro: '虚拟路测驱动 5G 调优',
          cases: [
            {
              title: '虚拟路测驱动 5G 调优',
              slug: 'virtual-drive-platform',
              client: '华东 5G 运营商',
              summary: '城市级数字孪生替代大规模实地路测，将优化周期缩短 60%。',
            },
          ],
        },
        {
          __component: 'sections.cta-banner',
          title: '获取行业解决方案',
          body: '了解虚拟路测如何帮助运营商与车厂缩短网络优化周期。',
          links: [
            { name: '下载资料', url: '/marketing/resources' },
            { name: '联系我们', url: '/contact' },
          ],
        },
      ],
    },
  },
];

const enSolutions = [
  {
    id: 101,
    attributes: {
      title: 'Virtual Drive Testing',
      slug: 'virtual-drive',
      locale: 'en',
      excerpt: 'Ray-tracing powered virtual drive environments for repeatable network validation.',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Virtual Drive Testing',
          summary: 'Replay complex urban routes with physics-accurate ray tracing to optimise coverage before vehicles hit the road.',
          ctaPrimary: { name: 'Talk to an expert', url: '/contact' },
          ctaSecondary: { name: 'View case study', url: '/marketing/cases/virtual-drive-platform' },
        },
        {
          __component: 'sections.feature-grid',
          title: 'Key capabilities',
          intro: 'A single workflow covering scenario ingestion, physics simulation, and KPI reporting.',
          items: [
            { title: 'Route replay', description: 'Ingest GPS/IMU logs and reproduce drive scenarios in a digital twin.' },
            { title: 'Device abstraction', description: 'Model antennas, radios, and network nodes across frequency bands.' },
            { title: 'Sim/measurement fusion', description: 'Compare KPIs in real time to locate coverage gaps faster.' },
          ],
        },
        {
          __component: 'sections.bullet-list',
          title: 'Why teams adopt virtual drive testing',
          intro: 'Reduce field testing time while improving root-cause analysis.',
          items: [
            { title: 'Faster hypothesis testing', description: 'Run dozens of what-if scenarios before vehicles leave the garage.' },
            { title: 'Consistent KPI tracking', description: 'Align engineering and operations teams with shared metrics dashboards.' },
            { title: 'Open integration', description: 'APIs designed to plug into existing RF planning and automation workflows.' },
          ],
        },
        {
          __component: 'content.media-block',
          title: 'Close the loop between lab and field',
          body: '<p>Deploy a digital twin alongside physical drive campaigns to pre-qualify routes, focus field crews on the highest risk segments, and turn measured KPIs into continuous simulation updates.</p>',
          actions: [{ name: 'Explore product portfolio', url: '/marketing/products' }],
          media: { url: '/img/placeholder-solution.jpg', alt: 'Virtual drive illustration' },
        },
        {
          __component: 'sections.tech-flow',
          title: 'Delivery workflow',
          intro: 'Five stages take you from data collection to network optimisation insights.',
          steps: [
            { name: 'Data ingestion', desc: 'Combine GIS, LiDAR, and traffic datasets into a simulation-ready scene.' },
            { name: 'Model calibration', desc: 'Assign materials and verify propagation parameters using existing measurements.' },
            { name: 'Scenario execution', desc: 'Run deterministic ray tracing for critical mobility routes.' },
            { name: 'Result analysis', desc: 'Compare simulated KPIs with measurement campaigns and flag divergences.' },
            { name: 'Actionable outputs', desc: 'Deliver deployment guidance, APIs, and automation hooks.' },
          ],
        },
        {
          __component: 'sections.case-showcase',
          title: 'Featured case study',
          intro: 'Virtual Drive Accelerates 5G Optimization',
          cases: [
            {
              title: 'Virtual Drive Accelerates 5G Optimization',
              slug: 'virtual-drive-platform',
              client: 'Eastern China Carrier',
              summary: 'City-scale twins replaced high-cost field testing, cutting optimisation cycles by 60%.',
            },
          ],
        },
        {
          __component: 'sections.cta-banner',
          title: 'Bring virtual drive into your workflow',
          body: 'Schedule a workshop with our engineering team to explore datasets and integration options.',
          links: [
            { name: 'View resources', url: '/marketing/resources' },
            { name: 'Book a demo', url: '/contact' },
          ],
        },
      ],
    },
  },
];

const zhCaseStudies = [
  {
    id: 1,
    attributes: {
      title: '虚拟路测驱动 5G 调优',
      slug: 'virtual-drive-platform',
      client: '华东 5G 运营商',
      summary: '以数字孪生替代高成本实地路测，显著缩短网络调优周期。',
      challenge:
        '<p>城市道路密集、反射面众多，传统路测耗时长且难以覆盖全部关键路段，优化节奏受到限制。</p>',
      approach:
        '<p>构建城市级电磁数字孪生，导入道路、建筑与车辆数据；通过虚拟路测评估覆盖表现，并与实测数据闭环校准。</p>',
      result:
        '<p>优化周期缩短 60%，站点扩容方案提前锁定；虚拟路测成为常态化网络评估工具。</p>',
      kpi: [
        { label: '覆盖提升', value: '12%', unit: '' },
        { label: '优化周期', value: '-60%', unit: '' },
        { label: '测试成本', value: '-45%', unit: '' },
      ],
    },
  },
];

const enCaseStudies = [
  {
    id: 101,
    attributes: {
      title: 'Virtual Drive Accelerates 5G Optimization',
      slug: 'virtual-drive-platform',
      client: 'Eastern China Carrier',
      summary: 'City-scale twins replaced high-cost field testing and drastically reduced optimisation cycles.',
      challenge:
        '<p>Dense downtown corridors demand granular RF insight, yet physical drive tests cannot cover every route efficiently.</p>',
      approach:
        '<p>Built a city-scale electromagnetic twin, replayed priority routes virtually, and fused KPIs with real-world measurements for calibration.</p>',
      result:
        '<p>Reduced optimisation lead time by 60%, unlocked data-driven rollout decisions, and institutionalised virtual drive testing.</p>',
      kpi: [
        { label: 'Coverage gain', value: '+12%', unit: '' },
        { label: 'Optimisation cycle', value: '-60%', unit: '' },
        { label: 'Field test cost', value: '-45%', unit: '' },
      ],
    },
  },
];

const zhArticles = [
  {
    id: 1,
    attributes: {
      title: '射线跟踪如何加速 OTA 验证',
      slug: 'ray-tracing-ota',
      excerpt: '解读射线跟踪在 OTA 场景中的作用。',
      content:
        '<p>随着终端形态与天线数量不断增加，传统 OTA 测试在时间与成本方面面临巨大挑战。射线跟踪可在虚拟环境中重建电磁传播，实现对多场景、多角度的覆盖评估。</p><p>通过将仿真结果与暗室实测数据闭环比对，工程团队能够快速验证设计并定位问题，显著缩短测试迭代周期。</p>',
    },
  },
];

const enArticles = [
  {
    id: 101,
    attributes: {
      title: 'How Ray Tracing Accelerates OTA Validation',
      slug: 'ray-tracing-ota',
      excerpt: 'Understanding the role of ray tracing in OTA workflows.',
      content:
        '<p>As antennas multiply and device form factors diversify, traditional OTA campaigns become prohibitively time-consuming. Deterministic ray tracing recreates the propagation environment virtually, enabling rapid what-if analysis.</p><p>By calibrating simulations against chamber measurements, engineering teams can iterate faster, identify edge cases earlier, and reduce costly reruns.</p>',
    },
  },
];

const zhResources = [
  {
    id: 1,
    attributes: {
      title: 'MetaRadio 产品白皮书',
      slug: 'product-whitepaper',
      description: '覆盖射线追踪、动态 OTA、虚拟路测等模块，帮助团队快速了解关键能力。',
      link: { name: '下载 PDF', url: '#' },
    },
  },
];

const enResources = [
  {
    id: 101,
    attributes: {
      title: 'MetaRadio Product Whitepaper',
      slug: 'product-whitepaper',
      description: 'Discover the full HyperRT stack across ray tracing, dynamic OTA, and virtual drive testing.',
      link: { name: 'Download PDF', url: '#' },
    },
  },
];

const mockSiteSettings = {
  id: 1,
  attributes: {
    siteName: 'MetaRadio',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/metaradio' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/metaradio' },
    ],
    defaultSeo: {
      metaTitle: 'MetaRadio — Electromagnetic Digital Twin',
      metaDescription: 'MetaRadio 以射线跟踪法为核心，提供通信仿真、测试与虚拟路测能力。',
    },
  },
};

module.exports = {
  mockPages: { zh: zhPages, en: enPages },
  mockSolutions: { zh: zhSolutions, en: enSolutions },
  mockCaseStudies: { zh: zhCaseStudies, en: enCaseStudies },
  mockArticles: { zh: zhArticles, en: enArticles },
  mockResources: { zh: zhResources, en: enResources },
  mockSiteSettings,
};
