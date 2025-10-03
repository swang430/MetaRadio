import { CaseCard } from '@/components/blocks/case-card';
import { Nav } from '@/components/nav';
import { listCaseStudies } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function CasesPage() {
  const cases = await listCaseStudies();

  return (
    <div>
      <Nav />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">成功案例</h1>
            <p className="mt-4 text-base text-slate-600">从运营商网络调优到智能制造，我们帮助客户构建可预测的电磁环境。</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((item) => (
              <CaseCard
                key={item.id}
                title={item.attributes.title}
                href={`/marketing/cases/${item.attributes.slug}`}
                client={item.attributes.client}
                summary={item.attributes.summary}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: '成功案例 · MetaRadio',
  description: '典型通信、汽车与行业场景的数字孪生与测试案例。',
};
