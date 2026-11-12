import { getEnv } from "~/lib/env.server";
import { buildSitemapXml, sitemapResponse } from "~/lib/seo/sitemap.server";

/**
 * Health sitemap — the health hub pages.
 *
 * TED-187: the 40 condition detail pages are no longer submitted. They are
 * noindex in the route (YMYL medical content with no clinician behind it),
 * and a noindex page must never be submitted — the TED-173 rule. The
 * /health/conditions index itself stays.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();

  const paths = [
    "/health/conditions",
    "/health/mental-health",
    "/health/mental-health/interpreter",
    "/health/mental-health/hospitalization-rights",
    "/health/mental-health/culturally-competent-care",
    "/health/services",
    "/health/rights",
    "/health/traditional-medicine",
    "/health/nutrition",
  ];

  return sitemapResponse(buildSitemapXml(PUBLIC_URL, paths));
}
