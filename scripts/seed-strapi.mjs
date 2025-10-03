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
    throw new Error(method + ' ' + path + ' ' + res.status + ' ' + (await res.text()));
  }
  return res.json();
}

async function upsertCollection({ api, filter, data }) {
  const query = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    query.append(`filters[${key}][$eq]`, value);
  });
  const { data: existing } = await req(`/api/${api}?${query.toString()}`);
  if (existing.length > 0) {
    const id = existing[0].id;
    await req(`/api/${api}/${id}`, { method: 'PUT', body: { data } });
    return id;
  }
  const created = await req(`/api/${api}`, { method: 'POST', body: { data } });
  return created.data.id;
}

async function upsertSingle({ api, data }) {
  await req(`/api/${api}`, { method: 'PUT', body: { data } });
}

(async () => {
  console.log('🌱 Seeding Strapi content...');

  await upsertSingle({
    api: 'site-setting',
    data: {
      siteName: 'MetaRadio',
      socialLinks: [{ name: 'GitHub', url: 'https://github.com/metaradio' }],
      defaultSeo: {
        metaTitle: 'MetaRadio',
        metaDescription: 'Electromagnetic digital twin for predictable connectivity.',
      },
    },
  });

  await upsertCollection({
    api: 'pages',
    filter: { slug: 'landing' },
    data: {
      title: 'Landing',
      slug: 'landing',
      locale: 'zh',
      seo: {
        metaTitle: 'MetaRadio — 看得见的电磁世界',
        metaDescription: '射线跟踪仿真、动态 OTA、虚拟路测的一体化平台。',
      },
      blocks: [],
    },
  });

  await upsertCollection({
    api: 'case-studies',
    filter: { slug: 'virtual-drive-platform' },
    data: {
      title: '虚拟路测平台',
      slug: 'virtual-drive-platform',
      client: '华东 5G 运营商',
      summary: '通过虚拟路测提速 3D 场景构建，缩短测试周期 40%。',
      challenge: '<p>复杂城市高架与地下空间导致传统路测成本高、效率低。</p>',
      approach: '<p>采用 MetaRadio 射线跟踪仿真 + 实测校准，构建可复现的路网场景。</p>',
      result: '<p>部署闭环模拟-验证流程，完成批量站点的预测与调优。</p>',
      kpi: [
        { label: '测试效率', value: '1.4', unit: 'x' },
        { label: '覆盖预测精度', value: '95', unit: '%' }
      ],
      locale: 'zh',
    },
  });

  await upsertCollection({
    api: 'solutions',
    filter: { slug: 'virtual-drive' },
    data: {
      title: '虚拟路测',
      slug: 'virtual-drive',
      excerpt: '结合数字孪生与射线跟踪，为通信网络提供可重复的虚拟路测环境。',
      blocks: [],
      locale: 'zh',
    },
  });

  await upsertCollection({
    api: 'articles',
    filter: { slug: 'ray-tracing-ota' },
    data: {
      title: '射线跟踪如何加速 OTA 验证',
      slug: 'ray-tracing-ota',
      excerpt: '解读射线跟踪在 OTA 场景的作用，以及如何缩短调试周期。',
      content: '<p>通过高保真仿真与自动化标定，工程团队可以快速锁定性能瓶颈。</p>',
      tags: ['射线跟踪', 'OTA'],
      locale: 'zh',
    },
  });

  await upsertCollection({
    api: 'resources',
    filter: { slug: 'product-whitepaper' },
    data: {
      title: 'MetaRadio 产品白皮书',
      slug: 'product-whitepaper',
      desc: '包含射线跟踪引擎、动态 OTA 工具链、虚拟路测等模块介绍。',
      link: { name: '下载 PDF', url: '#' },
      locale: 'zh',
    },
  });

  console.log('✅ Strapi seed completed');
})();
