import type { Preview } from "@storybook/react";
import { withThemeByClassName } from "@storybook/addon-themes";
import "../app/app.css";

/**
 * Global decorators:
 *  - Locale toolbar: he / en / am — sets <html lang> and <html dir>.
 *  - Theme toolbar: light / dark — toggles `.dark` class on <html>.
 *  - a11y: axe runs on every story.
 */

type Locale = "he" | "en" | "am";

const LOCALE_DIR: Record<Locale, "rtl" | "ltr"> = {
  he: "rtl",
  en: "ltr",
  am: "ltr",
};

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    options: {
      storySort: {
        order: [
          "Foundations",
          ["Brand", "Color", "Typography", "Spacing"],
          "Primitives",
          "Composition",
          "Page Templates",
        ],
      },
    },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: true }] } },
    backgrounds: {
      default: "earth",
      values: [
        { name: "earth", value: "#FBF5EC" },
        { name: "card", value: "#ffffff" },
        { name: "dark", value: "#1A1611" },
      ],
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "i18n locale",
      defaultValue: "he",
      toolbar: {
        icon: "globe",
        items: [
          { value: "he", title: "עברית (RTL)" },
          { value: "en", title: "English (LTR)" },
          { value: "am", title: "አማርኛ (LTR · Ge'ez)" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, ctx) => {
      const locale = (ctx.globals.locale ?? "he") as Locale;
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("lang", locale);
        document.documentElement.setAttribute("dir", LOCALE_DIR[locale]);
      }
      return <Story />;
    },
    withThemeByClassName({
      themes: { light: "", dark: "dark" },
      defaultTheme: "light",
    }),
  ],
};

export default preview;
