import { Bullet, BulletProps } from './bullet';

type BulletListProps = {
  title?: string | null;
  intro?: string | null;
  items: BulletProps[];
};

export function BulletList({ title, intro, items }: BulletListProps) {
  if (!items?.length) return null;
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        {title ? <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-600">{intro}</p> : null}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Bullet key={item.title + index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
