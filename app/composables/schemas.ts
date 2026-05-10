import {
	array,
	boolean,
	intersect,
	literal,
	maxValue,
	minValue,
	number,
	object,
	omit,
	optional,
	pipe,
	string,
	union,
	type InferInput,
} from 'valibot';

export type Ledger = InferInput<typeof LEDGER_SCHEMA>;
export type Account = InferInput<typeof ACCOUNT_SCHEMA>;
export type Transaction = InferInput<typeof TRANSACTION_SCHEMA>;
export type Reccurring = InferInput<typeof RECCURING_SCHEMA>;
export type Budget = InferInput<typeof BUDGET_SCHEMA>;
export type Category = InferInput<typeof CATREORY_SCHEMA>;

export const ACCOUNT_SCHEMA = object({
	id: string(),
	name: string(),
	text: string(),
	starting: number(),
	/** For account like credit cards */
	max: optional(pipe(number(), minValue(0))),
});

export const CATREORY_SCHEMA = object({
	id: string(),
	name: string(),
	icon: string(),
	color: string(),
});

export const TRANSACTION_SCHEMA = object({
	id: string(),
	amount: number(),
	account: string(),
	category: string(),
	timestamp: number(),
	note: string(),
});

export const RECCURING_SCHEMA = intersect([
	omit(TRANSACTION_SCHEMA, ['timestamp']),
	object({
		cron: string(),
	}),
]);

export const BUDGET_SCHEMA = object({
	frequency: union([literal('day'), literal('week'), literal('biweek'), literal('month')]),
	rollover: boolean(),
	starting: number(),
	categories: array(string()),
});

export const LEDGER_SCHEMA = object({
	id: string(),
	name: string(),
	updated: number(),
	created: number(),
	authors: array(string()),
	categories: array(CATREORY_SCHEMA),
	transactions: array(TRANSACTION_SCHEMA),
	accounts: array(ACCOUNT_SCHEMA),
	recurrings: array(RECCURING_SCHEMA),
	budgets: array(BUDGET_SCHEMA),
	storage: union([literal('local'), literal('server')]),
	/**
	 * Automatically roll over balance from the previous month
	 */
	rollover: boolean(),
	startdayofmonth: pipe(number(), minValue(1), maxValue(31)),
	startdayofweek: union([
		literal('sunday'),
		literal('monday'),
		literal('tuesday'),
		literal('wednesday'),
		literal('thursday'),
		literal('friday'),
		literal('saturday'),
	]),
	/** Enable the option for transations to be not yet paid */
	enable_nonpaid: boolean(),
	default_account: string(),
});
