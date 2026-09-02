// /:lang/family/women-empowerment — Women's Empowerment hub.
// Scholarships for mothers, childcare subsidies (שעוני ילדים), community centres.
// JSON-LD: BreadcrumbList + WebPage.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.family.women-empowerment";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getFamilyTopic } from "~/lib/family/topics.server";
import { familyPath } from "~/lib/family/links";
import { breadcrumbJsonLd, webPageJsonLd } from "~/lib/family/schema";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1598122666068-59b41e0a3193?fm=webp&q=70&w=1200&fit=crop";

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const topic = getFamilyTopic("women-empowerment");
  if (!topic) throw new Response("Not Found", { status: 404 });

  const title = topic.title[locale];
  const subtitle = topic.subtitle[locale];
  const body = topic.body[locale];
  const resources = topic.resources.map((r) => ({
    name: r.name,
    phone: r.phone,
    url: r.url,
    description: r.description[locale],
  }));

  return { locale, title, subtitle, body, resources, publicUrl: PUBLIC_URL };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, subtitle, publicUrl } = data;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: subtitle },
    ...hreflangMeta(publicUrl, locale, "/family/women-empowerment"),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:image", content: `${publicUrl}/og-default.jpg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${publicUrl}/og-default.jpg` },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: "/family/women-empowerment", name: title, description: subtitle },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "family_breadcrumb_home"), path: "/" },
        { name: t(locale, "family_breadcrumb_family"), path: "/family" },
        { name: title, path: "/family/women-empowerment" },
      ]),
    },
  ];
};

export default function WomenEmpowermentPage({ loaderData }: Route.ComponentProps) {
  const { locale, title, subtitle, body, resources } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${familyPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        {/* Header */}
        <header className="relative isolate mb-8 overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
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
          <p className="text-sm font-medium text-earth-700">
            <Link to={`/${locale}`} className="hover:underline">
              {t(locale, "family_breadcrumb_home")}
            </Link>{" "}
            /{" "}
            <Link to={`/${locale}${familyPath()}`} className="hover:underline">
              {t(locale, "family_breadcrumb_family")}
            </Link>
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* Quick highlights */}
        <section
          className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
          aria-label={
            locale === "he"
              ? "נקודות מפתח"
              : locale === "am"
                ? "ቁልፍ ነጥቦች"
                : "Key highlights"
          }
        >
          {[
            {
              figure:
                locale === "he" ? "מלגות" : locale === "am" ? "ስኮላርሺፖች" : "Scholarships",
              label:
                locale === "he"
                  ? "לסטודנטיות מקהילת יוצאי אתיופיה"
                  : locale === "am"
                    ? "ከኢትዮጵያ ማህበረሰብ ለሴት ተማሪዎች"
                    : "For Ethiopian-Israeli female students",
            },
            {
              figure: locale === "he" ? "סובסידיה" : locale === "am" ? "ድጎማ" : "Subsidy",
              label:
                locale === "he"
                  ? "למעון יום עבור אמהות עובדות"
                  : locale === "am"
                    ? "ለሰርቲና እናቶች ሕፃን ቤት ዋጋ"
                    : "For daycare for working mothers",
            },
            {
              figure: locale === "he" ? "מרכזים" : locale === "am" ? "ማዕከሎች" : "Centres",
              label:
                locale === "he"
                  ? "קהילתיים לנשים בכל הארץ"
                  : locale === "am"
                    ? "በሀገር ሙሉ ለሴቶች ማህበረሰብ ማዕከሎች"
                    : "Women's community hubs nationwide",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-earth-200 bg-card p-4 text-center"
            >
              <p className="font-display text-2xl font-bold text-earth-800">
                {stat.figure}
              </p>
              <p className="mt-1 text-sm text-ink-600">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Body content */}
        <section
          className="mb-10 rounded-2xl border border-earth-200 bg-card p-6"
          aria-labelledby="women-info-heading"
        >
          <h2
            id="women-info-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "תוכניות ומשאבים"
              : locale === "am"
                ? "ፕሮግራሞች እና ሀብቶች"
                : "Programmes and resources"}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed whitespace-pre-line text-ink-700">
            {body}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-10" aria-labelledby="women-resources-heading">
          <h2
            id="women-resources-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {t(locale, "family_resources_heading")}
          </h2>
          <ul className="space-y-4">
            {resources.map((r) => (
              <li key={r.name} className="rounded-xl border border-earth-200 bg-card p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {r.name}
                    </h3>
                    {r.phone && (
                      <a
                        href={`tel:${r.phone.replace(/[^0-9+*]/g, "")}`}
                        className="mt-1 inline-block font-display text-xl font-bold text-earth-700 hover:underline"
                        aria-label={`${r.name}: ${r.phone}`}
                      >
                        {r.phone}
                      </a>
                    )}
                    <p className="mt-1 text-sm text-ink-600">{r.description}</p>
                  </div>
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 rounded-md border border-earth-200 px-3 py-1.5 text-xs font-medium text-earth-700 transition hover:border-earth-400 hover:bg-earth-50"
                    >
                      {locale === "he" ? "לאתר" : locale === "am" ? "ድህረ ገጽ" : "Website"}{" "}
                      ↗
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${familyPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true" className="icon-flip inline-block">
              ←
            </span>
            {t(locale, "family_breadcrumb_family")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
