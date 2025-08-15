import { browser } from "$app/environment";
import { SAMPLE_BOOK, type Book } from "$lib/stores/books.js";
import { redirect } from "@sveltejs/kit";
import { get, createStore } from "idb-keyval";

export async function load({ params: { slug }, data }) {
  if (!browser) return {};

  const [book_id] = slug.split("/");

  if (book_id === SAMPLE_BOOK.id) return { book: SAMPLE_BOOK };

  const books_store = createStore("paysha", "books");
  const book = await get<Book>(book_id, books_store);
  const conflicted = !!book && !!data.book;

  if (!book && !data.book) redirect(307, "/books");

  return {
    book: book || data.book,
    server_book: conflicted && data.book,
    conflicted,
  };
}
