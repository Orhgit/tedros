#!/usr/bin/env node
/**
 * Per-route client budget + drift guard for the `size-limit` entries.
 *
 * `size-limit` (see the `size-limit` block in package.json) budgets the initial
 * payload of two named pages. That is the number a user actually downloads, but
 * two named pages cannot see:
 *
 *   1. a heavy dependency landing on some *other* lazily-loaded route, and
 *   2. the size-limit globs silently drifting out of date — if the build starts
 *      emitting a shared chunk under a name no glob matches, the budgeted number
 *      quietly understates reality and the gate stops meaning anything.
 *
 * This script closes both. See docs/adr/022-measure-the-payload-users-download.md.
 */

import { readdirSync, readFileSync } from "node:fs";
import { brotliCompressSync } from "node:zlib";
import { join } from "node:path";

const ASSETS = "build/client/assets";

/** No single lazily-loaded route chunk may exceed this, brotlied. */
const ROUTE_CHUNK_LIMIT = 20_000;

/**
 * Route chunk prefixes whose full initial payload has a `size-limit` budget.
 * The glob list in package.json must cover exactly the static import closure of
 * each of these; anything else is drift, and this script fails on it.
 */
const BUDGETED_ROUTES = [
  "_lang._index-",
  "_lang.calculator.mortgage-ethiopian-immigrants-",
];

/** Chunks every page loads before any route chunk is resolved. */
const SHELL = ["entry.client-", "root-", "_lang-", "manifest-"];

const files = readdirSync(ASSETS).filter((f) => f.endsWith(".js"));
const brotli = (f) => brotliCompressSync(readFileSync(join(ASSETS, f))).length;
const startingWith = (prefix) => files.filter((f) => f.startsWith(prefix));

/** Static (not dynamic) `./chunk.js` imports — what the browser must fetch up front. */
function staticImports(file) {
  const source = readFileSync(join(ASSETS, file), "utf8");
  const found = new Set();
  const pattern = /(?:from|import)"\.\/([^"]+\.js)"/g;
  let match;
  while ((match = pattern.exec(source)) !== null) found.add(match[1]);
  return [...found];
}

function closure(roots) {
  const seen = new Set();
  const queue = [...roots];
  while (queue.length > 0) {
    const file = queue.pop();
    if (seen.has(file)) continue;
    seen.add(file);
    for (const dep of staticImports(file)) {
      if (files.includes(dep) && !seen.has(dep)) queue.push(dep);
    }
  }
  return seen;
}

const failures = [];

// 1. No single route chunk may become a dependency dumping ground.
const oversized = files
  .filter((f) => f.startsWith("_lang"))
  .map((f) => ({ file: f, bytes: brotli(f) }))
  .filter((r) => r.bytes > ROUTE_CHUNK_LIMIT)
  .sort((a, b) => b.bytes - a.bytes);

for (const { file, bytes } of oversized) {
  failures.push(
    `route chunk over budget: ${file} is ${(bytes / 1000).toFixed(2)} kB brotlied, ` +
      `limit ${(ROUTE_CHUNK_LIMIT / 1000).toFixed(0)} kB. ` +
      `A single route should not pull in a heavy dependency — code-split it or drop the dependency.`,
  );
}

// 2. The size-limit globs must still cover the real initial payload.
const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const globbedBasenames = new Set(
  packageJson["size-limit"]
    .flatMap((entry) => (Array.isArray(entry.path) ? entry.path : [entry.path]))
    .map((p) => p.slice(p.lastIndexOf("/") + 1).replace(/\*\.js$/, ""))
    .flatMap((prefix) => startingWith(prefix)),
);

for (const route of BUDGETED_ROUTES) {
  const roots = [...SHELL, route].flatMap(startingWith);
  const missed = [...closure(roots)].filter((f) => !globbedBasenames.has(f)).sort();
  if (missed.length > 0) {
    failures.push(
      `size-limit globs no longer cover the initial payload of ${route}*: ` +
        `${missed.join(", ")} is downloaded but unbudgeted. ` +
        `Add a glob for it to the "size-limit" block in package.json.`,
    );
  }
}

if (failures.length > 0) {
  console.error("\nRoute chunk / payload coverage check failed:\n");
  for (const failure of failures) console.error(`  ✗ ${failure}\n`);
  process.exit(1);
}

const largest = files
  .filter((f) => f.startsWith("_lang"))
  .map((f) => ({ file: f, bytes: brotli(f) }))
  .sort((a, b) => b.bytes - a.bytes)[0];

console.log(
  `  route chunks: ${files.filter((f) => f.startsWith("_lang")).length}, ` +
    `largest ${(largest.bytes / 1000).toFixed(2)} kB brotlied ` +
    `(${largest.file}), limit ${(ROUTE_CHUNK_LIMIT / 1000).toFixed(0)} kB\n` +
    `  size-limit globs cover the full initial payload of every budgeted route\n`,
);
