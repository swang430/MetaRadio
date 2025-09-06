import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {locales} from '@/i18n';
import {notFound} from 'next/navigation';

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export async function generateMetadata({params}: {params: {locale: string}}) {
//   const t = await getTranslations({locale: params.locale, namespace: 'Layout'});
 
//   return {
//     title: t('title'),
//     description: t('description'),
//   };
// }

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function RootLayout({ children, params }: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  let messages;
  try {
    messages = (await import(`../../../messages/${params.locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={params.locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
