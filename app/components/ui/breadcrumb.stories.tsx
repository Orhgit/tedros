import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumb } from "./breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "Primitives/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Breadcrumb>;

export const RealEstate: S = {
  args: {
    items: [
      { label: "בית", href: "/he" },
      { label: 'נדל"ן', href: "/he/listings" },
      { label: "נתניה", href: "/he/listings/netanya" },
      { label: "דורה" },
    ],
  },
};
