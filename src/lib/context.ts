import { createContext } from 'svelte';
import type { Book } from './schemas/books';

export type CurrentContext = { book?: Book; loading: boolean };
export const [useCurrent, setCurrent] = createContext<CurrentContext>();
