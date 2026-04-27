import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { LangSwitcher } from "./lang-switcher";

const meta: Meta<typeof LangSwitcher> = {
  title: "Primitives/LangSwitcher",
  component: LangSwitcher,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};
export default meta;
type S = StoryObj<typeof LangSwitcher>;

export const Hebrew: S = { args: { current: "he", hrefFor: (l) => `/${l}` } };
export const English: S = { args: { current: "en", hrefFor: (l) => `/${l}` } };
export const Amharic: S = { args: { current: "am", hrefFor: (l) => `/${l}` } };
