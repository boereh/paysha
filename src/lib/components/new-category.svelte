<script lang="ts">
	import { useCurrent } from '$lib/context';
	import { Dialog } from 'bits-ui';
	import { nanoid } from 'nanoid';
	import * as icons from 'phsv/fill';
	import { X, Plus } from 'phsv';
	import type { Category } from '$lib/schemas/books';
	import { watch } from 'runed';
	import { type Component } from 'svelte';
	import uniqolor from 'uniqolor';

	type Props = {
		type?: Category['type'];
	};

	let { type = $bindable() }: Props = $props();
	let id = $state(nanoid());
	let name = $state('');
	let icon = $state('');
	let color = $state('');

	const id_color = $derived(uniqolor(id, { lightness: [40, 60] }).color);
	const current = useCurrent();
	const CurrentIcon = $derived(icon ? (icons as Record<string, Component>)[icon] : undefined);

	watch(
		() => $state.snapshot(type),
		(v) => {
			if (v === undefined) {
				name = '';
				icon = '';
				id = nanoid();
			}
		},
	);
</script>

<Dialog.Root
	bind:open={
		() => type !== undefined,
		(v) => {
			if (v) return;
			type = undefined;
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
				<div
					{...props}
					class={[
						'bg-white border border-zinc-200 rounded-t-lg p-4 bottom-0 fixed left-0 right-0 transition-all flex flex-col gap-4',
						open ? '' : 'translate-y-full',
					]}
					style:pointer-events={open ? 'auto' : 'none'}
				>
					<div class="flex gap-2 items-center">
						<button onclick={() => (type = undefined)}>
							<X class="size-4" />
						</button>

						<span class="flex-1 text-center">New Category</span>

						<button
							class="flex items-center gap-2 text-sm font-medium h-8 px-2 rounded-md bg-zinc-800 text-white"
							onclick={() => {
								if (name.length < 1 || !current.book || type === undefined) return;

								current.book.categories.push({
									id,
									type,
									name,
									color: '',
									icon: '',
								});
							}}
						>
							<Plus class="size-4" />
							Add
						</button>
					</div>

					<label for="cat-name" class="text-sm -mb-2">Name</label>

					<input
						bind:value={name}
						type="text"
						id="cat-name"
						placeholder="Enter name"
						class="px-2 h-10 placeholder:transition focus:placeholder-transparent border border-zinc-200 rounded"
					/>

					<label for="" class="text-sm -mb-2 h-6 flex items-center gap-2">
						Icon

						{#if CurrentIcon}
							<span class="p-1 text-white rounded" style:background={color || id_color}>
								<CurrentIcon class="size-4" />
							</span>
						{/if}
					</label>

					<div class="overflow-x-auto flex flex-col max-h-26 gap-1 flex-wrap">
						{#each Object.keys(icons) as key, kidx (kidx)}
							{@const Icon = (icons as Record<string, Component>)[key]}
							<button
								class={[
									'px-2 h-8 rounded transition',
									icon === key ? 'text-white bg-zinc-800' : 'bg-zinc-100',
								]}
								onclick={() => (icon = key)}
							>
								<Icon class="size-4" />
							</button>
						{/each}
					</div>

					<label for="cat-name" class="text-sm -mb-2">Color</label>

					<input
						bind:value={() => color || id_color, (v) => (color = v)}
						type="color"
						class="w-full h-10"
					/>
				</div>
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
