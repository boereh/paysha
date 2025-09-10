<script setup lang="ts">
const STORAGE_OPTIONS = [
    {
        label: "IndexedDB",
        description: "Save locally in the browser.",
    },
    {
        label: "Cloud",
        description: "Save in the cloud.",
    },
];

const { data: active_subscription } = useFetch("/api/polar/active");
const session = auth_client.useSession();
const router = useRouter();
const form = reactive({
    title: "",
    storage: "IndexedDB",
});
const disallowed_creation = computed(() => {
    if (form.storage === "Cloud" && !active_subscription.value) return "plan";
    return "";
});

async function purchaseCloudPlan() {
    const url = await $fetch<string>("/api/polar/checkout", {
        method: "POST",
    });

    if (!url) return;

    await navigateTo(url, { external: true });
}

useHead({
    title: "Create book | Paysha",
});
</script>

<template>
    <div class="h-[calc(100vh-4.5rem)] px-4">
        <div
            class="h-full max-w-2xl mx-auto flex flex-col justify-center gap-4"
        >
            <h1 class="text-2xl text-center">Create Book</h1>

            <p class="text-center text-zinc-500">
                Start your journey with this book.
            </p>

            <div class="space-y-1 w-full">
                <label class="text-sm text-neutral-700 capitalize">
                    Book Name
                </label>

                <div>
                    <input
                        type="text"
                        class="bg-white border border-neutral-200 rounded-md h-10 outline-none px-2 transition group-focus-within:border-blue-700 w-full"
                    />
                </div>
            </div>

            <div class="space-y-1 w-full">
                <label class="text-sm text-neutral-700 capitalize">
                    Save location
                </label>

                <div
                    default-value="indexed"
                    class="grid grid-cols-2 gap-4 w-full"
                >
                    <button
                        v-for="option in STORAGE_OPTIONS"
                        :key="option.label"
                        :class="[
                            'border-2 rounded-md transition duration-300 text-left p-4 flex items-center group',
                            form.storage === option.label
                                ? 'border-blue-700'
                                : 'hover:(bg-neutral-100)',
                        ]"
                        @click="() => (form.storage = option.label)"
                    >
                        <div class="flex-grow">
                            {{ option.label }}

                            <p class="text-sm">
                                {{ option.description }}
                            </p>
                        </div>

                        <span
                            :class="[
                                'w-4 h-4 rounded-full border-4 bg-transparent transition',
                                form.storage === option.label &&
                                    'border-blue-500',
                            ]"
                        >
                        </span>
                    </button>
                </div>
            </div>

            <div
                v-if="disallowed_creation === 'plan'"
                class="flex items-center gap-2 py-4"
            >
                <Icon name="solar:info-circle-linear" class="text-orange-700" />

                <span class="text-orange-700">
                    Cloud plan required to save in the cloud.
                </span>

                <button
                    class="px-2 bg-zinc-700 text-white h-8 rounded-md"
                    @click="auth_client.checkout({ slug: 'cloud-basic' })"
                >
                    Purchase plan
                </button>
            </div>

            <button
                :class="[
                    'bg-blue-700 text-white px-4 h-10 rounded w-full transition',
                    disallowed_creation && 'cursor-not-allowed opacity-50',
                ]"
            >
                Create book
            </button>
        </div>
    </div>
</template>
