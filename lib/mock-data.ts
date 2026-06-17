// 内容源（Strapi）不可达或尚无内容时的 Mock 兜底数据。
// 自 legacy 融合而来的“优雅降级”理念：宁可展示示例内容，也不要空白/崩溃。
//
// 约定：
// - 富文本字段使用 Strapi blocks 格式，兼容 extractTextFromDescription 与 BlocksRenderer。
// - platform / solution 的 slug 与前端硬编码页面 / 动态路由保持一致。
import type { Platform, Solution, Resource } from './api';

/** 生成 Strapi blocks 富文本（单段落）。 */
const rich = (text: string) => [{ type: 'paragraph', children: [{ type: 'text', text }] }];

type MockLocale = 'zh-CN' | 'en';
const pick = (locale: string): MockLocale => (locale === 'en' ? 'en' : 'zh-CN');

const PLATFORMS: Record<MockLocale, Platform[]> = {
  'zh-CN': [
    { id: 1, slug: 'hyperrt', name: 'HyperRT 仿真引擎', description: rich('高保真、实时的射线追踪引擎，支撑最复杂的无线仿真场景。') },
    { id: 2, slug: 'raysense', name: 'RaySense 感知设备', description: rich('便携式高分辨率信道探测仪，捕获无线环境的地面实况。') },
    { id: 3, slug: 'csi-sensing', name: 'CSI 定位与感知', description: rich('利用信道状态信息（CSI）实现高精度定位与环境感知。') },
  ],
  en: [
    { id: 1, slug: 'hyperrt', name: 'HyperRT Simulation Engine', description: rich('High-fidelity, real-time ray-tracing for the most demanding simulation scenarios.') },
    { id: 2, slug: 'raysense', name: 'RaySense Sensing Equipment', description: rich('Portable, high-resolution channel sounder capturing the ground truth of wireless environments.') },
    { id: 3, slug: 'csi-sensing', name: 'CSI-based Positioning & Sensing', description: rich('Leverage Channel State Information (CSI) for high-precision positioning and sensing.') },
  ],
};

const SOLUTIONS: Record<MockLocale, Solution[]> = {
  'zh-CN': [
    {
      id: 1,
      slug: 'virtual-drive-testing',
      name: '虚拟路测',
      description: rich('在实验室中重现真实路测场景，降低成本、提升效率与可重复性。'),
      challenge_title: '挑战',
      challenge: rich('物理路测成本高、效率低、且难以重复。'),
      solution_details_title: '方案',
      solution_details: rich('Horizon One 提供从数据采集到实验室重建的端到端虚拟路测方案。'),
      benefits_title: '收益',
      benefits: rich('显著降本、提速研发、并覆盖更多极端场景。'),
    },
    { id: 2, slug: 'mimo-ota', name: 'MIMO OTA 测试', description: rich('从信道建模到物理测试的端到端 MIMO OTA 解决方案。') },
  ],
  en: [
    {
      id: 1,
      slug: 'virtual-drive-testing',
      name: 'Virtual Drive Testing',
      description: rich('Recreate real-world drive-test scenarios in the lab — lower cost, higher efficiency and repeatability.'),
      challenge_title: 'The Challenge',
      challenge: rich('Physical drive testing is expensive, slow and hard to repeat.'),
      solution_details_title: 'The Solution',
      solution_details: rich('Horizon One delivers an end-to-end virtual drive-testing workflow, from data acquisition to lab recreation.'),
      benefits_title: 'Key Benefits',
      benefits: rich('Significant cost reduction, faster R&D, and wider scenario coverage.'),
    },
    { id: 2, slug: 'mimo-ota', name: 'MIMO OTA Testing', description: rich('End-to-end MIMO OTA solution from channel modeling to physical test.') },
  ],
};

const RESOURCES: Record<MockLocale, Resource[]> = {
  'zh-CN': [
    { id: 1, slug: 'mvs-whitepaper', Title: '测量验证仿真（MVS）白皮书', Description: rich('深入解读 MVS 方法论如何将真实测量与高保真仿真相结合。'), type: 'White Paper', publicationDate: '2025-09-01' },
    { id: 2, slug: 'automotive-case-study', Title: '某车企虚拟路测案例研究', Description: rich('某头部车企采用 Horizon One 将路测成本降低约 60%。'), type: 'Case Study', publicationDate: '2025-08-15' },
    { id: 3, slug: 'csi-sensing-blog', Title: '博客：CSI 感知的未来', Description: rich('为什么基于 CSI 的无源感知将重塑无线网络的运维方式。'), type: 'Blog Post', publicationDate: '2025-07-20' },
  ],
  en: [
    { id: 1, slug: 'mvs-whitepaper', Title: 'Measurement-Validated Simulation (MVS) Whitepaper', Description: rich('A deep dive into how MVS merges real-world measurement with high-fidelity simulation.'), type: 'White Paper', publicationDate: '2025-09-01' },
    { id: 2, slug: 'automotive-case-study', Title: 'Automotive Virtual Drive-Test Case Study', Description: rich('A leading automaker cut drive-test cost by ~60% with Horizon One.'), type: 'Case Study', publicationDate: '2025-08-15' },
    { id: 3, slug: 'csi-sensing-blog', Title: 'Blog: The Future of CSI Sensing', Description: rich('Why CSI-based passive sensing will reshape how wireless networks are operated.'), type: 'Blog Post', publicationDate: '2025-07-20' },
  ],
};

export function mockPlatforms(locale: string): Platform[] {
  return PLATFORMS[pick(locale)];
}

export function mockSolutions(locale: string): Solution[] {
  return SOLUTIONS[pick(locale)];
}

export function mockSolutionBySlug(slug: string, locale: string): Solution | null {
  return SOLUTIONS[pick(locale)].find((s) => s.slug === slug) ?? null;
}

export function mockResources(locale: string): Resource[] {
  return RESOURCES[pick(locale)];
}
