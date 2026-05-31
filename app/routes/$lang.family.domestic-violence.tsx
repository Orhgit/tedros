// /:lang/family/domestic-violence — Domestic Violence support hub.
// Emergency hotlines, shelters, legal rights for Ethiopian women facing DV in Israel.
// JSON-LD: BreadcrumbList + WebPage.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.family.domestic-violence";
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

  const topic = getFamilyTopic("domestic-violence");
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
    ...hreflangMeta(publicUrl, locale, "/family/domestic-violence"),
    { property: "og:title", content: title },
    { property: "og:description", content: subtitle },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    {
      "script:ld+json": webPageJsonLd(
        { publicUrl, locale },
        { path: "/family/domestic-violence", name: title, description: subtitle },
      ),
    },
    {
      "script:ld+json": breadcrumbJsonLd({ publicUrl, locale }, [
        { name: t(locale, "family_breadcrumb_home"), path: "/" },
        { name: t(locale, "family_breadcrumb_family"), path: "/family" },
        { name: title, path: "/family/domestic-violence" },
      ]),
    },
  ];
};

export default function DomesticViolencePage({ loaderData }: Route.ComponentProps) {
  const { locale, title, subtitle, body, resources } = loaderData;

  const emergencyResources = resources.filter((r) => r.phone);
  const otherResources = resources.filter((r) => !r.phone);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}${familyPath()}`} />
      <main id="main-content" className="container-default mx-auto max-w-4xl py-10">
        {/* Emergency banner */}
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-800">
            {locale === "he"
              ? "בסכנה מיידית? חייגי 100 (משטרה) או 1-800-22-0000 (WIZO — חינם 24/7)"
              : locale === "am"
                ? "ቅጽበታዊ አደጋ? 100 (ፖሊስ) ወይም 1-800-22-0000 (WIZO — ነፃ 24/7) ይደውሉ"
                : "Immediate danger? Call 100 (police) or 1-800-22-0000 (WIZO — free 24/7)"}
          </p>
        </div>

        {/* Header */}
        <header className="relative mb-8 isolate overflow-hidden rounded-2xl border border-earth-200 px-6 py-8 sm:px-10 sm:py-12">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent" aria-hidden="true" />
          <div
            className="absolute inset-0 -z-10 bg-linear-to-br from-earth-50/80 to-transparent"
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

        {/* Emergency numbers */}
        {emergencyResources.length > 0 && (
          <section className="mb-10" aria-labelledby="dv-emergency-heading">
            <h2
              id="dv-emergency-heading"
              className="mb-4 font-display text-xl font-semibold text-earth-900"
            >
              {t(locale, "family_emergency_numbers_heading")}
            </h2>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {emergencyResources.map((r) => (
                <li key={r.name} className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <h3 className="font-display text-base font-semibold text-red-900">{r.name}</h3>
                  {r.phone && (
                    <a
                      href={`tel:${r.phone.replace(/[^0-9+]/g, "")}`}
                      className="mt-1 block font-display text-2xl font-bold text-red-700 hover:underline"
                      aria-label={`${r.name}: ${r.phone}`}
                    >
                      {r.phone}
                    </a>
                  )}
                  <p className="mt-2 text-sm text-red-800">{r.description}</p>
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-700 hover:underline"
                    >
                      {locale === "he" ? "לאתר" : locale === "am" ? "ድህረ ገጽ" : "Website"} ↗
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Body content */}
        <section
          className="mb-10 rounded-2xl border border-earth-200 bg-card p-6"
          aria-labelledby="dv-info-heading"
        >
          <h2
            id="dv-info-heading"
            className="mb-4 font-display text-xl font-semibold text-earth-900"
          >
            {locale === "he"
              ? "מידע על זכויות וסיוע"
              : locale === "am"
                ? "ስለ መብቶችዎ እና ድጋፍ"
                : "Information on rights and support"}
          </h2>
          <div className="space-y-3 text-sm leading-relaxed text-ink-700 whitespace-pre-line">
            {body}
          </div>
        </section>

        {/* Other resources */}
        {otherResources.length > 0 && (
          <section className="mb-10" aria-labelledby="dv-resources-heading">
            <h2
              id="dv-resources-heading"
              className="mb-4 font-display text-xl font-semibold text-earth-900"
            >
              {t(locale, "family_resources_heading")}
            </h2>
            <ul className="space-y-4">
              {otherResources.map((r) => (
                <li key={r.name} className="rounded-xl border border-earth-200 bg-card p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-base font-semibold text-earth-900">
                        {r.name}
                      </h3>
                      <p className="mt-1 text-sm text-ink-600">{r.description}</p>
                    </div>
                    {r.url && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-md border border-earth-200 px-3 py-1.5 text-xs font-medium text-earth-700 transition hover:border-earth-400 hover:bg-earth-50"
                      >
                        {locale === "he" ? "לאתר" : locale === "am" ? "ድህረ ገጽ" : "Website"} ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${familyPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "family_breadcrumb_family")}
          </Link>
        </div>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
