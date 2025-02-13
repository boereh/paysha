<script setup lang="ts">
import uniqolor from "uniqolor";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { PhPlus } from "@phosphor-icons/vue";
import { nanoid } from "nanoid";

dayjs.extend(relativeTime);

const books = useBooks();
const new_book = reactive({
  creating: false,
  enabled: false,
  name: "",
});

async function createBook() {
  if (!window) return;
  const storage = useIndexedDB({ store: "books" });

  const book: Book = {
    id: nanoid(),
    name: new_book.name,
    author: ["John Doe"],
    created: new Date(),
    modified: new Date(),
    pages: [],
  };

  await storage.set(book.id, book);
}

onMounted(books.load);
</script>

<template>
  <div class="flex justify-between items-center gap-3 p-3">
    <h1 class="text-3xl font-light">Books</h1>
    <ui-button @click="new_book.enabled = true">
      <ph-plus class="size-4" />
      Create Book
    </ui-button>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-3">
    <a
      v-for="book of books.books"
      :key="book.id"
      class="flex flex-col gap-3 p-3 rounded-md text-white aspect-2"
      :style="{
        background: uniqolor(book.id + book.id, {
          lightness: 50,
          format: 'hex',
        }).color,
      }"
    >
      <span class="text-2xl font-light uppercase"> {{ book.name }}</span>
      <span class="text"> {{ book.author.join(", ") }}</span>
      <span class="" />
      <span class="text"> {{ dayjs(book.modified).fromNow() }}</span>
    </a>
    <ui-dialog :enabled="new_book.enabled" @close="new_book.enabled = false">
      <h1>Create a new book</h1>
      <ui-input v-model="new_book.name" type="text" label="Book Name" />
      <div class="flex gap-3 justify-end">
        <ui-button type="text" @click="new_book.enabled = false">
          Cancel
        </ui-button>
        <ui-button type="primary" @click="createBook"> Create </ui-button>
      </div>
    </ui-dialog>
  </div>
</template>
