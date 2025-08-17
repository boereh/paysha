import { getContext, setContext } from "svelte";

const BOOK_PAGE_SYMBOL = Symbol("book-page");

export type BookPageContext = {
  value: string;
};

export const useBookPage = () => getContext<BookPageContext>(BOOK_PAGE_SYMBOL);
export const setBookPage = (v: BookPageContext) =>
  setContext(BOOK_PAGE_SYMBOL, v);
