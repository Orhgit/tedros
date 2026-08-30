// /:lang/professionals — Professionals directory landing (RIN-444 / Wave 2b).
// Lists all "professional slots" with search + 8-profession filter.
// Anonymous-slot pattern — see professionals.server.ts for full design notes.

import { Link, useSearchParams } from "react-router";

import type { Route } from "./+types/$lang.professionals._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { findCityBySlug, cityName } from "~/lib/cities/registry";
import { listProfessionals } from "~/lib/db/queries/professionals.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { SearchField, useSearchQuery } from "~/components/ui/search-field";
import { AmharicBadge } from "~/components/ui/amharic-badge";
import {
  ALL_PROFESSIONS,
  AMHARIC_LANG,
  PROFESSION_TO_TAG,
  glyphForProfession,
  professionMessageKey,
  speaksAmharic,
} from "~/lib/professionals/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const slots = listProfessionals(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, slots, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "http://localhost:3000";
  return [
    { title: `${t(locale, "professionals_landing_title")} — Tedros` },
    { name: "description", content: t(locale, "professionals_landing_subtitle") },
    ...hreflangMeta(publicUrl, locale, "/professionals"),
    { property: "og:title", content: t(locale, "professionals_landing_title") },
    { property: "og:description", content: t(locale, "professionals_landing_subtitle") },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
  ];
};

export default function ProfessionalsLanding({ loaderData }: Route.ComponentProps) {
  const { locale, slots } = loaderData;
  const [searchParams, setSearchParams] = useSearchParams();
  const profession = searchParams.get("profession") ?? "";
  // ?language=am — Amharic-speaker filter (TED-136).
  const language = searchParams.get("language") ?? "";
  const [qInput, setQInput] = useSearchQuery();
  const q = qInput.toLowerCase();

  const filtered = slots.filter((s) => {
    if (profession && s.profession !== profession) return false;
    if (language && !s.languages.includes(language)) return false;
    if (q && !`${s.title} ${s.shortDescription}`.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/professionals`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-yellow/5 px-6 py-8 sm:px-10 sm:py-12">
          {/* Neutral professional hero (TED-129) — the directory covers all
              professions, so no medical imagery here. */}
          <img
            src="https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-yellow/15 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "professionals_landing_title")}
          </h1>
          <p
            className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700"
            dangerouslySetInnerHTML={{
              __html: t(locale, "professionals_landing_subtitle").replace(
                /\*\*(.+?)\*\*/g,
                "<strong>$1</strong>",
              ),
            }}
          />
          <p className="relative mt-3 text-sm text-ink-600">
            {slots.length} {t(locale, "professionals_count_label")}
          </p>
        </header>

        <section className="mb-8 space-y-4">
          <SearchField
            locale={locale}
            value={qInput}
            onChange={setQInput}
            placeholder={t(locale, "professionals_search_placeholder")}
          />
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label={t(locale, "professionals_filter_label")}
          >
            <button
              type="button"
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.delete("profession");
                setSearchParams(params, { replace: true });
              }}
              className={`rounded-full px-3 py-1 text-sm transition ${
                !profession
                  ? "bg-earth-800 text-white"
                  : "bg-earth-100 text-earth-900 hover:bg-earth-200"
              }`}
            >
              {t(locale, "professionals_filter_all")}
            </button>
            {ALL_PROFESSIONS.map((prof) => {
              const isActive = profession === prof;
              const tag = PROFESSION_TO_TAG[prof];
              return (
                <Link
                  key={prof}
                  to={`/${locale}/professionals/${prof}`}
                  className={
                    isActive
                      ? "inline-flex items-center gap-1.5 rounded-full bg-earth-800 px-3 py-1 text-sm text-white transition"
                      : `${tagChipClasses(tag)} cursor-pointer px-3 py-1 text-sm`
                  }
                >
                  <span aria-hidden="true">{glyphForProfession(prof)}</span>
                  {t(locale, professionMessageKey(prof))}
                </Link>
              );
            })}
            {/* Amharic-speaker toggle (TED-136) — query-param filter like the
                profession chips, so it composes with them. */}
            <button
              type="button"
              aria-pressed={language === AMHARIC_LANG}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                if (language === AMHARIC_LANG) params.delete("language");
                else params.set("language", AMHARIC_LANG);
                setSearchParams(params, { replace: true });
              }}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm transition ${
                language === AMHARIC_LANG
                  ? "bg-earth-800 text-white"
                  : "bg-accent-yellow/20 text-earth-900 hover:bg-accent-yellow/35"
              }`}
            >
              <span aria-hidden="true">🗣️</span>
              {t(locale, "professionals_filter_amharic")}
            </button>
          </div>
          <p className="text-sm">
            <Link
              to={`/${locale}/professionals/amharic`}
              className="font-medium text-earth-700 hover:underline"
            >
              {t(locale, "professionals_amharic_landing_link")}
            </Link>
          </p>
        </section>

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          aria-label={t(locale, "professionals_landing_title")}
        >
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-base text-ink-600">
              {t(locale, "professionals_empty_state")}
            </p>
          ) : (
            filtered.map((s) => {
              const tag = PROFESSION_TO_TAG[s.profession];
              const tone = classesForTag(tag);
              const city = findCityBySlug(s.citySlug);
              return (
                <Link
                  key={s.slug}
                  to={`/${locale}/professionals/profile/${s.slug}`}
                  className={`group relative block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-s-0 inset-e-0 top-0 h-1 ${tone.accentBg}`}
                  />
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {s.title}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="text-xl leading-none"
                      title={t(locale, professionMessageKey(s.profession))}
                    >
                      {glyphForProfession(s.profession)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {s.shortDescription}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <span className={tagChipClasses(tag)}>
                      {t(locale, professionMessageKey(s.profession))}
                    </span>
                    {speaksAmharic(s.languages) && <AmharicBadge locale={locale} />}
                    {city && (
                      <span className="text-xs text-ink-600">
                        📍 {cityName(city, locale)}
                      </span>
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
