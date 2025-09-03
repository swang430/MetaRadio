'use client';

import React from 'react';
import Link from 'next/link';
import {useTranslations} from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const t_nav = useTranslations('Header'); // Using Header namespace for nav links as defined in JSON
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
              <li><Link href="/platform/hyperrt" className="hover:text-blue-400">{t_nav('platform')}</Link></li>
              <li><Link href="/solutions" className="hover:text-blue-400">{t_nav('solutions')}</Link></li>
              <li><Link href="/resources" className="hover:text-blue-400">{t_nav('resources')}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-400">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-bold text-lg">{t('followUs')}</h3>
            <div className="mt-2 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">{t('twitter')}</a>
              <a href="#" className="text-gray-400 hover:text-white">{t('linkedIn')}</a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-gray-500">
          <p>{t('copyright', {year: currentYear})}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
