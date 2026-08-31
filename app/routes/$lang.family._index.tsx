// /:lang/family — Family & Support pillar landing.
// 4-card hub linking to domestic-violence, elderly, women-empowerment, and
// mourning sub-pages.
// JSON-LD: BreadcrumbList + WebPage.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.family._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import {
  familyPath,
  domesticViolencePath,
  elderlyPath,
  mourningPath,
  soldiersPath,
  womenEmpowermentPath,
} from "~/lib/family/links";
import { breadcrumbJsonLd, webPageJsonLd } from "~/lib/family/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598122666068-59b41e0a3193?fm=webp&q=70&w=1200&fit=crop";

interface FamilyCard {
  slug: string;
  path: string;
  titleKey: string;
  subtitleKey: string;
  icon: string;
}

const CARDS: FamilyCard[] = [
  {
    slug: "domestic-violence",
    path: domesticViolencePath(),
    titleKey: "family_domestic_violence_title",
    subtitleKey: "family_domestic_violence_subtitle",
    icon: "🆘",
  },
  {
    slug: "elderly",
    path: elderlyPath(),
    titleKey: "family_elderly_title",
    subtitleKey: "family_elderly_subtitle",
    icon: "👴",
  },
  {
    slug: "women-empowerment",
    path: womenEmpowermentPath(),
    titleKey: "family_women_title",
    subtitleKey: "family_women_subtitle",
    icon: "🌸",
  },
  {
    slug: "mourning",
    path: mourningPath(),
    titleKey: "family_mourning_title",
    subtitleKey: "family_mourning_subtitle",
    icon: "🕯️",
  },
  {
    slug: "soldiers",
    path: soldiersPath(),
    titleKey: "family_soldiers_title",
    subtitleKey: "family_soldiers_subtitle",
    icon: "🎗️",
  },
];

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "family_landing_title");
  const description = t(locale, "family_landing_subtitle");
  const url = `${publicUrl}/${locale}/family`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/family"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: url },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: "/family", name: title, description },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "family_breadcrumb_home"), path: "/" },
        { name: t(locale, "family_breadcrumb_family"), path: "/family" },
      ]),
    },
  ];
};

export default function FamilyLanding({ loaderData }: Route.ComponentProps) {
  const { locale } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${familyPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        {/* Hero */}
        <header className="relative isolate mb-10 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/95 via-earth-50/80 to-earth-50/45"
            aria-hidden="true"
          />
          <p className="relative text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "family_breadcrumb_home")}
            </Link>
          </p>
          <h1 className="relative mt-2 font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {t(locale, "family_landing_title")}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {t(locale, "family_landing_subtitle")}
          </p>
        </header>

        {/* topic-card grid */}
        <section aria-labelledby="family-topics-heading">
          <h2
            id="family-topics-heading"
            className="sr-only mb-6 font-display text-2xl font-semibold text-earth-900"
          >
            {t(locale, "family_landing_title")}
          </h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CARDS.map((card) => (
              <li key={card.slug}>
                <Link
                  to={`/${locale}${card.path}`}
                  className="group block h-full rounded-2xl border border-earth-200 bg-card p-6 transition hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {t(locale, card.titleKey)}
                    </p>
                    <span aria-hidden="true" className="text-2xl leading-none">
                      {card.icon}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {t(locale, card.subtitleKey)}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-earth-700">
                    {t(locale, "family_card_learn_more")}
                    <span
                      aria-hidden="true"
                      className={locale === "en" ? "inline-block rotate-180" : ""}
                    >
                      ←
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
