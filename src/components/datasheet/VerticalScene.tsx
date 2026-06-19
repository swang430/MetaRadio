// V1–V6 datasheet 的统一 SVG「电磁孪生场景」插画。
// 没有成套统一风格的实拍/渲染素材时的矢量方案：navy 面板 + cyan 发射/覆盖 motif +
// 各行业几何主体，六张同源、天然协调。自带品牌色（不依赖主题），矢量超轻、清晰。
// 接在 datasheet hero 右栏，与 L1-L3/Liquid RF 的「图卡」范式并列（二选一）。
import type { ReactNode } from 'react';

type Locale = 'zh-CN' | 'en';

const ALT: Record<string, Record<Locale, string>> = {
  'v1-low-altitude': {
    'zh-CN': '低空经济场景：楼宇间无人机与地面 C2 链路',
    en: 'Low-altitude scene: a drone among buildings with a ground C2 link',
  },
  'v2-satellite-ntn': {
    'zh-CN': '卫星 NTN 场景：卫星下行波束覆盖地面终端',
    en: 'Satellite NTN scene: a downlink beam covering a ground terminal',
  },
  'v3-isac': {
    'zh-CN': '通感一体 ISAC 场景：一束波束同时做感知与通信',
    en: 'ISAC scene: one beam doing sensing and communication at once',
  },
  'v4-autonomous-driving': {
    'zh-CN': '自动驾驶 V2X 场景：城市峡谷中的车路云通信与多径',
    en: 'Autonomous-driving V2X scene: vehicle-road-cloud links and multipath in an urban canyon',
  },
  'v5-robotics': {
    'zh-CN': '机器人场景：工厂级覆盖与 AGV 无线链路',
    en: 'Robotics scene: factory-grade coverage and an AGV wireless link',
  },
  'v6-6g': {
    'zh-CN': '6G 场景：融合一切的多频段连接中枢',
    en: '6G scene: a multi-band hub connecting everything',
  },
  'l1-ray-tracing': {
    'zh-CN': 'L1 射线跟踪场景：发射点的多径射线在建筑与地面间反射到终端',
    en: 'L1 ray-tracing scene: multipath rays reflecting among buildings and ground to a terminal',
  },
  'l2-virtual-drive-test': {
    'zh-CN': 'L2 虚拟路测 / HIL 场景：暗室探头环包围车辆做 OTA 与硬件在环',
    en: 'L2 virtual drive test / HIL scene: an MPAC probe ring around a vehicle for OTA & hardware-in-the-loop',
  },
  'l3-em-twin': {
    'zh-CN': 'L3 电磁孪生场景：真实城市与其数字孪生镜像 + 覆盖等值线',
    en: 'L3 EM-twin scene: a real city mirrored as its digital twin with coverage contours',
  },
  'liquid-rf': {
    'zh-CN': 'Liquid RF 场景：神经网络软基带芯片向终端发射 RF',
    en: 'Liquid RF scene: a neural-network soft-baseband chip emitting RF to a terminal',
  },
};

const SCENES: Record<string, ReactNode> = {
  'v1-low-altitude': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="400" cy="50" r="170" fill="#00D1FF" opacity="0.08" />
      <line x1="30" y1="252" x2="450" y2="252" stroke="#2a3a63" strokeWidth="1.5" />
      <rect x="60" y="168" width="74" height="84" rx="4" fill="#1b2950" stroke="#33457a" strokeWidth="1" />
      <rect x="150" y="132" width="62" height="120" rx="4" fill="#1b2950" stroke="#33457a" strokeWidth="1" />
      <rect x="338" y="158" width="84" height="94" rx="4" fill="#1b2950" stroke="#33457a" strokeWidth="1" />
      <g fill="#00D1FF" opacity="0.45">
        <rect x="72" y="182" width="8" height="8" rx="1" />
        <rect x="92" y="182" width="8" height="8" rx="1" />
        <rect x="72" y="202" width="8" height="8" rx="1" />
        <rect x="162" y="148" width="8" height="8" rx="1" />
        <rect x="182" y="148" width="8" height="8" rx="1" />
        <rect x="162" y="172" width="8" height="8" rx="1" />
        <rect x="352" y="172" width="8" height="8" rx="1" />
        <rect x="372" y="172" width="8" height="8" rx="1" />
      </g>
      <line x1="97" y1="168" x2="97" y2="150" stroke="#dbeafe" strokeWidth="1.5" />
      <path d="M90 150 L104 150 L97 140 Z" fill="#dbeafe" />
      <g stroke="#00D1FF" strokeWidth="1.5" opacity="0.55" fill="none">
        <line x1="99" y1="146" x2="232" y2="92" />
        <line x1="103" y1="152" x2="240" y2="104" />
      </g>
      <g transform="translate(236,96)">
        <line x1="-26" y1="-8" x2="26" y2="-8" stroke="#9fd9ff" strokeWidth="2" />
        <ellipse cx="-26" cy="-8" rx="11" ry="3" fill="#00D1FF" opacity="0.8" />
        <ellipse cx="26" cy="-8" rx="11" ry="3" fill="#00D1FF" opacity="0.8" />
        <rect x="-16" y="-6" width="32" height="13" rx="3" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <line x1="0" y1="7" x2="0" y2="14" stroke="#9fd9ff" strokeWidth="1.5" />
      </g>
    </>
  ),
  'v2-satellite-ntn': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="90" cy="60" r="150" fill="#00D1FF" opacity="0.08" />
      <path d="M70 70 Q240 10 410 70" stroke="#33457a" strokeWidth="1.2" fill="none" opacity="0.7" />
      <g transform="translate(240,70)">
        <rect x="-18" y="-14" width="36" height="28" rx="3" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <g fill="#1b2950" stroke="#00D1FF" strokeWidth="1">
          <rect x="-58" y="-12" width="34" height="24" />
          <rect x="24" y="-12" width="34" height="24" />
        </g>
        <g stroke="#00D1FF" strokeWidth="0.8" opacity="0.6">
          <line x1="-47" y1="-12" x2="-47" y2="12" />
          <line x1="-35" y1="-12" x2="-35" y2="12" />
          <line x1="35" y1="-12" x2="35" y2="12" />
          <line x1="47" y1="-12" x2="47" y2="12" />
        </g>
      </g>
      <path d="M222 84 L150 246 L330 246 L258 84 Z" fill="#00D1FF" opacity="0.10" />
      <g stroke="#00D1FF" strokeWidth="1.2" opacity="0.5" fill="none">
        <line x1="228" y1="86" x2="172" y2="244" />
        <line x1="252" y1="86" x2="308" y2="244" />
      </g>
      <line x1="30" y1="252" x2="450" y2="252" stroke="#2a3a63" strokeWidth="1.5" />
      <rect x="70" y="222" width="44" height="30" rx="3" fill="#1b2950" stroke="#33457a" />
      <rect x="360" y="216" width="50" height="36" rx="3" fill="#1b2950" stroke="#33457a" />
      <g transform="translate(240,248)">
        <path d="M-12 0 A14 14 0 0 1 12 0 Z" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <line x1="0" y1="-7" x2="0" y2="-18" stroke="#9fd9ff" strokeWidth="1.2" />
      </g>
    </>
  ),
  'v3-isac': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="240" cy="60" r="150" fill="#00D1FF" opacity="0.08" />
      <line x1="30" y1="252" x2="450" y2="252" stroke="#2a3a63" strokeWidth="1.5" />
      <g transform="translate(240,210)">
        <line x1="0" y1="42" x2="0" y2="-8" stroke="#dbeafe" strokeWidth="2" />
        <path d="M-9 -8 L9 -8 L0 -22 Z" fill="#dbeafe" />
      </g>
      <g stroke="#F59E0B" strokeWidth="1.4" opacity="0.7" fill="none">
        <path d="M232 196 Q150 150 96 168" />
      </g>
      <g stroke="#F59E0B" strokeWidth="1.2" opacity="0.45" fill="none">
        <path d="M96 150 A26 26 0 0 1 96 186" />
        <path d="M104 144 A36 36 0 0 1 104 192" />
      </g>
      <polygon points="86,168 100,160 100,176" fill="#F59E0B" opacity="0.85" />
      <g stroke="#00D1FF" strokeWidth="1.4" opacity="0.7" fill="none">
        <path d="M248 196 Q330 150 384 168" />
      </g>
      <g transform="translate(384,150)">
        <rect x="-13" y="0" width="26" height="42" rx="4" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <rect x="-9" y="5" width="18" height="28" rx="1.5" fill="#0A1740" />
        <circle cx="0" cy="38" r="1.6" fill="#9fd9ff" />
      </g>
      <g fill="#00D1FF" opacity="0.8">
        <circle cx="338" cy="156" r="2.4" />
        <circle cx="356" cy="150" r="2.4" />
      </g>
    </>
  ),
  'v4-autonomous-driving': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="400" cy="55" r="160" fill="#00D1FF" opacity="0.08" />
      <rect x="46" y="150" width="60" height="102" rx="4" fill="#1b2950" stroke="#33457a" />
      <rect x="392" y="142" width="58" height="110" rx="4" fill="#1b2950" stroke="#33457a" />
      <polygon points="150,252 330,252 300,214 180,214" fill="#16223f" />
      <line x1="240" y1="218" x2="240" y2="248" stroke="#33457a" strokeWidth="2" strokeDasharray="5 6" />
      <g transform="translate(192,224)">
        <rect x="-22" y="-11" width="44" height="20" rx="6" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <rect x="-12" y="-9" width="20" height="9" rx="3" fill="#0A1740" />
        <circle cx="-13" cy="9" r="4" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1" />
        <circle cx="13" cy="9" r="4" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1" />
      </g>
      <g transform="translate(294,232)">
        <rect x="-20" y="-10" width="40" height="18" rx="5" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <rect x="-10" y="-8" width="18" height="8" rx="3" fill="#0A1740" />
        <circle cx="-12" cy="8" r="3.6" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1" />
        <circle cx="12" cy="8" r="3.6" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1" />
      </g>
      <g transform="translate(360,158)">
        <line x1="0" y1="0" x2="0" y2="64" stroke="#dbeafe" strokeWidth="1.5" />
        <path d="M-7 0 L7 0 L0 -11 Z" fill="#dbeafe" />
      </g>
      <g stroke="#00D1FF" strokeWidth="1.4" opacity="0.6" fill="none">
        <path d="M210 214 Q250 188 286 220" />
        <path d="M310 220 Q338 196 356 168" />
      </g>
      <path d="M180 210 L96 154" stroke="#10B981" strokeWidth="1.2" opacity="0.5" strokeDasharray="4 5" fill="none" />
    </>
  ),
  'v5-robotics': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="240" cy="50" r="150" fill="#00D1FF" opacity="0.08" />
      <line x1="30" y1="252" x2="450" y2="252" stroke="#2a3a63" strokeWidth="1.5" />
      <rect x="60" y="150" width="70" height="102" rx="3" fill="#1b2950" stroke="#33457a" />
      <rect x="360" y="138" width="70" height="114" rx="3" fill="#1b2950" stroke="#33457a" />
      <g transform="translate(240,86)">
        <rect x="-16" y="-10" width="32" height="14" rx="3" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <line x1="0" y1="4" x2="0" y2="12" stroke="#9fd9ff" strokeWidth="1.2" />
      </g>
      <g stroke="#00D1FF" strokeWidth="1.2" opacity="0.5" fill="none">
        <path d="M204 110 A60 60 0 0 1 276 110" />
        <path d="M188 128 A86 86 0 0 1 292 128" />
        <path d="M172 146 A112 112 0 0 1 308 146" />
      </g>
      <g transform="translate(240,214)">
        <rect x="-26" y="-20" width="52" height="30" rx="5" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <rect x="-15" y="-13" width="30" height="11" rx="2" fill="#00D1FF" opacity="0.35" />
        <circle cx="-15" cy="10" r="6" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1.2" />
        <circle cx="15" cy="10" r="6" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1.2" />
        <line x1="0" y1="-20" x2="0" y2="-28" stroke="#9fd9ff" strokeWidth="1.2" />
        <circle cx="0" cy="-30" r="2.4" fill="#00D1FF" />
      </g>
      <path d="M276 100 L360 150" stroke="#10B981" strokeWidth="1.2" opacity="0.45" strokeDasharray="4 5" fill="none" />
    </>
  ),
  'v6-6g': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="240" cy="160" r="180" fill="#00D1FF" opacity="0.07" />
      <g stroke="#00D1FF" strokeWidth="1" opacity="0.4" fill="none">
        <circle cx="240" cy="160" r="46" />
        <circle cx="240" cy="160" r="80" />
        <circle cx="240" cy="160" r="116" />
      </g>
      <circle cx="240" cy="160" r="16" fill="#233360" stroke="#00D1FF" strokeWidth="1.5" />
      <circle cx="240" cy="160" r="5" fill="#00D1FF" />
      <g stroke="#00D1FF" strokeWidth="1.2" opacity="0.5" fill="none">
        <line x1="240" y1="160" x2="120" y2="92" />
        <line x1="240" y1="160" x2="372" y2="96" />
        <line x1="240" y1="160" x2="356" y2="232" />
        <line x1="240" y1="160" x2="128" y2="226" />
      </g>
      <g transform="translate(120,92)">
        <rect x="-11" y="-16" width="22" height="32" rx="3" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <rect x="-7" y="-12" width="14" height="20" rx="1" fill="#0A1740" />
      </g>
      <g transform="translate(372,96)">
        <circle r="13" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <circle r="4" fill="#9fd9ff" />
        <line x1="0" y1="13" x2="0" y2="20" stroke="#9fd9ff" strokeWidth="1.2" />
      </g>
      <g transform="translate(356,232)">
        <rect x="-16" y="-9" width="32" height="16" rx="5" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <circle cx="-9" cy="7" r="3" fill="#0A1740" stroke="#9fd9ff" strokeWidth="0.8" />
        <circle cx="9" cy="7" r="3" fill="#0A1740" stroke="#9fd9ff" strokeWidth="0.8" />
      </g>
      <g transform="translate(128,226)">
        <path d="M0 -14 L12 8 L-12 8 Z" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
      </g>
    </>
  ),
  // L1 射线跟踪：发射塔 → 多径（直射/建筑反射/地面反射）→ 终端
  'l1-ray-tracing': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="380" cy="64" r="160" fill="#00D1FF" opacity="0.08" />
      <line x1="30" y1="256" x2="450" y2="256" stroke="#2a3a63" strokeWidth="1.5" />
      <rect x="300" y="118" width="98" height="138" rx="4" fill="#1b2950" stroke="#33457a" strokeWidth="1" />
      <g fill="#00D1FF" opacity="0.4">
        <rect x="316" y="134" width="9" height="9" rx="1" /><rect x="340" y="134" width="9" height="9" rx="1" /><rect x="364" y="134" width="9" height="9" rx="1" />
        <rect x="316" y="160" width="9" height="9" rx="1" /><rect x="364" y="160" width="9" height="9" rx="1" />
        <rect x="316" y="186" width="9" height="9" rx="1" /><rect x="340" y="186" width="9" height="9" rx="1" />
      </g>
      <g transform="translate(74,150)">
        <line x1="0" y1="0" x2="0" y2="106" stroke="#33457a" strokeWidth="2" />
        <line x1="-12" y1="-2" x2="12" y2="-2" stroke="#9fd9ff" strokeWidth="2" />
        <circle cx="0" cy="-11" r="3" fill="#00D1FF" />
      </g>
      <g transform="translate(150,222)">
        <rect x="-12" y="0" width="24" height="34" rx="3" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <rect x="-8" y="5" width="16" height="20" rx="1.5" fill="#0A1740" />
      </g>
      <g stroke="#00D1FF" strokeWidth="1.5" opacity="0.65" fill="none">
        <path d="M76 144 L300 152" />
        <path d="M300 152 L158 220" />
        <path d="M76 150 L150 220" opacity="0.4" />
      </g>
      <path d="M80 150 L238 256 L154 224" stroke="#00D1FF" strokeWidth="1.2" opacity="0.3" strokeDasharray="4 5" fill="none" />
      <circle cx="300" cy="152" r="3" fill="#9fd9ff" />
      <circle cx="238" cy="256" r="3" fill="#9fd9ff" opacity="0.7" />
    </>
  ),
  // L2 虚拟路测 / HIL：MPAC 探头环包围车辆，硬件在环回路接机柜
  'l2-virtual-drive-test': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="200" cy="150" r="170" fill="#00D1FF" opacity="0.07" />
      <circle cx="200" cy="168" r="110" fill="none" stroke="#33457a" strokeWidth="1.4" strokeDasharray="3 7" opacity="0.8" />
      <g stroke="#00D1FF" strokeWidth="1.2" opacity="0.5" fill="none">
        <line x1="105" y1="223" x2="200" y2="168" /><line x1="90" y1="168" x2="200" y2="168" /><line x1="105" y1="113" x2="200" y2="168" />
        <line x1="295" y1="113" x2="200" y2="168" /><line x1="310" y1="168" x2="200" y2="168" /><line x1="295" y1="223" x2="200" y2="168" />
      </g>
      <g fill="#00D1FF" opacity="0.85">
        <circle cx="105" cy="223" r="3.4" /><circle cx="90" cy="168" r="3.4" /><circle cx="105" cy="113" r="3.4" />
        <circle cx="295" cy="113" r="3.4" /><circle cx="310" cy="168" r="3.4" /><circle cx="295" cy="223" r="3.4" />
      </g>
      <ellipse cx="200" cy="212" rx="64" ry="15" fill="#16223f" stroke="#33457a" strokeWidth="1" />
      <g transform="translate(200,184)">
        <rect x="-30" y="-2" width="60" height="20" rx="7" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <path d="M-18 -2 L-10 -13 L12 -13 L20 -2 Z" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <circle cx="-16" cy="18" r="5" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1.2" />
        <circle cx="16" cy="18" r="5" fill="#0A1740" stroke="#9fd9ff" strokeWidth="1.2" />
      </g>
      <g transform="translate(404,206)">
        <rect x="-20" y="-34" width="40" height="68" rx="4" fill="#16223f" stroke="#33457a" strokeWidth="1" />
        <g stroke="#10B981" strokeWidth="1.4" opacity="0.7"><line x1="-12" y1="-22" x2="12" y2="-22" /><line x1="-12" y1="-8" x2="12" y2="-8" /><line x1="-12" y1="6" x2="12" y2="6" /></g>
      </g>
      <path d="M262 188 Q345 150 384 186" stroke="#10B981" strokeWidth="1.4" opacity="0.6" strokeDasharray="5 5" fill="none" />
      <path d="M384 218 Q330 244 248 210" stroke="#10B981" strokeWidth="1.4" opacity="0.45" strokeDasharray="5 5" fill="none" />
    </>
  ),
  // L3 电磁孪生：真实城市 | 镜像数字孪生（cyan 线框）+ 覆盖等值线
  'l3-em-twin': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="330" cy="60" r="150" fill="#00D1FF" opacity="0.07" />
      <line x1="30" y1="256" x2="450" y2="256" stroke="#2a3a63" strokeWidth="1.5" />
      <line x1="240" y1="78" x2="240" y2="256" stroke="#00D1FF" strokeWidth="1" strokeDasharray="5 6" opacity="0.5" />
      <g fill="#1b2950" stroke="#33457a" strokeWidth="1">
        <rect x="60" y="182" width="46" height="74" /><rect x="118" y="148" width="44" height="108" /><rect x="174" y="198" width="40" height="58" />
      </g>
      <g fill="none" stroke="#00D1FF" strokeWidth="1.1" opacity="0.75">
        <rect x="266" y="182" width="46" height="74" /><rect x="324" y="148" width="44" height="108" /><rect x="380" y="198" width="40" height="58" />
      </g>
      <g stroke="#10B981" strokeWidth="1.2" opacity="0.55" fill="none">
        <path d="M346 132 A34 34 0 0 1 346 200" /><path d="M356 120 A48 48 0 0 1 356 212" />
      </g>
      <circle cx="346" cy="166" r="3" fill="#10B981" />
      <g fill="#9fd9ff" opacity="0.8"><circle cx="226" cy="120" r="2.4" /><circle cx="254" cy="120" r="2.4" /></g>
    </>
  ),
  // Liquid RF：神经网络软基带芯片 → 向终端发射 RF
  'liquid-rf': (
    <>
      <rect x="0" y="0" width="480" height="320" rx="16" fill="#0A1740" />
      <circle cx="170" cy="160" r="160" fill="#10B981" opacity="0.06" />
      <g transform="translate(176,168)">
        <g stroke="#10B981" strokeWidth="1.2" opacity="0.7">
          <line x1="-56" y1="-24" x2="-46" y2="-24" /><line x1="-56" y1="0" x2="-46" y2="0" /><line x1="-56" y1="24" x2="-46" y2="24" />
          <line x1="46" y1="-24" x2="56" y2="-24" /><line x1="46" y1="0" x2="56" y2="0" /><line x1="46" y1="24" x2="56" y2="24" />
          <line x1="-24" y1="-56" x2="-24" y2="-46" /><line x1="0" y1="-56" x2="0" y2="-46" /><line x1="24" y1="-56" x2="24" y2="-46" />
          <line x1="-24" y1="46" x2="-24" y2="56" /><line x1="0" y1="46" x2="0" y2="56" /><line x1="24" y1="46" x2="24" y2="56" />
        </g>
        <rect x="-46" y="-46" width="92" height="92" rx="12" fill="#16223f" stroke="#10B981" strokeWidth="1.5" />
        <g stroke="#00D1FF" strokeWidth="0.9" opacity="0.55">
          <line x1="-28" y1="-24" x2="0" y2="-9" /><line x1="-28" y1="0" x2="0" y2="-9" /><line x1="-28" y1="24" x2="0" y2="9" /><line x1="-28" y1="0" x2="0" y2="9" />
          <line x1="0" y1="-9" x2="28" y2="0" /><line x1="0" y1="9" x2="28" y2="0" />
        </g>
        <g fill="#10B981"><circle cx="-28" cy="-24" r="3" /><circle cx="-28" cy="0" r="3" /><circle cx="-28" cy="24" r="3" /><circle cx="28" cy="0" r="3.4" /></g>
        <g fill="#00D1FF"><circle cx="0" cy="-9" r="3.2" /><circle cx="0" cy="9" r="3.2" /></g>
      </g>
      <g stroke="#00D1FF" strokeWidth="1.3" opacity="0.5" fill="none">
        <path d="M250 134 A40 40 0 0 1 250 202" /><path d="M268 122 A56 56 0 0 1 268 214" /><path d="M286 110 A72 72 0 0 1 286 226" />
      </g>
      <g transform="translate(388,168)">
        <rect x="-15" y="-26" width="30" height="52" rx="4" fill="#233360" stroke="#9fd9ff" strokeWidth="1.2" />
        <rect x="-10" y="-20" width="20" height="34" rx="2" fill="#0A1740" />
        <circle cx="0" cy="20" r="1.8" fill="#9fd9ff" />
      </g>
    </>
  ),
};

/** datasheet slug 是否有对应的矢量场景插画。 */
export function hasScene(slug: string): boolean {
  return slug in SCENES;
}

export default function VerticalScene({ slug, locale }: { slug: string; locale: string }) {
  const scene = SCENES[slug];
  if (!scene) return null;
  const label = ALT[slug]?.[locale === 'en' ? 'en' : 'zh-CN'] ?? '';
  return (
    <svg
      viewBox="0 0 480 320"
      role="img"
      aria-label={label}
      className="h-auto w-full rounded-xl border border-white/10 shadow-md"
    >
      {scene}
    </svg>
  );
}
