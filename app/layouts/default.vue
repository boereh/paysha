<script setup lang="ts">
const route = useRoute();
const router = useRouter();

useHead({
    title: "Paysha",
    link: [
        {
            rel: "icon",
            type: "image/jpeg",
            href: "/favicon.jpeg",
        },
    ],
});
</script>

<template>
    <Body
        class="font-sans <sm:(mb-24) sm:(mt-20) bg-whiskey-50 text-whiskey-dark-600 dark:(bg-whiskey-dark-800 text-whiskey-300)"
    />

    <Tabs
        :tabs="[
            { to: '/', icon: 'solar:home-2-linear', label: 'Paysha' },
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
