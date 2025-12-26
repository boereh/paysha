import { nanoid } from 'nanoid';
import type { Book } from './schemas/books';

export const createExampleBook = (): Book => ({
	id: nanoid(),
	title: 'Untitled book',
	accounts: [],
	categories: [
		{
			color: '#00F',
			icon: '',
			id: nanoid(),
			type: 'expense',
			name: 'Gas',
		},
		{
			color: '#0FF',
			icon: '',
			id: nanoid(),
			type: 'expense',
			name: 'Bills',
		},
		{
			color: '#F00',
			icon: '',
			id: nanoid(),
			type: 'expense',
			name: 'Shopping',
		},

		{
			color: '#0FF',
			icon: '',
			id: nanoid(),
			type: 'income',
			name: 'Work',
		},
		{
			color: '#0FF',
			icon: '',
			id: nanoid(),
			type: 'income',
			name: 'Allowance',
		},
	],
	local: true,
	transactions: [],
});
