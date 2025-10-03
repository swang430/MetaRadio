import {
  ArticleEntity,
  CaseStudyEntity,
  PageEntity,
  ResourceEntity,
  SiteSettingEntity,
  SolutionEntity,
} from './strapi-types';

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

export const mockPages: Record<string, PageEntity> = {
  landing: {
    id: 1,
    attributes: {
      title: 'MetaRadio 首页',
      slug: 'landing',
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
              slug: 'v2x-ota-lab',
              client: '头部车企',
              summary: '车载天线全向测试闭环方案。',
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
              title: '虚拟路测的关键技术栈',
              slug: 'virtual-drive-stack',
              excerpt: '轨迹回放、射线仿真与 AI 闭环协同。',
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
      blocks: [
        {
          __component: 'hero.hero',
          headline: '核心产品矩阵',
          subhead: '从仿真引擎到测试工具链',
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
};

export const mockSolutions: SolutionEntity[] = [
  {
    id: 1,
    attributes: {
      title: '虚拟路测',
      slug: 'virtual-drive',
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
];

export const mockCaseStudies: CaseStudyEntity[] = [
  {
    id: 1,
    attributes: {
      title: '虚拟路测驱动 5G 调优',
      slug: 'virtual-drive-platform',
      client: '华东 5G 运营商',
      summary: '以数字孪生替代高成本实地路测。',
      challenge: '<p>传统路测需多轮现场部署，耗时且无法覆盖全部场景。</p>',
      approach: '<p>基于 MetaRadio Hyper-RT，构建城市级别的射线跟踪模型，并引入 AI 调优。</p>',
      result: '<p>测试效率提升 1.4 倍，优化覆盖精度至 95%。</p>',
      kpi: [
        { label: '效率提升', value: '1.4', unit: 'x' },
        { label: '覆盖精度', value: '95', unit: '%' },
      ],
    },
  },
];

export const mockArticles: ArticleEntity[] = [
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
];

export const mockResources: ResourceEntity[] = [
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
];
