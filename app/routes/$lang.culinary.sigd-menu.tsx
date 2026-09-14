// /:lang/culinary/sigd-menu — the Sigd fast + break-fast menu guide
// (TED-146). Timed for Sigd 5787 (9.11.2026); cross-links the existing
// Sigd heritage event pages (hub + city cells).
//
// Schema.org: Article + BreadcrumbList.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.culinary.sigd-menu";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { culinaryPath, sigdMenuPath } from "~/lib/culinary/links";
import { articleJsonLd, breadcrumbJsonLd, type JsonLd } from "~/lib/culinary/schema";
import {
  SIGD_MENU_PUBLISHED,
  sigdMenuBody,
  sigdMenuDescription,
  sigdMenuTitle,
} from "~/lib/culinary/sigd-menu.server";
import { findHeritageEvent, nextDate } from "~/lib/heritage/events.server";
import { eventPath } from "~/lib/heritage/links";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { formatDate } from "~/lib/i18n/format";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const title = sigdMenuTitle(locale);
  const description = sigdMenuDescription(locale);
  const html = renderMarkdown(sigdMenuBody(locale));

  // The heritage module is the source of truth for the next observance.
  const sigd = findHeritageEvent("sigd");
  const next = sigd ? nextDate(sigd) : null;
  const article: JsonLd = articleJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    {
      path: sigdMenuPath(),
      headline: title,
      description,
      datePublished: SIGD_MENU_PUBLISHED,
    },
  );
  const breadcrumb: JsonLd = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "culinary_title"), path: culinaryPath() },
    { name: title, path: sigdMenuPath() },
  ]);

  return {
    locale,
    title,
    description,
    html,
    next,
    publicUrl: PUBLIC_URL,
    article,
    breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, description, publicUrl, article, breadcrumb } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, sigdMenuPath()),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": article },
    { "script:ld+json": breadcrumb },
  ];
};

export default function SigdMenuGuide({ loaderData }: Route.ComponentProps) {
  const { locale, title, description, html, next } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${culinaryPath()}`} />

      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "rights_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${culinaryPath()}`} className="hover:underline">
            {t(locale, "culinary_title")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        <header className="mb-8 rounded-2xl border border-accent-sigd/30 bg-accent-sigd/5 p-6 sm:p-10">
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{description}</p>
          {next && (
            <p className="mt-4 text-sm font-medium text-earth-800">
              {t(locale, "heritage_events_next_observance_label")}:{" "}
              {formatDate(locale, next)}
            </p>
          )}
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* TED-172 — the Sigd×city chips linked to cells that now 301 to the
            Sigd event page. Restore with the cell flag. */}

        <div className="mt-12 border-t border-earth-200 pt-6 text-sm">
          <Link
            to={`/${locale}${eventPath("sigd")}`}
            className="inline-flex items-center gap-2 text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "culinary_back_to_sigd")}
          </Link>
          {" · "}
          <Link to={`/${locale}${culinaryPath()}`} className="hover:underline">
            {t(locale, "culinary_back_to_pillar")}
          </Link>
        </div>
      </article>

      <SiteFooter locale={locale} />
    </div>
  );
}
