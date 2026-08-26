// /:lang/compare — Comparison-pages landing (RIN-421 / SEO Wave 3a).
// Lists all 10 X-vs-Y comparison pages with search + 6-category filter.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.compare._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  ALL_COMPARISON_CATEGORIES,
  COMPARISON_CATEGORY_TO_TAG,
  glyphForComparisonCategory,
  type ComparisonCategory,
} from "~/lib/comparisons/categories";
import { listComparisons } from "~/lib/db/queries/comparisons.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { SearchField, useSearchQuery } from "~/components/ui/search-field";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const entries = listComparisons(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, entries, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  return [
    { title: `${t(locale, "comparisons_landing_title")} — Tedros` },
    { name: "description", content: t(locale, "comparisons_landing_subtitle") },
    ...hreflangMeta(publicUrl, locale, "/compare"),
    { property: "og:title", content: t(locale, "comparisons_landing_title") },
    { property: "og:description", content: t(locale, "comparisons_landing_subtitle") },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function ComparisonsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, entries } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [qInput, setQInput] = useSearchQuery();
  const q = qInput.toLowerCase();

  const filtered = entries.filter((e) => {
    if (category && e.category !== category) return false;
    if (q && !`${e.title} ${e.shortDescription}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/compare`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-red/5 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1734865934450-719ef6f59a37?fm=webp&q=70&w=1200&fit=crop"
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
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-red/15 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "comparisons_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "comparisons_landing_subtitle")}
          </p>
          <p className="relative mt-3 text-sm text-ink-600">
            {entries.length} {t(locale, "comparisons_count_label")}
          </p>
        </header>

        <section className="mb-8 space-y-4">
          <SearchField
            locale={locale}
            value={qInput}
            onChange={setQInput}
            placeholder={t(locale, "comparisons_search_placeholder")}
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t(locale, "comparisons_filter_label")}
          >
            <button
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("category");
                setSearchParams(params, { replace: true });
              }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !category
                  ? "bg-earth-800 text-white"
                  : "bg-earth-100 text-earth-900 hover:bg-earth-200"
              }`}
            >
              {t(locale, "comparisons_filter_all")}
            </button>
            {ALL_COMPARISON_CATEGORIES.map((cat: ComparisonCategory) => {
              const isActive = category === cat;
              const tag = COMPARISON_CATEGORY_TO_TAG[cat];
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("category", cat);
                    setSearchParams(params, { replace: true });
                  }}
                  className={
                    isActive
                      ? "inline-flex items-center gap-1.5 rounded-full bg-earth-800 px-3 py-1 text-sm text-white transition"
                      : `${tagChipClasses(tag)} cursor-pointer px-3 py-1 text-sm`
                  }
                >
                  <span aria-hidden="true">{glyphForComparisonCategory(cat)}</span>
                  {t(locale, `comparison_category_${cat}`)}
                </button>
              );
            })}
          </div>
        </section>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          aria-label={t(locale, "comparisons_landing_title")}
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-base text-ink-600">
              {t(locale, "comparisons_empty_state")}
            </p>
          ) : (
            filtered.map((e) => {
              const tag = COMPARISON_CATEGORY_TO_TAG[e.category];
              const tone = classesForTag(tag);
              return (
                <Link
                  key={e.slug}
                  to={`/${locale}/compare/${e.slug}`}
                  className={`group relative block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {e.title}
                    </h3>
                    <span aria-hidden="true" className="text-xl leading-none">
                      {glyphForComparisonCategory(e.category)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {e.shortDescription}
                  </p>
                  <div className="mt-3">
                    <span className={tagChipClasses(tag)}>
                      {t(locale, `comparison_category_${e.category}`)}
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
