import type { Project } from '#/shared/types/project'

const CATEGORY_ORDER = ['Languages', 'Frameworks', 'DevOps', 'Tools'] as const

export function useTechnologyGroups(project: MaybeRef<Project | null | undefined>) {
    const groupedTechnologies = computed(() => {
        const p = toValue(project)
        if (!p?.technologies.length) return []

        const map = new Map<string, Project['technologies']>()
        for (const tech of p.technologies) {
            const key = tech.category?.key ?? 'Tools'
            if (!map.has(key)) map.set(key, [])
            map.get(key)!.push(tech)
        }

        return CATEGORY_ORDER
            .filter(key => map.has(key))
            .map(key => ({
                category: key,
                label: map.get(key)![0].category.label,
                technologies: map.get(key)!,
            }))
    })

    return { groupedTechnologies }
}