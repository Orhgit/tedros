import type { Meta, StoryObj } from "@storybook/react";
import { Icon, type IconName } from "./icon";

const ALL: IconName[] = [
  "home",
  "search",
  "heart",
  "share",
  "user",
  "globe",
  "menu",
  "close",
  "check",
  "alert",
  "info",
  "arrow-end",
  "chevron-end",
  "phone",
  "mail",
  "map-pin",
  "sun",
  "moon",
  "star",
  "settings",
  "plus",
];

const meta: Meta<typeof Icon> = {
  title: "Foundations/Icons",
  component: Icon,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Icon>;

export const Single: S = { args: { name: "heart", title: "heart" } };
export const Grid: S = {
  render: () => (
    <div className="grid grid-cols-7 gap-3">
      {ALL.map((n) => (
        <div key={n} className="flex flex-col items-center gap-1 text-xs">
          <Icon name={n} title={n} />
          <p className="text-2xs font-mono text-muted-foreground">{n}</p>
        </div>
      ))}
    </div>
  ),
};
