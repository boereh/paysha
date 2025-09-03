<script setup lang="ts">
import { get, set, createStore } from "idb-keyval";

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
const book_id = computed(() => route.params.book_id);
const current_book = useCurrentBook();

if (!isBrowser()) {
    const book = await $fetch<Book>(`/api/books/${book_id.value}`, {
        method: "POST",
    });

    if (book) {
        books.value.push(book);
        current_book.value = book;
    }
}

onMounted(async () => {
    if (current_book.value) return;

    // TODO: Load from local storage

    if (!current_book.value) router.push("/books");
});

useHead({
    title: computed(() => (`${current_book.value?.title} - ` || "") + "Paysha"),
    link: [
        {
            rel: "icon",
            type: "image/x-icon",
            href: computed(() => {
                return `https://api.dicebear.com/9.x/shapes/svg?seed=${current_book.value?.title}`;
            }),
        },
    ],
});
</script>

<template>
    <nav
        class="sticky top-0 p-4 select-none relative flex justify-between items-center h-22"
    >
        <BookSelect />

        <div
            class="absolute left-1/2 -translate-x-1/2 bg-neutral-100 rounded-xl p-2"
        >
            <TabsRoot
                :default-value="route.path.split('/')[3] || ''"
                :model-value="route.path.split('/')[3] || ''"
                @update:model-value="
                    (v) => router.push(`/books/${book_id}/${v}`)
                "
            >
                <TabsList class="flex items-center gap-2">
                    <TabsTrigger
                        v-for="tab of TABS"
                        :key="tab.to"
                        :value="tab.to"
                        :to="`/books/${book_id}/${tab.to}`"
                        class="flex items-center px-4 h-10 gap-1 transition rounded-lg data-[state=inactive]:hover:(bg-neutral-200) z-1"
                    >
                        <Icon :name="tab.icon" class="size-6" />

                        <span>
                            {{ tab.label }}
                        </span>
                    </TabsTrigger>

                    <TabsIndicator
                        class="absolute left-0 bottom-1/2 w-[--reka-tabs-indicator-size] translate-y-1/2 translate-x-[--reka-tabs-indicator-position] transition-[width,transform] duration-300"
                    >
                        <div
                            class="bg-white shadow-md w-full h-10 rounded-lg"
                        />
                    </TabsIndicator>
                </TabsList>
            </TabsRoot>
        </div>
    </nav>

    <slot />
</template>
