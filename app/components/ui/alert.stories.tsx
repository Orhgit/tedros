import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Icon } from "./icon";

const meta: Meta<typeof Alert> = {
  title: "Primitives/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "destructive"],
    },
  },
};
export default meta;
type S = StoryObj<typeof Alert>;

export const Info: S = {
  render: (args) => (
    <Alert {...args}>
      <Icon name="info" />
      <AlertTitle>מידע</AlertTitle>
      <AlertDescription>זוהי הודעה אינפורמטיבית.</AlertDescription>
    </Alert>
  ),
};
export const Success: S = {
  args: { variant: "success" },
  render: (args) => (
    <Alert {...args}>
      <Icon name="check" />
      <AlertTitle>נשמר בהצלחה</AlertTitle>
      <AlertDescription>הפרטים שלך עודכנו.</AlertDescription>
    </Alert>
  ),
};
export const Warning: S = {
  args: { variant: "warning" },
  render: (args) => (
    <Alert {...args}>
      <Icon name="alert" />
      <AlertTitle>תשומת לב</AlertTitle>
      <AlertDescription>חלון הפנייה ייסגר בעוד 10 דקות.</AlertDescription>
    </Alert>
  ),
};
export const Destructive: S = {
  args: { variant: "destructive" },
  render: (args) => (
    <Alert {...args}>
      <Icon name="alert" />
      <AlertTitle>שגיאה</AlertTitle>
      <AlertDescription>לא ניתן לשמור. נסו שוב.</AlertDescription>
    </Alert>
  ),
};
