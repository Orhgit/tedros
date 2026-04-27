import type { Meta, StoryObj } from "@storybook/react";
import { ArticleTemplate } from "./article-template";

const meta: Meta<typeof ArticleTemplate> = {
  title: "Page Templates/Article",
  component: ArticleTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type S = StoryObj<typeof ArticleTemplate>;

export const Mortgage: S = {
  args: {
    title: "המשכנתא הקהילתית: 600,000 ש״ח, 0% בעשור הראשון",
    subtitle: "כל מה שחשוב לדעת — תנאים, זכאות, ולוטו.",
    author: { name: "ד״ר אדמסו אלי", initials: "א" },
    publishedAt: "2026-04-12",
    readTimeMin: 7,
    breadcrumbs: [
      { label: "בית", href: "/he" },
      { label: "מאמרים", href: "/he/articles" },
      { label: "דיור" },
    ],
    body: (
      <>
        <p>
          תוכנית המשכנתא הקהילתית ייחודית: 600 אלף ש״ח, 0% ריבית בעשור הראשון, 5% הון עצמי
          בלבד.
        </p>
        <h2 className="mt-6 text-2xl font-bold">איך נרשמים?</h2>
        <p>ההרשמה ב־70 ש״ח בסניף הבנק.</p>
      </>
    ),
  },
};
