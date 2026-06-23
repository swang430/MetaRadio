import Link from 'next/link';
import { assertVisible } from '../../../../lib/page-visibility';
import { CinematicHero } from '@/components/layout/CinematicHero';
import { getPage, type Page } from '../../../../lib/api';

export const dynamic = 'force-dynamic';

// 关于乾径 / About — 公司简介 + 底牌 + 客户与合作伙伴 + 地点。
// 文案由 Strapi page（seed-data/pages/about.md）提供，内容源不可达时降级到内联 COPY。
// 公司简介与客户/合作伙伴取自乾径 2025-09 对外路演材料（合作方为「仅展示部分」）。纯静态、中英双语。

type Locale = 'zh-CN' | 'en';
const pick = (l: string): Locale => (l === 'en' ? 'en' : 'zh-CN');

const COPY = {
  'zh-CN': {
    eyebrow: '关于乾径 · About MetaRadio',
    title: '站在同一场迁移的轴线上',
    sub: '通信正从专用器件迁移到通用算力，无线研发正从外场试错迁移到电磁孪生 + AI 闭环。这不是两件事，是同一场迁移的两端——乾径站在这条轴线上。',
    cardsTitle: '我们的底牌',
    cards: [
      { accent: 'cyan', tag: '团队', title: '电磁第一性原理 × GPU 工程能力', body: '北交大 / 北理工教授团队提供电磁与信道的第一性原理，三星 / 滴滴 / VIAVI 出身的实战派提供 GPU 与系统工程能力。两种基因，一个团队。' },
      { accent: 'emerald', tag: '技术栈', title: '贯穿仿真到终端的 GPU 加速电磁计算栈', body: 'Lauraycs（仿真）↔ Liquid RF（终端运行时）共享同一套 GPU 加速电磁计算栈与 AI-Native 方法论——一份电磁，两端基础设施。' },
      { accent: 'amber', tag: '商业模式', title: '研发基础设施 + 终端连接平台', body: '与晶泰同构——做 AI for Wireless 的研发基础设施；与高通同构——做下一代终端的连接平台。从研发服务到平台许可的混合模式。' },
    ],
    teamTitle: '公司与团队',
    companyBody: [
      '乾径科技（MetaRadio）是一家以「电磁空间孪生」为核心的 AI-Native 无线技术公司，愿景是成为加速智能化时代的核心引擎。我们相信，高质量的无线通信与感知网络是一切智能化应用的基础与前提、载体与保障——乾径以「准确、高效、可视」的电磁空间孪生、推演、构建与管控，把抽象的电波传播变成可计算、可验证、可运营的数字基础设施。',
      '历经十年（2011–2021）自主研发，团队打造了具备自主知识产权、代码可控的高性能射线追踪引擎，并产品化为 Lauraycs 系列高性能确定性电波传播推演一体机：频率覆盖 0.1–340 GHz，路损预测与实测的均方根误差小于 8 dB；是国际上唯一实现「数据生成速度与 5G/6G 系统真实运行速度同步」（每帧 500 微秒）的方案，并率先适配国产信创要求——在确定性无线仿真领域实现全球领先、自主可控的国产替代。',
      '乾径以终端测试为基本盘，以智能通信与高精度定位为增长点，形成「通信数字孪生 × 业务系统」，服务芯片、手机、整车、基站、测试机构、运营商、工厂与仓储、机器人、IoT 模组与轨道交通等行业，覆盖 5G/6G、低空经济、车联网与具身智能等场景。',
      '团队由北京交通大学等高校的电磁与信道建模教授，与来自三星、投资界及头部通信/出行企业的产业老兵组成——「电磁第一性原理 × GPU 工程能力」两种基因，一个团队。核心成员主导或参与了 ITU-R P.2108-1 地物损耗模型（中国牵头的唯一候选模型）与全球首个太赫兹通信标准 IEEE 802.15.3d-2017 等国际标准制定，多位入选全球前 2% 顶尖科学家。',
      '截至目前，团队累计提交电磁环境模型国际标准提案 24 项，授权国家发明专利 11 项、软件著作权 12 项，发表高水平期刊论文 400 余篇、专著 4 本；荣获 IET 卓越与创新奖金奖、中国通信学会技术发明一等奖等百余项国内外奖项，并已是国家高新技术企业。核心产品技术参数写入国家铁路局 5G-R 白皮书及技术规范。',
    ],
    partnersTitle: '客户与合作伙伴',
    partnerLead: '乾径已融入覆盖政府组织、行业协会、产业联盟、科研机构与龙头企业的 100+ 生态，并获得众多国际头部客户的认可。',
    partnerGroups: [
      { label: '运营商与基础设施', items: ['中国移动', '中国电信', '中国联通', '中国星网', '中国铁塔'] },
      { label: '设备、终端与测试', items: ['华为', '中兴', '诺基亚', '爱立信', '三星', '小米', 'vivo', '荣耀', 'VIAVI'] },
      { label: '轨道交通', items: ['中国国家铁路集团', '中国铁建', '中国铁设', '中国通建'] },
      { label: '科研机构与标准组织', items: ['中国信通院', 'IEEE', 'IET', '韩国电子通信研究院（ETRI）', '日本情报通信研究机构（NICT）', '创远信科', '天际航'] },
      { label: '高校与研究院', items: ['北京交通大学', '北京理工大学', '斯坦福大学', '密歇根大学', '耶鲁大学', '新加坡国立大学', '伦敦玛丽女王大学', '柏林工业大学', '马德里理工大学', '维也纳大学', 'NYU Wireless', '英国国家物理实验室（NPL）', '上海物理智能与机器人研究院'] },
    ],
    partnerNote: '仅展示部分合作伙伴。',
    locationsTitle: '地点',
    locations: ['北京', '上海', '行业实验室：重庆 · 东莞 · 昆山'],
    ctaTitle: '想更深入了解乾径？',
    ctaPrimary: '预约一次战略对话',
    ctaSecondary: '浏览产品与方案',
  },
  en: {
    eyebrow: 'About MetaRadio',
    title: 'On the axis of one great migration',
    sub: 'Communication is migrating from dedicated silicon to general compute; wireless R&D is migrating from field trial-and-error to EM twin + AI loop. Not two things — two ends of one migration. MetaRadio stands on that axis.',
    cardsTitle: 'What we are',
    cards: [
      { accent: 'cyan', tag: 'Team', title: 'EM first principles × GPU engineering', body: 'Professors from BJTU / BIT bring the first principles of electromagnetics and channels; practitioners from Samsung / DiDi / VIAVI bring GPU and systems engineering. Two kinds of DNA, one team.' },
      { accent: 'emerald', tag: 'Tech stack', title: 'A GPU-accelerated EM compute stack from simulation to terminal', body: 'Lauraycs (simulation) ↔ Liquid RF (terminal runtime) share one GPU-accelerated EM compute stack and AI-Native methodology — one EM reality, two infrastructures.' },
      { accent: 'amber', tag: 'Business model', title: 'R&D infrastructure + terminal connectivity platform', body: 'Like XtalPi — R&D infrastructure for AI-for-Wireless; like Qualcomm — the connectivity platform for next-gen terminals. A hybrid model from R&D services to platform licensing.' },
    ],
    teamTitle: 'Company & Team',
    companyBody: [
      'MetaRadio (QianJing Technology) is an AI-Native wireless technology company built around the "electromagnetic space twin," with a vision to become the core engine accelerating the intelligent era. We believe a high-quality wireless communication and sensing network is the foundation, premise, carrier and guarantee of every intelligent application — MetaRadio turns abstract radio-wave propagation into computable, verifiable and operable digital infrastructure through accurate, efficient and visual EM-space twinning, deduction, construction and control.',
      'Over a decade of in-house R&D (2011–2021), the team built a high-performance, IP-owned and code-controllable ray-tracing engine, productized as the Lauraycs series of deterministic radio-propagation appliances: covering 0.1–340 GHz with path-loss prediction within an 8 dB RMSE of measurements. It is the only solution in the world whose data-generation speed matches the real-world runtime of 5G/6G systems (500 µs per frame), and the first to adapt to China’s domestic-compute requirements — a globally leading, self-controllable domestic alternative in deterministic wireless simulation.',
      'With terminal testing as its foundation and intelligent communication and high-precision positioning as growth engines, MetaRadio forms a "communication digital twin × business system," serving chips, handsets, vehicles, base stations, test houses, operators, factories and warehousing, robotics, IoT modules and rail transit — across 5G/6G, the low-altitude economy, V2X and embodied intelligence.',
      'The team brings together electromagnetic and channel-modeling professors from universities such as Beijing Jiaotong University and industry veterans from Samsung, the investment world and leading comms/mobility companies — "EM first principles × GPU engineering," two kinds of DNA in one team. Core members have led or contributed to international standards including the ITU-R P.2108-1 clutter-loss model (China’s sole candidate model) and the world’s first terahertz communication standard IEEE 802.15.3d-2017, with several ranked among the world’s top 2% scientists.',
      'To date the team has submitted 24 international-standard proposals on EM-environment models, holds 11 national invention patents and 12 software copyrights, and has published 400+ high-level journal papers and 4 monographs. It has won 100+ domestic and international awards including the IET Excellence & Innovation Gold Award, and is a recognized National High-Tech Enterprise. Its core product parameters are written into China’s National Railway Administration 5G-R white paper and technical specifications.',
    ],
    partnersTitle: 'Customers & partners',
    partnerLead: 'MetaRadio is woven into a 100+ ecosystem of government bodies, industry associations, alliances, research institutes and leading enterprises, with recognition from many top global customers.',
    partnerGroups: [
      { label: 'Operators & infrastructure', items: ['China Mobile', 'China Telecom', 'China Unicom', 'China SatNet', 'China Tower'] },
      { label: 'Equipment, devices & test', items: ['Huawei', 'ZTE', 'Nokia', 'Ericsson', 'Samsung', 'Xiaomi', 'vivo', 'HONOR', 'VIAVI'] },
      { label: 'Rail transit', items: ['China State Railway Group', 'China Railway Construction (CRCC)', 'China Railway Design (CRDC)', 'CITCC'] },
      { label: 'Research institutes & standards', items: ['CAICT', 'IEEE', 'IET', 'ETRI (Korea)', 'NICT (Japan)', 'Transcom', 'Tianjihang'] },
      { label: 'Universities & institutes', items: ['Beijing Jiaotong University', 'Beijing Institute of Technology', 'Stanford', 'University of Michigan', 'Yale', 'NUS', 'Queen Mary University of London', 'TU Berlin', 'Universidad Politécnica de Madrid', 'University of Vienna', 'NYU Wireless', 'NPL', 'Shanghai Inst. of Physical Intelligence & Robotics'] },
    ],
    partnerNote: 'Showing selected partners only.',
    locationsTitle: 'Locations',
    locations: ['Beijing', 'Shanghai', 'Industry labs: Chongqing · Dongguan · Kunshan'],
    ctaTitle: 'Want to know MetaRadio more deeply?',
    ctaPrimary: 'Book a strategy call',
    ctaSecondary: 'Explore products & solutions',
  },
};

const ACCENT: Record<string, string> = { cyan: 'text-brand-cyan', emerald: 'text-brand-emerald', amber: 'text-brand-amber' };

/** Strapi page 分节 → COPY 形状；缺关键分节则回退内联 COPY。 */
function fromSections(page: Page, locale: string): typeof COPY['zh-CN'] {
  const secs = page.body?.sections ?? [];
  const S = (id: string) => secs.find((s) => s.id === id);
  const f = (id: string, k: string) => S(id)?.fields?.[k] ?? '';
  const cards = (S('cards')?.table ?? []).map((r) => ({ accent: r['Accent'], tag: r['Tag'], title: r['Title'], body: r['Body'] }));
  const companyBody = S('company')?.bullets ?? [];
  const partnerGroups = (S('partners')?.table ?? []).map((r) => ({
    label: r['Group'] ?? '',
    items: (r['Members'] ?? '').split(/[、,，]/).map((s) => s.trim()).filter(Boolean),
  }));
  const locations = S('locations')?.bullets ?? [];
  if (!S('hero') || cards.length < 3 || companyBody.length === 0 || partnerGroups.length === 0) return COPY[pick(locale)];
  return {
    eyebrow: f('hero', 'Eyebrow'), title: f('hero', 'Title'), sub: f('hero', 'Sub'),
    cardsTitle: f('hero', 'CardsTitle'), cards,
    teamTitle: f('hero', 'TeamTitle'), companyBody,
    partnersTitle: f('hero', 'PartnersTitle'), partnerLead: f('hero', 'PartnersLead'), partnerGroups, partnerNote: f('hero', 'PartnersNote'),
    locationsTitle: f('hero', 'LocationsTitle'), locations,
    ctaTitle: f('hero', 'CtaTitle'), ctaPrimary: f('hero', 'CtaPrimary'), ctaSecondary: f('hero', 'CtaSecondary'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  assertVisible('about');
  const page = await getPage('about', locale);
  const t = page ? fromSections(page, locale) : COPY[pick(locale)];

  return (
    <div className="flex flex-col">
      {/* Hero — 全站统一影院式（满幅电磁射线场） */}
      <CinematicHero eyebrow={t.eyebrow} title={t.title} sub={t.sub} />

      {/* 公司与团队（移到「底牌」之前） */}
      <section className="bg-brand-ink">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white md:text-3xl">{t.teamTitle}</h2>
            <div className="mt-6 space-y-4">
              {t.companyBody.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-slate-300">{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 底牌 */}
      <section className="bg-brand-ink-2">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="mb-10 text-2xl font-bold text-white md:text-3xl">{t.cardsTitle}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.cards.map((c) => (
              <div key={c.tag} className="flex flex-col rounded-2xl border border-white/10 bg-brand-surface p-7">
                <span className={`text-xs font-semibold uppercase tracking-widest ${ACCENT[c.accent]}`}>{c.tag}</span>
                <h3 className="mt-2 text-lg font-bold text-white">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 客户与合作伙伴 + 地点 */}
      <section className="bg-brand-ink">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <h2 className="text-2xl font-bold text-white md:text-3xl">{t.partnersTitle}</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">{t.partnerLead}</p>
          <div className="mt-8 space-y-6">
            {t.partnerGroups.map((g) => (
              <div key={g.label}>
                <div className="text-xs font-semibold uppercase tracking-widest text-brand-cyan">{g.label}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.items.map((p) => (
                    <span key={p} className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-slate-200">{p}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-slate-500">{t.partnerNote}</p>

          {/* 地点 */}
          <div className="mt-12 border-t border-white/10 pt-8">
            <h2 className="text-xl font-bold text-white">{t.locationsTitle}</h2>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-300">
              {t.locations.map((l) => (
                <li key={l} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-cyan" aria-hidden />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-navy text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-4xl">{t.ctaTitle}</h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href={`/${locale}/contact`} className="rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110">{t.ctaPrimary}</Link>
            <Link href={`/${locale}/products`} className="rounded-lg border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white/10">{t.ctaSecondary}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
