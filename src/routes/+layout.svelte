<script lang="ts">
  import favicon from "$lib/assets/favicon.svg";
  import "@unocss/reset/tailwind.css";
  import "virtual:uno.css";

  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>Paysha</title>
  <meta name="description" content="a nice, open-looking spreadsheet" />
</svelte:head>

{@render children?.()}

<style>
  :global(body) {
    --at-apply: font-sans;
  }
</style>
