import { CronJob } from "cron";
import { nanoid } from "nanoid";
import type { Book } from "./types";

export function lastCronDate(exp: string) {
  return new CronJob(exp, () => {}).lastDate();
}

export function nextCronDate(exp: string, count?: number) {
  return new CronJob(exp, () => {}).nextDates(count);
}

export const SAMPLE_BOOK: Book = {
  id: "what",
  title: "Sample Budget Server",
  author: nanoid(),
  coauthors: [],
  pages: [
    {
      id: nanoid(),
      pid: 1,
      title: "Work",
      transactions: [
        {
          id: nanoid(),
          amount: 553,
          label: "DD from Amce, Inc.",
          date: lastCronDate("0 2 * * 4") || new Date(),
        },
      ],
      recurring: [
        {
          id: nanoid(),
          amount: 553,
          label: "DD from Amce, Inc.",
          cron: "0 2 * * 4",
          skip: [],
        },
      ],
    },
    {
      id: nanoid(),
      pid: 2,
      title: "Bills",
      transactions: [
        {
          id: nanoid(),
          amount: 800,
          label: "Rent",
          date: lastCronDate("0 0 1 * *") || new Date(),
        },
      ],
      recurring: [
        {
          id: nanoid(),
          amount: -850,
          label: "Rent",
          cron: "0 0 1 * *",
          skip: [],
        },
      ],
    },
  ],
};
