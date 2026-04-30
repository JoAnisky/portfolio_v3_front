<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'

const { projects, isLoading, hasError, getCoverScreenshot, getSortedHighlights, getScreenshotUrl } = useProjects()
</script>


<template>
  <section id="projects" class="projects">

    <div class="projects__orb projects__orb--left" aria-hidden="true" />
    <div class="projects__orb projects__orb--right" aria-hidden="true" />

    <div class="container mx-auto px-6 py-24 lg:py-32">

      <!-- En-tête -->
      <div class="section-header">
        <h2 class="section-title">
          <span class="section-title-line" aria-hidden="true" />
          Projets
          <span class="section-title-line" aria-hidden="true" />
        </h2>
        <p class="section-quote">"Chaque projet est une idée qui a trouvé sa forme."</p>
      </div>

      <!-- Grille -->
      <div class="projects__grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

        <!-- Loading -->
        <template v-if="isLoading">
          <div v-for="n in 3" :key="`sk-${n}`" class="projects__skeleton">
            <div class="projects__skeleton-img" />
            <div class="projects__skeleton-body">
              <div class="projects__skeleton-line projects__skeleton-line--short" />
              <div class="projects__skeleton-line projects__skeleton-line--title" />
              <div class="projects__skeleton-line projects__skeleton-line--medium" />
              <div class="projects__skeleton-line projects__skeleton-line--medium" />
              <div class="projects__skeleton-line projects__skeleton-line--short" />
            </div>
          </div>
        </template>

        <!-- Erreur -->
        <template v-else-if="hasError">
          <div class="projects__error col-span-full">
            Impossible de charger les projets. Veuillez réessayer plus tard.
          </div>
        </template>

        <!-- Cards -->
        <template v-else>
          <article
              v-for="project in projects"
              :key="project.id"
              class="projects__card"
          >
            <!-- Screenshot -->
            <div class="projects__screenshot">
              <div class="projects__screenshot-bar" aria-hidden="true">
                <span /><span /><span />
              </div>
              <template v-if="getCoverScreenshot(project)">
                <img
                    :src="getScreenshotUrl(getCoverScreenshot(project)!.path)"
                    :alt="getCoverScreenshot(project)!.alt"
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

              <!-- Tags + type -->
              <div class="projects__meta">
                <span
                    v-for="tag in project.tags"
                    :key="tag.name"
                    class="projects__tag"
                >
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

              <!-- Titre -->
              <h3 class="projects__title">{{ project.name }}</h3>

              <!-- Description -->
              <p class="projects__description">{{ project.description }}</p>

              <!-- Highlights -->
              <ul
                  v-if="getSortedHighlights(project).length"
                  class="projects__highlights"
                  aria-label="Points forts"
              >
                <li
                    v-for="h in getSortedHighlights(project)"
                    :key="h.label"
                    class="projects__highlight"
                >
                  {{ h.label }}
                </li>
              </ul>

              <!-- Technologies -->
              <ul
                  v-if="project.technologies?.length"
                  class="projects__techs"
                  aria-label="Technologies utilisées"
              >
                <li
                    v-for="tech in project.technologies"
                    :key="tech.name"
                    class="projects__tech"
                >
                  <img
                      v-if="tech.icon"
                      :src="tech.icon"
                      :alt="tech.name"
                  />
                  <span :style="tech.color ? { color: tech.color } : {}">
                    {{ tech.name }}
                  </span>
                </li>
              </ul>

              <!-- CTA -->
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
      </div>

      <!-- CTA Github -->
      <div class="mt-16 flex justify-center">
        <a
            href="https://github.com/JoAnisky"
            target="_blank"
            rel="noopener noreferrer"
            class="projects__github-cta"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          Plus de projets sur Github
        </a>
      </div>
    </div>
  </section>
</template>