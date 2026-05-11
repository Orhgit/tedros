// Reusable YMYL disclaimer banner for Health Hub pages (RIN-653/654/655/656/657).
// variant="standard" — general health information disclaimer.
// variant="mental-health" — adds ERAN crisis line prominently.
//
// Rendered on EVERY health route per quality bar.

import type { Locale } from "~/lib/i18n/config";
import { t } from "~/lib/i18n/messages";

interface HealthDisclaimerProps {
  locale: Locale;
  variant: "standard" | "mental-health";
}

export function HealthDisclaimer({ locale, variant }: HealthDisclaimerProps) {
  return (
    <div aria-label={t(locale, "health_disclaimer_aria_label")}>
      {/* Mental-health crisis line — above the fold, prominent red card */}
      {variant === "mental-health" && (
        <div
          role="alert"
          className="mb-4 rounded-xl border-2 border-red-600 bg-red-50 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-base font-bold text-red-800">
                {t(locale, "health_eran_label")}
              </p>
              <p className="mt-1 text-sm text-red-700">
                {t(locale, "health_mental_health_crisis_body")}
              </p>
            </div>
            <a
              href="tel:1201"
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-5 py-2.5 font-display text-xl font-bold text-white shadow-sm transition hover:bg-red-700 sm:shrink-0"
              aria-label={`${t(locale, "health_eran_label")} — ${t(locale, "health_eran_number")}`}
            >
              {t(locale, "health_eran_number")}
            </a>
          </div>
        </div>
      )}

      {/* Standard YMYL disclaimer */}
      <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <p>
          <span className="font-semibold">{t(locale, "health_disclaimer_label")}: </span>
          {t(locale, "health_disclaimer_standard")}
        </p>
      </div>
    </div>
  );
}
