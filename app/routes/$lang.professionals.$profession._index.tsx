// /:lang/professionals/:profession — by-profession listing (RIN-444 / Wave 2b).
// Renders all directory slots for a single profession (e.g. "lawyer" → all
// lawyer slots across cities). 8 such pages per locale.

import { Link, data, useSearchParams } from "react-router";
// `useSearchParams` returns a tuple [params, setParams]; we only read.

import type { Route } from "./+types/$lang.professionals.$profession._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { findCityBySlug, cityName } from "~/lib/cities/registry";
import { listByProfession } from "~/lib/db/queries/professionals.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import {
  PROFESSION_TO_TAG,
  glyphForProfession,
  isProfession,
  professionMessageKey,
} from "~/lib/professionals/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.profession || !isProfession(params.profession)) {
    throw data({ error: "unknown-profession" }, { status: 404 });
  }
  const profession = params.profession;
  const slots = listByProfession(profession, locale);
  return { locale, profession, slots };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, profession, slots } = data;
  const title = t(locale, professionMessageKey(profession));
  const description = `${title} — ${t(locale, "professionals_landing_subtitle").replace(/\*\*/g, "")}`;
  return [
    { title: `${title} — ${t(locale, "professionals_landing_title")} — Tedros` },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: title,
        numberOfItems: slots.length,
        itemListElement: slots.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: s.title,
          url: `/${locale}/professionals/profile/${s.slug}`,
        })),
      },
    },
  ];
};

export default function ProfessionListing({ loaderData }: Route.ComponentProps) {
  const { locale, profession, slots } = loaderData;
  const [searchParams] = useSearchParams();
  const tag = PROFESSION_TO_TAG[profession];
  const tone = classesForTag(tag);
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const filtered = q
    ? slots.filter((s) => `${s.title} ${s.shortDescription}`.toLowerCase().includes(q))
    : slots;

  // Distinct cities served by this profession (for the "by city" sub-filter).
  const cityOptions = Array.from(new Set(slots.map((s) => s.citySlug)))
    .map((slug) => findCityBySlug(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .sort((a, b) => cityName(a, locale).localeCompare(cityName(b, locale), locale));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/professionals`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header
          className={`relative mb-10 isolate overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
          <span
            aria-hidden="true"
            className={`absolute inset-s-0 inset-e-0 top-0 h-1.5 ${tone.accentBg}`}
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/professionals`} className="hover:underline">
              {t(locale, "professionals_breadcrumb")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForProfession(profession)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {t(locale, professionMessageKey(profession))}
              </h1>
              <p className="mt-3 text-base text-ink-700">
                {slots.length} {t(locale, "professionals_count_label")}
              </p>
            </div>
          </div>
        </header>

        {/* Cities sub-grid — direct links to programmatic profession × city. */}
        {cityOptions.length > 1 && (
          <section className="mb-10">
            <h2 className="text-sm font-semibold text-earth-900">
              {t(locale, "professionals_city_label")}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {cityOptions.map((c) => (
                <Link
                  key={c.slug}
                  to={`/${locale}/professionals/${profession}/${c.slug}`}
                  className={`${tagChipClasses(tag)} px-3 py-1 text-sm`}
                >
                  📍 {cityName(c, locale)}
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-base text-ink-600">
              {t(locale, "professionals_empty_state")}
            </p>
          ) : (
            filtered.map((s) => {
              const city = findCityBySlug(s.citySlug);
              return (
                <Link
                  key={s.slug}
                  to={`/${locale}/professionals/profile/${s.slug}`}
                  className={`group block overflow-hidden rounded-lg border bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow-md ${tone.border} hover:border-earth-400`}
                >
                  <h3 className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {s.shortDescription}
                  </p>
                  {city && (
                    <p className="mt-3 text-xs text-ink-600">
                      📍 {cityName(city, locale)}
                    </p>
                  )}
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
