// 首页 Hero 的满幅电影级背景：程序化「电磁射线场」——暗 navy 深空 + 发光源点 +
// 射线追踪扇面 + 波前 + 信号粒子。矢量、可无限缩放/调色，完全溶进 #060B1A。
// 这是「图即背景」的实现：用乾径自己的产品画面（射线/波束/电磁波）当背景，而非 stock 照片。
// 纯展示，aria-hidden（语义由 Hero 文案承载）。坐标确定性计算，无随机，SSR 安全。

const SRC_X = 1080;
const SRC_Y = 300;

// 射线扇面：从源点向左下方铺开，cos/sin 确定性求端点（角度 100°→228°）。
const RAYS = Array.from({ length: 20 }, (_, i) => {
  const ang = ((100 + (i * 128) / 19) * Math.PI) / 180;
  const len = 1750;
  return { x2: SRC_X + len * Math.cos(ang), y2: SRC_Y + len * Math.sin(ang), bright: i % 4 === 0 };
});

// 信号粒子：沿扇面、不同半径散布。
const PARTICLES = Array.from({ length: 16 }, (_, i) => {
  const ang = ((104 + (i * 120) / 15) * Math.PI) / 180;
  const r = 240 + (i % 5) * 150;
  return { cx: SRC_X + r * Math.cos(ang), cy: SRC_Y + r * Math.sin(ang), r: i % 3 === 0 ? 2.6 : 1.5 };
});

const ARCS = [150, 250, 360, 480, 620];

export function HeroFieldBg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="hf-src" cx="75%" cy="37%" r="58%">
          <stop offset="0%" stopColor="#00D1FF" stopOpacity="0.30" />
          <stop offset="32%" stopColor="#00D1FF" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#060B1A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hf-em" cx="10%" cy="94%" r="55%">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#060B1A" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hf-vig" cx="72%" cy="37%" r="78%">
          <stop offset="52%" stopColor="#060B1A" stopOpacity="0" />
          <stop offset="100%" stopColor="#060B1A" stopOpacity="0.92" />
        </radialGradient>
      </defs>

      <rect width="1440" height="820" fill="#060B1A" />
      <rect width="1440" height="820" fill="url(#hf-em)" />

      {/* 波前 */}
      <g fill="none" stroke="#00D1FF">
        {ARCS.map((r, i) => (
          <circle key={r} cx={SRC_X} cy={SRC_Y} r={r} strokeWidth="1" strokeOpacity={(0.11 - i * 0.014).toFixed(3)} />
        ))}
      </g>

      {/* 射线扇面：宽淡底层（辉光）+ 细亮层 */}
      <g stroke="#00D1FF" strokeLinecap="round">
        {RAYS.map((ry, i) => (
          <line key={`g${i}`} x1={SRC_X} y1={SRC_Y} x2={ry.x2.toFixed(1)} y2={ry.y2.toFixed(1)} strokeWidth={ry.bright ? 4 : 2} strokeOpacity={ry.bright ? 0.07 : 0.03} />
        ))}
        {RAYS.map((ry, i) => (
          <line key={`r${i}`} x1={SRC_X} y1={SRC_Y} x2={ry.x2.toFixed(1)} y2={ry.y2.toFixed(1)} strokeWidth={ry.bright ? 1.4 : 1} strokeOpacity={ry.bright ? 0.32 : 0.13} />
        ))}
      </g>

      {/* 信号粒子 */}
      <g fill="#7fe3ff">
        {PARTICLES.map((p, i) => (
          <circle key={i} cx={p.cx.toFixed(1)} cy={p.cy.toFixed(1)} r={p.r} fillOpacity="0.5" />
        ))}
      </g>

      {/* 源点辉光 + 核 */}
      <rect width="1440" height="820" fill="url(#hf-src)" />
      <circle cx={SRC_X} cy={SRC_Y} r="14" fill="none" stroke="#00D1FF" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx={SRC_X} cy={SRC_Y} r="6" fill="#bff0ff" />

      {/* 边缘压暗，溶进 #060B1A */}
      <rect width="1440" height="820" fill="url(#hf-vig)" />
    </svg>
  );
}
