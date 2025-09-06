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
    <div class="px-4">
        <div
            class="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
        >
            <div
                v-for="book in books"
                :key="book.id"
                :to="`/books/${book.id}`"
                :class="[
                    'bg-whiskey-100 p-4 rounded-xl transition border-2 border-transparent group cursor-pointer relative',
                    'hover:(bg-whiskey-200 border-whiskey-300)',
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

                            <p class="text-xs text-whiskey-dark-700/50">
                                {{ book.local ? "Local stored" : "Cloud" }}
                            </p>
                        </span>
                    </div>

                    <div class="grid flex-grow">
                        <p class="text-xs text-whiskey-dark-700/50">
                            created
                            {{ dayjs(book.created || new Date()).fromNow() }}
                        </p>
                    </div>
                </NuxtLink>

                <PopoverRoot>
                    <PopoverTrigger
                        class="transition absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-md hover:(bg-whiskey-300)"
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
                </PopoverRoot>
            </div>

            <button
                class="border-2 border-dashed border-whiskey-200 rounded-xl flex items-center justify-center gap-2 transition hover:(bg-whiskey-200 border-solid border-whiskey-300)"
            >
                <Icon
                    name="solar:add-square-linear"
                    size="24"
                    @click="createBook"
                />

                Create book
            </button>
        </div>
    </div>
</template>
