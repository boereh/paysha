<script setup lang="ts">
type Props = {
    links: Array<{ label: string; to: string; icon: string | Component }>;
};

const route = useRoute();
const router = useRouter();
const props = defineProps<Props>();
</script>

<template>
    <Body
        class="font-sans <sm:(pb-18 pt-2) sm:(pt-20) text-dark-700 dark:(bg-neutral-900 text-neutral-300)"
    />

    <nav class="p-2 flex justify-between sticky top-0">
        <slot name="left" />

        <div>
            <slot name="right" />
        </div>
    </nav>

    <div
        :class="[
            'fixed md:(top-2 left-1/2 -translate-x-1/2) <md:(bottom-2 left-2 right-2) bg-neutral-100 p-2 rounded-xl select-none',
            'dark:(bg-neutral-800)',
        ]"
    >
        <TabsRoot
            :default-value="route.path"
            :model-value="route.path"
            @update:model-value="(v) => router.push(v)"
        >
            <TabsList class="flex items-center gap-2 <md:(grid grid-cols-4 )">
                <TabsTrigger
                    v-for="tab of links"
                    :key="tab.to"
                    :value="tab.to"
                    :class="[
                        'flex items-center justify-center px-4 h-10 gap-1 transition rounded-lg z-1',
                        'data-[state=inactive]:hover:(bg-neutral-200)',
                        'dark:data-[state=inactive]:hover:(bg-neutral-900/50)',
                    ]"
                >
                    <Icon
                        v-if="typeof tab.icon === 'string'"
                        :name="tab.icon"
                        class="size-6"
                    />
                    <component v-else :is="tab.icon" class="size-6" />

                    <span class="<sm:hidden">
                        {{ tab.label }}
                    </span>
                </TabsTrigger>

                <TabsIndicator
                    class="absolute left-0 bottom-1/2 w-[--reka-tabs-indicator-size] translate-y-1/2 translate-x-[--reka-tabs-indicator-position] transition-[width,transform] duration-300"
                >
                    <div
                        class="bg-white shadow-md w-full h-10 rounded-lg dark:bg-neutral-700"
                    />
                </TabsIndicator>
            </TabsList>
        </TabsRoot>
    </div>
</template>
