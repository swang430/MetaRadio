// 产品 / 解决方案 / 工具 三个页面的 hero 插画（内联品牌 SVG，与 about/services 同一视觉语言）。
// 约束：viewBox 480×320，navy 面板 #0A1740，主色 cyan #00D1FF，面板 #16223f，强调 emerald #10B981。
// 纯展示、无交互；双语 aria-label 承载语义，画面内文字尽量用中性代码（L1-L3 / V1-V6）。
const SVG_CLASS = 'h-auto w-full rounded-2xl border border-white/10 shadow-2xl';
const FONT = 'ui-sans-serif, system-ui, sans-serif';

/** 产品：L1-L3 共性技术栈 → 馈入 Liquid RF（AI-Native 运行时）芯片。 */
export function ProductsHeroArt({ locale }: { locale: string }) {
  const en = locale === 'en';
  const layers = en
    ? [{ c: 'L3', t: 'EM-Twin' }, { c: 'L2', t: 'Virtual Drive · HIL' }, { c: 'L1', t: 'Ray-Tracing' }]
    : [{ c: 'L3', t: '电磁孪生' }, { c: 'L2', t: '虚拟路测 · HIL' }, { c: 'L1', t: '射线跟踪' }];
  const ys = [72, 132, 192];
  const xs = [58, 48, 38];
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label={en
        ? 'Products: the L1–L3 ray-tracing foundations stack feeding the Liquid RF AI-Native runtime'
        : '产品：L1–L3 射线跟踪共性技术栈，馈入 Liquid RF AI-Native 运行时'}
      className={SVG_CLASS}
    >
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="130" cy="160" r="180" fill="#00D1FF" opacity="0.06" />
      <g fontFamily={FONT}>
        {layers.map((l, i) => (
          <g key={l.c} transform={`translate(${xs[i]},${ys[i]})`}>
            <rect width="172" height="44" rx="8" fill={i === 2 ? '#1b2950' : '#16223f'} stroke="#00D1FF" strokeWidth="1.3" />
            <text x="16" y="28" fill="#00D1FF" fontSize="16" fontWeight="700">{l.c}</text>
            <text x="44" y="28" fill="#9fb4d8" fontSize="12">{l.t}</text>
            <circle cx="158" cy="22" r="3" fill="#00D1FF" opacity="0.8" />
          </g>
        ))}
        {/* foundation → runtime 流向 */}
        <path d="M226 150 H322" fill="none" stroke="#00D1FF" strokeWidth="1.6" strokeDasharray="5 5" opacity="0.7" />
        <path d="M318 144 L330 150 L318 156 Z" fill="#00D1FF" opacity="0.8" />
        {/* Liquid RF 芯片 */}
        <g transform="translate(384,150)">
          <g stroke="#10B981" strokeWidth="1.2" opacity="0.7">
            <line x1="-52" y1="-22" x2="-44" y2="-22" /><line x1="-52" y1="0" x2="-44" y2="0" /><line x1="-52" y1="22" x2="-44" y2="22" />
            <line x1="44" y1="-22" x2="52" y2="-22" /><line x1="44" y1="0" x2="52" y2="0" /><line x1="44" y1="22" x2="52" y2="22" />
            <line x1="-22" y1="-52" x2="-22" y2="-44" /><line x1="0" y1="-52" x2="0" y2="-44" /><line x1="22" y1="-52" x2="22" y2="-44" />
            <line x1="-22" y1="44" x2="-22" y2="52" /><line x1="0" y1="44" x2="0" y2="52" /><line x1="22" y1="44" x2="22" y2="52" />
          </g>
          <rect x="-44" y="-44" width="88" height="88" rx="12" fill="#16223f" stroke="#10B981" strokeWidth="1.5" />
          {/* 内部神经网络 */}
          <g stroke="#00D1FF" strokeWidth="0.9" opacity="0.55">
            <line x1="-26" y1="-22" x2="0" y2="-8" /><line x1="-26" y1="0" x2="0" y2="-8" /><line x1="-26" y1="22" x2="0" y2="8" /><line x1="-26" y1="0" x2="0" y2="8" />
            <line x1="0" y1="-8" x2="26" y2="0" /><line x1="0" y1="8" x2="26" y2="0" />
          </g>
          <g fill="#10B981">
            <circle cx="-26" cy="-22" r="3" /><circle cx="-26" cy="0" r="3" /><circle cx="-26" cy="22" r="3" />
            <circle cx="0" cy="-8" r="3.2" fill="#00D1FF" /><circle cx="0" cy="8" r="3.2" fill="#00D1FF" />
            <circle cx="26" cy="0" r="3.4" />
          </g>
        </g>
        <text x="384" y="232" fill="#10B981" fontSize="15" fontWeight="700" textAnchor="middle">Liquid RF</text>
        <text x="384" y="250" fill="#9fb4d8" fontSize="11" textAnchor="middle">{en ? 'AI-Native runtime' : 'AI-Native 运行时'}</text>
        <text x="130" y="286" fill="#6b81ad" fontSize="11" textAnchor="middle">{en ? 'L1–L3 · shared foundations' : 'L1–L3 · 共性技术底座'}</text>
      </g>
    </svg>
  );
}

/** 解决方案：中心电磁底座 → 六类行业场景（V1-V6）星座。 */
export function SolutionsHeroArt({ locale }: { locale: string }) {
  const en = locale === 'en';
  // 六个场景围绕中心，等角排布（hexagon）。
  const tiles = [
    { code: 'V1', x: 240, y: 52, glyph: 'drone' },
    { code: 'V2', x: 338, y: 106, glyph: 'sat' },
    { code: 'V3', x: 338, y: 214, glyph: 'isac' },
    { code: 'V6', x: 240, y: 268, glyph: '6g' },
    { code: 'V5', x: 142, y: 214, glyph: 'robot' },
    { code: 'V4', x: 142, y: 106, glyph: 'car' },
  ] as const;
  const glyph = (g: string) => {
    switch (g) {
      case 'drone':
        return <g stroke="#00D1FF" strokeWidth="1.6" strokeLinecap="round" fill="none"><line x1="-11" y1="-2" x2="11" y2="-2" /><circle cx="-11" cy="-2" r="3" /><circle cx="11" cy="-2" r="3" /><line x1="0" y1="-2" x2="0" y2="5" /><line x1="-4" y1="5" x2="4" y2="5" /></g>;
      case 'sat':
        return <g stroke="#00D1FF" strokeWidth="1.5" fill="none"><rect x="-5" y="-6" width="10" height="12" rx="2" /><rect x="-16" y="-4" width="8" height="8" /><rect x="8" y="-4" width="8" height="8" /><line x1="-8" y1="0" x2="-5" y2="0" /><line x1="5" y1="0" x2="8" y2="0" /></g>;
      case 'isac':
        return <g stroke="#00D1FF" strokeWidth="1.5" fill="none" strokeLinecap="round"><path d="M-12 6 A 12 12 0 0 1 12 6" /><path d="M-8 6 A 8 8 0 0 1 8 6" /><path d="M-4 6 A 4 4 0 0 1 4 6" /><circle cx="0" cy="6" r="1.4" fill="#00D1FF" /></g>;
      case '6g':
        return <g fill="#00D1FF"><rect x="-10" y="2" width="4" height="6" rx="1" /><rect x="-3" y="-2" width="4" height="10" rx="1" /><rect x="4" y="-7" width="4" height="15" rx="1" /></g>;
      case 'robot':
        return <g stroke="#00D1FF" strokeWidth="1.5" fill="none"><rect x="-9" y="-7" width="18" height="15" rx="3" /><line x1="0" y1="-7" x2="0" y2="-12" /><circle cx="0" cy="-13" r="1.6" fill="#00D1FF" /><circle cx="-4" cy="0" r="1.8" fill="#00D1FF" stroke="none" /><circle cx="4" cy="0" r="1.8" fill="#00D1FF" stroke="none" /></g>;
      case 'car':
        return <g stroke="#00D1FF" strokeWidth="1.5" fill="none"><path d="M-13 4 L-13 0 Q-13 -2 -11 -2 L-6 -2 L-3 -7 L7 -7 L10 -2 L12 -2 Q13 -2 13 0 L13 4" /><circle cx="-7" cy="5" r="2.6" fill="#0A1740" /><circle cx="7" cy="5" r="2.6" fill="#0A1740" /></g>;
      default:
        return null;
    }
  };
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label={en
        ? 'Solutions: one electromagnetic foundation serving six industry scenarios — low-altitude, satellite, ISAC, autonomous driving, robotics and 6G (V1–V6)'
        : '解决方案：一份电磁底座服务六类行业场景——低空、卫星、通感、自动驾驶、机器人、6G（V1–V6）'}
      className={SVG_CLASS}
    >
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="240" cy="160" r="170" fill="#00D1FF" opacity="0.06" />
      {/* 连线：中心 → 各场景 */}
      <g stroke="#00D1FF" strokeWidth="1" opacity="0.3">
        {tiles.map((t) => <line key={t.code} x1="240" y1="160" x2={t.x} y2={t.y} />)}
      </g>
      {/* 中心电磁底座 */}
      <g>
        <circle cx="240" cy="160" r="26" fill="#16223f" stroke="#00D1FF" strokeWidth="1.4" />
        <g stroke="#00D1FF" strokeWidth="1" opacity="0.4" fill="none"><circle cx="240" cy="160" r="15" /><circle cx="240" cy="160" r="9" /></g>
        <circle cx="240" cy="160" r="3.4" fill="#00D1FF" />
      </g>
      {/* 六场景瓦片 */}
      <g fontFamily={FONT}>
        {tiles.map((t) => (
          <g key={t.code} transform={`translate(${t.x},${t.y})`}>
            <rect x="-30" y="-24" width="60" height="48" rx="9" fill="#16223f" stroke="#00D1FF" strokeWidth="1.2" />
            <g transform="translate(0,-7)">{glyph(t.glyph)}</g>
            <text x="0" y="17" fill="#00D1FF" fontSize="11" fontWeight="700" textAnchor="middle">{t.code}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}

/** 工具：交互控制台——滑杆参数 + JSON 输出 + 复制。 */
export function ToolsHeroArt({ locale }: { locale: string }) {
  const en = locale === 'en';
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label={en
        ? 'Interactive tools console: tune parameters with sliders and get a usable JSON scenario template'
        : '交互工具控制台：用滑杆调参，生成可用的 JSON 场景模板'}
      className={SVG_CLASS}
    >
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="360" cy="150" r="170" fill="#00D1FF" opacity="0.06" />
      <g fontFamily={FONT}>
        {/* 左：参数滑杆面板 */}
        <rect x="40" y="56" width="190" height="208" rx="12" fill="#16223f" stroke="#00D1FF" strokeWidth="1.3" />
        <text x="58" y="84" fill="#9fb4d8" fontSize="12" fontWeight="600">{en ? 'Parameters' : '参数'}</text>
        {[112, 152, 192, 232].map((y, i) => (
          <g key={y}>
            <line x1="58" y1={y} x2="212" y2={y} stroke="#33456b" strokeWidth="3" strokeLinecap="round" />
            <line x1="58" y1={y} x2={[120, 170, 96, 188][i]} y2={y} stroke="#00D1FF" strokeWidth="3" strokeLinecap="round" />
            <circle cx={[120, 170, 96, 188][i]} cy={y} r="6" fill="#0A1740" stroke="#00D1FF" strokeWidth="2" />
          </g>
        ))}
        {/* 右：JSON 输出面板 */}
        <rect x="250" y="56" width="190" height="208" rx="12" fill="#0d1733" stroke="#10B981" strokeWidth="1.3" />
        <text x="268" y="84" fill="#10B981" fontSize="12" fontWeight="600">JSON</text>
        <text x="416" y="84" fill="#10B981" fontSize="16" fontWeight="700" textAnchor="middle">{'{ }'}</text>
        <g>
          {[
            { y: 108, x: 276, w: 70, c: '#7f93b8' },
            { y: 128, x: 288, w: 96, c: '#00D1FF' },
            { y: 148, x: 288, w: 70, c: '#7f93b8' },
            { y: 168, x: 288, w: 110, c: '#00D1FF' },
            { y: 188, x: 276, w: 54, c: '#7f93b8' },
          ].map((r) => <rect key={r.y} x={r.x} y={r.y} width={r.w} height="6" rx="3" fill={r.c} opacity="0.8" />)}
        </g>
        {/* 复制按钮 */}
        <rect x="276" y="216" width="138" height="28" rx="7" fill="#10B981" opacity="0.9" />
        <text x="345" y="235" fill="#06281f" fontSize="12" fontWeight="700" textAnchor="middle">{en ? 'Copy template' : '复制模板'}</text>
        {/* 流向箭头 参数 → 输出 */}
        <path d="M232 160 H248" fill="none" stroke="#9fb4d8" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.6" />
      </g>
    </svg>
  );
}
