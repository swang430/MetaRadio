import { BlocksRenderer } from '@/components/blocks/renderer';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getSolutionBySlug, listSolutions } from '@/lib/strapi';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

type SolutionPageProps = {
  params: { locale?: string; slug: string };
};

type LinkLike =
  | { name?: string | null; url?: string | null; id?: string | number | null }
  | { data?: { attributes?: { name?: string | null; url?: string | null } | null } | null }
  | null
  | undefined;

type MediaLike =
  | {
      url?: string | null;
      alternativeText?: string | null;
      alt?: string | null;
      width?: number | null;
      height?: number | null;
      data?: { attributes?: MediaLike | null } | null;
    }
  | null
  | undefined;

type CaseEntry =
  | {
      id?: number | string | null;
      attributes?: {
        title?: string | null;
        slug?: string | null;
        client?: string | null;
        summary?: string | null;
      } | null;
      title?: string | null;
      slug?: string | null;
      client?: string | null;
      summary?: string | null;
    }
  | null
  | undefined;

function pickAttributes<T>(input: T | { attributes?: T | null } | null | undefined): T | undefined {
  if (!input) return undefined;
  if (typeof input === 'object' && 'attributes' in (input as any) && (input as any).attributes) {
    return (input as any).attributes as T;
  }
  return input as T;
}

function normalizeLink(link: LinkLike) {
  const data = pickAttributes(link);
  if (!data || !data.url || !data.name) return undefined;
  return {
    id: (link as any)?.id ?? data.url,
    name: data.name,
    url: data.url,
  };
}

function normalizeLinks(links: LinkLike[] | null | undefined) {
  if (!links?.length) return [];
  const seen = new Set<string>();
  return links
    .map((link) => normalizeLink(link))
    .filter((link): link is { id?: string | number | null; name: string; url: string } => Boolean(link?.name && link?.url))
    .filter((link) => {
      if (seen.has(link.url)) return false;
      seen.add(link.url);
      return true;
    });
}

function normalizeMedia(media: MediaLike) {
  if (!media) return undefined;
  if (typeof media === 'string') return undefined;
  if (media.data?.attributes) {
    return normalizeMedia(media.data.attributes);
  }
  if (!media.url) return undefined;
  return {
    url: media.url,
    alt: media.alt || media.alternativeText || null,
    width: media.width ?? null,
    height: media.height ?? null,
  };
}

function normalizeCaseList(items: CaseEntry[] | null | undefined) {
  if (!items?.length) return [];
  const seen = new Set<string>();
  return items
    .map((item) => {
      if (!item) return undefined;
      const attrs = pickAttributes<{
        title?: string | null;
        slug?: string | null;
        client?: string | null;
        summary?: string | null;
      }>(item);
      if (!attrs || !attrs.title || !attrs.slug) return undefined;
      return {
        id: (item as any)?.id ?? attrs.slug,
        title: attrs.title,
        slug: attrs.slug,
        client: attrs.client ?? null,
        summary: attrs.summary ?? null,
      };
    })
    .filter((entry): entry is { id?: string | number | null; title: string; slug: string; client?: string | null; summary?: string | null } => !!entry)
    .filter((entry) => {
      if (seen.has(entry.slug)) return false;
      seen.add(entry.slug);
      return true;
    });
}

function normalizeBlocks(
  blocks: any[] | undefined,
  attrs: { title: string; excerpt?: string | null },
  relatedCasesFallback: any[],
  relatedCasesTitle: string
) {
  const normalized = (blocks || [])
    .map((block) => {
      switch (block?.__component) {
        case 'hero.hero': {
          return {
            ...block,
            theme: block.theme || 'dark',
            ctaPrimary: normalizeLink(block.ctaPrimary),
            ctaSecondary: normalizeLink(block.ctaSecondary),
            bgMedia: normalizeMedia(block.bgMedia),
          };
        }
        case 'sections.feature-grid': {
          return {
            ...block,
            theme: block.theme || 'light',
            items: (block.items || []).map((item: any) => ({
              ...item,
              link: normalizeLink(item.link),
            })),
          };
        }
        case 'sections.bullet-list': {
          return {
            ...block,
            theme: block.theme || 'dark',
            items: (block.items || []).map((item: any) => ({
              ...item,
              icon: normalizeMedia(item.icon),
            })),
          };
        }
        case 'sections.tech-flow': {
          return {
            ...block,
            theme: block.theme || 'light',
            steps: (block.steps || []).map((step: any) => ({ ...step })),
          };
        }
        case 'content.media-block': {
          return {
            ...block,
            theme: block.theme || 'light',
            media: normalizeMedia(block.media),
            actions: normalizeLinks(block.actions),
          };
        }
        case 'sections.case-showcase': {
          return {
            ...block,
            theme: block.theme || 'dark',
            cases: normalizeCaseList(block.cases),
          };
        }
        case 'sections.cta-banner':
        case 'content.cta': {
          return {
            ...block,
            theme: block.theme || 'dark',
            links: normalizeLinks(block.links),
          };
        }
        default:
          return block;
      }
    })
    .filter(Boolean);

  const hasHero = normalized.some((block) => block.__component === 'hero.hero');
  if (!hasHero) {
    normalized.unshift({
      __component: 'hero.hero',
      theme: 'dark',
      headline: attrs.title,
      summary: attrs.excerpt,
    });
  }

  const existingCaseBlockIndex = normalized.findIndex((block) => block.__component === 'sections.case-showcase');
  const fallbackCases = normalizeCaseList(relatedCasesFallback);

  if (fallbackCases.length) {
    if (existingCaseBlockIndex >= 0) {
      const existing = normalized[existingCaseBlockIndex];
      const combined = normalizeCaseList([...(existing.cases || []), ...fallbackCases]);
      normalized[existingCaseBlockIndex] = {
        ...existing,
        theme: existing.theme || 'dark',
        title: existing.title || relatedCasesTitle,
        cases: combined,
      };
    } else {
      normalized.push({
        __component: 'sections.case-showcase',
        theme: 'dark',
        title: relatedCasesTitle,
        cases: fallbackCases,
      });
    }
  }

  return normalized;
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const locale: Locale = resolveLocale(params.locale);
  const dictionary = getDictionary(locale);
  const solution = await getSolutionBySlug(params.slug, locale);
  if (!solution) notFound();

  const attrs = solution.attributes;
  const relatedCases = Array.isArray(solution.attributes.relatedCases)
    ? solution.attributes.relatedCases
    : solution.attributes.relatedCases?.data || [];
  const normalizedBlocks = normalizeBlocks(
    attrs.blocks,
    { title: attrs.title, excerpt: attrs.excerpt },
    relatedCases,
    dictionary.pages.solutions.relatedCasesHeading
  );

  return (
    <div className="relative">
      <Nav locale={locale} dictionary={dictionary} />
      <main>
        <BlocksRenderer blocks={normalizedBlocks} locale={locale} dictionary={dictionary} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const locale: Locale = resolveLocale(params.locale);
  const solution = await getSolutionBySlug(params.slug, locale);
  if (!solution) return { title: 'MetaRadio' };
  const seo = solution.attributes.seo;
  const title = seo?.metaTitle || `${solution.attributes.title} · MetaRadio`;
  const description = seo?.metaDescription || solution.attributes.excerpt || undefined;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    alternates: {
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [
          loc,
          loc === 'zh'
            ? `/marketing/solutions/${solution.attributes.slug}`
            : `/${loc}/marketing/solutions/${solution.attributes.slug}`,
        ])
      ),
    },
  };
}

export async function generateStaticParams() {
  const locales = SUPPORTED_LOCALES;
  const params: Array<{ locale: string; slug: string }> = [];
  for (const locale of locales) {
    const solutions = await listSolutions(locale as Locale);
    solutions.forEach((solution) => {
      const attrs = solution.attributes || solution;
      if (attrs.slug) {
        params.push({ locale, slug: attrs.slug });
      }
    });
  }
  return params;
}
