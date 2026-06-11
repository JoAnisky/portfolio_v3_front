import type { ApiPlatformCollection } from '#shared/types/api'
import type { Project } from '#shared/types/project'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    const data = await $fetch<ApiPlatformCollection<Project>>(`${config.apiBaseUrl}/api/projects`, {
        query: { limit: 100 },
    })

    return data.member.map((project) => ({
        loc: `/projects/${project.id}`,
    }))
})
