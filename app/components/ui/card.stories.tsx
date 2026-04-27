import type { Meta, StoryObj } from "@storybook/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Card>;

export const Basic: S = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>כותרת הכרטיס</CardTitle>
        <CardDescription>תיאור משני</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">תוכן רגיל בתוך הכרטיס.</p>
      </CardContent>
      <CardFooter className="border-t border-border pt-3">
        <Button size="sm">פעולה</Button>
      </CardFooter>
    </Card>
  ),
};
