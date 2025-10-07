import { Bullet, BulletProps } from './bullet';

type BulletListProps = {
  title?: string | null;
  intro?: string | null;
  items: BulletProps[];
};

export function BulletList({ title, intro, items }: BulletListProps) {
  if (!items?.length) return null;
  return (
    <section className="relative py-20">
      <div className="container px-6">
        {title ? <h2 className="font-display text-3xl text-white md:text-4xl">{title}</h2> : null}
        {intro ? <p className="mt-3 max-w-2xl text-base text-slate-200/80 sm:text-lg">{intro}</p> : null}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <Bullet key={item.title + index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
