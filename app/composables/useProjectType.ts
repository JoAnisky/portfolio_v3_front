const PROJECT_TYPE_ICONS_PATH = '/assets/icons'
const DEFAULT_ICON = `${PROJECT_TYPE_ICONS_PATH}/globe.svg`

const PROJECT_TYPE_MAP: Record<string, string> = {
    Website:    DEFAULT_ICON,
    WebApp:     `${PROJECT_TYPE_ICONS_PATH}/app.svg`,
    Ecommerce:  `${PROJECT_TYPE_ICONS_PATH}/cart.svg`,
    Api:        `${PROJECT_TYPE_ICONS_PATH}/server.svg`,
    DevOps:     `${PROJECT_TYPE_ICONS_PATH}/infrastructure.svg`,
}

export function useProjectType(type: { key: string; label: string } | null | undefined) {
    return {
        icon:  type ? (PROJECT_TYPE_MAP[type.key] ?? DEFAULT_ICON) : DEFAULT_ICON,
        label: type?.label ?? 'Projet',
    }
}