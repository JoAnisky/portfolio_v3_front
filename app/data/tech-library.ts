import type { Technology } from '#shared/types/project'

export const TECH_LIBRARY = {
    clickup:     { name: 'ClickUp',     icon: 'clickup' },
    csharp:      { name: 'C#',          icon: 'csharp' },
    css:         { name: 'CSS',         icon: 'css' },
    docker:      { name: 'Docker',      icon: 'docker' },
    dotnet:      { name: '.NET',        icon: 'dotnet' },
    figma:       { name: 'Figma',       icon: 'figma' },
    git:         { name: 'Git',         icon: 'git' },
    grafana:     { name: 'Grafana',     icon: 'grafana' },
    html:        { name: 'HTML',        icon: 'html' },
    illustrator: { name: 'Illustrator', icon: 'illustrator' },
    javascript:  { name: 'JavaScript',  icon: 'javascript' },
    jenkins:     { name: 'Jenkins',     icon: 'jenkins' },
    kubernetes:  { name: 'Kubernetes',  icon: 'kubernetes' },
    laravel:     { name: 'Laravel',     icon: 'laravel' },
    linux:       { name: 'Linux',       icon: 'linux' },
    mysql:       { name: 'MySQL',       icon: 'mysql' },
    n8n:         { name: 'n8n',         icon: 'n8n' },
    notion:      { name: 'Notion',      icon: 'notion' },
    nuxt:        { name: 'Nuxt',        icon: 'nuxt' },
    photoshop:   { name: 'Photoshop',   icon: 'photoshop' },
    php:         { name: 'PHP',         icon: 'php' },
    phpstorm:    { name: 'PhpStorm',    icon: 'phpstorm' },
    react:       { name: 'React',       icon: 'react' },
    restic:      { name: 'Restic',      icon: 'restic' },
    scss:        { name: 'SCSS',        icon: 'scss' },
    symfony:     { name: 'Symfony',     icon: 'symfony' },
    tailwind:    { name: 'Tailwind',    icon: 'tailwind' },
    threejs:     { name: 'Three.js',    icon: 'threejs' },
    traefik:     { name: 'Traefik',     icon: 'traefik' },
    typescript:  { name: 'TypeScript',  icon: 'typescript' },
    vuejs:       { name: 'Vue.js',      icon: 'vuejs' },
    wordpress:   { name: 'WordPress',   icon: 'wordpress' },
} satisfies Record<string, Technology>

/**
 * Récupère une liste d'objets Technology à partir de leurs clés
 */
export const getTechs = (keys: (keyof typeof TECH_LIBRARY)[]): Technology[] => {
    return keys.map(key => TECH_LIBRARY[key])
}