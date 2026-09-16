// /:lang/heritage/kessim — Kessim & Ethiopian-community rabbis directory
// landing (TED-140). Lists the 31 cities in the official Ministry of
// Religious Services list, with per-city counts, and links into the city
// pages. JSON-LD: ItemList + BreadcrumbList.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.heritage.kessim._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  KESSIM_ARRANGE,
  KESSIM_CEREMONIES,
  KESSIM_CITIES,
  KESSIM_DIRECTORY,
  KESSIM_QUESTIONS,
  KESSIM_SOURCE,
  kessimByCity,
  kessimCopy,
} from "~/lib/heritage/kessim.server";
import { kessimCityPath, kessimLandingPath, marriagePath } from "~/lib/heritage/links";
import { breadcrumbJsonLd, faqPageJsonLd, itemListJsonLd } from "~/lib/heritage/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const cities = KESSIM_CITIES.map((city) => {
    const entries = kessimByCity(city.slug);
    return {
      slug: city.slug,
      name: city.names[locale] ?? city.names.he,
      inRegistry: city.inRegistry,
      total: entries.length,
      kessimCount: entries.filter((e) => e.position === "kes").length,
      rabbisCount: entries.filter((e) => e.position !== "kes").length,
    };
  });

  return {
    locale,
    cities,
    // Long-form copy comes from the server module, not messages/*.json —
    // it would otherwise ship in the client message bundle (TED-115).
    subtitle: kessimCopy("landingSubtitle", locale),
    crosslinkBody: kessimCopy("marriageCrosslinkBody", locale),
    sourceCaveat: kessimCopy("sourceCaveat", locale),
    totalEntries: KESSIM_DIRECTORY.length,
    totalKessim: KESSIM_DIRECTORY.filter((e) => e.position === "kes").length,
    totalRabbis: KESSIM_DIRECTORY.filter((e) => e.position !== "kes").length,
    // TED-170: the ceremonies / what-to-ask / how-to-arrange sections. The
    // landing page is where the demand for this actually lands ("kessim",
    // "מה זה קייס", "קייסים"), so it carries the full set.
    ceremonies: KESSIM_CEREMONIES.map((c) => ({
      id: c.id,
      title: c.title[locale] ?? c.title.he,
      body: c.body[locale] ?? c.body.he,
    })),
    questions: KESSIM_QUESTIONS[locale] ?? KESSIM_QUESTIONS.he,
    arrange: KESSIM_ARRANGE.map((c) => ({
      id: c.id,
      title: c.title[locale] ?? c.title.he,
      body: c.body[locale] ?? c.body.he,
    })),
    source: {
      govUrl: KESSIM_SOURCE.govUrl,
      dataGovUrl: KESSIM_SOURCE.dataGovUrl,
      publisher: KESSIM_SOURCE.publisher[locale] ?? KESSIM_SOURCE.publisher.he,
      updatedAt: KESSIM_SOURCE.updatedAt,
      recheckedAt: KESSIM_SOURCE.recheckedAt,
    },
    publicUrl: PUBLIC_URL,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, cities, subtitle, publicUrl, ceremonies, arrange } = data;
  const title = t(locale, "kessim_landing_title");
  const description = subtitle;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, kessimLandingPath()),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": itemListJsonLd(
        { publicUrl, locale },
        {
          path: kessimLandingPath(),
          name: title,
          description,
          items: cities.map((c) => ({
            name: c.name,
            path: kessimCityPath(c.slug),
          })),
        },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "rights_breadcrumb_home"), path: "/" },
        { name: title, path: kessimLandingPath() },
      ]),
    },
    // TED-170: the definitional queries this page should own ("kessim",
    // "מה זה קייס", "קייסים") are questions, so the ceremonies and the
    // arranging steps are also emitted as an FAQPage.
    {
      "script:ld+json": faqPageJsonLd({ publicUrl, locale }, kessimLandingPath(), [
        ...ceremonies.map((c) => ({ question: c.title, answer: c.body })),
        ...arrange.map((c) => ({ question: c.title, answer: c.body })),
      ]),
    },
  ];
};

export default function KessimLanding({ loaderData }: Route.ComponentProps) {
  const {
    locale,
    cities,
    subtitle,
    crosslinkBody,
    sourceCaveat,
    totalEntries,
    totalKessim,
    totalRabbis,
    source,
    ceremonies,
    questions,
    arrange,
  } = loaderData;

  const heading = (he: string, en: string, am: string) =>
    locale === "he" ? he : locale === "am" ? am : en;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${kessimLandingPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        <header className="mb-8">
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {t(locale, "kessim_landing_title")}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
          <p className="mt-4 text-sm text-ink-600">
            {t(locale, "kessim_totals", {
              total: totalEntries,
              kessim: totalKessim,
              rabbis: totalRabbis,
              cities: cities.length,
            })}
          </p>
        </header>

        {/* Cross-link to the marriage guide — the most common reason to look
            for a kes. */}
        <section className="mb-8 rounded-2xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {t(locale, "kessim_marriage_crosslink_heading")}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-700">{crosslinkBody}</p>
          <Link
            to={`/${locale}${marriagePath()}`}
            className="mt-3 inline-block text-sm font-medium text-earth-700 underline hover:text-earth-900"
          >
            {t(locale, "kessim_marriage_crosslink_cta")}
          </Link>
        </section>

        {/* TED-170 — the ceremonies a kes is approached for. The roster alone
            answered no search anyone was running; this is what does. */}
        <section aria-labelledby="kessim-ceremonies-heading" className="mb-10">
          <h2
            id="kessim-ceremonies-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {heading(
              "לאילו טקסים פונים לקס",
              "Which ceremonies a kes is approached for",
              "ቄስ ለየትኞቹ ሥነ ሥርዓቶች ይቀርባል",
            )}
          </h2>
          <div className="space-y-5">
            {ceremonies.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* What to ask before committing — the checklist. */}
        <section
          aria-labelledby="kessim-questions-heading"
          className="mb-10 rounded-2xl border border-earth-200 bg-earth-50 p-5"
        >
          <h2
            id="kessim-questions-heading"
            className="font-display text-xl font-semibold text-earth-900"
          >
            {heading(
              "מה לשאול לפני שמתחייבים",
              "What to ask before you commit",
              "ከመወሰንዎ በፊት ምን መጠየቅ",
            )}
          </h2>
          <ul className="mt-3 list-disc space-y-2 ps-5 text-sm leading-relaxed text-ink-700">
            {questions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        {/* How to arrange one. */}
        <section aria-labelledby="kessim-arrange-heading" className="mb-10">
          <h2
            id="kessim-arrange-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {heading("איך מתאמים", "How to arrange one", "እንዴት ማቀናጀት")}
          </h2>
          <div className="space-y-5">
            {arrange.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-earth-200 bg-card p-5"
              >
                <h3 className="font-display text-base font-semibold text-earth-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="kessim-cities-heading">
          <h2
            id="kessim-cities-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "kessim_cities_heading")}
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  to={`/${locale}${kessimCityPath(city.slug)}`}
                  className="block rounded-lg border border-earth-200 bg-card p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                >
                  <h3 className="font-display text-base font-semibold text-earth-900">
                    {city.name}
                  </h3>
                  <p className="mt-2 text-sm text-ink-600">
                    {t(locale, "kessim_city_counts", {
                      kessim: city.kessimCount,
                      rabbis: city.rabbisCount,
                    })}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Source attribution — required by the issue brief. */}
        <section className="mt-10 rounded-xl border border-earth-200 bg-earth-50 p-5">
          <h2 className="font-display text-base font-semibold text-earth-900">
            {locale === "he" ? "מקור" : locale === "am" ? "ምንጭ" : "Source"}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-700">
            {t(locale, "kessim_source_note", {
              publisher: source.publisher,
              date: source.updatedAt,
            })}
          </p>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <a
                href={source.govUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-700 underline hover:text-earth-900"
              >
                gov.il — {t(locale, "kessim_source_gov_label")} ↗
              </a>
            </li>
            <li>
              <a
                href={source.dataGovUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-earth-700 underline hover:text-earth-900"
              >
                data.gov.il — {t(locale, "kessim_source_data_label")} ↗
              </a>
            </li>
          </ul>
          <p className="mt-3 text-xs text-ink-600">{sourceCaveat}</p>
          {/* TED-170 — say out loud when we last re-ran the list against the
              source, separately from when the ministry last changed it. */}
          <p className="mt-2 text-xs text-ink-600">
            {heading(
              `הצלבנו את הרשימה מול המקור ב-${source.recheckedAt}: כל ${totalEntries} הרשומות תואמות, ולא קיימת גרסה חדשה יותר מ-${source.updatedAt}.`,
              `We re-checked this list against the source on ${source.recheckedAt}: all ${totalEntries} records match, and no version newer than ${source.updatedAt} exists.`,
              `ዝርዝሩን ከምንጩ ጋር በ${source.recheckedAt} አረጋግጠናል፡ ሁሉም ${totalEntries} መዝገቦች ይዛመዳሉ፣ ከ${source.updatedAt} የሚበልጥ አዲስ ስሪትም የለም።`,
            )}
          </p>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
