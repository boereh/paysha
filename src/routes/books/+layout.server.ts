import { SAMPLE_BOOK } from "$lib/utils";

export async function load({ parent, locals }) {
  await parent();

  if (locals.user) {
    // Get the book from the database

    return { books: [] };
  }

  return { books: [SAMPLE_BOOK] };
}
