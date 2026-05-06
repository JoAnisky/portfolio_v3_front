<script setup lang="ts">
defineProps<{
  label: string
}>()

</script>

<template>
    <IconHighlightBolt  />
    {{ label }}
</template>