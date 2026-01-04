<script lang="ts">
	import { ICONS_CATEGORIZED, ICONS } from '$lib/utils';
	import { Select } from 'bits-ui';
	import { CaretDown } from 'phsv';

	type Props = {
		value?: string;
		open?: boolean;
	};

	let { value = $bindable(), open = $bindable(false) }: Props = $props();
	let search = $state('');
</script>

<Select.Root type="single" bind:open>
	<Select.Trigger
		class="border border-zinc-200 px-2 h-10 rounded flex items-center justify-between gap-4"
	>
		<span class={[value ? '' : 'text-zinc-500']}>
			{value || 'No icons selected'}
		</span>

		<CaretDown class="size-4" />
	</Select.Trigger>
	<Select.Portal>
		<Select.Content forceMount>
			{#snippet child({ props })}
				<div
					{...props}
					class={[
						'p-2 pointer-events-none',
						'max-h-(--bits-select-content-available-height) select-none',
					]}
				>
					<div
						class="bg-white rounded-lg border border-zinc-200 shadow-lg max-h-full overflow-hidden flex flex-col gap-2"
					>
						<input
							bind:value={search}
							class="w-full text-sm h-10 p-2 rounded-t-lg flex items-center border-b border-zinc-200"
							type="text"
							placeholder="Search icons..."
						/>

						<Select.Viewport class="space-y-4 px-2 flex-1 overflow-y-auto">
							{#each Object.entries(ICONS_CATEGORIZED) as [category, icons] (category)}
								<Select.Group class="mb-2">
									<Select.GroupHeading
										class="sticky bg-white top-0 py-1 text-sm capitalize font-medium text-zinc-500"
									>
										{category}
									</Select.GroupHeading>

									<div class="flex flex-wrap gap-1 w-71">
										{#each icons as icon (icon)}
											{@const IconComponent = ICONS[icon]}

											{#if !search || icon.toLowerCase().includes(search)}
												<Select.Item
													value={icon}
													class="size-8 grid place-items-center bg-zinc-100 rounded"
												>
													<IconComponent class="size-4" />
												</Select.Item>
											{/if}
										{/each}
									</div>
								</Select.Group>
							{/each}
						</Select.Viewport>
					</div>
				</div>
			{/snippet}
		</Select.Content>
	</Select.Portal>
</Select.Root>
