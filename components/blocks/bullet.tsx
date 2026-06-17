import { SafeImage } from './safe-image';
import clsx from 'clsx';
import { BaseCard } from './base-card';

export type BulletProps = {
  title: string;
  description?: string | null;
  icon?: {
    url?: string | null;
    alt?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  theme?: 'dark' | 'light';
};

export function Bullet({ title, description, icon, theme = 'dark' }: BulletProps) {
  return (
    <BaseCard theme={theme} className="p-6">
      <div className="relative flex h-full gap-4">
        {icon?.url ? (
          <SafeImage
            src={icon.url}
            alt={icon.alt || `Icon for ${title}`}
            width={icon.width || 48}
            height={icon.height || 48}
            className="h-12 w-12 flex-shrink-0 rounded-lg object-cover shadow-inner"
          />
        ) : (
          <div
            className={clsx(
              'flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg text-lg font-semibold',
              {
                'bg-slate-700 text-brand-300': theme === 'dark',
                'bg-slate-100 text-brand-500': theme === 'light',
              }
            )}
          >
            •
          </div>
        )}
        <div>
          <h3 className={clsx('font-display text-lg', { 'text-white': theme === 'dark', 'text-slate-900': theme === 'light' })}>
            {title}
          </h3>
          {description ? (
            <p className={clsx('mt-2 text-sm', { 'text-slate-300': theme === 'dark', 'text-slate-600': theme === 'light' })}>
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </BaseCard>
  );
}
