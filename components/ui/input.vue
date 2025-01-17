<script setup lang="ts">
type Props = {
  placeholder?: string;
  modelValue?: string;
};

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative">
    <input
      :value="modelValue"
      type="text"
      class="bg-light-500 px-2 outline-none flex-grow py-2 w-full rounded-md"
      :placeholder="placeholder"
      @input="emit('update:modelValue')"
    />
  </div>
</template>
