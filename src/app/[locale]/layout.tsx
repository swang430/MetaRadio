import {getTranslations} from 'next-intl/server';
import {locales} from '@/i18n';
import {notFound} from 'next/navigation';
import {NextIntlClientProvider} from 'next-intl';
import { Inter, Noto_Sans_SC } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const notoSansSC = Noto_Sans_SC({
  variable: '--font-sans-sc',
  weight: ['400', '700'],
  subsets: ['latin'],
});

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations({locale, namespace: 'Layout'});
 
  return {
    title: t('title'),
    description: t('description'),
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
