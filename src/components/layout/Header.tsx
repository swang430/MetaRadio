'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

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
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/solutions`, label: t('solutions') },
    { href: `/${locale}/foundations`, label: t('foundations') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/tools`, label: t('tools') },
    { href: `/${locale}/resources`, label: t('resources') },
  ];
  const contactHref = `/${locale}/contact`;
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/${locale}`} onClick={closeMenu}>
            <Image src="/images/logo.png" alt="乾径科技 MetaRadio Logo" width={213} height={120} className="h-[120px] w-auto" priority />
          </Link>
        </div>

        {/* 桌面导航 */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="py-2 px-3 text-gray-600 hover:text-blue-500">
              {l.label}
            </Link>
          ))}
        </nav>

        {/* 桌面操作区 */}
        <div className="hidden md:flex items-center space-x-4">
          {isClient && (
            <Link href={switchLocaleHref} className="text-sm text-gray-500 hover:text-blue-600">
              {otherLocale === 'en' ? 'English' : '中文'}
            </Link>
          )}
          {/* 暂无独立登录系统，CTA 统一引导到联系/询单页 */}
          <Link href={contactHref} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {t('requestDemo')}
          </Link>
          <Link href={contactHref} className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded">
            {t('login')}
          </Link>
        </div>

        {/* 移动端：语言 + 汉堡按钮 */}
        <div className="flex md:hidden items-center space-x-3">
          {isClient && (
            <Link href={switchLocaleHref} className="text-sm text-gray-500 hover:text-blue-600">
              {otherLocale === 'en' ? 'EN' : '中'}
            </Link>
          )}
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="p-2 text-gray-700 hover:text-blue-600"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              {isMenuOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M3 12h18M3 6h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端下拉菜单 */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-gray-100 px-6 py-4 space-y-1">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={closeMenu}
              className="block py-2 text-gray-700 hover:text-blue-600"
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
            className="block w-full text-center border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded"
          >
            {t('login')}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
