import type { Meta, StoryObj } from "@storybook/react";
import { NavMenu } from "./nav-menu";

const meta: Meta<typeof NavMenu> = {
  title: "Primitives/NavMenu",
  component: NavMenu,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof NavMenu>;

export const Primary: S = {
  args: {
    ariaLabel: "ראשי",
    items: [
      { label: 'נדל"ן', href: "#", current: true },
      { label: "זכויות", href: "#" },
      { label: "אנשי מקצוע", href: "#" },
      { label: "מאמרים", href: "#" },
    ],
  },
};
