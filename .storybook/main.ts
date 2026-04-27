import type { StorybookConfig } from "@storybook/react-vite";

/**
 * To install (Engineer, Phase 3):
 *   pnpm add -D storybook @storybook/react-vite @storybook/addon-essentials \
 *              @storybook/addon-a11y @storybook/addon-themes
 *   pnpm storybook
 *
 * Then add to package.json scripts:
 *   "storybook": "storybook dev -p 6006",
 *   "build-storybook": "storybook build"
 *
 * Tedros stories cover all 20+ primitives + page templates, in HE/EN/AM
 * with light/dark themes via @storybook/addon-themes.
 */
const config: StorybookConfig = {
  stories: ["../app/**/*.mdx", "../app/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: { autodocs: "tag" },
  typescript: { reactDocgen: "react-docgen-typescript" },
};

export default config;
