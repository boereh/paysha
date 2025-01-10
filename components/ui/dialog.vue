<script setup lang="ts">
type Props = {
  enabled?: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits(["update:enabled"]);
const attrs = useAttrs();
</script>

<template>
  <slot name="trigger" />

  <Teleport to="body">
    <div
      :class="[
        'z-50 fixed inset-0 grid place-items-center p-4',
        enabled ? 'bg-white/50 backdrop-blur-sm' : 'pointer-events-none',
      ]"
      @click="() => emit('update:enabled', false)"
    >
      <div
        class="bg-white border border-light-500 backdrop-blur-sm p-4 rounded-md min-w-xs max-w-full flex flex-col gap-4"
        v-bind:class="attrs.class"
      >
        <slot />
      </div>
    </div>
  </Teleport>
</template>
