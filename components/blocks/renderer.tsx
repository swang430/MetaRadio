import { Fragment } from 'react';
import { BeforeAfterSection } from './before-after';
import { BulletList } from './bullet-list';
import { CaseShowcase } from './case-showcase';
import { CTABanner } from './cta-banner';
import { FeatureGridSection } from './feature-card';
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
        switch (block.__component) {
          case 'hero.hero':
            return (
              <Hero
                key={`hero-${index}`}
                headline={block.headline}
                subhead={block.subhead}
                summary={block.summary}
                primaryAction={toAction(block.ctaPrimary, locale)}
                secondaryAction={toAction(block.ctaSecondary, locale)}
                media={toMedia(block.bgMedia)}
              />
            );
          case 'sections.feature-grid':
            return (
              <FeatureGridSection
                key={`feature-grid-${index}`}
                title={block.title}
                intro={block.intro}
                items={
                  block.items?.map((item: any) => ({
                    title: item.title,
                    description: item.desc,
                    href: localizeHref(item.link?.url, locale),
                    linkLabel: item.link?.name || featureCardLearnMore,
                  })) || []
                }
              />
            );
          case 'sections.stat-group':
            return (
              <StatGroup
                key={`stat-group-${index}`}
                title={block.title}
                description={block.description}
                metrics={
                  block.metrics?.map((metric: any) => ({
                    id: metric.id,
                    label: metric.label,
                    value: metric.value,
                    suffix: metric.suffix || metric.unit,
                  })) || []
                }
              />
            );
          case 'sections.bullet-list':
            return (
              <BulletList
                key={`bullet-list-${index}`}
                title={block.title}
                intro={block.intro}
                items={
                  block.items?.map((item: any) => ({
                    title: item.title,
                    description: item.description,
                    icon: toMedia(item.icon),
                  })) || []
                }
              />
            );
          case 'sections.tech-flow':
            return (
              <TechFlow
                key={`tech-flow-${index}`}
                title={block.title}
                intro={block.intro}
                steps={
                  block.steps?.map((step: any) => ({
                    id: step.id,
                    name: step.name,
                    desc: step.desc,
                  })) || []
                }
              />
            );
          case 'sections.case-showcase':
            return (
              <CaseShowcase
                key={`case-showcase-${index}`}
                title={block.title}
                intro={block.intro}
                locale={locale}
                viewDetailLabel={dictionary?.pages.cases.viewDetail}
                cases={
                  block.cases?.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                    client: item.client,
                    summary: item.summary,
                  })) || []
                }
              />
            );
          case 'sections.post-list':
            return (
              <PostList
                key={`post-list-${index}`}
                title={block.title}
                intro={block.intro}
                posts={
                  block.posts?.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    slug: item.slug,
                    excerpt: item.excerpt,
                    category: item.category,
                    estimate: item.estimate,
                    readMoreLabel: postCardReadMore,
                  })) || []
                }
                locale={locale}
              />
            );
          case 'sections.before-after':
            return (
              <BeforeAfterSection
                key={`before-after-${index}`}
                title={block.title}
                items={
                  block.items?.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    beforeMedia: toMedia(item.beforeMedia),
                    afterMedia: toMedia(item.afterMedia),
                  })) || []
                }
              />
            );
          case 'sections.cta-banner':
            return (
              <CTABanner
                key={`cta-banner-${index}`}
                title={block.title}
                description={block.body}
                items={mapLinks(block.links, locale)}
              />
            );
          case 'content.media-block':
            return (
              <MediaBlock
                key={`media-block-${index}`}
                title={block.title}
                body={block.body}
                orientation={block.orientation}
                media={toMedia(block.media)}
                actions={mapLinks(block.actions, locale)}
              />
            );
          case 'content.cta':
            return (
              <CTABanner
                key={`cta-${index}`}
                title={block.title}
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
