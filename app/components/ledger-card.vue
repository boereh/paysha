<script setup lang="ts">
import dayjs from "dayjs";
import relative_time from "dayjs/plugin/relativeTime";
import { cn, type ClassValue } from "tailwind-variants";

dayjs.extend(relative_time);

const props = defineProps<{
  ledger: Ledger;
  active?: boolean;
  class?: ClassValue;
}>();
</script>

<template>
  <a
    v-bind="props"
    :class="
      cn([
        'p-4 border rounded-lg',
        props.class,
        props.active
          ? 'bg-primary-50 border-primary-200'
          : 'border-surface-accented bg-surface-muted hover:bg-surface-elevated',
      ])
    "
  >
    <div class="flex w-full gap-4 mb-4 h-12">
      <img
        class="size-12 rounded-lg"
        :src="`https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURI(ledger.id)}`"
        :alt="ledger.name"
      />

      <div class="flex-1 flex flex-col justify-end">
        <div class="rounded text-lg font-semibold">
          {{ ledger.name }}
        </div>
        <div class="rounded whitespace-nowrap text-sm">
          By
          <span class="italic">
            {{ ledger.authors.length < 1 ? "You" : ledger.authors.join(", ") }}
          </span>
        </div>
      </div>
    </div>

    <div class="h-4 rounded flex items-center gap-2 text-xs w-full text-muted">
      <UIcon name="i-ph:hammer" title="Created" />
      <span class="flex-1">{{ dayjs(ledger.created).fromNow() }}</span>

      <UIcon name="i-ph:arrow-fat-line-up" title="Updated" />
      <span>{{ dayjs(ledger.created).fromNow() }}</span>
    </div>
  </a>
</template>
