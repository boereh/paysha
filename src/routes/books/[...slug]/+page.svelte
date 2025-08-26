<script lang="ts">
  import { page } from "$app/state";
</script>

{#each { length: 10 }}
  <div class="h-lg">{page.data.book}</div>
{/each}
