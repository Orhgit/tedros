import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Avatar>;

export const Initials: S = { args: { initials: "ת", alt: "תמר" } };
export const Sizes: S = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar size="sm" initials="א" alt="א" />
      <Avatar size="md" initials="ב" alt="ב" />
      <Avatar size="lg" initials="ג" alt="ג" />
      <Avatar size="xl" initials="ד" alt="ד" />
    </div>
  ),
};
