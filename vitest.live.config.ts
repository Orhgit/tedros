import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vitest/config";

// Live-network checks, run on a schedule rather than on a PR — see
// `.github/workflows/sigd-source-watch.yml`. They fetch third-party sites,
// so a failure here means "go look", not "the build is broken".
const appDir = fileURLToPath(new URL("./app", import.meta.url));

export default defineConfig({
  resolve: { alias: { "~": appDir } },
  test: {
    environment: "node",
    globals: false,
    include: ["tests/live/**/*.live.test.ts"],
    testTimeout: 45_000,
    hookTimeout: 45_000,
    retry: 2,
  },
});
