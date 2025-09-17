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