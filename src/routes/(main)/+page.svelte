<script lang="ts">
	import { goto } from '$app/navigation';
	import { LEDGER_SCHEMA, type Ledger } from '$lib/schemas';
	import { useLedgerStorage } from '$lib/utils/ledger.svelte';
	import { watch } from 'runed';
	import { onMount } from 'svelte';
	import { uid } from 'uid/secure';
	import { Button } from 'uisv';
	import { safeParse } from 'valibot';
	import LedgerCard from '$lib/components/ledger-card.svelte';
	import { page } from '$app/state';

	const ledger_storage = useLedgerStorage();
	const ledgers = $state<Ledger[]>([]);
	let loading = $state(true);

	onMount(async () => {
		const storage = useLedgerStorage();

		for (const id of await storage.keys()) {
			const { success, output } = safeParse(LEDGER_SCHEMA, await storage.get(id));
			if (!success || ledgers.find((x) => x.id === output.id)) continue;
			ledgers.push(output);
		}

		loading = false;
	});

	watch(
		() => $state.snapshot(ledgers),
		(val, prev) => {
			if (loading) return;
			for (const ledg of val) {
				const prev_idx = (prev || []).findIndex((x) => x.id === ledg.id);

				if (prev_idx < -1) ledger_storage.del(ledg.id);
				else ledger_storage.set(ledg.id, ledg);
			}
		},
	);
</script>

<div class="p-4">
	<div class="container mx-auto space-y-4">
		<h1 class="text-3xl font-semibold my-8">Ledgers</h1>

		<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#if loading}
				{#each { length: 4 }, idx (idx)}
					<div class="bg-surface-muted rounded-lg border border-surface-accented p-4">
						<div class="flex gap-4 mb-2">
							<div class="size-12 rounded-lg bg-muted animate-pulse"></div>
							<div class="flex-1 flex flex-col gap-2 animate-pulse">
								<div class="h-4 rounded w-full bg-muted"></div>
								<div class="h-4 rounded w-24 bg-surface-accented"></div>
							</div>
						</div>

						<div class="h-4 w-full rounded bg-surface-accented"></div>
					</div>
				{/each}
			{:else}
				{#each ledgers as ledger (ledger.id)}
					{@const active = page.params.ledgerid === ledger.id}
					<LedgerCard {ledger} {active} href="/{ledger.id}" class={[active ? '' : '']} />
				{/each}

				<Button
					color="surface"
					variant="outline"
					size="xl"
					icon="i-ph:plus-circle"
					label="Create ledger"
					ui={{ base: 'h-28 p-2 rounded-xl justify-center border-dashed text-' }}
					onclick={async () => {
						const id = uid();

						ledger_storage.set(id, {
							accounts: [],
							created: Date.now(),
							updated: Date.now(),
							id,
							authors: [],
							recurrings: [],
							storage: 'local',
							name: 'Untitled Ledger',
							transactions: [],
							budgets: [],
							enable_nonpaid: true,
							rollover: true,
							startdayofmonth: 1,
							startdayofweek: 'monday',
						});

						goto(`/${id}`);
					}}
				/>
			{/if}
		</div>
	</div>
</div>
