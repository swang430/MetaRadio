// 工具页 hero 插画（内联品牌 SVG，与 about/services 同一视觉语言）。
// 约束：viewBox 480×320，navy 面板 #0A1740，主色 cyan #00D1FF，面板 #16223f，强调 emerald #10B981。
// 纯展示、无交互；双语 aria-label 承载语义。
// 注：产品/解决方案的 hero 已升级为满幅影院射线场（见 HeroFieldBg），原 Products/SolutionsHeroArt 已下线。
const SVG_CLASS = 'h-auto w-full rounded-2xl border border-white/10 shadow-2xl';
const FONT = 'ui-sans-serif, system-ui, sans-serif';

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
