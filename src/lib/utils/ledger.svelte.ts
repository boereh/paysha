import { browser } from '$app/environment';
import { LEDGER_SCHEMA, type Ledger } from '$lib/schemas';
import { PersistedState, resource } from 'runed';
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

export function createPersistedCurrentId() {
	return new PersistedState<string | undefined>('paysha:current', undefined);
}

export class CurrentLedger {
	private ledger = $state<Ledger>();
	private _id = createPersistedCurrentId();
	private storage = useLedgerStorage();
	// private subscriber: ReturnType<typeof createSubscriber>;

	constructor() {
		resource(
			() => this._id.current,
			async (id) => {
				if (!id) return (this.ledger = undefined);
				const { success, output } = safeParse(LEDGER_SCHEMA, await this.storage.get(id));
				if (!success) return (this.ledger = undefined);
				this.ledger = output;
			},
		);
	}
	get current() {
		return this.ledger;
	}
	set current(ledger: Ledger | undefined) {
		if (!ledger) return;
		this.storage.set(ledger.id, ledger);
		this.ledger = ledger;
	}
	get id() {
		return this._id.current;
	}
	set id(id: string | undefined) {
		this._id.current = id;
	}
}

export function useCurrentLedger() {
	const id = createPersistedCurrentId();

	return resource(
		() => id.current,
		async (v) => {
			if (!v) return;
			const { success, output } = safeParse(LEDGER_SCHEMA, await useLedgerStorage().get(v));
			if (!success) return;
			return output;
		},
	);
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

		const { success, output } = safeParse(LEDGER_SCHEMA, await useLedgerStorage().get(current));
		if (success) return output;
	}
}
