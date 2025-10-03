import type { Struct, Schema } from '@strapi/strapi';

export interface SharedStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_stats';
  info: {
    displayName: 'Stat';
    description: '\u7EDF\u8BA1\u6570\u636E\u5C55\u793A';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Decimal & Schema.Attribute.Required;
    suffix: Schema.Attribute.String;
  };
}

export interface SharedMetric extends Struct.ComponentSchema {
  collectionName: 'components_shared_metrics';
  info: {
    displayName: 'Metric';
    description: 'KPI \u6307\u6807';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    unit: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
    description: '\u6309\u94AE\u6216\u94FE\u63A5';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedBullet extends Struct.ComponentSchema {
  collectionName: 'components_shared_bullets';
  info: {
    displayName: 'Bullet';
    description: '\u80FD\u529B\u70B9\u5217\u8868\u9879';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media;
  };
}

export interface SeoSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_seos';
  info: {
    displayName: 'SEO';
    description: '\u9ED8\u8BA4 SEO \u5143\u4FE1\u606F';
  };
  attributes: {
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 300;
      }>;
    ogImage: Schema.Attribute.Media;
  };
}

export interface SectionsTechFlow extends Struct.ComponentSchema {
  collectionName: 'components_sections_tech_flows';
  info: {
    displayName: 'TechFlow';
    description: '\u6280\u672F\u6B65\u9AA4\u6D41\u7A0B';
  };
  attributes: {
    title: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    steps: Schema.Attribute.Component<'rt.tech-step', true>;
  };
}

export interface SectionsStatGroup extends Struct.ComponentSchema {
  collectionName: 'components_sections_stat_groups';
  info: {
    displayName: 'StatGroup';
    description: '\u7EDF\u8BA1\u6570\u636E\u7EC4\u5408';
  };
  attributes: {
    title: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    metrics: Schema.Attribute.Component<'shared.metric', true>;
  };
}

export interface SectionsPostList extends Struct.ComponentSchema {
  collectionName: 'components_sections_post_lists';
  info: {
    displayName: 'PostList';
    description: '\u6D1E\u5BDF\u6587\u7AE0\u5217\u8868';
  };
  attributes: {
    title: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    posts: Schema.Attribute.Component<'cards.post-card', true>;
  };
}

export interface SectionsFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_grids';
  info: {
    displayName: 'FeatureGrid';
    description: '\u7279\u6027\u6805\u683C\u533A\u5757';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'grid.feature-card', true>;
  };
}

export interface SectionsCtaBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_banners';
  info: {
    displayName: 'CTABanner';
    description: 'CTA \u533A\u5757';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    body: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface SectionsCaseShowcase extends Struct.ComponentSchema {
  collectionName: 'components_sections_case_showcases';
  info: {
    displayName: 'CaseShowcase';
    description: '\u6848\u4F8B\u5C55\u793A\u533A\u5757';
  };
  attributes: {
    title: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    cases: Schema.Attribute.Component<'cards.case-card', true>;
  };
}

export interface SectionsBulletList extends Struct.ComponentSchema {
  collectionName: 'components_sections_bullet_lists';
  info: {
    displayName: 'BulletList';
    description: '\u80FD\u529B\u70B9\u5217\u8868\u533A\u5757';
  };
  attributes: {
    title: Schema.Attribute.String;
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.bullet', true>;
  };
}

export interface SectionsBeforeAfter extends Struct.ComponentSchema {
  collectionName: 'components_sections_before_afters';
  info: {
    displayName: 'BeforeAfterSection';
    description: '\u524D\u540E\u5BF9\u6BD4\u533A\u5757';
  };
  attributes: {
    title: Schema.Attribute.String;
    items: Schema.Attribute.Component<'rt.before-after', true>;
  };
}

export interface RtTechStep extends Struct.ComponentSchema {
  collectionName: 'components_rt_tech_steps';
  info: {
    displayName: 'TechStep';
    description: '\u6280\u672F\u6D41\u7A0B\u6B65\u9AA4';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    desc: Schema.Attribute.Text;
  };
}

export interface RtBeforeAfter extends Struct.ComponentSchema {
  collectionName: 'components_rt_before_afters';
  info: {
    displayName: 'BeforeAfter';
    description: '\u65B9\u6848\u524D\u540E\u5BF9\u6BD4';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    beforeMedia: Schema.Attribute.Media;
    afterMedia: Schema.Attribute.Media;
    description: Schema.Attribute.Text;
  };
}

export interface HeroHero extends Struct.ComponentSchema {
  collectionName: 'components_hero_heros';
  info: {
    displayName: 'Hero';
    description: '\u9996\u9875\u6216\u533A\u5757\u7684 Hero \u5185\u5BB9';
  };
  attributes: {
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    subhead: Schema.Attribute.Text;
    summary: Schema.Attribute.Text;
    bgMedia: Schema.Attribute.Media;
    ctaPrimary: Schema.Attribute.Component<'shared.link', false>;
    ctaSecondary: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface GridFeatureCard extends Struct.ComponentSchema {
  collectionName: 'components_grid_feature_cards';
  info: {
    displayName: 'FeatureCard';
    description: '\u4EA7\u54C1\u6216\u80FD\u529B\u5356\u70B9\u5361\u7247';
  };
  attributes: {
    icon: Schema.Attribute.Media;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    desc: Schema.Attribute.Text;
    link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface ContentMediaBlock extends Struct.ComponentSchema {
  collectionName: 'components_content_media_blocks';
  info: {
    displayName: 'MediaBlock';
    description: '\u56FE\u6587\u6DF7\u6392\u7EC4\u4EF6';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    body: Schema.Attribute.RichText;
    media: Schema.Attribute.Media;
    orientation: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    actions: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface ContentCta extends Struct.ComponentSchema {
  collectionName: 'components_content_ctas';
  info: {
    displayName: 'CTA';
    description: '\u53F7\u53EC\u6027\u52A8\u4F5C\u533A\u5757';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    body: Schema.Attribute.Text;
    links: Schema.Attribute.Component<'shared.link', true>;
  };
}

export interface CardsPostCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_post_cards';
  info: {
    displayName: 'PostCard';
    description: '\u6587\u7AE0\u5217\u8868\u5361\u7247';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    excerpt: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'>;
    cover: Schema.Attribute.Media;
    category: Schema.Attribute.String;
    estimate: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<5>;
  };
}

export interface CardsCaseCard extends Struct.ComponentSchema {
  collectionName: 'components_cards_case_cards';
  info: {
    displayName: 'CaseCard';
    description: '\u6848\u4F8B\u5361\u7247';
  };
  attributes: {
    title: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.UID<'title'>;
    client: Schema.Attribute.String;
    summary: Schema.Attribute.Text;
    cover: Schema.Attribute.Media;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.stat': SharedStat;
      'shared.metric': SharedMetric;
      'shared.link': SharedLink;
      'shared.bullet': SharedBullet;
      'seo.seo': SeoSeo;
      'sections.tech-flow': SectionsTechFlow;
      'sections.stat-group': SectionsStatGroup;
      'sections.post-list': SectionsPostList;
      'sections.feature-grid': SectionsFeatureGrid;
      'sections.cta-banner': SectionsCtaBanner;
      'sections.case-showcase': SectionsCaseShowcase;
      'sections.bullet-list': SectionsBulletList;
      'sections.before-after': SectionsBeforeAfter;
      'rt.tech-step': RtTechStep;
      'rt.before-after': RtBeforeAfter;
      'hero.hero': HeroHero;
      'grid.feature-card': GridFeatureCard;
      'content.media-block': ContentMediaBlock;
      'content.cta': ContentCta;
      'cards.post-card': CardsPostCard;
      'cards.case-card': CardsCaseCard;
    }
  }
}
