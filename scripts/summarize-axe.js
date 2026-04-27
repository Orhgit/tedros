#!/usr/bin/env node
/**
 * Aggregates the per-cell JSON files written by tests/a11y/axe.spec.ts
 * into a single summary table + per-rule rollup.
 *
 * Output: stdout markdown.
 */
import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const dir = resolve(process.cwd(), "qa/axe-results");

function fmtCells(cells) {
  return cells.map((v) => (v === 0 ? "0" : `**${v}**`)).join(" · ");
}

const files = (await readdir(dir)).filter(
  (f) => f.endsWith(".json") && f !== "playwright-report.json",
);
const reports = await Promise.all(
  files.map(async (f) => JSON.parse(await readFile(resolve(dir, f), "utf8"))),
);

const stories = reports.filter((r) => r.scope === "story");
const routes = reports.filter((r) => r.scope === "route");

const ruleCount = new Map();
const ruleImpact = new Map();
for (const r of reports) {
  for (const v of r.violations ?? []) {
    ruleCount.set(v.id, (ruleCount.get(v.id) ?? 0) + (v.nodes?.length ?? 1));
    ruleImpact.set(v.id, v.impact);
  }
}

const lines = [];
lines.push("## Stories — story × locale × theme");
lines.push("");
lines.push("| Story | he-light | he-dark | en-light |");
lines.push("|---|---:|---:|---:|");
const storyOrder = [
  "Button",
  "Input",
  "Form",
  "Dialog",
  "NavMenu",
  "ListingCard",
  "Hero",
  "ArticleTemplate",
  "ProfileTemplate",
  "LeadForm",
];
for (const label of storyOrder) {
  const find = (locale, theme) =>
    stories.find((s) => s.story === label && s.locale === locale && s.theme === theme)
      ?.violations?.length ?? "—";
  const cells = [find("he", "light"), find("he", "dark"), find("en", "light")];
  lines.push(`| ${label} | ${fmtCells(cells)} |`);
}

lines.push("");
lines.push("## Full design routes — `/{lang}/design`");
lines.push("");
lines.push("| Route | light | dark |");
lines.push("|---|---:|---:|");
for (const locale of ["he", "en", "am"]) {
  const find = (theme) =>
    routes.find((r) => r.locale === locale && r.theme === theme)?.violations?.length ??
    "—";
  lines.push(`| /${locale}/design | ${fmtCells([find("light"), find("dark")])} |`);
}

lines.push("");
lines.push("## Violation rollup (failing nodes across all 36 scans)");
lines.push("");
lines.push("| Rule | Impact | Failing nodes | WCAG |");
lines.push("|---|---|---:|---|");
const sorted = Array.from(ruleCount.entries()).sort((a, b) => b[1] - a[1]);
for (const [id, count] of sorted) {
  const sample = reports.flatMap((r) => r.violations ?? []).find((v) => v.id === id);
  const wcag = (sample?.tags ?? [])
    .filter((t) => t.startsWith("wcag2a") || t.startsWith("wcag21"))
    .join(" ");
  lines.push(`| \`${id}\` | ${ruleImpact.get(id) ?? "—"} | ${count} | ${wcag} |`);
}

lines.push("");
lines.push(
  `Total scans: ${reports.length}. ` +
    `Pass: ${reports.filter((r) => (r.violations ?? []).length === 0).length}. ` +
    `Fail: ${reports.filter((r) => (r.violations ?? []).length > 0).length}.`,
);

process.stdout.write(lines.join("\n") + "\n");
