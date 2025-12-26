<script setup lang="ts">
const books = useBooks();
const current_book = useCurrentBook();
const router = useRouter();
</script>

<template>
    <SelectRoot
        @update:model-value="
            (v) => {
                if (v === 'create') return router.push('/books/create');
                if (current_book === null) return;
                if (v === current_book.id) return;

                console.log(v);

                router.push(`/books/${v}`);
            }
        "
    >
        <SelectTrigger
            :class="[
                'flex items-center gap-2 hover:(bg-neutral-200) px-2 w-64 max-w-full h-10 rounded-md transition data-[state=open]:(bg-neutral-200)',
                !current_book && 'pl-10',
            ]"
        >
            <img
                v-if="current_book"
                class="w-6 h-6 rounded-md border border-neutral-300"
                :src="`https://api.dicebear.com/9.x/shapes/svg?seed=${current_book.id}`"
                alt="book cover"
            />

            <span class="truncate flex-grow text-left">
                {{ current_book?.title || "Untitled book" }}
            </span>

            <Icon name="solar:alt-arrow-down-linear" />
        </SelectTrigger>

        <SelectPortal>
            <SelectContent
                position="popper"
                class="bg-white mt-1 py-2 rounded-md border border-neutral-200 w-[--reka-select-trigger-width]"
            >
                <SelectLabel
                    class="px-4 py-2 text-sm font-medium text-neutral-600"
                >
                    Books
                </SelectLabel>

                <SelectGroup v-for="book of books" :key="book.id" class="px-2">
                    <SelectItem
                        :value="book.id"
                        class="px-2 flex items-center gap-2 h-10 rounded-md cursor-pointer outline-none hover:(bg-neutral-200)"
                    >
                        <img
                            class="w-6 h-6 rounded-md border border-neutral-300"
                            :src="`https://api.dicebear.com/9.x/shapes/svg?seed=${book.id}`"
                            alt="book cover"
                        />

                        <span class="truncate whitespace-nowrap">
                            {{ book.title }}
                        </span>
                    </SelectItem>
                </SelectGroup>

                <hr class="my-2 border-neutral-100" />

                <SelectGroup class="px-2">
                    <SelectItem
                        value="create"
                        class="px-2 flex items-center gap-2 h-10 text-neutral-500 rounded-md cursor-pointer outline-none hover:(bg-neutral-200)"
                    >
                        <Icon
                            name="solar:pen-new-square-linear"
                            class="w-6 h-6"
                        />

                        Create book
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </SelectPortal>
    </SelectRoot>
</template>
