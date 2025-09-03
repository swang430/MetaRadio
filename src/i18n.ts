import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['zh-CN', 'en'];
export const defaultLocale = 'zh-CN';

export default getRequestConfig(async ({locale}) => {
  // Provide a fallback for scenarios where the locale is not provided.
  const finalLocale = locale || defaultLocale;

  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
