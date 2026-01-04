<script lang="ts">
	import { useCurrent } from '$lib/context';
	import { type Category } from '$lib/schemas/books';
	import { Plus } from 'phsv';
	import { ICONS } from '$lib/utils';
	import uniqolor from 'uniqolor';
	import TransactionDialog from '$lib/components/transaction-dialog.svelte';
	import CategoryDialog from '$lib/components/category-dialog.svelte';
	import { watch } from 'runed';

	const current = useCurrent();
	const expense_cat = $derived(current.book?.categories.filter((v) => v.type === 'expense') || []);
	const income_cat = $derived(current.book?.categories.filter((v) => v.type === 'income') || []);
	let transaction = $state(0);
	let category_context = $state<{ create?: Category['type']; edit: number }>({
		create: undefined,
		edit: -1,
	});
	let touch_start = $state(-1);
	let ts_timeout = $state<NodeJS.Timeout>();

	const TYPES = $derived([
		{ label: 'Expense', categories: expense_cat, icon: '' },
		{ label: 'Income', categories: income_cat, icon: '' },
	]);

	watch(
		() => $state.snapshot(touch_start),
		(v) => {
			if (v < 0) return;
			if (ts_timeout) clearTimeout(ts_timeout);
			ts_timeout = setTimeout(() => {
				if (touch_start !== v) return;
				category_context.edit = v;
				clear_touch();
			}, 500);
		},
		{ lazy: true },
	);

	function clear_touch() {
		touch_start = -1;
		clearTimeout(ts_timeout);
	}
</script>

<div class="p-4 space-y-4">
	{#each TYPES as types, tidx (tidx)}
		<h1 class="flex items-center justify-between">
			{types.label}

			<button
				class="text-xs border border-zinc-200 bg-zinc-100 grid place-items-center gap-2 rounded-md size-6"
				onclick={() => (category_context.create = types.categories[0].type)}
			>
				<Plus class="size-3" />
			</button>
		</h1>

		<div class="w-full mx-auto max-w-7xl grid grid-cols-3 gap-4 mb-8">
			{#if current.loading}
				{#each { length: 3 }, idx (idx)}
					<div class="bg-white min-h-20 p-4 rounded-lg border border-zinc-100 space-y-4 text-sm">
						<div class="flex justify-between items-center animate-pulse">
							<span class="size-6 grid place-items-center bg-zinc-300 rounded-sm text-white">
							</span>

							<span class="rounded-full">$0</span>
						</div>

						<div class="rounded bg-zinc-300 animate-pulse text-transparent text-xs">x</div>
					</div>
				{/each}
			{:else}
				{#each types.categories as cat, idx (idx)}
					{@render category(cat)}
				{/each}
			{/if}
		</div>
	{/each}
</div>

{#snippet category(cat: Category)}
	{@const idx = current.book?.categories.findIndex((v) => v.id === cat.id)}
	{@const total_amount = current.book?.transactions
		.filter((v) => v.category === cat.name)
		.reduce((a, b) => a + b.amount, 0)}
	{@const Icon = ICONS[cat.icon]}

	<button
		class="border p-4 rounded-lg border-zinc-100 text-left flex flex-col gap-4 bg-white min-h-20 <md:select-none"
		onclick={() => {
			if (idx === undefined) return;
			transaction = idx;
			clear_touch();
		}}
		oncontextmenu={(e) => {
			e.preventDefault();
			if (idx === undefined) return;
			category_context.edit = idx;
			clear_touch();
		}}
		ontouchstart={() => {
			if (idx === undefined) return;
			touch_start = idx;
		}}
	>
		<div class="flex justify-between items-center text-sm">
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

<TransactionDialog bind:index={transaction} />

<CategoryDialog bind:create={category_context.create} bind:edit={category_context.edit} />
