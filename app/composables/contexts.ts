import type { Ledger } from './schemas';
import type dayjs from 'dayjs';

export type LedgerState = {
	current: Ledger | null;
	loading: boolean;
	date: Date;
	range: 'day' | 'week' | 'biweek' | 'month' | 'bimonth' | 'quarter' | 'biennial' | 'year';
}

export const useLedgerState = () => useState<LedgerState>('ledger-state', () => ({current: null, loading: false, date: new Date(), range: 'month'}))


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

export const useCreateTransaction = useState<CreateTransaction>('create-transaction');
