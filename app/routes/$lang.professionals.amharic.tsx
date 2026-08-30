// /:lang/professionals/amharic — Amharic-speaking professionals landing
// (TED-136). Dedicated programmatic surface for near-zero-competition
// queries like "עורך דין דובר אמהרית". Lists every directory entry whose
// language claim includes "am", grouped by profession. Entries without an
// explicit Amharic claim (e.g. אורלי מנדפרו — open owner question) never
// appear here.
//
// Static segment "amharic" outranks the sibling dynamic $profession route
// in flat-route matching, so this never collides with profession pages.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.professionals.amharic";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { AmharicBadge } from "~/components/ui/amharic-badge";
import { findCityBySlug, cityName } from "~/lib/cities/registry";
import { listAmharicSpeaking } from "~/lib/db/queries/professionals.server";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import {
  ALL_PROFESSIONS,
  PROFESSION_TO_TAG,
  glyphForProfession,
  professionMessageKey,
} from "~/lib/professionals/categories";
import { classesForTag, tagChipClasses } from "~/lib/rights/categories";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const slots = listAmharicSpeaking(locale);
  const { PUBLIC_URL } = getEnv();
  return { locale, slots, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, slots, publicUrl } = data;
  const title = t(locale, "professionals_amharic_landing_title");
  const description = t(locale, "professionals_amharic_landing_subtitle");
  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/professionals/amharic"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: title,
        description,
        numberOfItems: slots.length,
        itemListElement: slots.map((s, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: s.title,
          url: `${publicUrl}/${locale}/professionals/profile/${s.slug}`,
        })),
      },
    },
  ];
};

export default function AmharicSpeakersLanding({ loaderData }: Route.ComponentProps) {
  const { locale, slots } = loaderData;

  // Group by profession, in the canonical profession order; skip empty groups.
  const groups = ALL_PROFESSIONS.map(
    (profession) =>
      [profession, slots.filter((s) => s.profession === profession)] as const,
  ).filter(([, entries]) => entries.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/professionals`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 bg-linear-to-br from-earth-50 via-background to-accent-yellow/5 px-6 py-8 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="absolute -inset-e-12 -top-12 size-40 rounded-full bg-accent-yellow/15 blur-3xl"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/professionals`} className="hover:underline">
              {t(locale, "professionals_breadcrumb")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "professionals_amharic_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "professionals_amharic_landing_subtitle")}
          </p>
          <p className="relative mt-3 text-sm text-ink-600">
            {slots.length} {t(locale, "professionals_count_label")}
          </p>
        </header>

        {groups.map(([profession, entries]) => {
          const tag = PROFESSION_TO_TAG[profession];
          const tone = classesForTag(tag);
          return (
            <section key={profession} className="mb-10">
              <div className="mb-4 flex items-center gap-3">
                <span aria-hidden="true" className="text-2xl leading-none">
                  {glyphForProfession(profession)}
                </span>
                <h2 className="font-display text-xl font-semibold text-earth-900">
                  <Link
                    to={`/${locale}/professionals/${profession}`}
                    className="hover:underline"
                  >
                    {t(locale, professionMessageKey(profession))}
                  </Link>
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {entries.map((s) => {
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
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <AmharicBadge locale={locale} />
                        {city && (
                          <span className="text-xs text-ink-600">
                            📍 {cityName(city, locale)}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className="rounded-2xl border border-earth-200 bg-earth-50 p-6 sm:p-8">
          <h2 className="font-display text-lg font-semibold text-earth-900">
            {t(locale, "professionals_join_cta_heading")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-700">
            {t(locale, "professionals_join_cta_body")}
          </p>
          <Link
            to={`/${locale}/professionals/join`}
            className={`mt-4 ${tagChipClasses("mentorship")} px-4 py-1.5 text-sm`}
          >
            {t(locale, "professionals_join_cta_link")}
          </Link>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
