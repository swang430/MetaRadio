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
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {icon?.url ? (
        <Image
          src={icon.url}
          alt={icon.alt || 'bullet icon'}
          width={icon.width || 48}
          height={icon.height || 48}
          className="h-12 w-12 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">•</div>
      )}
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
      </div>
    </div>
  );
}
