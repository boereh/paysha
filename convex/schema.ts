import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const RECURRING_SCHEMA = defineTable({
  bookid: v.string(),
  amount: v.number(),
  label: v.string(),
  tags: v.array(v.string()),
  wallet: v.string(),
  cron: v.string(),
  skip: v.array(v.number()),
});

export const TRANSACTION_SCHEMA = defineTable({
  bookid: v.string(),
  amount: v.number(),
  label: v.string(),
  tags: v.array(v.string()),
  wallet: v.string(),
  date: v.number(),
});

export const BOOK_SCHEMA = defineTable({
  title: v.string(),
  author: v.string(),
  coauthors: v.array(v.string()),
});

export default defineSchema({
  books: BOOK_SCHEMA,
  transactions: TRANSACTION_SCHEMA,
  recurrings: RECURRING_SCHEMA,
});
