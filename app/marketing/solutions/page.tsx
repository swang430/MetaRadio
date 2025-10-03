import { Nav } from '@/components/nav';
import { listSolutions } from '@/lib/strapi';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 120;
const INTRO_COPY = '通信测试向行业纵深拓展：机器人、无人机、汽车通信、高精度定位、虚拟路测。';

export default async function SolutionsIndex() {
  const solutions = await listSolutions();

  return (
    <div>
      <Nav />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">解决方案</h1>
            <p className="mt-4 text-base text-slate-600">{INTRO_COPY}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <Link
                key={solution.id}
                href={`/marketing/solutions/${solution.attributes.slug}`}
                className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500"
              >
                <h2 className="text-lg font-semibold text-slate-900">{solution.attributes.title}</h2>
                {solution.attributes.excerpt ? (
                  <p className="mt-3 text-sm text-slate-600">{solution.attributes.excerpt}</p>
                ) : null}
                <span className="mt-6 inline-flex items-center text-sm font-medium text-indigo-600">
                  了解更多 →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: '解决方案 · MetaRadio',
  description: INTRO_COPY,
};
