import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "destructive",
        "outline",
        "sigd",
      ],
    },
  },
  args: { children: "תווית" },
};
export default meta;
type S = StoryObj<typeof Badge>;

export const Default: S = {};
export const All: S = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge>ברירת מחדל</Badge>
      <Badge variant="primary">חדש</Badge>
      <Badge variant="success">פעיל</Badge>
      <Badge variant="warning">מוגבל</Badge>
      <Badge variant="destructive">בוטל</Badge>
      <Badge variant="outline">טיוטה</Badge>
      <Badge variant="sigd">סיגד</Badge>
    </div>
  ),
};
