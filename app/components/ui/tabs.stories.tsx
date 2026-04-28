import type { Meta, StoryObj } from "@storybook/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Tabs>;

export const Real: S = {
  render: () => (
    <Tabs defaultValue="sale" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="sale">מכירה</TabsTrigger>
        <TabsTrigger value="rent">השכרה</TabsTrigger>
        <TabsTrigger value="urban">התחדשות</TabsTrigger>
      </TabsList>
      <TabsContent value="sale">תוכן: מכירה</TabsContent>
      <TabsContent value="rent">תוכן: השכרה</TabsContent>
      <TabsContent value="urban">תוכן: התחדשות עירונית</TabsContent>
    </Tabs>
  ),
};
