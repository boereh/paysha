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

useHead({
    title: "Books | Paysha",
});
</script>

<template>
    <div class="px-2">
        <div
            class="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
            <UButton
                v-for="book in books"
                :key="book.id"
                :to="`/books/${book.id}`"
                color="neutral"
                class="h-25"
                @click="() => (current_book = book)"
            >
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
            </UButton>

            <UButton
                to="/books/create"
                variant="outline"
                color="neutral"
                class="h-25 justify-center"
            >
                <Icon name="solar:add-square-linear" size="24" />

                Create book
            </UButton>
        </div>
    </div>
</template>
