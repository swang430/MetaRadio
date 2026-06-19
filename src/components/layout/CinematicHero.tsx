import type { ReactNode } from 'react';
import { HeroFieldBg } from '@/components/illustrations/HeroFieldBg';

/**
 * 全站统一的影院式 Hero：满幅程序化电磁射线场（HeroFieldBg）做背景，左侧渐变压暗保证文字可读，
 * eyebrow / title / sub 叠加其上。与首页、/products、/solutions 同款，形成统一的「电磁射线场」品牌纹理。
 * children 供页面追加 CTA / 指标等；minHClass 可调高度（列表页 62vh，内容页默认 56vh）。
 */
export function CinematicHero({
  title,
  sub,
  children,
  minHClass = 'min-h-[56vh]',
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  children?: ReactNode;
  minHClass?: string;
}) {
  return (
    <section className={`relative isolate flex ${minHClass} items-center overflow-hidden text-white`} style={{ backgroundColor: '#060B1A' }}>
      <HeroFieldBg className="absolute inset-0 h-full w-full" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{ background: 'linear-gradient(90deg, rgba(6,11,26,0.92) 0%, rgba(6,11,26,0.55) 42%, rgba(6,11,26,0) 78%)' }}
      />
      <div className="container relative z-10 mx-auto px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold leading-tight md:text-5xl" style={{ textShadow: '0 2px 28px rgba(0,0,0,0.55)' }}>{title}</h1>
          {sub && <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-200">{sub}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
