<script setup lang="ts">
defineProps<{
  label: string,
  src: string,
  name: string
}>()
</script>

<template>
    <img v-if="src" :src="src" :alt="name" />
    <span>{{ label }}</span>
</template>
