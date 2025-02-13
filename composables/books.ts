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
  is,
} from "valibot";
import { createStorage, type StorageValue, type Storage } from "unstorage";
import idb from "unstorage/drivers/indexedb";
import { randMovie } from "@ngneat/falso";
import { nanoid } from "nanoid";
import { useIndexedDB } from "./storage";

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

export const useBooks = defineStore("useBooks", () => {
  const books = shallowRef<Book[]>([]);
  const is_loading = ref(false);
  let storage: Storage<StorageValue> | null = null;

  async function load() {
    if (typeof window === "undefined") return;
    if (is_loading.value) return;
    is_loading.value = true;

    storage = useIndexedDB({ store: "books" });

    for (const key of await storage.getKeys()) {
      const book = await storage.get<Book>(key);
      console.log(key);

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

    is_loading.value = false;
  }

  watch(books, async (books) => {
    if (!storage || is_loading.value) return;

    for (const book of books) await storage.set(book.id, book);
  });

  return { books, load, is_loading };
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
