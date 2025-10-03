import {
  ArticleEntity,
  CaseStudyEntity,
  PageEntity,
  ResourceEntity,
  SiteSettingEntity,
  SolutionEntity,
  StrapiResponse,
} from './strapi-types';
import {
  mockArticles,
  mockCaseStudies,
  mockPages,
  mockResources,
  mockSiteSettings,
  mockSolutions,
} from './mock-data';

const STRAPI_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
const TOKEN = process.env.STRAPI_API_TOKEN;
const REVALIDATE_SECONDS = Number(process.env.REVALIDATE_SECONDS || 120);

async function api<T>(path: string, init: RequestInit = {}): Promise<T | undefined> {
  if (!STRAPI_URL) return undefined;
  const url = `${STRAPI_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    ...(init.headers || {}),
  } as Record<string, string>;
  const { next: nextConfig, ...rest } = init as RequestInit & { next?: Record<string, unknown> };
  try {
    const res = await fetch(url, {
      ...rest,
      headers,
      next: { revalidate: REVALIDATE_SECONDS, ...(nextConfig || {}) },
    });
    if (!res.ok) {
      console.warn(`[strapi] ${res.status} ${res.statusText} when fetching ${path}`);
      return undefined;
    }
    return (await res.json()) as T;
  } catch (error) {
    console.warn('[strapi] fetch failed:', error);
    return undefined;
  }
}

export async function getSiteSettings(): Promise<SiteSettingEntity> {
  if (!STRAPI_URL) return mockSiteSettings;
  const data = await api<StrapiResponse<SiteSettingEntity>>('/api/site-setting?populate=defaultSeo,socialLinks');
  if (data?.data) return data.data;
  return mockSiteSettings;
}

export async function getPageBySlug(slug: string, locale = 'zh'): Promise<PageEntity | undefined> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: 'deep',
  });
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<PageEntity[]>>(`/api/pages?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return mockPages[slug];
}

export async function listSolutions(locale = 'zh'): Promise<SolutionEntity[]> {
  const params = new URLSearchParams({ populate: 'deep' });
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<SolutionEntity[]>>(`/api/solutions?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return mockSolutions;
}

export async function getSolutionBySlug(slug: string, locale = 'zh'): Promise<SolutionEntity | undefined> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: 'deep',
  });
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<SolutionEntity[]>>(`/api/solutions?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return mockSolutions.find((item) => item.attributes.slug === slug);
}

export async function listCaseStudies(locale = 'zh'): Promise<CaseStudyEntity[]> {
  const params = new URLSearchParams();
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<CaseStudyEntity[]>>(`/api/case-studies?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return mockCaseStudies;
}

export async function getCaseStudyBySlug(slug: string, locale = 'zh'): Promise<CaseStudyEntity | undefined> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  });
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<CaseStudyEntity[]>>(`/api/case-studies?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return mockCaseStudies.find((item) => item.attributes.slug === slug);
}

export async function listArticles(locale = 'zh', page = 1, pageSize = 9): Promise<ArticleEntity[]> {
  const params = new URLSearchParams({
    sort: 'publishedAt:desc',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
  });
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<ArticleEntity[]>>(`/api/articles?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return mockArticles;
}

export async function getArticleBySlug(slug: string, locale = 'zh'): Promise<ArticleEntity | undefined> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  });
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<ArticleEntity[]>>(`/api/articles?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return mockArticles.find((item) => item.attributes.slug === slug);
}

export async function listResources(locale = 'zh'): Promise<ResourceEntity[]> {
  const params = new URLSearchParams();
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<ResourceEntity[]>>(`/api/resources?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return mockResources;
}

export async function getResourceBySlug(slug: string, locale = 'zh'): Promise<ResourceEntity | undefined> {
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  });
  if (locale) params.append('locale', locale);
  const response = await api<StrapiResponse<ResourceEntity[]>>(`/api/resources?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return mockResources.find((item) => item.attributes.slug === slug);
}

export function hasStrapiConfig() {
  return Boolean(STRAPI_URL);
}
