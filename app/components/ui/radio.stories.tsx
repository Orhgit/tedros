import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./radio";

const meta: Meta<typeof Radio> = {
  title: "Primitives/Radio",
  component: Radio,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Radio>;

export const Group: S = {
  render: () => (
    <fieldset className="space-y-2 text-sm">
      <legend className="font-medium">סוג עסקה</legend>
      <label className="flex items-center gap-2">
        <Radio name="rg" defaultChecked /> מכירה
      </label>
      <label className="flex items-center gap-2">
        <Radio name="rg" /> השכרה
      </label>
      <label className="flex items-center gap-2">
        <Radio name="rg" /> השקעה
      </label>
    </fieldset>
  ),
};
