import { browser } from "$app/environment";
import { type Book } from "$lib/types";
import { values, createStore } from "idb-keyval";

export async function load({ data }) {
  if (!browser) return {};

  const books_store = createStore("paysha", "books");
  const books = await values<Book>(books_store);

  return {
    books: [...data.books, ...books],
  };
}
