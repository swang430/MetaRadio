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
import { DEFAULT_LOCALE, resolveLocale, type Locale } from './i18n/config';

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

function resolveMockLocale(locale?: string): Locale {
  return resolveLocale(locale);
}

function getMockPage(slug: string, locale?: string) {
  const resolved = resolveMockLocale(locale);
  return mockPages[resolved]?.[slug] || mockPages[DEFAULT_LOCALE]?.[slug];
}

function getMockCollection<T>(collection: Record<Locale, T>, locale?: string): T {
  const resolved = resolveMockLocale(locale);
  return collection[resolved] || collection[DEFAULT_LOCALE];
}

function hasBlocks(entity?: { attributes?: { blocks?: unknown[] | null } }) {
  return Boolean(entity?.attributes?.blocks && entity.attributes.blocks.length > 0);
}

export async function getSiteSettings(): Promise<SiteSettingEntity> {
  if (!STRAPI_URL) return mockSiteSettings;
  const data = await api<StrapiResponse<SiteSettingEntity>>('/api/site-setting?populate=defaultSeo,socialLinks');
  if (data?.data) return data.data;
  return mockSiteSettings;
}

export async function getPageBySlug(slug: string, locale?: string): Promise<PageEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: 'deep',
  });
  params.append('locale', resolved);
  const response = await api<StrapiResponse<PageEntity[]>>(`/api/pages?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity && hasBlocks(entity)) return entity;
  return getMockPage(slug, resolved);
}

export async function listSolutions(locale?: string): Promise<SolutionEntity[]> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams({ populate: 'deep' });
  params.append('locale', resolved);
  const response = await api<StrapiResponse<SolutionEntity[]>>(`/api/solutions?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return getMockCollection(mockSolutions, resolved);
}

export async function getSolutionBySlug(slug: string, locale?: string): Promise<SolutionEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    populate: 'deep',
  });
  params.append('locale', resolved);
  const response = await api<StrapiResponse<SolutionEntity[]>>(`/api/solutions?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity && hasBlocks(entity)) return entity;
  return getMockCollection(mockSolutions, resolved).find((item) => item.attributes.slug === slug);
}

export async function listCaseStudies(locale?: string): Promise<CaseStudyEntity[]> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams();
  params.append('locale', resolved);
  const response = await api<StrapiResponse<CaseStudyEntity[]>>(`/api/case-studies?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return getMockCollection(mockCaseStudies, resolved);
}

export async function getCaseStudyBySlug(slug: string, locale?: string): Promise<CaseStudyEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  });
  params.append('locale', resolved);
  const response = await api<StrapiResponse<CaseStudyEntity[]>>(`/api/case-studies?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return getMockCollection(mockCaseStudies, resolved).find((item) => item.attributes.slug === slug);
}

export async function listArticles(locale?: string, page = 1, pageSize = 9): Promise<ArticleEntity[]> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams({
    sort: 'publishedAt:desc',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
  });
  params.append('locale', resolved);
  const response = await api<StrapiResponse<ArticleEntity[]>>(`/api/articles?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return getMockCollection(mockArticles, resolved);
}

export async function getArticleBySlug(slug: string, locale?: string): Promise<ArticleEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  });
  params.append('locale', resolved);
  const response = await api<StrapiResponse<ArticleEntity[]>>(`/api/articles?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return getMockCollection(mockArticles, resolved).find((item) => item.attributes.slug === slug);
}

export async function listResources(locale?: string): Promise<ResourceEntity[]> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams();
  params.append('locale', resolved);
  const response = await api<StrapiResponse<ResourceEntity[]>>(`/api/resources?${params.toString()}`);
  if (response?.data?.length) return response.data;
  return getMockCollection(mockResources, resolved);
}

export async function getResourceBySlug(slug: string, locale?: string): Promise<ResourceEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
  });
  params.append('locale', resolved);
  const response = await api<StrapiResponse<ResourceEntity[]>>(`/api/resources?${params.toString()}`);
  const entity = response?.data?.[0];
  if (entity) return entity;
  return getMockCollection(mockResources, resolved).find((item) => item.attributes.slug === slug);
}

export function hasStrapiConfig() {
  return Boolean(STRAPI_URL);
}
