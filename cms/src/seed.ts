type SeedContext = any;

async function ensureSingleType(strapi: SeedContext, uid: string, data: Record<string, unknown>) {
  const existing = await strapi.entityService.findMany(uid, {});
  if (Array.isArray(existing) && existing.length > 0) {
    const [first] = existing;
    await strapi.entityService.update(uid, first.id, { data });
    return first.id;
  }
  const created = await strapi.entityService.create(uid, { data });
  return created.id;
}

async function ensureCollectionType(
  strapi: SeedContext,
  uid: string,
  dataItems: Record<string, unknown>[],
  uniqueKey: string
) {
  for (const item of dataItems) {
    const value = item[uniqueKey];
    if (!value) {
      throw new Error(`Missing unique key ${uniqueKey} on seed item for ${uid}`);
    }
    const existing = await strapi.entityService.findMany(uid, {
      filters: { [uniqueKey]: value },
    });
    if (Array.isArray(existing) && existing.length > 0) {
      await strapi.entityService.update(uid, existing[0].id, { data: item });
    } else {
      await strapi.entityService.create(uid, { data: item });
    }
  }
}

const PAGES = [
  {
    title: 'Landing',
    slug: 'landing',
    locale: 'zh',
    seo: {
      metaTitle: 'MetaRadio — 看得见的电磁世界',
      metaDescription: '射线跟踪仿真、动态 OTA、虚拟路测的一体化平台。',
    },
    blocks: [],
  },
  {
    title: 'Solutions',
    slug: 'solutions',
    locale: 'zh',
    seo: {
      metaTitle: 'MetaRadio 解决方案',
      metaDescription: '机器人、无人机、汽车通信等行业解决方案。',
    },
    blocks: [],
  },
  {
    title: 'Products',
    slug: 'products',
    locale: 'zh',
    seo: {
      metaTitle: '核心产品 · MetaRadio',
      metaDescription: '射线追踪引擎、动态 OTA 工具链与虚拟路测平台。',
    },
    blocks: [],
  },
  {
    title: 'Capabilities',
    slug: 'capabilities',
    locale: 'zh',
    seo: {
      metaTitle: '技术能力 · MetaRadio',
      metaDescription: '材质建模、射线追踪、AI 闭环等核心能力。',
    },
    blocks: [],
  },
  {
    title: 'About',
    slug: 'company',
    locale: 'zh',
    seo: {
      metaTitle: '关于 MetaRadio',
      metaDescription: '以射线跟踪法为核心的通道能力提供商。',
    },
    blocks: [],
  },
];

const CASE_STUDIES = [
  {
    title: '虚拟路测平台',
    slug: 'virtual-drive-platform',
    client: '华东 5G 运营商',
    summary: '通过虚拟路测提速 3D 场景构建，缩短测试周期 40%。',
    challenge: '<p>复杂城市高架与地下空间导致传统路测成本高、效率低。</p>',
    approach: '<p>采用 MetaRadio 射线跟踪仿真 + 实测校准，构建可复现的路网场景。</p>',
    result: '<p>部署闭环模拟-验证流程，完成批量站点的预测与调优。</p>',
    kpi: [
      { label: '测试效率', value: '1.4', unit: 'x' },
      { label: '覆盖预测精度', value: '95', unit: '%' },
    ],
    cover: null,
    locale: 'zh',
  },
  {
    title: '车联网 OTA 实验室',
    slug: 'vehicle-ota-lab',
    client: '头部车企',
    summary: '构建覆盖整车天线的全姿态 OTA 测试体系。',
    challenge: '<p>实车路测难以重复，暗室场景缺少真实通道重现。</p>',
    approach: '<p>引入射线跟踪与轨迹回放，在暗室内复现真实道路场景，结合自动化评分。</p>',
    result: '<p>测试周期缩短 40%，关键指标可视化。</p>',
    kpi: [],
    cover: null,
    locale: 'zh',
  },
  {
    title: '无人机 5G 指挥保障',
    slug: 'uav-network-assessment',
    client: '应急通信单位',
    summary: '保障沿海与山区无人机任务的指挥链路稳定。',
    challenge: '<p>复杂地形导致链路衰落严重，缺乏提前预测能力。</p>',
    approach: '<p>对任务走廊进行射线仿真，输出链路裕量与备份方案。</p>',
    result: '<p>链路中断率下降 60%，支持多编队作业。</p>',
    kpi: [],
    cover: null,
    locale: 'zh',
  },
  {
    title: '智能工厂机器人网络优化',
    slug: 'factory-robot-coverage',
    client: '智能制造企业',
    summary: '实现机器人集群的毫秒级指令响应。',
    challenge: '<p>金属遮挡导致无线时延波动，影响机器人协同。</p>',
    approach: '<p>构建工厂数字孪生，优化 AP 布局与信道配置。</p>',
    result: '<p>时延稳定性提升 55%，停机事件减少 70%。</p>',
    kpi: [],
    cover: null,
    locale: 'zh',
  },
  {
    title: '卫星回传网络规划',
    slug: 'satcom-deployment',
    client: '卫星通信运营商',
    summary: '完成多轨道协同的回传站布局设计。',
    challenge: '<p>多轨道星座与地面站点规划复杂，缺少统一评估工具。</p>',
    approach: '<p>对 GEO/LEO 星座进行统一仿真，输出波束规划与回传容量预测。</p>',
    result: '<p>回传效率提升 35%，建站周期缩短 20%。</p>',
    kpi: [],
    cover: null,
    locale: 'zh',
  },
  {
    title: '通感一体园区试点',
    slug: 'isac-campus',
    client: '智慧园区运营方',
    summary: '通信覆盖与安全感知一张网建设。',
    challenge: '<p>通信与感知部署分散，频谱与设备难以协同。</p>',
    approach: '<p>通过射线仿真统一规划通信与感知节点，实现频谱共享策略。</p>',
    result: '<p>设备部署数量减少 30%，安全事件响应时间下降 45%。</p>',
    kpi: [],
    cover: null,
    locale: 'zh',
  },
  {
    title: '城市级高精定位服务',
    slug: 'rtk-city',
    client: '测绘与导航企业',
    summary: '打造厘米级定位的城市服务网。',
    challenge: '<p>城市高楼遮挡导致定位误差大幅波动。</p>',
    approach: '<p>模拟参考站与误差源，优化 RTK 布局并输出精度热力图。</p>',
    result: '<p>厘米级覆盖率提升至 92%，服务投诉下降 50%。</p>',
    kpi: [],
    cover: null,
    locale: 'zh',
  },
];

const SOLUTIONS = [
  { title: '虚拟路测', slug: 'virtual-drive', excerpt: '结合数字孪生与射线跟踪，为通信网络提供可重复的虚拟路测环境。' },
  { title: '车联网 OTA 验证', slug: 'vehicle-ota', excerpt: '面向智能汽车与车联网的多场景 OTA 测试与调优。' },
  { title: '无人机指挥链路', slug: 'uav-networking', excerpt: '保障无人机在复杂环境下的稳定通信。' },
  { title: '机器人工厂网络', slug: 'robotics-factory', excerpt: '为智能制造与仓储机器人提供高可靠无线网络。' },
  { title: '卫星回传规划', slug: 'satcom-planning', excerpt: '融合地面与星地链路的卫星回传规划与评估。' },
  { title: '通感一体园区', slug: 'isac', excerpt: '在同一网络内实现通信与感知的协同覆盖。' },
  { title: '高精定位网络', slug: 'precision-positioning', excerpt: '构建城市级 RTK 与差分定位的高精度网络。' },
];

const ARTICLES = [
  {
    title: '射线跟踪如何加速 OTA 验证',
    slug: 'ray-tracing-ota',
    excerpt: '解读射线跟踪在 OTA 场景的作用，以及如何缩短调试周期。',
    content: '<p>通过高保真仿真与自动化标定，工程团队可以快速锁定性能瓶颈。</p>',
    tags: ['射线跟踪', 'OTA'],
  },
  {
    title: '车联网 OTA 验证清单',
    slug: 'vehicle-ota-checklist',
    excerpt: '暗室、转台与道路回放的组合策略。',
    content: '<p>列出实验项目、评价指标与常见问题，助力车联网 OTA 落地。</p>',
    tags: ['车联网'],
  },
  {
    title: '无人机指挥链路设计要点',
    slug: 'uav-network-design',
    excerpt: '复杂地形下保障无人机通信的三大关键环节。',
    content: '<p>基于射线仿真与飞行轨迹，分析链路裕量与备份策略。</p>',
    tags: ['无人机'],
  },
  {
    title: '机器人网络的时延治理',
    slug: 'robotics-spectrum',
    excerpt: '智能制造场景中，射线追踪如何帮助控制无线时延。',
    content: '<p>结合工厂数字孪生与 URLLC 指标，输出网络优化清单。</p>',
    tags: ['机器人'],
  },
  {
    title: '卫星回传规划实战指南',
    slug: 'satcom-planning-playbook',
    excerpt: '多轨道星座下，如何快速完成回传站规划？',
    content: '<p>分享星地一体建模、波束规划与容量预测的步骤。</p>',
    tags: ['卫星通信'],
  },
  {
    title: '通感一体的园区落地路径',
    slug: 'isac-blueprint',
    excerpt: '通信与感知协同部署需要关注的关键指标。',
    content: '<p>梳理节点规划、频谱共享与业务联动的实施步骤。</p>',
    tags: ['通感一体'],
  },
  {
    title: '高精定位网络部署指南',
    slug: 'precision-positioning-pipeline',
    excerpt: 'RTK/差分服务网络的规划步骤与风险控制。',
    content: '<p>列出参考站选址、误差建模与服务保障关键点。</p>',
    tags: ['定位'],
  },
];

const RESOURCES = [
  { title: 'MetaRadio 产品白皮书', slug: 'product-whitepaper', desc: '包含射线跟踪引擎、动态 OTA 工具链、虚拟路测等模块介绍。', link: { name: '下载 PDF', url: '#' } },
  { title: '车联网 OTA 测试指南', slug: 'vehicle-ota-guide', desc: '梳理车联网 OTA 实验室的建设流程与注意事项。', link: { name: '下载指南', url: '#' } },
  { title: '无人机通信评估套件', slug: 'uav-communication-kit', desc: '链路规划模板、指标清单与试飞记录表。', link: { name: '获取资料', url: '#' } },
  { title: '机器人网络规划手册', slug: 'robotics-network-handbook', desc: '智能工厂无线网络的部署、测量与优化指南。', link: { name: '立即下载', url: '#' } },
  { title: '卫星回传规划白皮书', slug: 'satcom-backhaul-whitepaper', desc: '多轨道回传网络的设计方法与案例分享。', link: { name: '阅读白皮书', url: '#' } },
  { title: '通感一体园区蓝图', slug: 'isac-campus-kit', desc: '通感一体部署流程、频谱规划与 KPI 评估模板。', link: { name: '下载蓝图', url: '#' } },
  { title: '高精定位部署手册', slug: 'precision-positioning-guide', desc: 'RTK/差分站点规划、误差建模与服务保障清单。', link: { name: '下载手册', url: '#' } },
];

export default async function seed(strapi: SeedContext) {
  strapi.log.info('[seed] Starting MetaRadio content bootstrap');

  await ensureSingleType(strapi, 'api::site-setting.site-setting', {
    siteName: 'MetaRadio',
    socialLinks: [
      { name: 'GitHub', url: 'https://github.com/metaradio' },
      { name: 'LinkedIn', url: 'https://www.linkedin.com/company/metaradio' },
    ],
    defaultSeo: {
      metaTitle: 'MetaRadio',
      metaDescription: 'Electromagnetic digital twin for predictable connectivity',
      ogImage: null,
    },
  });

  await ensureCollectionType(strapi, 'api::page.page', PAGES, 'slug');

  await ensureCollectionType(strapi, 'api::case-study.case-study', CASE_STUDIES, 'slug');

  await ensureCollectionType(
    strapi,
    'api::solution.solution',
    SOLUTIONS.map((item) => ({ ...item, blocks: [], locale: 'zh' })),
    'slug'
  );

  await ensureCollectionType(
    strapi,
    'api::article.article',
    ARTICLES.map((item) => ({ ...item, cover: null, locale: 'zh' })),
    'slug'
  );

  await ensureCollectionType(
    strapi,
    'api::resource.resource',
    RESOURCES.map((item) => ({ ...item, file: null, locale: 'zh' })),
    'slug'
  );

  // Link virtual drive solution to its primary case study for demo purposes
  const [virtualDriveCase] = await strapi.entityService.findMany('api::case-study.case-study', {
    filters: { slug: 'virtual-drive-platform' },
  });
  const [virtualDriveSolution] = await strapi.entityService.findMany('api::solution.solution', {
    filters: { slug: 'virtual-drive' },
  });

  if (virtualDriveCase && virtualDriveSolution) {
    await strapi.entityService.update('api::solution.solution', virtualDriveSolution.id, {
      data: {
        relatedCases: {
          set: [virtualDriveCase.id],
        },
      },
    });
  }

  strapi.log.info('[seed] MetaRadio content bootstrap finished');
}
