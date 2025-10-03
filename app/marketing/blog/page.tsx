import { PostCard } from '@/components/blocks/post-card';
import { Nav } from '@/components/nav';
import { listArticles } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 120;

export default async function BlogPage() {
  const posts = await listArticles();

  return (
    <div>
      <Nav />
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">洞察文章</h1>
            <p className="mt-4 text-base text-slate-600">分享通信仿真、动态 OTA 与虚拟路测的实践经验。</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                title={post.attributes.title}
                excerpt={post.attributes.excerpt}
                href={`/marketing/blog/${post.attributes.slug}`}
                category={post.attributes.tags?.[0]}
                estimate={5}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: '洞察 · MetaRadio',
  description: '通信测试、数字孪生与虚拟路测的行业洞察。',
};
