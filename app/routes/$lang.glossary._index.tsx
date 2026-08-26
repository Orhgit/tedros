// /:lang/glossary — Glossary landing (RIN-418 / part of RIN-417 SEO Wave 1).
// Lists all 12 glossary entries with search + category filter. SEO entry
// point for "what is X?" queries about the Ethiopian-Israeli community.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.glossary._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { listGlossary } from "~/lib/db/queries/glossary.server";
import {
  CATEGORY_TO_TAG,
  glyphForCategory,
  type GlossaryCategory,
} from "~/lib/glossary/categories";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { SearchField, useSearchQuery } from "~/components/ui/search-field";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

const ALL_CATEGORIES: GlossaryCategory[] = [
  "tradition",
  "history",
  "identity",
  "organization",
  "program",
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const entries = listGlossary(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, entries, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  return [
    { title: `${t(locale, "glossary_landing_title")} — Tedros` },
    { name: "description", content: t(locale, "glossary_landing_subtitle") },
    ...hreflangMeta(publicUrl, locale, "/glossary"),
    { property: "og:title", content: t(locale, "glossary_landing_title") },
    { property: "og:description", content: t(locale, "glossary_landing_subtitle") },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: t(locale, "glossary_landing_title"),
        description: t(locale, "glossary_landing_subtitle"),
        inLanguage: locale,
      },
    },
  ];
};

export default function GlossaryLanding({ loaderData }: Route.ComponentProps) {
  const { locale, entries } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const [qInput, setQInput] = useSearchQuery();
  const q = qInput.toLowerCase();

  const filtered = entries.filter((e) => {
    if (category && e.category !== category) return false;
    if (q && !`${e.term} ${e.summary}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/glossary`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-sigd/5 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=1200&fit=crop"
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
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-sigd/15 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-s-16 -bottom-16 size-56 rounded-full bg-accent-yellow/10 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "glossary_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "glossary_landing_subtitle")}
          </p>
          <p className="relative mt-3 text-sm text-ink-600">
            {entries.length} {t(locale, "glossary_term_count")}
          </p>
        </header>

        <section className="mb-8 space-y-4">
          <SearchField
            locale={locale}
            value={qInput}
            onChange={setQInput}
            placeholder={t(locale, "glossary_search_placeholder")}
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t(locale, "glossary_filter_label")}
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
              {t(locale, "glossary_filter_all")}
            </button>
            {ALL_CATEGORIES.map((cat) => {
              const isActive = category === cat;
              const tag = CATEGORY_TO_TAG[cat];
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
                  <span aria-hidden="true">{glyphForCategory(cat)}</span>
                  {t(locale, `glossary_category_${cat}`)}
                </button>
              );
            })}
          </div>
        </section>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={t(locale, "glossary_landing_title")}
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-base text-ink-600">
              {t(locale, "glossary_empty_state")}
            </p>
          ) : (
            filtered.map((e) => {
              const tag = CATEGORY_TO_TAG[e.category];
              const tone = classesForTag(tag);
              return (
                <Link
                  key={e.slug}
                  to={`/${locale}/glossary/${e.slug}`}
                  className={`group relative block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {e.term}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none"
                      title={t(locale, `glossary_category_${e.category}`)}
                    >
                      {glyphForCategory(e.category)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{e.summary}</p>
                  <div className="mt-3">
                    <span className={tagChipClasses(tag)}>
                      {t(locale, `glossary_category_${e.category}`)}
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
