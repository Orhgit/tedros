// /:lang/education/scholarships — Scholarships list (RIN-504 / Phase 5 Wave 1).
// Lists all scholarships (count is dynamic, see SCHOLARSHIPS registry) with
// search + level filter.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.education.scholarships._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { listScholarships } from "~/lib/db/queries/scholarships.server";
import {
  SCHOLARSHIP_LEVELS,
  SCHOLARSHIP_LEVEL_TO_TAG,
  glyphForScholarshipLevel,
  type ScholarshipLevel,
} from "~/lib/education/categories";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { SearchField, useSearchQuery } from "~/components/ui/search-field";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const scholarships = listScholarships(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, scholarships, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  return [
    { title: `${t(locale, "scholarships_landing_title")} — Tedros` },
    { name: "description", content: t(locale, "scholarships_landing_subtitle") },
    ...hreflangMeta(publicUrl, locale, "/education/scholarships"),
    { property: "og:title", content: t(locale, "scholarships_landing_title") },
    { property: "og:description", content: t(locale, "scholarships_landing_subtitle") },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

function formatAmount(min: number, max: number, locale: Locale): string {
  if (min === 0 && max === 0) return t(locale, "scholarship_amount_free");
  if (min === max) return `₪${min.toLocaleString(locale)}`;
  return `₪${min.toLocaleString(locale)}–₪${max.toLocaleString(locale)}`;
}

export default function ScholarshipsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, scholarships } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const level = searchParams.get("level") as ScholarshipLevel | null;
  const [qInput, setQInput] = useSearchQuery();
  const q = qInput.toLowerCase();

  const filtered = scholarships.filter((s) => {
    if (level && s.level !== level) return false;
    if (q && !`${s.name} ${s.shortDescription}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/education/scholarships`} />
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
            {t(locale, "scholarships_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "scholarships_landing_subtitle")}
          </p>
          <p className="relative mt-3 text-sm text-ink-600">
            {scholarships.length} {t(locale, "scholarships_count_label")}
          </p>
        </header>

        <section className="mb-8 space-y-4">
          <SearchField
            locale={locale}
            value={qInput}
            onChange={setQInput}
            placeholder={t(locale, "scholarships_search_placeholder")}
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t(locale, "scholarships_filter_label")}
          >
            <button
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("level");
                setSearchParams(params, { replace: true });
              }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !level
                  ? "bg-earth-800 text-white"
                  : "bg-earth-100 text-earth-900 hover:bg-earth-200"
              }`}
            >
              {t(locale, "scholarships_filter_all")}
            </button>
            {SCHOLARSHIP_LEVELS.map((lv) => {
              const isActive = level === lv;
              const tag = SCHOLARSHIP_LEVEL_TO_TAG[lv];
              return (
                <button
                  key={lv}
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("level", lv);
                    setSearchParams(params, { replace: true });
                  }}
                  className={
                    isActive
                      ? "inline-flex items-center gap-1.5 rounded-full bg-earth-800 px-3 py-1 text-sm text-white transition"
                      : `${tagChipClasses(tag)} cursor-pointer px-3 py-1 text-sm`
                  }
                >
                  <span aria-hidden="true">{glyphForScholarshipLevel(lv)}</span>
                  {t(locale, `scholarship_level_${lv.replace(/-/g, "_")}`)}
                </button>
              );
            })}
          </div>
        </section>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={t(locale, "scholarships_landing_title")}
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-base text-ink-600">
              {t(locale, "scholarships_empty_state")}
            </p>
          ) : (
            filtered.map((s) => {
              const tag = SCHOLARSHIP_LEVEL_TO_TAG[s.level];
              const tone = classesForTag(tag);
              return (
                <Link
                  key={s.slug}
                  to={`/${locale}/education/scholarships/${s.slug}`}
                  className={`group relative block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {s.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none"
                      title={t(locale, `scholarship_level_${s.level.replace(/-/g, "_")}`)}
                    >
                      {glyphForScholarshipLevel(s.level)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {s.shortDescription}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className={tagChipClasses(tag)}>
                      {t(locale, `scholarship_level_${s.level.replace(/-/g, "_")}`)}
                    </span>
                    <span className="text-xs font-medium text-earth-700">
                      {formatAmount(s.amountMinIls, s.amountMaxIls, locale)}
                    </span>
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
