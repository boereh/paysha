import type { Book } from "$lib/stores/books";
import { lastCronDate } from "$lib/utils.js";
import { nanoid } from "nanoid";

export function load({ params: { slug } }) {
  const book: Book = {
    id: slug,
    title: "Sample Budget Server",
    author: nanoid(),
    coauthors: [],
    pages: [
      {
        id: nanoid(),
        title: "Work Income",
        transactions: [
          {
            id: nanoid(),
            amount: 553,
            label: "DD from Amce, Inc.",
            date: lastCronDate("0 2 * * 4") || new Date(),
          },
        ],
        recurring: [
          {
            id: nanoid(),
            amount: 553,
            label: "DD from Amce, Inc.",
            cron: "0 2 * * 4",
            skip: [],
          },
        ],
      },
      {
        id: nanoid(),
        title: "Bills",
        transactions: [
          {
            id: nanoid(),
            amount: 800,
            label: "Rent",
            date: lastCronDate("0 0 1 * *") || new Date(),
          },
        ],
        recurring: [
          {
            id: nanoid(),
            amount: -850,
            label: "Rent",
            cron: "0 0 1 * *",
            skip: [],
          },
        ],
      },
    ],
  };

  return {
    book,
  };
}
