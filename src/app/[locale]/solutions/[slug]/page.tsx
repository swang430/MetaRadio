import { getSolutionBySlug } from '../../../../../lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';

export default async function SolutionDetailPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const solution = await getSolutionBySlug(slug, locale);

  if (!solution) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{solution.name}</h1>
        <div className="prose max-w-3xl mx-auto mb-8">
          {solution.description && <BlocksRenderer content={solution.description} />}
        </div>
        
        <Link 
          href={`/api/generate-pdf?slug=${solution.slug}&locale=${locale}`}
          className="inline-block bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          target="_blank"
        >
          下载 PDF 版本
        </Link>
      </div>

      <div className="mt-16 border-t pt-12 space-y-12">
        {/* Challenge Section */}
        {solution.challenge && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{solution.challenge_title}</h2>
            <div className="prose max-w-none mx-auto">
              <BlocksRenderer content={solution.challenge} />
            </div>
          </section>
        )}

        {/* Solution Section */}
        {solution.solution_details && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl font-bold text-center mb-8">{solution.solution_details_title}</h2>
              <div className="prose max-w-none mx-auto">
                <BlocksRenderer content={solution.solution_details} />
              </div>
            </div>
          </section>
        )}

        {/* Benefits Section */}
        {solution.benefits && (
          <section>
            <h2 className="text-3xl font-bold text-center mb-8">{solution.benefits_title}</h2>
            <div className="prose max-w-none mx-auto">
              <BlocksRenderer content={solution.benefits} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
