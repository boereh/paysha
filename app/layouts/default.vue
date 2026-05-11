<script setup>
useSeoMeta({
  title: "paysha",
});
</script>

<template>
  <nav
    class="sticky top-0 border-b w-full p-4 border-accented bg-default/75 backdrop-blur flex gap-4"
  >
    <a href="/" class="w-fit">
      <Logo class="h-8 <sm:hidden" />
      <LogoIcon class="h-8 sm:hidden" />
    </a>

    <span class="flex-1"></span>

    <UButton
      icon="i-ph:user-bold"
      variant="soft"
      color="neutral"
      href="/account"
      label="Account"
    />
  </nav>

  <slot />
</template>
