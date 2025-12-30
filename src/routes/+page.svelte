<script lang="ts">
	import { useCurrent } from '$lib/context';
	import { type Category } from '$lib/schemas/books';
	import { Plus } from 'phsv';
	import * as icons from 'phsv/fill';
	import { type Component } from 'svelte';
	import uniqolor from 'uniqolor';
	import { longpress } from '$lib/utils';
	import NewTransaction from '$lib/components/new-transaction.svelte';
	import NewCategory from '$lib/components/new-category.svelte';

	const current = useCurrent();
	const expense_cat = $derived(current.book?.categories.filter((v) => v.type === 'expense') || []);
	const income_cat = $derived(current.book?.categories.filter((v) => v.type === 'income') || []);
	let new_transaction = $state(-1);
	let new_category = $state<Category['type']>();

	const TYPES = $derived([
		{ label: 'Expense', categories: expense_cat, icon: '' },
		{ label: 'Income', categories: income_cat, icon: '' },
	]);
</script>

<div
	class="p-4 space-y-4"
	use:longpress
	onlongpress={() => {
		console.log('what');
	}}
>
	{#each TYPES as types, tidx (tidx)}
		<h1 class="px-4 mb-4">{types.label}</h1>

		<div class="w-full mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-8">
			{#each types.categories as cat, idx (idx)}
				{@render category(cat)}
			{/each}

			<button
				class="text-xs border border-zinc-300 border-dashed flex items-center justify-center gap-2 rounded-md min-h-20"
				onclick={() => (new_category = types.categories[0].type)}
			>
				<Plus class="size-4" />
				Add
			</button>
		</div>
	{/each}
</div>

{#snippet category(cat: Category)}
	{@const idx = current.book?.categories.findIndex((v) => v.id === cat.id)}
	{@const total_amount = current.book?.transactions
		.filter((v) => v.category === cat.name)
		.reduce((a, b) => a + b.amount, 0)}
	{@const Icon = (icons as Record<string, Component>)[cat.icon]}

	<button
		class="border p-4 rounded-lg border-zinc-100 text-left flex flex-col gap-4 bg-white"
		onclick={() => {
			if (idx === undefined) return;
			new_transaction = idx;
		}}
	>
		<div class="flex justify-between items-center text-sm font-medium">
			<span
				class="p-1 grid place-items-center text-white rounded-sm"
				style:background={cat.color || uniqolor(cat.id, { lightness: [30, 50] }).color}
			>
				<Icon class="size-4" />
			</span>
			<span>${total_amount}</span>
		</div>

		<div class="text-xs">
			{cat.name}
		</div>
	</button>
{/snippet}

<NewTransaction bind:index={new_transaction} />

<NewCategory bind:type={new_category} />
