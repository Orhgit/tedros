import type { Meta, StoryObj } from "@storybook/react";
import { FormControl, FormDescription, FormField, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { Button } from "./button";

const meta: Meta<typeof FormField> = {
  title: "Composition/Form",
  component: FormField,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof FormField>;

export const ContactBasic: S = {
  render: () => (
    <form className="w-96 space-y-5">
      <FormField>
        <FormLabel required>שם מלא</FormLabel>
        <FormControl>
          <Input name="name" required placeholder="שם פרטי ושם משפחה" />
        </FormControl>
        <FormDescription>נשתמש כדי לפנות אליך בלבד.</FormDescription>
      </FormField>
      <FormField invalid>
        <FormLabel required>טלפון</FormLabel>
        <FormControl>
          <Input name="phone" dir="ltr" aria-invalid defaultValue="abc" />
        </FormControl>
        <FormMessage>נא להזין מספר תקני.</FormMessage>
      </FormField>
      <Button type="submit">שליחה</Button>
    </form>
  ),
};
