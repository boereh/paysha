<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { setCreateTransaction, setLedgerContext, type CreateTransaction } from '$lib/contexts';
	import { LEDGER_SCHEMA } from '$lib/schemas';
	import { useLedgerStore } from '$lib/utils/ledger.svelte';
	import dayjs from 'dayjs';
	import { watch } from 'runed';
	import { onMount } from 'svelte';
	import { safeParse } from 'valibot';
	import relative_tme from 'dayjs/plugin/relativeTime';
	import Dialog from '$lib/components/dialog.svelte';
	import CreateTransactionDialog from './create-transaction-dialog.svelte';
	import Navigation from './navigation.svelte';

	dayjs.extend(relative_tme);

	let { children } = $props();
	const ledger = $state<ReturnType<typeof setLedgerContext>>({
		current: null,
		loading: true,
		date: new Date(),
		range: 'month',
	});
	const create_transaction = $state<CreateTransaction>({
		dialog: false,
		amount: [],
		type: 'expense',
		category: '',
		category_dialog: false,
		account: '',
		account_dialog: false,
		recurring: undefined,
		paid: true,
		date: dayjs(),
	});

	onMount(async () => {
		if (ledger.current) return (ledger.loading = false);
		if (!page.params.ledgerid) return;
		const result = await useLedgerStore().getItem(page.params.ledgerid);
		const { success, output } = safeParse(LEDGER_SCHEMA, result);
		if (!success) return goto('/');
		ledger.current = output;
		ledger.loading = false;
		create_transaction.account = ledger.current.default_account;
	});

	watch(
		() => $state.snapshot(ledger.current),
		(v) => {
			if (!v || !page.params.ledgerid) return;
			v.updated = Date.now();
			useLedgerStore().setItem(page.params.ledgerid, v);
		},
		{ lazy: true },
	);

	$effect(() => {
		if (typeof document === 'undefined') return;
		document.body.classList[create_transaction.dialog ? 'add' : 'remove']('overflow-hidden');
	});

	setLedgerContext(ledger);
	setCreateTransaction(create_transaction);
</script>

<svelte:head>
	<title>paysha</title>
</svelte:head>

<Navigation />

{@render children()}

<CreateTransactionDialog />

<Dialog bind:open={create_transaction.category_dialog}></Dialog>

<style>
	:global {
		html,
		body {
			scrollbar-width: thin;
			@apply: <sm:pb-[calc(var(--spacing)*16+1px)];
		}
	}
</style>
