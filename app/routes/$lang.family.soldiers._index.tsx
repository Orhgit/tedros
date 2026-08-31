// /:lang/family/soldiers — Soldiers & Families hub landing (TED-142).
//
// Three-card hub: the detention guide, the ת"ש wizard (which lives on the
// Rights Hub so it can reuse the wizard-engine), and the lone-soldier guide.
// JSON-LD: WebPage + BreadcrumbList.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.family.soldiers._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import {
  familyPath,
  familySupportWizardPath,
  loneSoldierPath,
  soldierDetentionPath,
  soldiersPath,
} from "~/lib/family/links";
import { breadcrumbJsonLd, webPageJsonLd } from "~/lib/family/schema";
import { HUB_CHROME } from "~/lib/family/soldiers.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?fm=webp&q=70&w=1200&fit=crop";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  const chrome = HUB_CHROME[locale];
  const ctx = { publicUrl: PUBLIC_URL, locale };

  const cards = chrome.cards.map((card) => ({
    ...card,
    to: `/${locale}${
      card.key === "detention"
        ? soldierDetentionPath()
        : card.key === "lone-soldier"
          ? loneSoldierPath()
          : familySupportWizardPath()
    }`,
  }));

  return {
    locale,
    publicUrl: PUBLIC_URL,
    chrome,
    cards,
    webPage: webPageJsonLd(ctx, {
      path: soldiersPath(),
      name: chrome.title,
      description: chrome.subtitle,
    }),
    breadcrumb: breadcrumbJsonLd(ctx, [
      { name: chrome.breadcrumbHome, path: "/" },
      { name: chrome.breadcrumbFamily, path: familyPath() },
      { name: chrome.title, path: soldiersPath() },
    ]),
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, chrome, webPage, breadcrumb } = data;
  const url = `${publicUrl}/${locale}${soldiersPath()}`;

  return [
    { title: `${chrome.title} — Tedros` },
    { name: "description", content: chrome.subtitle },
    ...hreflangMeta(publicUrl, locale, soldiersPath()),
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: chrome.title },
    { property: "og:description", content: chrome.subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: url },
    { "script:ld+json": webPage },
    { "script:ld+json": breadcrumb },
  ];
};

export default function SoldiersHub({ loaderData }: Route.ComponentProps) {
  const { locale, chrome, cards } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${familyPath()}`} />

      <main id="main-content" className="container-default mx-auto max-w-5xl py-10">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {chrome.breadcrumbHome}
          </Link>
          {" / "}
          <Link to={`/${locale}${familyPath()}`} className="hover:underline">
            {chrome.breadcrumbFamily}
          </Link>
          {" / "}
          <span aria-current="page">{chrome.title}</span>
        </nav>

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
          <h1 className="relative font-display text-4xl font-bold tracking-tight text-earth-900 sm:text-5xl">
            {chrome.title}
          </h1>
          <p className="relative mt-4 max-w-2xl text-lg leading-relaxed text-ink-700">
            {chrome.subtitle}
          </p>
        </header>

        <p className="mb-10 max-w-3xl text-sm leading-relaxed text-ink-700">
          {chrome.intro}
        </p>

        <section aria-labelledby="soldiers-cards-heading">
          <h2
            id="soldiers-cards-heading"
            className="mb-6 font-display text-2xl font-semibold text-earth-900"
          >
            {chrome.cardsHeading}
          </h2>
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <li key={card.key}>
                <Link
                  to={card.to}
                  className="group block h-full rounded-2xl border border-earth-200 bg-card p-6 transition hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-display text-base font-semibold text-earth-900 group-hover:text-earth-700">
                      {card.title}
                    </p>
                    <span aria-hidden="true" className="text-2xl leading-none">
                      {card.icon}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    {card.description}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-earth-700">
                    {chrome.cardCta}
                    <span aria-hidden="true" className="icon-flip inline-block">
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
