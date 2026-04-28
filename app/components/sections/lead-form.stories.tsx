import type { Meta, StoryObj } from "@storybook/react";
import { LeadForm } from "./lead-form";

const meta: Meta<typeof LeadForm> = {
  title: "Page Templates/LeadForm",
  component: LeadForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
};
export default meta;
type S = StoryObj<typeof LeadForm>;

export const ListingLead: S = {
  args: { topic: "listing", topicLabel: "דירת 4 חדרים, נתניה — דורה" },
  render: (args) => (
    <div className="container-narrow">
      <LeadForm {...args} />
    </div>
  ),
};
export const ProfessionalLead: S = {
  args: { topic: "professional", topicLabel: "יועץ משכנתאות — אבי וונדוסן" },
  render: (args) => (
    <div className="container-narrow">
      <LeadForm {...args} />
    </div>
  ),
};
