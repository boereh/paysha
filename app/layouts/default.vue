<script setup lang="ts">
import Paysha from "~/components/paysha.vue";

const route = useRoute();
const router = useRouter();

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
