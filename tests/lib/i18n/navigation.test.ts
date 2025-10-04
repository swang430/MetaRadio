import { describe, expect, it } from 'vitest';
import { localizeHref } from '@/lib/i18n/navigation';

describe('localizeHref', () => {
  it('returns original URL when locale is not provided', () => {
    expect(localizeHref('/contact')).toBe('/contact');
  });

  it('prefixes locale for internal paths when not default', () => {
    expect(localizeHref('/contact', 'en')).toBe('/en/contact');
  });

  it('does not prefix default locale for root path', () => {
    expect(localizeHref('/', 'zh')).toBe('/');
  });

  it('prefixes default locale for non-root paths', () => {
    expect(localizeHref('/contact', 'zh')).toBe('/zh/contact');
  });

  it('does not double prefix if locale already present', () => {
    expect(localizeHref('/en/contact', 'en')).toBe('/en/contact');
  });

  it('ignores external URLs', () => {
    expect(localizeHref('https://example.com/docs', 'en')).toBe('https://example.com/docs');
  });

  it('ignores anchor links', () => {
    expect(localizeHref('#features', 'en')).toBe('#features');
  });

  it('handles relative paths without leading slash', () => {
    expect(localizeHref('contact', 'en')).toBe('contact');
  });
});
