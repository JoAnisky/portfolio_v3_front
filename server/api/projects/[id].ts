export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const config = useRuntimeConfig()
    const publicBase = config.public.apiBaseUrl.replace(/\/$/, '')

    const project = await $fetch<Project>(
        `${config.apiBaseUrl}/api/projects/${id}`
    )

    // Réécriture URLs screenshots : chemin relatif → URL publique complète
    // Même logique que la route liste pour éviter le mismatch d'hydratation SSR/client
    project.screenshots = project.screenshots.map(screenshot => ({
        ...screenshot,
        path: `${publicBase}/uploads/screenshots/${screenshot.path}`,
    }))

    return project
})