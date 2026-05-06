<script setup lang="ts">
import type { Project, ProjectScreenshot } from '~/shared/types/project'

const route = useRoute()
const id = route.params.id as string

const { data: project, pending, error } = await useFetch<Project>(`/api/projects/${id}`)

// ── Ordre lightbox : cover en premier, puis autres par position ASC (garanti Symfony)
const lightboxScreenshots = computed<ProjectScreenshot[]>(() => {
  if (!project.value?.screenshots.length) return []
  const cover = project.value.screenshots.find(s => s.isCover)
  const others = project.value.screenshots.filter(s => !s.isCover)
  return cover ? [cover, ...others] : [...others]
})

// ── Lightbox state
const lightboxOpen = ref(false)
const activeIndex = ref(0)
const slideDirection = ref<'next' | 'prev'>('next')

function openLightbox(index: number) {
  activeIndex.value = index
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function nextSlide() {
  if (activeIndex.value < lightboxScreenshots.value.length - 1) {
    slideDirection.value = 'next'
    activeIndex.value++
  }
}

function prevSlide() {
  if (activeIndex.value > 0) {
    slideDirection.value = 'prev'
    activeIndex.value--
  }
}

// Clavier : Échap + flèches directionnelles
function onKeyDown(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape')     closeLightbox()
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'ArrowLeft')  prevSlide()
}

onMounted(() => window.addEventListener('keydown', onKeyDown))
onUnmounted(() => window.removeEventListener('keydown', onKeyDown))

// Bloquer le scroll body quand lightbox ouverte
watch(lightboxOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

// ── Date
const formattedDate = computed(() => {
  if (!project.value?.date) return ''
  return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(
      new Date(project.value.date)
  )
})

// ── Technologies groupées par catégorie
const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Languages',
  backend:  'Frameworks / Librairies, CMS',
  devops:   'DevOps',
  database: 'Base de données',
  other:    'Outils et logiciels',
}
const CATEGORY_ORDER = ['frontend', 'backend', 'devops', 'database', 'other']

const groupedTechnologies = computed(() => {
  if (!project.value?.technologies.length) return []

  const map = new Map<string, typeof project.value.technologies>()
  for (const tech of project.value.technologies) {
    const cat = tech.category ?? 'other'
    if (!map.has(cat)) map.set(cat, [])
    map.get(cat)!.push(tech)
  }

  return CATEGORY_ORDER
      .filter(cat => map.has(cat))
      .map(cat => ({
        category: cat,
        label: CATEGORY_LABELS[cat] ?? cat,
        technologies: map.get(cat)!,
      }))
})

// ── SEO
useSeoMeta({
  title: () => project.value ? `${project.value.name} — Jonathan Loré` : 'Projet — Jonathan Loré',
  description: () => project.value?.description?.replace(/<[^>]+>/g, '').slice(0, 160) ?? '',
})
</script>

<template>
  <div class="project-detail">

    <!-- Back link -->
    <div class="container">
      <NuxtLink to="/#projects" class="project-detail__back">
        <span class="project-detail__back-arrow">←</span>
        Revenir aux projets
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="project-detail__loading container">
      <div class="project-detail__skeleton project-detail__skeleton--header" />
      <div class="project-detail__skeleton project-detail__skeleton--body" />
    </div>

    <!-- Error -->
    <div v-else-if="error" class="project-detail__error container">
      <p>Projet introuvable.</p>
      <NuxtLink to="/#projects">← Retour aux projets</NuxtLink>
    </div>

    <!-- Content -->
    <template v-else-if="project">

      <!-- Header -->
      <header class="project-detail__header container">
        <div class="project-detail__tags">
          <span
              v-for="tag in project.tags"
              :key="tag.name"
              class="project-detail__tag"
              :style="{ color: tag.color, borderColor: tag.color + '40', background: tag.color + '15' }"
          >
            {{ tag.name }}
          </span>
          <ProjectType v-if="project.type" :type="project.type" />
        </div>
        <div class="project-detail__title-date">
          <h1 class="project-detail__title">{{ project.name }}</h1>
          <p class="project-detail__date">Date du projet : {{ formattedDate }}</p>
        </div>
      </header>

      <!-- 2-col layout -->
      <div class="project-detail__body container">

        <!-- LEFT COLUMN -->
        <div class="project-detail__main">

          <!-- Screenshots card -->
          <div class="project-detail__card project-detail__card--screenshots">
            <div class="project-detail__card-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span>Screenshots</span>
            </div>

            <!-- Cover principale cliquable -->
            <div class="project-detail__cover" @click="openLightbox(0)">
              <img
                  :src="lightboxScreenshots[0]?.path"
                  :alt="lightboxScreenshots[0]?.alt"
                  class="project-detail__cover-img"
              />
              <div class="project-detail__cover-overlay" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>

            <!-- Thumbnails 4 par ligne -->
            <div v-if="lightboxScreenshots.length > 1" class="project-detail__thumbnails">
              <button
                  v-for="(screenshot, index) in lightboxScreenshots"
                  :key="screenshot.id"
                  class="project-detail__thumbnail"
                  :class="{ 'project-detail__thumbnail--active': lightboxOpen && activeIndex === index }"
                  :aria-label="`Voir screenshot ${index + 1}`"
                  @click="openLightbox(index)"
              >
                <img :src="screenshot.path" :alt="screenshot.alt" loading="lazy" />
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="project-detail__card">
            <h2 class="project-detail__section-title">À propos du projet</h2>
            <div class="project-detail__description" v-html="project.description" />
          </div>

          <!-- Features -->
          <div v-if="project.features?.length" class="project-detail__card">
            <h2 class="project-detail__section-title">Fonctionnalités clé</h2>
            <ul class="project-detail__features">
              <li
                  v-for="feature in project.features"
                  :key="feature.label"
                  class="project-detail__feature"
              >
                <IconFeature />
                {{ feature.label }}
              </li>
            </ul>
          </div>
        </div>

        <!-- RIGHT COLUMN (sidebar) -->
        <aside class="project-detail__sidebar">

          <!-- Highlights -->
          <div v-if="project.highlights?.length" class="project-detail__card">
            <h2 class="project-detail__card-title">Points forts</h2>
            <ul class="project-detail__highlights">
              <li
                  v-for="highlight in project.highlights"
                  :key="highlight.label"
                  class="project-detail__highlight"
              >
                <ProjectHighlightBadge :label="highlight.label" />
              </li>
            </ul>
          </div>

          <!-- Links -->
          <div v-if="project.githubUrl || project.siteUrl" class="project-detail__card">
            <h2 class="project-detail__card-title">Liens</h2>
            <div class="project-detail__links">
              <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-detail__link"
              >
                <svg class="project-detail__link-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                Voir le code source
                <svg class="project-detail__link-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <a
                  v-if="project.siteUrl"
                  :href="project.siteUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-detail__link"
              >
                <svg class="project-detail__link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                Demo live
                <svg class="project-detail__link-external" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Technologies -->
          <div v-if="groupedTechnologies.length" class="project-detail__card">
            <h2 class="project-detail__card-title">Technologies</h2>
            <div
                v-for="group in groupedTechnologies"
                :key="group.category"
                class="project-detail__tech-group"
            >
              <p class="project-detail__tech-category">{{ group.label }}</p>
              <div class="project-detail__tech-pills">
                <span
                    v-for="tech in group.technologies"
                    :key="tech.name"
                    class="project-detail__tech-pill"
                    :style="{
                    color: tech.color,
                    borderColor: tech.color ? tech.color + '40' : undefined,
                    background: tech.color ? tech.color + '26' : undefined,
                  }"
                >
                  <img
                      v-if="tech.icon"
                      :src="`/icons/${tech.icon}.svg`"
                      :alt="tech.name"
                      class="project-detail__tech-icon"
                  />
                  {{ tech.name }}
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </template>

    <!-- ── Lightbox ─────────────────────────────────────────── -->
    <Teleport to="body">
      <Transition name="lightbox-fade">
        <div
            v-if="lightboxOpen"
            class="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Galerie screenshots"
            @click.self="closeLightbox"
        >
          <!-- Fermer -->
          <button class="lightbox__close" aria-label="Fermer la galerie" @click="closeLightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <!-- Prev -->
          <button
              class="lightbox__nav lightbox__nav--prev"
              aria-label="Image précédente"
              :disabled="activeIndex === 0"
              @click="prevSlide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>

          <!-- Image avec transition slide -->
          <div class="lightbox__stage" @click.stop>
            <Transition :name="slideDirection === 'next' ? 'lb-slide-next' : 'lb-slide-prev'" mode="out-in">
              <img
                  :key="activeIndex"
                  :src="lightboxScreenshots[activeIndex]?.path"
                  :alt="lightboxScreenshots[activeIndex]?.alt"
                  class="lightbox__img"
              />
            </Transition>
            <p class="lightbox__counter">{{ activeIndex + 1 }} / {{ lightboxScreenshots.length }}</p>
          </div>

          <!-- Next -->
          <button
              class="lightbox__nav lightbox__nav--next"
              aria-label="Image suivante"
              :disabled="activeIndex === lightboxScreenshots.length - 1"
              @click="nextSlide"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>
      </Transition>
    </Teleport>

  </div>
</template>