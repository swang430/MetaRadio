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

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href={`/${locale}`}>
            <Image src="/images/logo.png" alt="Metaradio Logo" width={71} height={40} className="h-10 w-auto" priority />
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          {isClient ? (
            <>
              <Link href={`/${locale}/platform`} className="py-2 px-3 text-gray-600 hover:text-blue-500">{t('platform')}</Link>
              <Link href={`/${locale}/solutions`} className="py-2 px-3 text-gray-600 hover:text-blue-500">{t('solutions')}</Link>
              <Link href={`/${locale}/resources`} className="py-2 px-3 text-gray-600 hover:text-blue-500">{t('resources')}</Link>
            </>
          ) : (
            <>
              <span className="py-2 px-3 text-gray-400">{t('platform')}</span>
              <span className="py-2 px-3 text-gray-400">{t('solutions')}</span>
              <span className="py-2 px-3 text-gray-400">{t('resources')}</span>
            </>
          )}
        </nav>
        <div className="flex items-center space-x-4">
          {isClient ? (
            <Link href={switchLocaleHref} className="text-sm text-gray-500 hover:text-blue-600">
              {otherLocale === 'en' ? 'English' : '中文'}
            </Link>
          ) : (
            <span className="text-sm text-gray-500 w-12 h-5"></span>
          )}
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            {t('requestDemo')}
          </button>
          <button className="border border-gray-300 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded">
            {t('login')}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
