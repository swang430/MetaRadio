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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
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
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased flex flex-col min-h-screen`}
      >
        {/* 结构化数据：让 Google 与 LLM 都能精确摘出乾径的核心信息（§4.2）。 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MetaRadio (乾径科技)',
              alternateName: 'MetaRadio',
              url: process.env.SITE_URL || 'https://metaradio.tech',
              description:
                'The dual infrastructure for AI-Native wireless: an EM-twin R&D base (Lauraycs/MetaRadio) in the digital world and a neural-network soft-baseband terminal base (Liquid RF) in the physical world.',
              sameAs: ['https://x.com/metaradio', 'https://www.linkedin.com/company/metaradio'],
            }),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
