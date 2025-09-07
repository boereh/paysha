<script setup lang="ts">
import dayjs from "dayjs";
import { values } from "idb-keyval";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const books = useBooks();
const current_book = useCurrentBook();
const ssr_fetched = ref(false);

if (!isBrowser()) {
    fetchBooks();
    ssr_fetched.value = true;
}

async function fetchBooks() {
    if (ssr_fetched.value) return (ssr_fetched.value = false);

    const fetched_books = await $fetch<Book[]>(`/api/books`, {
        method: "POST",
    });

    for (const book of fetched_books) {
        if (books.value.find((b) => b.id === book.id)) continue;

        books.value.push(book);
    }
}

onMounted(async () => {
    fetchBooks();

    const book_store = useBookStore();
    const stored_books = await values<Book>(book_store);

    for (const book of stored_books) {
        if (books.value.find((b) => b.id === book.id)) continue;

        books.value.push(book);
    }
});

onUnmounted(() => {});
</script>

<template>
    <div class="px-2">
        <div
            class="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            <div
                v-for="book in books"
                :key="book.id"
                :to="`/books/${book.id}`"
                :class="[
                    'h-25 bg-neutral-100 p-4 rounded-xl transition border-2 border-transparent group cursor-pointer relative',
                    'hover:(bg-neutral-200 border-neutral-300)',
                    'dark:(bg-neutral-800) dark:hover:(bg-neutral-800 border-neutral-700)',
                ]"
                @click="() => (current_book = book)"
            >
                <NuxtLink :to="`/books/${book.id}`" class="space-y-2">
                    <div class="flex gap-2 mr-8">
                        <img
                            class="w-10 h-10 rounded-md"
                            :src="`https://api.dicebear.com/9.x/shapes/svg?seed=${book.id}`"
                            alt="book cover"
                        />

                        <span class="flex flex-col">
                            <h1 class="truncate">
                                {{ book.title }}
                            </h1>

                            <p class="text-xs text-neutral-dark-700/50">
                                {{ book.local ? "Local stored" : "Cloud" }}
                            </p>
                        </span>
                    </div>

                    <div class="grid flex-grow">
                        <p class="text-xs text-neutral-dark-700/50">
                            created
                            {{ dayjs(book.created || new Date()).fromNow() }}
                        </p>
                    </div>
                </NuxtLink>

                <!-- <PopoverRoot>
                    <PopoverTrigger
                        class="transition absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-md hover:(bg-neutral-300)"
                    >
                        <Icon name="solar:menu-dots-linear" />
                    </PopoverTrigger>
                    <PopoverAnchor />
                    <PopoverPortal>
                        <PopoverContent>
                            what
                            <PopoverClose />
                            <PopoverArrow />
                        </PopoverContent>
                    </PopoverPortal>
                </PopoverRoot> -->
            </div>

            <button
                :class="[
                    'h-25 border-2 border-dashed border-neutral-200 rounded-xl flex items-center justify-center gap-2 transition hover:(bg-neutral-200 border-solid border-neutral-300)',
                    'dark:(border-neutral-800 text-neutral-300) dark:hover:(border-neutral-700 bg-neutral-800)',
                ]"
                @click="createBook()"
            >
                <Icon name="solar:add-square-linear" size="24" />

                Create book
            </button>
        </div>
    </div>
</template>
