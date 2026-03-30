<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import LogoIcon from '$lib/components/logo-icon.svelte';
	import { setLedgerContext } from '$lib/contexts';
	import { LEDGER_SCHEMA } from '$lib/schemas';
	import { useLedgerStorage } from '$lib/utils/ledger.svelte';
	import { watch } from 'runed';
	import { onMount } from 'svelte';
	import { Icon, Button } from 'uisv';
	import { safeParse } from 'valibot';

	const NAV_LINKS = [
		{ href: `/${page.params.ledgerid}`, label: 'Home', icon: LogoIcon },
		{
			href: `/${page.params.ledgerid}/accounts`,
			label: 'Accounts',
			icon: 'i-ph:cards-three-bold',
		},
		{
			href: `/${page.params.ledgerid}/transactions`,
			label: 'Transactions',
			icon: 'i-ph:receipt-bold',
		},
		{
			href: `/${page.params.ledgerid}/budgets`,
			label: 'Budgets',
			icon: 'i-ph:bank-bold',
		},
	];

	let { children } = $props();
	const ledger = $state<ReturnType<typeof setLedgerContext>>({
		current: null,
		loading: true,
		date: new Date(),
		range: 'month',
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
</script>

<svelte:head>
	<title>paysha</title>
</svelte:head>

<nav
	class="top-0 sm:(sticky z-10 p-4 border-surface-accented) p-2 bg-white flex items-center justify-between gap-2 border-b border-transparent sm:h-20"
>
	<!-- DATE SELECTOR -->
	<div class="flex items-center gap-2">
		<Button size="xs" icon="i-ph:caret-left" color="surface" variant="ghost" />
		<span> </span>
		<Button size="xs" icon="i-ph:caret-right" color="surface" variant="ghost" />
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
	<div class="grid grid-cols-4 gap-2 max-w-sm mx-auto pointer-events-auto w-full max-w-sm">
		{#each NAV_LINKS as link, idx (idx)}
			{@const is_link = page.url.pathname === link.href}

			<a
				href={link.href}
				class={[
					'flex flex-col items-center justify-center gap-1 transition relative h-12',
					is_link ? 'text-primary-500' : 'text-muted',
				]}
			>
				<Icon
					name={link.icon}
					class={['size-6 transition-all', link.href === '/' && 'py-0.5', is_link ? 'mb-4' : '']}
				/>

				<span
					class={[
						'text-xs tracking-wide transition-all absolute top-8 font-medium',
						is_link ? '' : 'text-transparent',
					]}
				>
					{link.label}
				</span>
			</a>
		{/each}
	</div>
</nav>

{@render children()}

<style>
	:global(body) {
		padding-bottom: calc(var(--spacing) * 20 + 1px);
	}
</style>
