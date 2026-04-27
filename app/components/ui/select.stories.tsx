import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Select>;

export const Default: S = {
  render: () => (
    <Select className="w-60" defaultValue="">
      <option value="" disabled>
        בחר עיר
      </option>
      <option>נתניה</option>
      <option>רחובות</option>
      <option>ראשון לציון</option>
      <option>קרית מלאכי</option>
    </Select>
  ),
};
