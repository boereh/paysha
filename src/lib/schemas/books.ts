import {
	string,
	boolean,
	object,
	number,
	array,
	union,
	literal,
	type InferInput,
	intersect,
	omit,
} from 'valibot';

export type Account = InferInput<typeof ACCOUNT>;
export type Category = InferInput<typeof CATEGORY>;
export type Transaction = InferInput<typeof TRANSACTION>;
export type Recurring = InferInput<typeof RECURRING>;
export type Book = InferInput<typeof BOOK>;

export const ACCOUNT = object({
	id: string(),
	icon: string(),
	name: string(),
	limit: number(),
	owed: number(),
	billingdate: number(),
	duedate: number(),
	asset: boolean(),
	hidebalance: boolean(),
});

export const CATEGORY = object({
	id: string(),
	type: union([literal('income'), literal('expense')]),
	icon: string(),
	color: string(),
	name: string(),
});

export const TRANSACTION = object({
	id: string(),
	label: string(),
	amount: number(),
	date: number(),
	category: string(),
	account: string(),
	tags: string(),
});

export const RECURRING = intersect([
	omit(TRANSACTION, ['date']),
	object({
		cron: string(),
	}),
]);

export const BOOK = object({
	id: string(),
	title: string(),
	local: boolean(),
	transactions: array(TRANSACTION),
	categories: array(CATEGORY),
	accounts: array(ACCOUNT),
});
