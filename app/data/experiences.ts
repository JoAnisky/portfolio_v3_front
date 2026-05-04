import type { Technology }  from '#shared/types/project'

export interface TimelineItem {
    id: number
    title: string
    company: string
    period: string
    badge?: string
    description: string[]
    technologies?: Technology[]
    // Diplômes uniquement
    degree?: string
}

export const experiences: TimelineItem[] = [
    {
        id: 1,
        title: 'Développeur web Fullstack',
        company: 'Entreprise individuelle',
        period: '2025 - présent',
        badge: 'Freelance',
        description: [
            'Développement de solutions web sur-mesure pour des clients directs et agences partenaires',
            'Architecture et déploiement d\'applications Nuxt 4 + Symfony sur infrastructure K3s',
            'Mise en place de pipelines CI/CD Jenkins et monitoring Prometheus/Grafana',
            'Evolution et maintenance d’un workflow d’automatisation parseur d’emails → n8n → WordPress',
        ],
        technologies: [
            { name: 'Nuxt 4',   icon: 'nuxt' },
            { name: 'Symfony',  icon: 'symfony' },
            { name: 'Docker',   icon: 'docker' },
            { name: 'K3s',      icon: 'kubernetes' },
            { name: 'Jenkins',  icon: 'jenkins' },
        ],
    },
    {
        id: 2,
        title: 'Développeur Fullstack',
        company: 'Agence web Spin On',
        period: '2024 - 2025',
        badge: 'Alternance',
        description: [
            'Développement et maintenance d\'applications web pour des clients variés',
            'Intégration de solutions CMS WordPress avancées (Multisite, plugins custom)',
            'Développement d\'interfaces Vue.js et d\'APIs Laravel/Symfony',
            'Collaboration en équipe Agile avec revues de code régulières',
        ],
        technologies: [
            { name: 'Vue.js',     icon: 'vuejs' },
            { name: 'Laravel',    icon: 'laravel' },
            { name: 'WordPress',  icon: 'wordpress' },
            { name: 'MySQL',      icon: 'mysql' },
        ],
    },
    {
        id: 3,
        title: 'Développeur Fullstack',
        company: '10Torsions évènements insolites',
        period: '2023 - 2024',
        badge: 'Alternance',
        description: [
            'Conception et développement d\'un back-office de gestion des réservations événementielles',
            'Création d\'un module Wordpress pour transformer les demandes de contacts du site en devis sur l\'intranet',
            'Optimisation des performances et de l\'expérience utilisateur',
        ],
        technologies: [
            { name: 'PHP',    icon: 'php' },
            { name: 'JavaScript',    icon: 'javascript' },
            { name: 'TypeScript',    icon: 'typescript' },
            { name: 'React',     icon: 'react' },
            { name: 'MySQL', icon: 'mysql' },
            { name: 'Docker', icon: 'docker' },
            { name: 'Figma', icon: 'figma' },
            { name: 'Notion', icon: 'notion' },
        ],
    },
    {
        id: 4,
        title: 'Développeur web',
        company: 'Maty',
        period: '2022',
        badge: 'Stage',
        description: [
            'Développement de fonctionnalités e-commerce sur une boutique en ligne à fort trafic',
            'Correction de bugs et optimisation du parcours d\'achat',
            'Rédaction de documentation technique',
        ],
        technologies: [
            { name: 'C#',        icon: 'csharp' },
            { name: '.NET', icon: 'dotnet' },
            { name: 'Figma',        icon: 'figma' },
        ],
    },
    {
        id: 5,
        title: 'Sérigraphe & Infographiste',
        company: 'WDS Sérigraphie & PK Distribution',
        period: '2006 — 2012',
        badge: 'CDI',
        description: [
            'Création graphique et préparation de fichiers techniques pour impression',
            'Gestion de la chaîne de production sérigraphique',
            'Développement de l\'œil pour la composition visuelle et la couleur',
        ],
        technologies: [
            { name: 'Photoshop',   icon: 'photoshop' },
            { name: 'Illustrator', icon: 'illustrator' },
        ],
    },
]

export const diplomas: TimelineItem[] = [
    {
        id: 1,
        title: 'Expert en Stratégie & Transformation Digitale',
        company: 'Icadémie, Toulon (remote)',
        period: '2023 - 2025',
        badge: 'Obtenu',
        degree: 'Mastère - Bac+5',
        description: [
            'Stratégie digitale, innovation et conduite du changement',
            'Architecture des systèmes d\'information et transformation agile',
            'Management de projets complexes et pilotage par la data',
        ],
    },
    {
        id: 2,
        title: 'Concepteur Développeur d\'Applications',
        company: 'Access Code School, Besançon',
        period: '2022 - 2023',
        badge: 'Obtenu',
        degree: 'Titre RNCP - Bac+3',
        description: [
            'Conception et développement d\'applications web et mobiles',
            'Bases de données relationnelles et API REST',
            'Méthodologies Agile/Scrum et gestion de projet',
        ],
    },
    {
        id: 3,
        title: 'Développeur Web et Web Mobile',
        company: 'Access Code School, Besançon',
        period: '2021 - 2022',
        badge: 'Obtenu',
        degree: 'Titre RNCP - Bac+2',
        description: [
            'Développement frontend HTML/CSS/JavaScript',
            'Intégration WordPress et développement PHP',
            'Responsive design et accessibilité web',
        ],
    },
]