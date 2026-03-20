<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/paysha-icon.svg';
	import LogoIcon from '$lib/components/logo-icon.svelte';
	import { setLedgerContext } from '$lib/contexts';
	import { Icon } from 'uisv';
	import 'virtual:uno.css';

	let { children } = $props();
	const ledger = $state<ReturnType<typeof setLedgerContext>>({
		current: null,
		loading: true,
	});
	const LINKS = [
		{ href: '/', label: 'Home', icon: LogoIcon },
		{ href: '/accounts', label: 'Accounts', icon: 'i-solar:wallet-money-linear' },
		{ href: '/transactions', label: 'Transactions', icon: 'i-solar:bill-list-linear' },
		{ href: '/settings', label: 'Settings', icon: 'i-solar:settings-linear' },
	];

	setLedgerContext(ledger);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>paysha</title>
</svelte:head>

<nav
	class={[
		'<sm:(fixed bottom-0 border-t) left-0 right-0 border-surface-accented bg-white p-2',
		'sm:(sticky top-0 border-b)',
	]}
>
	<div class="grid grid-cols-4 gap-2 max-w-sm mx-auto">
		{#each LINKS as link, idx (idx)}
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
