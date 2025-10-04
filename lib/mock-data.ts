import {
  ArticleEntity,
  CaseStudyEntity,
  PageEntity,
  ResourceEntity,
  SiteSettingEntity,
  SolutionEntity,
} from './strapi-types';
import type { Locale } from './i18n/config';

export const mockSiteSettings: SiteSettingEntity = {
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
      ogImage: null,
    },
  },
};

type PageMap = Record<string, PageEntity>;

type LocalizedCollection<T> = Record<Locale, T>;

const zhPages: PageMap = {
  landing: {
    id: 1,
    attributes: {
      title: 'MetaRadio 首页',
      slug: 'landing',
      locale: 'zh',
      blocks: [
        {
          __component: 'hero.hero',
          headline: '看得见的电磁世界',
          subhead: '可预测的连接与性能',
          summary:
            'MetaRadio 以射线跟踪为核心，提供动态 OTA、虚拟路测、智慧园区等场景的电磁数字孪生能力。',
          ctaPrimary: { name: '预约演示', url: '/contact' },
          ctaSecondary: { name: '查看产品', url: '/marketing/products' },
        },
        {
          __component: 'sections.feature-grid',
          title: '核心产品矩阵',
          intro: '从射线追踪一体机到动态 OTA 工具链，覆盖研发、验证与部署全流程。',
          items: [
            {
              id: 1,
              title: 'Hyper-RT 一体机',
              desc: '高速射线追踪求解，接口导出与仿真可视化。',
              link: { name: '了解更多', url: '/marketing/products/hyper-rt' },
            },
            {
              id: 2,
              title: '动态 OTA 工具链',
              desc: '覆盖暗室与转台场景的 MIMO 测试，支持空间连续性。',
              link: { name: '联系顾问', url: '/contact' },
            },
            {
              id: 3,
              title: '虚拟路测平台',
              desc: '还原真实轨迹与环境，实现 AI 闭环调优。',
              link: { name: '下载白皮书', url: '/marketing/resources' },
            },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: '关键指标',
          metrics: [
            { id: 1, label: '部署城市', value: '18', suffix: '+' },
            { id: 2, label: '模型精度', value: '95', suffix: '%' },
            { id: 3, label: '调优效率提升', value: '1.4', suffix: 'x' },
          ],
        },
        {
          __component: 'sections.case-showcase',
          title: '成功案例',
          intro: '服务通信运营商、自动驾驶车企、智慧园区建设者。',
          cases: [
            {
              id: 1,
              title: '虚拟路测驱动 5G 调优',
              slug: 'virtual-drive-platform',
              client: '华东 5G 运营商',
              summary: '以城市级数字孪生替代高成本实地路测。',
            },
            {
              id: 2,
              title: '车联网 OTA 实验室',
              slug: 'vehicle-ota-lab',
              client: '头部车企',
              summary: '车载天线全向测试闭环方案。',
            },
            {
              id: 3,
              title: '无人机 5G 指挥保障',
              slug: 'uav-network-assessment',
              client: '应急通信单位',
              summary: '保障极端环境下的无人机链路稳定。',
            },
          ],
        },
        {
          __component: 'sections.post-list',
          title: '洞察文章',
          posts: [
            {
              id: 1,
              title: '射线跟踪如何加速 OTA 验证',
              slug: 'ray-tracing-ota',
              excerpt: '构建高保真环境模型，让调优更可控。',
            },
            {
              id: 2,
              title: '车联网 OTA 验证清单',
              slug: 'vehicle-ota-checklist',
              excerpt: '暗室、转台与道路回放的组合策略。',
            },
            {
              id: 3,
              title: '无人机指挥链路设计要点',
              slug: 'uav-network-design',
              excerpt: '链路裕量、备份设计与干扰规避。',
            },
          ],
        },
        {
          __component: 'sections.cta-banner',
          title: '准备好体验 MetaRadio 吗？',
          body: '联系我们获取演示、规格书或合作方案。',
          links: [
            { id: 1, name: '预约演示', url: '/contact' },
            { id: 2, name: '查看解决方案', url: '/marketing/solutions' },
          ],
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
          summary: 'MetaRadio 提供覆盖通信研发与验证的完整产品组合，兼容主流 CAD、天线与 OTA 工具链。',
          ctaPrimary: { name: '预约演示', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: '产品组合',
          items: [
            {
              id: 1,
              title: 'Hyper-RT 一体机',
              desc: '高性能射线追踪引擎，支持批量算例与接口导出。',
            },
            {
              id: 2,
              title: '动态 OTA 工具链',
              desc: '覆盖暗室、转台与行驶场景的 OTA 测试系统。',
            },
            {
              id: 3,
              title: '虚拟路测平台',
              desc: '自动化轨迹回放与仿真校准，实现城市级部署。',
            },
          ],
        },
        {
          __component: 'sections.bullet-list',
          title: '产品亮点',
          items: [
            {
              title: '高保真引擎',
              description: '支持反射、绕射、透射等多径建模，兼容毫米波场景。',
            },
            {
              title: '开放接口',
              description: 'REST/SDK/API 多形态输出，便于二次开发。',
            },
            {
              title: '全流程协同',
              description: '仿真、测量、回放闭环，助力快速迭代。',
            },
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
          summary: '机器人、无人机、车联网、高精度定位，电磁数字孪生正在赋能更多行业。',
          ctaPrimary: { name: '浏览全部方案', url: '/marketing/solutions' },
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
            {
              title: '材质参数化',
              description: '支持多种介质库与测量导入，提升仿真准确度。',
            },
            {
              title: '多径求解',
              description: '面向室内外复杂场景的反射、绕射、散射计算。',
            },
            {
              title: 'AI 闭环',
              description: '结合实测反馈自动调参，持续优化覆盖表现。',
            },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: '性能指标',
          metrics: [
            { id: 1, label: '射线追踪精度', value: '95', suffix: '%' },
            { id: 2, label: '仿真速度', value: '10', suffix: 'x' },
            { id: 3, label: 'AI 收敛周期', value: '3', suffix: '天' },
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
          actions: [{ id: 1, name: '联系团队', url: '/contact' }],
        },
      ],
    },
  },
};

const enPages: PageMap = {
  landing: {
    id: 11,
    attributes: {
      title: 'MetaRadio Landing',
      slug: 'landing',
      locale: 'en',
      blocks: [
        {
          __component: 'hero.hero',
          headline: 'Electromagnetic Insights You Can Trust',
          subhead: 'Predictable connectivity, measurable performance',
          summary:
            'MetaRadio brings ray-tracing accuracy to dynamic OTA, virtual drive testing, and campus-scale digital twins.',
          ctaPrimary: { name: 'Book a demo', url: '/contact' },
          ctaSecondary: { name: 'View products', url: '/marketing/products' },
        },
        {
          __component: 'sections.feature-grid',
          title: 'Product Portfolio',
          intro: 'From ray-tracing engines to dynamic OTA toolchains, cover the full lifecycle of R&D and validation.',
          items: [
            {
              id: 1,
              title: 'Hyper-RT Appliance',
              desc: 'High-performance ray tracing with batch scenarios and open interfaces.',
              link: { name: 'Learn more', url: '/marketing/products/hyper-rt' },
            },
            {
              id: 2,
              title: 'Dynamic OTA Toolchain',
              desc: 'Support anechoic chambers, turntables, and continuous spatial measurements.',
              link: { name: 'Talk to us', url: '/contact' },
            },
            {
              id: 3,
              title: 'Virtual Drive Platform',
              desc: 'Replay trajectories, calibrate with AI, and deploy city-scale simulations.',
              link: { name: 'Download whitepaper', url: '/marketing/resources' },
            },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: 'Key metrics',
          metrics: [
            { id: 1, label: 'Cities deployed', value: '18', suffix: '+' },
            { id: 2, label: 'Prediction accuracy', value: '95', suffix: '%' },
            { id: 3, label: 'Optimization speedup', value: '1.4', suffix: 'x' },
          ],
        },
        {
          __component: 'sections.case-showcase',
          title: 'Case Studies',
          intro: 'Trusted by carriers, autonomous OEMs, and smart campus builders.',
          cases: [
            {
              id: 1,
              title: 'Virtual Drive Accelerates 5G Optimization',
              slug: 'virtual-drive-platform',
              client: 'Eastern China Carrier',
              summary: 'City-scale twins replacing costly field measurements.',
            },
            {
              id: 2,
              title: 'Automotive OTA Lab Build-out',
              slug: 'vehicle-ota-lab',
              client: 'Global Automotive OEM',
              summary: 'Closed-loop validation for connected vehicles.',
            },
            {
              id: 3,
              title: 'UAV 5G Command Assurance',
              slug: 'uav-network-assessment',
              client: 'Emergency Communications Agency',
              summary: 'Reliable UAV missions in coastal and mountain terrain.',
            },
          ],
        },
        {
          __component: 'sections.post-list',
          title: 'Latest Insights',
          posts: [
            {
              id: 1,
              title: 'How Ray Tracing Accelerates OTA Validation',
              slug: 'ray-tracing-ota',
              excerpt: 'Build high-fidelity environments for controllable optimization.',
            },
            {
              id: 2,
              title: 'Automotive OTA Validation Checklist',
              slug: 'vehicle-ota-checklist',
              excerpt: 'Chamber, turntable, and road replay in a single workflow.',
            },
            {
              id: 3,
              title: 'Designing UAV Command Links',
              slug: 'uav-network-design',
              excerpt: 'Ensure resilient communications for complex missions.',
            },
          ],
        },
        {
          __component: 'sections.cta-banner',
          title: 'Ready to experience MetaRadio?',
          body: 'Request a demo, download specs, or explore partnership opportunities.',
          links: [
            { id: 1, name: 'Book a demo', url: '/contact' },
            { id: 2, name: 'Explore solutions', url: '/marketing/solutions' },
          ],
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
          summary: 'Ray-tracing solvers, dynamic OTA toolchains, and virtual drive platforms for communications R&D.',
          ctaPrimary: { name: 'Book a demo', url: '/contact' },
        },
        {
          __component: 'sections.feature-grid',
          title: 'Products',
          items: [
            {
              id: 1,
              title: 'Hyper-RT Appliance',
              desc: 'Batch ray tracing with exportable results.',
            },
            {
              id: 2,
              title: 'Dynamic OTA Toolchain',
              desc: 'Chamber, turntable, and drive-by OTA validation.',
            },
            {
              id: 3,
              title: 'Virtual Drive Platform',
              desc: 'AI-assisted calibration across entire cities.',
            },
          ],
        },
        {
          __component: 'sections.bullet-list',
          title: 'Highlights',
          items: [
            {
              title: 'High-fidelity solver',
              description: 'Reflections, diffractions, and transmissions for mmWave scenarios.',
            },
            {
              title: 'Open interfaces',
              description: 'REST/SDK integrations for downstream workflows.',
            },
            {
              title: 'Closed-loop workflow',
              description: 'Simulation, measurement, and replay in one toolchain.',
            },
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
          summary: 'Robotics, UAV, automotive, high-precision positioning — ray tracing powers new markets.',
          ctaPrimary: { name: 'Browse all solutions', url: '/marketing/solutions' },
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
            {
              title: 'Material parametrisation',
              description: 'Extensive material libraries and measurement ingestion.',
            },
            {
              title: 'Multi-path solvers',
              description: 'Indoor/outdoor reflections, diffractions, and scattering.',
            },
            {
              title: 'AI closed loop',
              description: 'Leverage field feedback to auto-tune coverage models.',
            },
          ],
        },
        {
          __component: 'sections.stat-group',
          title: 'Performance metrics',
          metrics: [
            { id: 1, label: 'Ray-tracing accuracy', value: '95', suffix: '%' },
            { id: 2, label: 'Simulation speed', value: '10', suffix: 'x' },
            { id: 3, label: 'AI convergence', value: '3', suffix: 'days' },
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
          actions: [{ id: 1, name: 'Contact the team', url: '/contact' }],
        },
      ],
    },
  },
};

export const mockPages: LocalizedCollection<PageMap> = {
  zh: zhPages,
  en: enPages,
};

const zhSolutions: SolutionEntity[] = [
  {
    id: 1,
    attributes: {
      title: '虚拟路测',
      slug: 'virtual-drive',
      locale: 'zh',
      excerpt: '结合数字孪生与射线跟踪，实现可重复的通信路测验证。',
      blocks: [
        {
          __component: 'content.media-block',
          title: '城市级数字孪生',
          body: '<p>导入高精地图、POI、材质参数，构建毫米级精度的电磁环境。</p>',
          orientation: 'right',
          actions: [{ id: 1, name: '联系顾问', url: '/contact' }],
        },
        {
          __component: 'sections.tech-flow',
          title: '工作流',
          steps: [
            { id: 1, name: '数据采集', desc: '测绘、轨迹回放、材质参数化。' },
            { id: 2, name: '射线仿真', desc: '多径计算、覆盖预测、干扰分析。' },
            { id: 3, name: 'AI 调优', desc: '结合实测反馈，自动调参。' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 1,
          attributes: {
            title: '虚拟路测驱动 5G 调优',
            slug: 'virtual-drive-platform',
            client: '华东 5G 运营商',
            summary: '以数字孪生替代高成本实地路测。',
          },
        },
      ],
      seo: {
        metaTitle: '虚拟路测解决方案',
        metaDescription: '城市级数字孪生 + 射线跟踪，为运营商提供虚拟路测能力。',
      },
    },
  },
  {
    id: 2,
    attributes: {
      title: '车联网 OTA 验证',
      slug: 'vehicle-ota',
      locale: 'zh',
      excerpt: '面向智能汽车与车联网的多场景 OTA 测试与调优。',
      blocks: [
        {
          __component: 'content.media-block',
          title: '暗室 + 真实路况',
          body: '<p>在暗室内复现行驶场景，结合转台与移动终端，实现全姿态测试。</p>',
          orientation: 'left',
          actions: [{ id: 1, name: '预约实验室参观', url: '/contact' }],
        },
        {
          __component: 'sections.bullet-list',
          title: '方案亮点',
          items: [
            { title: '多场景覆盖', description: '暗室、转台、实车路测一体化。' },
            { title: '多制式支持', description: '覆盖 4G/5G、C-V2X、GNSS 等通信制式。' },
            { title: '自动化评估', description: '引入轨迹回放与 AI 评分，快速定位弱区。' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 2,
          attributes: {
            title: '车联网 OTA 实验室',
            slug: 'vehicle-ota-lab',
            client: '头部车企',
            summary: '构建覆盖整车天线的全姿态 OTA 体系。',
          },
        },
      ],
      seo: {
        metaTitle: '车联网 OTA 验证方案',
        metaDescription: '覆盖暗室、转台与实车场景的车联网 OTA 测试平台。',
      },
    },
  },
  {
    id: 3,
    attributes: {
      title: '无人机指挥链路',
      slug: 'uav-networking',
      locale: 'zh',
      excerpt: '保障无人机在城市、海域、山区环境下的稳定通信。',
      blocks: [
        {
          __component: 'content.media-block',
          title: '复杂场景评估',
          body: '<p>融合射线追踪与飞行轨迹模拟，评估城市峡谷、海风扰动等极端环境。</p>',
          orientation: 'right',
          actions: [{ id: 1, name: '下载测试方案', url: '/marketing/resources' }],
        },
        {
          __component: 'sections.tech-flow',
          title: '评估流程',
          steps: [
            { id: 1, name: '任务建模', desc: '飞行走廊、干扰源与控制站建模。' },
            { id: 2, name: '链路仿真', desc: '多天线、多频段指挥链路覆盖分析。' },
            { id: 3, name: '闭环验证', desc: '结合试飞数据自动校正模型。' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 3,
          attributes: {
            title: '无人机 5G 指挥保障',
            slug: 'uav-network-assessment',
            client: '应急通信单位',
            summary: '保障海岛与山区的无人机应急任务通信。',
          },
        },
      ],
      seo: {
        metaTitle: '无人机指挥链路方案',
        metaDescription: '评估无人机在复杂环境下的指挥与回传链路表现。',
      },
    },
  },
  {
    id: 4,
    attributes: {
      title: '机器人工厂网络',
      slug: 'robotics-factory',
      locale: 'zh',
      excerpt: '为智能制造与仓储机器人提供高可靠无线网络。',
      blocks: [
        {
          __component: 'content.media-block',
          title: '数字化车间',
          body: '<p>构建毫米级精度的工厂数字孪生，评估金属遮挡与多径影响。</p>',
          orientation: 'left',
        },
        {
          __component: 'sections.bullet-list',
          title: '能力亮点',
          items: [
            { title: '低时延保障', description: '仿真 URLLC/TSN 等关键工艺通信指标。' },
            { title: '协同规划', description: '机器人路径、感知系统与网络覆盖协同优化。' },
            { title: '安全加固', description: '评估干扰与窃听风险，生成防护策略。' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 4,
          attributes: {
            title: '智能工厂机器人网络优化',
            slug: 'factory-robot-coverage',
            client: '智能制造企业',
            summary: '实现机器人集群的毫秒级指令响应。',
          },
        },
      ],
      seo: {
        metaTitle: '机器人工厂网络方案',
        metaDescription: '面向智能制造的低时延、高可靠无线网络规划。',
      },
    },
  },
  {
    id: 5,
    attributes: {
      title: '卫星回传规划',
      slug: 'satcom-planning',
      locale: 'zh',
      excerpt: '融合地面与星地链路的卫星回传规划与评估。',
      blocks: [
        {
          __component: 'content.media-block',
          title: '多轨道协同',
          body: '<p>支持 GEO/LEO 混编，对星地链路、回传站位与干扰进行全局评估。</p>',
          orientation: 'right',
        },
        {
          __component: 'sections.tech-flow',
          title: '规划流程',
          steps: [
            { id: 1, name: '星座建模', desc: '轨道分布、频段与功率配置。' },
            { id: 2, name: '波束设计', desc: '波束赋形与地面站点匹配。' },
            { id: 3, name: '业务仿真', desc: '多业务负载与回传链路容量评估。' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 5,
          attributes: {
            title: '卫星回传网络规划',
            slug: 'satcom-deployment',
            client: '卫星通信运营商',
            summary: '完成多轨道协同的回传站布局设计。',
          },
        },
      ],
      seo: {
        metaTitle: '卫星回传规划方案',
        metaDescription: '多轨道、多业务场景下的星地链路规划与评估。',
      },
    },
  },
  {
    id: 6,
    attributes: {
      title: '通感一体园区',
      slug: 'isac',
      locale: 'zh',
      excerpt: '在同一网络内实现通信与感知的协同覆盖。',
      blocks: [
        {
          __component: 'content.media-block',
          title: '通信 + 感知融合',
          body: '<p>基于射线追踪模拟通信覆盖与感知回波，实现统一频谱调度。</p>',
          orientation: 'left',
        },
        {
          __component: 'sections.bullet-list',
          title: '应用场景',
          items: [
            { title: '园区安防', description: '统一部署通信覆盖与入侵感知。' },
            { title: '物流调度', description: '实时感知车辆、人员与资产状态。' },
            { title: '多源融合', description: '结合毫米波、光感知等多模态数据。' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 6,
          attributes: {
            title: '通感一体园区试点',
            slug: 'isac-campus',
            client: '智慧园区运营方',
            summary: '通信覆盖与安全感知一张网建设。',
          },
        },
      ],
      seo: {
        metaTitle: '通感一体解决方案',
        metaDescription: '通信与感知协同的园区级覆盖规划。',
      },
    },
  },
  {
    id: 7,
    attributes: {
      title: '高精定位网络',
      slug: 'precision-positioning',
      locale: 'zh',
      excerpt: '构建城市级 RTK 与差分定位的高精度网络。',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'RTK 标准化部署',
          body: '<p>仿真参考站布局、遮挡因素与多路径误差，输出定位精度热力图。</p>',
          orientation: 'right',
        },
        {
          __component: 'sections.tech-flow',
          title: '部署步骤',
          steps: [
            { id: 1, name: '站点规划', desc: '结合地形、建筑高度与供电条件。' },
            { id: 2, name: '误差建模', desc: '多路径、噪声与大气误差分析。' },
            { id: 3, name: '服务评估', desc: '输出厘米级精度的服务区间。' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 7,
          attributes: {
            title: '城市级高精定位服务',
            slug: 'rtk-city',
            client: '测绘与导航企业',
            summary: '打造厘米级定位的城市服务网。',
          },
        },
      ],
      seo: {
        metaTitle: '高精定位网络方案',
        metaDescription: '城市级 RTK 与差分定位网络规划。',
      },
    },
  },
];

const enSolutions: SolutionEntity[] = [
  {
    id: 101,
    attributes: {
      title: 'Virtual Drive Testing',
      slug: 'virtual-drive',
      locale: 'en',
      excerpt: 'Ray-tracing powered virtual drive environments for repeatable network validation.',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'City-scale digital twins',
          body: '<p>Ingest HD maps, POIs, and material properties to create centimetre-level accuracy.</p>',
          orientation: 'right',
          actions: [{ id: 1, name: 'Contact sales', url: '/contact' }],
        },
        {
          __component: 'sections.tech-flow',
          title: 'Workflow',
          steps: [
            { id: 1, name: 'Data capture', desc: 'Survey, trajectory replay, material parametrisation.' },
            { id: 2, name: 'Ray-tracing', desc: 'Multi-path prediction, coverage assessment, interference analysis.' },
            { id: 3, name: 'AI optimisation', desc: 'Auto calibration with closed-loop measurements.' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 201,
          attributes: {
            title: 'Virtual Drive Accelerates 5G Optimization',
            slug: 'virtual-drive-platform',
            client: 'Eastern China Carrier',
            summary: 'Digital twins replace costly drive testing rounds.',
          },
        },
      ],
      seo: {
        metaTitle: 'Virtual Drive Testing Solution',
        metaDescription: 'Ray tracing plus digital twins to enable repeatable, data-driven optimisation.',
      },
    },
  },
  {
    id: 102,
    attributes: {
      title: 'Automotive OTA Validation',
      slug: 'vehicle-ota',
      locale: 'en',
      excerpt: 'Multi-scenario OTA testing for intelligent vehicles and V2X platforms.',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'Chamber + On-road fidelity',
          body: '<p>Recreate real-world drive conditions inside the chamber with turntables and live terminals.</p>',
          orientation: 'left',
          actions: [{ id: 1, name: 'Book a lab tour', url: '/contact' }],
        },
        {
          __component: 'sections.bullet-list',
          title: 'Highlights',
          items: [
            { title: 'Scenario coverage', description: 'Anechoic chamber, turntable, and drive testing in one workflow.' },
            { title: 'Multi-standard support', description: 'Validate 4G/5G, C-V2X, GNSS, and Wi-Fi links.' },
            { title: 'Automated scoring', description: 'Trajectory replay with AI insights to pinpoint weak zones.' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 202,
          attributes: {
            title: 'Automotive OTA Lab Build-out',
            slug: 'vehicle-ota-lab',
            client: 'Global Automotive OEM',
            summary: 'Full-pose antenna testing and analytics for connected vehicles.',
          },
        },
      ],
      seo: {
        metaTitle: 'Automotive OTA Validation Solution',
        metaDescription: 'Chamber, turntable, and drive test coverage for connected vehicles.',
      },
    },
  },
  {
    id: 103,
    attributes: {
      title: 'UAV Command & Control',
      slug: 'uav-networking',
      locale: 'en',
      excerpt: 'Guarantee reliable UAV communications across urban, maritime, and mountain missions.',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'Complex mission analysis',
          body: '<p>Combine ray tracing with flight-path simulation to evaluate urban canyons and coastal weather.</p>',
          orientation: 'right',
          actions: [{ id: 1, name: 'Download test plan', url: '/marketing/resources' }],
        },
        {
          __component: 'sections.tech-flow',
          title: 'Assessment workflow',
          steps: [
            { id: 1, name: 'Mission modelling', desc: 'Define corridors, interference sources, and control stations.' },
            { id: 2, name: 'Link simulation', desc: 'Multi-antenna, multi-band coverage analysis.' },
            { id: 3, name: 'Closed-loop validation', desc: 'Align with flight-test data for automatic calibration.' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 203,
          attributes: {
            title: 'UAV 5G Command Assurance',
            slug: 'uav-network-assessment',
            client: 'Emergency Communications Agency',
            summary: 'Ensure reliable UAV operations over islands and mountainous terrain.',
          },
        },
      ],
      seo: {
        metaTitle: 'UAV Command & Control Solution',
        metaDescription: 'Model and validate UAV communications in challenging environments.',
      },
    },
  },
  {
    id: 104,
    attributes: {
      title: 'Robotics Factory Network',
      slug: 'robotics-factory',
      locale: 'en',
      excerpt: 'Low-latency, high-reliability wireless for smart manufacturing and warehouses.',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'Digital production floor',
          body: '<p>Create millimetre-accurate factory twins to evaluate metallic blockage and multipath effects.</p>',
          orientation: 'left',
        },
        {
          __component: 'sections.bullet-list',
          title: 'Key benefits',
          items: [
            { title: 'Ultra-low latency', description: 'Simulate URLLC/TSN requirements for mission-critical processes.' },
            { title: 'Coordinated planning', description: 'Co-optimise robot paths, sensing, and wireless coverage.' },
            { title: 'Security hardening', description: 'Evaluate interference and eavesdropping risks with mitigation outputs.' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 204,
          attributes: {
            title: 'Smart Factory Robotics Network Optimisation',
            slug: 'factory-robot-coverage',
            client: 'Advanced Manufacturing Group',
            summary: 'Achieved millisecond command response across robot fleets.',
          },
        },
      ],
      seo: {
        metaTitle: 'Robotics Factory Network Solution',
        metaDescription: 'Design low-latency wireless for smart manufacturing environments.',
      },
    },
  },
  {
    id: 105,
    attributes: {
      title: 'Satellite Backhaul Planning',
      slug: 'satcom-planning',
      locale: 'en',
      excerpt: 'Plan hybrid GEO/LEO backhaul with holistic link and interference analysis.',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'Multi-orbit coordination',
          body: '<p>Model GEO/LEO constellations, ground stations, and interference for a complete backhaul picture.</p>',
          orientation: 'right',
        },
        {
          __component: 'sections.tech-flow',
          title: 'Planning workflow',
          steps: [
            { id: 1, name: 'Constellation modelling', desc: 'Orbits, spectrum, and power budgets.' },
            { id: 2, name: 'Beam design', desc: 'Beam shaping and ground-station assignment.' },
            { id: 3, name: 'Service simulation', desc: 'Evaluate multi-service load and backhaul capacity.' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 205,
          attributes: {
            title: 'Satellite Backhaul Deployment',
            slug: 'satcom-deployment',
            client: 'Satellite Network Operator',
            summary: 'Designed multi-orbit backhaul and gateway placement.',
          },
        },
      ],
      seo: {
        metaTitle: 'Satellite Backhaul Planning Solution',
        metaDescription: 'Holistic planning for multi-orbit satellite backhaul networks.',
      },
    },
  },
  {
    id: 106,
    attributes: {
      title: 'Integrated Sensing & Communication',
      slug: 'isac',
      locale: 'en',
      excerpt: 'Unify communications and sensing coverage within a single campus network.',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'Comms + sensing fusion',
          body: '<p>Use ray tracing to model both coverage and sensing echoes for shared spectrum scheduling.</p>',
          orientation: 'left',
        },
        {
          __component: 'sections.bullet-list',
          title: 'Use cases',
          items: [
            { title: 'Campus security', description: 'Unified communications and intrusion detection network.' },
            { title: 'Logistics dispatch', description: 'Real-time visibility of vehicles, staff, and assets.' },
            { title: 'Multi-modal fusion', description: 'Blend mmWave and optical sensing for richer context.' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 206,
          attributes: {
            title: 'ISAC Campus Pilot',
            slug: 'isac-campus',
            client: 'Smart Campus Operator',
            summary: 'Built a unified network for coverage and situational awareness.',
          },
        },
      ],
      seo: {
        metaTitle: 'Integrated Sensing & Communication Solution',
        metaDescription: 'Design campus networks that deliver both connectivity and sensing.',
      },
    },
  },
  {
    id: 107,
    attributes: {
      title: 'High-Precision Positioning',
      slug: 'precision-positioning',
      locale: 'en',
      excerpt: 'Plan city-scale RTK and differential positioning services with centimetre accuracy.',
      blocks: [
        {
          __component: 'content.media-block',
          title: 'RTK deployment toolkit',
          body: '<p>Simulate reference-station layouts, blockage, and multipath errors to produce accuracy heatmaps.</p>',
          orientation: 'right',
        },
        {
          __component: 'sections.tech-flow',
          title: 'Deployment steps',
          steps: [
            { id: 1, name: 'Site planning', desc: 'Account for terrain, building height, and power availability.' },
            { id: 2, name: 'Error modelling', desc: 'Analyse multipath, noise, and atmospheric effects.' },
            { id: 3, name: 'Service evaluation', desc: 'Deliver centimetre-level service coverage reports.' },
          ],
        },
      ],
      relatedCases: [
        {
          id: 207,
          attributes: {
            title: 'City-scale Precision Positioning Service',
            slug: 'rtk-city',
            client: 'Mapping & Navigation Provider',
            summary: 'Delivered centimetre accuracy across dense urban cores.',
          },
        },
      ],
      seo: {
        metaTitle: 'High-Precision Positioning Solution',
        metaDescription: 'Plan reliable RTK and differential positioning networks.',
      },
    },
  },
];

export const mockSolutions: LocalizedCollection<SolutionEntity[]> = {
  zh: zhSolutions,
  en: enSolutions,
};

const zhCaseStudies: CaseStudyEntity[] = [
  {
    id: 1,
    attributes: {
      title: '虚拟路测驱动 5G 调优',
      slug: 'virtual-drive-platform',
      client: '华东 5G 运营商',
      summary: '以数字孪生替代高成本实地路测。',
      challenge: '<p>传统路测需多轮现场部署，耗时且无法覆盖全部场景。</p>',
      approach: '<p>基于 MetaRadio Hyper-RT，构建城市级射线追踪模型，并引入 AI 调优。</p>',
      result: '<p>测试效率提升 1.4 倍，覆盖预测精度达到 95%。</p>',
      kpi: [
        { label: '效率提升', value: '1.4', unit: 'x' },
        { label: '覆盖精度', value: '95', unit: '%' },
      ],
    },
  },
  {
    id: 2,
    attributes: {
      title: '车联网 OTA 实验室',
      slug: 'vehicle-ota-lab',
      client: '头部车企',
      summary: '建设整车 OTA 验证体系，覆盖全姿态与多制式。',
      challenge: '<p>实车路测难以重复，暗室场景缺少真实通道重现。</p>',
      approach: '<p>引入射线跟踪与轨迹回放，在暗室内复现真实道路场景，结合自动化评分。</p>',
      result: '<p>测试周期缩短 40%，关键指标可视化并可回溯。</p>',
      kpi: [
        { label: '测试周期', value: '40', unit: '%↓' },
        { label: '问题定位时间', value: '50', unit: '%↓' },
      ],
    },
  },
  {
    id: 3,
    attributes: {
      title: '无人机 5G 指挥保障',
      slug: 'uav-network-assessment',
      client: '应急通信单位',
      summary: '保障沿海与山区无人机任务的指挥链路稳定。',
      challenge: '<p>复杂地形导致链路衰落严重，传统方法难以提前预测。</p>',
      approach: '<p>对任务走廊进行射线仿真，输出链路裕量与备份链路建议。</p>',
      result: '<p>链路中断率下降 60%，支持同时多编队作业。</p>',
      kpi: [
        { label: '链路中断率', value: '60', unit: '%↓' },
        { label: '任务成功率', value: '97', unit: '%' },
      ],
    },
  },
  {
    id: 4,
    attributes: {
      title: '智能工厂机器人网络优化',
      slug: 'factory-robot-coverage',
      client: '智能制造企业',
      summary: '实现机器人集群的毫秒级响应网络。',
      challenge: '<p>金属遮挡导致无线时延波动，影响机器人协同。</p>',
      approach: '<p>构建工厂数字孪生，优化 AP 布局与信道配置，结合时延仿真评估。</p>',
      result: '<p>时延稳定性提升 55%，机器人停机事件减少 70%。</p>',
      kpi: [
        { label: '时延抖动', value: '55', unit: '%↓' },
        { label: '停机事件', value: '70', unit: '%↓' },
      ],
    },
  },
  {
    id: 5,
    attributes: {
      title: '卫星回传网络规划',
      slug: 'satcom-deployment',
      client: '卫星通信运营商',
      summary: '完成多轨道协同的回传站布局设计。',
      challenge: '<p>多轨道星座与地面站点规划复杂，缺少统一评估工具。</p>',
      approach: '<p>对 GEO/LEO 星座进行统一仿真，输出波束规划与回传容量预测。</p>',
      result: '<p>回传效率提升 35%，建站周期缩短 20%。</p>',
      kpi: [
        { label: '回传效率', value: '35', unit: '%↑' },
        { label: '建站周期', value: '20', unit: '%↓' },
      ],
    },
  },
  {
    id: 6,
    attributes: {
      title: '通感一体园区试点',
      slug: 'isac-campus',
      client: '智慧园区运营方',
      summary: '通信覆盖与安全感知一张网建设。',
      challenge: '<p>通信与感知部署分散，频谱与设备难以协同。</p>',
      approach: '<p>通过射线仿真统一规划通信与感知节点，实现频谱共享策略。</p>',
      result: '<p>设备部署数量减少 30%，园区安全事件响应时间下降 45%。</p>',
      kpi: [
        { label: '设备数量', value: '30', unit: '%↓' },
        { label: '响应时间', value: '45', unit: '%↓' },
      ],
    },
  },
  {
    id: 7,
    attributes: {
      title: '城市级高精定位服务',
      slug: 'rtk-city',
      client: '测绘与导航企业',
      summary: '打造厘米级定位的城市服务网。',
      challenge: '<p>城市高楼遮挡导致定位误差大幅波动。</p>',
      approach: '<p>模拟参考站与误差源，优化 RTK 布局并输出精度热力图。</p>',
      result: '<p>厘米级覆盖率提升至 92%，服务投诉下降 50%。</p>',
      kpi: [
        { label: '厘米级覆盖率', value: '92', unit: '%' },
        { label: '投诉量', value: '50', unit: '%↓' },
      ],
    },
  },
];

const enCaseStudies: CaseStudyEntity[] = [
  {
    id: 101,
    attributes: {
      title: 'Virtual Drive Accelerates 5G Optimization',
      slug: 'virtual-drive-platform',
      client: 'Eastern China Carrier',
      summary: 'City-scale twins replace high-cost field testing.',
      challenge: '<p>Conventional drive testing required repeated field runs and still missed critical scenarios.</p>',
      approach: '<p>MetaRadio Hyper-RT built a city-scale ray-tracing model with measurement-informed calibration.</p>',
      result: '<p>Closed-loop optimisation delivered 1.4× efficiency gains with 95% coverage accuracy.</p>',
      kpi: [
        { label: 'Efficiency gain', value: '1.4', unit: 'x' },
        { label: 'Coverage accuracy', value: '95', unit: '%' },
      ],
    },
  },
  {
    id: 102,
    attributes: {
      title: 'Automotive OTA Lab Build-out',
      slug: 'vehicle-ota-lab',
      client: 'Global Automotive OEM',
      summary: 'Delivered full-pose OTA validation across vehicle platforms.',
      challenge: '<p>Road tests lacked repeatability and chamber setups failed to reproduce real channels.</p>',
      approach: '<p>Recreated drive scenarios inside the chamber using ray tracing and trajectory replay with automated scoring.</p>',
      result: '<p>Validation cycles shortened by 40% with transparent KPI dashboards.</p>',
      kpi: [
        { label: 'Validation cycle', value: '40', unit: '%↓' },
        { label: 'Issue localisation', value: '50', unit: '%↓' },
      ],
    },
  },
  {
    id: 103,
    attributes: {
      title: 'UAV 5G Command Assurance',
      slug: 'uav-network-assessment',
      client: 'Emergency Communications Agency',
      summary: 'Secured UAV missions across coastal and mountainous terrain.',
      challenge: '<p>Harsh terrain triggered unpredictable link fades with no pre-mission insight.</p>',
      approach: '<p>Simulated mission corridors to quantify link margin and recommend backup routes.</p>',
      result: '<p>Outage rate dropped 60% while enabling simultaneous multi-squadron operations.</p>',
      kpi: [
        { label: 'Outage rate', value: '60', unit: '%↓' },
        { label: 'Mission success', value: '97', unit: '%' },
      ],
    },
  },
  {
    id: 104,
    attributes: {
      title: 'Smart Factory Robotics Network Optimisation',
      slug: 'factory-robot-coverage',
      client: 'Advanced Manufacturing Group',
      summary: 'Millisecond response for coordinated robot fleets.',
      challenge: '<p>Metal clutter introduced latency jitter that disrupted collaborative robots.</p>',
      approach: '<p>Built a factory twin to optimise AP placement, spectrum, and latency KPIs.</p>',
      result: '<p>Latency variation improved by 55% and unplanned downtime fell 70%.</p>',
      kpi: [
        { label: 'Latency jitter', value: '55', unit: '%↓' },
        { label: 'Downtime incidents', value: '70', unit: '%↓' },
      ],
    },
  },
  {
    id: 105,
    attributes: {
      title: 'Satellite Backhaul Deployment',
      slug: 'satcom-deployment',
      client: 'Satellite Network Operator',
      summary: 'Designed multi-orbit gateways with spectrum efficiency gains.',
      challenge: '<p>Lacked an integrated view of GEO/LEO interactions and ground-station placement.</p>',
      approach: '<p>Simulated hybrid constellations to optimise beam planning and backhaul capacity.</p>',
      result: '<p>Backhaul efficiency improved 35% and deployment time reduced by 20%.</p>',
      kpi: [
        { label: 'Backhaul efficiency', value: '35', unit: '%↑' },
        { label: 'Deployment time', value: '20', unit: '%↓' },
      ],
    },
  },
  {
    id: 106,
    attributes: {
      title: 'ISAC Campus Pilot',
      slug: 'isac-campus',
      client: 'Smart Campus Operator',
      summary: 'Unified network for communications and situational awareness.',
      challenge: '<p>Separate deployments for connectivity and sensing increased cost and coordination friction.</p>',
      approach: '<p>Used ray tracing to co-plan communications and sensing nodes with shared spectrum policies.</p>',
      result: '<p>Device footprint reduced 30% and incident response accelerated by 45%.</p>',
      kpi: [
        { label: 'Device footprint', value: '30', unit: '%↓' },
        { label: 'Response time', value: '45', unit: '%↓' },
      ],
    },
  },
  {
    id: 107,
    attributes: {
      title: 'City-scale Precision Positioning Service',
      slug: 'rtk-city',
      client: 'Mapping & Navigation Provider',
      summary: 'Delivered centimetre accuracy across dense urban cores.',
      challenge: '<p>Urban canyons caused severe multipath with inconsistent accuracy.</p>',
      approach: '<p>Modelled reference stations and error sources to optimise RTK placement and service guarantees.</p>',
      result: '<p>Centimetre coverage reached 92% while service complaints dropped 50%.</p>',
      kpi: [
        { label: 'Centimetre coverage', value: '92', unit: '%' },
        { label: 'Service complaints', value: '50', unit: '%↓' },
      ],
    },
  },
];

export const mockCaseStudies: LocalizedCollection<CaseStudyEntity[]> = {
  zh: zhCaseStudies,
  en: enCaseStudies,
};

const zhArticles: ArticleEntity[] = [
  {
    id: 1,
    attributes: {
      title: '射线跟踪如何加速 OTA 验证',
      slug: 'ray-tracing-ota',
      excerpt: '解读射线跟踪在 OTA 场景中的作用。',
      content: '<p>通过仿真与自动化标定，快速收敛性能。</p>',
      tags: ['射线跟踪', 'OTA'],
      seo: {
        metaTitle: '射线跟踪如何加速 OTA 验证',
        metaDescription: '结合射线仿真与 OTA 工程经验，缩短测试迭代周期。',
      },
    },
  },
  {
    id: 2,
    attributes: {
      title: '车联网 OTA 验证清单',
      slug: 'vehicle-ota-checklist',
      excerpt: '从暗室场景到道路回放，构建可重复的 OTA 测试流程。',
      content: '<p>总结试验项目、评价指标与常见问题，帮助团队快速落地车联网 OTA 验证实验室。</p>',
      tags: ['车联网', 'OTA'],
      seo: {
        metaTitle: '车联网 OTA 验证清单',
        metaDescription: '规划暗室、转台与道路回放的车联网 OTA 测试体系。',
      },
    },
  },
  {
    id: 3,
    attributes: {
      title: '无人机指挥链路设计要点',
      slug: 'uav-network-design',
      excerpt: '在复杂地形下保障无人机通信的三大关键环节。',
      content: '<p>基于射线仿真与飞行轨迹，分析链路裕量、备份链路和干扰规避策略。</p>',
      tags: ['无人机', '5G'],
      seo: {
        metaTitle: '无人机指挥链路设计要点',
        metaDescription: '复杂环境下的无人机通信规划方法。',
      },
    },
  },
  {
    id: 4,
    attributes: {
      title: '机器人网络的时延治理',
      slug: 'robotics-spectrum',
      excerpt: '智能制造场景中，射线追踪如何帮助控制无线时延。',
      content: '<p>结合工厂数字孪生与 URLLC 指标，输出机器人网络优化清单。</p>',
      tags: ['机器人', '工业互联网'],
      seo: {
        metaTitle: '机器人网络的时延治理',
        metaDescription: '工业场景的无线网络规划与优化指南。',
      },
    },
  },
  {
    id: 5,
    attributes: {
      title: '卫星回传规划实战指南',
      slug: 'satcom-planning-playbook',
      excerpt: '多轨道星座下，如何快速完成回传站规划？',
      content: '<p>分享星地一体建模、波束规划与容量预测的步骤与工具。</p>',
      tags: ['卫星通信'],
      seo: {
        metaTitle: '卫星回传规划实战指南',
        metaDescription: '混合轨道回传网络的规划方法。',
      },
    },
  },
  {
    id: 6,
    attributes: {
      title: '通感一体的园区落地路径',
      slug: 'isac-blueprint',
      excerpt: '通信与感知协同部署需要关注的关键指标。',
      content: '<p>从节点规划、频谱共享到业务联动，梳理通感一体园区的实施步骤。</p>',
      tags: ['通感一体'],
      seo: {
        metaTitle: '通感一体的园区落地路径',
        metaDescription: '通感一体园区建设的关键步骤与评估方法。',
      },
    },
  },
  {
    id: 7,
    attributes: {
      title: '高精定位网络部署指南',
      slug: 'precision-positioning-pipeline',
      excerpt: 'RTK/差分服务网络的规划步骤与风险控制。',
      content: '<p>列出参考站选址、误差建模与服务保障的核心要点。</p>',
      tags: ['定位'],
      seo: {
        metaTitle: '高精定位网络部署指南',
        metaDescription: '城市级高精定位网络的部署方法。',
      },
    },
  },
];

const enArticles: ArticleEntity[] = [
  {
    id: 101,
    attributes: {
      title: 'How Ray Tracing Accelerates OTA Validation',
      slug: 'ray-tracing-ota',
      excerpt: 'Understanding the role of ray tracing in OTA workflows.',
      content: '<p>High-fidelity simulations and automated calibration shorten troubleshooting cycles.</p>',
      tags: ['Ray tracing', 'OTA'],
      seo: {
        metaTitle: 'How Ray Tracing Accelerates OTA Validation',
        metaDescription: 'Combine ray tracing with OTA expertise to reduce iteration time.',
      },
    },
  },
  {
    id: 102,
    attributes: {
      title: 'Automotive OTA Validation Checklist',
      slug: 'vehicle-ota-checklist',
      excerpt: 'Build a repeatable OTA workflow from chamber scenarios to road replay.',
      content: '<p>Outline test items, KPIs, and pitfalls to accelerate automotive OTA lab deployment.</p>',
      tags: ['Automotive', 'OTA'],
      seo: {
        metaTitle: 'Automotive OTA Validation Checklist',
        metaDescription: 'Plan chamber, turntable, and road-replay workflows for V2X validation.',
      },
    },
  },
  {
    id: 103,
    attributes: {
      title: 'Designing UAV Command Links',
      slug: 'uav-network-design',
      excerpt: 'Three essentials for resilient UAV communications in complex terrain.',
      content: '<p>Use ray tracing and mission simulation to quantify link margin, backup paths, and interference mitigation.</p>',
      tags: ['UAV', '5G'],
      seo: {
        metaTitle: 'Designing UAV Command Links',
        metaDescription: 'Best practices for UAV communications planning in challenging environments.',
      },
    },
  },
  {
    id: 104,
    attributes: {
      title: 'Taming Latency in Robotics Networks',
      slug: 'robotics-spectrum',
      excerpt: 'How digital twins and URLLC metrics keep robot fleets in sync.',
      content: '<p>Translate factory twins into actionable AP placement and spectrum policies for ultra-low latency.</p>',
      tags: ['Robotics', 'Industry 4.0'],
      seo: {
        metaTitle: 'Taming Latency in Robotics Networks',
        metaDescription: 'Guidelines for planning industrial wireless with strict latency targets.',
      },
    },
  },
  {
    id: 105,
    attributes: {
      title: 'Satellite Backhaul Planning Playbook',
      slug: 'satcom-planning-playbook',
      excerpt: 'Steps to orchestrate hybrid GEO/LEO backhaul deployments.',
      content: '<p>Walk through constellation modelling, beam planning, and capacity forecasting with MetaRadio.</p>',
      tags: ['Satellite'],
      seo: {
        metaTitle: 'Satellite Backhaul Planning Playbook',
        metaDescription: 'A practical guide to multi-orbit satellite backhaul design.',
      },
    },
  },
  {
    id: 106,
    attributes: {
      title: 'Blueprint for ISAC Campus Deployments',
      slug: 'isac-blueprint',
      excerpt: 'Key metrics for deploying integrated sensing and communications.',
      content: '<p>Detail node planning, spectrum sharing, and operations for ISAC-ready campuses.</p>',
      tags: ['ISAC'],
      seo: {
        metaTitle: 'Blueprint for ISAC Campus Deployments',
        metaDescription: 'Deployment guidance for converged sensing and communication networks.',
      },
    },
  },
  {
    id: 107,
    attributes: {
      title: 'Deploying High-Precision Positioning Networks',
      slug: 'precision-positioning-pipeline',
      excerpt: 'RTK/differential network rollout steps and risk mitigations.',
      content: '<p>Highlight reference-station siting, error modelling, and service assurance checkpoints.</p>',
      tags: ['Positioning'],
      seo: {
        metaTitle: 'Deploying High-Precision Positioning Networks',
        metaDescription: 'How to plan RTK and differential positioning services with confidence.',
      },
    },
  },
];

export const mockArticles: LocalizedCollection<ArticleEntity[]> = {
  zh: zhArticles,
  en: enArticles,
};

const zhResources: ResourceEntity[] = [
  {
    id: 1,
    attributes: {
      title: 'MetaRadio 产品白皮书',
      slug: 'product-whitepaper',
      desc: '覆盖射线追踪、动态 OTA、虚拟路测等模块。',
      link: { name: '下载 PDF', url: '#' },
      file: null,
    },
  },
  {
    id: 2,
    attributes: {
      title: '车联网 OTA 测试指南',
      slug: 'vehicle-ota-guide',
      desc: '梳理车联网 OTA 实验室的建设流程与注意事项。',
      link: { name: '下载指南', url: '#' },
      file: null,
    },
  },
  {
    id: 3,
    attributes: {
      title: '无人机通信评估套件',
      slug: 'uav-communication-kit',
      desc: '包含链路规划模板、指标清单与试飞记录表。',
      link: { name: '获取资料', url: '#' },
      file: null,
    },
  },
  {
    id: 4,
    attributes: {
      title: '机器人网络规划手册',
      slug: 'robotics-network-handbook',
      desc: '智能工厂无线网络的部署、测量与优化指南。',
      link: { name: '立即下载', url: '#' },
      file: null,
    },
  },
  {
    id: 5,
    attributes: {
      title: '卫星回传规划白皮书',
      slug: 'satcom-backhaul-whitepaper',
      desc: '多轨道回传网络的设计方法与案例分享。',
      link: { name: '阅读白皮书', url: '#' },
      file: null,
    },
  },
  {
    id: 6,
    attributes: {
      title: '通感一体园区蓝图',
      slug: 'isac-campus-kit',
      desc: '通感一体部署流程、频谱规划与 KPI 评估模板。',
      link: { name: '下载蓝图', url: '#' },
      file: null,
    },
  },
  {
    id: 7,
    attributes: {
      title: '高精定位部署手册',
      slug: 'precision-positioning-guide',
      desc: 'RTK/差分站点规划、误差建模与服务保障清单。',
      link: { name: '下载手册', url: '#' },
      file: null,
    },
  },
];

const enResources: ResourceEntity[] = [
  {
    id: 101,
    attributes: {
      title: 'MetaRadio Product Whitepaper',
      slug: 'product-whitepaper',
      desc: 'Ray tracing, dynamic OTA, and virtual drive capabilities overview.',
      link: { name: 'Download PDF', url: '#' },
      file: null,
    },
  },
  {
    id: 102,
    attributes: {
      title: 'Automotive OTA Testing Guide',
      slug: 'vehicle-ota-guide',
      desc: 'Step-by-step blueprint for building automotive OTA labs.',
      link: { name: 'Download guide', url: '#' },
      file: null,
    },
  },
  {
    id: 103,
    attributes: {
      title: 'UAV Communications Assessment Kit',
      slug: 'uav-communication-kit',
      desc: 'Templates for mission modelling, KPI tracking, and flight logs.',
      link: { name: 'Get the kit', url: '#' },
      file: null,
    },
  },
  {
    id: 104,
    attributes: {
      title: 'Robotics Network Planning Handbook',
      slug: 'robotics-network-handbook',
      desc: 'Deployment, measurement, and optimisation playbooks for smart factories.',
      link: { name: 'Download handbook', url: '#' },
      file: null,
    },
  },
  {
    id: 105,
    attributes: {
      title: 'Satellite Backhaul Whitepaper',
      slug: 'satcom-backhaul-whitepaper',
      desc: 'Design methodology and case studies for hybrid-orbit backhaul.',
      link: { name: 'Read whitepaper', url: '#' },
      file: null,
    },
  },
  {
    id: 106,
    attributes: {
      title: 'ISAC Campus Blueprint',
      slug: 'isac-campus-kit',
      desc: 'Deployment processes, spectrum plans, and KPI scorecards for ISAC.',
      link: { name: 'Download blueprint', url: '#' },
      file: null,
    },
  },
  {
    id: 107,
    attributes: {
      title: 'Precision Positioning Deployment Guide',
      slug: 'precision-positioning-guide',
      desc: 'RTK/differential siting, error modelling, and service assurance templates.',
      link: { name: 'Download guide', url: '#' },
      file: null,
    },
  },
];

export const mockResources: LocalizedCollection<ResourceEntity[]> = {
  zh: zhResources,
  en: enResources,
};
