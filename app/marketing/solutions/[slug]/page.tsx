import { BlocksRenderer } from '@/components/blocks/renderer';
import { CaseCard } from '@/components/blocks/case-card';
import { Nav } from '@/components/nav';
import { getSolutionBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type SolutionPageProps = {
  params: { slug: string };
};

function extractRelatedCases(solution: Awaited<ReturnType<typeof getSolutionBySlug>>) {
  const raw = solution?.attributes.relatedCases;
  if (!raw) return [] as Array<{ id: number | string; title: string; slug: string; client?: string | null; summary?: string | null }>;
  if (Array.isArray(raw)) {
    return raw.map((item: any) => ({
      id: item.id,
      title: item.attributes?.title || item.title,
      slug: item.attributes?.slug || item.slug,
      client: item.attributes?.client || item.client,
      summary: item.attributes?.summary || item.summary,
    }));
  }
  if (raw.data && Array.isArray(raw.data)) {
    return raw.data.map((item: any) => ({
      id: item.id,
      title: item.attributes?.title,
      slug: item.attributes?.slug,
      client: item.attributes?.client,
      summary: item.attributes?.summary,
    }));
  }
  return [];
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const solution = await getSolutionBySlug(params.slug);
  if (!solution) notFound();
  const { title, excerpt, blocks } = solution.attributes;
  const relatedCases = extractRelatedCases(solution);

  return (
    <div>
      <Nav />
      <header className="bg-slate-50 py-12">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
          {excerpt ? <p className="mt-4 max-w-2xl text-base text-slate-600">{excerpt}</p> : null}
        </div>
      </header>
      <BlocksRenderer blocks={blocks} />
      {relatedCases.length ? (
        <section className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-semibold text-slate-900">相关案例</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedCases.map((item) => (
                <CaseCard
                  key={item.id}
                  title={item.title}
                  href={`/marketing/cases/${item.slug}`}
                  client={item.client}
                  summary={item.summary}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const solution = await getSolutionBySlug(params.slug);
  if (!solution) return { title: 'MetaRadio' };
  const seo = solution.attributes.seo;
  const title = seo?.metaTitle || `${solution.attributes.title} · MetaRadio`;
  const description = seo?.metaDescription || solution.attributes.excerpt || undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}
