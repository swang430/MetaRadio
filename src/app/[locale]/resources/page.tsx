import { getTranslations } from 'next-intl/server';
import { CinematicHero } from '@/components/layout/CinematicHero';
import { getResources } from '../../../../lib/api';
import ResourceList from '../../../components/resources/ResourceList';

// 宣传海报（MWC 成品设计，静态 public/，模型 C）。作为目录条目并入资源列表，点击查看完整图。
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
  // 海报本地化为目录条目（标题/标签取当前语言），交由列表与白皮书/博客并列展示。
  const posters = POSTERS.map((p) => ({
    src: p.src,
    title: p.title[en ? 'en' : 'zh-CN'],
    tag: p.tag[en ? 'en' : 'zh-CN'],
  }));

  return (
    <div className="flex flex-col">
      {/* Hero — 全站统一影院式（满幅电磁射线场） */}
      <CinematicHero title={t('pageTitle')} sub={t('description')} minHClass="min-h-[48vh]" />

      <section className="bg-brand-ink">
        <div className="container mx-auto px-6 py-16">
          <ResourceList resources={resources} posters={posters} />
        </div>
      </section>
    </div>
  );
}
