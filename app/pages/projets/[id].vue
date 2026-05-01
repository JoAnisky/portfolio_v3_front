<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const { data: project, status } = await useFetch(
    `${config.public.apiBaseUrl}/api/projects/${route.params.id}`
)
</script>

<template>
  <div>
    <pre>{{ project }}</pre>
  </div>
</template>