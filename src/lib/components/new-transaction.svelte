<script lang="ts">
	import { useCurrent } from '$lib/context';
	import { Dialog } from 'bits-ui';
	import { type Component } from 'svelte';
	import uniqolor from 'uniqolor';
	import { nanoid } from 'nanoid';
	import * as icons from 'phsv/fill';
	import { X, ListPlus } from 'phsv';

	type Props = {
		index: number;
	};

	let { index = $bindable(-1) }: Props = $props();
	let amount = $state(0);
	const current = useCurrent();
</script>

<Dialog.Root
	bind:open={
		() => index >= 0,
		(v) => {
			if (v) return;
			index = -1;
		}
	}
>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				<div
					{...props}
					class={['fixed inset-0 transition-all ', open ? 'bg-black/25' : '']}
					style:pointer-events={open ? 'auto' : 'none'}
				></div>
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content forceMount>
			{#snippet child({ props, open })}
				{@const category = current.book?.categories[index]}
				{@const Icon = category && (icons as Record<string, Component>)[category.icon]}

				<div
					{...props}
					class={[
						'bg-white border border-zinc-200 rounded-t-lg p-4 bottom-0 fixed left-0 right-0 transition-all flex flex-col gap-4',
						open ? '' : 'translate-y-full',
					]}
					style:pointer-events={open ? 'auto' : 'none'}
					style:padding-bottom="calc(var(--spacing)*4+env(safe-area-inset-bottom))"
				>
					<div class="flex gap-2 items-center">
						<button onclick={() => (index = -1)}><X class="size-4" /></button>

						<span class="flex-1 flex items-center justify-center gap-2">
							{#if Icon}
								<span style:color={uniqolor(category.id, { lightness: [40, 60] }).color}>
									<Icon class="size-5" />
								</span>
							{/if}

							{category?.name}
						</span>

						<button
							class="bg-zinc-800 text-white rounded h-8 text-sm font-medium flex items-center gap-2 px-2"
							onclick={() => {
								if (amount < 1 || !current.book) return;

								current.book.transactions.push({
									category: current.book.categories[index].id,
									amount: amount,
									account: '',
									date: Date.now(),
									id: nanoid(),
									label: '',
									tags: '',
								});
							}}
						>
							<ListPlus class="size-5" />

							Add
						</button>
					</div>

					<input
						bind:value={amount}
						type="number"
						pattern="[0-9]*"
						placeholder="0"
						class=" flex-1 text-2xl text-center min-h-48 placeholder:transition focus:placeholder-transparent"
					/>

					<div class="bg-white" style:height="env(safe-area-inset-bottom)">what</div>
				</div>
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
