import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";
import { Label } from "./label";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Input>;

export const Default: S = { args: { placeholder: "הקלד..." } };
export const WithLabel: S = {
  render: () => (
    <div className="w-72 space-y-1.5">
      <Label htmlFor="ie">אימייל</Label>
      <Input id="ie" type="email" dir="ltr" placeholder="name@example.com" />
    </div>
  ),
};
export const Invalid: S = { args: { "aria-invalid": true, defaultValue: "לא תקין" } };
export const Disabled: S = { args: { disabled: true, defaultValue: "ערך קבוע" } };
