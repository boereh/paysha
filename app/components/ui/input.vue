<script setup lang="ts">
import { useId } from "reka-ui";
type Props = {
    placeholder?: string;
    label: string;
    focusOnMount?: boolean;
};

const input_element = useTemplateRef("input-element");
const props = defineProps<Props>();
const value = defineModel<string>();
const id = useId();

onMounted(() => {
    if (props.focusOnMount) input_element.value?.focus();
});
</script>

<template>
    <div class="relative group w-sm flex">
        <label
            :for="id"
            class="absolute top-0 left-2 -translate-y-1/2 bg-white px-1 text-xs capitalize font-medium text-neutral-400 transition group-focus-within:text-blue-700"
        >
            {{ label }}
        </label>

        <input
            v-model="value"
            ref="input-element"
            :id="id"
            :name="id"
            type="text"
            :placeholder="placeholder"
            class="bg-white border border-neutral-200 rounded-md h-10 outline-none px-2 transition group-focus-within:border-blue-700 flex-grow"
        />
    </div>
</template>
