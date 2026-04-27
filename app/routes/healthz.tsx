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

export async function loader(_args: Route.LoaderArgs) {
  const [database] = await Promise.all([checkDb()]);
  const allOk = database.ok;
  const body = {
    status: allOk ? "ok" : "degraded",
    uptime_s: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
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
