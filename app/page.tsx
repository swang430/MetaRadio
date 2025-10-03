import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 60;
const DEFAULT_DESCRIPTION = 'MetaRadio 以射线跟踪法为核心，提供通信仿真、动态 OTA 与虚拟路测能力。';

export default async function HomePage() {
  const page = await getPageBySlug('landing');
  const blocks = page?.attributes.blocks || [];

  return (
    <div>
      <Nav />
      <BlocksRenderer blocks={blocks} />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('landing');
  const seo = page?.attributes.seo;
  const title = seo?.metaTitle || 'MetaRadio';
  const description = seo?.metaDescription || DEFAULT_DESCRIPTION;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
