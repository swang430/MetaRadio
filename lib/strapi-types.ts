export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string | null;
  name: string;
  width?: number | null;
  height?: number | null;
  formats?: unknown;
};

export type SeoData = {
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: { data: StrapiMedia | null } | null;
};

export type StrapiEntity<T> = {
  id: number;
  attributes: T;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string | null;
  locale?: string;
  documentId?: string;
};

export type StrapiResponse<T> = {
  data: T;
  meta?: unknown;
};

export type LinkField = {
  name: string;
  url: string;
};

// Base types for block components
export type MediaField = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type ActionField = {
  id?: number | string;
  name?: string | null;
  url?: string | null;
};

// Block type definitions
export type HeroBlock = {
  __component: 'hero.hero';
  headline: string;
  subhead?: string | null;
  summary?: string | null;
  bgMedia?: { data: StrapiMedia | null } | null;
  ctaPrimary?: { name?: string; url?: string } | null;
  ctaSecondary?: { name?: string; url?: string } | null;
};

export type FeatureGridBlock = {
  __component: 'sections.feature-grid';
  title?: string | null;
  description?: string | null;
  items?: Array<{
    id?: number | string;
    title?: string | null;
    description?: string | null;
    icon?: MediaField | null;
    link?: ActionField | null;
  }> | null;
};

export type StatGroupBlock = {
  __component: 'sections.stat-group';
  title?: string | null;
  metrics?: Array<{
    id?: number | string;
    label?: string | null;
    value?: string | null;
    unit?: string | null;
  }> | null;
};

export type BulletListBlock = {
  __component: 'sections.bullet-list';
  title?: string | null;
  items?: Array<{
    id?: number | string;
    title?: string | null;
    description?: string | null;
    icon?: MediaField | null;
  }> | null;
};

export type TechFlowBlock = {
  __component: 'sections.tech-flow';
  title?: string | null;
  steps?: Array<{
    id?: number | string;
    title?: string | null;
    description?: string | null;
  }> | null;
};

export type BeforeAfterBlock = {
  __component: 'sections.before-after';
  title?: string | null;
  items?: Array<{
    id?: number | string;
    title?: string | null;
    description?: string | null;
    beforeMedia?: MediaField | null;
    afterMedia?: MediaField | null;
  }> | null;
};

export type CaseShowcaseBlock = {
  __component: 'sections.case-showcase';
  title?: string | null;
  description?: string | null;
  cases?: Array<unknown> | null; // TODO: Define case type
};

export type PostListBlock = {
  __component: 'sections.post-list';
  title?: string | null;
  posts?: Array<unknown> | null; // TODO: Define post type
};

export type CtaBannerBlock = {
  __component: 'sections.cta-banner';
  title?: string | null;
  description?: string | null;
  actions?: ActionField[] | null;
};

export type MediaContentBlock = {
  __component: 'content.media-block';
  title?: string | null;
  body?: string | null;
  media?: MediaField | null;
  orientation?: 'left' | 'right' | null;
  actions?: ActionField[] | null;
};

// Union type of all possible blocks.
// 页面会给区块注入 theme（dark/light）作为展示提示，统一在联合类型上声明为可选，
// 这样 block?.theme 与 { ...block, theme } 等用法都能通过类型检查。
export type DynamicZoneBlock = (
  | HeroBlock
  | FeatureGridBlock
  | StatGroupBlock
  | BulletListBlock
  | TechFlowBlock
  | BeforeAfterBlock
  | CaseShowcaseBlock
  | PostListBlock
  | CtaBannerBlock
  | MediaContentBlock
) & { theme?: 'dark' | 'light' | null };

/**
 * 动态区块的"输入"形态：来自 Strapi 或页面在运行时构造的松散区块。
 * BlocksRenderer 按 __component 防御式归一化后再渲染，因此输入容忍额外字段
 * （如页面注入的 intro、emoji 字符串 icon 等）。结构化的 *Attributes 类型仍保持严格。
 */
export type BlockInput = { __component: string } & Record<string, any>;

export type PageAttributes = {
  title: string;
  slug: string;
  locale?: string;
  excerpt?: string | null;
  seo?: SeoData | null;
  blocks: DynamicZoneBlock[];
};

export type PageEntity = StrapiEntity<PageAttributes>;

export type ArticleAttributes = {
  title: string;
  slug: string;
  excerpt?: string | null;
  cover?: { data: StrapiMedia | null } | null;
  content?: string | null;
  tags?: string[] | null;
  seo?: SeoData | null;
};

export type ArticleEntity = StrapiEntity<ArticleAttributes>;

export type CaseStudyAttributes = {
  title: string;
  slug: string;
  client?: string | null;
  summary?: string | null;
  challenge?: string | null;
  approach?: string | null;
  result?: string | null;
  kpi?: Array<{ label: string; value: string; unit?: string | null }> | null;
};

export type CaseStudyEntity = StrapiEntity<CaseStudyAttributes>;

export type SolutionAttributes = {
  title: string;
  slug: string;
  excerpt?: string | null;
  blocks: DynamicZoneBlock[];
  relatedCases?: { data?: CaseStudyEntity[] } | CaseStudyEntity[] | null;
  seo?: SeoData | null;
};

export type SolutionEntity = StrapiEntity<SolutionAttributes>;

export type ResourceAttributes = {
  title: string;
  slug: string;
  description?: string | null;
  link?: LinkField | null;
  file?: {
    data?: StrapiMedia | null;
  } | null;
};

export type ResourceEntity = StrapiEntity<ResourceAttributes>;

export type SiteSettingAttributes = {
  siteName: string;
  socialLinks?: LinkField[];
  defaultSeo?: SeoData | null;
};

export type SiteSettingEntity = StrapiEntity<SiteSettingAttributes>;
