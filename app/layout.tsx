import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { resolveLocale, toHtmlLang } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

const bodyFont = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MetaRadio',
  description: 'Electromagnetic digital twin for predictable connectivity.',
};

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale?: string };
}) {
  const locale: Locale = resolveLocale(params?.locale);

  return (
    <html
      lang={toHtmlLang(locale)}
      className={`${bodyFont.variable} ${displayFont.variable}`}
      suppressHydrationWarning
    >
      {/* The body tag should be clean and only define base typography styles */}
      <body className="font-sans antialiased">
        {/* All background colors and layouts are now controlled by page/block components */}
        {children}
      </body>
    </html>
  );
}