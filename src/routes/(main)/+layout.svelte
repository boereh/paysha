<script lang="ts">
	import LogoIcon from '$lib/components/logo-icon.svelte';
	import Logo from '$lib/components/logo.svelte';
	import { Button } from 'uisv';

	const { children } = $props();
</script>

<nav
	class="sticky top-0 border-b w-full p-4 border-surface-accented bg-inverted/75 backdrop-blur flex gap-4"
>
	<a href="/" class="w-fit">
		<Logo class="h-8 <sm:hidden" />
		<LogoIcon class="h-8 sm:hidden" />
	</a>

	<span class="flex-1"></span>

	<Button icon="i-ph:user-bold" variant="soft" color="surface" href="/account" label="Account" />
</nav>

{@render children()}
