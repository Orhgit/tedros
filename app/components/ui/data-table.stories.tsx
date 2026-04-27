import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./data-table";

interface Lead {
  id: string;
  name: string;
  city: string;
  status: string;
}

const meta: Meta<typeof DataTable<Lead>> = {
  title: "Primitives/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof DataTable<Lead>>;

const rows: Lead[] = [
  { id: "1", name: "תמר אדמסו", city: "נתניה", status: "פתוח" },
  { id: "2", name: "אבי וונדוסן", city: "רחובות", status: "בטיפול" },
  { id: "3", name: "שירה טדלה", city: "ראשון", status: "סגור" },
];

export const Leads: S = {
  args: {
    rowKey: (r: Lead) => r.id,
    rows,
    columns: [
      { id: "name", header: "שם", cell: (r: Lead) => r.name },
      { id: "city", header: "עיר", cell: (r: Lead) => r.city },
      { id: "status", header: "סטטוס", cell: (r: Lead) => r.status, align: "end" },
    ],
  },
};

export const Empty: S = {
  args: {
    rowKey: (r: Lead) => r.id,
    rows: [],
    columns: [
      { id: "name", header: "שם", cell: (r: Lead) => r.name },
      { id: "city", header: "עיר", cell: (r: Lead) => r.city },
    ],
    emptyState: "אין לידים פעילים כרגע.",
  },
};
