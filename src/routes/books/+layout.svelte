<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import Navigation from "$lib/components/navigation.svelte";
  import "@unocss/reset/tailwind.css";
  import "virtual:uno.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Navigation />

{@render children?.()}

<style>
  :global(body) {
    --at-apply: font-sans;
  }
</style>
