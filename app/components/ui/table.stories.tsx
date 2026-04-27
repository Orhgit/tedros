import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

const meta: Meta<typeof Table> = {
  title: "Primitives/Table",
  component: Table,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Table>;

const fmt = (n: number) => "₪" + new Intl.NumberFormat("he-IL").format(n);

export const Listings: S = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>עיר</TableHead>
          <TableHead>חדרים</TableHead>
          <TableHead>מ"ר</TableHead>
          <TableHead className="text-end">מחיר</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>נתניה</TableCell>
          <TableCell>
            <bdi>4</bdi>
          </TableCell>
          <TableCell>
            <bdi>95</bdi>
          </TableCell>
          <TableCell className="text-end font-medium">
            <bdi>{fmt(1850000)}</bdi>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>רחובות</TableCell>
          <TableCell>
            <bdi>3</bdi>
          </TableCell>
          <TableCell>
            <bdi>78</bdi>
          </TableCell>
          <TableCell className="text-end font-medium">
            <bdi>{fmt(1620000)}</bdi>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
