<script lang="ts">
	import { useCurrent } from '$lib/context';
	import { type Category } from '$lib/schemas/books';

	const current = useCurrent();
	const expense_cat = $derived(current.book?.categories.filter((v) => v.type === 'expense') || []);
	const income_cat = $derived(current.book?.categories.filter((v) => v.type === 'income') || []);

	const TYPES = $derived([
		{ label: 'Expense', categories: expense_cat, icon: '' },
		{ label: 'Income', categories: income_cat, icon: '' },
	]);
</script>

<div class="p-4 flex flex-col gap-4">
	{#each TYPES as types, tidx (tidx)}
		<div class="w-full mx-auto max-w-7xl border border-zinc-200 rounded-md mt-4 p-4 relative">
			<span class="left-1/2 top-0 -translate-1/2 absolute bg-zinc-50 px-4">{types.label}</span>

			<div class="grid gap-4 grid-cols-3">
				{#each types.categories as cat, idx (idx)}
					{@render category(cat)}
				{/each}
			</div>
		</div>
	{/each}
</div>

{#snippet category(cat: Category)}
	{@const idx = current.book?.categories.findIndex((v) => v.id === cat.id)}

	<button class="h-24">
		{cat.name}
	</button>
{/snippet}
