<script setup lang="ts">
import type { ProjectWithCover } from '#shared/types/project'

const cardRef = ref<HTMLElement | null>(null)
const { applyGlow } = useMouseGlow()

onMounted(() => {
  if (cardRef.value) applyGlow(cardRef.value)
})

const props = defineProps<{
  project: ProjectWithCover   // un seul projet
}>()

// Highlights pré-calculés localement — plus besoin du composable ici
const sortedHighlights = computed(() =>
    [...(props.project.highlights ?? [])].sort((a, b) => a.position - b.position)
)
</script>

<template>
  <article ref="cardRef" class="projects__card">
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
        <span v-for="tag in project.tags" :key="tag.name" class="projects__tag" :style="tag.color ? {
            color: tag.color,
            borderColor: tag.color,
            background: `${tag.color}26` // 26 en hex = 15% opacité
          } : {}"
        >
          {{ tag.name }}
        </span>
        <ProjectType v-if="project.type" :type="project.type" />
      </div>

      <h3 class="projects__title">{{ project.name }}</h3>
      <div class="projects__description" v-html="project.description"></div>
      <div class="projects__group">
        <ul v-if="sortedHighlights.length" class="project-detail__highlights" aria-label="Points forts">
          <li v-for="highlight in sortedHighlights" :key="highlight.label" class="project-detail__highlight">
            <ProjectHighlightBadge :label="highlight.label" />
          </li>
        </ul>

        <ul v-if="project.technologies?.length" class="projects__techs" aria-label="Technologies utilisées">
          <li v-for="tech in project.technologies" :key="tech.name" class="projects__tech">
            <ProjectTechnoBadge :label="tech.name" :src="`assets/icons/${tech.icon}.svg`" :name="tech.name"/>
          </li>
        </ul>
      </div>

      <NuxtLink
          :to="`/projects/${project.id}`"
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
