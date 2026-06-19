'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const Footer = () => {
  const t = useTranslations('Footer');
  const t_nav = useTranslations('Header');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink-2 border-t border-white/10 text-white">
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
            <ul className="mt-2 grid grid-cols-3 gap-x-6 gap-y-2">
              <li><Link href={`/${locale}/products`} className="hover:text-blue-400">{t_nav('products')}</Link></li>
              <li><Link href={`/${locale}/solutions`} className="hover:text-blue-400">{t_nav('solutions')}</Link></li>
              <li><Link href={`/${locale}/foundations`} className="hover:text-blue-400">{t_nav('foundations')}</Link></li>
              <li><Link href={`/${locale}/services`} className="hover:text-blue-400">{t_nav('services')}</Link></li>
              <li><Link href={`/${locale}/tools`} className="hover:text-blue-400">{t_nav('tools')}</Link></li>
              <li><Link href={`/${locale}/resources`} className="hover:text-blue-400">{t_nav('resources')}</Link></li>
              <li><Link href={`/${locale}/about`} className="hover:text-blue-400">{t_nav('about')}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-blue-400">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="font-bold text-lg">{t('followUs')}</h3>
            <div className="mt-2 flex space-x-4">
              <span className="group relative inline-block">
                <span className="cursor-default text-gray-400 transition group-hover:text-white">{t('wechat')}</span>
                {/* 悬停弹出微信公众号二维码（白底便于扫码） */}
                <span className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-3 w-52 -translate-x-1/2 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <span className="block rounded-lg border border-white/10 bg-white p-2 shadow-2xl">
                    <Image src="/images/wechat-qr.jpg" alt="乾径科技微信公众号二维码" width={699} height={566} className="h-auto w-full rounded" />
                  </span>
                </span>
              </span>
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