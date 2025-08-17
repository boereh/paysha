import { browser } from "$app/environment";
import { type Book } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import { get, createStore } from "idb-keyval";

export async function load({ params: { slug }, data }) {
  if (!browser) return {};

  const [book_id] = slug.split("/");

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
