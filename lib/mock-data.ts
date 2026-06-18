// 内容源（Strapi）不可达或尚无内容时的 Mock 兜底数据。
// 自 legacy 融合而来的“优雅降级”理念：宁可展示示例内容，也不要空白/崩溃。
//
// 约定：
// - 富文本字段使用 Strapi blocks 格式，兼容 extractTextFromDescription 与 BlocksRenderer。
// - platform / solution 的 slug 与前端硬编码页面 / 动态路由保持一致。
import type { Resource, Datasheet, DatasheetSection } from './api';

/** 生成 Strapi blocks 富文本（单段落）。 */
const rich = (text: string) => [{ type: 'paragraph', children: [{ type: 'text', text }] }];

type MockLocale = 'zh-CN' | 'en';
const pick = (locale: string): MockLocale => (locale === 'en' ? 'en' : 'zh-CN');

const RESOURCES: Record<MockLocale, Resource[]> = {
  'zh-CN': [
    { id: 1, slug: 'low-altitude-em-twin-whitepaper', Title: '《2026 低空通信电磁孪生白皮书》', Description: rich('确定性电磁孪生如何为城市低空的 C2、图传与定位链路降风险。'), type: 'White Paper', publicationDate: '2026-03-10' },
    { id: 2, slug: 'soft-baseband-engineering-whitepaper', Title: '《神经网络软基带工程化：从 PoC 到量产》', Description: rich('在 GPU/NPU 上工程化 AI-Native 软基带——OTA 演进、灰度发布、安全回滚。'), type: 'White Paper', publicationDate: '2026-02-18' },
    { id: 3, slug: 'v2x-validation-case-study', Title: '城市峡谷与隧道中的 V2X 链路验证', Description: rich('电磁孪生 + HIL 工作流把 V2X 偶发掉线定位到多径遮挡，并固化为可回归用例。'), type: 'Case Study', publicationDate: '2026-01-22' },
    { id: 4, slug: 'robotics-factory-case-study', Title: 'AGV/协作机器人的工厂级无线可靠性', Description: rich('产线级电磁孪生评估覆盖、驯服金属反射，保障 AGV 控制链路低时延。'), type: 'Case Study', publicationDate: '2025-12-12' },
    { id: 5, slug: 'isac-one-beam-blog', Title: '通感一体：同一束电磁波的两件事', Description: rich('为什么"在同一份电磁图上同时做感知与通信"是 5G-A/6G 最具想象力的方向，以及如何验证它。'), type: 'Blog Post', publicationDate: '2026-04-08' },
  ],
  en: [
    { id: 1, slug: 'low-altitude-em-twin-whitepaper', Title: '2026 Low-Altitude Communication EM-Twin Whitepaper', Description: rich('How a deterministic EM twin de-risks C2, video-downlink and positioning links in urban low-altitude airspace.'), type: 'White Paper', publicationDate: '2026-03-10' },
    { id: 2, slug: 'soft-baseband-engineering-whitepaper', Title: 'Neural-Network Soft Baseband: From PoC to Mass Production', Description: rich('Engineering an AI-Native soft baseband on GPU/NPU — OTA evolution, staged rollout, safe rollback.'), type: 'White Paper', publicationDate: '2026-02-18' },
    { id: 3, slug: 'v2x-validation-case-study', Title: 'V2X Link Validation in Canyons & Tunnels', Description: rich('An EM-twin + HIL workflow root-caused intermittent V2X drops to multipath blockage and hardened a regression suite.'), type: 'Case Study', publicationDate: '2026-01-22' },
    { id: 4, slug: 'robotics-factory-case-study', Title: 'Factory-Grade Wireless Reliability for AGV/Cobots', Description: rich('A production-line EM twin assessed coverage and tamed metal reflection to keep AGV control links low-latency.'), type: 'Case Study', publicationDate: '2025-12-12' },
    { id: 5, slug: 'isac-one-beam-blog', Title: 'ISAC: Two Jobs for One Beam of Waves', Description: rich('Why sensing and communication on one EM map is the most imaginative direction of 5G-A/6G — and how to validate it.'), type: 'Blog Post', publicationDate: '2026-04-08' },
  ],
};

export function mockResources(locale: string): Resource[] {
  return RESOURCES[pick(locale)];
}

export function mockResourceBySlug(slug: string, locale: string): Resource | null {
  return RESOURCES[pick(locale)].find((r) => r.slug === slug) ?? null;
}

// ---------- Datasheet 兜底 ----------
// 真实富内容由 Strapi 提供（seed-data/datasheets/*.md 导入）；这里仅在内容源不可达时
// 兜底出目录与一个最小 hero，保证列表/详情页不空白、不崩溃。

type DatasheetSeed = {
  code: string;
  slug: string;
  category: 'horizontal' | 'vertical' | 'ai-comms';
  title: string;
  product: string;
  summary: string;
};

const DATASHEET_CATALOG: Record<MockLocale, DatasheetSeed[]> = {
  'zh-CN': [
    { code: 'L1', slug: 'l1-ray-tracing', category: 'horizontal', title: 'Lauraycs · 确定性射线跟踪仿真引擎', product: 'Lauraycs', summary: '以物理学第一性原理精确复现电磁波的反射、绕射与穿透，提供高保真信道与覆盖数据。' },
    { code: 'L2', slug: 'l2-virtual-drive-test', category: 'horizontal', title: '虚拟路测与 HIL · 把外场带回实验室', product: 'Lauraycs VDT / HIL Suite', summary: '在实验室中重现真实路测与硬件在环场景，降本、提速、可重复。' },
    { code: 'L3', slug: 'l3-em-twin', category: 'horizontal', title: '电磁孪生 · 数字孪生的电磁层', product: 'MetaRadio EM-Twin Platform', summary: '为数字孪生补上电磁层，让无线连接成为可知、可测、可预测的工程对象。' },
    { code: 'V1', slug: 'v1-low-altitude', category: 'vertical', title: '低空经济 · 城市低空通信的电磁孪生', product: 'MetaRadio · Low Altitude', summary: '仿真城市楼宇间复杂低空信道，规划无人机航线，保障 C2 链路连续性。' },
    { code: 'V2', slug: 'v2-satellite-ntn', category: 'vertical', title: '卫星 NTN · 星地一体的电磁孪生', product: 'MetaRadio · Satellite NTN', summary: '模拟 LEO/GEO 信号在地面建筑群中的覆盖与穿透，评估天地协同终端性能。' },
    { code: 'V3', slug: 'v3-isac', category: 'vertical', title: 'ISAC 通感一体 · 让感知与通信在同一份电磁图中工作', product: 'MetaRadio · ISAC', summary: '在统一电磁图中联合优化感知与通信，支撑 ISAC 算法验证与性能评估。' },
    { code: 'V4', slug: 'v4-autonomous-driving', category: 'vertical', title: '自动驾驶 · V2X 与车路云通信的电磁孪生', product: 'MetaRadio · Autonomous Driving', summary: '复现城市峡谷、隧道、立交桥的复杂车路场景，验证车载通信链路。' },
    { code: 'V5', slug: 'v5-robotics', category: 'vertical', title: '机器人 · 工厂级电磁孪生与无线可靠性', product: 'MetaRadio · Robotics', summary: '评估复杂产线的信号覆盖，保障 AGV/协作机器人低时延高可靠通信。' },
    { code: 'V6', slug: 'v6-6g', category: 'vertical', title: '6G · 把"整合一切"的愿景落地为可验证的工程', product: 'MetaRadio · 6G Research', summary: '为 6G sub-THz、ISAC、智能超表面等前沿研究提供可验证的电磁孪生底座。' },
    { code: 'LRF', slug: 'liquid-rf', category: 'ai-comms', title: 'Liquid RF · 面向高算力终端的下一代通信', product: 'Liquid RF', summary: '当感知、推理、控制都在算力平台上重构时，通信也会从独立模组走向系统能力。Liquid RF 是这个过渡期的入口。' },
  ],
  en: [
    { code: 'L1', slug: 'l1-ray-tracing', category: 'horizontal', title: 'Lauraycs · Deterministic Ray-Tracing Engine', product: 'Lauraycs', summary: 'Reproduce reflection, diffraction and penetration from first principles for high-fidelity channel and coverage data.' },
    { code: 'L2', slug: 'l2-virtual-drive-test', category: 'horizontal', title: 'Virtual Drive Test & HIL · Bring the field into the lab', product: 'Lauraycs VDT / HIL Suite', summary: 'Recreate real drive-test and hardware-in-the-loop scenarios in the lab — lower cost, faster, repeatable.' },
    { code: 'L3', slug: 'l3-em-twin', category: 'horizontal', title: 'EM-Twin · The electromagnetic layer of the digital twin', product: 'MetaRadio EM-Twin Platform', summary: 'Add the EM layer to your digital twin, making wireless a knowable, measurable, predictable engineering object.' },
    { code: 'V1', slug: 'v1-low-altitude', category: 'vertical', title: 'Low-Altitude Economy · EM-twin for urban low-altitude comms', product: 'MetaRadio · Low Altitude', summary: 'Simulate complex low-altitude channels between buildings; plan UAV routes and keep C2 links continuous.' },
    { code: 'V2', slug: 'v2-satellite-ntn', category: 'vertical', title: 'Satellite NTN · A space-ground EM twin', product: 'MetaRadio · Satellite NTN', summary: 'Model LEO/GEO coverage and penetration through ground clutter; evaluate space-ground terminal performance.' },
    { code: 'V3', slug: 'v3-isac', category: 'vertical', title: 'ISAC · Sensing and communication on one EM map', product: 'MetaRadio · ISAC', summary: 'Jointly optimize sensing and communication on a unified EM map for ISAC algorithm validation.' },
    { code: 'V4', slug: 'v4-autonomous-driving', category: 'vertical', title: 'Autonomous Driving · EM twin for V2X and vehicle-road-cloud', product: 'MetaRadio · Autonomous Driving', summary: 'Recreate urban canyons, tunnels and overpasses to validate in-vehicle communication links.' },
    { code: 'V5', slug: 'v5-robotics', category: 'vertical', title: 'Robotics · Factory-grade EM twin and wireless reliability', product: 'MetaRadio · Robotics', summary: 'Assess coverage across complex production lines for low-latency, high-reliability AGV/cobot comms.' },
    { code: 'V6', slug: 'v6-6g', category: 'vertical', title: '6G · Turning the "integrate everything" vision into verifiable engineering', product: 'MetaRadio · 6G Research', summary: 'A verifiable EM-twin foundation for 6G sub-THz, ISAC and reconfigurable intelligent surface research.' },
    { code: 'LRF', slug: 'liquid-rf', category: 'ai-comms', title: 'Liquid RF · Next-Generation Communication for High-Compute Terminals', product: 'Liquid RF', summary: 'Once sensing, inference, and control are rebuilt on the compute platform, communication too moves from a standalone module to a system capability. Liquid RF is the entry point.' },
  ],
};

const dsSection = (
  partial: Pick<DatasheetSection, 'id' | 'heading' | 'level'> & Partial<DatasheetSection>,
): DatasheetSection => ({
  fields: {},
  items: [],
  table: [],
  bullets: [],
  text: '',
  ...partial,
});

function buildMockDatasheet(seed: DatasheetSeed, index: number): Datasheet {
  return {
    id: index + 1,
    slug: seed.slug,
    title: seed.title,
    product: seed.product,
    category: seed.category,
    code: seed.code,
    version: '2026.04',
    audience: 'technical-decision-maker',
    keywords: [],
    body: {
      sections: [
        dsSection({
          id: 'hero',
          key: 'Hero',
          heading: 'Hero',
          level: 1,
          fields: { Badge: `Datasheet · ${seed.code}`, Headline: seed.title, Sub: seed.summary },
        }),
      ],
    },
  };
}

export function mockDatasheets(locale: string): Datasheet[] {
  return DATASHEET_CATALOG[pick(locale)].map(buildMockDatasheet);
}

export function mockDatasheetBySlug(slug: string, locale: string): Datasheet | null {
  const list = DATASHEET_CATALOG[pick(locale)];
  const idx = list.findIndex((d) => d.slug === slug);
  return idx >= 0 ? buildMockDatasheet(list[idx], idx) : null;
}
