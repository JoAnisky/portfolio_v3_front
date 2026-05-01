import type { Project } from '#shared/types/project'
import type { ApiPlatformCollection } from '#shared/types/api'

export function useProjects() {
    const config = useRuntimeConfig()

    const { data: projectsData, status, error } = useFetch<ApiPlatformCollection<Project>>('/api/projects', {
        // Récupère tous les projets sans pagination
        // query: { limit: 100 },
        // Transforme la réponse pour n'exposer que le tableau
        transform: (res) => res,

        // log réponse reçue
        onResponse({ response }) {
            console.log('[useProjects] onResponse status:', response.status)
            console.log('[useProjects] onResponse body:', response._data)
        },

    })

    const projects = computed<Project[]>(() => projectsData.value?.member ?? [])
    const isLoading = computed(() => status.value === 'pending')
    const hasError = computed(() => status.value === 'error')

    /**
     * Retourne le screenshot de couverture d'un projet,
     * ou le premier screenshot disponible si aucun n'est marqué isCover.
     */
    function getCoverScreenshot(project: Project): ProjectScreenshot | null {
        if (!project.screenshots?.length) return null
        console.log('[screenshots raw]', project.screenshots);
        const cover = project.screenshots.find((s) => s.isCover)
        if (cover) return cover

        // Fallback : tri par position, puis premier du tableau
        const sorted = [...project.screenshots].sort((a, b) => a.position - b.position)
        return sorted[0] ?? null
    }

    /**
     * Retourne les highlights triés par position.
     */
    function getSortedHighlights(project: Project): ProjectHighlight[] {
        return [...(project.highlights ?? [])].sort((a, b) => a.position - b.position)
    }

    function getScreenshotUrl(path: string): string {
        const base = import.meta.server
            ? config.apiBaseUrl
            : config.public.apiBaseUrl
        // Évite le double slash si path commence déjà par /
        return `${base.replace(/\/$/, '')}${path.startsWith('/') ? '' : '/uploads/screenshots/'}${path}`
    }

    return {
        projects,
        isLoading,
        hasError,
        error,
        getCoverScreenshot,
        getSortedHighlights,
        getScreenshotUrl
    }
}