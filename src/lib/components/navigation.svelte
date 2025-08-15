<script lang="ts">
  import { page } from "$app/state";
  import { Select, Dialog, Separator } from "bits-ui";
  import Check from "~icons/lucide/check";
  import ChevronsDown from "~icons/lucide/chevrons-down";
  import ChevronsUp from "~icons/lucide/chevrons-up";
  import ChevronsUpDown from "~icons/lucide/chevrons-up-down";
  import RussianRuble from "~icons/lucide/receipt-russian-ruble";
</script>

<nav class={["bg-white p-3 border-b border-neutral-200 grid gap-3"]}>
  <div class="flex gap-3 items-center">
    <a href="/">
      <RussianRuble class="h-8 w-8" />
    </a>

    {#if page}
      <span class="h-6 w-px bg-neutral-200"></span>

      {@render SelectBook()}
    {/if}
  </div>

  <nav class="bg-white border-b border-neutral-200 px-3">
    <div class="mx-auto max-w-7xl flex">Overview</div>
  </nav>
</nav>

{#snippet SelectBook()}
  <Select.Root
    type="single"
    onValueChange={(v) => ($selected_book = $books.find(({ id }) => id === v))}
    items={$books.map((book) => ({
      label: book.title,
      value: book.id,
    }))}
  >
    <Select.Trigger
      class="h-9 rounded-9px border-border-input bg-background data-placeholder:text-foreground-alt/50 inline-flex w-[296px] touch-none select-none items-center border px-[11px] text-sm transition-colors"
      aria-label="Select a theme"
    >
      {$selected_book}

      <ChevronsUpDown class="text-muted-foreground ml-auto size-6 text-red" />
    </Select.Trigger>

    <Select.Portal>
      <Select.Content
        class={[
          "focus-override bg-white shadow-lg outline-hidden z-50 h-96 select-none rounded-xl border px-1 py-3",
          "max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)]",
          "data-[state=open]:(animate-in fade-in-0 zoom-in-95)",
          "data-[state=closed]:(animate-out fade-out-0 zoom-out-95)",
          "data-[side=bottom]:(slide-in-from-top-2 translate-y-1)",
          "data-[side=left]:(slide-in-from-right-2 -translate-x-1)",
          "data-[side=right]:(slide-in-from-left-2 translate-x-1)",
          "data-[side=top]:(slide-in-from-bottom-2 -translate-y-1)",
        ]}
      >
        <Select.ScrollUpButton class="flex w-full items-center justify-center">
          <ChevronsUp class="size-3" />
        </Select.ScrollUpButton>

        <Select.Viewport>
          {#each $books as theme (theme.id)}
            <Select.Item
              class="rounded-button data-highlighted:bg-muted outline-hidden data-disabled:opacity-50 flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize"
              value={theme.id}
              label={theme.title}
            >
              {#snippet children({ selected: $selected_book })}
                {theme.title}

                {#if $selected_book}
                  <div class="ml-auto">
                    <Check aria-label="check" />
                  </div>
                {/if}
              {/snippet}
            </Select.Item>
          {/each}

          <Select.Item
            class="rounded-button data-highlighted:bg-muted outline-hidden data-disabled:opacity-50 flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize"
            value="new"
            label="New Book"
          >
            <div
              class="flex h-10 w-full select-none items-center py-3 pl-5 pr-1.5 text-sm capitalize"
            >
              New Book
            </div>
          </Select.Item>
        </Select.Viewport>

        <Select.ScrollDownButton
          class="flex w-full items-center justify-center"
        >
          <ChevronsDown class="size-3" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Portal>
  </Select.Root>
{/snippet}
