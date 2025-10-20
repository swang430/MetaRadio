import { Fragment } from 'react';
import { BeforeAfterSection } from './before-after';
import { BulletList } from './bullet-list';
import { CaseShowcase } from './case-showcase';
import { CTABanner } from './cta-banner';
import { FeatureGridSection } from './feature-grid-section';
import { Hero } from './hero';
import { MediaBlock } from './media-block';
import { PostList } from './post-list';
import { StatGroup } from './stat-group';
import { TechFlow } from './tech-flow';
import { DynamicZoneBlock } from '@/lib/strapi-types';
import type { Locale } from '@/lib/i18n/config';
import type { Dictionary } from '@/lib/i18n/dictionaries';
import { localizeHref } from '@/lib/i18n/navigation';

type BlocksRendererProps = {
  blocks?: DynamicZoneBlock[] | null;
  locale?: Locale;
  dictionary?: Dictionary;
};

type MediaInput =
  | {
      url?: string | null;
      alt?: string | null;
      alternativeText?: string | null;
      width?: number | null;
      height?: number | null;
      attributes?: MediaInput | null;
      data?: {
        attributes?: MediaInput | null;
      } | null;
    }
  | null
  | undefined;

type LinkInput =
  | {
      id?: number | string | null;
      name?: string | null;
      url?: string | null;
      attributes?: LinkInput | null;
      data?: {
        id?: number | string | null;
        attributes?: LinkInput | null;
      } | null;
    }
  | null
  | undefined;

type CaseInput =
  | {
      id?: number | string | null;
      title?: string | null;
      slug?: string | null;
      client?: string | null;
      summary?: string | null;
      attributes?: CaseInput | null;
    }
  | null
  | undefined;

type PostInput =
  | {
      id?: number | string | null;
      title?: string | null;
      slug?: string | null;
      excerpt?: string | null;
      category?: string | null;
      estimate?: number | null;
      attributes?: PostInput | null;
    }
  | null
  | undefined;

function pickAttributes<T>(input: T | { attributes?: T | null } | null | undefined): T | undefined {
  if (!input) return undefined;
  if (typeof input === 'object' && input !== null && 'attributes' in (input as Record<string, unknown>)) {
    const candidate = (input as { attributes?: T | null }).attributes;
    if (candidate && typeof candidate === 'object') {
      return candidate as T;
    }
  }
  return input as T;
}

function toMedia(media?: MediaInput):
  | {
      url: string | null;
      alt: string | null;
      width: number | null;
      height: number | null;
    }
  | undefined {
  if (!media) return undefined;
  if (typeof media === 'string') return undefined;
  if (media.data?.attributes) {
    return toMedia(media.data.attributes);
  }
  if (media.attributes) {
    return toMedia(media.attributes);
  }
  const baseUrl =
    typeof process !== 'undefined'
      ? process.env.NEXT_PUBLIC_STRAPI_URL || process.env.STRAPI_API_URL || ''
      : '';
  const normalizeUrl = (value?: string | null) => {
    if (!value) return null;
    if (/^(https?:)?\/\//.test(value)) return value;
    if (!baseUrl) return value;
    return `${baseUrl.replace(/\/$/, '')}${value}`;
  };
  return {
    url: normalizeUrl(media.url),
    alt: media.alt || media.alternativeText || null,
    width: media.width ?? null,
    height: media.height ?? null,
  };
}

function toAction(action?: LinkInput, locale?: Locale) {
  const normalized = normalizeLink(action, locale);
  if (!normalized) return undefined;
  return { name: normalized.name, url: normalized.url };
}

function normalizeLink(link?: LinkInput, locale?: Locale) {
  if (!link) return undefined;
  const resolved = pickAttributes<LinkInput>(link);
  const name = resolved?.name ?? null;
  const url = resolved?.url ?? null;
  if (!name || !url) return undefined;
  const localized = localizeHref(url, locale) || url;
  return {
    id: (link as any)?.id ?? (resolved as any)?.id ?? url,
    name,
    url: localized,
  };
}

function mapLinks(links?: LinkInput[] | null, locale?: Locale) {
  if (!links?.length) return [];
  const seen = new Set<string>();
  return links
    .map((link) => normalizeLink(link, locale))
    .filter((link): link is { id?: string | number | null; name: string; url: string } => Boolean(link?.name && link?.url))
    .filter((link) => {
      if (seen.has(link.url)) return false;
      seen.add(link.url);
      return true;
    });
}

function mapFeatureItems(items?: any[], locale?: Locale, fallbackLabel?: string | null) {
  if (!items?.length) return [];
  return items.map((item) => {
    const normalizedLink = normalizeLink(item?.link, locale);
    const directHref =
      typeof item?.href === 'string' ? localizeHref(item.href, locale) || item.href : null;
    return {
      ...item,
      href: directHref || normalizedLink?.url || null,
      linkLabel: item?.linkLabel || normalizedLink?.name || fallbackLabel || null,
    };
  });
}

function mapCases(cases?: CaseInput[]) {
  if (!cases?.length) return [];
  const seen = new Set<string>();
  return cases
    .map((entry) => {
      const attrs = pickAttributes<{
        title?: string | null;
        slug?: string | null;
        client?: string | null;
        summary?: string | null;
      }>(entry);
      if (!attrs?.title || !attrs.slug) return undefined;
      return {
        id: (entry as any)?.id ?? attrs.slug,
        title: attrs.title,
        slug: attrs.slug,
        client: attrs.client ?? null,
        summary: attrs.summary ?? null,
      };
    })
    .filter((item): item is { id?: string | number | null; title: string; slug: string; client?: string | null; summary?: string | null } => !!item)
    .filter((item) => {
      if (seen.has(item.slug)) return false;
      seen.add(item.slug);
      return true;
    });
}

function mapPosts(posts?: PostInput[]) {
  if (!posts?.length) return [];
  return posts
    .map((entry) => {
      const attrs = pickAttributes<{
        title?: string | null;
        slug?: string | null;
        excerpt?: string | null;
        category?: string | null;
        estimate?: number | null;
      }>(entry);
      if (!attrs?.title || !attrs.slug) return undefined;
      return {
        id: (entry as any)?.id ?? attrs.slug,
        title: attrs.title,
        slug: attrs.slug,
        excerpt: attrs.excerpt ?? null,
        category: attrs.category ?? null,
        estimate: attrs.estimate ?? null,
      };
    })
    .filter((post): post is { id?: string | number | null; title: string; slug: string; excerpt?: string | null; category?: string | null; estimate?: number | null } => !!post);
}

export function BlocksRenderer({ blocks, locale, dictionary }: BlocksRendererProps) {
  if (!blocks?.length) return null;

  const featureCardLearnMore = dictionary?.components.featureCard.learnMore;
  const postCardReadMore = dictionary?.components.postCard.readMore;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { theme = 'light' } = block as any;

        switch (block.__component) {
          case 'hero.hero':
            return (
              <Hero
                key={`hero-${index}`}
                theme={theme}
                {...block}
                primaryAction={toAction((block as any)?.ctaPrimary, locale)}
                secondaryAction={toAction((block as any)?.ctaSecondary, locale)}
                media={toMedia((block as any)?.bgMedia || (block as any)?.media)}
              />
            );
          case 'sections.feature-grid':
            return (
              <FeatureGridSection
                key={`feature-grid-${index}`}
                theme={theme}
                {...block}
                items={mapFeatureItems((block as any)?.items, locale, featureCardLearnMore)}
              />
            );
          case 'sections.stat-group':
            return (
              <StatGroup
                key={`stat-group-${index}`}
                theme={theme}
                {...block}
                metrics={(block as any)?.metrics?.map((metric: any) => ({
                  ...metric,
                  suffix: metric.suffix || metric.unit,
                }))}
              />
            );
          case 'sections.bullet-list':
            return (
              <BulletList
                key={`bullet-list-${index}`}
                theme={theme}
                {...block}
                items={(block as any)?.items?.map((item: any) => ({
                  ...item,
                  icon: toMedia(item.icon),
                }))}
              />
            );
          case 'sections.tech-flow':
            return (
              <TechFlow
                key={`tech-flow-${index}`}
                theme={theme}
                {...block}
                steps={(block as any)?.steps?.map((step: any) => ({
                  ...step,
                }))}
              />
            );
          case 'sections.case-showcase':
            return (
              <CaseShowcase
                key={`case-showcase-${index}`}
                theme={theme}
                {...block}
                cases={mapCases((block as any)?.cases)}
                locale={locale}
                viewDetailLabel={dictionary?.pages.cases.viewDetail}
              />
            );
          case 'sections.post-list':
            return (
              <PostList
                key={`post-list-${index}`}
                theme={theme}
                {...block}
                posts={mapPosts((block as any)?.posts)}
                readMoreLabel={postCardReadMore}
                locale={locale}
              />
            );
          case 'sections.before-after':
            return (
              <BeforeAfterSection
                key={`before-after-${index}`}
                theme={theme}
                {...block}
                items={(block as any)?.items?.map((item: any) => ({
                  ...item,
                  beforeMedia: toMedia(item.beforeMedia),
                  afterMedia: toMedia(item.afterMedia),
                }))}
              />
            );
          case 'sections.cta-banner':
            return (
              <CTABanner
                key={`cta-banner-${index}`}
                theme={theme}
                {...block}
                description={(block as any)?.body}
                items={mapLinks((block as any)?.links, locale)}
              />
            );
          case 'content.media-block':
            return (
              <MediaBlock
                key={`media-block-${index}`}
                theme={theme}
                {...block}
                media={toMedia((block as any)?.media)}
                actions={mapLinks((block as any)?.actions, locale)}
              />
            );
          case 'content.cta':
            return (
              <CTABanner
                key={`cta-${index}`}
                theme={theme}
                {...block}
                description={(block as any)?.body}
                items={mapLinks((block as any)?.links, locale)}
              />
            );
          default:
            return null;
        }
      })}
    </Fragment>
  );
}

