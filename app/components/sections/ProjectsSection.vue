<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
const { projects, isLoading, hasError } = useProjects()
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
          <ProjectCard
              v-for="project in projects"
              :key="project.id"
              :project="project"
          />
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