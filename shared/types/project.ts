export interface ProjectScreenshot {
    id: string
    path: string
    alt: string
    isCover: boolean
    position: number
}

export interface ProjectHighlight {
    label: string
    position: number
}

export interface ProjectFeature {
    label: string
    position: number
}

export interface TechnologyCategory {
    key: 'Languages' | 'Frameworks' | 'DevOps' | 'Tools'
    label: string
}

export interface Technology {
    name: string
    icon: string
    category: TechnologyCategory  // ← objet { key, label } au lieu de string
}

export interface Tag {
    name: string
    color: string
}

export interface ProjectType {
    key: string
    label: string
}

export interface Project {
    id: string
    name: string
    date: string
    description: string
    githubUrl: string | null
    siteUrl: string | null
    context: 'perso' | 'pro'
    type: ProjectType | null
    screenshots: ProjectScreenshot[]
    highlights: ProjectHighlight[]
    features: ProjectFeature[]
    technologies: Technology[]
    tags: Tag[]
}

export interface ProjectWithCover extends Project {
    coverScreenshot: ProjectScreenshot | null
}