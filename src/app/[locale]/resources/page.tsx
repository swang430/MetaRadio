import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { getResources } from '../../../../lib/api';
import ResourceList from '../../../components/resources/ResourceList';

// 宣传海报（MWC 成品设计，静态 public/，模型 C）。缩略展示 top，点击看完整图。
const POSTERS = [
  { src: '/images/poster-verticals.jpg', title: { 'zh-CN': 'V1–V6 六大行业场景', en: 'V1–V6 Six Vertical Scenarios' }, tag: { 'zh-CN': '行业海报', en: 'Verticals Poster' } },
  { src: '/images/poster-l1l3-stack.jpg', title: { 'zh-CN': 'Lauraycs L1–L3 电磁孪生栈', en: 'Lauraycs L1–L3 EM-Twin Stack' }, tag: { 'zh-CN': '技术海报', en: 'Tech Poster' } },
  { src: '/images/poster-liquid-rf.jpg', title: { 'zh-CN': 'MetaRadio · Liquid RF 终端通算一体', en: 'MetaRadio · Liquid RF Compute-Comms' }, tag: { 'zh-CN': '产品海报', en: 'Product Poster' } },
] as const;

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Resources' });
  const resources = await getResources(locale);
  const en = locale === 'en';

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pageTitle')}</h1>
      <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
        {t('description')}
      </p>

      <ResourceList resources={resources} />

      {/* 宣传海报墙 */}
      <section className="mt-16 border-t border-slate-200 pt-12">
        <header className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-brand-navy md:text-3xl">{en ? 'Posters & Boards' : '宣传海报'}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            {en ? 'Exhibition posters from MWC — the product stack and vertical scenarios at a glance. Click to view full size.' : 'MWC 展会成品海报 —— 一图看懂产品栈与行业场景。点击查看完整海报。'}
          </p>
        </header>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {POSTERS.map((p) => (
            <a
              key={p.src}
              href={p.src}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-brand-cyan hover:shadow-md"
            >
              <div className="aspect-[3/4] overflow-hidden bg-brand-navy">
                <Image
                  src={p.src}
                  alt={p.title[en ? 'en' : 'zh-CN']}
                  width={900}
                  height={2250}
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-emerald">{p.tag[en ? 'en' : 'zh-CN']}</p>
                  <h3 className="mt-1 text-sm font-semibold text-brand-navy group-hover:text-brand-cyan">{p.title[en ? 'en' : 'zh-CN']}</h3>
                </div>
                <span className="shrink-0 text-brand-cyan opacity-0 transition group-hover:opacity-100" aria-hidden>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}