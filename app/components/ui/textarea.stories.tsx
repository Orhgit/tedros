import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "Primitives/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Textarea>;

export const Default: S = { args: { placeholder: "ספר לנו...", rows: 4 } };
export const Invalid: S = {
  args: { "aria-invalid": true, defaultValue: "תוכן לא תקני" },
};
