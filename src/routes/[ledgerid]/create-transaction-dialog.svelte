<script lang="ts">
	import Dialog from '$lib/components/dialog.svelte';
	import { Button } from 'uisv';
	import numbro from 'numbro';
	import { useCreateTransaction, useLedgerContext } from '$lib/contexts';
	import dayjs from 'dayjs';
	import relative_time from 'dayjs/plugin/relativeTime';
	import { DropdownMenu } from 'bits-ui';

	dayjs.extend(relative_time);

	const create_transaction = useCreateTransaction();
	const ledger = useLedgerContext();

	const create_transaction_amount = $derived.by(() => {
		const amount = create_transaction.amount;
		if (amount.length < 1) return '$0.00';
		const int = amount.slice(0, -2);
		const deci = amount.slice(-2);
		if (deci.length < 2) deci.unshift(0);
		return `$${numbro(parseInt(int.join('') || '0')).format({ thousandSeparated: true })}.${deci.join('')}`;
	});
</script>

<Dialog bind:open={create_transaction.dialog} overlayclose={false}>
	<div class="flex justify-between gap-4 items-center">
		<Button
			size="sm"
			variant="soft"
			color="surface"
			icon="i-ph:x"
			onclick={() => void (create_transaction.dialog = false)}
		/>

		<h1 class="text-sm font-medium uppercase">New Transaction</h1>

		<Button size="sm" variant="soft" color="surface" label="Save" />
	</div>

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
		<span class="text-sm">Category</span>

		<Button
			icon="i-ph:caret-right"
			variant="link"
			color="surface"
			label=". . ."
			iconposition="right"
			size="xs"
			onclick={() => {
				create_transaction.category_dialog = !create_transaction.category_dialog;
			}}
		/>
	</div>

	<hr class="border-surface-accented" />

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
			onclick={() => {
				create_transaction.category_dialog = !create_transaction.category_dialog;
			}}
		/>
	</div>

	<hr class="border-surface-accented" />

	<div class="flex items-center justify-between">
		<span class="text-sm">Account</span>

		<Button
			icon="i-ph:caret-right"
			variant="link"
			color="surface"
			label={ledger.current?.accounts.find((x) => x.id === create_transaction.account)?.name}
			iconposition="right"
			size="xs"
			onclick={() => {
				create_transaction.category_dialog = !create_transaction.category_dialog;
			}}
		/>
	</div>

	<hr class="border-surface-accented" />

	<div class="flex items-center justify-between">
		<span class="text-sm">Recurring</span>

		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						icon="i-ph:caret-right"
						variant="link"
						color="surface"
						label={create_transaction.recurring ? '' : 'No'}
						iconposition="right"
						size="xs"
						onclick={() => {
							create_transaction.category_dialog = !create_transaction.category_dialog;
						}}
					/>{/snippet}
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					class="border-surface-accented bg-surface-base z-30 outline-hidden focus-visible:outline-hidden rounded-xl border p-2"
					sideOffset={8}
				>
					<Button color="surface" variant="ghost" label="No Recurrence" />

					<DropdownMenu.Arrow class="text-surface-accented" />
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	</div>
</Dialog>
