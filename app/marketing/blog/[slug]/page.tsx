import type { Metadata } from 'next';
import LocalePage, {
  generateMetadata as generateLocaleMetadata,
  generateStaticParams as generateLocaleStaticParams,
} from '../../../[locale]/marketing/blog/[slug]/page';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';

type Params = { slug: string };

export default function ArticlePage({ params }: { params: Params }) {
  return <LocalePage params={{ locale: DEFAULT_LOCALE, slug: params.slug }} />;
}

export const generateMetadata = ({ params }: { params: Params }): Promise<Metadata> | Metadata =>
  generateLocaleMetadata({ params: { locale: DEFAULT_LOCALE, slug: params.slug } });

export const generateStaticParams = async (): Promise<Params[]> => {
  const params = await generateLocaleStaticParams();
  return params
    .filter((entry) => entry.locale === DEFAULT_LOCALE)
    .map(({ slug }) => ({ slug }));
};
