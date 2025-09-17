'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Home');
  const locale = useLocale();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-600 opacity-90"></div>
        <video
          autoPlay
          loop
          muted
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        >
          <source src="https://www.remcom.com/templates/remcom/videos/waves_v2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl font-extrabold mb-4">{t('heroTitle')}</h1>
          <p className="text-xl max-w-3xl mx-auto">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* Core Platform Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">{t('corePlatformTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* HyperRT */}
            <Link href={`/${locale}/platform/hyperrt`} className="block bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Image src="/images/product.png" alt="HyperRT" width={120} height={120} className="mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">{t('hyperRtTitle')}</h3>
              <p className="text-gray-600">{t('hyperRtDescription')}</p>
            </Link>
            {/* RaySense */}
            <Link href={`/${locale}/platform/raysense`} className="block bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Image src="/images/product.png" alt="RaySense" width={120} height={120} className="mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">{t('raysenseTitle')}</h3>
              <p className="text-gray-600">{t('raysenseDescription')}</p>
            </Link>
            {/* CSI-based Positioning and Sensing */}
            <Link href={`/${locale}/platform/csi-sensing`} className="block bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <Image src="/images/product.png" alt="CSI Sensing" width={120} height={120} className="mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-2">{t('csiSensingTitle')}</h3>
              <p className="text-gray-600">{t('csiSensingDescription')}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">{t('solutionsTitle')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Virtual Drive Testing */}
            <Link href={`/${locale}/solutions/virtual-drive-testing`} className="block bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">{t('virtualDriveTestTitle')}</h3>
              <p className="text-gray-600">{t('virtualDriveTestDescription')}</p>
            </Link>
            {/* MIMO OTA */}
            <Link href={`/${locale}/solutions/mimo-ota`} className="block bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4">{t('mimoOtaTitle')}</h3>
              <p className="text-gray-600">{t('mimoOtaDescription')}</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}