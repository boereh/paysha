import { nanoid } from "nanoid";
import { type Book } from "~~/app/composables/books";
import { takeCronDate } from "~~/app/composables/utils";
import { auth } from "~~/server/utils/auth";

export default defineEventHandler(async (event) => {
  const book_id = getRouterParam(event, "book_id");
  const session = await auth.api.getSession(event);

  if (!session)
    throw createError({ statusCode: 401, statusMessage: "Unauthorized" });

  if (!book_id)
    throw createError({ statusCode: 400, statusMessage: "Missing book_id" });

  if (book_id === "what") return SAMPLE_BOOK;

  return;
});

export const SAMPLE_BOOK: Book = {
  id: "what",
  title: "Sample Budget Server",
  author: nanoid(),
  coauthors: [],
  transactions: [
    {
      id: nanoid(),
      amount: 553,
      tags: [],
      wallet: "work",
      label: "DIR DEP from Amce, Inc.",
      date: takeCronDate("0 2 * * 4", 1)[0].toDate() || new Date(),
    },
    {
      id: nanoid(),
      amount: 800,
      tags: [],
      wallet: "bills",
      label: "Rent",
      date: takeCronDate("0 0 1 * *", -1)[0].toDate() || new Date(),
    },
  ],
  recurring: [
    {
      id: nanoid(),
      amount: 553,
      tags: [],
      wallet: "work",
      label: "DIR DEP from Amce, Inc.",
      cron: "0 2 * * 4",
      skip: [],
    },
    {
      id: nanoid(),
      amount: -852.5,
      tags: [],
      wallet: "bills",
      label: "Rent",
      cron: "0 0 1 * *",
      skip: [],
    },
  ],
};
