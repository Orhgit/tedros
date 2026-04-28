import { Link } from "react-router";
import type { Locale } from "~/lib/i18n/config";
import { SUPPORTED_LOCALES } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";
import { cn } from "~/lib/utils";

export interface LangSwitcherProps {
  current: Locale;
  hrefFor: (locale: Locale) => string;
  className?: string;
}

export function LangSwitcher({ current, hrefFor, className }: LangSwitcherProps) {
  return (
    <nav
      aria-label={t(current, "lang_switcher_label")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md border border-border bg-card p-0.5 text-sm",
        className,
      )}
    >
      {SUPPORTED_LOCALES.map((locale) => {
        const active = locale === current;
        return (
          <Link
            key={locale}
            to={hrefFor(locale)}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={cn(
              "inline-flex h-8 items-center rounded-sm px-3 transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
              active
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            {t(current, `lang_${locale}`)}
          </Link>
        );
      })}
    </nav>
  );
}
