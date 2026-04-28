import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { Hero } from "./hero";

const meta: Meta<typeof Hero> = {
  title: "Page Templates/Hero",
  component: Hero,
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
type S = StoryObj<typeof Hero>;

export const Hebrew: S = { args: { locale: "he" } };
export const English: S = { args: { locale: "en" } };
export const Amharic: S = { args: { locale: "am" } };
