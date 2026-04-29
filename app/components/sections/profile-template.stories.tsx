import type { Meta, StoryObj } from "@storybook/react";
import { ProfileTemplate } from "./profile-template";

const meta: Meta<typeof ProfileTemplate> = {
  title: "Page Templates/Profile",
  component: ProfileTemplate,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};
export default meta;
type S = StoryObj<typeof ProfileTemplate>;

export const Broker: S = {
  args: {
    name: "יוסי טדלה",
    initials: "י",
    profession: "מתווך דירות בכיר",
    city: "נתניה",
    languages: ["עברית", "אמהרית", "אנגלית"],
    rating: 4.8,
    reviewCount: 42,
    verified: true,
    bio: <p>12 שנה בתחום הנדל״ן בנתניה. מתמחה בהתחדשות עירונית.</p>,
    contactPhone: "050-1234567",
    contactEmail: "yossi@tedros.example",
  },
};
