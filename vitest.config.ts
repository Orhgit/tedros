import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

const appDir = fileURLToPath(new URL("./app", import.meta.url));

export default defineConfig({
  resolve: {
    alias: { "~": appDir },
  },
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: [],
    include: ["tests/**/*.test.{ts,tsx}", "app/**/*.test.{ts,tsx}"],
    // Live-network checks. They fetch third-party sites, so they must never
    // gate a PR — a source host having a bad afternoon is not a reason to
    // block a deploy. The `sigd-source-watch` workflow runs them on a
    // schedule with `--mode live` and opens an issue when one fails.
    exclude: ["**/node_modules/**", "**/dist/**", "tests/live/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
    },
  },
});
