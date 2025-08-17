<script lang="ts">
  import Navigation from "$lib/components/navigation.svelte";

  let { children } = $props();
</script>

<div class="md:(flex)">
  <Navigation />

  {@render children?.()}
</div>
