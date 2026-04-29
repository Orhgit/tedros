// /:lang/rights — Rights Hub landing (RIN-337 / part of RIN-328).
// Lists all priority rights with search + tag filter. SEO-optimized as the
// entry point for the Phase 3 Rights pillar.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.rights._index";
import { listRights } from "~/lib/db/queries/rights.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const rights = listRights(locale);
  return { locale, rights };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  return [
    { title: t(locale, "rights_landing_title") },
    { name: "description", content: t(locale, "rights_landing_subtitle") },
    { property: "og:title", content: t(locale, "rights_landing_title") },
    { property: "og:description", content: t(locale, "rights_landing_subtitle") },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
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
      <div className="container-default mx-auto max-w-5xl py-10">
        <header className="mb-10">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "rights_landing_title")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
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
            {allTags.map((tg) => (
              <button
                key={tg}
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(searchParams);
                  params.set("tag", tg);
                  setSearchParams(params, { replace: true });
                }}
                className={`rounded-full px-3 py-1 text-sm transition ${
                  tag === tg
                    ? "bg-earth-800 text-white"
                    : "bg-earth-100 text-earth-900 hover:bg-earth-200"
                }`}
              >
                {t(locale, `rights_tag_${tg}`)}
              </button>
            ))}
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
            filtered.map((r) => (
              <Link
                key={r.slug}
                to={`/${locale}/rights/${r.slug}`}
                className="group block rounded-lg border border-border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-sm"
              >
                <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{r.summary}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {r.tags.slice(0, 3).map((tg) => (
                    <span
                      key={tg}
                      className="rounded-full bg-earth-100 px-2 py-0.5 text-[11px] text-earth-900"
                    >
                      {t(locale, `rights_tag_${tg}`)}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
