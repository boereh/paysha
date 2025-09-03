import { integer, text, sqliteTable, real } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const BOOK_TABLE = sqliteTable("book", {
  id: text().primaryKey().$defaultFn(nanoid),
  title: text().notNull(),
  author: text().notNull(),
  coauthors: text({ mode: "json" }).$type<string[]>().notNull(),
  created: integer({ mode: "timestamp" }).notNull(),
});

export const RECURRING_TABLE = sqliteTable("recurring", {
  id: text().primaryKey().$defaultFn(nanoid),
  bookid: text().notNull(),
  amount: real().notNull(),
  label: text().notNull(),
  tags: text({ mode: "json" }).$type<string[]>().notNull(),
  wallet: text().notNull(),
  cron: text().notNull(),
  skip: text({ mode: "json" }).$type<string[]>().notNull(),
});

export const TRANSACTION_TABLE = sqliteTable("transaction", {
  id: text().primaryKey().$defaultFn(nanoid),
  bookid: text().notNull(),
  amount: real().notNull(),
  label: text().notNull(),
  tags: text({ mode: "json" }).$type<string[]>().notNull(),
  wallet: text().notNull(),
  date: integer({ mode: "timestamp" }).notNull(),
});
