import type { Ledger } from "./schemas";
import dayjs from "dayjs";

export type LedgerState = {
  ledger: Ledger | null;
  loading: boolean;
  date: Date;
  range:
    | "day"
    | "week"
    | "biweek"
    | "month"
    | "bimonth"
    | "quarter"
    | "biennial"
    | "year";
};

export const useLedgerState = () =>
  useState<LedgerState>("ledger-state", () => ({
    ledger: null,
    loading: false,
    date: new Date(),
    range: "month",
  }));

export type CreateTransaction = {
  dialog: boolean;
  amount: number[];
  type: "expense" | "income" | "transfer";
  category: string;
  account: string;
  to_account: string;
  recurring: null | [number, "days" | "weeks" | "months"];
  paid: boolean;
  date: Date;
};

export const useCreateTransactionState = () =>
  useState<CreateTransaction>("create-transaction", () => ({
    dialog: false,
    amount: [],
    type: "expense",
    category: "",
    account: "",
    recurring: null,
    paid: true,
    date: new Date(),
    to_account: "",
  }));
