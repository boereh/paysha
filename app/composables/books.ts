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
import { get, set, createStore, keys, values } from "idb-keyval";
import { nanoid } from "nanoid";

export type Book = InferOutput<typeof BOOK_SCHEMA>;
export type Transaction = InferOutput<typeof TRANSACTION_SCHEMA>;
export type RecurringTransaction = InferOutput<typeof RECURRING_SCHEMA>;

export const useBookStore = () => createStore("paysha", "books");
export const useBooks = () => useState<Book[]>("books", () => []);
export const useCurrentBook = () =>
  useState<Book | null>("current-book", () => null);

export const RECURRING_SCHEMA = object({
  id: string(),
  amount: number(),
  label: string(),
  tags: array(string()),
  wallet: string(),
  cron: string(),
  skip: array(date()),
});

export const TRANSACTION_SCHEMA = object({
  id: string(),
  amount: number(),
  label: string(),
  tags: array(string()),
  wallet: string(),
  date: date(),
});

export const BOOK_SCHEMA = object({
  id: string(),
  title: string(),
  author: string(),
  coauthors: array(string()),
  created: date(),
  transactions: array(TRANSACTION_SCHEMA),
  recurring: array(RECURRING_SCHEMA),
  local: optional(boolean()),
});

export async function createBook(opts?: { title?: string }) {
  const session = await auth_client.getSession();
  const store = useBookStore();
  const router = useRouter();

  const id = nanoid();

  if (!session.data?.user) {
    await set(
      id,
      {
        id,
        title: opts?.title || "Untitled book",
        author: "",
        coauthors: [],
        created: new Date(),
        transactions: [],
        recurring: [],
        local: true,
      },
      store,
    );

    return router.push(`/books/${id}`);
  }

  const response = await fetch("/api/books/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      title: opts?.title || "Untitled book",
      author: "",
      coauthors: [],
      created: new Date(),
      transactions: [],
      recurring: [],
      local: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create book: ${response.statusText}`);
  }

  const book = await response.json();
  await set(id, book, store);

  return router.push(`/books/${id}`);
}
