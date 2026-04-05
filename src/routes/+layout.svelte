<script lang="ts">
	import favicon from '$lib/assets/paysha-icon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import 'virtual:uno.css';

	let { children } = $props();

	$effect(() => {});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>paysha</title>
</svelte:head>

<ModeWatcher />

{@render children()}

<style>
	:global {
		body {
			@apply bg-inverted;
		}
	}
</style>
