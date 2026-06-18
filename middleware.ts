import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './src/i18n';

export default createMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  localePrefix: 'as-needed'
});

export const config = {
  // 匹配除以下之外的所有路径：
  // - `/api`、`/_next`、`/_vercel`
  // - 任何含点的路径（如 favicon.ico、llms.txt、sitemap.xml、robots.txt）——
  //   这些根文件由专用 route/metadata 处理，绝不能被 i18n 重定向。
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};