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
      slug: 'low-altitude-em-twin-whitepaper',
      locales: {
        en: { Title: '2026 Low-Altitude Communication EM-Twin Whitepaper', Description: rich('How a deterministic EM twin de-risks C2, video-downlink and positioning links in urban low-altitude airspace.'), type: 'White Paper', publicationDate: '2026-03-10' },
        'zh-CN': { Title: '《2026 低空通信电磁孪生白皮书》', Description: rich('确定性电磁孪生如何为城市低空的 C2、图传与定位链路降风险。'), type: 'White Paper', publicationDate: '2026-03-10' },
      },
    },
    {
      slug: 'soft-baseband-engineering-whitepaper',
      locales: {
        en: { Title: 'Neural-Network Soft Baseband: From PoC to Mass Production', Description: rich('Engineering an AI-Native soft baseband on GPU/NPU — OTA evolution, staged rollout, safe rollback.'), type: 'White Paper', publicationDate: '2026-02-18' },
        'zh-CN': { Title: '《神经网络软基带工程化：从 PoC 到量产》', Description: rich('在 GPU/NPU 上工程化 AI-Native 软基带——OTA 演进、灰度发布、安全回滚。'), type: 'White Paper', publicationDate: '2026-02-18' },
      },
    },
    {
      slug: 'v2x-validation-case-study',
      locales: {
        en: { Title: 'V2X Link Validation in Canyons & Tunnels', Description: rich('An EM-twin + HIL workflow root-caused intermittent V2X drops to multipath blockage and hardened a regression suite.'), type: 'Case Study', publicationDate: '2026-01-22' },
        'zh-CN': { Title: '城市峡谷与隧道中的 V2X 链路验证', Description: rich('电磁孪生 + HIL 工作流把 V2X 偶发掉线定位到多径遮挡，并固化为可回归用例。'), type: 'Case Study', publicationDate: '2026-01-22' },
      },
    },
    {
      slug: 'robotics-factory-case-study',
      locales: {
        en: { Title: 'Factory-Grade Wireless Reliability for AGV/Cobots', Description: rich('A production-line EM twin assessed coverage and tamed metal reflection to keep AGV control links low-latency.'), type: 'Case Study', publicationDate: '2025-12-12' },
        'zh-CN': { Title: 'AGV/协作机器人的工厂级无线可靠性', Description: rich('产线级电磁孪生评估覆盖、驯服金属反射，保障 AGV 控制链路低时延。'), type: 'Case Study', publicationDate: '2025-12-12' },
      },
    },
    {
      slug: 'isac-one-beam-blog',
      locales: {
        en: { Title: 'ISAC: Two Jobs for One Beam of Waves', Description: rich('Why sensing and communication on one EM map is the most imaginative direction of 5G-A/6G — and how to validate it.'), type: 'Blog Post', publicationDate: '2026-04-08' },
        'zh-CN': { Title: '通感一体：同一束电磁波的两件事', Description: rich('为什么"在同一份电磁图上同时做感知与通信"是 5G-A/6G 最具想象力的方向，以及如何验证它。'), type: 'Blog Post', publicationDate: '2026-04-08' },
      },
    },
  ],
};
