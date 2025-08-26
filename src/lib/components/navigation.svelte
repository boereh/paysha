<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { Select, Collapsible } from "bits-ui";
  import ChevronsDown from "~icons/lucide/chevrons-down";
  import ChevronsUp from "~icons/lucide/chevrons-up";
  import ChevronsUpDown from "~icons/lucide/chevrons-up-down";
  import RussianRuble from "~icons/lucide/receipt-russian-ruble";
  import Settings from "~icons/lucide/settings";
  import X from "~icons/lucide/x";
  import Plus from "~icons/lucide/plus";
  import Layers from "~icons/lucide/layers";
  import Ellipsis from "~icons/lucide/ellipsis-vertical";
  import LayoutDashboard from "~icons/lucide/layout-dashboard";
  import type { Book } from "$lib/types";

  let new_book = $state(false);

  const book_id = $derived(page.url.pathname.split("/")[2]);
  const book_page = $derived(parseInt(page.url.pathname.split("/")[3]) || 0);
  const book = $derived.by(() => {
    if (!page.data.book) return;
    if (page.data.book.id !== book_id) return;
    return page.data.book as Book;
  });
  const book_pages = $derived(
    book?.pages?.map((b) => ({ label: b.title, pid: b.pid })) || [],
  );
</script>

<!-- Mobile navigation -->
<nav
  class={[
    "hidden bg-neutral-100 p-3  border-b border-neutral-200 grid gap-3",
    page.data.book ? "pb-0" : "",
  ]}
>
  <div class="flex gap-3 items-center">
    <a href="/" aria-label="Home">
      <RussianRuble class="h-8 w-8" />
    </a>

    {#if book_id}
      <span class="h-6 w-px bg-neutral-200"></span>

      {@render SelectBook()}
    {/if}
  </div>

  {#if book_id}
    <div class="flex">
      <div class="flex-grow flex">
        <div class="flex h-9 gap-1.5 items-center">
          {@render NavigationButton({ pid: 0, label: "Overview" })}

          <span class="w-px h-6 bg-neutral-200"></span>

          {#each book_pages as page (page.pid)}
            {@render NavigationButton(page)}
          {/each}
        </div>
      </div>

      <button
        aria-label="Settings page"
        class={[
          "h-9 w-9 grid place-items-center transition rounded-md",
          "hover:bg-neutral-200",
        ]}
      >
        <Settings />
      </button>
    </div>
  {/if}
</nav>

<!-- Desktop navigation -->

<nav
  class={[
    "top-0 bg-neutral-100 p-3 border-r border-neutral-200 space-y-6 w-full",
    page.data.book ? "pb-0" : "sticky",
  ]}
>
  {#if book_id}
    {@render SelectBook()}
  {/if}
</nav>

{#if book_id}
  <nav class="sticky bg-neutral-100 top-0 border-b p-1">
    <div class="flex p-1 items-center bg-neutral-100 rounded-lg">
      <a
        aria-label="{book?.title}'s page"
        href="/books/{book_id}"
        class={[
          "h-9 px-6 border rounded-md transition-all flex gap-1.5 items-center",
          book_page === 0
            ? "bg-white shadow-black/5 text-blue-700"
            : "hover:(text-blue-700) shadow-transparent border-transparent",
        ]}
      >
        <LayoutDashboard />

        Overview
      </a>

      <span
        class={[
          "h-3 w-px transition",
          [0, 1].includes(book_page) ? "" : "bg-neutral-200",
        ]}
      ></span>

      {#each book_pages as page (page.pid)}
        {@render NavigationButton(page)}
      {/each}
    </div>
  </nav>
{/if}

{#snippet NavigationButton(page: (typeof book_pages)[0], last?: boolean)}
  {@const after_page = book_page === page.pid + 1}
  {@const is_page = book_page === page.pid}
  <a
    aria-label={`Navigate to ${page.label}`}
    href="/books/{book_id}/{page.pid || ''}"
    class={[
      "h-9 px-6 border rounded-md transition-all flex items-center justify-between relative group",
      "",
      is_page
        ? "text-blue-700 bg-white border-neutral-200"
        : "hover:(text-blue-700) border-transparent shadow-transparent",
    ]}
  >
    {page.label}
  </a>
  <!-- <button
      aria-label="Delete page"
      class={[
        "absolute w-6 h-6 right-1.5 grid place-items-center z-1 rounded-md transition hover:(bg-neutral-200)",
      ]}
      onclick={() => console.log("click")}
    >
      <Ellipsis />
    </button> -->

  {#if !last}
    <span
      class={[
        "h-3 w-px transition",
        after_page || is_page ? "" : "bg-neutral-200",
      ]}
    ></span>
  {/if}
{/snippet}

{#snippet SelectBook()}
  <Select.Root
    type="single"
    onValueChange={(v) => {
      if (v !== "new") return goto(`/books/${v}`);
      new_book = true;
    }}
  >
    <Select.Trigger
      class={[
        "h-12 rounded-md flex items-center gap-3 w-full px-3 transition max-w-full hover:(bg-neutral-200)",
        "data-[state=open]:(bg-neutral-200)",
      ]}
      aria-label="Select book"
    >
      <img
        src="https://api.dicebear.com/9.x/shapes/svg?seed={book_id}"
        alt="Book cover"
        class="aspect-square h-6 rounded-md"
      />

      <span
        class="text-sm text-left font-medium max-w-full whitespace-nowrap overflow-hidden flex-grow"
      >
        <div class="truncate">
          {page.data?.book?.title}
        </div>
        <div class="text-xs text-neutral-600 uppercase">
          {page.data?.book?.local ? "Local" : "Cloud"} Stored
        </div>
      </span>

      <ChevronsUpDown class="min-w-4 h-6" />
    </Select.Trigger>

    <Select.Portal>
      <Select.Content
        side="right"
        align="start"
        class={[
          "focus-override bg-white shadow-lg outline-hidden z-10 select-none rounded-md border",
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

        <Select.Viewport class="p-1.5 space-y-1.5">
          <p
            class="text-xs font-semibold px-3 text-neutral-500 h-6 flex items-center"
          >
            Books
          </p>

          {#each page.data?.books || [] as book (book.id)}
            <Select.Item
              class="h-12 px-3 flex gap-3 items-center rounded-md transition hover:(bg-neutral-100)"
              value={book.id}
              label={book.title}
            >
              <img
                src="https://api.dicebear.com/9.x/shapes/svg?seed={book.id}"
                alt="Book cover"
                class="aspect-square h-6 rounded-md"
              />

              {book.title}
            </Select.Item>
          {/each}

          <hr />

          <Select.Item
            class="h-12 px-3 rounded-md flex gap-3 items-center text-neutral-500 hover:(bg-neutral-100)"
            value="new"
            label="New Book"
          >
            <span class="w-6 h-6 grid place-items-center border rounded-md">
              <Plus class="size-5" />
            </span>

            New Book
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
