import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Checkbox>;

export const Unchecked: S = {};
export const Checked: S = { args: { defaultChecked: true } };
export const Disabled: S = { args: { disabled: true } };
export const WithLabel: S = {
  render: () => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox defaultChecked /> הוספה למועדפים
    </label>
  ),
};
