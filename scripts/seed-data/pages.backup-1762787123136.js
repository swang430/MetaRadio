/**
 * Pages 种子数据
 *
 * 每个条目包含：
 * - slug: 唯一标识
 * - locales: { zh: {...}, en: {...} } 各语言版本的数据
 */

module.exports = [
  {
    slug: 'landing',
    locales: {
      zh: {
        title: 'MetaRadio 首页',
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
      en: {
        title: 'MetaRadio Home',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Visualize EM World, Predict Future Connectivity',
            subhead: 'HyperRT · Digital Twin',
            summary: 'HyperRT transforms complex scenarios into computable, verifiable, and deployable electromagnetic digital twins through deterministic ray tracing.',
            ctaPrimary: { name: 'Explore Solutions', url: '/marketing/solutions' },
            ctaSecondary: { name: 'Book a Demo', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Connectivity Everywhere, Why Prediction Remains Hard?',
            intro: 'From autonomous vehicles to smart factories, the dynamic complexity of EM environments makes traditional testing insufficient.',
            items: [
              {
                icon: '📡',
                title: 'Dynamic Complexity',
                description: 'Moving vehicles, robots, and crowds constantly alter propagation paths.',
              },
              {
                icon: '🏭',
                title: 'Environmental Diversity',
                description: 'Materials, equipment, and layouts vary dramatically across scenarios.',
              },
              {
                icon: '🧪',
                title: 'High Testing Cost',
                description: 'Long-cycle drive tests and chamber experiments are expensive and hard to reproduce.',
              },
            ],
          },
          {
            __component: 'sections.stat-group',
            title: 'Proven Leading Metrics',
            description: 'Continuously validated against real-world measurements for accuracy and scalability.',
            metrics: [
              { label: 'Deployments', value: '120+', unit: 'sites' },
              { label: 'Error Baseline', value: '<=1.5', unit: 'dB' },
              { label: 'Frequency Range', value: '0.1-325', unit: 'GHz' },
            ],
          },
          {
            __component: 'sections.cta-banner',
            title: 'Start Predictable Connectivity',
            body: 'Contact our technical consultants for industry demonstrations and joint testing programs.',
            links: [
              { name: 'Book Demo', url: 'mailto:sales@metaradio.tech?subject=MetaRadio Demo Request' },
              { name: 'Browse Solutions', url: '/marketing/solutions' },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'solutions',
    locales: {
      zh: {
        title: '解决方案',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '行业解决方案',
            summary: '覆盖虚拟路测、机器人、V2X、高精定位等场景，以电磁数字孪生驱动可预测的部署表现。',
            ctaPrimary: { name: '联系顾问', url: '/contact' },
          },
        ],
      },
      en: {
        title: 'Solutions',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Industry Solutions',
            summary: 'Covering virtual drive testing, robotics, V2X, and high-precision positioning with predictable deployment performance.',
            ctaPrimary: { name: 'Contact Us', url: '/contact' },
          },
        ],
      },
    },
  },

  {
    slug: 'products',
    locales: {
      zh: {
        title: '核心产品',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'HyperRT 产品家族',
            summary: '从射线追踪引擎到完整测试工具链，为无线通信仿真提供端到端解决方案。',
            ctaPrimary: { name: '预约演示', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: '核心产品',
            items: [
              {
                icon: '🖥️',
                title: 'HyperRT 一体机',
                description: '集成场景建模、射线追踪求解与通道仿真的一体化系统，支持 API 接口导出。',
                href: '/marketing/products/hyper-rt',
              },
              {
                icon: '📡',
                title: '动态 MIMO OTA 工具链',
                description: '支持空间连续性测试的暗室/转台方案，实现真实环境的 MIMO 性能验证。',
              },
              {
                icon: '🚗',
                title: '虚拟路测平台',
                description: '轨迹回放与 AI 闭环优化，大幅降低实车路测成本与周期。',
              },
            ],
          },
          {
            __component: 'sections.tech-flow',
            title: '产品使用流程',
            intro: '从数据导入到结果输出，五步完成高精度仿真。',
            steps: [
              { name: '场景导入', desc: '支持 CAD/GIS/点云多种格式，一键导入三维场景。' },
              { name: '参数配置', desc: '设置频段、天线、发射功率等仿真参数。' },
              { name: '射线追踪', desc: '启动 GPU 加速计算，实时显示仿真进度。' },
              { name: '结果分析', desc: '可视化覆盖热图、路径损耗、KPI 统计。' },
              { name: '数据导出', desc: 'API/CSV/JSON 多种格式导出，对接测试工具链。' },
            ],
          },
          {
            __component: 'content.media-block',
            title: '为什么选择 HyperRT',
            body: '<p>相比传统仿真工具，HyperRT 提供更高的精度、更快的速度与更灵活的扩展性。</p><ul><li><strong>高精度</strong>：确定性射线跟踪算法，误差基线 1-2 dB</li><li><strong>高性能</strong>：GPU 加速，10 km² 场景仿真耗时分钟级</li><li><strong>易集成</strong>：REST API 与 Python SDK，快速接入现有工作流</li></ul>',
            orientation: 'right',
          },
          {
            __component: 'sections.stat-group',
            title: '产品性能指标',
            metrics: [
              { label: '仿真精度', value: '1-2', unit: 'dB' },
              { label: '支持频段', value: '0.1-325', unit: 'GHz' },
              { label: '场景规模', value: '10+', unit: 'km²' },
              { label: '计算速度', value: '10x', unit: '传统方法' },
            ],
          },
          {
            __component: 'sections.cta-banner',
            title: '了解更多产品详情',
            body: '获取产品手册、技术规格与定制化部署方案。',
            links: [
              { name: '下载产品手册', url: '/marketing/resources' },
              { name: '预约演示', url: '/contact' },
            ],
          },
        ],
      },
      en: {
        title: 'Core Products',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'HyperRT Product Family',
            summary: 'From ray tracing engine to complete testing toolchain, providing end-to-end solutions for wireless communication simulation.',
            ctaPrimary: { name: 'Book Demo', url: '/contact' },
          },
          {
            __component: 'sections.feature-grid',
            title: 'Core Products',
            items: [
              {
                icon: '🖥️',
                title: 'HyperRT All-in-One',
                description: 'Integrated system for scene modeling, ray tracing solver, and channel simulation with API export.',
                href: '/marketing/products/hyper-rt',
              },
              {
                icon: '📡',
                title: 'Dynamic MIMO OTA Toolchain',
                description: 'Chamber/turntable solutions supporting spatial continuity testing for real-world MIMO validation.',
              },
              {
                icon: '🚗',
                title: 'Virtual Drive Test Platform',
                description: 'Trajectory replay with AI-driven optimization, significantly reducing physical testing costs.',
              },
            ],
          },
          {
            __component: 'sections.tech-flow',
            title: 'Product Workflow',
            intro: 'Complete high-precision simulation in five steps from data import to result export.',
            steps: [
              { name: 'Scene Import', desc: 'Support CAD/GIS/point cloud formats, one-click 3D scene import.' },
              { name: 'Parameter Config', desc: 'Set frequency, antenna, transmit power, and other simulation parameters.' },
              { name: 'Ray Tracing', desc: 'Launch GPU-accelerated computation with real-time progress display.' },
              { name: 'Result Analysis', desc: 'Visualize coverage heatmaps, path loss, and KPI statistics.' },
              { name: 'Data Export', desc: 'Export in API/CSV/JSON formats, integrate with testing toolchains.' },
            ],
          },
          {
            __component: 'content.media-block',
            title: 'Why Choose HyperRT',
            body: '<p>Compared to traditional simulation tools, HyperRT offers higher accuracy, faster speed, and greater flexibility.</p><ul><li><strong>High Accuracy</strong>: Deterministic ray tracing algorithm with 1-2 dB error baseline</li><li><strong>High Performance</strong>: GPU acceleration, 10 km² scenarios simulated in minutes</li><li><strong>Easy Integration</strong>: REST API and Python SDK for quick workflow integration</li></ul>',
            orientation: 'right',
          },
          {
            __component: 'sections.stat-group',
            title: 'Product Metrics',
            metrics: [
              { label: 'Simulation Accuracy', value: '1-2', unit: 'dB' },
              { label: 'Frequency Range', value: '0.1-325', unit: 'GHz' },
              { label: 'Scene Scale', value: '10+', unit: 'km²' },
              { label: 'Speed Improvement', value: '10x', unit: 'vs traditional' },
            ],
          },
          {
            __component: 'sections.cta-banner',
            title: 'Learn More About Our Products',
            body: 'Get product brochures, technical specifications, and customized deployment plans.',
            links: [
              { name: 'Download Brochure', url: '/marketing/resources' },
              { name: 'Book Demo', url: '/contact' },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'capabilities',
    locales: {
      zh: {
        title: '技术能力',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '技术能力',
            summary: '基于射线跟踪的电磁仿真核心技术，覆盖场景建模、求解算法与性能优化全流程。',
          },
          {
            __component: 'sections.feature-grid',
            title: '核心技术能力',
            items: [
              {
                icon: '🏗️',
                title: '高精度场景建模',
                description: '支持 CAD、GIS、LiDAR 点云等多源数据导入，自动生成三维电磁模型。',
              },
              {
                icon: '⚡',
                title: '确定性射线跟踪',
                description: '完整计算反射、绕射、散射与穿透路径，获得全矢量电磁场分布。',
              },
              {
                icon: '🎯',
                title: '材质参数建模',
                description: '基于测量数据建立材质库，精确描述介质的电磁特性与边界条件。',
              },
              {
                icon: '🚀',
                title: 'GPU 加速计算',
                description: 'CPU/GPU 异构调度，支持大规模场景批量仿真与参数扫描。',
              },
              {
                icon: '📊',
                title: '多维度指标输出',
                description: '功率延迟、路径损耗、SINR、吞吐量等关键 KPI 可视化与 API 接口。',
              },
              {
                icon: '🔄',
                title: '实测数据闭环',
                description: '结合现场测量数据校准模型，持续提升仿真精度与可信度。',
              },
            ],
          },
          {
            __component: 'sections.tech-flow',
            title: '仿真技术流程',
            intro: '从场景建模到结果输出的完整技术链路。',
            steps: [
              { name: '场景获取', desc: '导入 CAD/GIS/点云数据，自动识别建筑、植被、地形。' },
              { name: '材质赋予', desc: '从材质库匹配介电常数、电导率等电磁参数。' },
              { name: '射线发射', desc: '根据发射源位置与天线方向图生成初始射线。' },
              { name: '路径追踪', desc: '计算反射、绕射、散射路径，考虑多径效应。' },
              { name: '场强计算', desc: '叠加所有路径贡献，获得接收点的电场强度与相位。' },
              { name: '指标输出', desc: '生成覆盖图、KPI 报告、通道参数等多维度结果。' },
            ],
          },
          {
            __component: 'sections.bullet-list',
            title: '技术优势',
            intro: '相比传统仿真方法的核心竞争力。',
            items: [
              { title: '全频段支持', description: '从 100 MHz 到 325 GHz，一套算法覆盖所有无线通信频段。' },
              { title: '场景无限制', description: '支持室内、室外、城市、郊区、隧道、地下等任意复杂场景。' },
              { title: '物理可解释', description: '每条路径都对应真实的电磁波传播过程，便于分析与优化。' },
              { title: '实测校准', description: '支持导入实测数据，自动校准材质参数与模型误差。' },
            ],
          },
          {
            __component: 'sections.stat-group',
            title: '技术性能数据',
            metrics: [
              { label: '仿真精度', value: '1-2', unit: 'dB' },
              { label: '最大场景', value: '100', unit: 'km²' },
              { label: '射线数量', value: '10⁹', unit: '条' },
              { label: '加速比', value: '500x', unit: 'GPU vs CPU' },
            ],
          },
          {
            __component: 'sections.cta-banner',
            title: '深入了解技术细节',
            body: '查看技术白皮书、API 文档与典型应用案例。',
            links: [
              { name: '技术文档', url: '/marketing/resources' },
              { name: '成功案例', url: '/marketing/cases' },
            ],
          },
        ],
      },
      en: {
        title: 'Technical Capabilities',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Technical Capabilities',
            summary: 'Ray tracing-based EM simulation covering scene modeling, solving algorithms, and performance optimization.',
          },
          {
            __component: 'sections.feature-grid',
            title: 'Core Technical Capabilities',
            items: [
              {
                icon: '🏗️',
                title: 'High-Precision Scene Modeling',
                description: 'Support for CAD, GIS, LiDAR point cloud import with automatic 3D EM model generation.',
              },
              {
                icon: '⚡',
                title: 'Deterministic Ray Tracing',
                description: 'Complete calculation of reflection, diffraction, scattering, and penetration paths.',
              },
              {
                icon: '🎯',
                title: 'Material Parameter Modeling',
                description: 'Measurement-based material library precisely describing EM properties and boundary conditions.',
              },
              {
                icon: '🚀',
                title: 'GPU-Accelerated Computing',
                description: 'CPU/GPU heterogeneous scheduling for large-scale batch simulation and parameter sweeps.',
              },
              {
                icon: '📊',
                title: 'Multi-Dimensional Metrics',
                description: 'Visualization and API export for power delay, path loss, SINR, throughput, and other KPIs.',
              },
              {
                icon: '🔄',
                title: 'Measurement Data Loop',
                description: 'Model calibration with field measurement data for continuous accuracy improvement.',
              },
            ],
          },
          {
            __component: 'sections.tech-flow',
            title: 'Simulation Technology Workflow',
            intro: 'Complete technical pipeline from scene modeling to result output.',
            steps: [
              { name: 'Scene Acquisition', desc: 'Import CAD/GIS/point cloud data, auto-identify buildings, vegetation, terrain.' },
              { name: 'Material Assignment', desc: 'Match EM parameters like permittivity and conductivity from material library.' },
              { name: 'Ray Launching', desc: 'Generate initial rays based on transmitter position and antenna pattern.' },
              { name: 'Path Tracing', desc: 'Calculate reflection, diffraction, scattering paths considering multipath effects.' },
              { name: 'Field Calculation', desc: 'Superimpose all path contributions to obtain electric field strength and phase.' },
              { name: 'Metrics Output', desc: 'Generate coverage maps, KPI reports, channel parameters, and multi-dimensional results.' },
            ],
          },
          {
            __component: 'sections.bullet-list',
            title: 'Technical Advantages',
            intro: 'Core competitiveness compared to traditional simulation methods.',
            items: [
              { title: 'Full Frequency Support', description: 'From 100 MHz to 325 GHz, single algorithm covers all wireless bands.' },
              { title: 'Unlimited Scenarios', description: 'Support indoor, outdoor, urban, suburban, tunnel, underground scenarios.' },
              { title: 'Physically Interpretable', description: 'Each path corresponds to real EM wave propagation for easy analysis.' },
              { title: 'Measurement Calibration', description: 'Import field measurements to auto-calibrate material parameters and model errors.' },
            ],
          },
          {
            __component: 'sections.stat-group',
            title: 'Technical Performance Metrics',
            metrics: [
              { label: 'Simulation Accuracy', value: '1-2', unit: 'dB' },
              { label: 'Max Scene Size', value: '100', unit: 'km²' },
              { label: 'Ray Count', value: '10⁹', unit: 'rays' },
              { label: 'Acceleration', value: '500x', unit: 'GPU vs CPU' },
            ],
          },
          {
            __component: 'sections.cta-banner',
            title: 'Dive Into Technical Details',
            body: 'Access technical whitepapers, API documentation, and application case studies.',
            links: [
              { name: 'Technical Docs', url: '/marketing/resources' },
              { name: 'Case Studies', url: '/marketing/cases' },
            ],
          },
        ],
      },
    },
  },

  {
    slug: 'blog',
    locales: {
      zh: {
        title: '洞察',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '行业洞察与技术博客',
            summary: '分享射线跟踪技术、无线通信仿真与行业应用的最新进展。',
          },
          {
            __component: 'sections.post-list',
            title: '最新文章',
            intro: '以下文章会由 CMS 动态展示，这里是占位说明。',
            posts: [],
          },
        ],
      },
      en: {
        title: 'Insights',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Industry Insights & Technical Blog',
            summary: 'Latest developments in ray tracing, wireless communication simulation, and industry applications.',
          },
          {
            __component: 'sections.post-list',
            title: 'Latest Articles',
            intro: 'Articles are dynamically displayed from CMS. This is a placeholder.',
            posts: [],
          },
        ],
      },
    },
  },

  {
    slug: 'cases',
    locales: {
      zh: {
        title: '成功案例',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '成功案例',
            summary: '了解 MetaRadio 如何帮助通信、汽车、工业客户解决实际部署挑战。',
            ctaPrimary: { name: '联系我们', url: '/contact' },
          },
          {
            __component: 'sections.case-showcase',
            title: '典型案例',
            intro: '以下案例会由 CMS 动态展示，这里是占位说明。',
            cases: [],
          },
        ],
      },
      en: {
        title: 'Case Studies',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Success Stories',
            summary: 'Discover how MetaRadio helps communication, automotive, and industrial clients solve deployment challenges.',
            ctaPrimary: { name: 'Contact Us', url: '/contact' },
          },
          {
            __component: 'sections.case-showcase',
            title: 'Featured Cases',
            intro: 'Cases are dynamically displayed from CMS. This is a placeholder.',
            cases: [],
          },
        ],
      },
    },
  },

  {
    slug: 'resources',
    locales: {
      zh: {
        title: '资源下载',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '资源中心',
            summary: '下载产品手册、技术白皮书、API 文档与行业报告。',
          },
          {
            __component: 'sections.feature-grid',
            title: '可用资源',
            intro: '以下资源会由 CMS 动态展示，这里是占位说明。',
            items: [],
          },
        ],
      },
      en: {
        title: 'Resources',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'Resource Center',
            summary: 'Download product brochures, technical whitepapers, API documentation, and industry reports.',
          },
          {
            __component: 'sections.feature-grid',
            title: 'Available Resources',
            intro: 'Resources are dynamically displayed from CMS. This is a placeholder.',
            items: [],
          },
        ],
      },
    },
  },

  {
    slug: 'company',
    locales: {
      zh: {
        title: '关于我们',
        blocks: [
          {
            __component: 'hero.hero',
            headline: '关于 MetaRadio',
            summary: '乾径科技致力于以射线跟踪技术驱动无线通信的数字化转型。',
          },
          {
            __component: 'content.media-block',
            title: '我们的使命',
            body: '<p>MetaRadio 由射频与计算机图形学领域的专家团队创立，致力于将确定性射线跟踪技术应用于无线通信仿真。</p><p>我们的目标是让电磁环境可计算、可预测、可优化，为 5G/6G、车联网、工业互联网等领域提供高精度的数字孪生解决方案。</p>',
            orientation: 'right',
          },
          {
            __component: 'sections.stat-group',
            title: '公司实力',
            metrics: [
              { label: '成立时间', value: '2018', unit: '年' },
              { label: '部署客户', value: '50+', unit: '家' },
              { label: '专利申请', value: '20+', unit: '项' },
            ],
          },
          {
            __component: 'sections.cta-banner',
            title: '加入我们的旅程',
            body: '我们正在寻找对射线跟踪、无线通信、计算机图形学充满热情的人才。',
            links: [
              { name: '查看职位', url: '/careers' },
              { name: '联系我们', url: '/contact' },
            ],
          },
        ],
      },
      en: {
        title: 'About Us',
        blocks: [
          {
            __component: 'hero.hero',
            headline: 'About MetaRadio',
            summary: 'HyperRT is dedicated to driving digital transformation in wireless communications through ray tracing technology.',
          },
          {
            __component: 'content.media-block',
            title: 'Our Mission',
            body: '<p>MetaRadio was founded by experts in RF and computer graphics, dedicated to applying deterministic ray tracing to wireless communication simulation.</p><p>Our goal is to make electromagnetic environments computable, predictable, and optimizable, providing high-precision digital twin solutions for 5G/6G, V2X, and industrial IoT.</p>',
            orientation: 'right',
          },
          {
            __component: 'sections.stat-group',
            title: 'Company Strength',
            metrics: [
              { label: 'Founded', value: '2018', unit: '' },
              { label: 'Customers', value: '50+', unit: '' },
              { label: 'Patents', value: '20+', unit: '' },
            ],
          },
          {
            __component: 'sections.cta-banner',
            title: 'Join Our Journey',
            body: 'We are looking for talented individuals passionate about ray tracing, wireless communication, and computer graphics.',
            links: [
              { name: 'View Positions', url: '/careers' },
              { name: 'Contact Us', url: '/contact' },
            ],
          },
        ],
      },
    },
  },
];
