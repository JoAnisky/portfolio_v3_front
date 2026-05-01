export interface ProjectScreenshot {
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

export interface Technology {
    name: string
    icon: string
    color: string
}

export interface Tag {
    name: string
}

export interface Project {
    id: number
    name: string
    description: string
    screenshots: ProjectScreenshot[]
    highlights: ProjectHighlight[]
    features: ProjectFeature[]
    technologies: Technology[]
    tags: Tag[]
}

export interface ProjectWithCover extends Project {
    coverScreenshot: ProjectScreenshot | null
}