// /:lang/careers/:track — Career-track detail page (RIN-471 / part of RIN-469).
// Renders the markdown body of a track + cross-links into Rights, Orgs,
// Glossary, Professionals, and city-scoped career pages (Sub-4 placeholders
// link into the city detail page until those programmatic cells ship).

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.careers.$track";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { findBootcamp } from "~/lib/careers/bootcamps.server";
import {
  CAREER_TRACK_TO_TAG,
  glyphForCareerTrack,
  isCareerTrack,
} from "~/lib/careers/categories";
import { careerTrackBody, findCareerTrack } from "~/lib/careers/careers.server";
import { bootcampPath, storyPath, trackCityPath, trackPath } from "~/lib/careers/links";
import { relevantCities } from "~/lib/careers/relevance";
import { breadcrumbJsonLd, careerTrackJsonLd } from "~/lib/careers/schema";
import { storiesForTrack } from "~/lib/careers/stories.server";
import { CITIES } from "~/lib/cities/registry";
import { getGlossaryEntry } from "~/lib/db/queries/glossary.server";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const trackParam = params.track;
  if (!trackParam || !isCareerTrack(trackParam)) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const entry = findCareerTrack(trackParam);
  if (!entry) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  const html = renderMarkdown(careerTrackBody(entry, locale));

  // Resolve cross-vertical refs through the existing query layer so a
  // typo in the seed never produces a 404 link in production.
  const relatedRights = entry.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }))
    .slice(0, 5);

  const relatedOrgs = entry.relatedOrgs
    .map((slug) => getOrgEntry(slug, locale))
    .filter((o): o is NonNullable<typeof o> => o !== null)
    .map((o) => ({
      slug: o.slug,
      name: o.name,
      shortDescription: o.shortDescription,
      category: o.category,
    }))
    .slice(0, 4);

  const relatedTerms = entry.relatedTerms
    .map((slug) => getGlossaryEntry(slug, locale))
    .filter((g): g is NonNullable<typeof g> => g !== null)
    // Skip glossary entries that duplicate an org card already rendered in
    // the "leading orgs" section right above (ENP and Olim Beyahad appeared
    // twice with near-identical text, TED-130).
    .filter((g) => !relatedOrgs.some((o) => o.slug === g.slug || o.name === g.term))
    .map((g) => ({ slug: g.slug, term: g.term, summary: g.summary }))
    .slice(0, 4);

  // Top cities relevant to this track (for the cities cross-link section).
  // Sub-4 (RIN-473) will replace these with /careers/$track/$city links;
  // until then they go to /cities/$slug, which exists today (RIN-339).
  const topCities = relevantCities(entry.slug, CITIES)
    .slice(0, 8)
    .map((c) => ({ slug: c.slug, name: c.names[locale] ?? c.names.he }));

  // Resolve recommended bootcamp slugs into full entries (Sub-3 / RIN-472).
  // The seed pins these slugs to BOOTCAMPS via tests/careers-links.test.ts,
  // so the filter below is defensive — non-empty in the happy path.
  const recommendedBootcamps = entry.recommendedBootcamps
    .map((slug) => findBootcamp(slug))
    .filter((b): b is NonNullable<typeof b> => b !== null)
    .map((b) => ({
      slug: b.slug,
      name: b.name[locale] ?? b.name.he,
      summary: b.shortDescription[locale] ?? b.shortDescription.he,
      programType: b.programType,
    }));

  // Success stories that belong to this track (Sub-6 / RIN-475).
  const trackStories = storiesForTrack(entry.slug)
    .slice(0, 3)
    .map((s) => ({
      slug: s.slug,
      nickname: s.nickname[locale] ?? s.nickname.he,
      currentRole: s.currentRole[locale] ?? s.currentRole.he,
      summary: s.summary[locale] ?? s.summary.he,
    }));

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${trackPath(entry.slug)}`;

  return {
    locale,
    entry,
    html,
    relatedRights,
    relatedOrgs,
    relatedTerms,
    topCities,
    recommendedBootcamps,
    trackStories,
    shareUrl,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry, publicUrl } = data;
  const name = entry.name[locale] ?? entry.name.he;
  const description = entry.shortDescription[locale] ?? entry.shortDescription.he;
  const trackJsonLd = careerTrackJsonLd({ publicUrl, locale }, entry);
  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name, path: trackPath(entry.slug) },
  ]);
  return [
    { title: `${name} — ${t(locale, "careers_landing_title")} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, trackPath(entry.slug)),
    { property: "og:title", content: name },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": trackJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function CareerTrackDetail({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    entry,
    html,
    relatedRights,
    relatedOrgs,
    relatedTerms,
    topCities,
    recommendedBootcamps,
    trackStories,
    shareUrl,
  } = loaderData;
  const tag = CAREER_TRACK_TO_TAG[entry.slug];
  const tone = classesForTag(tag);
  const name = entry.name[locale] ?? entry.name.he;
  const summary = entry.shortDescription[locale] ?? entry.shortDescription.he;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative isolate mb-8 overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
          <img
            src="https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForCareerTrack(entry.slug)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{summary}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className={tagChipClasses(tag)}>
              {t(locale, "careers_priority_label")} #{entry.priority}
            </span>
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-6">
          <WhatsAppShare title={name} url={shareUrl} locale={locale} />
        </div>

        {/* Related rights -------------------------------------------------- */}
        {relatedRights.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_track_related_rights_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedRights.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${locale}/rights/${r.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{r.title}</span>
                    <span className="mt-1 block text-ink-600">{r.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Bootcamps (Sub-3 — RIN-472) ----------------------------------- */}
        {recommendedBootcamps.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_track_bootcamps_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {recommendedBootcamps.map((b) => (
                <li key={b.slug}>
                  <Link
                    to={`/${locale}${bootcampPath(b.slug)}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{b.name}</span>
                    <span className="mt-1 block text-ink-600">{b.summary}</span>
                    <span className="mt-2 inline-block text-xs text-earth-700">
                      {t(locale, `careers_program_type_${b.programType.toLowerCase()}`)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Affirmative-action link for the public-sector track ----------- */}
        {entry.slug === "public-sector" && (
          <section className="mt-10">
            <Link
              to={`/${locale}/careers/affirmative-action`}
              className="block rounded-lg border border-accent-red/30 bg-accent-red/5 p-4 text-sm transition hover:border-accent-red/50"
            >
              <span className="block font-medium text-earth-900">
                {t(locale, "careers_affirmative_action_title")}
              </span>
              <span className="mt-1 block text-ink-600">
                {t(locale, "careers_affirmative_action_subtitle")}
              </span>
            </Link>
          </section>
        )}

        {/* Related orgs --------------------------------------------------- */}
        {relatedOrgs.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_track_orgs_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {relatedOrgs.map((o) => (
                <li key={o.slug}>
                  <Link
                    to={`/${locale}/orgs/${o.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{o.name}</span>
                    <span className="mt-1 block text-ink-600">{o.shortDescription}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Top cities (RIN-473 — links to /careers/$track/$city cells) ---- */}
        {topCities.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_track_cities_heading")}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {topCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    to={`/${locale}${trackCityPath(entry.slug, city.slug)}`}
                    className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Counselor CTA -------------------------------------------------- */}
        <section
          className={`mt-10 overflow-hidden rounded-lg border p-5 ${tone.softBg} ${tone.border}`}
        >
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "careers_track_counselors_heading")}
          </p>
          <Link
            to={`/${locale}/professionals/career-counselor`}
            className={`mt-2 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:opacity-90 ${tone.accentBg}`}
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_explore_counselors_cta")}
          </Link>
        </section>

        {/* Related glossary terms ----------------------------------------- */}
        {relatedTerms.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_track_terms_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {relatedTerms.map((g) => (
                <li key={g.slug}>
                  <Link
                    to={`/${locale}/glossary/${g.slug}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{g.term}</span>
                    <span className="mt-1 block text-ink-600">{g.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Success stories (Sub-6 — RIN-475) ----------------------------- */}
        {trackStories.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_track_stories_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {trackStories.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${locale}${storyPath(s.slug)}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{s.nickname}</span>
                    <span className="mt-1 block text-xs text-ink-600">
                      {s.currentRole}
                    </span>
                    <span className="mt-2 block text-xs text-ink-700">{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back to hub --------------------------------------------------- */}
        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_track_back_to_hub")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
