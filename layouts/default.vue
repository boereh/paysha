<script setup lang="ts">
import "@unocss/reset/tailwind.css";
</script>

<template>
    <navigation />

    <main class="<sm:(pb-20)">
        <slot />
    </main>
</template>

<style>
body {
    font-family: Inter;
}
</style>
