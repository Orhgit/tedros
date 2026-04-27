import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "Primitives/Combobox",
  component: Combobox,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Combobox>;

const options = [
  { value: "Netanya", label: "נתניה" },
  { value: "Rehovot", label: "רחובות" },
  { value: "Rishon", label: "ראשון לציון" },
  { value: "KiryatMalakhi", label: "קרית מלאכי" },
];

export const Cities: S = {
  args: { options, placeholder: "הקלד עיר..." },
  render: (args) => <Combobox {...args} className="w-72" />,
};
