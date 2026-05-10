<script lang="ts">
	import Dialog from '$lib/components/dialog.svelte';
	import { Button, Select } from 'uisv';
	import numbro from 'numbro';
	import { useCreateTransaction, useLedgerContext } from '$lib/contexts';
	import dayjs from 'dayjs';
	import relative_time from 'dayjs/plugin/relativeTime';
	import { DropdownMenu } from 'bits-ui';
	import { clamp } from '$lib/utils';
	import type { Category } from '$lib/schemas';
	import { icons } from '@phosphor-icons/core';
	import { ScrollState } from 'runed';
	import 'iconify-icon';
	import { uid } from 'uid/secure';

	dayjs.extend(relative_time);

	const create_transaction = useCreateTransaction();
	const ledger = useLedgerContext();
	const dialogs = $state({
		date: false,
		account: false,
		to_account: false,
		new_account: false,
		category: false,
		reccuring: false,
		new_category: false,
	});
	const new_category = $state<Omit<Category, 'id'>>({
		color: '',
		icon: '',
		name: '',
	});
	let icon_selector_el = $state<HTMLDivElement>();
	const icon_selector_scroll = new ScrollState({
		element: () => icon_selector_el,
	});
	const icon_rows = Math.ceil(icons.length / 7);

	const create_transaction_amount = $derived.by(() => {
		const amount = create_transaction.amount;
		if (amount.length < 1) return '$0.00';
		const int = amount.slice(0, -2);
		const deci = amount.slice(-2);
		if (deci.length < 2) deci.unshift(0);
		return `$${numbro(parseInt(int.join('') || '0')).format({ thousandSeparated: true })}.${deci.join('')}`;
	});
</script>

<Dialog
	bind:open={create_transaction.dialog}
	title="New Transaction"
	x={{
		onclick: () => void (create_transaction.dialog = false),
	}}
	right={{
		label: 'Save',
		icon: 'i-ph:check',
		ui: { base: create_transaction.category.length > 0 ? '' : 'opacity-25 cursor-not-allowed' },
	}}
>
	<div class="flex gap-4 py-4">
		<Button
			variant={create_transaction.type === 'expense' ? 'subtle' : 'ghost'}
			color="error"
			size="sm"
			icon="i-ph:shopping-cart-fill"
			label="EXPENSE"
			ui={{ base: 'flex-1 justify-center' }}
			onclick={() => void (create_transaction.type = 'expense')}
		/>

		<Button
			variant={create_transaction.type === 'income' ? 'subtle' : 'ghost'}
			color="success"
			size="sm"
			icon="i-ph:currency-dollar-simple-fill"
			label="INCOME"
			ui={{ base: 'flex-1 justify-center' }}
			onclick={() => void (create_transaction.type = 'income')}
		/>

		<Button
			variant={create_transaction.type === 'transfer' ? 'subtle' : 'ghost'}
			color="info"
			size="sm"
			icon="i-ph:arrows-left-right-bold"
			label="TRANSFER"
			ui={{ base: 'flex-1 justify-center' }}
			onclick={() => void (create_transaction.type = 'transfer')}
		/>
	</div>

	<input
		bind:value={() => create_transaction_amount, () => {}}
		class="outline-none text-center text-3xl h-24 caret-transparent font-mono select-none"
		placeholder="$0.00"
		inputmode="decimal"
		onkeydown={({ key }) => {
			const n = parseInt(key);
			const amount = create_transaction.amount;
			if (key === 'Backspace' && amount.length > 0) return create_transaction.amount.pop();
			if (isNaN(n)) return;
			create_transaction.amount.push(n);
		}}
	/>

	<div class="flex items-center justify-between">
		<span class="text-sm">Date</span>

		<Button
			icon="i-ph:caret-right"
			variant="link"
			color="surface"
			label={dayjs(create_transaction.date).isSame(dayjs(), 'date')
				? 'Today'
				: dayjs(create_transaction.date).add(1, 'day').isSame(dayjs(), 'date')
					? 'Yesterday'
					: dayjs(create_transaction.date).subtract(1, 'day').isSame(dayjs(), 'date')
						? 'Tomorrow'
						: dayjs(create_transaction.date).format('MMM DD, YYYY')}
			iconposition="right"
			size="xs"
			onclick={() => (dialogs.date = !dialogs.date)}
		/>
	</div>

	<hr class="border-surface-accented" />

	{#if create_transaction.type !== 'transfer'}
		<div class="flex items-center justify-between gap-4">
			<span class="text-sm">Category</span>

			<Button
				icon="i-ph:caret-right"
				variant="link"
				color="surface"
				label={ledger.current?.categories.find((x) => x.id === create_transaction.category)?.name ||
					'. . .'}
				iconposition="right"
				size="xs"
				onclick={() => (dialogs.category = !dialogs.category)}
			/>
		</div>

		<hr class="border-surface-accented" />
	{/if}

	<div class="flex items-center justify-between">
		<span class="text-sm">Account</span>

		<Button
			icon="i-ph:caret-right"
			variant="link"
			color="surface"
			label={ledger.current?.accounts.find((x) => x.id === create_transaction.account)?.name ||
				'. . . '}
			iconposition="right"
			size="xs"
			onclick={() => {
				dialogs.account = !dialogs.account;
			}}
		/>
	</div>

	<hr class="border-surface-accented" />

	{#if create_transaction.type === 'transfer'}
		<div class="flex items-center justify-between gap-4">
			<span class="text-sm">To Account</span>

			<Button
				icon="i-ph:caret-right"
				variant="link"
				color="surface"
				label={ledger.current?.accounts.find((x) => x.id === create_transaction.to_account)?.name ||
					'. . .'}
				iconposition="right"
				size="xs"
				onclick={() => (dialogs.account = !dialogs.account)}
			/>
		</div>

		<hr class="border-surface-accented" />
	{/if}

	<div class="flex items-center justify-between">
		<span class="text-sm">Recurring</span>

		<DropdownMenu.Root bind:open={dialogs.reccuring}>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						icon="i-ph:caret-right"
						variant="link"
						color="surface"
						label={create_transaction.recurring
							? create_transaction.recurring[0] === 1
								? 'Every ' + create_transaction.recurring[1].slice(0, -1)
								: 'Every ' + create_transaction.recurring.join(' ')
							: 'No'}
						iconposition="right"
						size="xs"
					/>{/snippet}
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					class="border-surface-accented bg-surface-base z-30 outline-hidden focus-visible:outline-hidden rounded-xl border p-2"
					sideOffset={8}
					collisionPadding={8}
				>
					<div class="flex gap-2 mb-2 w-full justify-between">
						<input
							bind:value={
								() => create_transaction.recurring?.[0] || null,
								(v) => {
									if (v === null) create_transaction.recurring = null;
									else if (create_transaction.recurring) {
										create_transaction.recurring[0] = clamp(v, 1, 31);
									} else create_transaction.recurring = [clamp(v, 1, 31), 'days'];
								}
							}
							type="number"
							pattern="[0-9]*"
							class="outline-none h-8 px-2 bg-surface-muted rounded flex items-center justify-center w-16"
						/>

						<Select
							bind:value={
								() => create_transaction.recurring?.[1] || 'days',
								(v) => {
									if (!create_transaction.recurring) create_transaction.recurring = [0, v];
									else create_transaction.recurring[1] = v;
								}
							}
							items={['days', 'weeks', 'months']}
							ui={{
								content: 'z-30 p-2',
								item: 'hover:bg-surface-muted rounded h-8 capitalize',
								base: 'capitalize',
							}}
						/>
					</div>

					<Button
						color="error"
						variant="soft"
						label="No Recurring"
						icon="i-ph:calendar-x"
						ui={{ base: 'w-full justify-center' }}
						onclick={() => {
							create_transaction.recurring = null;
							dialogs.reccuring = false;
						}}
					/>

					<DropdownMenu.Arrow class="text-surface-accented" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	</div>
</Dialog>

<Dialog bind:open={dialogs.date} overlay={{ class: 'z-40' }} title="Date"></Dialog>

<Dialog bind:open={dialogs.category} overlay={{ class: 'z-40' }} title="Choose Category">
	{#if ledger.current}
		{#if ledger.current.categories.length > 0}
			<div class="grid grid-cols-3 gap-4">
				{#each ledger.current.categories as cat (cat.id)}
					<Button
						color="surface"
						variant="soft"
						ui={{ base: 'justify-center' }}
						onclick={() => {
							create_transaction.category = cat.id;
							dialogs.category = false;
						}}
					>
						<iconify-icon icon="ph:{cat.icon}" class="text-xl"></iconify-icon>

						{cat.name}
					</Button>
				{/each}

				<Button
					label="New"
					color="surface"
					variant="outline"
					icon="i-ph:plus"
					ui={{ base: 'border-dashed border-surface-accented justify-center' }}
					onclick={() => (dialogs.new_category = true)}
				/>
			</div>
		{:else}
			<div class="h-40 flex flex-col items-center justify-center gap-2 text-sm">
				<p class="text-dimmed">No categories created</p>

				<Button
					label="Create category"
					color="surface"
					variant="soft"
					size="sm"
					icon="i-ph:plus"
					onclick={() => (dialogs.new_category = true)}
				/>
			</div>
		{/if}
	{/if}
</Dialog>

<Dialog
	bind:open={dialogs.new_category}
	overlay={{ class: 'z-41' }}
	title="Create New Category"
	x={{
		onclick: () => (dialogs.new_category = false),
	}}
	right={{
		label: 'Add',
		size: 'sm',
		variant: 'soft',
		icon: 'i-ph:plus',
		color: 'surface',
		ui: {
			base: [
				new_category.name.trim().length > 0 && new_category.icon.length > 0
					? ''
					: 'opacity-25 cursor-not-allowed',
			],
		},
		onclick: () => {
			if (!(new_category.name.trim().length > 0 && new_category.icon.length > 0)) return;
			if (!ledger.current) return;

			ledger.current.categories.push({
				id: uid(),
				color: '',
				icon: new_category.icon,
				name: new_category.name,
			});

			dialogs.new_category = false;
			new_category.name = '';
			new_category.icon = '';
		},
	}}
>
	<label for="new-category-id" class="-mb-2 text-sm"> Category Name</label>
	<input
		bind:value={new_category.name}
		id="new-category-id"
		class="border h-8 text-sm font-medium border-surface-accented outline-none rounded px-2 hover:(ring-inset ring-primary ring-2) transition"
	/>

	<label for="new-category-id" class="-mb-2 text-sm"> Icon </label>
	<div bind:this={icon_selector_el} class="grid grid-cols-7 gap-2 max-h-sm overflow-y-auto">
		{#each icons as icon, idx (idx)}
			{@const row = Math.floor(idx / 7)}
			{@const row_in_y = Math.floor((row / icon_rows) * 1000) / 10}

			<button
				class={[
					'aspect-square grid place-items-center rounded',
					new_category.icon === icon.name ? 'bg-primary' : 'hover:bg-surface-muted',
				]}
				onclick={() => (new_category.icon = icon.name)}
			>
				{#if row_in_y > icon_selector_scroll.progress.y - 10 && row_in_y < icon_selector_scroll.progress.y + 10}
					<iconify-icon icon="ph:{icon.name}" class="text-6"></iconify-icon>
				{/if}
			</button>
		{/each}
	</div>
</Dialog>

<Dialog bind:open={dialogs.account} overlay={{ class: 'z-40' }} title="Account">
	{#if ledger.current && ledger.current.accounts.length > 0}
		{#each ledger.current.accounts as account (account.id)}
			<Button />
		{/each}

		<Button />
	{:else}
		<div class="flex flex-col justify-center items-center gap-2 h-48">
			<p class="text-sm text-dimmed">No accounts available.</p>

			<Button
				label="Create account"
				icon="i-ph:plus"
				color="surface"
				size="sm"
				variant="soft"
				onclick={() => (dialogs.new_account = true)}
			/>
		</div>
	{/if}
</Dialog>

<Dialog
	bind:open={dialogs.new_account}
	overlay={{ class: 'z-40' }}
	title="New Account"
	x={{
		onclick: () => (dialogs.new_category = false),
	}}
>
	<input type="text" />
</Dialog>
