// This file contains all the functions to interact with the Headless CMS (e.g., Strapi).

import { mockPlatforms, mockSolutions, mockSolutionBySlug, mockResources } from './mock-data';

// 定义API的基础URL，方便未来修改
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
// 单次请求超时：内容源慢/卡时快速失败并降级，避免渲染挂起。
const REQUEST_TIMEOUT_MS = Number(process.env.STRAPI_TIMEOUT_MS || 8000);

/**
 * 容错的 Strapi GET。
 *
 * 网络失败 / 非 2xx / 超时一律捕获并返回 null（同时告警），由调用方降级为
 * 空列表或 null。这样当 Strapi（内容源）不可用时，整站只显示空内容而不是崩溃，
 * 延续“优雅降级”的核心理念（自 legacy 融合而来）。
 */
async function fetchFromStrapi<T = unknown>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_URL}${path}`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      console.warn(`[strapi] ${res.status} ${res.statusText} when fetching ${path}`);
      return null;
    }
    const json = await res.json();
    return (json?.data ?? null) as T | null;
  } catch (error) {
    console.warn(
      `[strapi] fetch failed for ${path} (内容源不可达，已降级):`,
      error instanceof Error ? error.message : error,
    );
    return null;
  }
}

// 定义Solution接口并导出
export interface Solution {
  id: number;
  name: string;
  description: any;
  slug: string;
  challenge?: any;
  solution_details?: any;
  benefits?: any;
  challenge_title?: string;
  solution_details_title?: string;
  benefits_title?: string;
}

/**
 * 从Strapi获取所有解决方案。内容源不可达时降级为空数组。
 * @param {string} locale - The locale to fetch.
 */
export async function getSolutions(locale: string): Promise<Solution[]> {
  const data = await fetchFromStrapi<Solution[]>(`/api/solutions?locale=${locale}`);
  return data && data.length > 0 ? data : mockSolutions(locale);
}

/**
 * 从Strapi的富文本格式中提取纯文本
 * @param description - The rich text object from Strapi.
 * @returns {string} - The extracted plain text.
 */
export function extractTextFromDescription(description: any): string {
  if (Array.isArray(description) && description[0]?.children[0]?.text) {
    return description[0].children[0].text;
  }
  return 'Description not available.';
}

// 定义Platform接口并导出
export interface Platform {
  id: number;
  name: string;
  description: any;
  slug: string;
}

/**
 * 从Strapi获取所有平台。内容源不可达时降级为空数组。
 */
export async function getPlatforms(locale: string): Promise<Platform[]> {
  const data = await fetchFromStrapi<Platform[]>(`/api/platforms?locale=${locale}`);
  return data && data.length > 0 ? data : mockPlatforms(locale);
}

// 定义Resource接口并导出
export interface Resource {
  id: number;
  Title: string;
  Description: any;
  slug: string;
  type: 'White Paper' | 'Case Study' | 'Blog Post';
  publicationDate: string;
}

/**
 * 从Strapi获取所有资源（按发布日期降序）。内容源不可达时降级为空数组。
 * @param {string} locale - The locale to fetch.
 */
export async function getResources(locale: string): Promise<Resource[]> {
  const data = await fetchFromStrapi<Resource[]>(`/api/resources?locale=${locale}`);
  const list = data && data.length > 0 ? data : mockResources(locale);
  return [...list].sort(
    (a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime(),
  );
}

/**
 * 根据 slug 从 Strapi 获取单个解决方案。内容源不可达或未找到时返回 null。
 * @param {string} slug - The slug of the solution to fetch.
 */
export async function getSolutionBySlug(slug: string, locale: string): Promise<Solution | null> {
  const data = await fetchFromStrapi<Solution[]>(
    `/api/solutions?filters[slug][$eq]=${slug}&locale=${locale}`,
  );
  return data && data.length > 0 ? data[0] : mockSolutionBySlug(slug, locale);
}
