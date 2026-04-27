import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { SiteHeader } from "./site-header";

const meta: Meta<typeof SiteHeader> = {
  title: "Page Templates/SiteHeader",
  component: SiteHeader,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="-m-4">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: { layout: "fullscreen" },
};
export default meta;
type S = StoryObj<typeof SiteHeader>;

export const Anonymous: S = { args: { locale: "he", currentPath: "/he" } };
export const SignedIn: S = {
  args: { locale: "he", currentPath: "/he/listings", user: { name: "תמר" } },
};
