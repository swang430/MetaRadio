import type {
  ArticleEntity,
  CaseStudyEntity,
  PageEntity,
  ResourceEntity,
  SiteSettingEntity,
  SolutionEntity,
  StrapiResponse,
} from './strapi-types';
import path from 'path';
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
const DEBUG_DATA_SOURCE = process.env.NODE_ENV === 'development'; // Only log in development
const LOG_FILE_PATH = typeof process !== 'undefined' ? path.resolve(process.cwd(), 'datasource.log') : 'datasource.log';

let appendFileAsync: ((path: string, data: string) => Promise<void>) | null = null;

const BLOCK_POPULATE_PATHS = [
  'blocks.ctaPrimary',
  'blocks.ctaSecondary',
  'blocks.bgMedia',
  'blocks.items',
  'blocks.items.link',
  'blocks.items.beforeMedia',
  'blocks.items.afterMedia',
  'blocks.actions',
  'blocks.media',
  'blocks.steps',
  'blocks.metrics',
  'blocks.cases',
  'blocks.links',
  'blocks.posts',
];

async function writeDataLog(entry: Record<string, unknown>) {
  if (typeof window !== 'undefined') return;
  try {
    if (!appendFileAsync) {
      const fs = await import('fs/promises');
      appendFileAsync = fs.appendFile;
    }
    const payload = { timestamp: new Date().toISOString(), ...entry };
    await appendFileAsync!(LOG_FILE_PATH, `${JSON.stringify(payload)}
`);
  } catch (error) {
    console.warn('[data-log] failed to append log entry:', error);
  }
}

function logEntries(params: { entity: string; source: 'Strapi' | 'Mock'; locale?: string; entries?: Array<Record<string, unknown>> }) {
  const entries = params.entries?.length ? params.entries : undefined;
  void writeDataLog({ ...params, entries });
}

function toAttributes<T = any>(item: unknown): T {
  if (item && typeof item === 'object' && 'attributes' in (item as Record<string, unknown>)) {
    const maybeAttrs = (item as Record<string, unknown>).attributes;
    if (maybeAttrs && typeof maybeAttrs === 'object') {
      return maybeAttrs as T;
    }
  }
  return item as T;
}

// A helper function to add logging
function log(source: 'Strapi' | 'Mock', message: string) {
  const prefix = source === 'Strapi' ? '✅' : '🟡';
  console.log(`[DATA_SOURCE] ${prefix} ${source}: ${message}`);
}

function appendPopulatePaths(params: URLSearchParams, paths: string[]) {
  if (!paths?.length) return;
  const existingValues = params.getAll('populate');
  const existingPaths = existingValues
    .flatMap((value) => value.split(','))
    .map((value) => value.trim())
    .filter(Boolean);
  const merged = new Set<string>([...existingPaths, ...paths.filter(Boolean)]);
  params.delete('populate');
  if (merged.size) {
    params.append('populate', Array.from(merged).join(','));
  }
}

async function api<T>(path: string, init: RequestInit = {}): Promise<T | undefined> {
  if (!STRAPI_URL) {
    // No need to log here, the calling function will log the fallback.
    return undefined;
  }
  const url = `${STRAPI_URL}${path}`;
  const urlObj = new URL(url);
  const headers = {
    'Content-Type': 'application/json',
    ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    ...(init.headers || {}),
  } as Record<string, string>;
  const { next: nextConfig, ...rest } = init as RequestInit & { next?: Record<string, unknown> };
  const method = typeof rest.method === 'string' ? rest.method.toUpperCase() : 'GET';
  const slugFromQuery = urlObj.searchParams.get('filters[slug][$eq]') || urlObj.searchParams.get('slug') || null;
  const localeFromQuery = urlObj.searchParams.get('locale') || null;
  if (DEBUG_DATA_SOURCE) {
    const requestInfo: Record<string, unknown> = {
      method,
      url: `${urlObj.pathname}${urlObj.search}`,
    };
    if (localeFromQuery) requestInfo.locale = localeFromQuery;
    if (slugFromQuery) requestInfo.slug = slugFromQuery;
    if (rest.body && typeof rest.body === 'string') {
      requestInfo.body = rest.body.length > 500 ? `${rest.body.slice(0, 500)}…` : rest.body;
    }
    console.log('[DATA_SOURCE][REQUEST]', requestInfo);
  }
  try {
    const res = await fetch(url, {
      ...rest,
      headers,
      next: { revalidate: REVALIDATE_SECONDS, ...(nextConfig || {}) },
    });
    const responseText = await res.text();
    if (DEBUG_DATA_SOURCE) {
      const responseInfo: Record<string, unknown> = {
        method,
        status: res.status,
        url: `${urlObj.pathname}${urlObj.search}`,
      };
      if (localeFromQuery) responseInfo.locale = localeFromQuery;
      if (slugFromQuery) responseInfo.slug = slugFromQuery;
      console.log('[DATA_SOURCE][RESPONSE]', responseInfo);
      if (responseText) {
        const preview = responseText.length > 1000 ? `${responseText.slice(0, 1000)}…` : responseText;
        console.log('[DATA_SOURCE][RESPONSE_BODY]', preview);
      }
    }
    if (!res.ok) {
      console.warn(`[strapi] ${res.status} ${res.statusText} when fetching ${path}`);
      return undefined;
    }
    if (!responseText) {
      return undefined;
    }
    try {
      return JSON.parse(responseText) as T;
    } catch (error) {
      console.warn(`[strapi] failed to parse JSON when fetching ${path}`, error);
      return undefined;
    }
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

function filterByLocale<T>(items: T[] | undefined, locale: Locale): T[] {
  if (!items?.length) return [];
  return items.filter((item) => {
    const attrs = toAttributes(item);
    const itemLocale = typeof attrs === 'object' && attrs !== null && 'locale' in attrs
      ? (attrs as { locale?: string }).locale
      : typeof item === 'object' && item !== null && 'locale' in item
      ? (item as { locale?: string }).locale
      : null;
    return itemLocale === locale;
  });
}

type WithAttributes<T> = T & { attributes: Record<string, unknown> };

function normalizeEntity<T>(entity: T | undefined): WithAttributes<T> | undefined {
  if (!entity) return entity as undefined;
  if (typeof entity !== 'object' || entity === null) return entity as undefined;

  const record = entity as Record<string, unknown>;
  if ('attributes' in record && record.attributes) {
    return record as WithAttributes<T>;
  }

  const { id, ...rest } = record;
  return {
    ...record,
    attributes: rest,
  } as WithAttributes<T>;
}

function normalizeCollection<T>(items: T[] | undefined): Array<WithAttributes<T>> {
  if (!items?.length) return [];
  return items.map((item) => normalizeEntity(item)!) as Array<WithAttributes<T>>;
}

function dedupeByDocumentId<T>(items: Array<WithAttributes<T>>): Array<WithAttributes<T>> {
  const seen = new Set<string | number | undefined>();
  return items.filter((item) => {
    const docId = (item as any)?.documentId ?? item.attributes?.documentId ?? item.attributes?.id;
    const key = docId ?? (item as any)?.id;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

export async function getSiteSettings(): Promise<SiteSettingEntity> {
  console.log(`
[DATA_SOURCE] Fetching site settings...`);
  const response = await api<StrapiResponse<SiteSettingEntity>>('/api/site-setting?populate=*');
  if (response?.data) {
    log('Strapi', 'Using live site settings.');
    return response.data;
  }
  log('Mock', 'Using mock site settings.');
  return mockSiteSettings;
}

export async function getPageBySlug(slug: string, locale?: string): Promise<PageEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching page with slug: '${slug}', locale: '${resolved}'`);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale: resolved,
  });
  appendPopulatePaths(params, [...BLOCK_POPULATE_PATHS, 'seo']);
  const response = await api<StrapiResponse<PageEntity[]>>(`/api/pages?${params.toString()}`);
  const entity = normalizeEntity(response?.data?.[0]);
  if (entity) {
    log('Strapi', `Found page '${slug}' in Strapi.`);
    const attrs = entity.attributes;
    logEntries({
      entity: 'page',
      source: 'Strapi',
      locale: resolved,
      entries: [
        {
          slug,
          title: attrs?.title ?? null,
          description: attrs?.seo?.metaDescription ?? null,
        },
      ],
    });
    return entity as PageEntity;
  }
  log('Mock', `Using mock data for page '${slug}'.`);
  const fallback = getMockPage(slug, resolved);
  const fallbackAttrs = fallback ? toAttributes(fallback) : undefined;
  logEntries({
    entity: 'page',
    source: 'Mock',
    locale: resolved,
    entries: fallbackAttrs
      ? [
          {
            slug,
            title: fallbackAttrs?.title ?? null,
            description:
              (fallbackAttrs as any)?.seo?.metaDescription ??
              (fallbackAttrs as any)?.summary ??
              (fallbackAttrs as any)?.description ??
              null,
          },
        ]
      : [],
  });
  return fallback;
}

export async function listSolutions(locale?: string): Promise<SolutionEntity[]> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching solutions list, locale: '${resolved}'`);
  const params = new URLSearchParams({ locale: resolved });
  const response = await api<StrapiResponse<SolutionEntity[]>>(`/api/solutions?${params.toString()}`);
  const data = dedupeByDocumentId(normalizeCollection(filterByLocale(response?.data, resolved)));
  if (data.length) {
    log('Strapi', 'Using live solutions list from Strapi.');
    logEntries({
      entity: 'solutions',
      source: 'Strapi',
      locale: resolved,
      entries: data.map((item) => {
        const attrs = toAttributes(item);
        return {
          slug: attrs?.slug ?? null,
          title: attrs?.title ?? null,
          description: attrs?.excerpt ?? null,
        };
      }),
    });
    return data as SolutionEntity[];
  }
  log('Mock', 'Using mock solutions list.');
  const fallback = getMockCollection(mockSolutions, resolved) || [];
  logEntries({
    entity: 'solutions',
    source: 'Mock',
    locale: resolved,
    entries: (fallback as SolutionEntity[]).map((item) => {
      const attrs = toAttributes<SolutionAttributes>(item);
      return {
        slug: attrs?.slug ?? null,
        title: attrs?.title ?? null,
        description: attrs?.excerpt ?? null,
      };
    }),
  });
  return fallback;
}

export async function getSolutionBySlug(slug: string, locale?: string): Promise<SolutionEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching solution with slug: '${slug}', locale: '${resolved}'`);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale: resolved,
  });
  appendPopulatePaths(params, [...BLOCK_POPULATE_PATHS, 'relatedCases']);
  const response = await api<StrapiResponse<SolutionEntity[]>>(`/api/solutions?${params.toString()}`);
  const entity = normalizeEntity(filterByLocale(response?.data, resolved)[0]);
  if (entity) {
    log('Strapi', `Found solution '${slug}' in Strapi.`);
    const attrs = entity.attributes;
    logEntries({
      entity: 'solution',
      source: 'Strapi',
      locale: resolved,
      entries: [
        {
          slug,
          title: attrs?.title ?? null,
          description: attrs?.excerpt ?? null,
        },
      ],
    });
    return entity as SolutionEntity;
  }
  log('Mock', `Using mock data for solution '${slug}'.`);
  const fallbackCollection = getMockCollection(mockSolutions, resolved) || [];
  const fallback = (fallbackCollection as SolutionEntity[]).find((item) => {
    const attrs = item && typeof item === 'object' && 'attributes' in item ? item.attributes as SolutionAttributes : item as unknown as SolutionAttributes;
    return attrs.slug === slug;
  });
  const fallbackAttrs = fallback ? toAttributes(fallback) : undefined;
  logEntries({
    entity: 'solution',
    source: 'Mock',
    locale: resolved,
    entries: fallbackAttrs
      ? [
          {
            slug,
            title: fallbackAttrs?.title ?? null,
            description: fallbackAttrs?.excerpt ?? null,
          },
        ]
      : [],
  });
  return fallback;
}

export async function listCaseStudies(locale?: string): Promise<CaseStudyEntity[]> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching case studies list, locale: '${resolved}'`);
  const params = new URLSearchParams({ locale: resolved });
  appendPopulatePaths(params, ['kpi']);
  const response = await api<StrapiResponse<CaseStudyEntity[]>>(`/api/case-studies?${params.toString()}`);
  const data = dedupeByDocumentId(normalizeCollection(filterByLocale(response?.data, resolved)));
  if (data.length) {
    log('Strapi', 'Using live case studies list from Strapi.');
    logEntries({
      entity: 'case-studies',
      source: 'Strapi',
      locale: resolved,
      entries: data.map((item) => {
        const attrs = toAttributes(item);
        return {
          slug: attrs?.slug ?? null,
          title: attrs?.title ?? null,
          description: attrs?.summary ?? null,
        };
      }),
    });
    return data as CaseStudyEntity[];
  }
  log('Mock', 'Using mock case studies list.');
  const fallback = getMockCollection(mockCaseStudies, resolved) || [];
  logEntries({
    entity: 'case-studies',
    source: 'Mock',
    locale: resolved,
    entries: (fallback as CaseStudyEntity[]).map((item: any) => {
      const attrs = toAttributes(item);
      return {
        slug: attrs?.slug ?? null,
        title: attrs?.title ?? null,
        description: attrs?.summary ?? null,
      };
    }),
  });
  return fallback;
}

export async function getCaseStudyBySlug(slug: string, locale?: string): Promise<CaseStudyEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching case study with slug: '${slug}', locale: '${resolved}'`);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale: resolved,
  });
  appendPopulatePaths(params, ['kpi']);
  const response = await api<StrapiResponse<CaseStudyEntity[]>>(`/api/case-studies?${params.toString()}`);
  const entity = normalizeEntity(filterByLocale(response?.data, resolved)[0]);
  if (entity) {
    log('Strapi', `Found case study '${slug}' in Strapi.`);
    const attrs = entity.attributes;
    logEntries({
      entity: 'case-study',
      source: 'Strapi',
      locale: resolved,
      entries: [
        {
          slug,
          title: attrs?.title ?? null,
          description: attrs?.summary ?? null,
        },
      ],
    });
    return entity as CaseStudyEntity;
  }
  log('Mock', `Using mock data for case study '${slug}'.`);
  const fallbackCollection = getMockCollection(mockCaseStudies, resolved) || [];
  const fallback = (fallbackCollection as CaseStudyEntity[]).find((item: any) => (item.attributes || item).slug === slug);
  const fallbackAttrs = fallback ? toAttributes(fallback) : undefined;
  logEntries({
    entity: 'case-study',
    source: 'Mock',
    locale: resolved,
    entries: fallbackAttrs
      ? [
          {
            slug,
            title: fallbackAttrs?.title ?? null,
            description: fallbackAttrs?.summary ?? null,
          },
        ]
      : [],
  });
  return fallback;
}

export async function listArticles(locale?: string, page = 1, pageSize = 9): Promise<ArticleEntity[]> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching articles list, locale: '${resolved}'`);
  const params = new URLSearchParams({
    sort: 'publishedAt:desc',
    locale: resolved,
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
  });
  appendPopulatePaths(params, ['cover']);
  const response = await api<StrapiResponse<ArticleEntity[]>>(`/api/articles?${params.toString()}`);
  const data = dedupeByDocumentId(normalizeCollection(filterByLocale(response?.data, resolved)));
  if (data.length) {
    log('Strapi', 'Using live articles list from Strapi.');
    logEntries({
      entity: 'articles',
      source: 'Strapi',
      locale: resolved,
      entries: data.map((item) => {
        const attrs = item.attributes;
        return {
          slug: attrs?.slug ?? null,
          title: attrs?.title ?? null,
          description: attrs?.excerpt ?? null,
        };
      }),
    });
    return data as ArticleEntity[];
  }
  log('Mock', 'Using mock articles list.');
  const fallback = getMockCollection(mockArticles, resolved) || [];
  logEntries({
    entity: 'articles',
    source: 'Mock',
    locale: resolved,
    entries: (fallback as ArticleEntity[]).map((item: any) => {
      const attrs = toAttributes(item);
      return {
        slug: attrs?.slug ?? null,
        title: attrs?.title ?? null,
        description: attrs?.excerpt ?? null,
      };
    }),
  });
  return fallback;
}

export async function getArticleBySlug(slug: string, locale?: string): Promise<ArticleEntity | undefined> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching article with slug: '${slug}', locale: '${resolved}'`);
  const params = new URLSearchParams({
    'filters[slug][$eq]': slug,
    locale: resolved,
  });
  appendPopulatePaths(params, ['cover']);
  const response = await api<StrapiResponse<ArticleEntity[]>>(`/api/articles?${params.toString()}`);
  const entity = filterByLocale(response?.data, resolved)[0];
  if (entity) {
    log('Strapi', `Found article '${slug}' in Strapi.`);
    const attrs = entity.attributes;
    logEntries({
      entity: 'article',
      source: 'Strapi',
      locale: resolved,
      entries: [
        {
          slug,
          title: attrs?.title ?? null,
          description: attrs?.excerpt ?? null,
        },
      ],
    });
    return entity as ArticleEntity;
  }
  log('Mock', `Using mock data for article '${slug}'.`);
  const fallbackCollection = getMockCollection(mockArticles, resolved) || [];
  const fallback = (fallbackCollection as ArticleEntity[]).find((item: any) => (item.attributes || item).slug === slug);
  const fallbackAttrs = fallback ? toAttributes(fallback) : undefined;
  logEntries({
    entity: 'article',
    source: 'Mock',
    locale: resolved,
    entries: fallbackAttrs
      ? [
          {
            slug,
            title: fallbackAttrs?.title ?? null,
            description: fallbackAttrs?.excerpt ?? null,
          },
        ]
      : [],
  });
  return fallback;
}

export async function listResources(locale?: string): Promise<ResourceEntity[]> {
  const resolved = resolveMockLocale(locale);
  console.log(`
[DATA_SOURCE] Fetching resources list, locale: '${resolved}'`);
  const params = new URLSearchParams({ locale: resolved });
  appendPopulatePaths(params, ['link']);
  const response = await api<StrapiResponse<ResourceEntity[]>>(`/api/resources?${params.toString()}`);
  const data = dedupeByDocumentId(normalizeCollection(filterByLocale(response?.data, resolved)));
  if (data.length) {
    log('Strapi', 'Using live resources list from Strapi.');
    logEntries({
      entity: 'resources',
      source: 'Strapi',
      locale: resolved,
      entries: data.map((item) => {
        const attrs = item.attributes;
        return {
          slug: attrs?.slug ?? null,
          title: attrs?.title ?? null,
          description: attrs?.description ?? null,
        };
      }),
    });
    return data as ResourceEntity[];
  }
  log('Mock', 'Using mock resources list.');
  const fallback = getMockCollection(mockResources, resolved) || [];
  logEntries({
    entity: 'resources',
    source: 'Mock',
    locale: resolved,
    entries: (fallback as ResourceEntity[]).map((item: any) => {
      const attrs = toAttributes(item);
      return {
        slug: attrs?.slug ?? null,
        title: attrs?.title ?? null,
        description: attrs?.description ?? null,
      };
    }),
  });
  return fallback;
}

export function hasStrapiConfig() {
  return Boolean(STRAPI_URL);
}
