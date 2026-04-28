import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { Dialog, DialogFooter } from "./dialog";
import { Button } from "./button";

const meta: Meta<typeof Dialog> = {
  title: "Primitives/Dialog",
  component: Dialog,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Dialog>;

export const Confirmation: S = {
  render: () => {
    const ref = useRef<HTMLDialogElement>(null);
    return (
      <>
        <Button onClick={() => ref.current?.showModal()}>פתח</Button>
        <Dialog ref={ref} heading="אישור פעולה" description="פעולה זו תמחק את הפנייה.">
          <p className="text-sm">אין דרך לבטל לאחר אישור.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => ref.current?.close()}>
              ביטול
            </Button>
            <Button variant="destructive" onClick={() => ref.current?.close()}>
              מחיקה
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};
