'use client';

// 设计纲要 §5.1 高价值交互工具——让访客每次都带走一个"可带走的小物件"。
// 四个低/中复杂度工具，纯客户端计算，结束引导到 30 分钟咨询 CTA。
// 计算为指示性估算（非承诺），便于客户快速判断契合度。
import { useState } from 'react';
import Link from 'next/link';

type Locale = 'zh-CN' | 'en';

const T = {
  'zh-CN': {
    budget: {
      title: '研发预算节约计算器', desc: '输入你目前的外场与样机投入，估算用乾径研发 Sprint 大约能省多少。',
      trips: '每年外场试错（次）', tripCost: '单次外场成本（万元）', rounds: '每年样机迭代（轮）', roundCost: '单轮样机成本（万元）',
      result: '预估年节约', weeks: '预估缩短', weeksUnit: '周', money: '万元 / 年', note: '指示性估算：外场减少约 40–60%、样机省约 1 轮。',
    },
    perf: {
      title: '软基带性能预估器', desc: '选择算力平台与目标制式，估算神经网络软基带的吞吐与时延。',
      gpu: '算力平台', waveform: '目标制式', tp: '预估吞吐', lat: '预估时延', note: '指示性范围，实际取决于具体实现与配置。',
      gpus: ['Jetson Orin', 'Jetson Thor', '工业级 GPU', '数据中心 GPU'],
      waveforms: ['5G NR', 'Wi-Fi', 'NB-IoT NTN', '宽带自定义'],
    },
    flow: {
      title: '研发流程对照器', desc: '选择你目前的研发现状，看乾径在你流程里的最佳介入点。',
      current: '你目前的研发方式',
      options: ['全自研', '外包为主', '自研 + 外包混合'],
      recs: [
        '从【设计前评估包】切入：在你既有团队前置一层电磁孪生评估，少走一轮样机；成熟后升级【年度框架】。',
        '从【研发验证 Sprint】切入：把外包难以复现的问题在实验室稳定重放，给外包方明确的验收基线。',
        '从【全流程预验证】切入：统一自研与外包的回归基线，再以【联合实验室】沉淀为长期资产。',
      ],
    },
    scene: {
      title: '场景模板生成器', desc: '选择场景与参数，生成一份可直接喂给 Lauraycs Studio 的 JSON 模板。',
      scene: '场景', band: '频段', env: '环境', gen: '生成模板', copy: '复制 JSON', copied: '已复制',
      scenes: ['无人机 / 低空', 'AGV / 机器人', '自动驾驶 V2X', '卫星 NTN'],
      bands: ['Sub-6 GHz', 'mmWave 28 GHz', 'FR3 / 7–24 GHz', 'sub-THz'],
      envs: ['城市楼宇', '室内 / 工厂', '隧道 / 立交', '开阔郊外'],
    },
    ctaTitle: '想把这些数字落到你的真实场景？', cta: '预约 30 分钟研发咨询',
  },
  en: {
    budget: {
      title: 'R&D Budget Savings Calculator', desc: 'Enter your current field and prototype spend to estimate what an R&D Sprint could save.',
      trips: 'Field trips / year', tripCost: 'Cost per trip (¥10k)', rounds: 'Prototype rounds / year', roundCost: 'Cost per round (¥10k)',
      result: 'Estimated annual savings', weeks: 'Estimated time saved', weeksUnit: 'weeks', money: '¥10k / year', note: 'Indicative: field reduced ~40–60%, ~1 prototype round saved.',
    },
    perf: {
      title: 'Soft-Baseband Performance Estimator', desc: 'Pick a compute platform and target waveform to estimate throughput and latency.',
      gpu: 'Compute platform', waveform: 'Target waveform', tp: 'Est. throughput', lat: 'Est. latency', note: 'Indicative range; actuals depend on implementation and config.',
      gpus: ['Jetson Orin', 'Jetson Thor', 'Industrial GPU', 'Datacenter GPU'],
      waveforms: ['5G NR', 'Wi-Fi', 'NB-IoT NTN', 'Wideband custom'],
    },
    flow: {
      title: 'R&D Flow Matcher', desc: 'Pick your current R&D setup to see where MetaRadio fits best in your flow.',
      current: 'Your current R&D approach',
      options: ['All in-house', 'Mostly outsourced', 'In-house + outsourced'],
      recs: [
        'Start with Pre-Design Assessment: add an EM-twin assessment ahead of your team to save a prototype round; upgrade to an Annual Framework later.',
        'Start with an R&D Validation Sprint: replay hard-to-reproduce issues in the lab and give your vendor a clear acceptance baseline.',
        'Start with Full-Flow Pre-Validation: unify the regression baseline across in-house and outsourced, then a Joint Lab as a long-term asset.',
      ],
    },
    scene: {
      title: 'Scenario Template Generator', desc: 'Pick a scenario and parameters to generate a JSON template ready for Lauraycs Studio.',
      scene: 'Scenario', band: 'Band', env: 'Environment', gen: 'Generate template', copy: 'Copy JSON', copied: 'Copied',
      scenes: ['UAV / Low-altitude', 'AGV / Robotics', 'Autonomous V2X', 'Satellite NTN'],
      bands: ['Sub-6 GHz', 'mmWave 28 GHz', 'FR3 / 7–24 GHz', 'sub-THz'],
      envs: ['Urban buildings', 'Indoor / factory', 'Tunnel / overpass', 'Open suburban'],
    },
    ctaTitle: 'Want these numbers on your real scenario?', cta: 'Book a 30-min R&D consult',
  },
} as const;

const card = 'rounded-2xl border border-white/10 bg-brand-surface p-7';
const label = 'block text-sm font-medium text-slate-200';
const input = 'mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-brand-cyan focus:outline-none';

function NumberField({ label: l, value, onChange }: { label: string; value: number; onChange: (n: number) => void }) {
  return (
    <label className="block">
      <span className={label}>{l}</span>
      <input type="number" min={0} className={input} value={value} onChange={(e) => onChange(Number(e.target.value) || 0)} />
    </label>
  );
}

function Select({ label: l, value, options, onChange }: { label: string; value: number; options: readonly string[]; onChange: (i: number) => void }) {
  return (
    <label className="block">
      <span className={label}>{l}</span>
      <select className={input} value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map((o, i) => <option key={o} value={i}>{o}</option>)}
      </select>
    </label>
  );
}

export default function ToolsClient({ locale }: { locale: string }) {
  const t = T[(locale === 'en' ? 'en' : 'zh-CN') as Locale];

  // Tool 1 — budget
  const [trips, setTrips] = useState(6);
  const [tripCost, setTripCost] = useState(20);
  const [rounds, setRounds] = useState(4);
  const [roundCost, setRoundCost] = useState(30);
  // 指示性：外场减少 40–60%，样机省约 1 轮；每省一轮/一次外场约缩短 1–1.5 周。
  const saveLow = Math.round(trips * tripCost * 0.4 + roundCost);
  const saveHigh = Math.round(trips * tripCost * 0.6 + roundCost);
  const weeks = Math.max(2, Math.round(trips * 1.5 + rounds));

  // Tool 2 — perf (indicative compute index)
  const [gpu, setGpu] = useState(0);
  const [wf, setWf] = useState(0);
  const gpuIdx = [1, 6, 3, 12][gpu];
  const wfDemand = [3, 2, 1, 5][wf];
  const tpLow = Math.round((gpuIdx / wfDemand) * 120);
  const tpHigh = Math.round((gpuIdx / wfDemand) * 240);
  const latLow = (wfDemand * 0.4).toFixed(1);
  const latHigh = (wfDemand * 0.9).toFixed(1);

  // Tool 3 — flow
  const [flow, setFlow] = useState(0);

  // Tool 4 — scene
  const [scene, setScene] = useState(0);
  const [band, setBand] = useState(0);
  const [env, setEnv] = useState(0);
  const [copied, setCopied] = useState(false);
  const sceneSlug = ['v1-low-altitude', 'v5-robotics', 'v4-autonomous-driving', 'v2-satellite-ntn'][scene];
  const template = {
    scenario: t.scene.scenes[scene],
    band: t.scene.bands[band],
    environment: t.scene.envs[env],
    tx: { type: 'BS', height_m: 25 },
    rx: { type: 'UE', mobility: 'trajectory' },
    suggested_product: sceneSlug,
    engine: 'lauraycs',
  };
  const templateJson = JSON.stringify(template, null, 2);
  const copy = () => {
    navigator.clipboard?.writeText(templateJson).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const stat = (big: string, small: string, accent = 'text-brand-cyan') => (
    <div className="rounded-xl bg-white/5 px-5 py-4 text-center">
      <div className={`text-2xl font-bold ${accent}`}>{big}</div>
      <div className="mt-1 text-xs text-slate-400">{small}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Tool 1 */}
      <div className={card}>
        <h2 className="text-lg font-bold text-white">{t.budget.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{t.budget.desc}</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <NumberField label={t.budget.trips} value={trips} onChange={setTrips} />
          <NumberField label={t.budget.tripCost} value={tripCost} onChange={setTripCost} />
          <NumberField label={t.budget.rounds} value={rounds} onChange={setRounds} />
          <NumberField label={t.budget.roundCost} value={roundCost} onChange={setRoundCost} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {stat(`¥${saveLow}–${saveHigh}`, `${t.budget.result} · ${t.budget.money}`, 'text-brand-emerald')}
          {stat(`~${weeks}`, `${t.budget.weeks} · ${t.budget.weeksUnit}`)}
        </div>
        <p className="mt-3 text-xs text-slate-400">{t.budget.note}</p>
      </div>

      {/* Tool 2 */}
      <div className={card}>
        <h2 className="text-lg font-bold text-white">{t.perf.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{t.perf.desc}</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <Select label={t.perf.gpu} value={gpu} options={t.perf.gpus} onChange={setGpu} />
          <Select label={t.perf.waveform} value={wf} options={t.perf.waveforms} onChange={setWf} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {stat(`${tpLow}–${tpHigh} Mbps`, t.perf.tp)}
          {stat(`${latLow}–${latHigh} ms`, t.perf.lat, 'text-brand-emerald')}
        </div>
        <p className="mt-3 text-xs text-slate-400">{t.perf.note}</p>
      </div>

      {/* Tool 3 */}
      <div className={card}>
        <h2 className="text-lg font-bold text-white">{t.flow.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{t.flow.desc}</p>
        <div className="mt-5">
          <Select label={t.flow.current} value={flow} options={t.flow.options} onChange={setFlow} />
        </div>
        <div className="mt-5 rounded-xl border-l-2 border-brand-amber bg-amber-500/10 px-4 py-3 text-sm leading-relaxed text-slate-200">
          {t.flow.recs[flow]}
        </div>
      </div>

      {/* Tool 4 */}
      <div className={card}>
        <h2 className="text-lg font-bold text-white">{t.scene.title}</h2>
        <p className="mt-2 text-sm text-slate-300">{t.scene.desc}</p>
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Select label={t.scene.scene} value={scene} options={t.scene.scenes} onChange={setScene} />
          <Select label={t.scene.band} value={band} options={t.scene.bands} onChange={setBand} />
          <Select label={t.scene.env} value={env} options={t.scene.envs} onChange={setEnv} />
        </div>
        <pre className="mt-5 max-h-44 overflow-auto rounded-xl bg-brand-navy p-4 text-xs leading-relaxed text-slate-200"><code>{templateJson}</code></pre>
        <div className="mt-3 flex items-center gap-3">
          <button type="button" onClick={copy} className="rounded-lg bg-brand-cyan px-4 py-2 text-sm font-semibold text-brand-navy transition hover:brightness-110">
            {copied ? t.scene.copied : t.scene.copy}
          </button>
          <Link href={`/${locale}/solutions/${sceneSlug}`} className="text-sm font-medium text-brand-cyan">→ {sceneSlug}</Link>
        </div>
      </div>

      {/* CTA spanning */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl bg-brand-navy px-8 py-10 text-center text-white">
          <h2 className="mx-auto max-w-2xl text-2xl font-bold md:text-3xl">{t.ctaTitle}</h2>
          <Link href={`/${locale}/contact`} className="mt-6 inline-block rounded-lg bg-brand-cyan px-7 py-3 font-semibold text-brand-navy transition hover:brightness-110">{t.cta}</Link>
        </div>
      </div>
    </div>
  );
}
