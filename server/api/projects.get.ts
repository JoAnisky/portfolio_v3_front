import type { ApiPlatformCollection } from '#shared/types/api'
import type { Project } from '#shared/types/project'

export default defineEventHandler(async () => {
    const config = useRuntimeConfig()

    const data = await $fetch<ApiPlatformCollection<Project>>(`${config.apiBaseUrl}/api/projects`, {
        query: { limit: 100 },
    })

    // Réécrire les URLs des screenshots avec l'URL publique
    // pour éviter le mismatch d'hydration SSR/client
    const publicBase = config.public.apiBaseUrl.replace(/\/$/, '')

    data.member = data.member.map((project) => ({
        ...project,
        screenshots: project.screenshots.map((screenshot) => ({
            ...screenshot,
            path: `${publicBase}/uploads/screenshots/${screenshot.path}`,
        })),
    }))

    return data
})