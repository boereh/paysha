<script setup lang="ts">
const route = useRoute();
const router = useRouter();

type Props = {
    tabs: Array<{ label: string; to: string; icon: string }>;
};

defineProps<Props>();
</script>

<template>
    <div
        :class="[
            'fixed md:(top-2 left-1/2 -translate-x-1/2) <md:(bottom-2 left-2 right-2) bg-whiskey-100 p-2 rounded-xl',
            'dark:(bg-whiskey-dark-700)',
        ]"
    >
        <TabsRoot
            :default-value="route.path"
            :model-value="route.path"
            @update:model-value="(v) => router.push(v)"
        >
            <TabsList class="flex items-center gap-2 <md:(grid grid-cols-4 )">
                <TabsTrigger
                    v-for="tab of tabs"
                    :key="tab.to"
                    :value="tab.to"
                    :class="[
                        'flex items-center justify-center px-4 h-10 gap-1 transition rounded-lg z-1',
                        'data-[state=inactive]:hover:(bg-whiskey-200)',
                        'dark:data-[state=inactive]:hover:(bg-whiskey-dark-800/33)',
                    ]"
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
                        class="bg-whiskey-50 shadow-md w-full h-10 rounded-lg dark:bg-whiskey-dark-600"
                    />
                </TabsIndicator>
            </TabsList>
        </TabsRoot>
    </div>
</template>
