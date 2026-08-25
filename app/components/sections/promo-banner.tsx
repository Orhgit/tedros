import { useState } from "react";
import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

const PROMO_HREF = "https://merkaz-h.co.il/campaign/miami-residence";

// Colors sampled from merkaz-h.co.il's own campaign page so the banner
// reads as a continuation of their brand, not a generic ad strip.
export function PromoBanner({ locale }: { locale: Locale }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label={t(locale, "promo_banner_label")}
      className="relative z-40 overflow-hidden bg-[#1c2b45] text-white"
    >
      <div className="container-default flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-10 py-2.5 text-center text-sm sm:text-base">
        <span aria-hidden className="text-lg">
          🏝️
        </span>
        <span className="font-medium">{t(locale, "promo_banner_text")}</span>
        <span className="rounded-full bg-[#deb459] px-2.5 py-0.5 text-sm font-extrabold text-[#1c2b45] shadow-sm">
          {t(locale, "promo_banner_price")}
        </span>
        <a
          href={PROMO_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-full bg-[#25d366] px-3 py-1 text-sm font-bold text-[#0b3320] shadow-sm transition hover:bg-[#1fbd5a]"
        >
          {t(locale, "promo_banner_cta")}
        </a>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label={t(locale, "promo_banner_dismiss")}
        className="absolute end-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-lg leading-none text-white/80 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
