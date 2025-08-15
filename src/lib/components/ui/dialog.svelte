<script lang="ts">
  import { Dialog } from "bits-ui";
  import type { Snippet } from "svelte";
  import X from "~icons/lucide/x";

  type Props = {
    children?: Snippet;
    title: string;
    description: string;
    open: boolean;
  };

  let {
    children,
    title,
    description,
    open = $bindable(false),
  }: Props = $props();
</script>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-20 bg-black/50" />
    <Dialog.Content
      class="bg-white rounded-lg border border-neutral-100 p-6 z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 space-y-6 max-w-full min-w-xs"
    >
      <div class="<sm:(text-center)">
        <p class="text-lg font-bold mb-1.5">{title}</p>
        <p class="text-neutral-500">{description}</p>
      </div>

      {@render children?.()}

      <button
        class="absolute top-0 right-3 w-6 h-6 grid place-items-center"
        aria-label="close"
        onclick={() => (open = false)}
      >
        <X />
      </button>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
