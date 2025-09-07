<script setup lang="ts">
import { values } from "idb-keyval";

const TABS = [
    { to: "", icon: "solar:widget-6-linear", label: "Overview" },
    {
        to: "transactions",
        icon: "solar:bill-list-linear",
        label: "Transactions",
    },
    { to: "recurrings", icon: "solar:repeat-linear", label: "Recurrings" },
    { to: "settings", icon: "solar:settings-linear", label: "Settings" },
];

const route = useRoute();
const router = useRouter();
const books = useBooks();
const book_id = computed(() => route.params.book_id as string);
const current_book = useCurrentBook();
const session = auth_client.useSession();

if (!isBrowser() && !books.value.find((b) => b.id === book_id.value)) {
    const book = await $fetch<Book>(`/api/books/${book_id.value}`, {
        method: "POST",
    });

    if (book) {
        books.value.push(book);
        current_book.value = book;
    }
}

onMounted(async () => {
    const book = books.value.find((b) => b.id === book_id.value);

    if (book) current_book.value = book;
    if (current_book.value) return;

    const stored_books = await values<Book>(useBookStore());

    if (stored_books.length === 0) return router.push("/books");

    books.value.push(...stored_books);

    const book_stored = stored_books.find((b) => b.id === book_id.value);

    if (!book_stored) return router.push("/books");

    current_book.value = book_stored;
});

useHead({
    title: computed(() => (`${current_book.value?.title} - ` || "") + "Paysha"),
    link: [
        {
            rel: "icon",
            type: "image/ico",
            href: computed(() => {
                if (!current_book.value) return "/favicon.ico";

                return `https://api.dicebear.com/9.x/shapes/svg?seed=${current_book.value.id}`;
            }),
        },
    ],
});
</script>

<template>
    <Body
        class="font-sans <sm:(mb-20) text-dark-900 dark:(bg-neutral-dark-800 text-neutral-300)"
    />

    <nav
        class="sticky top-0 p-2 select-none relative flex justify-between items-center"
    >
        <BookSelect />

        <div
            class="flex items-center gap-2 bg-neutral-100 p-2 rounded-xl dark:bg-neutral-dark-800"
        >
            <button
                class="h-10 w-10 grid place-items-center rounded-md hover:(bg-neutral-200)"
            >
                <img
                    v-if="session?.data?.user.image"
                    :src="session.data.user.image"
                    alt="profile cover"
                />

                <Icon
                    v-else
                    name="solar:question-circle-linear"
                    class="size-6"
                />
            </button>

            <NuxtLink
                to="/account"
                class="h-10 w-10 grid place-items-center rounded-md hover:(bg-neutral-200)"
            >
                <img
                    v-if="session?.data?.user.image"
                    :src="session.data.user.image"
                    alt="account cover"
                />

                <Icon v-else name="solar:user-circle-linear" class="size-6" />
            </NuxtLink>
        </div>
    </nav>

    <Tabs
        :tabs="[
            {
                to: `/books/${book_id}`,
                icon: 'solar:widget-6-linear',
                label: 'Overview',
            },
            {
                to: `/books/${book_id}/transactions`,
                icon: 'solar:bill-list-linear',
                label: 'Transactions',
            },
            {
                to: `/books/${book_id}/recurrings`,
                icon: 'solar:repeat-linear',
                label: 'Recurrings',
            },
            {
                to: `/books/${book_id}/settings`,
                icon: 'solar:settings-linear',
                label: 'Settings',
            },
        ]"
    />

    <slot />
</template>
