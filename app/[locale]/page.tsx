import Link from 'next/link';
import { Nav } from '@/components/nav';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { SUPPORTED_LOCALES, resolveLocale, type Locale } from '@/lib/i18n/config';
import { getPageBySlug } from '@/lib/strapi';
import type { Metadata } from 'next';

export const revalidate = 60;

export default async function HomePage({ params }: { params: { locale?: string } }) {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  await getPageBySlug('landing', locale); // 保留对 Strapi 的访问以兼容元数据需求

  const content = buildHomeContent(locale);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100">
      <Nav locale={locale} dictionary={dictionary} />
      <main className="relative pb-32">
        <HeroSection content={content.hero} />
        <ChallengeSection content={content.challenge} />
        <SolutionSection content={content.solution} />
        <WorkflowSection content={content.workflow} />
        <ApplicationsSection content={content.applications} />
        <AdvantagesSection content={content.advantages} />
        <CallToActionSection content={content.cta} />
      </main>
    </div>
  );
}

export async function generateMetadata({ params }: { params: { locale?: string } }): Promise<Metadata> {
  const locale: Locale = resolveLocale(params?.locale);
  const dictionary = getDictionary(locale);
  const page = await getPageBySlug('landing', locale);
  const seo = page?.attributes.seo;
  const fallbackDescription =
    locale === 'en'
      ? 'MetaRadio delivers ray-tracing driven channel insights, OTA validation, and virtual drive testing.'
      : 'MetaRadio 以射线跟踪法为核心，提供通信仿真、动态 OTA 与虚拟路测能力。';
  const title = seo?.metaTitle || dictionary.common.brandName;
  const description = seo?.metaDescription || fallbackDescription;
  return {
    title,
    description,
    openGraph: { title, description },
    alternates: {
      canonical: '/',
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((loc) => [loc, loc === 'zh' ? '/' : `/${loc}`])
      ),
    },
  };
}

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

type HomeContent = ReturnType<typeof buildHomeContent>;

type SectionProps<T extends keyof HomeContent> = {
  content: HomeContent[T];
};

function HeroSection({ content }: SectionProps<'hero'>) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_20%,rgba(99,102,241,0.25),transparent),radial-gradient(120%_120%_at_80%_-10%,rgba(14,165,233,0.25),transparent)]" />
      <div className="absolute inset-0 bg-slate-950" />
      <div className="relative container px-6 py-24 sm:py-28 lg:py-36">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-200/90">
              {content.eyebrow}
            </span>
            <h1 className="font-display text-4xl text-white leading-[1.1] sm:text-5xl lg:text-6xl">
              {content.title}{' '}
              <span className="text-brand-200">{content.highlight}</span>
            </h1>
            <p className="text-base text-slate-200/80 sm:text-lg lg:text-xl">{content.description}</p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href={content.primary.href}
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
              >
                {content.primary.label}
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={content.secondary.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-300 hover:bg-brand-300/15"
              >
                {content.secondary.label}
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(99,102,241,0.2),transparent_55%)] blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 p-8 shadow-glow backdrop-blur">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-200/80">
                <span>{content.visual.badge}</span>
              </div>
              <h3 className="mt-4 font-display text-2xl text-white sm:text-3xl">{content.visual.title}</h3>
              <p className="mt-3 text-sm text-slate-200/75 sm:text-base">{content.visual.description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {content.visual.points.map((point) => (
                  <div
                    key={point.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-brand-300/40 hover:bg-brand-300/10"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200/80">{point.label}</span>
                    <p className="mt-2 text-sm text-slate-200/80">{point.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChallengeSection({ content }: SectionProps<'challenge'>) {
  const offsets = ['md:-translate-y-6', 'md:translate-y-2', 'md:-translate-y-10'];
  const spans = ['md:col-span-5 xl:col-span-4', 'md:col-span-4 xl:col-span-4', 'md:col-span-5 xl:col-span-4'];
  return (
    <section id="challenge" className="relative bg-slate-950 py-24">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{content.title}</h2>
          <p className="mt-4 text-base text-slate-200/75 sm:text-lg">{content.intro}</p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-10 top-1/2 hidden h-px -translate-y-1/2 bg-white/5 lg:block" aria-hidden />
          <div className="relative mt-16 grid gap-6 md:grid-cols-12">
            {content.items.map((item, index) => (
              <div key={item.title} className={`${spans[index % spans.length]} ${offsets[index % offsets.length]}`}>
                <div className="absolute -inset-4 hidden rounded-[2.75rem] bg-[radial-gradient(360px_circle_at_10%_-10%,rgba(129,140,248,0.18),transparent)] lg:block" aria-hidden />
                <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/60 p-8 shadow-card transition hover:border-brand-400/40 hover:bg-white/10 md:min-h-[320px]">
                  <div aria-hidden className="mb-6 flex h-24 items-center justify-center rounded-2xl border border-dashed border-white/10 bg-slate-900/60 text-4xl">
                    <span>{item.icon}</span>
                  </div>
                  <h3 className="font-display text-xl text-white">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-200/75">{item.description}</p>
                  <div className="mt-auto pt-6 text-xs uppercase tracking-[0.3em] text-slate-400">
                    {item.figureHint}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SolutionSection({ content }: SectionProps<'solution'>) {
  return (
    <section id="solution" className="relative bg-slate-900 py-24">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{content.title}</h2>
          <p className="mt-4 text-base text-slate-200/75 sm:text-lg">{content.subtitle}</p>
        </div>
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="relative order-last lg:order-first">
            <div className="absolute -inset-10 rounded-[3rem] bg-[radial-gradient(360px_circle_at_20%_20%,rgba(99,102,241,0.22),transparent_70%)] blur-3xl" aria-hidden />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/40 p-8 shadow-glow">
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-brand-200/80">
                {content.visual.badge}
              </div>
              <h3 className="mt-5 font-display text-2xl text-white sm:text-3xl">{content.visual.title}</h3>
              <p className="mt-3 text-sm text-slate-200/75 sm:text-base">{content.visual.description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {content.visual.milestones.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <span className="text-2xl font-semibold text-white">{item.value}</span>
                    <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex-1 rounded-2xl border border-dashed border-white/10 bg-slate-900/60 p-4 text-sm text-slate-400">
                {content.visual.placeholder}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-base text-slate-200/80 sm:text-lg">{content.description}</p>
            <ul className="space-y-4">
              {content.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-200/75">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-400/20 text-brand-200">
                    ●
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-3xl border border-white/10 bg-slate-950/40 p-6 text-sm text-slate-200/70 shadow-inner">
              {content.highlight}
            </div>
            <Link
              href={content.action.href}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              {content.action.label}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection({ content }: SectionProps<'workflow'>) {
  return (
    <section id="workflow" className="relative bg-slate-950 py-24">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{content.title}</h2>
          <p className="mt-4 text-base text-slate-200/75 sm:text-lg">{content.intro}</p>
        </div>
        <div className="relative mt-14">
          <div className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-brand-400/30 to-transparent md:block" aria-hidden />
          <div className="grid gap-6 md:grid-cols-5">
            {content.steps.map((step, index) => (
              <div
                key={step.title}
                className="group relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-card transition hover:border-brand-400/30"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100">
                  <div className="h-full w-full bg-[radial-gradient(360px_circle_at_0%_-10%,rgba(14,165,233,0.2),transparent)]" />
                </div>
                <div className="relative space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm text-brand-200/80">{String(index + 1).padStart(2, '0')}</span>
                    <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-xs uppercase tracking-[0.3em] text-slate-400 md:flex">
                      {step.token}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-white">{step.title}</h3>
                  <p className="text-sm text-slate-200/75">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ApplicationsSection({ content }: SectionProps<'applications'>) {
  const layoutMap: Record<'wide' | 'standard' | 'banner', string> = {
    wide: 'md:col-span-12 md:flex-row lg:col-span-6 xl:row-span-2 xl:min-h-[360px]',
    standard: 'md:col-span-6 xl:col-span-4 xl:min-h-[280px]',
    banner: 'md:col-span-12 xl:col-span-12 xl:min-h-[240px]',
  };
  return (
    <section id="applications" className="relative bg-slate-900 py-24">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{content.title}</h2>
          <p className="mt-4 text-base text-slate-200/75 sm:text-lg">{content.intro}</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-12">
          {content.items.map((item) => (
            <div
              key={item.title}
              className={`relative flex h-full flex-col overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-6 shadow-card transition hover:border-brand-400/30 ${layoutMap[item.layout]}`}
            >
              <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(160%_120%_at_50%_0%,rgba(129,140,248,0.25),transparent)]" />
              <div className="relative flex flex-1 flex-col justify-between pt-24">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200/80">{item.illustration}</span>
                <h3 className="mt-4 font-display text-xl text-white sm:text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-200/75">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AdvantagesSection({ content }: SectionProps<'advantages'>) {
  return (
    <section id="advantages" className="relative bg-slate-950 py-24">
      <div className="container px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{content.title}</h2>
          <p className="mt-4 text-base text-slate-200/75 sm:text-lg">{content.intro}</p>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-center">
          {content.metrics.map((metric) => (
            <div key={metric.label} className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-200/80">
              <span className="text-lg font-semibold text-white">{metric.value}</span>
              <span className="ml-2 text-xs uppercase tracking-[0.3em] text-slate-400">{metric.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {content.items.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/5 p-6 text-center shadow-card transition hover:border-brand-400/30"
            >
              <div aria-hidden className="absolute inset-x-0 top-0 h-14 bg-[radial-gradient(160%_120%_at_50%_-20%,rgba(99,102,241,0.25),transparent)]" />
              <div className="relative pt-10">
                <h3 className="font-display text-2xl text-brand-200">{item.title}</h3>
                <p className="mt-3 text-sm text-slate-200/75">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToActionSection({ content }: SectionProps<'cta'>) {
  return (
    <section id="contact" className="relative overflow-hidden bg-slate-900 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_0%,rgba(14,165,233,0.25),transparent)]" />
      <div className="container relative px-6 text-center">
        <h2 className="font-display text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{content.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-200/80 sm:text-lg">{content.description}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {content.actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-500 via-brand-400 to-sky-400 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
            >
              {action.label}
              <span aria-hidden>→</span>
            </Link>
          ))}
        </div>
      </div>
      <footer className="mt-20 border-t border-white/10 bg-slate-950/60">
        <div className="container flex flex-col gap-2 px-6 py-8 text-center text-sm text-slate-400">
          <span>{content.footer}</span>
          <span>{content.email}</span>
        </div>
      </footer>
    </section>
  );
}

function buildHomeContent(locale: Locale) {
  if (locale === 'en') {
    return {
      hero: {
        eyebrow: 'HyperRT · Digital Twin',
        title: 'See the electromagnetic world clearly',
        highlight: 'and predict connectivity with confidence',
        description:
          'MetaRadio delivers physics-grounded ray tracing, turning invisible multipath and interference into actionable insight for communication, sensing, and positioning.',
        primary: { label: 'Explore solutions', href: '/en/marketing/solutions' },
        secondary: { label: 'Book a demo', href: '/en/contact' },
        visual: {
          badge: 'HyperRT engine',
          title: 'High-fidelity electromagnetic twin',
          description:
            'Illustrative glass panel placeholder. Replace with product render or animation that shows digital twin layers and measurement overlays.',
          points: [
            { label: 'Scene twin', detail: 'City-scale 3D assets with centimetre-level fidelity.' },
            { label: 'Dynamic nodes', detail: 'Programmable vehicles, robots, UAVs, and RIS behaviours.' },
            { label: 'Channel KPIs', detail: 'Impulse responses, SINR heatmaps, and MIMO metrics on demand.' },
            { label: 'Integrations', detail: 'Standard exports and APIs to slot into existing toolchains.' },
          ],
        },
      },
      challenge: {
        title: 'Why is reliable prediction still so difficult?',
        intro:
          'Moving vehicles, complex factories, and dense cities constantly reshape radio propagation. Static statistical models can no longer explain or prevent critical performance gaps.',
        items: [
          {
            icon: '🌐',
            title: 'Dynamic scenes',
            description:
              'Vehicles, robots, and people continuously alter signal paths and Doppler, leaving static measurements behind.',
            figureHint: 'Placeholder: mobility heatmap or animated crowd flow.',
          },
          {
            icon: '🏙️',
            title: 'Unique environments',
            description:
              'Every factory floor and street canyon has its own geometry and materials. Averaged models miss the local extremes that break performance.',
            figureHint: 'Placeholder: factory vs. city material swatches.',
          },
          {
            icon: '🧪',
            title: 'Costly field tests',
            description:
              'Drive tests cost weeks, budgets, and coordination. Results are hard to repeat, limiting product velocity.',
            figureHint: 'Placeholder: drive-test cost stack or calendar chart.',
          },
        ],
      },
      solution: {
        title: 'Build an electromagnetic digital twin',
        subtitle:
          'From geometry ingestion to channel export, HyperRT recreates every reflection, diffraction, and penetration with deterministic accuracy.',
        description:
          'Our engine fuses precise 3D geometry with material-aware propagation to deliver centimetre-level fidelity. Run unlimited what-if scenarios safely inside the twin, iterate faster, and deploy with confidence.',
        points: [
          'Deterministic ray tracing anchored in Maxwell-based physics.',
          'High-fidelity multi-path attributes: power, delay, AoA/AoD, and polarisation.',
          'Repeat any extreme or hazardous scenario digitally for zero-risk validation.',
        ],
        highlight:
          'The HyperRT appliance unifies geometry ingestion, material-aware physics, high-performance acceleration, and channel analytics in a single deterministic stack.',
        action: { label: 'Meet HyperRT', href: '/en/marketing/products' },
        visual: {
          badge: 'HyperRT pipeline',
          title: 'From environment capture to channel KPIs',
          description:
            'Use this panel for a workflow render that layers CAD/LiDAR inputs, solver stages, and KPI dashboards.',
          milestones: [
            { label: 'ASSETS SYNCED', value: '40+' },
            { label: 'PHYSICS MODULES', value: '12' },
            { label: 'GPU SPEEDUP', value: 'x35' },
            { label: 'AUTOMATION APIs', value: 'REST / gRPC' },
          ],
          placeholder:
            'Placeholder canvas: swap with product illustration (e.g., 3D city twin + channel rays).',
        },
      },
      workflow: {
        title: 'Integrated simulation engine architecture',
        intro:
          'Five tightly coupled modules power end-to-end simulation, from raw environment data to rich channel outputs.',
        steps: [
          {
            title: 'Scenario ingestion',
            description: 'Import CAD, GIS, LiDAR, and measurement inputs with smart preprocessing.',
            token: 'CAD',
          },
          {
            title: 'Geometry modelling',
            description: 'Normalise meshes, assign materials, and prepare surfaces for precise tracing.',
            token: 'GEO',
          },
          {
            title: 'Electromagnetic solver',
            description: 'Track reflection, diffraction, scattering, and penetration with deterministic algorithms.',
            token: 'EM',
          },
          {
            title: 'Simulation acceleration',
            description: 'Leverage CPU and GPU heterogenous parallelism for rapid iteration.',
            token: 'HPC',
          },
          {
            title: 'Channel output',
            description: 'Deliver multi-path datasets, KPIs, and API hooks for analysis workflows.',
            token: 'KPI',
          },
        ],
      },
      applications: {
        title: 'Redefine industry boundaries',
        intro:
          'Ray tracing fuels far more than traditional telecoms. Any system relying on wireless connectivity, sensing, or positioning gains a predictive edge.',
        items: [
          {
            title: 'Automotive and V2X',
            description:
              'Recreate city canyons, tunnels, and test tracks in the lab to validate antennas, T-Boxes, and ADAS connectivity safely.',
            layout: 'wide',
            illustration: 'Urban canyon drive test overlay',
          },
          {
            title: '5G / 6G research',
            description:
              'Provide accurate channels for massive MIMO, beamforming, RIS, and joint communication-sensing experiments.',
            layout: 'wide',
            illustration: 'Massive MIMO / RIS lab illustration',
          },
          {
            title: 'Robotics and smart factories',
            description:
              'Assess coverage for AGVs and cobots inside complex production lines, ensuring low latency and high reliability.',
            layout: 'standard',
            illustration: 'Smart factory floorplan overlay',
          },
          {
            title: 'UAV and low-altitude economy',
            description: 'Simulate dense urban airspace to plan safe drone logistics and inspection missions.',
            layout: 'standard',
            illustration: 'Low-altitude corridor mockup',
          },
          {
            title: 'Satellite and NTN',
            description:
              'Model satellite-to-ground links through city skylines to optimise terminal design and hybrid networks.',
            layout: 'standard',
            illustration: 'Satellite footprint vs skyline placeholder',
          },
          {
            title: 'Healthcare and precise positioning',
            description:
              'Correct indoor multipath in hospitals for centimetre-level tracking of equipment and staff.',
            layout: 'banner',
            illustration: 'Hospital indoor positioning heatmap',
          },
        ],
      },
      advantages: {
        title: 'Global-leading advantages',
        intro:
          'HyperRT sets the benchmark in deterministic dynamics, platform coverage, spectrum reach, and real-time capability.',
        metrics: [
          { label: 'DEPLOYMENTS', value: '120+' },
          { label: 'MEDIAN ERROR', value: '<=1.5 dB' },
          { label: 'FREQUENCY RANGE', value: '0.1-325 GHz' },
        ],
        items: [
          {
            title: 'L3 dynamic scenes',
            description: 'True temporal simulation with programmable motion and Doppler accuracy.',
          },
          {
            title: 'Cross-platform support',
            description: 'Native on Windows, Linux, macOS, and domestic Kirin systems across x64 and Apple Silicon.',
          },
          {
            title: 'Ultra-high bands',
            description: 'Scale up to 325 GHz to underpin next-generation 6G and beyond research.',
          },
          {
            title: 'Real-time precision',
            description: 'Deliver hardware-in-the-loop loops with 500 microsecond responsiveness for demanding validation.',
          },
        ],
      },
      cta: {
        title: 'Start your precise prediction journey',
        description:
          'Discover how physics-grounded ray tracing can unlock new performance frontiers for your organisation. Reach out for a tailored demonstration.',
        actions: [
          { label: 'Book a demo', href: 'mailto:sales@metaradio.tech?subject=MetaRadio%20Demo' },
          { label: 'Explore solutions', href: '/en/marketing/solutions' },
        ],
        footer: 'WISTA · Wireless Intelligent System Twins Alliance',
        email: 'sales@metaradio.tech',
      },
    } as const;
  }

  return {
    hero: {
      eyebrow: 'HyperRT · 数字孪生',
      title: '洞见电磁世界',
      highlight: '精准预测未来连接',
      description:
        '乾径科技（HyperRT）以确定性射线跟踪为引擎，构建高保真电磁空间数字孪生，让不可见的信号变得可知、可测、可预测。',
      primary: { label: '探索应用领域', href: '#applications' },
      secondary: { label: '预约演示', href: '/zh/contact' },
      visual: {
        badge: 'HyperRT 引擎',
        title: '全景电磁孪生示意位',
        description:
          '此处可放置三维场景或雷达线束动画，突出数字孪生如何映射真实电磁环境。',
        points: [
          { label: '场景孪生', detail: '城市、园区、工厂等多源数据统一建模，保持厘米级精度。' },
          { label: '动态节点', detail: '车辆、无人机、机器人等轨迹可编程复现瞬态交互。' },
          { label: '性能指标', detail: '实时输出功率、时延、角度、SINR 等多维 KPI。' },
          { label: '系统集成', detail: '支持标准接口与 API，融入现有工具链。' },
        ],
      },
    },
    challenge: {
      title: '连接无处不在，为何预测依然困难？',
      intro:
        '从自动驾驶到智能工厂，无线连接已成为关键基础设施。但真实世界的复杂性让依赖统计模型的传统方法面临前所未有的挑战。',
      items: [
        {
          icon: '📡',
          title: '场景的动态复杂性',
          description: '移动的车辆、机器人和人群实时改变信号路径，静态模型无法捕捉瞬息万变的多径与多普勒。',
          figureHint: '插图占位：动态移动对象与波束轨迹动画。',
        },
        {
          icon: '🏭',
          title: '环境的独特性',
          description: '每个工厂、每条街道的几何与材质都不同，“平均值”模型难以反映特定场景的性能瓶颈。',
          figureHint: '插图占位：城市/工厂材质对比或结构剖面。',
        },
        {
          icon: '🧪',
          title: '物理测试的局限',
          description: '真实路测成本高、周期长且难复现，成为产品研发与验证的严重瓶颈。',
          figureHint: '插图占位：路测预算时间表或设备投入条形图。',
        },
      ],
    },
    solution: {
      title: '我们的方案：构建电磁空间的数字孪生',
      subtitle:
        '基于射线跟踪技术，以物理学为第一性原理，精确复现电磁波在三维环境中的每一次反射、绕射和穿透。',
      description:
        'HyperRT 将高精度三维几何、材质库与确定性传播算法深度融合，提供厘米级保真度。任何极端或危险场景都可在数字空间中无限次复现。',
      points: [
        '确定性预测：以物理规律为核心，告别“猜测”。',
        '高保真还原：多径强度、时延、角度与极化一网打尽。',
        '无限次重复：极端工况零成本复现，加速迭代验证。',
      ],
      highlight:
        'HyperRT 一体机集成场景输入、几何建模、电磁求解、仿真加速与结果输出，实现端到端的确定性仿真能力。',
      action: { label: '了解 HyperRT 产品', href: '/zh/marketing/products' },
      visual: {
        badge: 'HyperRT 流程',
        title: '从环境采集到信道指标',
        description: '建议放置流程信息图，展示数据采集、求解、分析闭环。',
        milestones: [
          { label: '资产同步', value: '40+ 数据集' },
          { label: '物理模块', value: '12 个' },
          { label: '加速比', value: '最高 x35' },
          { label: '接口协议', value: 'REST / gRPC' },
        ],
        placeholder: '插画占位：可替换为产品界面或三维场景渲染。',
      },
    },
    workflow: {
      title: '一体化仿真引擎架构',
      intro: '五大核心模块协同工作，从场景输入到信道输出全程可控，打造高性能仿真闭环。',
      steps: [
        {
          title: '仿真输入',
          description: '导入 CAD、GIS、激光点云及测量数据，自动完成预处理。',
          token: 'CAD',
        },
        {
          title: '几何模型',
          description: '统一网格、材质与边界条件，为精确射线追踪做好准备。',
          token: 'GEO',
        },
        {
          title: '电磁模型',
          description: '确定性求解反射、绕射、散射与透射，完整复现传播机理。',
          token: 'EM',
        },
        {
          title: '仿真加速',
          description: 'CPU/GPU 异构并行，显著缩短仿真时间。',
          token: 'HPC',
        },
        {
          title: '仿真输出',
          description: '生成多径数据、KPI 指标与接口，方便后续分析与集成。',
          token: 'KPI',
        },
      ],
    },
    applications: {
      title: '重塑行业边界：从通信测试到万物智联',
      intro:
        '射线跟踪技术适用于所有依赖无线信号的通信、感知与定位场景，为行业带来由精准预测驱动的深刻变革。',
      items: [
        {
          title: '汽车与 V2X 通信',
          description: '在实验室中复现城市峡谷、隧道等复杂驾驶场景，验证车载天线与 T-Box 性能，加速自动驾驶落地。',
          layout: 'wide',
          illustration: '插图占位：城市峡谷 + 车辆轨迹热力图',
        },
        {
          title: '5G / 6G 前沿研发',
          description: '为 Massive MIMO、波束赋形、RIS 等前沿技术提供高精度信道数据，支撑算法验证与评估。',
          layout: 'wide',
          illustration: '插图占位：暗室设备或 RIS 阵列示意',
        },
        {
          title: '机器人与智能工厂',
          description: '评估复杂产线的覆盖与干扰，保障 AGV、协作机器人低时延、高可靠通信。',
          layout: 'standard',
          illustration: '插图占位：工厂平面图 + 覆盖热力图',
        },
        {
          title: '无人机与低空经济',
          description: '仿真城市楼宇间的低空信道，规划无人机物流与巡检任务的最佳航线。',
          layout: 'standard',
          illustration: '插图占位：楼宇间无人机航线',
        },
        {
          title: '卫星与 NTN',
          description: '评估天地一体化网络在城市环境的覆盖与穿透，为终端设计和协同策略提供依据。',
          layout: 'standard',
          illustration: '插图占位：卫星覆盖与地面终端分布',
        },
        {
          title: '医疗科技与精准定位',
          description: '校正医院等复杂室内环境的多径误差，实现设备与人员厘米级定位。',
          layout: 'banner',
          illustration: '插图占位：医院平面 + 定位轨迹',
        },
      ],
    },
    advantages: {
      title: '全球领先的核心优势',
      intro: 'HyperRT 在动态仿真、平台适配、频谱支持与实时性上全面领先，完全自主可控。',
      metrics: [
        { label: '累计部署', value: '120+ 套' },
        { label: '误差基线', value: '<=1.5 dB' },
        { label: '频段范围', value: '0.1-325 GHz' },
      ],
      items: [
        {
          title: 'L3 级动态',
          description: '真正的时序仿真，支持可编程动态交互与多普勒精确计算。',
        },
        {
          title: '全平台支持',
          description: '原生支持 Windows、Linux、macOS 与国产麒麟，覆盖 x64 与 Apple Silicon。',
        },
        {
          title: '超高频段',
          description: '支持最高 325 GHz 频率，为 6G 及更高频段研究奠定基础。',
        },
        {
          title: '实时与精确',
          description: '支持 500 微秒级 HIL 实时响应，满足严苛验证需求。',
        },
      ],
    },
    cta: {
      title: '开启您的精准预测之旅',
      description:
        '欢迎联系 MetaRadio 专家团队，了解确定性射线跟踪方案如何为您的业务带来突破性价值。',
      actions: [
        { label: '预约演示', href: 'mailto:sales@metaradio.tech?subject=预约演示' },
        { label: '浏览解决方案', href: '/zh/marketing/solutions' },
      ],
      footer: 'WISTA-Wireless Intelligent System Twins Alliance',
      email: 'sales@metaradio.tech',
    },
  } as const;
}
