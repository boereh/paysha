import { browser } from "$app/environment";
import type { Book } from "$lib/stores/books.js";
import { get, createStore } from "idb-keyval";

export async function load({ params: { slug }, data }) {
  if (!browser) return;

  const books_store = createStore("paysha", "books");
  const book = await get<Book>(slug, books_store);
  const conflicted = !!book && !!data.book;

  return {
    book: book || data.book,
    server_book: conflicted && data.book,
    conflicted,
  };
}
