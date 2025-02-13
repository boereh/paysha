<script setup lang="ts">
type Props = {
  placeholder?: string;
  label?: string;
};

const props = defineProps<Props>();
const model = defineModel();
const is_focused = ref(false);
</script>

<template>
  <div class="relative">
    <span :class="[
      'absolute left-2 top-1/2 bg-white px-1 select-none font-light pointer-events-none transition-all',
      is_focused || model ? 'text-xs -translate-y-7' : '-translate-y-1/2',
      is_focused ? 'text-blue-500' : 'text-stone-500',
    ]">
      {{ label }}
    </span>
    <input v-model="model" type="text"
      class="border border-stone-200 px-3 outline-none flex-grow py-1.5 w-full rounded-md focus:border-blue-500 transition outline-none shadow-none"
      :placeholder="placeholder" @focus="is_focused = true" @blur="is_focused = false" />
  </div>
</template>
