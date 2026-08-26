import { Link } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { LangSwitcher } from "../ui/lang-switcher";
import { NavMenu } from "../ui/nav-menu";

export interface SiteHeaderProps {
  locale: Locale;
  currentPath?: string;
}

export function SiteHeader({ locale, currentPath = "" }: SiteHeaderProps) {
  const base = `/${locale}`;
  // Every live pillar gets a nav entry — health/family/voice/careers were
  // reachable only from the footer (TED-124). The inline nav moves to lg+
  // to fit the longer list; below that, the scrollable pill row carries it.
  const items = [
    { href: `${base}/cities`, label: t(locale, "nav_listings") },
    { href: `${base}/rights`, label: t(locale, "nav_rights") },
    { href: `${base}/careers`, label: t(locale, "pillar_employment_title") },
    { href: `${base}/health`, label: t(locale, "pillar_health_title") },
    { href: `${base}/education`, label: t(locale, "nav_education") },
    { href: `${base}/family`, label: t(locale, "pillar_family_title") },
    { href: `${base}/voice`, label: t(locale, "pillar_voice_title") },
    { href: `${base}/professionals`, label: t(locale, "nav_professionals") },
  ].map((i) => ({ ...i, current: currentPath.startsWith(i.href) }));

  // Switch to other locale, preserving the rest of the path.
  const hrefForLocale = (next: Locale) => {
    if (!currentPath || currentPath === "/") return `/${next}`;
    const parts = currentPath.split("/").filter(Boolean);
    parts[0] = next;
    return `/${parts.join("/")}`;
  };

  return (
    <header
      role="banner"
      className="sticky top-0 z-(--z-sticky) border-b border-border bg-background/85 backdrop-blur-md"
    >
      <a href="#main-content" className="sr-skip">
        {t(locale, "skip_to_content")}
      </a>
      <div className="container-default flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            to={base}
            className="flex items-center gap-2 rounded-xs font-display text-xl font-bold tracking-tight text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <span aria-hidden className="size-2.5 rounded-full bg-primary" />
            <span>{t(locale, "homepage_title")}</span>
          </Link>
          <div className="hidden lg:block">
            <NavMenu items={items} ariaLabel={t(locale, "nav_main_label")} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LangSwitcher current={locale} hrefFor={hrefForLocale} />
        </div>
      </div>

      {/* Below lg the inline nav row is hidden; render it below the brand
          bar so users still get the pillar links. The lang switcher is
          always inline above. */}
      <nav
        className="container-default flex gap-2 overflow-x-auto pb-2 lg:hidden"
        aria-label={t(locale, "nav_main_label")}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            aria-current={item.current ? "page" : undefined}
            className={`inline-flex min-h-10 shrink-0 items-center rounded-md px-3 py-2 text-sm transition ${
              item.current ? "bg-earth-800 text-white" : "text-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
