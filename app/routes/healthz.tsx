import { sql } from "drizzle-orm";
import type { Route } from "./+types/healthz";
import { db } from "~/lib/db.server";

type CheckResult = { ok: true } | { ok: false; error: string };

async function checkDb(): Promise<CheckResult> {
  try {
    await db.execute(sql`select 1`);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Heap usage, so a leak is visible on a dashboard before it becomes another
 * `FATAL ERROR: Reached heap limit` (TED-166). `heap_limit_mb` reflects the
 * `--max-old-space-size` set in the Dockerfile; `heap_used_pct` climbing and
 * never falling across scrapes is the signal to alert on.
 */
function memory() {
  const { rss, heapUsed, heapTotal } = process.memoryUsage();
  const mb = (bytes: number) => Math.round(bytes / 1024 / 1024);
  return {
    rss_mb: mb(rss),
    heap_used_mb: mb(heapUsed),
    heap_total_mb: mb(heapTotal),
  };
}

export async function loader(_args: Route.LoaderArgs) {
  const [database] = await Promise.all([checkDb()]);
  const allOk = database.ok;
  const body = {
    status: allOk ? "ok" : "degraded",
    uptime_s: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    memory: memory(),
    checks: { database },
  };
  return new Response(JSON.stringify(body, null, 2), {
    status: allOk ? 200 : 503,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
