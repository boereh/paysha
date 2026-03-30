<script lang="ts">
	import LogoIcon from '$lib/components/logo-icon.svelte';
	import Logo from '$lib/components/logo.svelte';
	import { Button } from 'uisv';

	const { children } = $props();
</script>

<nav
	class="sm:(sticky top-0 border-b) <sm:(fixed bottom-0 border-t) w-full p-4 border-surface-accented bg-white/75 backdrop-blur flex gap-4"
>
	<a href="/" class="w-fit">
		<Logo class="h-8 <sm:hidden" />
		<LogoIcon class="h-8 sm:hidden" />
	</a>

	<span class="flex-1"></span>

	<Button icon="i-ph:user-bold" variant="soft" color="surface" href="/account" label="Account" />
</nav>

<div class="p-4 min-h-[calc(100vh-var(--spacing)*16-1px)]">
	{@render children()}
</div>
