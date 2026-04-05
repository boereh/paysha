<script lang="ts">
	import { Portal, useId } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { MediaQuery } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';
	import { cn } from 'tailwind-variants';

	type Props = {
		open?: boolean;
		children?: Snippet;
		overlay?: SvelteHTMLElements['div'];
		content?: SvelteHTMLElements['div'];
		overlayclose?: boolean;
	};

	let {
		open = $bindable(false),
		children,
		overlay = {},
		content = {},
		overlayclose = true,
	}: Props = $props();
	const overlay_id = useId();
	const content_id = useId();
	const small = new MediaQuery('max-width: 28rem');
</script>

<Portal>
	{#if open}
		<div
			{...overlay}
			id={overlay_id}
			role="none"
			class={cn([
				'z-20 inset-0 bg-inverted/75 fixed grid place-items-center backdrop-blur',
				small.current ? '' : '',
				overlay.class,
			])}
			transition:fade={{ duration: 150 }}
			onclick={(e) => {
				if (e.target !== e.currentTarget || !overlayclose) return;
				open = false;
			}}
		>
			<div
				{...content}
				id={content_id}
				class={cn([
					'bg-inverted p-4 border border-surface-accented rounded-xl flex flex-col gap-4 max-h-full overflow-y-auto',
					'<sm:(h-full rounded-0 border-0)',
					small.current ? 'w-full' : 'min-w-sm',
					content.class,
				])}
				transition:fly={{ y: 100 }}
			>
				{@render children?.()}
			</div>
		</div>
	{/if}
</Portal>
