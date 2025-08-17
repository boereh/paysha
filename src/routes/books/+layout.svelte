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

<div class="md:(flex)">
  <Navigation />

  {@render children?.()}
</div>

<style>
  :global(body) {
    --at-apply: font-sans;
  }
</style>
