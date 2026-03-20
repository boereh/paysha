<script lang="ts">
	import { Portal, useId } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { fade } from 'svelte/transition';

	type Props = {
		open?: boolean;
		children?: Snippet;
	};

	let { open = $bindable(false), children }: Props = $props();
	const overlay_id = useId();
	const content_id = useId();
	const small = new MediaQuery('max-width: 28rem');
</script>

<Portal>
	{#if open}
		<div
			id={overlay_id}
			role="none"
			class={[
				'z-20 inset-0 bg-white/75 fixed grid place-items-center p-4',
				small.current ? '' : '',
			]}
			transition:fade={{ duration: 150 }}
			onclick={(e) => {
				if (e.target !== e.currentTarget) return;
				open = false;
			}}
		>
			<div
				id={content_id}
				class={[
					'bg-white p-4 border border-surface-accented rounded-xl flex flex-col gap-4 max-h-full overflow-y-auto',
					small.current ? 'w-full' : 'min-w-sm',
				]}
			>
				{@render children?.()}
			</div>
		</div>
	{/if}
</Portal>
