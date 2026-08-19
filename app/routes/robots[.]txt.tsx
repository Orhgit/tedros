import { getEnv } from "~/lib/env.server";

/**
 * Resource route — `/robots.txt`. No default export, only loader.
 * Per ADR-005 + Lighthouse SEO `robots-txt` audit (worth ~4 points).
 * Sitemap reference points at the dynamic sitemap-index that ADR-005
 * promises; until the per-section sitemaps land we serve a minimal stub
 * at `/sitemap.xml` (see app/routes/sitemap[.]xml.tsx).
 *
 * AI-crawler agents are listed explicitly (not just covered by `User-agent: *`)
 * per ADR-018 — a deliberate GEO/AEO decision, not an accidental default.
 */
export function loader() {
  const { PUBLIC_URL } = getEnv();
  const body = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Perplexity-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${PUBLIC_URL}/sitemap.xml
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
