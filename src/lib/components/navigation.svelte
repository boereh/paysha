<script lang="ts">
	import type { Component } from 'svelte';
	import Gear from '~icons/ph/gear-fill';
	import House from '~icons/ph/house-line-fill';
	import CardsThree from '~icons/ph/cards-three-fill';
	import ListBullets from '~icons/ph/list-bullets-fill';
	import ChartPieSlice from '~icons/ph/chart-pie-slice-fill';
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
</script>

<div class="fixed bottom-0 left-0 right-0 p-2 py-4 md:sticky">
	<div
		bind:this={container_el}
		class="bg-zinc-100 border border-white rounded-2xl flex p-1 relative shadow-lg shadow-black/5"
	>
		{#each LINKS as [label, href, Icon], idx (idx)}
			{@const is_link =
				href === '/' ? page.url.pathname === '/' : page.url.pathname.startsWith(href)}
			<a
				bind:this={link_els[idx]}
				{href}
				class="text-xs flex-1 flex flex-col items-center justify-center px-2 rounded-md h-12 transition z-1 relative"
			>
				<Icon class={['size-5 transition absolute', is_link ? 'opacity-0' : 'opacity-50']} />

				<span class={['transition font-medium', is_link ? '' : 'opacity-0']}>
					{label}
				</span>
			</a>
		{/each}

		<span
			class="h-12 bg-white rounded-xl absolute z-0 transition-all duration-300 shadow"
			style:width="{link_boundings[link_idx]?.width || 0}px"
			style:left="{(link_boundings[link_idx]?.left || 0) - (container_bounding?.left || 0)}px"
		>
		</span>
	</div>
</div>
