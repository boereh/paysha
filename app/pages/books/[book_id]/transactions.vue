<script setup lang="ts">
const current_book = useCurrentBook();

definePageMeta({
    layout: "book",
});
</script>

<template>
    <table class="space-y-8 max-w-7xl mx-auto w-full">
        <thead>
            <tr>
                <td>Label</td>
                <td>Amount</td>
                <td>Wallet</td>
                <td>Tags</td>
                <td>Date</td>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</template>
