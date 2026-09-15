// /:lang/heritage/sigd/events-2026 — the verified Sigd 5787 events list
// (TED-169). Ships empty and honest until an organiser publishes; see
// `lib/heritage/sigd.server.ts` for the bar an entry has to clear.

import type { Route } from "./+types/$lang.heritage.sigd.events-2026";
import { SigdSeasonArticle } from "~/components/sections/sigd-season-article";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { sigdSeasonPayload } from "~/lib/heritage/sigd-loader.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  return sigdSeasonPayload("events", locale);
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, description, path, publicUrl, article, breadcrumb } = data;
  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, path),
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

export default function SigdEvents2026({ loaderData }: Route.ComponentProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader
        locale={loaderData.locale}
        currentPath={`/${loaderData.locale}/heritage/events`}
      />
      <SigdSeasonArticle {...loaderData} />
      <SiteFooter locale={loaderData.locale} />
    </div>
  );
}
