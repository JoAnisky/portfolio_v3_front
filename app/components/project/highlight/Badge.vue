<script setup lang="ts">
defineProps<{
  label: string
}>()

</script>

<template>
    <IconsHighlightBolt  />
    {{ label }}
</template>