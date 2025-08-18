<script lang="ts">
  import { page } from "$app/state";

  $inspect(page.data);
</script>

{#each { length: 10 }}
  <div class="h-lg">what</div>
{/each}
