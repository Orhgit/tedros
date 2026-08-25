// /:lang/education/tracks — Education tracks list (RIN-507 / Phase 5 Wave 2).
// Lists 3 study-path tracks with scholarship + program counts.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.education.tracks._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { listEducationTracks } from "~/lib/db/queries/education-tracks.server";
import { glyphForEducationTrack } from "~/lib/education/tracks";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const tracks = listEducationTracks(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, tracks, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  return [
    { title: `${t(locale, "tracks_landing_title")} — Tedros` },
    { name: "description", content: t(locale, "tracks_landing_subtitle") },
    ...hreflangMeta(publicUrl, locale, "/education/tracks"),
    { property: "og:title", content: t(locale, "tracks_landing_title") },
    { property: "og:description", content: t(locale, "tracks_landing_subtitle") },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function TracksLanding({ loaderData }: Route.ComponentProps) {
  const { locale, tracks } = loaderData;
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/education/tracks`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
            {" / "}
            <Link to={`/${locale}/education`} className="hover:underline">
              {t(locale, "education_pillar_title")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "tracks_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "tracks_landing_subtitle")}
          </p>
        </header>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          aria-label={t(locale, "tracks_landing_title")}
        >
          {tracks.map((track) => (
            <Link
              key={track.slug}
              to={`/${locale}/education/tracks/${track.slug}`}
              className="group relative block overflow-hidden rounded-lg border border-earth-200 bg-card p-6 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
            >
              <span aria-hidden="true" className="text-3xl">
                {glyphForEducationTrack(track.slug)}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-earth-900 group-hover:text-earth-700">
                {track.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">
                {track.shortDescription}
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink-600">
                <span>
                  <strong className="font-semibold text-earth-700">
                    {track.scholarshipCount}
                  </strong>{" "}
                  {t(locale, "scholarships_count_label")}
                </span>
                <span>
                  <strong className="font-semibold text-earth-700">
                    {track.programCount}
                  </strong>{" "}
                  {t(locale, "tracks_programs_count_label")}
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
