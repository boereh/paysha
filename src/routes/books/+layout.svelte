<script lang="ts">
  import Navigation from "$lib/components/navigation.svelte";

  let { children } = $props();
</script>

<Navigation />

{@render children?.()}
