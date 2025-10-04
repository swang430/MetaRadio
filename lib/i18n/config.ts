export const SUPPORTED_LOCALES = ['zh', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'zh';

export function isSupportedLocale(locale?: string): locale is Locale {
  return Boolean(locale && SUPPORTED_LOCALES.includes(locale as Locale));
}

export function resolveLocale(locale?: string): Locale {
  return isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
}

export function toHtmlLang(locale: Locale) {
  switch (locale) {
    case 'en':
      return 'en';
    case 'zh':
    default:
      return 'zh-CN';
  }
}
