import LocaleHomePage, {
  generateMetadata as generateLocaleMetadata,
  revalidate as localeRevalidate,
} from './[locale]/page';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';

export const revalidate = localeRevalidate;

export default async function RootPage() {
  return LocaleHomePage({ params: { locale: DEFAULT_LOCALE } });
}

export async function generateMetadata() {
  return generateLocaleMetadata({ params: { locale: DEFAULT_LOCALE } });
}
