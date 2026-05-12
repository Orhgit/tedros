// /:lang/programs — Programs landing (RIN-424 / SEO Wave 3b).
// Lists all 24 programs with track filter (6 tracks: education/career/health/
// community/legal/funding).

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.programs._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { listOrgs } from "~/lib/db/queries/orgs.server";
import { listPrograms } from "~/lib/db/queries/programs.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import {
  ALL_PROGRAM_TRACKS,
  PROGRAM_TRACK_TO_TAG,
  glyphForProgramTrack,
} from "~/lib/programs/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const programs = listPrograms(locale);
  // Pre-resolve org names for the cards.
  const orgsById: Record<string, string> = {};
  for (const o of listOrgs(locale)) orgsById[o.slug] = o.name;
  return { locale, programs, orgsById };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  return [
    { title: `${t(locale, "programs_landing_title")} — Tedros` },
    { name: "description", content: t(locale, "programs_landing_subtitle") },
    { property: "og:title", content: t(locale, "programs_landing_title") },
    { property: "og:description", content: t(locale, "programs_landing_subtitle") },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function ProgramsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, programs, orgsById } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const track = searchParams.get("track") ?? "";
  const q = searchParams.get("q")?.toLowerCase() ?? "";

  const filtered = programs.filter((p) => {
    if (track && p.track !== track) return false;
    if (q && !`${p.title} ${p.shortDescription}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/programs`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-green/5 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1764145177622-8317fbfe1877?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
            loading="lazy"
            decoding="async"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-green/15 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "programs_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "programs_landing_subtitle")}
          </p>
          <p className="relative mt-3 text-sm text-ink-600">
            {programs.length} {t(locale, "programs_count_label")}
          </p>
        </header>

        <section className="mb-8 space-y-4">
          <input
            type="search"
            value={q}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams);
              if (e.target.value) params.set("q", e.target.value);
              else params.delete("q");
              setSearchParams(params, { replace: true });
            }}
            placeholder={t(locale, "programs_search_placeholder")}
            className="w-full max-w-md rounded-md border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
            aria-label={t(locale, "programs_search_placeholder")}
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t(locale, "programs_filter_label")}
          >
            <button
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("track");
                setSearchParams(params, { replace: true });
              }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !track
                  ? "bg-earth-800 text-white"
                  : "bg-earth-100 text-earth-900 hover:bg-earth-200"
              }`}
            >
              {t(locale, "programs_filter_all")}
            </button>
            {ALL_PROGRAM_TRACKS.map((trk) => {
              const isActive = track === trk;
              const tag = PROGRAM_TRACK_TO_TAG[trk];
              return (
                <button
                  key={trk}
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("track", trk);
                    setSearchParams(params, { replace: true });
                  }}
                  className={
                    isActive
                      ? "inline-flex items-center gap-1.5 rounded-full bg-earth-800 px-3 py-1 text-sm text-white transition"
                      : `${tagChipClasses(tag)} cursor-pointer px-3 py-1 text-sm`
                  }
                >
                  <span aria-hidden="true">{glyphForProgramTrack(trk)}</span>
                  {t(locale, `program_track_${trk}`)}
                </button>
              );
            })}
          </div>
        </section>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={t(locale, "programs_landing_title")}
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-base text-ink-600">
              {t(locale, "programs_empty_state")}
            </p>
          ) : (
            filtered.map((p) => {
              const tag = PROGRAM_TRACK_TO_TAG[p.track];
              const tone = classesForTag(tag);
              return (
                <Link
                  key={p.slug}
                  to={`/${locale}/programs/${p.slug}`}
                  className={`group relative block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {p.title}
                    </h3>
                    <span aria-hidden="true" className="text-xl leading-none">
                      {glyphForProgramTrack(p.track)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {p.shortDescription}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className={tagChipClasses(tag)}>
                      {t(locale, `program_track_${p.track}`)}
                    </span>
                    {orgsById[p.orgSlug] && (
                      <span className="text-xs text-ink-600">{orgsById[p.orgSlug]}</span>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
