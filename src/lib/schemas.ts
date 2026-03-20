import { array, intersect, number, object, omit, string, type InferInput } from 'valibot';

export type Ledger = InferInput<typeof LEDGER>;
export type Account = InferInput<typeof ACCOUNT>;
export type Transaction = InferInput<typeof TRANSACTION>;
export type Reccurring = InferInput<typeof RECCURING>;

export const ACCOUNT = object({
	id: string(),
	name: string(),
	text: string(),
	max: number(),
});

export const TRANSACTION = object({
	id: string(),
	amount: number(),
	account: string(),
	category: string(),
	timestamp: number(),
	note: string(),
});

export const RECCURING = intersect([
	omit(TRANSACTION, ['timestamp']),
	object({
		cron: string(),
	}),
]);

export const LEDGER = object({
	id: string(),
	title: string(),
	updated: number(),
	created: number(),
	transactions: array(TRANSACTION),
	accounts: array(ACCOUNT),
	recurrings: array(RECCURING),
});
