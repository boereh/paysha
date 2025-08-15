<script lang="ts">
  import Dialog from "$lib/components/ui/dialog.svelte";
  import { books } from "$lib/stores/books";
  import Book from "~icons/lucide/book-open-text";

  let create_book = $state(false);
</script>

<div
  class={[
    "h-[calc(100vh-3.5rem-1px)]",
    $books.length < 1 ? "flex flex-col items-center justify-center gap-3" : "",
  ]}
>
  {#if $books.length < 1}
    <Book class="size-24" />

    <p class="text-lg font-bold">Welcome to Paysha</p>

    <p class="text-neutral-600 mb-6">Get started and create your first book</p>

    <button
      class="h-9 bg-black rounded-md text-white transition-all px-6"
      aria-label="Create Book"
      onclick={() => (create_book = true)}
    >
      Create Book
    </button>
  {/if}
</div>

{#if create_book}
  <Dialog
    bind:open={create_book}
    title="Create Book"
    description="Get started and create your first book"
  >
    <div class="grid grid-cols-4 gap-6 items-center">
      <label for="book-name">Book Name</label>
      <input
        id="book-name"
        class="w-full col-span-3 px-3 h-9 rounded-md border border-neutral-200"
        type="text"
        placeholder="Enter book name"
      />

      <label for="book-description">Book Description</label>
    </div>
  </Dialog>
{/if}
