<script setup lang="ts">
import type { ProjectWithCover } from '#shared/types/project'

const props = defineProps<{
  project: ProjectWithCover   // un seul projet
}>()

// Highlights pré-calculés localement — plus besoin du composable ici
const sortedHighlights = computed(() =>
    [...(props.project.highlights ?? [])].sort((a, b) => a.position - b.position)
)
</script>

<template>
  <article class="projects__card">
    <!-- Screenshot -->
    <div class="projects__screenshot">
      <div class="projects__screenshot-bar" aria-hidden="true">
        <span /><span /><span />
      </div>
      <template v-if="project.coverScreenshot">
        <img
            :src="project.coverScreenshot.path"
            :alt="project.coverScreenshot.alt"
            loading="lazy"
            decoding="async"
        />
      </template>
      <div v-else class="projects__screenshot-placeholder">
        Aperçu non disponible
      </div>
    </div>

    <!-- Corps -->
    <div class="projects__body">
      <div class="projects__meta">
        <span v-for="tag in project.tags" :key="tag.name" class="projects__tag">
          {{ tag.name }}
        </span>
        <span class="projects__type">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          Site web
        </span>
      </div>

      <h3 class="projects__title">{{ project.name }}</h3>
      <p class="projects__description">{{ project.description }}</p>

      <ul v-if="sortedHighlights.length" class="projects__highlights" aria-label="Points forts">
        <li v-for="h in sortedHighlights" :key="h.label" class="projects__highlight">
          {{ h.label }}
        </li>
      </ul>

      <ul v-if="project.technologies?.length" class="projects__techs" aria-label="Technologies utilisées">
        <li v-for="tech in project.technologies" :key="tech.name" class="projects__tech">
          <img v-if="tech.icon" :src="tech.icon" :alt="tech.name" />
          <span :style="tech.color ? { color: tech.color } : {}">{{ tech.name }}</span>
        </li>
      </ul>

      <NuxtLink
          :to="`/projets/${project.id}`"
          class="projects__cta"
          :aria-label="`Voir les détails du projet ${project.name}`"
      >
        Voir les détails
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </NuxtLink>
    </div>
  </article>
</template>
