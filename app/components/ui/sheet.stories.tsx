import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { Sheet } from "./sheet";
import { Button } from "./button";

const meta: Meta<typeof Sheet> = {
  title: "Primitives/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Sheet>;

export const FilterSheet: S = {
  render: () => {
    const ref = useRef<HTMLDialogElement>(null);
    return (
      <>
        <Button variant="outline" onClick={() => ref.current?.showModal()}>
          סינון מתקדם
        </Button>
        <Sheet ref={ref} side="end" heading="סינון">
          <p className="text-sm">בחר טווח מחירים, חדרים, ועוד.</p>
          <Button className="mt-4" onClick={() => ref.current?.close()}>
            סגור
          </Button>
        </Sheet>
      </>
    );
  },
};
