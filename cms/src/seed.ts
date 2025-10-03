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

async function ensureCollectionType(strapi: SeedContext, uid: string, dataItems: Record<string, unknown>[], uniqueKey: string) {
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

  await ensureCollectionType(
    strapi,
    'api::page.page',
    [
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
      }
    ],
    'slug'
  );

  await ensureCollectionType(
    strapi,
    'api::case-study.case-study',
    [
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
          { label: '覆盖预测精度', value: '95', unit: '%' }
        ],
        cover: null,
        locale: 'zh'
      }
    ],
    'slug'
  );

  await ensureCollectionType(
    strapi,
    'api::solution.solution',
    [
      {
        title: '虚拟路测',
        slug: 'virtual-drive',
        excerpt: '结合数字孪生与射线跟踪，为通信网络提供可重复的虚拟路测环境。',
        blocks: [],
        locale: 'zh'
      }
    ],
    'slug'
  );

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

  await ensureCollectionType(
    strapi,
    'api::article.article',
    [
      {
        title: '射线跟踪如何加速 OTA 验证',
        slug: 'ray-tracing-ota',
        excerpt: '解读射线跟踪在 OTA 场景的作用，以及如何缩短调试周期。',
        content: '<p>通过高保真仿真与自动化标定，工程团队可以快速锁定性能瓶颈。</p>',
        cover: null,
        tags: ['射线跟踪', 'OTA'],
        locale: 'zh'
      }
    ],
    'slug'
  );

  await ensureCollectionType(
    strapi,
    'api::resource.resource',
    [
      {
        title: 'MetaRadio 产品白皮书',
        slug: 'product-whitepaper',
        desc: '包含射线跟踪引擎、动态 OTA 工具链、虚拟路测等模块介绍。',
        file: null,
        link: {
          name: '下载 PDF',
          url: '#'
        },
        locale: 'zh'
      }
    ],
    'slug'
  );

  strapi.log.info('[seed] MetaRadio content bootstrap finished');
}
