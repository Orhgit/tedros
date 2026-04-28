import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Switch>;

export const Off: S = {};
export const On: S = { args: { defaultChecked: true } };
export const WithLabel: S = {
  render: () => (
    <label className="inline-flex items-center gap-2 text-sm">
      <Switch defaultChecked aria-label="dark mode" />
      מצב כהה
    </label>
  ),
};
