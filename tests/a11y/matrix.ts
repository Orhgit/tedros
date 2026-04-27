/**
 * Phase 2 QA scan matrix.
 *
 * The 10 "stories" required by TED-18 map to sections on the live design
 * playground (`app/routes/$lang.design.tsx`). Each section has a stable
 * `id` we can scope the axe run to via `AxeBuilder.include`.
 *
 * Locales: he (RTL), en (LTR), am (LTR Ge'ez).
 * Themes:  light, dark.
 *
 * Per the issue scope:
 *   - Stories: each story × {he-light, he-dark, en-light}.
 *   - Routes:  each /lang/design × {light, dark}.
 */

export type Locale = "he" | "en" | "am";
export type Theme = "light" | "dark";

export interface Story {
  /** Stable id used as both display name and `#anchor` hash on the playground. */
  id: string;
  /** Human-friendly name as listed in the issue. */
  label: string;
  /** CSS selector axe-core will scope its rules to. */
  selector: string;
}

export const STORIES: readonly Story[] = [
  { id: "buttons", label: "Button", selector: "section#buttons" },
  { id: "inputs", label: "Input", selector: "section#inputs" },
  { id: "form", label: "Form", selector: "section#form" },
  { id: "dialog", label: "Dialog", selector: "section#dialog" },
  { id: "nav", label: "NavMenu", selector: "section#nav" },
  { id: "listing", label: "ListingCard", selector: "section#listing" },
  { id: "hero", label: "Hero", selector: "section#hero" },
  { id: "article", label: "ArticleTemplate", selector: "section#article" },
  { id: "profile", label: "ProfileTemplate", selector: "section#profile" },
  { id: "lead", label: "LeadForm", selector: "section#lead" },
];

export const STORY_MATRIX: Array<{ locale: Locale; theme: Theme }> = [
  { locale: "he", theme: "light" },
  { locale: "he", theme: "dark" },
  { locale: "en", theme: "light" },
];

export const ROUTE_MATRIX: Array<{ locale: Locale; theme: Theme }> = [
  { locale: "he", theme: "light" },
  { locale: "he", theme: "dark" },
  { locale: "en", theme: "light" },
  { locale: "en", theme: "dark" },
  { locale: "am", theme: "light" },
  { locale: "am", theme: "dark" },
];

/** WCAG 2.1 AA tag set used by both story and route runs. */
export const AA_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
