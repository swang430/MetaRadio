import Image from 'next/image';

export type BulletProps = {
  title: string;
  description?: string | null;
  icon?: {
    url?: string | null;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

export function Bullet({ title, description, icon }: BulletProps) {
  return (
    <div className="group flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card transition hover:border-brand-400/40">
      {icon?.url ? (
        <Image
          src={icon.url}
          alt={icon.alt || 'bullet icon'}
          width={icon.width || 48}
          height={icon.height || 48}
          className="h-12 w-12 rounded-2xl object-cover shadow-inner"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg font-semibold text-brand-200 shadow-inner">
          •
        </div>
      )}
      <div>
        <h3 className="font-display text-lg text-white">{title}</h3>
        {description ? <p className="mt-2 text-sm text-slate-200/80">{description}</p> : null}
      </div>
    </div>
  );
}
