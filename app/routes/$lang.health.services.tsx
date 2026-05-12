// /:lang/health/services — Health Services Directory (RIN-656).
//
// Lists all 7 health services grouped by category. Each service card shows
// name, description, phone/url CTA, and a free badge.
//
// Schema.org: LocalBusiness (Tene Briut) + BreadcrumbList.
// YMYL: HealthDisclaimer rendered on every render.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.health.services";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import {
  HEALTH_SERVICES,
  serviceName,
  serviceDescription,
  serviceOpenHours,
  type HealthServiceCategory,
} from "~/lib/health/services.server";
import { breadcrumbJsonLd, localBusinessJsonLd } from "~/lib/health/schema";
import { healthPath } from "~/lib/health/links";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

const CATEGORY_ORDER: HealthServiceCategory[] = [
  "translation",
  "crisis",
  "mental-health",
  "emergency",
  "rights",
];

function categoryLabel(locale: Locale, category: HealthServiceCategory): string {
  const map: Record<HealthServiceCategory, string> = {
    translation: t(locale, "health_services_category_translation"),
    crisis: t(locale, "health_services_category_crisis"),
    "mental-health": t(locale, "health_services_category_mental_health"),
    emergency: t(locale, "health_services_category_emergency"),
    rights: t(locale, "health_services_category_rights"),
  };
  return map[category];
}

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const servicesByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    services: HEALTH_SERVICES.filter((s) => s.category === category).map((s) => ({
      slug: s.slug,
      name: serviceName(s, locale),
      description: serviceDescription(s, locale),
      phone: s.phone,
      url: s.url,
      openHours: serviceOpenHours(s, locale),
      isFree: s.isFree,
    })),
  })).filter((group) => group.services.length > 0);

  const teneBriut = HEALTH_SERVICES.find((s) => s.slug === "tene-briut");
  const localBizJsonLd = teneBriut
    ? localBusinessJsonLd(
        { publicUrl: PUBLIC_URL, locale },
        {
          name: serviceName(teneBriut, locale),
          description: serviceDescription(teneBriut, locale),
          url: teneBriut.url,
          telephone: teneBriut.phone,
          addressCountry: "IL",
        },
      )
    : undefined;

  const title = t(locale, "health_services_title");
  const description = t(locale, "health_services_subtitle");
  const breadcrumb = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "health_breadcrumb_home"), path: "/" },
    { name: t(locale, "health_breadcrumb_health"), path: "/health" },
    { name: title, path: "/health/services" },
  ]);

  return {
    locale,
    servicesByCategory,
    publicUrl: PUBLIC_URL,
    localBizJsonLd,
    title,
    description,
    breadcrumbJsonLd: breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, publicUrl, localBizJsonLd, title, description, breadcrumbJsonLd } =
    data;
  const url = `${publicUrl}/${locale}/health/services`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    ...(localBizJsonLd ? [{ "script:ld+json": localBizJsonLd }] : []),
    { "script:ld+json": breadcrumbJsonLd },
  ];
};

export default function HealthServices({ loaderData }: Route.ComponentProps) {
  const { locale, servicesByCategory, title } = loaderData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flag-stripe h-1.5" aria-hidden="true" />
      <SiteHeader locale={locale} currentPath={`/${locale}/health`} />

      <main id="main-content" className="container-default mx-auto max-w-3xl py-10">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-6 text-sm text-ink-600">
          <Link to={`/${locale}`} className="hover:underline">
            {t(locale, "health_breadcrumb_home")}
          </Link>
          {" / "}
          <Link to={`/${locale}${healthPath()}`} className="hover:underline">
            {t(locale, "health_breadcrumb_health")}
          </Link>
          {" / "}
          <span aria-current="page">{title}</span>
        </nav>

        {/* Page header */}
        <header className="relative mb-8 overflow-hidden rounded-2xl border border-earth-200 bg-card p-6 sm:p-10">
          <img
            src="https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=1200&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
            loading="lazy"
            decoding="async"
          />
          <h1 className="font-display text-3xl font-bold tracking-tight text-earth-900 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-700">
            {t(locale, "health_services_subtitle")}
          </p>
        </header>

        {/* YMYL Disclaimer */}
        <HealthDisclaimer locale={locale} variant="standard" />

        {/* Services grouped by category */}
        {servicesByCategory.map(({ category, services }) => (
          <section key={category} className="mb-10" aria-labelledby={`cat-${category}`}>
            <h2
              id={`cat-${category}`}
              className="mb-4 font-display text-xl font-semibold text-earth-900"
            >
              {categoryLabel(locale, category)}
            </h2>

            <ul className="space-y-4">
              {services.map((service) => (
                <li
                  key={service.slug}
                  className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="font-display text-base font-semibold text-earth-900">
                      {service.name}
                    </h3>
                    {service.isFree && (
                      <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        {t(locale, "health_services_free_badge")}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-ink-700">
                    {service.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {service.phone && (
                      <a
                        href={`tel:${service.phone.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-earth-300 bg-white px-3 py-1.5 text-sm font-medium text-earth-800 transition hover:bg-earth-50"
                        aria-label={`${t(locale, "health_services_phone_label")}: ${service.phone}`}
                      >
                        <span aria-hidden="true">📞</span>
                        {t(locale, "health_services_phone_label")}: {service.phone}
                      </a>
                    )}
                    {service.url && (
                      <a
                        href={service.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-earth-300 bg-white px-3 py-1.5 text-sm font-medium text-earth-800 transition hover:bg-earth-50"
                      >
                        <span aria-hidden="true">🌐</span>
                        {t(locale, "health_services_url_label")}
                      </a>
                    )}
                  </div>

                  {service.openHours && (
                    <p className="mt-2 text-xs text-ink-500">
                      {t(locale, "health_services_hours_label")}: {service.openHours}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Back link */}
        <div className="mt-10 border-t border-earth-200 pt-6">
          <Link
            to={`/${locale}${healthPath()}`}
            className="inline-flex items-center gap-2 text-sm text-earth-700 hover:underline"
          >
            <span aria-hidden="true">←</span>
            {t(locale, "health_back_to_hub")}
          </Link>
        </div>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
