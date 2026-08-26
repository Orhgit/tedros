// /:lang/professionals/:profession/:city — programmatic SEO cell (RIN-444 / Wave 2b).
// Profession × city pages are the main SEO surface — captures queries like
// "עורך דין דובר אמהרית בנתניה". Filtered to slots that exist for this pair.

import { Link, data } from "react-router";

import type { Route } from "./+types/$lang.professionals.$profession.$city";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { findCityBySlug, cityName, cityOverview } from "~/lib/cities/registry";
import { listByProfessionAndCity } from "~/lib/db/queries/professionals.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import {
  PROFESSION_TO_TAG,
  glyphForProfession,
  heroImageForProfession,
  isProfession,
  professionMessageKey,
} from "~/lib/professionals/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

// Locale-specific HE/AM prefix attaches; EN uses a separator. Mirrors the
// approach in $lang.rights.$slug_.$city for a consistent reading experience.
function inCity(locale: Locale, city: string): string {
  if (locale === "he") return `ב${city}`;
  if (locale === "am") return `በ${city}`;
  return `in ${city}`;
}

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  if (!params.profession || !isProfession(params.profession)) {
    throw data({ error: "unknown-profession" }, { status: 404 });
  }
  if (!params.city) {
    throw data({ error: "missing-city" }, { status: 404 });
  }
  const city = findCityBySlug(params.city);
  if (!city) {
    throw data({ error: "unknown-city" }, { status: 404 });
  }
  const profession = params.profession;
  const slots = listByProfessionAndCity(profession, city.slug, locale);
  if (slots.length === 0) {
    // Empty pair — return 404 to keep the indexable surface honest. The
    // sitemap only enumerates non-empty pairs, but if Google guesses one we
    // want a clean 404 rather than a thin page.
    throw data({ error: "no-matches" }, { status: 404 });
  }
  const { PUBLIC_URL } = getEnv();
  return { locale, profession, city, slots, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, profession, city, slots, publicUrl } = data;
  const profTitle = t(locale, professionMessageKey(profession));
  const cName = cityName(city, locale);
  const title = `${profTitle} ${inCity(locale, cName)}`;
  const description = `${title} — ${t(locale, "professionals_landing_subtitle").replace(/\*\*/g, "")}`;
  const path = `/professionals/${profession}/${city.slug}`;
  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    ...hreflangMeta(publicUrl, locale, path),
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

export default function ProfessionCityCell({ loaderData }: Route.ComponentProps) {
  const { locale, profession, city, slots } = loaderData;
  const tag = PROFESSION_TO_TAG[profession];
  const tone = classesForTag(tag);
  const profTitle = t(locale, professionMessageKey(profession));
  const cName = cityName(city, locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/professionals`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header
          className={`relative isolate mb-10 overflow-hidden rounded-2xl border p-6 sm:p-10 ${tone.border}`}
        >
          {/* Per-profession hero (TED-129) — a medical photo used to appear on
              every profession page; the map in lib/professionals/categories
              picks an appropriate image per category. */}
          <img
            src={heroImageForProfession(profession)}
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
            </Link>{" "}
            /{" "}
            <Link
              to={`/${locale}/professionals/${profession}`}
              className="hover:underline"
            >
              {profTitle}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              {glyphForProfession(profession)}
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {profTitle} {inCity(locale, cName)}
              </h1>
              <p className="mt-3 text-base text-ink-700">{cityOverview(city, locale)}</p>
            </div>
          </div>
          <div className="mt-5">
            <Link to={`/${locale}/cities/${city.slug}`} className={tagChipClasses(tag)}>
              📍 {cName}
            </Link>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {slots.map((s) => (
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
            </Link>
          ))}
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
