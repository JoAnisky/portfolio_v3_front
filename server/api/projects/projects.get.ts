import type { ApiPlatformCollection } from '#shared/types/api'
import type { Project } from '#shared/types/project'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    let data: ApiPlatformCollection<Project>
    try {
        data = await $fetch<ApiPlatformCollection<Project>>(`${config.apiBaseUrl}/api/projects`, {
            query: { limit: 100 },
        })
    } catch {
        throw createError({ statusCode: 502, message: 'Backend unavailable' })
    }

    const publicBase = config.public.apiBaseUrl.replace(/\/$/, '')

    if (data?.member) {
        data.member = data.member.map((project) => ({
            ...project,
            screenshots: (project.screenshots ?? []).map((screenshot) => ({
                ...screenshot,
                path: `${publicBase}/uploads/screenshots/${screenshot.path}`,
            })),
        }))
    }

    return data
})