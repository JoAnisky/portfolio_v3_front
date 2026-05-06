<script setup lang="ts">
const props = defineProps<{
  type: { key: string; label: string } | null | undefined
}>()

const result = computed(() => useProjectType(props.type))
</script>

<template>
  <span v-if="result.icon" class="project-type">
    <img :src="result.icon" :alt="result.label ?? ''" width="14" height="14" class="project-type__icon" />
    {{ result.label }}
  </span>
</template>