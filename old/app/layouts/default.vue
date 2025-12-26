<script setup lang="ts">
const route = useRoute();
const session = auth_client.useSession();

useHead({
    title: "Paysha",
    link: [
        {
            rel: "icon",
            type: "image/x-icon",
            href: "/favicon.ico",
        },
        {
            rel: "icon",
            type: "image/svg+xml",
            href: "/favicon.svg",
        },
    ],
});
</script>

<template>
    <div class="sm:sticky top-0 p-4 bg-white flex gap-4">
        <NuxtLink
            to="/"
            class="text-neutral-600 h-full transition hover:(text-black)"
        >
            <SvgPaysha class="h-8 py-1" />
        </NuxtLink>

        <span class="flex-grow" />

        <UButton
            color="neutral"
            icon="lucide:log-in"
            :to="session ? '/account' : '/signin'"
            variant="soft"
        >
            <span class="<sm:hidden">
                {{ session ? "Account" : "Sign in" }}
            </span>
        </UButton>

        <NuxtLink
            v-if="false"
            to="/books"
            class="bg-black text-white h-10 px-2 transition rounded-md flex items-center gap-2 font-medium hover:(bg-neutral-800)"
        >
            <Icon name="solar:book-linear" class="size-6" />

            <span class="<sm:hidden">Books</span>
        </NuxtLink>
    </div>

    <slot />
</template>
