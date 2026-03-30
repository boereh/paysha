<script lang="ts">
	import type { Ledger } from '$lib/schemas';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import dayjs from 'dayjs';
	import relative_time from 'dayjs/plugin/relativeTime';
	import { Icon } from 'uisv';
	import { cn } from 'tailwind-variants';
	dayjs.extend(relative_time);

	type Props = SvelteHTMLElements['a'] & { ledger: Ledger; active?: boolean };

	let { ledger, class: classname, active = false, ...rest }: Props = $props();
</script>

<a
	class={cn([
		'p-4 border rounded-lg',
		classname,
		active
			? 'bg-primary-50 border-primary-200'
			: 'border-surface-accented bg-surface-muted hover:bg-surface-elevated',
	])}
	{...rest}
>
	<div class="flex w-full gap-4 mb-4 h-12">
		<img
			class="size-12 rounded-lg"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(ledger.id)}"
			alt={ledger.name}
		/>

		<div class="flex-1 flex flex-col justify-end">
			<div class="rounded text-lg font-semibold">{ledger.name}</div>
			<div class="rounded whitespace-nowrap text-sm">
				By
				<span class="italic">
					{ledger.authors.length < 1 ? 'You' : ledger.authors.join(', ')}
				</span>
			</div>
		</div>
	</div>

	<div class="h-4 rounded flex items-center gap-2 text-xs w-full text-muted">
		<Icon name="i-ph:hammer" title="Created" />
		<span class="flex-1">{dayjs(ledger.created).fromNow()}</span>

		<Icon name="i-ph:arrow-fat-line-up" title="Updated" />
		<span>{dayjs(ledger.created).fromNow()}</span>
	</div>
</a>
