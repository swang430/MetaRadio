import type { Metadata } from 'next';
import LocalePage, {
  generateMetadata as generateLocaleMetadata,
  revalidate as localeRevalidate,
} from '../../[locale]/marketing/blog/page';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';

export const revalidate = localeRevalidate;

export default function BlogPage() {
  return <LocalePage params={{ locale: DEFAULT_LOCALE }} />;
}

export const generateMetadata = (context: { params: { locale?: string } }): Promise<Metadata> | Metadata =>
  generateLocaleMetadata({ params: { locale: DEFAULT_LOCALE, ...(context.params ?? {}) } });
