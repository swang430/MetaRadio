import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;
const DEFAULT_DESCRIPTION = 'MetaRadio 的射线追踪引擎、动态 OTA 工具链与虚拟路测平台，覆盖通信研发与验证全流程。';

export default async function ProductsPage() {
  const page = await getPageBySlug('products');
  const blocks = page?.attributes.blocks || [];

  return (
    <div>
      <Nav />
      <BlocksRenderer blocks={blocks} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('products');
  const seo = page?.attributes.seo;
  return {
    title: seo?.metaTitle || '核心产品 · MetaRadio',
    description: seo?.metaDescription || DEFAULT_DESCRIPTION,
  };
}
