import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function CapabilitiesPage() {
  const page = await getPageBySlug('capabilities');
  const blocks = page?.attributes.blocks || [];

  return (
    <div>
      <Nav />
      <BlocksRenderer blocks={blocks} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('capabilities');
  const seo = page?.attributes.seo;
  return {
    title: seo?.metaTitle || '技术能力 · MetaRadio',
    description: seo?.metaDescription || '材质建模、射线追踪、AI 闭环等核心数字孪生能力。',
  };
}
