/**
 * rank-audit.mjs — what Google actually shows for Tedros, independent of GSC.
 *
 * GSC tells you impressions dropped. It does not tell you whether the rankings
 * behind them still exist. This pulls DataForSEO's ranked-keyword database for
 * tedros.co.il and then re-checks a sample against a LIVE SERP, because the
 * Labs database is a crawl snapshot and can be weeks stale — during a ranking
 * collapse the stale rows are exactly the ones that mislead you.
 *
 * Usage:
 *   node scripts/seo/rank-audit.mjs                 # database only, cached, free
 *   node scripts/seo/rank-audit.mjs --verify 15     # + live SERP for top 15 by volume
 */
import { dfs, IL } from "./dfs-client.mjs";

const arg = (n, d) => { const i = process.argv.indexOf(n); return i !== -1 ? process.argv[i + 1] : d; };
const VERIFY = process.argv.includes("--verify") ? Number(arg("--verify", 10)) : 0;

const res = (await dfs("dataforseo_labs/google/ranked_keywords/live", {
  target: "tedros.co.il", ...IL, limit: 700,
  order_by: ["keyword_data.keyword_info.search_volume,desc"],
}))?.[0];

const rows = (res?.items ?? []).map((i) => ({
  kw: i.keyword_data.keyword,
  sv: i.keyword_data.keyword_info.search_volume ?? 0,
  pos: i.ranked_serp_element.serp_item.rank_absolute,
  url: (i.ranked_serp_element.serp_item.relative_url || i.ranked_serp_element.serp_item.url || "").replace("https://tedros.co.il", ""),
  seen: i.ranked_serp_element.last_updated_time.slice(0, 10),
})).sort((a, b) => b.sv - a.sv);

const bucket = (p) => (p <= 3 ? "1-3" : p <= 10 ? "4-10" : p <= 20 ? "11-20" : p <= 50 ? "21-50" : "51+");
const hist = {};
rows.forEach((r) => (hist[bucket(r.pos)] = (hist[bucket(r.pos)] || 0) + 1));

console.log(`ranked keywords: ${rows.length}`);
console.log("position distribution:", hist);
console.log(`page-1 share: ${((rows.filter((r) => r.pos <= 10).length / rows.length) * 100).toFixed(1)}%`);

if (!VERIFY) process.exit(0);

console.log(`\nlive re-check of the top ${VERIFY} by search volume:`);
let gone = 0, aio = 0;
for (const r of rows.slice(0, VERIFY)) {
  const items = (await dfs("serp/google/organic/live/advanced", { keyword: r.kw, ...IL, device: "desktop", depth: 100 }))?.[0]?.items ?? [];
  const mine = items.find((i) => (i.domain || "").includes("tedros"));
  const hasAio = items.some((i) => i.type === "ai_overview");
  const depth = items.filter((i) => i.type === "organic").length;
  if (hasAio) aio++;
  if (!mine) gone++;
  console.log(`  ${r.kw.padEnd(34)} sv:${String(r.sv).padStart(5)}  db:${String(r.pos).padStart(3)} (${r.seen})  live:${mine ? mine.rank_absolute : "ABSENT"}  serp_depth:${depth}${hasAio ? "  AIO" : ""}`);
}
console.log(`\nabsent from live top-100: ${gone}/${VERIFY}   AI Overview present: ${aio}/${VERIFY}`);
