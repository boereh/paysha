import { SAMPLE_BOOK } from "$lib/stores/books.js";

export async function load({ parent, locals }) {
  await parent();

  if (!locals.user) return { books: [] };

  // Get the book from the database

  return { books: [SAMPLE_BOOK] };
}
