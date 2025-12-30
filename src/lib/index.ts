import { nanoid } from 'nanoid';
import type { Book } from './schemas/books';

export const createExampleBook = (): Book => ({
	id: nanoid(),
	title: 'Untitled book',
	accounts: [],
	categories: [
		{
			color: '',
			icon: 'GasPump',
			id: nanoid(),
			type: 'expense',
			name: 'Gas',
		},
		{
			color: '',
			icon: 'Receipt',
			id: nanoid(),
			type: 'expense',
			name: 'Bills',
		},
		{
			color: '',
			icon: 'ShoppingCart',
			id: nanoid(),
			type: 'expense',
			name: 'Shopping',
		},

		{
			color: '',
			icon: 'BuildingOffice',
			id: nanoid(),
			type: 'income',
			name: 'Work',
		},
		{
			color: '',
			icon: 'Money',
			id: nanoid(),
			type: 'income',
			name: 'Allowance',
		},
	],
	local: true,
	transactions: [],
});
