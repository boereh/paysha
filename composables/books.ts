import { defineStore } from "pinia";
import {
  string,
  object,
  length,
  pipe,
  safeParse,
  type InferInput,
  array,
  date,
  number,
  literal,
  union,
  custom,
} from "valibot";
import { createStorage } from "unstorage";
import idb from "unstorage/drivers/indexedb";
import { randMovie } from "@ngneat/falso";
import { nanoid } from "nanoid";

const uid = pipe(string(), length(21));

export const TRANSACTION_SCHEMA = object({
  id: uid,
  name: string(),
  page: uid,
  modified: date(),
  created: date(),
  amount: number(),
  type: union([literal("income"), literal("expense")]),
  tags: array(string()),
});

export type Transaction = InferInput<typeof TRANSACTION_SCHEMA>;

export const PAGE_SCHEMA = object({
  id: uid,
  name: string(),
  book: uid,
  modified: date(),
  created: date(),
  transactions: array(TRANSACTION_SCHEMA),
});

export type Page = InferInput<typeof PAGE_SCHEMA>;

export const BOOK_SCHEMA = object({
  id: uid,
  name: string(),
  author: array(string()),
  pages: array(PAGE_SCHEMA),
  modified: date(),
  created: date(),
});

export type Book = InferInput<typeof BOOK_SCHEMA>;

export const useBookStorage = (opts?: { store?: string; base?: string }) =>
  createStorage({
    driver: idb({
      dbName: "paysha",
      storeName: opts?.store || "books",
      base: opts?.store || "",
    }),
  });

export const useBooks = defineStore("useBooks", () => {
  const books = shallowRef<Book[]>([]);

  if (window) {
    const storage = useBookStorage();

    storage.getKeys().then(async (keys) => {
      for (const key of keys) {
        const book = await storage.get<Book>(key);

        if (!book) continue;

        try {
          book.created = new Date(book.created);
          book.modified = new Date(book.modified);
        } catch (e) {
          continue;
        }

        if (!safeParse(BOOK_SCHEMA, book).success) continue;

        books.value = [...books.value, book];
      }
    });

    watch(books, (v) => v.map((b) => storage.set(b.id, b)));
  }

  async function fetch() {}

  return { books, fetch };
});

function createFakeBooks(): Book[] {
  return Array.from({ length: 5 }).map(() => ({
    id: nanoid(),
    author: ["boe"],
    created: new Date(),
    modified: new Date(),
    name: randMovie(),
    pages: [],
  }));
}
