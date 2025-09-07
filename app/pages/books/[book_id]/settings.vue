<script setup lang="ts">
const current_book = useCurrentBook();

definePageMeta({
    layout: "book",
});
</script>

<template>
    <div class="px-4">
        <div class="space-y-4 max-w-7xl mx-auto">
            <h1 class="text-2xl">General</h1>

            <div class="p-4 bg-neutral-100 rounded-xl">
                <div class="flex justify-between">
                    <div>
                        <h1>Book ID</h1>
                        <p></p>
                    </div>

                    <div>
                        <span>{{ current_book?.id }}</span>
                    </div>
                </div>

                <hr class="my-4 border-neutral-200" />
            </div>
        </div>
    </div>
</template>
