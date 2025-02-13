<script setup lang="ts">
type Type = "primary" | "text" | "default";

type Props = {
  type?: Type;
};

const props = defineProps<Props>();

const types: Record<Type, string> = {
  primary: "bg-blue-500 text-white",
  text: "hover:bg-stone-100 text-stone-700",
  default: "border border-stone-200 text-stone-700",
};
</script>

<template>
  <button :class="[types[type || 'default'], 'px-3 h-9 rounded-md transition flex gap-1.5 items-center']">
    <slot />
  </button>
</template>
