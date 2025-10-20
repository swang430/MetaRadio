import type { Schema, Struct } from '@strapi/strapi';

export interface CardsCaseCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_case_cards';
  info: {
    description: '\u6848\u4F8B\u5361\u7247';
    displayName: 'CaseCard';
  };
  attributes: {
    client: Schema.Attribute.String;
    cover: Schema.Attribute.Media<'images'>;
    slug: Schema.Attribute.UID<'title'>;
    summary: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CardsPostCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_post_cards';
  info: {
    description: '\u6587\u7AE0\u5217\u8868\u5361\u7247';
    displayName: 'PostCard';
  };
  attributes: {
    category: Schema.Attribute.String;
    cover: Schema.Attribute.Media<'images'>;
    estimate: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<5>;
    excerpt: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentCta extends Struct.ComponentSchema {
  collectionName: 'components_content_ctas';
  info: {
    description: '\u53F7\u53EC\u6027\u52A8\u4F5C\u533A\u5757';
    displayName: 'CTA';
  };
  attributes: {
    body: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ContentMediaBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_media_blocks';
  info: {
    description: '\u56FE\u6587\u6DF7\u6392\u7EC4\u4EF6';
    displayName: 'MediaBlock';
  };
  attributes: {
    actions: Schema.Attribute.Component<'shared.link', true>;
    body: Schema.Attribute.RichText;
    media: Schema.Attribute.Media<'images' | 'videos'>;
    orientation: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface GridFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_grid_feature_cards';
  info: {
    description: '\u4EA7\u54C1\u6216\u80FD\u529B\u5356\u70B9\u5361\u7247';
    displayName: 'FeatureCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HeroHero extends Struct.ComponentSchema {
  collectionName: 'components_hero_heros';
  info: {
    description: '\u9996\u9875\u6216\u533A\u5757\u7684 Hero \u5185\u5BB9';
    displayName: 'Hero';
  };
  attributes: {
    bgMedia: Schema.Attribute.Media<'images' | 'videos'>;
    ctaPrimary: Schema.Attribute.Component<'shared.link', false>;
    ctaSecondary: Schema.Attribute.Component<'shared.link', false>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    subhead: Schema.Attribute.Text;
    summary: Schema.Attribute.Text;
  };
}

export interface RtBeforeAfter extends Struct.ComponentSchema {
  collectionName: 'components_rt_before_afters';
  info: {
    description: '\u65B9\u6848\u524D\u540E\u5BF9\u6BD4';
    displayName: 'BeforeAfter';
  };
  attributes: {
    afterMedia: Schema.Attribute.Media<'images' | 'videos'>;
    beforeMedia: Schema.Attribute.Media<'images' | 'videos'>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface RtTechStep extends Struct.ComponentSchema {
  collectionName: 'components_rt_tech_steps';
  info: {
    description: '\u6280\u672F\u6D41\u7A0B\u6B65\u9AA4';
    displayName: 'TechStep';
  };
  attributes: {
    desc: Schema.Attribute.Text;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsBeforeAfter extends Struct.ComponentSchema {
  collectionName: 'components_sections_before_afters';
  info: {
    description: '\u524D\u540E\u5BF9\u6BD4\u533A\u5757';
    displayName: 'BeforeAfterSection';
  };
  attributes: {
    items: Schema.Attribute.Component<'rt.before-after', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsBulletList extends Struct.ComponentSchema {
  collectionName: 'components_sections_bullet_lists';
  info: {
    description: '\u80FD\u529B\u70B9\u5217\u8868\u533A\u5757';
    displayName: 'BulletList';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.bullet', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCaseShowcase extends Struct.ComponentSchema {
  collectionName: 'components_sections_case_showcases';
  info: {
    description: '\u6848\u4F8B\u5C55\u793A\u533A\u5757';
    displayName: 'CaseShowcase';
  };
  attributes: {
    cases: Schema.Attribute.Component<'cards.case-card', true>;
    intro: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    description: 'CTA \u533A\u5757';
    displayName: 'CTABanner';
  };
  attributes: {
    body: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_grids';
  info: {
    description: '\u7279\u6027\u6805\u683C\u533A\u5757';
    displayName: 'FeatureGrid';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'grid.feature-card', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPostList extends Struct.ComponentSchema {
  collectionName: 'components_sections_post_lists';
  info: {
    description: '\u6D1E\u5BDF\u6587\u7AE0\u5217\u8868';
    displayName: 'PostList';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    posts: Schema.Attribute.Component<'cards.post-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsStatGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_stat_groups';
  info: {
    description: '\u7EDF\u8BA1\u6570\u636E\u7EC4\u5408';
    displayName: 'StatGroup';
  };
  attributes: {
    description: Schema.Attribute.Text;
    metrics: Schema.Attribute.Component<'shared.metric', true>;
    title: Schema.Attribute.String;
  };
}

export interface SectionsTechFlow extends Struct.ComponentSchema {
  collectionName: 'components_sections_tech_flows';
  info: {
    description: '\u6280\u672F\u6B65\u9AA4\u6D41\u7A0B';
    displayName: 'TechFlow';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    steps: Schema.Attribute.Component<'rt.tech-step', true>;
    title: Schema.Attribute.String;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    description: '\u9ED8\u8BA4 SEO \u5143\u4FE1\u606F';
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    ogImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedBullet extends Struct.ComponentSchema {
  collectionName: 'components_shared_bullets';
  info: {
    description: '\u80FD\u529B\u70B9\u5217\u8868\u9879';
    displayName: 'Bullet';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '\u6309\u94AE\u6216\u94FE\u63A5';
    displayName: 'Link';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_metrics';
  info: {
    description: 'KPI \u6307\u6807';
    displayName: 'Metric';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    unit: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    description: '\u7EDF\u8BA1\u6570\u636E\u5C55\u793A';
    displayName: 'Stat';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    suffix: Schema.Attribute.String;
    value: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'cards.case-card': CardsCaseCard;
      'cards.post-card': CardsPostCard;
      'content.cta': ContentCta;
      'content.media-block': ContentMediaBlock;
      'grid.feature-card': GridFeatureCard;
      'hero.hero': HeroHero;
      'rt.before-after': RtBeforeAfter;
      'rt.tech-step': RtTechStep;
      'sections.before-after': SectionsBeforeAfter;
      'sections.bullet-list': SectionsBulletList;
      'sections.case-showcase': SectionsCaseShowcase;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.feature-grid': SectionsFeatureGrid;
      'sections.post-list': SectionsPostList;
      'sections.stat-group': SectionsStatGroup;
      'sections.tech-flow': SectionsTechFlow;
      'seo.seo': SeoSeo;
      'shared.bullet': SharedBullet;
      'shared.link': SharedLink;
      'shared.metric': SharedMetric;
      'shared.stat': SharedStat;
    }
  }
}
