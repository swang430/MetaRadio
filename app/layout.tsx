import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { resolveLocale, toHtmlLang } from '@/lib/i18n/config';
import type { Locale } from '@/lib/i18n/config';

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
    <html lang={toHtmlLang(locale)}>
      <body className="bg-slate-50 text-slate-800 antialiased">{children}</body>
    </html>
  );
}
