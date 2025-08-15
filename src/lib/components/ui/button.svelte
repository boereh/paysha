<script lang="ts">
  import type { Snippet } from "svelte";
  type Variant = "primary" | "filled" | "soft";
  type Props = { children?: Snippet; variant?: Variant };

  const VARIANTS: Record<Variant, string[]> = {
    primary: ["border-3 border-black h-9 px-6 neushadow", ""],
    filled: [],
    soft: [],
  };

  let { children, variant = "primary" }: Props = $props();
</script>

<button>
  {@render children?.()}
</button>

<style>
  .neushadow {
    box-shadow: 5px 5px black;
  }
</style>
