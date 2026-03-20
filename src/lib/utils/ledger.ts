import { browser } from '$app/environment';
import { LEDGER, type Ledger } from '$lib/schemas';
import { createStorage } from 'unstorage';
import idb from 'unstorage/drivers/indexedb';
import localstorage from 'unstorage/drivers/localstorage';
import { safeParse } from 'valibot';

export function useLocalStorage() {
	return createStorage({
		driver: localstorage({ base: 'paysha:' }),
	});
}

export function useLedgerStorage() {
	return createStorage<Ledger>({
		driver: idb({ dbName: 'paysha', storeName: 'ledgers' }),
	});
}

export async function getCurrentLedger() {
	// IF AUTH
	const auth = false;
	if (auth) {
		// TODO
	}

	if (browser) {
		const current = await useLocalStorage().get<string>('current');
		if (!current) return;

		const { success, output } = safeParse(LEDGER, await useLedgerStorage().get(current));
		if (success) return output;
	}
}
