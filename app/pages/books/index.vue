<script setup lang="ts">
import { values } from "idb-keyval";

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
            class="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            <NuxtLink
                v-for="book in books"
                :key="book.id"
                :to="`/books/${book.id}`"
                :class="[
                    'bg-whiskey-100 p-4 rounded-xl transition border-2 border-transparent hover:(bg-whiskey-200 border-whiskey-300)',
                ]"
                @click="() => (current_book = book)"
            >
                <div class="flex gap-2">
                    <img
                        class="w-8 h-8 rounded-md"
                        :src="`https://api.dicebear.com/9.x/shapes/svg?seed=${book.id}`"
                        alt="book cover"
                    />

                    <span class="grid flex-grow">
                        <h1 class="truncate">
                            {{ book.title }}{{ book.title }}{{ book.title
                            }}{{ book.title }}{{ book.title }}
                        </h1>

                        <p>
                            {{ book.created || new Date() }}
                        </p>
                    </span>
                </div>
            </NuxtLink>

            <button
                class="aspect-2.5 border-2 border-dashed border-whiskey-200 rounded-xl flex items-center justify-center gap-2 transition hover:(bg-whiskey-200 border-solid border-whiskey-300)"
            >
                <Icon name="solar:add-square-linear" size="24" />

                Create book
            </button>
        </div>
    </div>
</template>
