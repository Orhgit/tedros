import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { SiteFooter } from "./site-footer";

const meta: Meta<typeof SiteFooter> = {
  title: "Page Templates/SiteFooter",
  component: SiteFooter,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: { layout: "fullscreen" },
};
export default meta;
type S = StoryObj<typeof SiteFooter>;

export const Hebrew: S = { args: { locale: "he" } };
