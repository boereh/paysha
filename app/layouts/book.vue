<script setup lang="ts">
import { values } from "idb-keyval";

const PAGES = [
    {
        to: "",
        icon: "solar:widget-6-linear",
        label: "Overview",
        bold_icon: "solar:widget-6-bold",
    },
    {
        to: "transactions",
        icon: "solar:bill-list-linear",
        label: "Transactions",
        bold_icon: "solar:bill-list-bold",
    },
    {
        to: "recurrings",
        icon: "solar:repeat-linear",
        label: "Recurrings",
        bold_icon: "solar:repeat-one-minimalistic-bold",
    },
    {
        to: "settings",
        icon: "solar:settings-linear",
        label: "Settings",
        bold_icon: "solar:settings-bold",
    },
];

const route = useRoute();
const router = useRouter();
const books = useBooks();
const book_id = computed(() => route.params.book_id as string);
const current_book = useCurrentBook();
const session = auth_client.useSession();
const current_page = computed(() => route.path.split("/")[3] || "");

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
    title: computed(() => {
        if (!current_book.value) return "Paysha";
        return `${current_book.value.title} | Paysha`;
    }),
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
    <Body class="<sm:(pb-18)" />

    <nav
        class="sticky top-0 p-4 select-none flex gap-4 justify-between items-center bg-white"
    >
        <NuxtLink
            :to="`/books/${book_id}`"
            class="<sm:hidden text-neutral-600 hover:(text-black)"
        >
            <SvgPayshaIcon class="h-4.5 mb-0.75" />
        </NuxtLink>

        <span class="<sm:hidden bg-black w-px h-8 -transform-skew-25"></span>

        <BookSelect />

        <div class="flex-grow flex justify-end gap-4">
            <!-- <button
                class="h-10 w-10 grid place-items-center rounded-md border border-neutral-100 bg-neutral-100 hover:(border-neutral-200)"
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
            </button> -->

            <NuxtLink
                :to="session.data ? `/account` : '/signin'"
                class="h-10 px-2 flex items-center gap-2 font-medium rounded-md border border-neutral-100 bg-neutral-100 hover:(border-neutral-200) whitespace-nowrap"
            >
                <img
                    class="size-6 rounded-full"
                    v-if="session?.data?.user.image"
                    :src="session.data.user.image"
                    alt="account cover"
                />

                <Icon v-else name="solar:user-circle-linear" class="size-6" />

                <span class="<sm:hidden"> Account </span>
            </NuxtLink>
        </div>
    </nav>

    <div
        class="bg-white fixed flex items-center gap-4 py-4 md:(top-0 left-1/2 -translate-x-1/2) <md:(left-0 right-0 bottom-0 justify-evenly)"
    >
        <template v-for="(page, index) in PAGES" :key="page.to">
            <NuxtLink
                :to="`/books/${book_id}/${page.to}`"
                :class="[
                    'flex items-center gap-2 transition h-10 font-medium',
                    page.to === current_page
                        ? 'text-black border-black'
                        : 'text-neutral-600 hover:(text-black) border-transparent',
                ]"
            >
                <span class="relative size-6">
                    <Icon
                        :name="page.icon"
                        :class="[
                            'size-6 transition duration-300',
                            page.to === current_page && 'opacity-0',
                        ]"
                    />
                    <Icon
                        :name="page.bold_icon"
                        :class="[
                            'size-6 absolute left-0 transition duration-300',
                            page.to !== current_page && 'opacity-0',
                        ]"
                    />
                </span>

                <span class="<sm:hidden">
                    {{ page.label }}
                </span>
            </NuxtLink>

            <span
                v-if="index < PAGES.length - 1"
                class="w-1 h-1 bg-neutral-500 rounded-full <sm:hidden"
            />
        </template>
    </div>

    <!--
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
    /> -->

    <slot />
</template>
