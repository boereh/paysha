<script setup lang="ts">
const current_book = useCurrentBook();
const filter = reactive({});

definePageMeta({
    layout: "book",
});
</script>

<template>
    <div class="p-4">
        <div class="max-w-7xl mx-auto">
            <div>
                <button>what</button>
            </div>

            <table class="space-y-8 w-full">
                <thead class="">
                    <tr class="bg-neutral-100">
                        <td class="p-2 px-4">Label</td>
                        <td>Amount</td>
                        <td>Wallet</td>
                        <td>Tags</td>
                        <td>Date</td>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="transaction in current_book?.transactions || []"
                        :key="transaction.id"
                    >
                        <td>
                            <input type="text" />
                            {{ transaction.label }}
                        </td>
                        <td>
                            <input type="text" />
                            {{ transaction.amount }}
                        </td>

                        <td>
                            <input type="text" />
                            {{ transaction.wallet }}
                        </td>
                        <td>
                            <input type="text" />
                            {{ transaction.tags }}
                        </td>
                        <td>
                            <input type="text" />
                            {{ transaction.date }}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
