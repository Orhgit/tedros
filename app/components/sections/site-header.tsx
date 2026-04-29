import { Link } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { Button } from "../ui/button";
import { LangSwitcher } from "../ui/lang-switcher";
import { NavMenu } from "../ui/nav-menu";

export interface SiteHeaderProps {
  locale: Locale;
  currentPath?: string;
  user?: { name: string } | null;
  // Owner directive: by default, the public site does not surface a login
  // button — anyone can browse and subscribe. Logged-in flows (dashboard,
  // agency) opt in by setting `showAuth=true`.
  showAuth?: boolean;
}

export function SiteHeader({
  locale,
  currentPath = "",
  user = null,
  showAuth = false,
}: SiteHeaderProps) {
  const base = `/${locale}`;
  // Only surface pillars that are live in production. Coming-soon ones are
  // shown on the homepage tile grid with a "soon" badge — but they don't
  // belong in the global nav until the routes exist.
  const items = [
    { href: `${base}/cities`, label: t(locale, "nav_listings") },
    { href: `${base}/rights`, label: t(locale, "nav_rights") },
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
        {t(locale, "nav_home")}
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
          <div className="hidden md:block">
            <NavMenu items={items} ariaLabel={t(locale, "nav_home")} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <LangSwitcher current={locale} hrefFor={hrefForLocale} />
          {showAuth &&
            (user ? (
              <Button asChild variant="outline" size="sm">
                <Link to={`${base}/dashboard`}>{user.name}</Link>
              </Button>
            ) : (
              <Button asChild size="sm">
                <Link to={`${base}/login`}>{t(locale, "nav_login")}</Link>
              </Button>
            ))}
        </div>
      </div>

      {/* On mobile (<md) the inline nav row is hidden; render it below the
          brand bar so users still get the pillar links. The lang switcher is
          always inline above. */}
      <nav
        className="container-default flex gap-2 overflow-x-auto pb-2 md:hidden"
        aria-label={t(locale, "nav_home")}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            aria-current={item.current ? "page" : undefined}
            className={`inline-flex shrink-0 items-center rounded-md px-3 py-1.5 text-sm transition ${
              item.current
                ? "bg-earth-800 text-white"
                : "text-foreground hover:bg-muted"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
