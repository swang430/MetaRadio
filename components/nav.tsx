'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '@/lib/i18n/config';
import { localizeHref } from '@/lib/i18n/navigation';

type NavProps = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Nav({ locale, dictionary }: NavProps) {
  const { common } = dictionary;
  const otherLocale: Locale = locale === 'zh' ? 'en' : 'zh';
  const to = (path: string) => localizeHref(path, locale) || path;
  const pathname = usePathname() || '/';
  const router = useRouter();

  const stripLocale = (path: string) => {
    if (!path.startsWith('/')) return path;
    const segments = path.split('/').filter(Boolean);
    if (segments.length && SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
      segments.shift();
    } else if (!segments.length) {
      return '/';
    }
    return segments.length ? `/${segments.join('/')}` : '/';
  };

  const currentBasePath = stripLocale(pathname);
  const buildLocalePath = (target: Locale) => {
    if (target === DEFAULT_LOCALE) {
      return currentBasePath || '/';
    }
    if (currentBasePath === '/' || currentBasePath === '') {
      return `/${target}`;
    }
    return `/${target}${currentBasePath}`;
  };

  const localeSwitchHref = buildLocalePath(otherLocale);
  const handleLocaleSwitch = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.push(localeSwitchHref);
  };

  const navItems = [
    { label: common.nav.solutions, href: '/marketing/solutions' },
    { label: common.nav.products, href: '/marketing/products' },
    { label: common.nav.capabilities, href: '/capabilities' },
    { label: common.nav.cases, href: '/marketing/cases' },
    { label: common.nav.insights, href: '/marketing/blog' },
    { label: common.nav.resources, href: '/marketing/resources' },
    { label: common.nav.about, href: '/company' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-700 bg-dark-background">
      <div className="px-6">
        <div className="glass-panel flex flex-col gap-5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-4 sm:justify-start">
            <Link href={to('/')} className="group flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-500 via-brand-400 to-sky-400 text-white shadow-glow transition group-hover:scale-105">
                <span className="text-lg font-semibold">MR</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-semibold text-slate-100">
                  {common.brandName}
                </span>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Ray Tracing Intelligence</span>
              </div>
            </Link>
            <Link
              href={localeSwitchHref}
              onClick={handleLocaleSwitch}
              className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 transition hover:border-brand-400 hover:bg-brand-400/20 sm:hidden"
            >
              {common.actions.switchLocale}
            </Link>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <ul className="grid grid-cols-2 gap-3 text-sm text-slate-200 sm:flex sm:flex-wrap sm:items-center sm:gap-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={to(item.href)}
                    className="inline-flex items-center gap-1 rounded-full border border-transparent px-3 py-1.5 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                  >
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <Link
                href={localeSwitchHref}
                onClick={handleLocaleSwitch}
                className="hidden rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-brand-400 hover:bg-brand-400/20 sm:inline-flex"
              >
                {common.actions.switchLocale}
              </Link>
              <Link
                href={to('/contact')}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400 px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
              >
                {common.nav.contact}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
