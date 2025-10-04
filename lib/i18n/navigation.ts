import { DEFAULT_LOCALE, type Locale } from './config';

function isExternal(url: string) {
  return /^(https?:)?\/\//.test(url) || url.startsWith('mailto:') || url.startsWith('tel:');
}

export function localizeHref(url?: string | null, locale?: Locale): string | null {
  if (!url) return null;
  if (!locale || isExternal(url) || url.startsWith('#')) {
    return url;
  }
  if (!url.startsWith('/')) {
    return url;
  }
  const isRoot = url === '/';

  if (locale === DEFAULT_LOCALE) {
    if (isRoot) return '/';
    if (url === `/${locale}` || url.startsWith(`/${locale}/`)) {
      return url;
    }
    return `/${locale}${url}`;
  }

  if (url === `/${locale}` || url.startsWith(`/${locale}/`)) {
    return url;
  }

  return `/${locale}${isRoot ? '' : url}`;
}
