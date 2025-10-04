import 'dotenv/config';

const STRAPI = process.env.STRAPI_API_URL;
const TOKEN = process.env.STRAPI_API_TOKEN;
if (!STRAPI || !TOKEN) {
  console.error('Missing STRAPI_API_URL or STRAPI_API_TOKEN');
  process.exit(1);
}

async function req(path, { method = 'GET', body, allowNotFound = false } = {}) {
  const res = await fetch(STRAPI + path, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + TOKEN },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    if (allowNotFound && res.status === 404) {
      return null;
    }
    throw new Error(`${method} ${path} ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function upsertCollection({ api, filter, data }) {
  const query = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    query.append(`filters[${key}][$eq]`, value);
  });
  const existing = await req(`/api/${api}?${query.toString()}`);
  if (existing?.data?.length) {
    const id = existing.data[0].id;
    const localeParam = data.locale ? `?locale=${data.locale}` : '';
    await req(`/api/${api}/${id}${localeParam}`, { method: 'PUT', body: { data } });
    return id;
  }
  const created = await req(`/api/${api}`, { method: 'POST', body: { data } });
  return created.data.id;
}

async function upsertSingle({ api, data }) {
  await req(`/api/${api}`, { method: 'PUT', body: { data } });
}

const PAGES = [
  {
    slug: 'landing',
    title: 'Landing',
    seo: {
      metaTitle: 'MetaRadio — 看得见的电磁世界',
      metaDescription: '射线跟踪仿真、动态 OTA、虚拟路测的一体化平台。',
    },
  },
  {
    slug: 'products',
    title: '核心产品',
    seo: {
      metaTitle: '核心产品 · MetaRadio',
      metaDescription: 'MetaRadio 的射线追踪引擎、动态 OTA 工具链与虚拟路测平台。',
    },
  },
  {
    slug: 'solutions',
    title: '解决方案',
    seo: {
      metaTitle: '行业解决方案 · MetaRadio',
      metaDescription: '机器人、无人机、车联网、高精度定位等行业方案。',
    },
  },
  {
    slug: 'capabilities',
    title: '技术能力',
    seo: {
      metaTitle: '技术能力 · MetaRadio',
      metaDescription: '材质建模、射线追踪、AI 闭环的数字孪生能力体系。',
    },
  },
  {
    slug: 'company',
    title: '关于我们',
    seo: {
      metaTitle: '关于 MetaRadio',
      metaDescription: '以射线跟踪法为核心的通道能力与虚拟路测提供商。',
    },
  },
];

const CASE_STUDIES = [
  {
    title: '虚拟路测驱动 5G 调优',
    slug: 'virtual-drive-platform',
    client: '华东 5G 运营商',
    summary: '通过虚拟路测提速 3D 场景构建，缩短测试周期 40%。',
  },
  {
    title: '车联网 OTA 实验室',
    slug: 'vehicle-ota-lab',
    client: '头部车企',
    summary: '构建覆盖整车天线的全姿态 OTA 测试体系。',
  },
  {
    title: '无人机 5G 指挥保障',
    slug: 'uav-network-assessment',
    client: '应急通信单位',
    summary: '保障沿海与山区无人机任务的指挥链路稳定。',
  },
  {
    title: '智能工厂机器人网络优化',
    slug: 'factory-robot-coverage',
    client: '智能制造企业',
    summary: '实现机器人集群的毫秒级指令响应。',
  },
  {
    title: '卫星回传网络规划',
    slug: 'satcom-deployment',
    client: '卫星通信运营商',
    summary: '完成多轨道协同的回传站布局设计。',
  },
  {
    title: '通感一体园区试点',
    slug: 'isac-campus',
    client: '智慧园区运营方',
    summary: '通信覆盖与安全感知一张网建设。',
  },
  {
    title: '城市级高精定位服务',
    slug: 'rtk-city',
    client: '测绘与导航企业',
    summary: '打造厘米级定位的城市服务网。',
  },
];

const SOLUTIONS = [
  { slug: 'virtual-drive', title: '虚拟路测', excerpt: '结合数字孪生与射线跟踪，为通信网络提供可重复的虚拟路测环境。' },
  { slug: 'vehicle-ota', title: '车联网 OTA 验证', excerpt: '面向智能汽车与车联网的多场景 OTA 测试与调优。' },
  { slug: 'uav-networking', title: '无人机指挥链路', excerpt: '保障无人机在复杂环境下的稳定通信。' },
  { slug: 'robotics-factory', title: '机器人工厂网络', excerpt: '为智能制造与仓储机器人提供高可靠无线网络。' },
  { slug: 'satcom-planning', title: '卫星回传规划', excerpt: '融合地面与星地链路的卫星回传规划与评估。' },
  { slug: 'isac', title: '通感一体园区', excerpt: '在同一网络内实现通信与感知的协同覆盖。' },
  { slug: 'precision-positioning', title: '高精定位网络', excerpt: '构建城市级 RTK 与差分定位的高精度网络。' },
];

const ARTICLES = [
  { slug: 'ray-tracing-ota', title: '射线跟踪如何加速 OTA 验证', excerpt: '解读射线跟踪在 OTA 场景的作用，以及如何缩短调试周期。' },
  { slug: 'vehicle-ota-checklist', title: '车联网 OTA 验证清单', excerpt: '暗室、转台与道路回放的组合策略。' },
  { slug: 'uav-network-design', title: '无人机指挥链路设计要点', excerpt: '复杂地形下保障无人机通信的三大关键环节。' },
  { slug: 'robotics-spectrum', title: '机器人网络的时延治理', excerpt: '智能制造场景中，射线追踪如何帮助控制无线时延。' },
  { slug: 'satcom-planning-playbook', title: '卫星回传规划实战指南', excerpt: '多轨道星座下，如何快速完成回传站规划？' },
  { slug: 'isac-blueprint', title: '通感一体的园区落地路径', excerpt: '通信与感知协同部署需要关注的关键指标。' },
  { slug: 'precision-positioning-pipeline', title: '高精定位网络部署指南', excerpt: 'RTK/差分服务网络的规划步骤与风险控制。' },
];

const RESOURCES = [
  { slug: 'product-whitepaper', title: 'MetaRadio 产品白皮书', desc: '包含射线跟踪引擎、动态 OTA 工具链、虚拟路测等模块介绍。' },
  { slug: 'vehicle-ota-guide', title: '车联网 OTA 测试指南', desc: '梳理车联网 OTA 实验室的建设流程与注意事项。' },
  { slug: 'uav-communication-kit', title: '无人机通信评估套件', desc: '链路规划模板、指标清单与试飞记录表。' },
  { slug: 'robotics-network-handbook', title: '机器人网络规划手册', desc: '智能工厂无线网络的部署、测量与优化指南。' },
  { slug: 'satcom-backhaul-whitepaper', title: '卫星回传规划白皮书', desc: '多轨道回传网络的设计方法与案例分享。' },
  { slug: 'isac-campus-kit', title: '通感一体园区蓝图', desc: '通感一体部署流程、频谱规划与 KPI 评估模板。' },
  { slug: 'precision-positioning-guide', title: '高精定位部署手册', desc: 'RTK/差分站点规划、误差建模与服务保障清单。' },
];

(async () => {
  console.log('🌱 Seeding Strapi content...');

  await upsertSingle({
    api: 'site-setting',
    data: {
      siteName: 'MetaRadio',
      socialLinks: [
        { name: 'GitHub', url: 'https://github.com/metaradio' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/metaradio' },
      ],
      defaultSeo: {
        metaTitle: 'MetaRadio',
        metaDescription: 'Electromagnetic digital twin for predictable connectivity.',
      },
    },
  });

  for (const page of PAGES) {
    await upsertCollection({
      api: 'pages',
      filter: { slug: page.slug },
      data: {
        title: page.title,
        slug: page.slug,
        locale: 'zh',
        seo: page.seo,
        blocks: [],
      },
    });
  }

  for (const study of CASE_STUDIES) {
    await upsertCollection({
      api: 'case-studies',
      filter: { slug: study.slug },
      data: {
        ...study,
        locale: 'zh',
        kpi: [],
      },
    });
  }

  for (const solution of SOLUTIONS) {
    await upsertCollection({
      api: 'solutions',
      filter: { slug: solution.slug },
      data: {
        ...solution,
        locale: 'zh',
        blocks: [],
      },
    });
  }

  for (const article of ARTICLES) {
    await upsertCollection({
      api: 'articles',
      filter: { slug: article.slug },
      data: {
        ...article,
        locale: 'zh',
        content: article.content || '',
        tags: [],
      },
    });
  }

  for (const resource of RESOURCES) {
    await upsertCollection({
      api: 'resources',
      filter: { slug: resource.slug },
      data: {
        ...resource,
        locale: 'zh',
        link: { name: resource.linkName || '下载', url: '#' },
      },
    });
  }

  console.log('✅ Strapi seed completed');
})();
