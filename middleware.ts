import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: defaultLocale,

  // Always redirect to a locale path prefix
  localePrefix: 'always' 
});

export const config = {
  matcher: ['/', '/(zh-CN|en)/:path*']
};
