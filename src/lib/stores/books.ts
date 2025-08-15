import { writable } from "svelte/store";
import {
  object,
  string,
  array,
  type InferOutput,
  regex,
  NANO_ID_REGEX,
  pipe,
  date,
  number,
  boolean,
  optional,
} from "valibot";

export const books = writable<Book[]>([]);
export const selected_book = writable<Book | undefined>();

const nanoid = (msg?: string) => pipe(string(msg), regex(NANO_ID_REGEX));

export const RECURRING_SCHEMA = object({
  id: nanoid(),
  amount: number(),
  label: string(),
  cron: string(),
  skip: array(date()),
});

export const TRANSACTION_SCHEMA = object({
  id: nanoid(),
  amount: number(),
  label: string(),
  date: date(),
});

export const PAGE_SCHEMA = object({
  id: nanoid(),
  title: string(),
  transactions: array(TRANSACTION_SCHEMA),
  recurring: array(RECURRING_SCHEMA),
});

export const BOOK_SCHEMA = object({
  id: nanoid(),
  title: string(),
  author: nanoid(),
  coauthors: array(nanoid()),
  pages: array(PAGE_SCHEMA),
  local: optional(boolean()),
});

export type Book = InferOutput<typeof BOOK_SCHEMA>;
export type Page = InferOutput<typeof PAGE_SCHEMA>;
