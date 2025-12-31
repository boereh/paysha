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

	const ICONS = icons as Record<string, Component>;

	type Props = {
		create?: Category['type'];
		edit?: number;
	};

	let { create = $bindable(), edit = $bindable(-1) }: Props = $props();
	let new_category = $state({ id: nanoid(), name: '', icon: '', color: '' });
	const current = useCurrent();

	const id_color = $derived(
		uniqolor(edit < 0 ? new_category.id : current.book?.categories[edit].id || '', {
			lightness: [40, 60],
		}).color,
	);
	const CurrentIcon = $derived.by(() => {
		if (create && new_category.icon) return ICONS[new_category.icon];
		if (edit > -1 && current.book) return ICONS[current.book.categories[edit].icon];
	});
	const current_icon_key = $derived.by(() => {
		if (edit < 0 || !current.book) return new_category.icon;
		return current.book.categories[edit].icon;
	});

	watch(
		() => $state.snapshot(create),
		(v) => {
			if (v === undefined) {
				new_category = {
					id: nanoid(),
					name: '',
					color: '',
					icon: '',
				};
			}
		},
	);
</script>

<Dialog.Root
	bind:open={
		() => create !== undefined || edit > -1,
		(v) => {
			if (v) return;
			create = undefined;
			edit = -1;
		}
	}
>
	<Dialog.Portal>
		<Dialog.Overlay forceMount>
			{#snippet child({ props, open })}
				<div
					{...props}
					class={['fixed inset-0 transition-all select-none', open ? 'bg-zinc-50/75' : '']}
					style:pointer-events={open ? 'auto' : 'none'}
					oncontextmenu={(e) => e.preventDefault()}
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
						<button onclick={() => (create = undefined)}>
							<X class="size-4" />
						</button>

						<span class="flex-1 text-center">{edit > -1 ? 'Edit' : 'New'} Category</span>

						{#if edit < 0}
							<button
								class="flex items-center gap-2 text-sm font-medium h-8 px-2 rounded-md bg-zinc-800 text-white"
								onclick={() => {
									if (new_category.name.length < 1 || !current.book || create === undefined) return;

									current.book.categories.push({
										id: new_category.id,
										type: create,
										name: new_category.id,
										color: '',
										icon: '',
									});
								}}
							>
								<Plus class="size-4" />
								Add
							</button>
						{/if}
					</div>

					<label for="cat-name" class="text-sm -mb-2">Name</label>

					<input
						bind:value={
							() => {
								if (edit < 0 || !current.book) return new_category.name;
								return current.book.categories[edit].name;
							},
							(v) => {
								if (edit < 0 || !current.book) return (new_category.name = v);
								current.book.categories[edit].name = v;
							}
						}
						type="text"
						id="cat-name"
						placeholder="Enter name"
						class="px-2 h-10 placeholder:transition focus:placeholder-transparent border border-zinc-200 rounded"
					/>

					<label for="" class="text-sm -mb-2"> Icon </label>

					<div class="overflow-x-auto flex flex-col max-h-26 gap-1 flex-wrap">
						{#if edit > -1 ? current.book?.categories[edit].icon : new_category.icon}
							<div class="w-8 h-26">
								<div
									class="grid place-items-center size-8 rounded text-white"
									style:background={new_category.color || id_color}
								>
									<CurrentIcon class="size-4" />
								</div>
							</div>
						{/if}

						{#each Object.keys(ICONS) as key, kidx (kidx)}
							{@const Icon = ICONS[key]}

							<button
								class={[
									'size-8 grid place-items-center rounded transition',
									current_icon_key === key ? ' text-white' : 'bg-zinc-50',
								]}
								style:background={current_icon_key === key ? new_category.color || id_color : ''}
								onclick={() => {
									if (edit < 0) return (new_category.icon = key);
									if (!current.book) return;
									current.book.categories[edit].icon = key;
								}}
							>
								<Icon class="size-4" />
							</button>
						{/each}
					</div>

					<label for="cat-name" class="text-sm -mb-2">Color</label>

					<input
						bind:value={
							() => new_category.color || id_color,
							(v) => {
								if (edit < 0 || !current.book) return (new_category.color = v);
								current.book.categories[edit].color = v;
							}
						}
						type="color"
						class="w-full h-10"
					/>
				</div>
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
