import { getEnv } from "~/lib/env.server";

/**
 * Notify IndexNow (Bing/Google) about new or updated URLs.
 * No-ops outside of production or when INDEXNOW_KEY is unset.
 */
export async function pingIndexNow(urls: string[]): Promise<void> {
  const { NODE_ENV, PUBLIC_URL, INDEXNOW_KEY } = getEnv();
  if (NODE_ENV !== "production" || !INDEXNOW_KEY || urls.length === 0) return;

  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(PUBLIC_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: `${PUBLIC_URL}/indexnow.txt`,
        urlList: urls,
      }),
    });
  } catch {
    // Non-fatal — indexing will happen via sitemap crawl as fallback
  }
}
