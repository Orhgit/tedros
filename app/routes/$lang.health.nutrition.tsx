// /:lang/health/nutrition — Nutrition Hub (RIN-659).
//
// Dietary transition, diabetes risk, and nutrition tips for the
// Ethiopian-Israeli community. 3 sections: preserve / limit / transition.
// Sidebar callout links to /statistics/health.
//
// Schema.org: WebPage + BreadcrumbList — both computed in loader (server only).
// YMYL: HealthDisclaimer variant="standard" on every render.

import { Link } from "react-router";

import type { Route } from "./+types/$lang.health.nutrition";
import { HealthDisclaimer } from "~/components/health/health-disclaimer";
import { SiteFooter } from "~/components/sections/site-footer";
import { SiteHeader } from "~/components/sections/site-header";
import { getEnv } from "~/lib/env.server";
import {
  NUTRITION_TIPS,
  tipTitle,
  tipBody,
  type NutritionCategory,
} from "~/lib/health/nutrition.server";
import { breadcrumbJsonLd, webPageJsonLd } from "~/lib/health/schema";
import type { JsonLd } from "~/lib/health/schema";
import { healthPath, nutritionPath } from "~/lib/health/links";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

const CATEGORY_ORDER: NutritionCategory[] = ["preserve", "limit", "transition"];

function categoryLabel(locale: Locale, category: NutritionCategory): string {
  const key: Record<NutritionCategory, string> = {
    preserve: "health_nutrition_category_preserve",
    limit: "health_nutrition_category_limit",
    transition: "health_nutrition_category_transition",
  };
  return t(locale, key[category]);
}

function categoryBadgeClass(category: NutritionCategory): string {
  switch (category) {
    case "preserve":
      return "bg-green-100 text-green-800 border border-green-300";
    case "limit":
      return "bg-red-100 text-red-800 border border-red-300";
    case "transition":
      return "bg-blue-100 text-blue-800 border border-blue-300";
  }
}

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();

  const tipsByCategory = CATEGORY_ORDER.map((category) => ({
    category,
    tips: NUTRITION_TIPS.filter((tip) => tip.category === category).map((tip) => ({
      slug: tip.slug,
      title: tipTitle(tip, locale),
      body: tipBody(tip, locale),
      category: tip.category,
      lastReviewed: tip.lastReviewed,
    })),
  })).filter((group) => group.tips.length > 0);

  const title = t(locale, "health_nutrition_title");
  const description = t(locale, "health_nutrition_subtitle");

  const webPage: JsonLd = webPageJsonLd(
    { publicUrl: PUBLIC_URL, locale },
    { path: nutritionPath(), name: title, description },
  );

  const breadcrumb: JsonLd = breadcrumbJsonLd({ publicUrl: PUBLIC_URL, locale }, [
    { name: t(locale, "health_breadcrumb_home"), path: "/" },
    { name: t(locale, "health_breadcrumb_health"), path: "/health" },
    { name: title, path: nutritionPath() },
  ]);

  return {
    locale,
    tipsByCategory,
    title,
    description,
    publicUrl: PUBLIC_URL,
    webPage,
    breadcrumb,
  };
}

export const meta: Route.MetaFunction = ({ data }) => {
  if (!data) return [{ title: "Tedros" }];
  const { locale, title, description, publicUrl, webPage, breadcrumb } = data;
  const url = `${publicUrl}/${locale}${nutritionPath()}`;

  return [
    { title: `${title} — Tedros` },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "article" },
    { property: "og:locale", content: locale },
    { "script:ld+json": webPage },
    { "script:ld+json": breadcrumb },
  ];
};

export default function NutritionHub({ loaderData }: Route.ComponentProps) {
  const { locale, tipsByCategory } = loaderData;
  const title = t(locale, "health_nutrition_title");
  const subtitle = t(locale, "health_nutrition_subtitle");

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
          <p className="mt-3 text-lg leading-relaxed text-ink-700">{subtitle}</p>
        </header>

        {/* YMYL Disclaimer */}
        <HealthDisclaimer locale={locale} variant="standard" />

        {/* Intro stats callout */}
        <section
          className="mb-8 rounded-xl border border-amber-200 bg-amber-50 p-5"
          aria-labelledby="nutrition-stats-intro"
        >
          <h2
            id="nutrition-stats-intro"
            className="mb-2 font-display text-base font-semibold text-amber-900"
          >
            {locale === "he"
              ? "נתונים מדאיגים — למה תזונה חשובה כל כך?"
              : locale === "am"
                ? "አሳሳቢ ቅጣቶች"
                : "Concerning data — why does nutrition matter so much?"}
          </h2>
          <ul className="space-y-1 text-sm text-amber-800">
            <li>
              {locale === "he"
                ? "שיעור הסוכרת בקהילה: 0.4% בעלייה → 17.7% אחרי 10-16 שנה."
                : locale === "am"
                  ? "ስኳር ህመም ምጣኔ: 0.4% ኢሚግሬሽን ጊዜ → 17.7% ከ10-16 ዓመት በኋላ።"
                  : "Community diabetes rate: 0.4% at immigration → 17.7% after 10–16 years."}
            </li>
            <li>
              {locale === "he"
                ? "שינוי תזונתי — מעבר למזון מעובד — הוא גורם מרכזי."
                : locale === "am"
                  ? "ምግብ ለውጥ — ሂደት ምግብ ወደ ሥሩ — ዋናው ምክንያት ነው።"
                  : "Dietary change — shift to processed food — is a central factor."}
            </li>
          </ul>
          <div className="mt-3">
            <Link
              to={`/${locale}/statistics/health`}
              className="text-xs font-medium text-amber-900 underline hover:text-amber-700"
            >
              {t(locale, "health_nutrition_stats_link_label")} →
            </Link>
          </div>
        </section>

        {/* Tips by category */}
        {tipsByCategory.map(({ category, tips }) => (
          <section
            key={category}
            className="mb-10"
            aria-labelledby={`category-heading-${category}`}
          >
            <h2
              id={`category-heading-${category}`}
              className="mb-4 flex items-center gap-3 font-display text-xl font-semibold text-earth-900"
            >
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${categoryBadgeClass(category)}`}
              >
                {categoryLabel(locale, category)}
              </span>
            </h2>

            <ul className="space-y-6">
              {tips.map((tip) => (
                <li
                  key={tip.slug}
                  id={tip.slug}
                  className="rounded-2xl border border-earth-200 bg-card p-5 sm:p-6"
                >
                  <h3 className="mb-3 font-display text-base font-semibold text-earth-900">
                    {tip.title}
                  </h3>
                  <div className="space-y-3">
                    {tip.body.split("\n\n").map((para, idx) => (
                      <p key={idx} className="text-sm leading-relaxed text-ink-700">
                        {para.trim()}
                      </p>
                    ))}
                  </div>
                  <p className="mt-4 text-xs text-ink-500">
                    {t(locale, "health_condition_last_reviewed_label")}:{" "}
                    {tip.lastReviewed}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Category legend */}
        <section
          className="mb-10 rounded-xl border border-earth-200 bg-earth-50 p-5"
          aria-labelledby="nutrition-legend-heading"
        >
          <h2
            id="nutrition-legend-heading"
            className="mb-3 font-display text-base font-semibold text-earth-900"
          >
            {locale === "he"
              ? "מדריך קטגוריות"
              : locale === "am"
                ? "ምድቦች ምሩ"
                : "Category guide"}
          </h2>
          <ul className="space-y-2 text-sm">
            {(["preserve", "limit", "transition"] as NutritionCategory[]).map((cat) => (
              <li key={cat} className="flex items-center gap-3">
                <span
                  className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-semibold ${categoryBadgeClass(cat)}`}
                >
                  {categoryLabel(locale, cat)}
                </span>
                <span className="text-ink-700">
                  {cat === "preserve"
                    ? locale === "he"
                      ? "מאכלים מסורתיים בריאים שכדאי לשמר"
                      : locale === "am"
                        ? "ጤናማ ባህላዊ ምግቦች"
                        : "Healthy traditional foods worth preserving"
                    : cat === "limit"
                      ? locale === "he"
                        ? "מזונות שמומלץ להגביל"
                        : locale === "am"
                          ? "ሊቀንሱ የሚፈልጉ ምግቦች"
                          : "Foods recommended to limit"
                      : locale === "he"
                        ? "שינויים ומעבר הדרגתי"
                        : locale === "am"
                          ? "ቀስ ቀስ ሽግግር"
                          : "Changes and gradual transition"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Back navigation */}
        <div className="border-t border-earth-200 pt-6">
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
