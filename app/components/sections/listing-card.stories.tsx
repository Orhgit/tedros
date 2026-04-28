import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";
import { ListingCard } from "./listing-card";

const meta: Meta<typeof ListingCard> = {
  title: "Page Templates/ListingCard",
  component: ListingCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-80">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};
export default meta;
type S = StoryObj<typeof ListingCard>;

export const Sale: S = {
  args: {
    href: "#",
    title: "דירת 4 חדרים, התחדשות עירונית",
    city: "נתניה",
    neighborhood: "דורה",
    priceILS: 1850000,
    rooms: 4,
    sizeM2: 95,
    badges: [
      { label: "התחדשות", variant: "primary" },
      { label: "תוכנית 600K", variant: "success" },
    ],
  },
};

export const Rent: S = {
  args: {
    href: "#",
    title: "דירת 3 חדרים להשכרה",
    city: "רחובות",
    neighborhood: "קרית משה",
    pricePerMonthILS: 5400,
    rooms: 3,
    sizeM2: 78,
    badges: [{ label: "השכרה" }],
  },
};
