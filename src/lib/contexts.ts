import { createContext } from 'svelte';
import type { Ledger } from './schemas';
import type dayjs from 'dayjs';

export const [useLedgerContext, setLedgerContext] = createContext<{
	current: Ledger | null;
	loading: boolean;
	date: Date;
	range: 'day' | 'week' | 'biweek' | 'month' | 'bimonth' | 'quarter' | 'biennial' | 'year';
}>();

export type CreateTransaction = {
	dialog: boolean;
	amount: number[];
	type: 'expense' | 'income' | 'transfer';
	category: string;
	account: string;
	to_account: string;
	recurring: null | [number, 'days' | 'weeks' | 'months'];
	paid: boolean;
	date: dayjs.Dayjs;
};

export const [useCreateTransaction, setCreateTransaction] = createContext<CreateTransaction>();
