<script setup lang="ts">
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
    <Body class="font-sans" />

    <slot />
</template>
