<script lang="ts">
	import favicon from '$lib/assets/paysha-icon.svg';
	import 'virtual:uno.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>paysha</title>
</svelte:head>

{@render children()}
