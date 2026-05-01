import type { ApiPlatformCollection } from '#shared/types/api'
import type { Project } from '#shared/types/project'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    return await $fetch<ApiPlatformCollection<Project>>(`${config.apiBaseUrl}/api/projects`, {
        query: { limit: 100 },
    })
})