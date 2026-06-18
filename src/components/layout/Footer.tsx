'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const t_nav = useTranslations('Header');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-bold text-lg">{t('brandName')}</h3>
            <p className="mt-2 text-gray-400">
              {t('description')}
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-bold text-lg">{t('quickLinks')}</h3>
            <ul className="mt-2 space-y-2">
              <li><Link href={`/${locale}/datasheets`} className="hover:text-blue-400">{t_nav('products')}</Link></li>
              <li><Link href={`/${locale}/foundations`} className="hover:text-blue-400">{t_nav('foundations')}</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-blue-400">{t_nav('services')}</Link></li>
              <li><Link href={`/${locale}/resources`} className="hover:text-blue-400">{t_nav('resources')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-blue-400">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-bold text-lg">{t('followUs')}</h3>
            <div className="mt-2 flex space-x-4">
              <a href="https://x.com/metaradio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">{t('twitter')}</a>
              <a href="https://www.linkedin.com/company/metaradio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">{t('linkedIn')}</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>{t('copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;