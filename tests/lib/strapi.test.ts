import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getSiteSettings,
  getPageBySlug,
  listSolutions,
  getSolutionBySlug,
  listArticles,
  getArticleBySlug,
  listCaseStudies,
  getCaseStudyBySlug,
  listResources,
  hasStrapiConfig,
} from '@/lib/strapi';

// Mock fetch to simulate Strapi API failures (forces fallback to mock data)
global.fetch = vi.fn(() =>
  Promise.reject(new Error('Strapi not available'))
) as any;

describe('Strapi Data Layer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Configuration', () => {
    it('should detect when Strapi config is missing', () => {
      expect(hasStrapiConfig()).toBe(false);
    });
  });

  describe('Site Settings', () => {
    it('should return mock site settings when Strapi is unavailable', async () => {
      const settings = await getSiteSettings();
      expect(settings).toBeDefined();
      expect(settings.attributes).toBeDefined();
      expect(settings.attributes.siteName).toBeTruthy();
    });
  });

  describe('Pages', () => {
    it('should return a page by slug (zh locale)', async () => {
      const page = await getPageBySlug('landing', 'zh');
      expect(page).toBeDefined();
      expect(page?.attributes?.slug).toBe('landing');
      expect(page?.attributes?.blocks).toBeDefined();
    });

    it('should return a page by slug (en locale)', async () => {
      const page = await getPageBySlug('landing', 'en');
      expect(page).toBeDefined();
      expect(page?.attributes?.slug).toBe('landing');
    });

    it('should return undefined for non-existent page', async () => {
      const page = await getPageBySlug('non-existent-page-12345', 'zh');
      expect(page).toBeUndefined();
    });

    it('should fallback to default locale when page not found in requested locale', async () => {
      const page = await getPageBySlug('landing', 'invalid-locale' as any);
      expect(page).toBeDefined(); // Should fallback to zh
    });
  });

  describe('Solutions', () => {
    it('should list solutions for zh locale', async () => {
      const solutions = await listSolutions('zh');
      expect(Array.isArray(solutions)).toBe(true);
      expect(solutions.length).toBeGreaterThan(0);
    });

    it('should list solutions for en locale', async () => {
      const solutions = await listSolutions('en');
      expect(Array.isArray(solutions)).toBe(true);
    });

    it('should get a specific solution by slug', async () => {
      const solutions = await listSolutions('zh');
      if (solutions.length > 0) {
        const firstSlug = solutions[0].attributes.slug;
        const solution = await getSolutionBySlug(firstSlug, 'zh');
        expect(solution).toBeDefined();
        expect(solution?.attributes?.slug).toBe(firstSlug);
      }
    });

    it('should return undefined for non-existent solution', async () => {
      const solution = await getSolutionBySlug('non-existent-solution', 'zh');
      expect(solution).toBeUndefined();
    });
  });

  describe('Articles', () => {
    it('should list articles with default pagination', async () => {
      const articles = await listArticles('zh');
      expect(Array.isArray(articles)).toBe(true);
    });

    it('should list articles with custom pagination', async () => {
      const articles = await listArticles('zh', 1, 5);
      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeLessThanOrEqual(5);
    });

    it('should get a specific article by slug', async () => {
      const articles = await listArticles('zh');
      if (articles.length > 0) {
        const firstSlug = articles[0].attributes.slug;
        const article = await getArticleBySlug(firstSlug, 'zh');
        expect(article).toBeDefined();
        expect(article?.attributes?.slug).toBe(firstSlug);
      }
    });

    it('should return undefined for non-existent article', async () => {
      const article = await getArticleBySlug('non-existent-article', 'zh');
      expect(article).toBeUndefined();
    });
  });

  describe('Case Studies', () => {
    it('should list case studies', async () => {
      const cases = await listCaseStudies('zh');
      expect(Array.isArray(cases)).toBe(true);
    });

    it('should get a specific case study by slug', async () => {
      const cases = await listCaseStudies('zh');
      if (cases.length > 0) {
        const firstSlug = cases[0].attributes.slug;
        const caseStudy = await getCaseStudyBySlug(firstSlug, 'zh');
        expect(caseStudy).toBeDefined();
        expect(caseStudy?.attributes?.slug).toBe(firstSlug);
      }
    });

    it('should return undefined for non-existent case study', async () => {
      const caseStudy = await getCaseStudyBySlug('non-existent-case', 'zh');
      expect(caseStudy).toBeUndefined();
    });
  });

  describe('Resources', () => {
    it('should list resources', async () => {
      const resources = await listResources('zh');
      expect(Array.isArray(resources)).toBe(true);
    });

    it('should return resources with proper structure', async () => {
      const resources = await listResources('zh');
      if (resources.length > 0) {
        const resource = resources[0];
        expect(resource.attributes).toBeDefined();
        expect(resource.attributes.title).toBeTruthy();
        expect(resource.attributes.slug).toBeTruthy();
      }
    });
  });

  describe('Data Structure Consistency', () => {
    it('should ensure all entities have attributes wrapper', async () => {
      const page = await getPageBySlug('landing', 'zh');
      expect(page?.attributes).toBeDefined();

      const solutions = await listSolutions('zh');
      solutions.forEach((solution) => {
        expect(solution.attributes).toBeDefined();
      });

      const articles = await listArticles('zh');
      articles.forEach((article) => {
        expect(article.attributes).toBeDefined();
      });
    });

    it('should handle missing optional fields gracefully', async () => {
      const page = await getPageBySlug('landing', 'zh');
      // Should not throw even if optional fields are missing
      expect(() => {
        const seo = page?.attributes?.seo;
        const title = seo?.metaTitle;
      }).not.toThrow();
    });
  });

  describe('Locale Handling', () => {
    it('should handle missing locale parameter', async () => {
      const page = await getPageBySlug('landing');
      expect(page).toBeDefined();
    });

    it('should respect locale preference', async () => {
      const pageZh = await getPageBySlug('landing', 'zh');
      const pageEn = await getPageBySlug('landing', 'en');

      // Both should exist but may have different content
      expect(pageZh).toBeDefined();
      expect(pageEn).toBeDefined();
    });
  });
});
