/**
 * DataForSEO client for Tedros.
 *
 * Deliberately separate from the merkaz-haneshasim tooling: its own cache
 * directory (data/seo-cache/), its own `tedros` tag on every task, its own
 * defaults (Israel / Hebrew). The account is shared; the data is not.
 *
 * Every call caches to disk keyed by endpoint+payload, because Labs data moves
 * monthly at best and re-running a diagnosis should not re-spend.
 */
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = new URL("../../", import.meta.url).pathname;
const CACHE_DIR = path.join(ROOT, "data/seo-cache");

async function loadEnv() {
  const raw = await fs.readFile(path.join(ROOT, ".env"), "utf8").catch(() => "");
  for (const line of raw.split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

export const IL = { location_code: 2376, language_code: "he" };

export async function dfs(endpoint, payload, { refresh = false } = {}) {
  await loadEnv();
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) throw new Error("DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD missing from .env");

  const key = crypto.createHash("md5")
    .update(endpoint + JSON.stringify(payload)).digest("hex").slice(0, 12);
  const cachePath = path.join(CACHE_DIR, `${endpoint.replace(/\//g, "_")}-${key}.json`);

  if (!refresh) {
    const hit = await fs.readFile(cachePath, "utf8").then(JSON.parse).catch(() => null);
    if (hit) return hit;
  }

  const res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${login}:${password}`).toString("base64"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{ tag: "tedros", ...payload }]),
  });
  const json = await res.json();
  if (json.status_code !== 20000) throw new Error(`${json.status_code} ${json.status_message}`);
  const task = json.tasks?.[0];
  if (task?.status_code !== 20000) throw new Error(`task ${task?.status_code} ${task?.status_message}`);

  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(cachePath, JSON.stringify(task.result, null, 2));
  return task.result;
}
