import { createContext } from 'svelte';
import type { Ledger } from './schemas';

export const [useLedgerContext, setLedgerContext] = createContext<{
	current: Ledger | null;
	loading: boolean;
	date: Date;
	range: 'day' | 'week' | 'biweek' | 'month' | 'bimonth' | 'quarter' | 'biennial';
}>();
