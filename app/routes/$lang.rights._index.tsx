// /:lang/rights — Rights Hub landing (RIN-337 / part of RIN-328).
// Lists all priority rights with search + tag filter. SEO-optimized as the
// entry point for the Phase 3 Rights pillar.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.rights._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { listRights } from "~/lib/db/queries/rights.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { classesForTag, glyphForTag, tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const rights = listRights(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, rights, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "";
  return [
    { title: t(locale, "rights_landing_title") },
    { name: "description", content: t(locale, "rights_landing_subtitle") },
    ...hreflangMeta(publicUrl, locale, "/rights"),
    { property: "og:title", content: t(locale, "rights_landing_title") },
    { property: "og:description", content: t(locale, "rights_landing_subtitle") },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: `${publicUrl}/${locale}/rights` },
  ];
};

export default function RightsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, rights } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const tag = searchParams.get("tag") ?? "";
  const q = searchParams.get("q")?.toLowerCase() ?? "";

  // Build the unique tag list from the seed (stable order: alphabetical).
  const allTags = Array.from(new Set(rights.flatMap((r) => r.tags))).sort();

  const filtered = rights.filter((r) => {
    if (tag && !r.tags.includes(tag)) return false;
    if (q && !`${r.title} ${r.summary}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/rights`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        {/* Hero with subtle earth + flag-color radial accent */}
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src="https://images.unsplash.com/photo-1662894312546-667d7698a1f7?fm=webp&q=70&w=1200&fit=crop"
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
            {t(locale, "rights_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "rights_landing_subtitle")}
          </p>
        </header>

        {/* Search + tag filter */}
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
            placeholder={t(locale, "rights_search_placeholder")}
            className="w-full max-w-md rounded-md border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
            aria-label={t(locale, "rights_search_placeholder")}
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t(locale, "rights_filter_label")}
          >
            <button
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("tag");
                setSearchParams(params, { replace: true });
              }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !tag
                  ? "bg-earth-800 text-white"
                  : "bg-earth-100 text-earth-900 hover:bg-earth-200"
              }`}
            >
              {t(locale, "rights_filter_all")}
            </button>
            {allTags.map((tg) => {
              const isActive = tag === tg;
              return (
                <button
                  key={tg}
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    params.set("tag", tg);
                    setSearchParams(params, { replace: true });
                  }}
                  className={
                    isActive
                      ? "inline-flex items-center gap-1.5 rounded-full bg-earth-800 px-3 py-1 text-sm text-white transition"
                      : `${tagChipClasses(tg)} cursor-pointer px-3 py-1 text-sm`
                  }
                >
                  <span aria-hidden="true">{glyphForTag(tg)}</span>
                  {t(locale, `rights_tag_${tg}`)}
                </button>
              );
            })}
          </div>
        </section>

        {/* Rights grid */}
        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={t(locale, "rights_landing_title")}
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-base text-ink-600">
              {t(locale, "rights_empty_state")}
            </p>
          ) : (
            filtered.map((r) => {
              const primaryTag = r.tags[0] ?? "housing";
              const tone = classesForTag(primaryTag);
              return (
                <Link
                  key={r.slug}
                  to={`/${locale}/rights/${r.slug}`}
                  className={`group relative block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                >
                  {/* Top accent stripe in the primary-tag tone */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {r.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none"
                      title={t(locale, `rights_tag_${primaryTag}`)}
                    >
                      {glyphForTag(primaryTag)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{r.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {r.tags.slice(0, 3).map((tg) => (
                      <span key={tg} className={tagChipClasses(tg)}>
                        {t(locale, `rights_tag_${tg}`)}
                      </span>
                    ))}
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
