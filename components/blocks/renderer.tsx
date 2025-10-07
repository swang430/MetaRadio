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

type MediaInput = {
  url?: string | null;
  alternativeText?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  data?: {
    attributes?: MediaInput;
  } | null;
};

function toMedia(media?: MediaInput | null):
  | {
      url: string | null;
      alt: string | null;
      width: number | null;
      height: number | null;
    }
  | undefined {
  if (!media) return undefined;
  if (media.data) {
    return toMedia(media.data.attributes || undefined);
  }
  return {
    url: media.url || null,
    alt: media.alt || media.alternativeText || null,
    width: media.width || null,
    height: media.height || null,
  };
}

function toAction(
  action?: { name?: string | null; url?: string | null } | null,
  locale?: Locale
) {
  if (!action) return undefined;
  return { name: action.name || null, url: localizeHref(action.url || null, locale) };
}

function mapLinks(
  links?: Array<{ id?: number | string; name?: string | null; url?: string | null }> | null,
  locale?: Locale
) {
  if (!links) return [];
  return links
    .filter((link) => link?.name && link?.url)
    .map((link) => ({
      id: link.id ?? link.url,
      name: link.name,
      url: localizeHref(link.url, locale),
    }));
}

export function BlocksRenderer({ blocks, locale, dictionary }: BlocksRendererProps) {
  if (!blocks?.length) return null;

  const featureCardLearnMore = dictionary?.components.featureCard.learnMore;
  const postCardReadMore = dictionary?.components.postCard.readMore;

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { theme = 'light' } = block as any; // Default to light theme

        switch (block.__component) {
          case 'hero.hero':
            return (
              <Hero
                key={`hero-${index}`}
                theme={theme}
                {...block}
                primaryAction={toAction(block.ctaPrimary, locale)}
                secondaryAction={toAction(block.ctaSecondary, locale)}
                media={toMedia(block.bgMedia)}
              />
            );
          case 'sections.feature-grid':
            return (
              <FeatureGridSection
                key={`feature-grid-${index}`}
                theme={theme}
                {...block}
                items={block.items?.map((item: any) => ({
                  ...item,
                  href: localizeHref(item.link?.url, locale),
                  linkLabel: item.link?.name || featureCardLearnMore,
                }))}
              />
            );
          case 'sections.stat-group':
            return (
              <StatGroup
                key={`stat-group-${index}`}
                theme={theme}
                {...block}
                metrics={block.metrics?.map((metric: any) => ({
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
                items={block.items?.map((item: any) => ({
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
                steps={block.steps?.map((step: any) => ({
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
                items={block.items?.map((item: any) => ({
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
                description={block.body}
                items={mapLinks(block.links, locale)}
              />
            );
          case 'content.media-block':
            return (
              <MediaBlock
                key={`media-block-${index}`}
                theme={theme}
                {...block}
                media={toMedia(block.media)}
                actions={mapLinks(block.actions, locale)}
              />
            );
          case 'content.cta':
            return (
              <CTABanner
                key={`cta-${index}`}
                theme={theme}
                {...block}
                description={block.body}
                items={mapLinks(block.links, locale)}
              />
            );
          default:
            return null;
        }
      })}
    </Fragment>
  );
}
