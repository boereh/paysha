<script setup lang="ts">
const TABS = [
    { to: "/", icon: "solar:home-2-linear", label: "Paysha" },
    { to: "/books", icon: "solar:book-2-linear", label: "Books" },
    {
        to: "/plans",
        icon: "solar:documents-minimalistic-linear",
        label: "Plans",
    },
    {
        to: "/account",
        icon: "solar:user-linear",
        label: "Account",
    },
];

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
    <Body class="font-sans <sm:(mb-20)" />

    <nav
        class="px-2 flex justify-between items-center h-18 overflow-hidden max-w-screen fixed bottom-0 sm:(sticky top-0) w-full"
    >
        <div
            class="md:(absolute left-1/2 -translate-x-1/2) <md:(w-full) bg-neutral-100 p-2 rounded-xl"
        >
            <TabsRoot
                :default-value="route.path"
                :model-value="route.path"
                @update:model-value="(v) => router.push(v)"
            >
                <TabsList
                    class="flex items-center gap-2 <md:(grid grid-cols-4 )"
                >
                    <TabsTrigger
                        v-for="tab of TABS"
                        :key="tab.to"
                        :value="tab.to"
                        class="flex items-center justify-center px-4 h-10 gap-1 transition rounded-lg data-[state=inactive]:hover:(bg-neutral-200) z-1"
                    >
                        <Icon :name="tab.icon" class="size-6" />

                        <span class="<md:hidden">
                            {{ tab.label }}
                        </span>
                    </TabsTrigger>

                    <TabsIndicator
                        class="absolute left-0 bottom-1/2 w-[--reka-tabs-indicator-size] translate-y-1/2 translate-x-[--reka-tabs-indicator-position] transition-[width,transform] duration-300"
                    >
                        <div
                            class="bg-white shadow-md w-full h-10 rounded-lg"
                        />
                    </TabsIndicator>
                </TabsList>
            </TabsRoot>
        </div>
    </nav>

    <slot />
</template>
