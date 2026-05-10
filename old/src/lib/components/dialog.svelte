<script lang="ts">
	import { Portal, useId } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import { MediaQuery } from 'svelte/reactivity';
	import { fade, fly } from 'svelte/transition';
	import { cn } from 'tailwind-variants';
	import { type ButtonProps, Button } from 'uisv';

	type Props = {
		open?: boolean;
		children?: Snippet;
		overlay?: SvelteHTMLElements['div'];
		content?: SvelteHTMLElements['div'];
		x?: ButtonProps;
		title?: string;
		right?: ButtonProps;
	};

	let {
		open = $bindable(false),
		children,
		overlay = {},
		content = {},
		x,
		right,
		title,
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
				'z-20 inset-0 bg-inverted/75 fixed grid place-items-end backdrop-blur-md sm:place-items-center pt-4',
				small.current ? '' : '',
				overlay.class,
			])}
			transition:fade={{ duration: 150 }}
			onclick={(e) => {
				if (e.target !== e.currentTarget) return;
				open = false;
			}}
		>
			<div
				{...content}
				id={content_id}
				class={cn([
					'bg-inverted p-4 border border-surface-accented rounded-xl flex flex-col gap-4 max-h-full overflow-y-auto',
					'<sm:(rounded-0 border-0 border-t rounded-t-xl)',
					small.current ? 'w-full' : 'min-w-sm',
					content.class,
				])}
				transition:fly={{ y: 100 }}
			>
				{#if right || title || small}
					<div class="flex items-center relative h-7">
						<!-- {#if x || small.current}
							<Button
								variant="soft"
								color="surface"
								size="sm"
								icon="i-ph:x"
								{...x}
								onclick={() => void (open = false)}
							/>
						{/if} -->

						<span class="flex-1 w-2"></span>

						{#if title}
							<h1 class="text-sm font-medium uppercase absolute left-1/2 -translate-x-1/2">
								{title}
							</h1>
						{/if}

						{#if right}
							<Button variant="soft" color="surface" size="sm" {...right} />
						{/if}
					</div>
				{/if}

				{@render children?.()}
			</div>
		</div>
	{/if}
</Portal>
