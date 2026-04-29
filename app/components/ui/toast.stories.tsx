import type { Meta, StoryObj } from "@storybook/react";
import { Toast, ToastViewport } from "./toast";

const meta: Meta<typeof Toast> = {
  title: "Primitives/Toast",
  component: Toast,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Toast>;

export const Info: S = { args: { heading: "מידע", description: "פעולה אינפורמטיבית." } };
export const Success: S = {
  args: { variant: "success", heading: "נשמר", description: "השינויים נשמרו." },
};
export const Destructive: S = {
  args: { variant: "destructive", heading: "שגיאה", description: "לא הצליח." },
};

export const Stack: S = {
  render: () => (
    <ToastViewport>
      <Toast heading="מידע" description="פעולה אינפורמטיבית." />
      <Toast variant="success" heading="נשמר" description="כל השינויים נשמרו." />
      <Toast variant="destructive" heading="שגיאה" description="נסו שוב בעוד רגע." />
    </ToastViewport>
  ),
};
