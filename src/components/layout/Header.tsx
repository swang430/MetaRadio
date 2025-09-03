'use client';

import React from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

const Header = () => {
  const t = useTranslations('Header');

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-semibold text-gray-700">
            {t('brandName')}
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/platform" className="py-2 px-3 text-gray-600 hover:text-blue-500">{t('platform')}</Link>
          <Link href="/solutions" className="py-2 px-3 text-gray-600 hover:text-blue-500">{t('solutions')}</Link>
          <Link href="/resources" className="py-2 px-3 text-gray-600 hover:text-blue-500">{t('resources')}</Link>
        </nav>
        <div className="flex items-center space-x-4">
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
