import { createStorage } from 'unstorage';
import idb from 'unstorage/drivers/indexedb';
import localstorage from 'unstorage/drivers/localstorage';
import type { Book } from './schemas/books';

export const useLocalStorage = () =>
	createStorage({
		driver: localstorage({
			base: 'paysha',
		}),
	});

export const useBookStore = () =>
	createStorage<Book>({
		driver: idb({ dbName: 'paysha', storeName: 'books' }),
	});
