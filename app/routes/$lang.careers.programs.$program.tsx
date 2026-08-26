// /:lang/careers/programs/:program — Bootcamp / program detail (RIN-472).
// Renders one of the 15 BOOTCAMPS entries with a track-aware framing,
// internal cross-links, and an `EducationalOccupationalProgram` (or
// `Service` for mentorships) JSON-LD that's Google-eligible.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.careers.programs.$program";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { BOOTCAMPS, bootcampBody, findBootcamp } from "~/lib/careers/bootcamps.server";
import { findCareerTrack } from "~/lib/careers/careers.server";
import {
  CAREER_TRACK_TO_TAG,
  glyphForCareerTrack,
  isCareerTrack,
} from "~/lib/careers/categories";
import { bootcampPath, trackDisplayName, trackPath } from "~/lib/careers/links";
import { bootcampJsonLd, breadcrumbJsonLd } from "~/lib/careers/schema";
import { CITIES } from "~/lib/cities/registry";
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
  const programParam = params.program;
  if (!programParam) {
    throw data({ error: "missing-slug" }, { status: 404 });
  }
  const entry = findBootcamp(programParam);
  if (!entry) {
    throw data({ error: "not-found" }, { status: 404 });
  }

  // Resolve the parent track for branding + breadcrumbs.
  if (!isCareerTrack(entry.trackSlug)) {
    throw data({ error: "invalid-track" }, { status: 500 });
  }
  const track = findCareerTrack(entry.trackSlug);
  if (!track) {
    throw data({ error: "track-not-found" }, { status: 500 });
  }

  const html = renderMarkdown(bootcampBody(entry, locale));

  const org = entry.orgSlug ? getOrgEntry(entry.orgSlug, locale) : null;

  const relatedRights = entry.relatedRights
    .map((slug) => getRightBySlug(slug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }))
    .slice(0, 4);

  const cityNames = entry.cities
    .map((slug) => {
      const city = CITIES.find((c) => c.slug === slug);
      return city ? { slug, name: city.names[locale] ?? city.names.he } : null;
    })
    .filter((c): c is { slug: string; name: string } => c !== null);

  // Sibling bootcamps in the same track (excluding self).
  const siblings = BOOTCAMPS.filter(
    (b) => b.trackSlug === entry.trackSlug && b.slug !== entry.slug,
  )
    .slice(0, 3)
    .map((b) => ({
      slug: b.slug,
      name: b.name[locale] ?? b.name.he,
      summary: b.shortDescription[locale] ?? b.shortDescription.he,
    }));

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${bootcampPath(entry.slug)}`;

  return {
    locale,
    entry,
    track,
    html,
    org,
    relatedRights,
    cityNames,
    siblings,
    shareUrl,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, entry, track, org, publicUrl } = data;
  const name = entry.name[locale] ?? entry.name.he;
  const description = entry.shortDescription[locale] ?? entry.shortDescription.he;
  const trackName = trackDisplayName(track, locale);

  const programJsonLd = bootcampJsonLd(
    { publicUrl, locale },
    {
      slug: entry.slug,
      trackSlug: entry.trackSlug,
      name: entry.name,
      shortDescription: entry.shortDescription,
      ...(org
        ? {
            org: {
              slug: org.slug,
              name: { he: org.name, en: org.name, am: org.name },
            },
          }
        : {}),
      programType: entry.programType,
      ...(entry.timeToComplete ? { timeToComplete: entry.timeToComplete } : {}),
      financialAidEligible: entry.financialAidEligible,
      ...(entry.occupationalCategory
        ? { occupationalCategory: entry.occupationalCategory }
        : {}),
      applicationUrl: entry.applicationUrl,
    },
  );

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: trackName, path: trackPath(track.slug) },
    { name, path: bootcampPath(entry.slug) },
  ]);

  return [
    { title: `${name} — ${t(locale, "careers_landing_title")} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, bootcampPath(entry.slug)),
    { property: "og:title", content: name },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": programJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function BootcampDetail({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    entry,
    track,
    html,
    org,
    relatedRights,
    cityNames,
    siblings,
    shareUrl,
  } = loaderData;
  const tag = CAREER_TRACK_TO_TAG[track.slug];
  const tone = classesForTag(tag);
  const name = entry.name[locale] ?? entry.name.he;
  const summary = entry.shortDescription[locale] ?? entry.shortDescription.he;
  const trackName = trackDisplayName(track, locale);

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
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${trackPath(track.slug)}`} className="hover:underline">
              {trackName}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForCareerTrack(track.slug)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {name}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{summary}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              to={`/${locale}${trackPath(track.slug)}`}
              className={tagChipClasses(tag)}
            >
              <span aria-hidden="true" className="me-1">
                {glyphForCareerTrack(track.slug)}
              </span>
              {trackName}
            </Link>
            <span className="text-xs text-ink-600">
              {t(locale, "careers_program_type_label")}:{" "}
              {t(locale, `careers_program_type_${entry.programType.toLowerCase()}`)}
            </span>
            {entry.financialAidEligible && (
              <span className="text-xs text-ink-600">
                · {t(locale, "careers_program_financial_aid")}
              </span>
            )}
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <aside
          className={`mt-10 overflow-hidden rounded-lg border p-5 ${tone.softBg} ${tone.border}`}
        >
          <p className="text-sm font-medium text-earth-900">
            {t(locale, "careers_program_apply_label")}
          </p>
          <a
            href={entry.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-base font-medium text-white shadow-sm transition hover:opacity-90 ${tone.accentBg}`}
          >
            <span aria-hidden="true">↗</span>
            {t(locale, "careers_program_apply_cta")}
          </a>
        </aside>

        <div className="mt-6">
          <WhatsAppShare title={name} url={shareUrl} locale={locale} />
        </div>

        {org && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_program_org_heading")}
            </h2>
            <Link
              to={`/${locale}/orgs/${org.slug}`}
              className="mt-4 block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
            >
              <span className="block font-medium text-earth-900">{org.name}</span>
              <span className="mt-1 block text-ink-600">{org.shortDescription}</span>
            </Link>
          </section>
        )}

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

        {cityNames.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_program_cities_heading")}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {cityNames.map((city) => (
                <li key={city.slug}>
                  <Link
                    to={`/${locale}/cities/${city.slug}`}
                    className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                  >
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {siblings.length > 0 && (
          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_program_siblings_heading", {
                track: trackName,
              })}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {siblings.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${locale}${bootcampPath(s.slug)}`}
                    className="block rounded-lg border border-earth-200 bg-card p-4 text-sm transition hover:border-earth-400 hover:shadow-sm"
                  >
                    <span className="block font-medium text-earth-900">{s.name}</span>
                    <span className="mt-1 block text-ink-600">{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {entry.canonicalProgramSlug && (
          <section className="mt-10">
            <p className="text-sm text-ink-600">
              {t(locale, "careers_program_canonical_hint")}{" "}
              <Link
                to={`/${locale}/programs/${entry.canonicalProgramSlug}`}
                className="text-earth-800 underline hover:no-underline"
              >
                {t(locale, "careers_program_canonical_link")}
              </Link>
            </p>
          </section>
        )}

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${trackPath(track.slug)}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "careers_program_back_to_track", { track: trackName })}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
