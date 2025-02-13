<script setup lang="ts">
type Props = {};

const dialog_el = useTemplateRef("dialog");
const props = defineProps<Props>();
const model = defineModel<boolean>("enabled");
const emit = defineEmits(["close"]);
const attrs = useAttrs();
</script>

<template>
  <Teleport to="body">
    <div ref="dialog" :class="[
      'z-50 fixed inset-0 grid place-items-center p-3 transition-all',
      enabled
        ? 'bg-white/50 backdrop-blur-sm'
        : 'pointer-events-none opacity-0',
    ]" @click.self="() => {
      emit('close', false);
      model = false;
    }
      ">
      <div :class="['bg-white border border-stone-200 backdrop-blur-sm p-6 rounded-md min-w-xs max-w-full flex flex-col gap-6 transform transition', enabled
        ? ''
        : 'scale-50',]" v-bind:class="attrs.class">
        <slot />
      </div>
    </div>
  </Teleport>
</template>
