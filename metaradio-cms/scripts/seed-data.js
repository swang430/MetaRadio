/**
 * Seed 数据源（content-as-code）。
 * 每个条目：{ slug, locales: { en, 'zh-CN' } }，富文本用 Strapi blocks 格式。
 * 与前端 lib/mock-data.ts 保持一致，slug 与硬编码页/路由对齐。
 */
const rich = (text) => [{ type: 'paragraph', children: [{ type: 'text', text }] }];

module.exports = {
  // platform / solution 已随命名迁移退役（前端走 datasheet）；仅保留 resource seed。
  resources: [
    {
      slug: 'mvs-whitepaper',
      locales: {
        en: { Title: 'Measurement-Validated Simulation (MVS) Whitepaper', Description: rich('A deep dive into how MVS merges real-world measurement with high-fidelity simulation.'), type: 'White Paper', publicationDate: '2025-09-01' },
        'zh-CN': { Title: '测量验证仿真（MVS）白皮书', Description: rich('深入解读 MVS 方法论如何将真实测量与高保真仿真相结合。'), type: 'White Paper', publicationDate: '2025-09-01' },
      },
    },
    {
      slug: 'automotive-case-study',
      locales: {
        en: { Title: 'Automotive Virtual Drive-Test Case Study', Description: rich('A leading automaker cut drive-test cost by ~60% with Horizon One.'), type: 'Case Study', publicationDate: '2025-08-15' },
        'zh-CN': { Title: '某车企虚拟路测案例研究', Description: rich('某头部车企采用 Horizon One 将路测成本降低约 60%。'), type: 'Case Study', publicationDate: '2025-08-15' },
      },
    },
    {
      slug: 'csi-sensing-blog',
      locales: {
        en: { Title: 'Blog: The Future of CSI Sensing', Description: rich('Why CSI-based passive sensing will reshape how wireless networks are operated.'), type: 'Blog Post', publicationDate: '2025-07-20' },
        'zh-CN': { Title: '博客：CSI 感知的未来', Description: rich('为什么基于 CSI 的无源感知将重塑无线网络的运维方式。'), type: 'Blog Post', publicationDate: '2025-07-20' },
      },
    },
  ],
};
