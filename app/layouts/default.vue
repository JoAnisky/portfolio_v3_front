<script setup lang="ts">
import AppFooter from "~/components/layout/AppFooter.vue";
import AppNavbar from "~/components/layout/AppNavbar.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg">
    <AppNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>