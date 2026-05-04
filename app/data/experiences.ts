import type { Technology }  from '#shared/types/project'
import { getTechs } from "~/data/tech-library";

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
            'Développement de solutions web sur-mesure pour des agences partenaires',
            'Architecture et déploiement d\'applications Nuxt 4 + Symfony sur infrastructure K3s',
            'Mise en place de pipelines CI/CD Jenkins et monitoring Prometheus/Grafana',
            'Evolution et maintenance d’un workflow d’automatisation parseur d’emails → n8n → WordPress',
        ],
        technologies: getTechs(['php', 'mysql', 'symfony', 'laravel', 'javascript', 'typescript', 'vuejs', 'nuxt', 'wordpress', 'docker', 'kubernetes', 'jenkins', 'n8n']),
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
            'Refonte du moteur de recherche d’un site de radiologie avec Meilisearch, Laravel, Vue JS',
        ],
        technologies: getTechs(['php', 'javascript', 'symfony', 'laravel', 'vuejs', 'wordpress', 'mysql', 'docker', 'n8n']),
    },
    {
        id: 3,
        title: 'Développeur Fullstack',
        company: '10Torsions évènements insolites',
        period: '2023 - 2024',
        badge: 'Alternance',
        description: [
            'Développement d\'une application de gestion des rotations pour les activités en équipe',
            'Rédaction de cahier des charges techniques',
            'Refonte graphique et fonctionnelle de l\'intranet de l\'entreprise',
            'Création d\'un module Wordpress pour transformer les demandes de contacts du site en devis sur l\'intranet',
        ],
        technologies: getTechs(['php', 'javascript', 'typescript', 'react', 'mysql', 'docker', 'figma', 'notion'])
    },
    {
        id: 4,
        title: 'Développeur web',
        company: 'Maty',
        period: '2022',
        badge: 'Stage',
        description: [
            'Développement d\'un outil d\'aide à la vente intégré au CRM interne',
            'Maquettage et prototypage Figma après recueil des besoins métier auprès des équipes de vente',
            'Démonstration du prototype fonctionnel',
        ],
        technologies: getTechs(['csharp', 'dotnet', 'figma'])
    },
    {
        id: 5,
        title: 'Sérigraphe & Infographiste',
        company: 'WDS Sérigraphie & PK Distribution',
        period: '2006 - 2012',
        badge: 'CDI',
        description: [
            'Création graphique et préparation de fichiers techniques pour impression',
            'Impression en sérigraphie et transferts sur vêtements + supports publicitaires',
            'Création de supports visuels (PAO) pour le print et le web (affiches, cartes de visites, flyers)',
        ],
        technologies: getTechs(['photoshop', 'illustrator'])
        ,
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
            'Conception et développement du jeu-concours Thé Tip Top de A à Z — cahier des charges, étude de marché, audit concurrentiel, Gantt, devis',
            'Architecture applicative complète : API REST Symfony/API Platform, Nuxt 4 TypeScript, MariaDB, tests unitaires/fonctionnels/e2e',
            'Workflow CI/CD Jenkins sur cluster Kubernetes (K3s) sur VPS Ubuntu — Traefik, Docker Hub, backups Restic chiffrés (VPS, Jenkins, BDD, dépôts git)',
            'Monitoring temps réel Prometheus & Grafana avec alerting Discord',
            'Design complet : maquettage Figma, logo, visuels (Illustrator, Photoshop), stratégie SEO & social marketing, conformité RGAA/NVDA',
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