<script setup lang="ts">
import { object, string, union, literal, type InferOutput } from "valibot";
import type { FormError, FormSubmitEvent } from "@nuxt/ui";

const STORAGE_OPTIONS: RadioGroupItem[] = [
    {
        label: "IndexedDB",
        description: "Save locally in the browser.",
        value: "IndexedDB",
    },
    {
        label: "Cloud",
        description: "Save in the cloud.",
        value: "Cloud",
    },
];
type Schema = InferOutput<typeof schema>;

const { data: active_subscription } = useFetch("/api/polar/active");
const session = auth_client.useSession();
const router = useRouter();
const toast = useToast();
const state = reactive<Schema>({
    title: "",
    storage: "IndexedDB",
});
const schema = object({
    title: string(),
    storage: union([literal("IndexedDB"), literal("Cloud")]),
});

const disallowed_creation = computed(() => {
    if (state.storage === "Cloud" && !active_subscription.value) return "plan";
    return "";
});

async function purchaseCloudPlan() {
    const url = await $fetch<string>("/api/polar/checkout", {
        method: "POST",
    });

    if (!url) return;

    await navigateTo(url, { external: true });
}

async function onValidate(state: Schema) {
    const errors: FormError[] = [];
    if (!state.title) errors.push({ name: "email", message: "Required" });
    if (!state.storage) errors.push({ name: "password", message: "Required" });
    return errors;
}

async function onSubmit(event: FormSubmitEvent<Schema>) {}

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

            <span>
                <UForm
                    :schema="schema"
                    :state="state"
                    class="space-y-4"
                    :validate="
                        (state) => {
                            const errors: FormError[] = [];
                            if (!state.title) {
                                errors.push({
                                    name: 'title',
                                    message: 'Required',
                                });
                            }
                            if (state.storage === 'Cloud' && !session.data) {
                                errors.push({
                                    name: 'storage',
                                    message:
                                        'Account required to store in the cloud',
                                });
                            }

                            console.log(
                                state.storage === 'Cloud',
                                !session.data,
                            );

                            return errors;
                        }
                    "
                    @submit="onSubmit"
                >
                    <UFormField label="Book title" name="title" required>
                        <UInput
                            v-model="state.title"
                            class="w-full"
                            size="lg"
                        />
                    </UFormField>

                    <UFormField
                        label="Storage location"
                        name="storage"
                        required
                    >
                        <URadioGroup
                            v-model="state.storage"
                            orientation="horizontal"
                            indicator="end"
                            variant="card"
                            default-value="IndexedDB"
                            :items="STORAGE_OPTIONS"
                            class="w-full"
                            :ui="{
                                item: 'flex-grow',
                            }"
                        />
                    </UFormField>

                    <UButton type="submit"> Create </UButton>
                </UForm>
            </span>

            <!-- <div
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
            </div> -->
        </div>
    </div>
</template>
