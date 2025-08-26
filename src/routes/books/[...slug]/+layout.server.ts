import { SAMPLE_BOOK } from "$lib/utils.js";
import { redirect } from "@sveltejs/kit";

export async function load({ parent, locals, ...what }) {
  if (locals.user) {
    // TODO: fetch books from db
  }

  await parent();

  console.log(what);

  return {
    book: SAMPLE_BOOK,
  };
}
