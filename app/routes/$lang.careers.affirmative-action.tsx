// /:lang/careers/affirmative-action — Order-50 / civil-service representation
// explainer (RIN-472). One page per locale = 3 SEO URLs. Captures the head
// query "ייצוג הולם בשירות הציבורי" + Order-50 long-tail.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.careers.affirmative-action";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { WhatsAppShare } from "~/components/sections/whatsapp-share";
import { breadcrumbJsonLd } from "~/lib/careers/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { renderMarkdown } from "~/lib/utils/markdown";
import { BODIES } from "~/lib/careers/affirmative-action-body.server";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const html = renderMarkdown(BODIES[locale] ?? BODIES[DEFAULT_LOCALE]);
  const { PUBLIC_URL } = getEnv();
  const shareUrl = `${PUBLIC_URL}/${locale}/careers/affirmative-action`;
  return { locale, html, shareUrl, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl } = data;
  const title = t(locale, "careers_affirmative_action_title");
  const description = t(locale, "careers_affirmative_action_subtitle");

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${publicUrl}/${locale}/careers/affirmative-action`,
    url: `${publicUrl}/${locale}/careers/affirmative-action`,
    headline: title,
    description,
    inLanguage: locale,
    author: { "@type": "Organization", name: "Tedros", url: publicUrl },
    publisher: { "@type": "Organization", name: "Tedros", url: publicUrl },
  };

  const breadcrumb = breadcrumbJsonLd({ publicUrl, locale }, [
    { name: t(locale, "rights_breadcrumb_home"), path: "/" },
    { name: t(locale, "careers_breadcrumb_careers"), path: "/careers" },
    {
      name: t(locale, "careers_affirmative_action_breadcrumb"),
      path: "/careers/affirmative-action",
    },
  ]);

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, "/careers/affirmative-action"),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": articleJsonLd },
    { "script:ld+json": breadcrumb },
  ];
};

export default function AffirmativeAction({ loaderData }: Route.ComponentProps) {
  const { locale, html, shareUrl } = loaderData;
  const title = t(locale, "careers_affirmative_action_title");
  const subtitle = t(locale, "careers_affirmative_action_subtitle");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/careers`} />
      <article id="main-content" className="container-default mx-auto max-w-3xl py-10">
        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 p-6 sm:p-10">
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
          <span
            aria-hidden="true"
            className="absolute inset-s-0 inset-e-0 top-0 h-1.5 bg-accent-red"
          />
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "rights_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}/careers`} className="hover:underline">
              {t(locale, "careers_breadcrumb_careers")}
            </Link>
          </p>
          <div className="mt-3 flex items-start gap-4">
            <span aria-hidden="true" className="text-4xl leading-none">
              ⚖️
            </span>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
                {title}
              </h1>
              <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
            </div>
          </div>
        </header>

        <section
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div className="mt-6">
          <WhatsAppShare title={title} url={shareUrl} locale={locale} />
        </div>

        <div className="mt-12 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}/careers`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "careers_track_back_to_hub")}
          </Link>
        </div>
      </article>
      <SiteFooter locale={locale} />
    </div>
  );
}
