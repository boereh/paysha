<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import LogoIcon from '$lib/components/logo-icon.svelte';
	import { setLedgerContext } from '$lib/contexts';
	import { LEDGER_SCHEMA } from '$lib/schemas';
	import { useLedgerStorage } from '$lib/utils/ledger.svelte';
	import dayjs from 'dayjs';
	import { watch } from 'runed';
	import { onMount } from 'svelte';
	import { Icon, Button } from 'uisv';
	import { safeParse } from 'valibot';
	import relative_tme from 'dayjs/plugin/relativeTime';
	import Dialog from '$lib/components/dialog.svelte';
	import numbro from 'numbro';

	dayjs.extend(relative_tme);

	const NAV_LINKS = [
		{ href: `/${page.params.ledgerid}`, label: 'Home', icon: LogoIcon },
		{
			href: `/${page.params.ledgerid}/accounts`,
			label: 'Accounts',
			icon: 'i-ph:bank',
		},
		{
			href: `/${page.params.ledgerid}/transactions`,
			label: 'Transactions',
			icon: 'i-ph:receipt',
		},
		{
			href: `/${page.params.ledgerid}/budgets`,
			label: 'Budgets',
			icon: 'i-ph:piggy-bank',
		},
	];

	let { children } = $props();
	const ledger = $state<ReturnType<typeof setLedgerContext>>({
		current: null,
		loading: true,
		date: new Date(),
		range: 'month',
	});
	let new_transaction = $state<{
		enabled: boolean;
		amount: number[];
		category: string;
		account: string;
		recurring: boolean;
		paid: boolean;
		date: Date;
	}>({
		enabled: true,
		amount: [],
		category: '',
		account: '',
		recurring: false,
		paid: true,
		date: new Date(),
	});

	const new_transaction_amount = $derived.by(() => {
		const amount = new_transaction.amount;
		if (amount.length < 1) return '$0.00';
		const int = amount.slice(0, -2);
		const deci = amount.slice(-2);
		if (deci.length < 2) deci.unshift(0);
		return `$${numbro(parseInt(int.join('') || '0')).format({ thousandSeparated: true })}.${deci.join('')}`;
	});

	const date_range_label = $derived.by(() => {
		const day = dayjs(ledger.date);
		const formats: Record<(typeof ledger)['range'], string> = {
			year: day.format('YYYY'),
			biennial: `${day.isBefore(day.month(7).date(1)) ? 'Jan - Jun' : 'Jul - Dec'} ${day.format('YYYY')}`,
			quarter: day.format('MMMM YYYY'),
			bimonth: `${day.subtract(1, 'month').format('MMMM')} - ${day.format('MMMM')}`,
			month: day.format('MMMM YYYY'),
			biweek: day.format('MMMM YYYY'),
			week: day.format('MMMM '),
			day: dayjs().isSame(day) ? 'Today' : day.format('MMM D, YYYY'),
		};
		return formats[ledger.range];
	});

	onMount(async () => {
		if (ledger.current) return (ledger.loading = false);
		if (!page.params.ledgerid) return;
		const result = await useLedgerStorage().get(page.params.ledgerid);
		const { success, output } = safeParse(LEDGER_SCHEMA, result);
		if (!success) return goto('/');
		ledger.current = output;
		ledger.loading = false;
	});

	watch(
		() => $state.snapshot(ledger.current),
		(v) => {
			if (!v || !page.params.ledgerid) return;
			useLedgerStorage().set(page.params.ledgerid, v);
		},
		{ lazy: true },
	);

	setLedgerContext(ledger);

	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.classList[new_transaction.enabled ? 'add' : 'remove']('overflow-hidden');
	});
</script>

<svelte:head>
	<title>paysha</title>
</svelte:head>

<nav
	class="top-0 sm:(sticky z-10 border-surface-accented) p-4 bg-white/75 backdrop-blur-lg flex items-center justify-between gap-2 border-b border-transparent"
>
	<!-- DATE SELECTOR -->
	<div class="flex items-center gap-1">
		<Button
			size="xs"
			icon="i-ph:caret-left"
			color="surface"
			variant="ghost"
			onclick={() => {
				const day = dayjs(ledger.date);
				const options: Record<(typeof ledger)['range'], dayjs.Dayjs> = {
					biennial: day.subtract(6, 'month'),
					bimonth: day.subtract(2, 'month'),
					biweek: day.subtract(2, 'week'),
					day: day.subtract(1, 'day'),
					month: day.subtract(1, 'month'),
					quarter: day.subtract(3, 'month'),
					week: day.subtract(1, 'week'),
					year: day.subtract(1, 'year'),
				};
				ledger.date = options[ledger.range].toDate();
			}}
		/>

		<Button label={date_range_label} variant="ghost" color="surface" />

		<Button
			size="xs"
			icon="i-ph:caret-right"
			color="surface"
			variant="ghost"
			onclick={() => {
				const day = dayjs(ledger.date);
				const options: Record<(typeof ledger)['range'], dayjs.Dayjs> = {
					biennial: day.add(6, 'month'),
					bimonth: day.add(2, 'month'),
					biweek: day.add(2, 'week'),
					day: day.add(1, 'day'),
					month: day.add(1, 'month'),
					quarter: day.add(3, 'month'),
					week: day.add(1, 'week'),
					year: day.add(1, 'year'),
				};
				ledger.date = options[ledger.range].toDate();
			}}
		/>
	</div>

	{#if ledger.current}
		<a href="/{ledger.current.id}/settings">
			<img
				class="size-8 rounded-lg"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(ledger.current.id)}"
				alt={ledger.current.name}
			/>
		</a>
	{/if}
</nav>

<nav
	class={[
		'fixed p-4 left-0 right-0 z-11',
		'sm:(top-0 pointer-events-none)',
		'<sm:(bottom-0 bg-white border-t border-surface-accented)',
	]}
>
	<div
		class="grid grid-cols-5 grid-rows-1 gap-2 max-w-sm mx-auto pointer-events-auto w-full max-w-sm"
	>
		{#each NAV_LINKS as link, idx (idx)}
			{@const is_link = page.url.pathname === link.href}

			<a
				href={link.href}
				class={[
					'flex flex-col items-center justify-center gap-1 transition relative h-8',
					is_link ? 'text-primary-500' : 'text-muted',
				]}
				title={link.label}
				style:grid-column={idx > 1 ? idx + 2 : idx + 1}
			>
				<Icon
					name={link.icon}
					class={[
						'transition-all absolute',
						link.label === 'Home' ? 'size-5' : 'size-6',
						is_link ? 'mb-4 text-transparent' : '',
					]}
				/>

				<span
					class={[
						'text-xs tracking-wide transition-all top-8 font-medium',
						is_link ? '' : 'text-transparent',
					]}
				>
					{link.label}
				</span>
			</a>
		{/each}

		<span class="col-3 row-1 relative">
			<button
				class="absolute left-1/2 -translate-1/2 size-12 bg-primary text-white rounded-full grid place-items-center top-1/2 hover:bg-primary-400 transition"
				onclick={() => void (new_transaction.enabled = true)}
			>
				<Icon name="i-ph:plus-bold" class="size-5" />
			</button>
		</span>
	</div>
</nav>

{@render children()}

<Dialog bind:open={new_transaction.enabled}>
	<div class="flex justify-between gap-4 items-center">
		<Button
			size="sm"
			variant="soft"
			color="surface"
			icon="i-ph:x"
			onclick={() => void (new_transaction.enabled = false)}
		/>

		<h1 class="text-sm font-medium uppercase">New Transaction</h1>

		<Button size="sm" variant="soft" color="surface" label="Save" />
	</div>

	<!-- <div class="flex gap-4 py-4">
		<Button
			variant="outline"
			color="error"
			size="sm"
			icon="i-ph:shopping-cart-fill"
			label="EXPENSE"
			ui={{ base: 'flex-1 justify-center' }}
		/>

		<Button
			variant="outline"
			color="success"
			size="sm"
			icon="i-ph:currency-dollar-simple-fill"
			label="INCOME"
			ui={{ base: 'flex-1 justify-center' }}
		/>

		<Button
			variant="outline"
			color="info"
			size="sm"
			icon="i-ph:arrows-left-right-bold"
			label="TRANSFER"
			ui={{ base: 'flex-1 justify-center' }}
		/>
	</div> -->

	<input
		bind:value={() => new_transaction_amount, () => {}}
		class="outline-none text-center text-3xl h-40 caret-transparent font-mono select-none"
		placeholder="$0.00"
		onkeydown={({ key }) => {
			const n = parseInt(key);
			const amount = new_transaction.amount;
			if (key === 'Backspace' && amount.length > 0) return new_transaction.amount.pop();
			if (isNaN(n)) return;
			new_transaction.amount.push(n);
		}}
	/>
</Dialog>

<!-- <Portal>
	{#if create_transaction}
		<div
			role="none"
			class="bg-inverted/75 backdrop-blur-md inset-0 fixed z-20 grid place-items-center"
			transition:fade={{ duration: 150 }}
			onclick={(e) => {
				if (e.currentTarget !== e.target) return;
				create_transaction = false;
			}}
		>
			{#if create_transaction}
				<div
					class="bg-white p-4 rounded-lg border border-surface-accented"
					transition:fly={{ y: -100 }}
				>


				</div>{/if}
		</div>
	{/if}
</Portal> -->

<style>
	:global(body) {
		@apply: <sm:pb-[calc(var(--spacing)*16+1px)];
	}
</style>
