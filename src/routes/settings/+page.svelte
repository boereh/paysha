<script>
	import Dialog from '$lib/components/dialog.svelte';
	import { getCurrentLedger, useLocalStorage } from '$lib/utils/ledger';
	import { Icon, Button, Input } from 'uisv';

	let current_ledger = $state('Example Ledger');
	let manage_ledgers = $state(true);
	let create_ledger = $state(true);
</script>

<div class="p-4">
	<div class="container mx-auto">
		<div class="flex items-center justify-between py-4">
			<h1 class="text-4xl font-bold">Settings</h1>

			<button
				class="h-10 border px-2 border-surface-accented bg-surface-muted rounded max-w-4xs flex items-center gap-2 font-medium text-sm"
				onclick={() => (manage_ledgers = !manage_ledgers)}
			>
				<img
					class="size-6 rounded"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(current_ledger)}"
					alt="ledger"
				/>

				<span class="<sm:hidden">{current_ledger}</span>

				<Icon
					name="i-solar:alt-arrow-up-linear"
					class={['transition', manage_ledgers ? 'rotate-180' : '']}
				/>
			</button>
		</div>

		<div class="py-2"></div>

		<h2 class="text-xl font-medium py-2">General</h2>

		<div class="p-4 border rounded-lg border-surface-accented space-y-4"></div>
	</div>
</div>
<!--
<Drawer bind:open={manage_ledgers}>
	<div class="flex justify-between items-center">
		<span class="font-semibold text-xl">Ledgers</span>

		<Button icon="i-solar:document-add-bold" color="surface" label="New ledger" />
	</div>

	<div class="flex gap-1">
		<Button
			variant="ghost"
			color="surface"
			size="xl"
			ui={{ base: 'flex-1 px-2' }}
			onclick={async (e) => {
				if (e.target !== e.currentTarget) return;
				await useLocalStorage().set('current', 'Example list');
				await getCurrentLedger();
				manage_ledgers = false;
			}}
		>
			<img
				class="size-6 rounded pointer-events-none"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(current_ledger)}"
				alt="ledger"
			/>

			<span class="<sm:hidden pointer-events-none flex-1 text-left">{current_ledger}</span>
		</Button>

		<Button icon="i-solar:menu-dots-bold" variant="ghost" color="surface" size="xl" />
	</div>
</Drawer> -->

<Dialog bind:open={manage_ledgers}>
	<div class="flex justify-between items-center">
		<span class="font-semibold text-md">Ledgers</span>

		<Button
			icon="i-solar:document-add-bold"
			color="surface"
			label="New ledger"
			onclick={() => void (create_ledger = true)}
		/>
	</div>

	<div class="flex gap-1">
		<Button
			variant="ghost"
			color="surface"
			size="xl"
			ui={{ base: 'flex-1 px-2' }}
			onclick={async (e) => {
				if (e.target !== e.currentTarget) return;
				await useLocalStorage().set('current', 'Example list');
				await getCurrentLedger();
				manage_ledgers = false;
				create_ledger = false;
			}}
		>
			<img
				class="size-6 rounded pointer-events-none"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(current_ledger)}"
				alt="ledger"
			/>

			<span class="<sm:hidden pointer-events-none flex-1 text-left">{current_ledger}</span>
		</Button>

		<Button icon="i-solar:menu-dots-bold" variant="ghost" color="surface" size="xl" />
	</div>
</Dialog>

<Dialog bind:open={create_ledger}>
	<div class="flex justify-between items-center">
		<span class="font-semibold text-md">Create New Ledger</span>

		<Button
			icon="i-solar:close-circle-linear"
			variant="ghost"
			color="surface"
			onclick={() => void (create_ledger = false)}
		/>
	</div>

	<div class="flex flex-col gap-1">
		<label for="create-ledger-name">Ledger name</label>

		<Input id="create-ledger-name" color="surface" variant="subtle" />
	</div>
</Dialog>
