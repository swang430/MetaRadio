import Link from 'next/link';
import { Nav } from '@/components/nav';
import { listResources } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function ResourcesPage() {
  const resources = await listResources();

  return (
    <div>
      <Nav />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">资料中心</h1>
            <p className="mt-4 text-base text-slate-600">下载白皮书、规格书和演示资料，快速了解 MetaRadio 的产品能力。</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {resources.map((item) => (
              <article key={item.id} className="flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">{item.attributes.title}</h2>
                  {item.attributes.desc ? <p className="mt-3 text-sm text-slate-600">{item.attributes.desc}</p> : null}
                </div>
                {item.attributes.link?.url ? (
                  <Link
                    href={item.attributes.link.url}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    {item.attributes.link.name || '查看详情'} →
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: '资源中心 · MetaRadio',
  description: '下载 MetaRadio 相关的白皮书、规格书与演示资料。',
};
