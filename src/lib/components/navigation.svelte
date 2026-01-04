<script lang="ts">
	import type { Component } from 'svelte';
	import { Gear, House, CardsThree, ListBullets, ChartPieSlice } from 'phsv/fill';
	import { page } from '$app/state';

	const LINKS: [string, string, Component][] = [
		['Home', '/', House],
		['Accounts', '/accounts', CardsThree],
		['Transactions', '/transactions', ListBullets],
		['Budgets', '/budgets', ChartPieSlice],
		['Settings', '/settings', Gear],
	];

	let container_el = $state<HTMLDivElement>();
	const container_bounding = $derived(container_el?.getBoundingClientRect());
	const link_els = $state<HTMLAnchorElement[]>([]);
	const link_idx = $derived(LINKS.findIndex((v) => v[1] === page.url.pathname));
	const link_boundings = $derived(link_els.map((v) => v.getBoundingClientRect()));

	const indicator_left = $derived.by(() => {
		if (!container_bounding || !link_boundings[link_idx]) {
			return LINKS.findIndex((v) => v[1] === page.url.pathname) * 20 + 10 + '%';
		}

		return link_boundings[link_idx].left - container_bounding.left + 'px';
	});
</script>

<div class="fixed bottom-0 left-0 right-0 p-4 md:sticky">
	<div
		bind:this={container_el}
		class="bg-zinc-100 border border-white rounded-2xl flex p-1 relative shadow-lg shadow-black/5 font-medium"
	>
		{#each LINKS as [label, href, Icon], idx (idx)}
			{@const is_link =
				href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href)}
			<a
				bind:this={link_els[idx]}
				{href}
				class="text-xs flex-1 flex flex-col items-center justify-center px-2 rounded-md h-12 transition-all z-1 relative"
			>
				<Icon class={['size-5 transition absolute', is_link ? 'opacity-0' : 'opacity-50']} />

				<span class={['transition', is_link ? '' : 'opacity-0']}>
					{label}
				</span>
			</a>
		{/each}

		<span
			class={[
				'bg-white absolute z-0 transition-all duration-300 shadow top-1/2 -translate-y-1/2',
				indicator_left.includes('%') ? 'rounded-[999px] h-0' : 'rounded-xl h-12',
			]}
			style:width="{link_boundings[link_idx]?.width || 0}px"
			style:left={indicator_left}
		>
		</span>
	</div>
</div>
