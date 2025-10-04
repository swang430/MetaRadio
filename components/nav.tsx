import Link from 'next/link';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import type { Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/navigation';

type NavProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Nav({ locale, dictionary }: NavProps) {
  const { common } = dictionary;
  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  const to = (path: string) => localizeHref(path, locale) || path;

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <nav className="container mx-auto flex flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between gap-3 sm:justify-start">
          <Link href={to('/')} className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-indigo-600" />
            <span className="text-xl font-bold tracking-tight" aria-label={common.brandName}>
              {common.brandName}
            </span>
          </Link>
          <Link
            href={localizeHref('/', otherLocale) || '/'}
            className="text-sm text-slate-600 transition-colors hover:text-indigo-600 sm:hidden"
          >
            {common.actions.switchLocale}
          </Link>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:flex sm:flex-wrap sm:items-center sm:gap-x-8">
            <li>
              <Link href={to('/marketing/solutions')} className="hover:text-indigo-600">
                {common.nav.solutions}
              </Link>
            </li>
            <li>
              <Link href={to('/marketing/products')} className="hover:text-indigo-600">
                {common.nav.products}
              </Link>
            </li>
            <li>
              <Link href={to('/capabilities')} className="hover:text-indigo-600">
                {common.nav.capabilities}
              </Link>
            </li>
            <li>
              <Link href={to('/marketing/cases')} className="hover:text-indigo-600">
                {common.nav.cases}
              </Link>
            </li>
            <li>
              <Link href={to('/marketing/blog')} className="hover:text-indigo-600">
                {common.nav.insights}
              </Link>
            </li>
            <li>
              <Link href={to('/marketing/resources')} className="hover:text-indigo-600">
                {common.nav.resources}
              </Link>
            </li>
            <li>
              <Link href={to('/company')} className="hover:text-indigo-600">
                {common.nav.about}
              </Link>
            </li>
            <li>
              <Link href={to('/contact')} className="hover:text-indigo-600">
                {common.nav.contact}
              </Link>
            </li>
          </ul>
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href={localizeHref('/', otherLocale) || '/'}
              className="text-sm text-slate-600 transition-colors hover:text-indigo-600"
            >
              {common.actions.switchLocale}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
