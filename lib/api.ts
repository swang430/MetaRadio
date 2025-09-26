// This file contains all the functions to interact with the Headless CMS (e.g., Strapi).

// 定义API的基础URL，方便未来修改
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

// 定义Solution接口并导出
export interface Solution {
  id: number;
  name: string;
  description: any;
  slug: string;
}

/**
 * 从Strapi获取所有解决方案
 * @param {string} locale - The locale to fetch.
 * @returns {Promise<Solution[]>} - A promise that resolves to an array of solutions.
 */
export async function getSolutions(locale: string): Promise<Solution[]> {
  const res = await fetch(`${STRAPI_URL}/api/solutions?locale=${locale}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch solutions from Strapi');
  }

  const json = await res.json();
  return json.data;
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

export async function getPlatforms(locale: string): Promise<Platform[]> {
  const res = await fetch(`${STRAPI_URL}/api/platforms?locale=${locale}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch platforms from Strapi');
  }

  const json = await res.json();
  return json.data;
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
 * 从Strapi获取所有资源
 * @param {string} locale - The locale to fetch.
 * @returns {Promise<Resource[]>} - A promise that resolves to an array of resources.
 */
export async function getResources(locale: string): Promise<Resource[]> {
  const res = await fetch(`${STRAPI_URL}/api/resources?locale=${locale}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch resources from Strapi');
  }

  const json = await res.json();
  // 按发布日期降序排序
  return json.data.sort((a: Resource, b: Resource) => 
    new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
  );
}

/**
 * 根据 slug 从 Strapi 获取单个解决方案
 * @param {string} slug - The slug of the solution to fetch.
 * @returns {Promise<Solution | null>} - A promise that resolves to a single solution or null if not found.
 */
export async function getSolutionBySlug(slug: string): Promise<Solution | null> {
  const res = await fetch(`${STRAPI_URL}/api/solutions?filters[slug][$eq]=${slug}`);

  if (!res.ok) {
    throw new Error('Failed to fetch solution from Strapi');
  }

  const json = await res.json();
  if (json.data && json.data.length > 0) {
    return json.data[0]; // 返回数组中的第一个元素
  }

  return null;
}
