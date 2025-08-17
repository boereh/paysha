import {
  object,
  string,
  array,
  date,
  number,
  boolean,
  optional,
} from "valibot";

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
  pid: number(),
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
