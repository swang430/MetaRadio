import { getDatasheets } from '../../../../lib/api';
import { DatasheetListing } from '@/components/datasheet/DatasheetListing';

// 内容由 Strapi 实时提供（支持后端随时编辑），不在构建期冻结。
export const dynamic = 'force-dynamic';

// 解决方案 = 纵向行业方案（V1-V6, vertical）：在确定性电磁底座之上的端到端场景方案。
const COPY = {
  'zh-CN': {
    eyebrow: '解决方案',
    title: '六类高算力终端的端到端方案',
    sub: '在确定性电磁底座（L1-L3）之上，面向低空、卫星、通感、自动驾驶、机器人、6G 等场景的行业解决方案（V1-V6）——把共性技术落到具体业务结果。',
    vertical: '行业解决方案',
    verticalSub: 'V1-V6 · 面向具体场景的端到端方案',
  },
  en: {
    eyebrow: 'Solutions',
    title: 'End-to-end solutions for six terminal classes',
    sub: 'Built on the deterministic EM foundations (L1-L3), industry solutions for low-altitude, satellite, ISAC, autonomous driving, robotics and 6G (V1-V6) — turning core technology into concrete business outcomes.',
    vertical: 'Industry Solutions',
    verticalSub: 'V1-V6 · end-to-end solutions for specific scenarios',
  },
} as const;

export default async function SolutionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = COPY[locale === 'en' ? 'en' : 'zh-CN'];
  const datasheets = await getDatasheets(locale);
  const vertical = datasheets.filter((d) => d.category === 'vertical');

  return (
    <DatasheetListing
      locale={locale}
      eyebrow={t.eyebrow}
      title={t.title}
      sub={t.sub}
      groups={[{ heading: t.vertical, sub: t.verticalSub, list: vertical }]}
    />
  );
}
