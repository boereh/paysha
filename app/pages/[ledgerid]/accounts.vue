<script setup lang="ts">
definePageMeta({
  layout: "ledger",
});
</script>

<template>
  <div class="space-y-4 p-4">
    <p v-for="idx of 50" :key="idx" class="container mx-auto">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aut voluptatibus
      laborum consequuntur impedit ipsa, rem unde repellendus ducimus cumque,
      fugiat id nihil quaerat. Neque fugit perferendis ipsa magnam tempore qui?
    </p>
  </div>
</template>
