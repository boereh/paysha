<script lang="ts">
	import LedgerCard from '$lib/components/ledger-card.svelte';
	import { useLedgerContext } from '$lib/contexts';
	import { LEDGER_SCHEMA, type Ledger } from '$lib/schemas';
	import { useLedgerStorage } from '$lib/utils/ledger.svelte';
	import { Button } from 'uisv';
	import { onMount } from 'svelte';
	import { safeParse } from 'valibot';
	import { page } from '$app/state';
	import Dialog from '$lib/components/dialog.svelte';
	import { goto } from '$app/navigation';

	const ledger = useLedgerContext();
	const ledgers = $state<Ledger[]>([]);
	let delete_confirm = $state(false);

	onMount(async () => {
		const storage = useLedgerStorage();

		for (const id of await storage.keys()) {
			const { success, output } = safeParse(LEDGER_SCHEMA, await storage.get(id));
			if (!success || ledgers.find((x) => x.id === output.id)) continue;
			ledgers.push(output);
		}
	});
</script>

<div class="p-4">
	<div class="container mx-auto space-y-4">
		<div class="flex items-center justify-between py-4">
			<h1 class="text-4xl font-bold">Settings</h1>
		</div>

		<h2 class="text-xl font-medium mt-8">Change Ledger</h2>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
			{#each ledgers as ledger (ledger.id)}
				{@const active = page.params.ledgerid === ledger.id}

				<LedgerCard {ledger} {active} />
			{/each}

			<Button
				color="surface"
				variant="outline"
				size="xl"
				icon="i-ph:squares-four"
				label="View all"
				ui={{ base: 'h-28 p-2 rounded-xl justify-center border-dashed' }}
				href="/"
			/>
		</div>

		<h2 class="text-xl font-medium mt-8">General</h2>

		<div
			class="p-4 border rounded-lg border-surface-accented bg-surface-muted grid gap-4 md:grid-cols-2 xl:grid-cols-3"
		>
			{#if ledger.current}
				<div>
					<label for="ledger-id">Ledger ID</label>

					<input
						id="ledger-id"
						bind:value={ledger.current.id}
						disabled
						class="mt-2 flex h-10 px-2 rounded border border-surface-accented bg-white cursor-not-allowed w-full opacity-75"
					/>
				</div>

				<div>
					<label for="ledger-id">Ledger Name</label>

					<input
						id="ledger-id"
						bind:value={ledger.current.name}
						class="mt-2 flex h-10 px-2 rounded border border-surface-accented bg-white w-full"
					/>
				</div>
			{/if}
		</div>

		<div class="p-4 border rounded-lg border-surface-accented space-y-4 bg-surface-muted mt-8">
			<h2 class="text-xl font-medium">Danger Zone</h2>

			<p class="text-muted">
				Be careful what you do here! This action will delete your ledger entirely, including all
				data associated with it.
			</p>

			<Button
				label="Delete Ledger"
				color="error"
				icon="i-ph:info"
				onclick={() => void (delete_confirm = true)}
			/>
		</div>
	</div>
</div>

<Dialog bind:open={delete_confirm}>
	<h1 class="text-lg font-semibold flex-1">Delete confirm</h1>

	<p>Confirm you still want to delete this ledger. This action is irrevirsible.</p>

	<table>
		<tbody>
			<tr>
				<td>ID</td>
				<td>{ledger.current?.id}</td>
			</tr>
			<tr>
				<td>Name</td>
				<td>{ledger.current?.name}</td>
			</tr>
		</tbody>
	</table>

	<div class="flex justify-end">
		<Button
			label="Delete"
			color="error"
			onclick={async () => {
				if (!page.params.ledgerid) return;
				await useLedgerStorage().del(page.params.ledgerid);
				goto('/');
			}}
		/>
	</div>
</Dialog>
