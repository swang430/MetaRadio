'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { isHidden } from '../../../lib/nav';

const Header = () => {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getPathWithoutLocale = (path: string) => {
    const localePrefix = `/${locale}`;
    if (path.startsWith(localePrefix)) {
      return path.substring(localePrefix.length) || '/';
    }
    return path;
  };

  const pathWithoutLocale = getPathWithoutLocale(pathname);
  const otherLocale = locale === 'en' ? 'zh-CN' : 'en';
  const switchLocaleHref = `/${otherLocale}${pathWithoutLocale}`;

  const navLinks = [
    { key: 'products', href: `/${locale}/products`, label: t('products') },
    { key: 'solutions', href: `/${locale}/solutions`, label: t('solutions') },
    { key: 'foundations', href: `/${locale}/foundations`, label: t('foundations') },
    { key: 'services', href: `/${locale}/services`, label: t('services') },
    { key: 'tools', href: `/${locale}/tools`, label: t('tools') },
    { key: 'resources', href: `/${locale}/resources`, label: t('resources') },
  ].filter((l) => !isHidden(l.key));
  const contactHref = `/${locale}/contact`;
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-brand-ink/85 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/${locale}`} onClick={closeMenu} className="inline-flex">
            {/* 反白 logo（白字 + 透明底），直接落在深色 Header 上。 */}
            <Image src="/images/logo-white.png" alt="乾径科技 MetaRadio Logo" width={4000} height={2250} className="h-[104px] w-auto" priority />
          </Link>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="py-2 px-3 text-slate-300 hover:text-brand-cyan">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* 桌面操作区 */}
        <div className="hidden md:flex items-center space-x-4">
          {isClient && (
            <Link href={switchLocaleHref} className="text-sm text-slate-400 hover:text-brand-cyan">
              {otherLocale === 'en' ? 'English' : '中文'}
            </Link>
          )}
          {/* 暂无独立登录系统，CTA 统一引导到联系/询单页 */}
          <Link href={contactHref} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {t('requestDemo')}
          </Link>
          <Link href={contactHref} className="border border-white/25 hover:bg-white/10 text-slate-200 font-bold py-2 px-4 rounded">
            {t('login')}
          </Link>
        </div>

        {/* 移动端：语言 + 汉堡按钮 */}
        <div className="flex md:hidden items-center space-x-3">
          {isClient && (
            <Link href={switchLocaleHref} className="text-sm text-slate-400 hover:text-brand-cyan">
              {otherLocale === 'en' ? 'EN' : '中'}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="p-2 text-slate-200 hover:text-brand-cyan"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {isMenuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-white/10 px-6 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="block py-2 text-slate-200 hover:text-brand-cyan"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={contactHref}
            onClick={closeMenu}
            className="block w-full text-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-3"
          >
            {t('requestDemo')}
          </Link>
          <Link
            href={contactHref}
            onClick={closeMenu}
            className="block w-full text-center border border-white/25 hover:bg-white/10 text-slate-200 font-bold py-2 px-4 rounded"
          >
            {t('login')}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
