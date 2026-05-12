import { Form, Link, useNavigation } from "react-router";
import type { Route } from "./+types/$lang._index";
import { SiteFooter } from "~/components/sections/site-footer";
import { getEnv } from "~/lib/env.server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "~/lib/i18n/config";
import { hreflangMeta } from "~/lib/i18n/hreflang";
import { t } from "~/lib/i18n/messages";
import { submitSubscriber } from "~/lib/subscribers/submit.server";
import { subscribeSchema } from "~/lib/validation/subscriber";

const PILLARS = [
  "rights",
  "realestate",
  "professionals",
  "employment",
  "education",
  "health",
  "family",
  "heritage",
  "news",
  "voice",
] as const;

// All images by Ethiopian photographers on Unsplash (free licence, no API key).
// Subjects are members of the Ethiopian community photographed in Addis Ababa.
const PILLAR_IMAGES: Record<string, string> = {
  // Two Habesha women smiling — Gift Habeshaw, Addis Ababa
  rights:
    "https://images.unsplash.com/photo-1662894312546-667d7698a1f7?fm=webp&q=70&w=600&fit=crop",
  // Addis Ababa cityscape — Unsplash, Ethiopia
  realestate:
    "https://images.unsplash.com/photo-1734865934450-719ef6f59a37?fm=webp&q=70&w=600&fit=crop",
  // Professional Ethiopian woman, black leather jacket — Samuel Tsegaye, Addis Ababa
  professionals:
    "https://images.unsplash.com/photo-1691820776176-fcfbd25096c9?fm=webp&q=70&w=600&fit=crop",
  // Women in traditional Habesha attire, community gathering — Gift Habeshaw
  employment:
    "https://images.unsplash.com/photo-1662894310962-d62a3f7f3334?fm=webp&q=70&w=600&fit=crop",
  // Smiling Ethiopian child in traditional clothing — Eyoel Kahssay
  education:
    "https://images.unsplash.com/photo-1764145177622-8317fbfe1877?fm=webp&q=70&w=600&fit=crop",
  // Ethiopian woman in orange shirt — Gift Habeshaw, Addis Ababa
  health:
    "https://images.unsplash.com/photo-1625255178547-44af3d0718c3?fm=webp&q=70&w=600&fit=crop",
  // Woman in traditional Ashenda dress — Eyoel Kahssay, Ethiopia
  family:
    "https://images.unsplash.com/photo-1598122666068-59b41e0a3193?fm=webp&q=70&w=600&fit=crop",
  // Timkat baptism celebration — Ethiopian Orthodox tradition
  heritage:
    "https://images.unsplash.com/photo-1674115904513-b77d8f84642a?fm=webp&q=70&w=600&fit=crop",
  // Community gathering in Addis Ababa
  news: "https://images.unsplash.com/photo-1642505368560-f8b8efd2e722?fm=webp&q=70&w=600&fit=crop",
  // Youth dancing at Ashenda holiday — Eyoel Kahssay
  voice:
    "https://images.unsplash.com/photo-1764145144753-922ae256714b?fm=webp&q=70&w=600&fit=crop",
};

export async function loader({ params }: Route.LoaderArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const { PUBLIC_URL } = getEnv();
  return { locale, publicUrl: PUBLIC_URL };
}

export async function action({ request, params }: Route.ActionArgs) {
  const locale: Locale = isLocale(params.lang) ? params.lang : DEFAULT_LOCALE;
  const formData = await request.formData();
  const parsed = subscribeSchema.safeParse({
    email: formData.get("email"),
    locale,
  });

  if (!parsed.success) {
    return { ok: false as const, error: "invalid" as const, locale };
  }

  const result = await submitSubscriber(parsed.data);
  if (!result.ok) {
    return { ok: false as const, error: result.error, locale };
  }
  return { ok: true as const, status: result.status, locale };
}

export const meta: Route.MetaFunction = ({ data }) => {
  const locale = data?.locale ?? DEFAULT_LOCALE;
  const publicUrl = data?.publicUrl ?? "";
  const title = t(locale, "homepage_title");
  const description = t(locale, "homepage_subtitle");
  return [
    { title },
    { name: "description", content: description },
    ...hreflangMeta(publicUrl, locale, ""),
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: locale },
    { property: "og:url", content: `${publicUrl}/${locale}` },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": publicUrl,
        url: publicUrl,
        name: "Tedros",
        description,
        inLanguage: locale,
        potentialAction: {
          "@type": "SearchAction",
          target: `${publicUrl}/${locale}/rights?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    },
  ];
};

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
  const { locale } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const submitted = actionData?.ok === true;
  const errorKey = actionData?.ok === false ? "subscribe_error_invalid" : null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── HERO ── full-bleed, community background image */}
      <section
        className="relative isolate flex min-h-[85vh] flex-col overflow-hidden"
        aria-label={t(locale, "homepage_subtitle")}
      >
        {/* Background photo — Ethiopian-Israeli community celebration */}
        <img
          src="https://images.unsplash.com/photo-1545917958-c5dce6c24633?fm=webp&q=80&w=1600&fit=crop"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />

        {/* Tibeb diamond pattern — subtle geometric overlay */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none"
          style={{ opacity: 0.07 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="tibeb-diamond"
              x="0"
              y="0"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M24 3L45 24L24 45L3 24Z"
                fill="none"
                stroke="#FCDD09"
                strokeWidth="1"
              />
              <path
                d="M24 11L37 24L24 37L11 24Z"
                fill="none"
                stroke="#078930"
                strokeWidth="0.6"
              />
              <circle cx="24" cy="24" r="2" fill="#DA121A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tibeb-diamond)" />
        </svg>

        {/* Gradient scrim — dark on the text side, fades to transparent */}
        <div
          className="absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to left, oklch(0.15 0.04 35 / 0.9) 0%, oklch(0.15 0.04 35 / 0.65) 50%, oklch(0.15 0.04 35 / 0.25) 100%)",
          }}
        />

        {/* Ethiopian flag stripe at the very top */}
        <div className="flag-stripe h-1.5 w-full" aria-hidden="true" />

        {/* Header — site title + language switcher */}
        <div className="container-default flex items-center justify-between pt-5">
          <span className="font-display text-2xl font-bold tracking-tight text-white drop-shadow">
            {t(locale, "homepage_title")}
          </span>
          <nav className="flex gap-1 text-sm" aria-label={t(locale, "lang_switcher_label")}>
            {(["he", "en", "am"] as const).map((lang) => (
              <Link
                key={lang}
                to={`/${lang}`}
                hrefLang={lang}
                className="rounded-md px-3 py-1.5 text-white/80 hover:bg-white/15 hover:text-white"
              >
                {t(locale, `lang_${lang}`)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hero content */}
        <div className="container-default flex flex-1 flex-col justify-end pb-16 pt-10">
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight tracking-tight text-white drop-shadow sm:text-5xl lg:text-6xl">
            {t(locale, "homepage_subtitle")}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85 drop-shadow-sm">
            {t(locale, "homepage_intro")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/${locale}/rights`}
              className="rounded-lg bg-accent-green px-6 py-3 text-base font-semibold text-white shadow-md transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              {t(locale, "hero_cta_rights")}
            </Link>
            <a
              href="#subscribe"
              className="rounded-lg border border-white/60 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              {t(locale, "hero_cta_community")}
            </a>
          </div>
        </div>
      </section>

      {/* ── PILLARS GRID ── */}
      <main className="container-default py-14">
        <section>
          <h2 className="font-display text-xl font-semibold tracking-tight text-earth-900">
            {t(locale, "pillars_heading")}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PILLARS.map((p) => {
              const liveHref: Record<string, string> = {
                realestate: `/${locale}/cities`,
                rights: `/${locale}/rights`,
                professionals: `/${locale}/professionals`,
                education: `/${locale}/education`,
                employment: `/${locale}/careers`,
                health: `/${locale}/health`,
                heritage: `/${locale}/heritage/events`,
                news: `/${locale}/news`,
                family: `/${locale}/family`,
              };
              const href = liveHref[p] ?? null;
              const isLive = href !== null;
              const imgSrc = PILLAR_IMAGES[p];

              const tile = (
                <>
                  {/* Card image */}
                  {imgSrc && (
                    <div className="relative aspect-[16/9] overflow-hidden bg-earth-100">
                      <img
                        src={imgSrc}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Thin flag-stripe accent at bottom of image */}
                      <div
                        className="flag-stripe absolute bottom-0 inset-x-0 h-[3px] opacity-70"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                  {/* Card body */}
                  <div className="flex flex-col gap-2 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-base font-semibold text-earth-900">
                        {t(locale, `pillar_${p}_title`)}
                      </h3>
                      {isLive ? (
                        <span className="shrink-0 rounded-full bg-accent-green/15 px-2.5 py-0.5 text-[11px] font-medium text-accent-green ring-1 ring-accent-green/30">
                          {t(locale, "pillar_live")}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-accent-yellow/30 px-2.5 py-0.5 text-[11px] font-medium text-earth-900 ring-1 ring-accent-yellow/40">
                          {t(locale, "pillar_coming_soon")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-ink-600">
                      {t(locale, `pillar_${p}_summary`)}
                    </p>
                  </div>
                </>
              );

              const baseClass =
                "group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-xs transition-all";
              const hoverClass = isLive
                ? "hover:-translate-y-0.5 hover:border-accent-green/60 hover:shadow-md"
                : "hover:-translate-y-0.5 hover:border-earth-400 hover:shadow-sm";

              return href ? (
                <Link key={p} to={href} className={`${baseClass} ${hoverClass}`}>
                  {tile}
                </Link>
              ) : (
                <article key={p} className={`${baseClass} ${hoverClass}`}>
                  {tile}
                </article>
              );
            })}
          </div>
        </section>

        {/* Tibeb divider */}
        <div className="tibeb-divider my-12" aria-hidden="true" />

        {/* Supporting hubs */}
        <section>
          <h3 className="font-display text-base font-semibold tracking-tight text-earth-700">
            {t(locale, "pillars_more_heading")}
          </h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { slug: "glossary", glyph: "📖", titleKey: "glossary_landing_title" },
              { slug: "orgs", glyph: "🏛️", titleKey: "orgs_landing_title" },
              { slug: "programs", glyph: "🎓", titleKey: "programs_landing_title" },
              { slug: "compare", glyph: "⚖️", titleKey: "comparisons_landing_title" },
            ].map((h) => (
              <Link
                key={h.slug}
                to={`/${locale}/${h.slug}`}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm shadow-xs transition-all hover:-translate-y-0.5 hover:border-accent-green/60 hover:shadow-sm"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  {h.glyph}
                </span>
                <span className="font-medium text-earth-900">
                  {t(locale, h.titleKey)}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Subscribe */}
        <section
          id="subscribe"
          className="mt-20 rounded-2xl border border-border bg-surface p-8 sm:p-10"
        >
          <h2 className="font-display text-2xl font-semibold tracking-tight text-earth-900">
            {t(locale, "subscribe_heading")}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-600">
            {t(locale, "subscribe_subtitle")}
          </p>

          {submitted ? (
            <p
              role="status"
              className="mt-5 rounded-md bg-accent-green/10 px-4 py-3 text-sm text-accent-green ring-1 ring-accent-green/20"
            >
              {t(locale, "subscribe_success")}
            </p>
          ) : (
            <Form
              method="post"
              action="?index"
              className="mt-5 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="email" className="sr-only">
                {t(locale, "subscribe_email_label")}
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder={t(locale, "subscribe_email_placeholder")}
                className="flex-1 rounded-md border border-input bg-card px-4 py-2.5 text-base text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 focus:outline-none"
                aria-invalid={errorKey ? true : undefined}
                aria-describedby={errorKey ? "email-error" : undefined}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-primary px-5 py-2.5 text-base font-medium text-primary-foreground shadow-sm transition hover:bg-earth-700 disabled:opacity-60"
              >
                {t(locale, "subscribe_button")}
              </button>
            </Form>
          )}

          {errorKey && (
            <p id="email-error" role="alert" className="mt-3 text-sm text-destructive">
              {t(locale, errorKey)}
            </p>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            {t(locale, "subscribe_privacy_note")}
          </p>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </div>
  );
}
