/**
 * Resources 种子数据
 */

module.exports = [
  {
    slug: 'product-brochure',
    locales: {
      zh: {
        title: 'HyperRT 产品手册',
        description: '详细介绍 HyperRT 一体机的技术规格、应用场景与部署案例。',
        type: 'PDF',
        link: { name: '下载 PDF', url: '/downloads/hyperrt-brochure-zh.pdf' },
      },
      en: {
        title: 'HyperRT Product Brochure',
        description: 'Detailed technical specifications, application scenarios, and deployment cases for HyperRT.',
        type: 'PDF',
        link: { name: 'Download PDF', url: '/downloads/hyperrt-brochure-en.pdf' },
      },
    },
  },

  {
    slug: 'api-documentation',
    locales: {
      zh: {
        title: 'API 文档',
        description: 'HyperRT 仿真引擎的 REST API 与 Python SDK 使用指南。',
        type: 'Documentation',
        link: { name: '查看文档', url: 'https://docs.metaradio.tech/api' },
      },
      en: {
        title: 'API Documentation',
        description: 'REST API and Python SDK guide for HyperRT simulation engine.',
        type: 'Documentation',
        link: { name: 'View Docs', url: 'https://docs.metaradio.tech/api' },
      },
    },
  },

  {
    slug: 'technical-whitepaper',
    locales: {
      zh: {
        title: '射线跟踪技术白皮书',
        description: '深入讲解射线跟踪算法原理、材质建模方法与性能优化策略。',
        type: 'PDF',
        link: { name: '下载白皮书', url: '/downloads/ray-tracing-whitepaper-zh.pdf' },
      },
      en: {
        title: 'Ray Tracing Technical Whitepaper',
        description: 'In-depth explanation of ray tracing algorithms, material modeling methods, and performance optimization strategies.',
        type: 'PDF',
        link: { name: 'Download Whitepaper', url: '/downloads/ray-tracing-whitepaper-en.pdf' },
      },
    },
  },

  {
    slug: 'case-study-collection',
    locales: {
      zh: {
        title: '案例集锦',
        description: '汇总汽车、通信、工业等领域的典型应用案例与部署经验。',
        type: 'PDF',
        link: { name: '下载案例集', url: '/downloads/case-studies-zh.pdf' },
      },
      en: {
        title: 'Case Study Collection',
        description: 'Summary of typical application cases and deployment experiences in automotive, telecom, and industrial sectors.',
        type: 'PDF',
        link: { name: 'Download Collection', url: '/downloads/case-studies-en.pdf' },
      },
    },
  },

  {
    slug: 'industry-report-5g-6g',
    locales: {
      zh: {
        title: '5G/6G 网络规划行业报告',
        description: '分析运营商网络规划的技术趋势、工具演进与最佳实践。',
        type: 'PDF',
        link: { name: '下载报告', url: '/downloads/5g-6g-planning-report-zh.pdf' },
      },
      en: {
        title: '5G/6G Network Planning Industry Report',
        description: 'Analysis of technology trends, tool evolution, and best practices in operator network planning.',
        type: 'PDF',
        link: { name: 'Download Report', url: '/downloads/5g-6g-planning-report-en.pdf' },
      },
    },
  },

  {
    slug: 'video-tutorial-getting-started',
    locales: {
      zh: {
        title: 'HyperRT 快速入门视频教程',
        description: '30 分钟掌握 HyperRT 基础操作，从场景导入到仿真结果导出。',
        type: 'Video',
        link: { name: '观看视频', url: 'https://video.metaradio.tech/getting-started-zh' },
      },
      en: {
        title: 'HyperRT Quick Start Video Tutorial',
        description: 'Master HyperRT basics in 30 minutes, from scene import to simulation result export.',
        type: 'Video',
        link: { name: 'Watch Video', url: 'https://video.metaradio.tech/getting-started-en' },
      },
    },
  },
];
