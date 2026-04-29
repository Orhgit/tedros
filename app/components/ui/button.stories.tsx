import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";
import { Icon } from "./icon";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "outline",
        "ghost",
        "link",
        "destructive",
        "success",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
  },
  args: { children: "פעולה" },
};
export default meta;

type S = StoryObj<typeof Button>;

export const Primary: S = { args: { variant: "primary" } };
export const Secondary: S = { args: { variant: "secondary" } };
export const Outline: S = { args: { variant: "outline" } };
export const Ghost: S = { args: { variant: "ghost" } };
export const LinkVariant: S = { args: { variant: "link" } };
export const Destructive: S = { args: { variant: "destructive", children: "מחיקה" } };
export const SuccessVariant: S = { args: { variant: "success", children: "אישור" } };

export const Sizes: S = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="search">
        <Icon name="search" />
      </Button>
    </div>
  ),
};

export const WithIcon: S = {
  render: () => (
    <Button>
      <Icon name="plus" />
      הוספה
    </Button>
  ),
};

export const Disabled: S = { args: { disabled: true } };
