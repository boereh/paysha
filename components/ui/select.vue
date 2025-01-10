<script setup lang="ts">
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "radix-vue";

type Props = {
  modelValue?: string;
  items: string[] | string[][];
};

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <SelectRoot>
    <SelectTrigger>
      <SelectValue />
      <SelectIcon />
    </SelectTrigger>

    <SelectPortal>
      <SelectContent>
        <SelectScrollUpButton />
        <SelectViewport>
          <SelectGroup v-for="(group, index) of items" :key="index">
            <SelectLabel />
            <SelectItem v-for="item of group" :key="item" :value="item">
              <SelectItemText />
              <SelectItemIndicator />
            </SelectItem>
          </SelectGroup>

          <SelectSeparator />
        </SelectViewport>
        <SelectScrollDownButton />
        <SelectArrow />
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
