import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { AA_TAGS, ROUTE_MATRIX, STORIES, STORY_MATRIX, type Theme } from "./matrix";

const RESULTS_DIR = resolve(process.cwd(), "qa/axe-results");

async function setTheme(page: Page, theme: Theme) {
  await page.evaluate((t) => {
    document.documentElement.classList.toggle("dark", t === "dark");
  }, theme);
  // small settle for any class-based transitions
  await page.waitForTimeout(50);
}

async function persistResult(name: string, payload: unknown) {
  const path = resolve(RESULTS_DIR, `${name}.json`);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, JSON.stringify(payload, null, 2), "utf8");
}

test.describe("phase-2 axe AA matrix", () => {
  // ─── Stories: 10 × {he-light, he-dark, en-light} = 30 scopes ───
  for (const story of STORIES) {
    for (const cell of STORY_MATRIX) {
      const name = `story__${story.id}__${cell.locale}-${cell.theme}`;
      test(name, async ({ page }) => {
        await page.goto(`/${cell.locale}/design#${story.id}`);
        await setTheme(page, cell.theme);
        await page.locator(story.selector).first().waitFor({ state: "visible" });

        const results = await new AxeBuilder({ page })
          .include(story.selector)
          .withTags(AA_TAGS)
          .analyze();

        await persistResult(name, {
          scope: "story",
          story: story.label,
          locale: cell.locale,
          theme: cell.theme,
          url: page.url(),
          violations: results.violations,
          incomplete: results.incomplete,
          passes: results.passes.length,
          inapplicable: results.inapplicable.length,
        });

        expect.soft(results.violations, "axe AA violations").toHaveLength(0);
      });
    }
  }

  // ─── Full design routes: 3 × {light, dark} = 6 ───
  for (const cell of ROUTE_MATRIX) {
    const name = `route__design__${cell.locale}-${cell.theme}`;
    test(name, async ({ page }) => {
      await page.goto(`/${cell.locale}/design`);
      await setTheme(page, cell.theme);
      await page.locator("#main-content").waitFor({ state: "visible" });

      const results = await new AxeBuilder({ page })
        .withTags(AA_TAGS)
        // Skip the toast announcement region — it's empty until a button
        // is clicked and is intentionally rendered out-of-flow.
        .exclude("[role='status']:empty")
        .analyze();

      await persistResult(name, {
        scope: "route",
        route: `/${cell.locale}/design`,
        locale: cell.locale,
        theme: cell.theme,
        url: page.url(),
        violations: results.violations,
        incomplete: results.incomplete,
        passes: results.passes.length,
        inapplicable: results.inapplicable.length,
      });

      expect.soft(results.violations, "axe AA violations").toHaveLength(0);
    });
  }
});
