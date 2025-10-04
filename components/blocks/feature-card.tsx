import type { ReactNode } from 'react';
import Link from 'next/link';

type FeatureCardProps = {
  title: string;
  description?: string | null;
  href?: string | null;
  icon?: ReactNode;
  linkLabel?: string | null;
};

export function FeatureCard({ title, description, href, icon, linkLabel }: FeatureCardProps) {
  const content = (
    <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <div className="flex items-start gap-4">
        {icon ? <div className="text-2xl text-indigo-600">{icon}</div> : null}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
        </div>
      </div>
      {href ? (
        <p className="mt-4 text-sm font-medium text-indigo-600">{linkLabel || 'Learn more →'}</p>
      ) : null}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-500">
        {content}
      </Link>
    );
  }

  return content;
}

type FeatureGridSectionProps = {
  title?: string | null;
  intro?: string | null;
  items: FeatureCardProps[];
};

export function FeatureGridSection({ title, intro, items }: FeatureGridSectionProps) {
  if (!items || items.length === 0) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title ? <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-600">{intro}</p> : null}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <FeatureCard key={item.title + index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
