<script setup lang="ts">
import { values } from "idb-keyval";

const books = useBooks();
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
        <div class="max-w-7xl mx-auto">
            hmm
            <NuxtLink
                v-for="book in books"
                :key="book.id"
                :to="`/books/${book.id}`"
            >
                {{ book.title }}
            </NuxtLink>
        </div>
    </div>
</template>
