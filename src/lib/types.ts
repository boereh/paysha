import type { InferOutput } from "valibot";
import type {
  BOOK_SCHEMA,
  PAGE_SCHEMA,
  TRANSACTION_SCHEMA,
} from "./schemas/books";

export type Book = InferOutput<typeof BOOK_SCHEMA>;
export type Page = InferOutput<typeof PAGE_SCHEMA>;
export type Transaction = InferOutput<typeof TRANSACTION_SCHEMA>;
export type RecurringTransaction = InferOutput<typeof TRANSACTION_SCHEMA>;
