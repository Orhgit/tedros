import { Link } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { Button } from "../ui/button";
import { Icon } from "../ui/icon";

export interface HeroProps {
  locale: Locale;
}

export function Hero({ locale }: HeroProps) {
  const base = `/${locale}`;
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-earth-50 to-background"
    >
      <div aria-hidden className="flag-stripe absolute inset-x-0 top-0 h-1" />
      <div className="container-default grid items-center gap-10 py-16 md:grid-cols-[1.2fr_1fr] md:py-24">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" />
            {locale === "he"
              ? 'MVP נדל"ן בקרוב • בטא קהילתית'
              : locale === "en"
                ? "Real-estate MVP soon • Community beta"
                : "ሪል እስቴት MVP በቅርቡ"}
          </p>
          <h1
            id="hero-title"
            className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl"
          >
            {t(locale, "homepage_title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {t(locale, "homepage_subtitle")}
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t(locale, "homepage_intro")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to={`${base}/listings`}>
                {t(locale, "nav_listings")}
                <Icon name="arrow-end" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={`${base}/rights`}>{t(locale, "nav_rights")}</Link>
            </Button>
          </div>
        </div>
        <div
          aria-hidden
          className="relative hidden aspect-square rounded-xl border border-border bg-surface shadow-lg md:block"
        >
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-3 p-6">
            <div className="col-span-2 row-span-2 rounded-lg bg-earth-200" />
            <div className="rounded-lg bg-accent-green/30" />
            <div className="rounded-lg bg-warning/40" />
            <div className="col-span-2 rounded-lg bg-card shadow-sm" />
            <div className="rounded-lg bg-destructive/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
