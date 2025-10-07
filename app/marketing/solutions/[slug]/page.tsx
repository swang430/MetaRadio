import type { Metadata } from 'next';
import LocalePage, {
  generateMetadata as generateLocaleMetadata,
  generateStaticParams as generateLocaleStaticParams,
} from '../../../[locale]/marketing/solutions/[slug]/page';
import { DEFAULT_LOCALE } from '@/lib/i18n/config';

type Params = { slug: string };

type MetadataContext = { params: Params };

type StaticParams = Array<Params>;

export default function SolutionDetailPage({ params }: { params: Params }) {
  return <LocalePage params={{ locale: DEFAULT_LOCALE, slug: params.slug }} />;
}

export const generateMetadata = ({ params }: MetadataContext): Promise<Metadata> | Metadata =>
  generateLocaleMetadata({ params: { locale: DEFAULT_LOCALE, slug: params.slug } });

export const generateStaticParams = async (): Promise<StaticParams> => {
  const params = await generateLocaleStaticParams();
  return params
    .filter((entry) => entry.locale === DEFAULT_LOCALE)
    .map(({ slug }) => ({ slug }));
};
