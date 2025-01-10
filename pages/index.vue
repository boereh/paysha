<script setup lang="ts">
import uniqolor from "uniqolor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PhPlus } from "@phosphor-icons/vue";

dayjs.extend(relativeTime);

const books = useBooks();
</script>

<template>
  <div class="grid grid-cols-1 gap-4 p-4">
    <div
      v-for="book of books.books"
      :key="book.id"
      class="rounded-md p-4 flex gap-4"
      :style="{
        background: `linear-gradient(${
          uniqolor(book.id, { lightness: [70, 75] }).color
        },${uniqolor(book.id, { lightness: [50, 69] }).color})`,
      }"
    >
      <div class="flex flex-col justify-between">
        <span> {{ book.name }}</span>
        <span> {{ book.author }}</span>
        <span> {{ dayjs(book.modified).fromNow() }}</span>
      </div>
    </div>

    <ui-dialog :enabled="true">
      <template #trigger>
        <button
          class="border border-dashed rounded-md flex items-center justify-center px-4 gap-2"
        >
          <ph-plus />
          Create Book
        </button>
      </template>

      <h1>Create Book</h1>

      <input type="text" placeholder="Name" />
    </ui-dialog>
  </div>
</template>
