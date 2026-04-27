import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright config for QA accessibility scans.
 *
 * `pnpm a11y` (defined in package.json) builds the app and starts the
 * production server with deterministic CI env values, then runs the
 * axe-core matrix in tests/a11y. Reports land in qa/axe-results/.
 */
const PORT = Number(process.env.PORT ?? 4173);

export default defineConfig({
  testDir: "tests/a11y",
  timeout: 60_000,
  fullyParallel: false,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "qa/axe-results/playwright-report.json" }]],
  use: {
    baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`,
    headless: true,
    locale: "he-IL",
    timezoneId: "Asia/Jerusalem",
    viewport: { width: 1280, height: 900 },
    actionTimeout: 5_000,
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
