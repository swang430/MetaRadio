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
};

export type StrapiResponse<T> = {
  data: T;
  meta?: unknown;
};

export type LinkField = {
  name: string;
  url: string;
};

export type HeroBlock = {
  __component: 'hero.hero';
  headline: string;
  subhead?: string | null;
  summary?: string | null;
  bgMedia?: { data: StrapiMedia | null } | null;
  ctaPrimary?: { name?: string; url?: string } | null;
  ctaSecondary?: { name?: string; url?: string } | null;
};

export type DynamicZoneBlock = {
  __component: string;
  [key: string]: any;
};

export type PageAttributes = {
  title: string;
  slug: string;
  locale?: string;
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
  desc?: string | null;
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
