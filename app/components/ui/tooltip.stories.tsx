import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";
import { Button } from "./button";
import { Icon } from "./icon";

const meta: Meta<typeof Tooltip> = {
  title: "Primitives/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};
export default meta;
type S = StoryObj<typeof Tooltip>;

export const TopSide: S = {
  args: { content: "הוסף למועדפים", side: "top" },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline" size="icon" aria-label="favorite">
        <Icon name="heart" />
      </Button>
    </Tooltip>
  ),
};
