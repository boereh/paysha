<script setup lang="ts">
import Paysha from "~/components/paysha.vue";

useHead({
    title: "Paysha",
    link: [
        {
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon.ico",
        },
    ],
});
</script>

<template>
    <Body class="<sm:(pb-18 pt-2) sm:(pt-18)" />

    <Tabs
        :tabs="[
            { to: '/', icon: Paysha, label: 'Paysha' },
            { to: '/books', icon: 'solar:book-2-linear', label: 'Books' },
            {
                to: '/plans',
                icon: 'solar:documents-minimalistic-linear',
                label: 'Plans',
            },
            {
                to: '/account',
                icon: 'solar:user-linear',
                label: 'Account',
            },
        ]"
    />

    <slot />
</template>
