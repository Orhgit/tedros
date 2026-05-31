// /:lang/careers — Careers Hub pillar (RIN-471 / part of RIN-469).
// Renders the 10 career-track cards, supporting-org cards, and a CTA to the
// career-counselor section of the Professionals directory. JSON-LD wires
// the pillar into Google as a `WebPage` + `ItemList` of tracks.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.careers._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { BOOTCAMPS } from "~/lib/careers/bootcamps.server";
import { CAREER_TRACK_TO_TAG, glyphForCareerTrack } from "~/lib/careers/categories";
import { careerTracksByPriority } from "~/lib/careers/careers.server";
import { faqsByOrder } from "~/lib/careers/faqs.server";
import { bootcampPath, faqPath, trackPath } from "~/lib/careers/links";
import { breadcrumbJsonLd } from "~/lib/careers/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

// 4 career-supporting orgs to feature on the pillar. Slugs match
// `app/lib/orgs/orgs.server.ts` — `tracksForOrg(slug)` confirms each
// touches at least two career tracks.
const SUPPORTING_ORG_SLUGS = ["enp", "olim-beyahad", "isef", "tebeka"] as const;

const SUPPORTING_ORG_NAMES: Record<
  (typeof SUPPORTING_ORG_SLUGS)[number],
  Record<Locale, string>
> = {
  enp: { he: "ENP", en: "ENP", am: "ENP" },
  "olim-beyahad": {
    he: "עולים ביחד",
    en: "Olim Beyahad",
    am: "ኦሊም በያሐድ",
  },
  isef: { he: "קרן איסף", en: "ISEF", am: "ISEF ፈንድ" },
  tebeka: { he: "טבקה", en: "Tebeka", am: "ጤቤካ" },
};

const SUPPORTING_ORG_ROLES: Record<
  (typeof SUPPORTING_ORG_SLUGS)[number],
  Record<Locale, string>
> = {
  enp: {
    he: "Tech-Career, fellowship מורים, מסלולי הכשרה אזרחית",
    en: "Tech-Career, teaching fellowship, civil-service tracks",
    am: "Tech-Career፣ የማስተማር fellowship፣ የመንግስት መንገዶች",
  },
  "olim-beyahad": {
    he: "Mentorship 1:1 לבוגרי תואר, רשת cross-sector",
    en: "1:1 mentorship for grads, cross-sector network",
    am: "1:1 አማካሪነት ለምሩቃን፣ ሁሉም-ዘርፍ ኔትዎርክ",
  },
  isef: {
    he: "מלגות מצטיינים BA/MA/PhD + פיפ-לאיין לתעסוקה",
    en: "BA/MA/PhD excellence scholarships + employment pipeline",
    am: "BA/MA/PhD ብቃት እርዳታ + ወደ ቅጥር መንገድ",
  },
  tebeka: {
    he: "ייצוג משפטי בתעסוקה — discrimination + ערעורי צו 50",
    en: "Employment legal representation — discrimination + Order-50 appeals",
    am: "የቅጥር የህግ ውክልና — discrimination + የትዕዛዝ-50 ይግባኝ",
  },
};

// Curated set of 6 featured bootcamps to surface on the pillar — picked
// across tracks (tech / public-sector / education / trades / finance /
// retail) so the landing reads representative.
const FEATURED_BOOTCAMP_SLUGS = [
  "enp-tech-career",
  "atidim-academic",
  "enp-teaching-fellowship",
  "madrasa-trades",
  "isef-excellence-employment",
  "place-il",
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const tracks = careerTracksByPriority();
  const featuredBootcamps = FEATURED_BOOTCAMP_SLUGS.map((slug) =>
    BOOTCAMPS.find((b) => b.slug === slug),
  )
    .filter((b): b is NonNullable<typeof b> => b !== undefined)
    .map((b) => ({
      slug: b.slug,
      name: b.name[locale] ?? b.name.he,
      summary: b.shortDescription[locale] ?? b.shortDescription.he,
      trackSlug: b.trackSlug,
    }));
  const featuredFaqs = faqsByOrder()
    .slice(0, 5)
    .map((f) => ({
      slug: f.slug,
      question: f.question[locale] ?? f.question.he,
      shortAnswer: f.shortAnswer[locale] ?? f.shortAnswer.he,
    }));
  const { PUBLIC_URL } = getEnv();
  return { locale, tracks, featuredBootcamps, featuredFaqs, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, tracks, publicUrl } = data;
  const title = t(locale, "careers_landing_title");
  const subtitle = t(locale, "careers_landing_subtitle");

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, "/careers"),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: `${publicUrl}/${locale}/careers` },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${publicUrl}/${locale}/careers`,
        url: `${publicUrl}/${locale}/careers`,
        name: title,
        description: subtitle,
        inLanguage: locale,
        isPartOf: {
          "@type": "WebSite",
          url: publicUrl,
          name: "Tedros",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: tracks.map((track, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: track.name[locale] ?? track.name.he,
            url: `${publicUrl}/${locale}${trackPath(track.slug)}`,
          })),
        },
      },
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
      ]),
    },
  ];
};

export default function CareersLanding({ loaderData }: Route.ComponentProps) {
  const { locale, tracks, featuredBootcamps, featuredFaqs } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        {/* Hero ----------------------------------------------------------- */}
        <header className="relative mb-10 isolate overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-yellow/10 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-yellow/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-s-16 -bottom-16 size-56 rounded-full bg-accent-green/10 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "careers_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "careers_landing_subtitle")}
          </p>
          <p className="relative mt-3 text-sm text-ink-600">
            {tracks.length} {t(locale, "careers_count_label")}
          </p>
        </header>

        {/* Track grid ----------------------------------------------------- */}
        <section className="mb-12" aria-labelledby="careers-tracks-heading">
          <h2
            id="careers-tracks-heading"
            className="mb-4 font-display text-2xl font-semibold text-earth-900"
          >
            {t(locale, "careers_section_tracks_heading")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => {
              const tag = CAREER_TRACK_TO_TAG[track.slug];
              const tone = classesForTag(tag);
              const name = track.name[locale] ?? track.name.he;
              const summary = track.shortDescription[locale] ?? track.shortDescription.he;
              return (
                <li key={track.slug}>
                  <Link
                    to={`/${locale}${trackPath(track.slug)}`}
                    className={`group relative block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
                    />
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                        {name}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="text-xl leading-none"
                        title={name}
                      >
                        {glyphForCareerTrack(track.slug)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-600">{summary}</p>
                    <div className="mt-3">
                      <span className={tagChipClasses(tag)}>
                        {t(locale, "careers_priority_label")} #{track.priority}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Supporting orgs ------------------------------------------------- */}
        <section className="mb-12" aria-labelledby="careers-orgs-heading">
          <h2
            id="careers-orgs-heading"
            className="mb-4 font-display text-2xl font-semibold text-earth-900"
          >
            {t(locale, "careers_section_orgs_heading")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORTING_ORG_SLUGS.map((slug) => {
              const name = SUPPORTING_ORG_NAMES[slug][locale];
              const role = SUPPORTING_ORG_ROLES[slug][locale];
              return (
                <li key={slug}>
                  <Link
                    to={`/${locale}/orgs/${slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {name}
                    </h3>
                    <p className="mt-1 text-sm text-ink-600">{role}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* Counselor CTA --------------------------------------------------- */}
        <section
          className="mb-12 overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-8"
          aria-labelledby="careers-counselors-heading"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="careers-counselors-heading"
                className="font-display text-2xl font-semibold text-earth-900"
              >
                {t(locale, "careers_section_counselors_heading")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-ink-700">
                {t(locale, "careers_pillar_cta_body")}
              </p>
            </div>
            <Link
              to={`/${locale}/professionals/career-counselor`}
              className="inline-flex items-center gap-2 rounded-md bg-earth-800 px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:bg-earth-700 sm:self-start"
            >
              <span aria-hidden="true">←</span>
              {t(locale, "careers_explore_counselors_cta")}
            </Link>
          </div>
        </section>

        {/* Featured bootcamps (Sub-3 — RIN-472) --------------------------- */}
        <section className="mb-12" aria-labelledby="careers-bootcamps-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2
              id="careers-bootcamps-heading"
              className="font-display text-2xl font-semibold text-earth-900"
            >
              {t(locale, "careers_section_bootcamps_heading")}
            </h2>
            <Link
              to={`/${locale}/careers/affirmative-action`}
              className="text-sm text-earth-700 hover:underline"
            >
              {t(locale, "careers_affirmative_action_breadcrumb")} →
            </Link>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBootcamps.map((b) => (
              <li key={b.slug}>
                <Link
                  to={`/${locale}${bootcampPath(b.slug)}`}
                  className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                >
                  <span className="block font-medium text-earth-900">{b.name}</span>
                  <span className="mt-1 block text-ink-600">{b.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Featured FAQs (Sub-6 — RIN-475) -------------------------------- */}
        <section className="mb-12" aria-labelledby="careers-faqs-heading">
          <div className="mb-4 flex items-center justify-between">
            <h2
              id="careers-faqs-heading"
              className="font-display text-2xl font-semibold text-earth-900"
            >
              {t(locale, "careers_section_faqs_heading")}
            </h2>
            <Link
              to={`/${locale}/careers/faq`}
              className="text-sm text-earth-700 hover:underline"
            >
              {t(locale, "careers_view_all_faqs")} →
            </Link>
          </div>
          <ul className="space-y-2">
            {featuredFaqs.map((f) => (
              <li key={f.slug}>
                <Link
                  to={`/${locale}${faqPath(f.slug)}`}
                  className="block rounded-lg border border-earth-200 bg-card p-4 transition hover:border-earth-400 hover:shadow-sm"
                >
                  <p className="text-sm font-medium text-earth-900">{f.question}</p>
                  <p className="mt-1 text-xs text-ink-600">{f.shortAnswer}</p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Statistics + stories teasers (Sub-6) --------------------------- */}
        <section className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            to={`/${locale}/careers/statistics`}
            className="block rounded-2xl border border-earth-200 bg-card p-6 transition hover:border-earth-400 hover:shadow-sm"
          >
            <p className="font-display text-base font-semibold text-earth-900">
              {t(locale, "careers_statistics_title")}
            </p>
            <p className="mt-1 text-sm text-ink-600">
              {t(locale, "careers_statistics_subtitle")}
            </p>
          </Link>
          <Link
            to={`/${locale}/careers/stories`}
            className="block rounded-2xl border border-earth-200 bg-card p-6 transition hover:border-earth-400 hover:shadow-sm"
          >
            <p className="font-display text-base font-semibold text-earth-900">
              {t(locale, "careers_stories_landing_title")}
            </p>
            <p className="mt-1 text-sm text-ink-600">
              {t(locale, "careers_stories_landing_subtitle")}
            </p>
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
