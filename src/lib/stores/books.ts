import { writable } from "svelte/store";
import { nanoid } from "nanoid";
import {
  object,
  string,
  array,
  date,
  number,
  boolean,
  optional,
  type InferOutput,
} from "valibot";
import { lastCronDate } from "$lib/utils";

export const books = writable<Book[]>([]);
export const selected_book = writable<Book | undefined>();

export const RECURRING_SCHEMA = object({
  id: string(),
  amount: number(),
  label: string(),
  cron: string(),
  skip: array(date()),
});

export const TRANSACTION_SCHEMA = object({
  id: string(),
  amount: number(),
  label: string(),
  date: date(),
});

export const PAGE_SCHEMA = object({
  id: string(),
  title: string(),
  transactions: array(TRANSACTION_SCHEMA),
  recurring: array(RECURRING_SCHEMA),
});

export const BOOK_SCHEMA = object({
  id: string(),
  title: string(),
  author: string(),
  coauthors: array(string()),
  pages: array(PAGE_SCHEMA),
  local: optional(boolean()),
});

export type Book = InferOutput<typeof BOOK_SCHEMA>;
export type Page = InferOutput<typeof PAGE_SCHEMA>;

export const SAMPLE_BOOK: Book = {
  id: "what",
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
