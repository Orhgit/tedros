import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./pagination";

const meta: Meta<typeof Pagination> = {
  title: "Primitives/Pagination",
  component: Pagination,
  tags: ["autodocs"],
};
export default meta;
type S = StoryObj<typeof Pagination>;

export const Middle: S = {
  args: { page: 5, pageCount: 12, hrefFor: (p: number) => `?page=${p}` },
};
export const FirstPage: S = {
  args: { page: 1, pageCount: 8, hrefFor: (p: number) => `?page=${p}` },
};
export const LastPage: S = {
  args: { page: 8, pageCount: 8, hrefFor: (p: number) => `?page=${p}` },
};
