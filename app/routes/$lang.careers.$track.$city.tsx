// /:lang/careers/:track/:city — Programmatic SEO cell (RIN-473 / RIN-469).
//
// One page per (track × city) where the pair is relevant via
// `isRelevant` from `lib/careers/relevance.ts`. The cell stitches together
// content already authored in other verticals — bootcamps active in the
// city, professionals practicing the track-relevant profession in the
// city, employment-related rights cells, and the parent org list — so the
// cell carries meaningfully unique content per (track × city) without
// re-authoring per-cell prose.
//
// Anti-thin-content protection: relevance filtering only ships pairs we
// believe have substance; if a cell still ends up with zero bootcamps,
// professionals, AND rights cells, the loader emits a noindex + canonical
// → track-page hint via the `thinFallback` flag.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.careers.$track.$city";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { bootcampsForCity, bootcampsForTrack } from "~/lib/careers/bootcamps.server";
import {
  CAREER_TRACK_TO_TAG,
  glyphForCareerTrack,
  isCareerTrack,
} from "~/lib/careers/categories";
import { CAREER_TRACKS, findCareerTrack } from "~/lib/careers/careers.server";
import { bootcampPath, trackCityPath, trackPath } from "~/lib/careers/links";
import { isRelevant as isCareerRelevant, relevantCities } from "~/lib/careers/relevance";
import { breadcrumbJsonLd } from "~/lib/careers/schema";
import { CITIES, cityName, cityOverview, findCityBySlug } from "~/lib/cities/registry";
import { getOrgEntry } from "~/lib/db/queries/orgs.server";
import {
  type ProfessionalSummary,
  listByProfessionAndCity,
} from "~/lib/db/queries/professionals.server";
import { getRightBySlug } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { isProfession } from "~/lib/professionals/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";
import { isRelevant as isRightRelevant } from "~/lib/rights/relevance";

// Hebrew/English/Amharic preposition that prefixes the city name.
function prepFor(locale: Locale): string {
  return locale === "en" ? "in " : locale === "am" ? "በ" : "ב";
}

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const trackParam = params.track;
  const cityParam = params.city;
  if (!trackParam || !cityParam || !isCareerTrack(trackParam)) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  const track = findCareerTrack(trackParam);
  const city = findCityBySlug(cityParam);
  if (!track || !city) {
    throw data({ error: "not-found" }, { status: 404 });
  }
  // Relevance gate — we never ship a thin (track, city) pair.
  if (!isCareerRelevant(track.slug, city.slug)) {
    throw data({ error: "not-relevant" }, { status: 404 });
  }

  // Bootcamps that *both* lead into this track and have a campus in this city.
  // Falls back to "any bootcamp in this city" if the strict intersection is
  // empty — the looser set is still relevant context for the cell.
  const inCity = bootcampsForCity(city.slug);
  const inTrack = new Set(bootcampsForTrack(track.slug).map((b) => b.slug));
  const cellBootcamps = (
    inCity.filter((b) => inTrack.has(b.slug)).length > 0
      ? inCity.filter((b) => inTrack.has(b.slug))
      : inCity
  )
    .slice(0, 4)
    .map((b) => ({
      slug: b.slug,
      name: b.name[locale] ?? b.name.he,
      summary: b.shortDescription[locale] ?? b.shortDescription.he,
      programType: b.programType,
    }));

  // Professionals — for each profession the track surfaces, list non-empty
  // (profession × city) pairs that exist in the directory.
  const cellProfessionals: Array<{
    profession: string;
    items: ProfessionalSummary[];
  }> = [];
  for (const prof of track.relatedProfessions) {
    if (!isProfession(prof)) continue;
    const items = listByProfessionAndCity(prof, city.slug, locale);
    if (items.length > 0) {
      cellProfessionals.push({ profession: prof, items: items.slice(0, 3) });
    }
  }

  // Right × city cells — link to existing /rights/$right/$city pages for
  // employment-related rights when the right is itself relevant to this
  // city per `lib/rights/relevance.ts` (RIN-339).
  const cellRights = track.relatedRights
    .filter((rightSlug) => isRightRelevant(rightSlug, city.slug))
    .map((rightSlug) => getRightBySlug(rightSlug, locale))
    .filter((r): r is NonNullable<typeof r> => r !== null)
    .map((r) => ({ slug: r.slug, title: r.title, summary: r.summary }))
    .slice(0, 4);

  // Orgs — track-level org list (no city filtering — most orgs operate
  // nationally, and the org profile page surfaces city presence itself).
  const cellOrgs = track.relatedOrgs
    .map((orgSlug) => getOrgEntry(orgSlug, locale))
    .filter((o): o is NonNullable<typeof o> => o !== null)
    .map((o) => ({
      slug: o.slug,
      name: o.name,
      shortDescription: o.shortDescription,
    }))
    .slice(0, 3);

  // Cross-links: same track in other cities + other tracks in this city.
  const otherCitiesForTrack = relevantCities(track.slug, CITIES)
    .filter((c) => c.slug !== city.slug)
    .slice(0, 6)
    .map((c) => ({ slug: c.slug, name: cityName(c, locale) }));

  const otherTracksInCity = CAREER_TRACKS.filter(
    (t) => t.slug !== track.slug && isCareerRelevant(t.slug, city.slug),
  )
    .slice(0, 6)
    .map((tr) => ({
      slug: tr.slug,
      name: tr.name[locale] ?? tr.name.he,
    }));

  // Anti-thin-content guard — set when zero substantive sections rendered.
  const thinFallback =
    cellBootcamps.length === 0 &&
    cellProfessionals.length === 0 &&
    cellRights.length === 0;

  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}${trackCityPath(track.slug, city.slug)}`;
  const cityNameLocal = cityName(city, locale);
  const cityOverviewLocal = cityOverview(city, locale);

  return {
    locale,
    track,
    city,
    cityNameLocal,
    cityOverviewLocal,
    cellBootcamps,
    cellProfessionals,
    cellRights,
    cellOrgs,
    otherCitiesForTrack,
    otherTracksInCity,
    thinFallback,
    shareUrl,
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, track, city, cityNameLocal, thinFallback, publicUrl } = data;
  const trackName = track.name[locale] ?? track.name.he;
  const prep = prepFor(locale);
  const title = `${trackName} ${prep}${cityNameLocal} — Tedros`;
  // Description is intentionally city-aware so each cell has a unique meta
  // description; "{track} עבור הקהילה ב-{city}" pattern.
  const description =
    locale === "en"
      ? `${trackName} pathways for the Ethiopian-Israeli community in ${cityNameLocal} — bootcamps, counselors, employment rights.`
      : locale === "am"
        ? `${trackName} ለኢትዮጵያ-እስራኤል ማህበረሰብ በ${cityNameLocal} — ቡት ካምፖች፣ አማካሪዎች፣ መብቶች።`
        : `${trackName} לקהילת יוצאי אתיופיה ב-${cityNameLocal} — bootcamps, יועצים, זכויות תעסוקה.`;

  // Anti-thin-content: when the loader flags the cell as thin, set noindex
  // and canonical the request URL back to the parent track page.
  const cellUrl = `${publicUrl}/${locale}${trackCityPath(track.slug, city.slug)}`;
  const canonicalUrl = thinFallback
    ? `${publicUrl}/${locale}${trackPath(track.slug)}`
    : cellUrl;

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": cellUrl,
    name: cityNameLocal,
    geo: {
      "@type": "GeoCoordinates",
      latitude: city.geo.lat,
      longitude: city.geo.lon,
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${trackName} ${prep}${cityNameLocal}`,
    description,
    areaServed: {
      "@type": "City",
      name: cityNameLocal,
    },
    serviceType: trackName,
    provider: {
      "@type": "Organization",
      name: "Tedros",
      url: publicUrl,
    },
  };

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: trackName, path: trackPath(track.slug) },
    { name: cityNameLocal, path: trackCityPath(track.slug, city.slug) },
  ]);

  return [
    { title },
    { name: "description", content: description },
    ...(thinFallback ? [{ name: "robots", content: "noindex,follow" }] : []),
    ...(thinFallback
      ? [{ tagName: "link" as const, rel: "canonical", href: canonicalUrl }]
      : hreflangMeta(publicUrl, locale, trackCityPath(track.slug, city.slug))),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": placeJsonLd },
    { "script:ld+json": serviceJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function CareerCityCell({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    track,
    city,
    cityNameLocal,
    cityOverviewLocal,
    cellBootcamps,
    cellProfessionals,
    cellRights,
    cellOrgs,
    otherCitiesForTrack,
    otherTracksInCity,
    shareUrl,
  } = loaderData;
  const trackName = track.name[locale] ?? track.name.he;
  const tag = CAREER_TRACK_TO_TAG[track.slug];
  const tone = classesForTag(tag);
  const prep = prepFor(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header
          className={`relative isolate mb-6 overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
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
                {trackName}{" "}
                <span className="text-earth-700">
                  {prep}
                  {cityNameLocal}
                </span>
              </h1>
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
          </div>
        </header>

        {/* City context overlay — provides per-cell unique content and
            defends against thin-content. */}
        <section className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="text-sm font-semibold tracking-wide text-earth-900 uppercase">
            {t(locale, "rights_city_context_heading")} {cityNameLocal}
          </h2>
          <p className="mt-2 text-base leading-relaxed text-ink-700">
            {cityOverviewLocal}
          </p>
          {city.communityStats && city.communityStats.length > 0 && (
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {city.communityStats.map((s, i) => (
                <div
                  key={i}
                  className="rounded-md border border-earth-100 bg-white px-3 py-2"
                >
                  <dt className="text-xs font-medium text-earth-600">
                    {s.label[locale] ?? s.label.he}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-earth-900">{s.value}</dd>
                </div>
              ))}
            </dl>
          )}
          <p className="mt-3 text-sm text-earth-700">
            <Link to={`/${locale}/cities/${city.slug}`} className="hover:underline">
              {t(locale, "rights_city_more_link")}
            </Link>
          </p>
        </section>

        {/* Bootcamps in city ----------------------------------------------- */}
        {cellBootcamps.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_cell_bootcamps_heading", {
                city: cityNameLocal,
              })}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cellBootcamps.map((b) => (
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

        {/* Professionals in city ------------------------------------------- */}
        {cellProfessionals.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_cell_professionals_heading", {
                city: cityNameLocal,
              })}
            </h2>
            <ul className="mt-4 space-y-4">
              {cellProfessionals.map((g) => (
                <li key={g.profession}>
                  <p className="text-sm font-medium text-earth-700">
                    <Link
                      to={`/${locale}/professionals/${g.profession}/${city.slug}`}
                      className="hover:underline"
                    >
                      {t(locale, `profession_${g.profession.replace(/-/g, "_")}`)} →
                    </Link>
                  </p>
                  <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {g.items.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to={`/${locale}/professionals/profile/${p.slug}`}
                          className="block rounded-md border border-earth-200 bg-card p-3 text-sm transition hover:border-earth-400 hover:shadow-sm"
                        >
                          <span className="block font-medium text-earth-900">
                            {p.title}
                          </span>
                          <span className="mt-1 block text-xs text-ink-600">
                            {p.shortDescription}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Rights × city cells -------------------------------------------- */}
        {cellRights.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_cell_rights_heading", {
                city: cityNameLocal,
              })}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {cellRights.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/${locale}/rights/${r.slug}/${city.slug}`}
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

        {/* Orgs ------------------------------------------------------------ */}
        {cellOrgs.length > 0 && (
          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold text-earth-900">
              {t(locale, "careers_cell_orgs_heading")}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {cellOrgs.map((o) => (
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

        <div className="mt-6">
          <WhatsAppShare
            title={`${trackName} ${prep}${cityNameLocal}`}
            url={shareUrl}
            locale={locale}
          />
        </div>

        {/* Cross-links: same track / other cities + other tracks / same city */}
        <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {otherCitiesForTrack.length > 0 && (
            <div>
              <h2 className="font-display text-base font-semibold text-earth-900">
                {t(locale, "careers_cell_other_cities", { track: trackName })}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otherCitiesForTrack.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to={`/${locale}${trackCityPath(track.slug, c.slug)}`}
                      className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {otherTracksInCity.length > 0 && (
            <div>
              <h2 className="font-display text-base font-semibold text-earth-900">
                {t(locale, "careers_cell_other_tracks", { city: cityNameLocal })}
              </h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {otherTracksInCity.map((tr) => (
                  <li key={tr.slug}>
                    <Link
                      to={`/${locale}${trackCityPath(tr.slug, city.slug)}`}
                      className="inline-flex items-center rounded-full border border-earth-200 bg-card px-3 py-1 text-sm text-earth-800 transition hover:border-earth-400 hover:bg-earth-50"
                    >
                      {tr.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${trackPath(track.slug)}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_track_back_to_hub")} {trackName}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
