// /:lang/careers/stories — Success-stories landing (RIN-475 / RIN-469).
// Renders the 10 anonymized profiles as cards filterable by track.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.careers.stories._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  ALL_CAREER_TRACKS,
  CAREER_TRACK_TO_TAG,
  glyphForCareerTrack,
} from "~/lib/careers/categories";
import { CAREER_TRACKS } from "~/lib/careers/careers.server";
import { storyPath, trackPath } from "~/lib/careers/links";
import { breadcrumbJsonLd } from "~/lib/careers/schema";
import { STORIES } from "~/lib/careers/stories.server";
import { CITIES, cityName } from "~/lib/cities/registry";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const stories = STORIES.map((s) => {
    const city = CITIES.find((c) => c.slug === s.citySlug);
    const track = CAREER_TRACKS.find((t) => t.slug === s.trackSlug);
    return {
      slug: s.slug,
      nickname: s.nickname[locale] ?? s.nickname.he,
      currentRole: s.currentRole[locale] ?? s.currentRole.he,
      summary: s.summary[locale] ?? s.summary.he,
      trackSlug: s.trackSlug,
      trackName: track ? (track.name[locale] ?? track.name.he) : s.trackSlug,
      cityName: city ? cityName(city, locale) : s.citySlug,
    };
  });
  const tracks = CAREER_TRACKS.map((t) => ({
    slug: t.slug,
    name: t.name[locale] ?? t.name.he,
  }));
  const { PUBLIC_URL } = getEnv();
  return { locale, stories, tracks, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "careers_stories_landing_title");
  const description = t(locale, "careers_stories_landing_subtitle");
  const url = `${publicUrl}/${locale}/careers/stories`;

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    { name: title, path: "/careers/stories" },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { "script:ld+json": breadcrumb },
  ];
};

export default function StoriesLanding({ loaderData }: Route.ComponentProps) {
  const { locale, stories, tracks } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const trackFilter = searchParams.get("track") ?? "";

  const filtered = trackFilter
    ? stories.filter((s) => s.trackSlug === trackFilter)
    : stories;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "careers_stories_landing_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "careers_stories_landing_subtitle")}
          </p>
        </header>

        <section
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label={t(locale, "careers_filter_label")}
        >
          <button
            type="button"
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              params.delete("track");
              setSearchParams(params, { replace: true });
            }}
            className={`rounded-full px-3 py-1 text-sm transition ${
              !trackFilter
                ? "bg-earth-800 text-white"
                : "bg-earth-100 text-earth-900 hover:bg-earth-200"
            }`}
          >
            {t(locale, "careers_filter_all")}
          </button>
          {tracks.map((tr) => {
            // ALL_CAREER_TRACKS guards CAREER_TRACK_TO_TAG indexing without
            // a non-null assertion at runtime.
            if (!ALL_CAREER_TRACKS.includes(tr.slug)) return null;
            const tag = CAREER_TRACK_TO_TAG[tr.slug];
            const isActive = trackFilter === tr.slug;
            return (
              <button
                key={tr.slug}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("track", tr.slug);
                  setSearchParams(params, { replace: true });
                }}
                className={
                  isActive
                    ? "inline-flex items-center gap-1.5 rounded-full bg-earth-800 px-3 py-1 text-sm text-white"
                    : `${tagChipClasses(tag)} cursor-pointer px-3 py-1 text-sm`
                }
              >
                <span aria-hidden="true">{glyphForCareerTrack(tr.slug)}</span>
                {tr.name}
              </button>
            );
          })}
        </section>

        {filtered.length === 0 ? (
          <p className="text-center text-base text-ink-600">
            {t(locale, "careers_stories_empty_state")}
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filtered.map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/${locale}${storyPath(s.slug)}`}
                  className="block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                >
                  <p className="font-display text-base font-semibold text-earth-900">
                    {s.nickname} · {s.currentRole}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-700">{s.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Link
                      to={`/${locale}${trackPath(s.trackSlug)}`}
                      className="inline-flex items-center rounded-full border border-earth-200 bg-earth-50 px-2.5 py-0.5 text-xs text-earth-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {s.trackName}
                    </Link>
                    <span className="text-xs text-ink-600">{s.cityName}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}

        <p className="mt-10 text-xs text-ink-600">
          {t(locale, "careers_stories_disclaimer")}
        </p>

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "careers_track_back_to_hub")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
