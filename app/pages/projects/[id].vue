<script setup lang="ts">
import type { Project, Screenshot } from '~/shared/types/project'

const route = useRoute()
const id = route.params.id as string

const { data: project, pending, error } = await useFetch<Project>(`/api/projects/${id}`)

// Screenshot actif (cover par défaut, puis thumbnails cliquables)
const coverScreenshot = computed(() =>
    project.value?.screenshots.find(s => s.isCover) ?? project.value?.screenshots[0]
)
const otherScreenshots = computed(() =>
    project.value?.screenshots.filter(s => s.id !== coverScreenshot.value?.id) ?? []
)
const activeScreenshot = ref<Screenshot>(coverScreenshot.value!)

// Sync quand les données arrivent (SSR)
watch(coverScreenshot, (val) => {
  if (val) activeScreenshot.value = val
}, { immediate: true })

// Date formatée
const formattedDate = computed(() => {
  if (!project.value?.date) return ''
  return new Intl.DateTimeFormat('fr-FR', { year: 'numeric', month: 'long' }).format(
      new Date(project.value.date)
  )
})

// Technologies groupées par catégorie
const CATEGORY_LABELS: Record<string, string> = {
  frontend:  'Frontend',
  backend:   'Backend',
  devops:    'DevOps',
  database:  'Base de données',
  other:     'Outils',
}
const CATEGORY_ORDER = ['frontend', 'backend', 'devops', 'database', 'other']

const groupedTechnologies = computed(() => {
  if (!project.value?.technologies) return []

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

// SEO
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
        </div>
        <h1 class="project-detail__title">{{ project.name }}</h1>
        <p class="project-detail__date">{{ formattedDate }}</p>
      </header>

      <!-- 2-col layout -->
      <div class="project-detail__body container">
        <!-- LEFT COLUMN -->
        <div class="project-detail__main">
          <!-- Screenshots -->
          <div class="project-detail__screenshots">
            <div class="project-detail__cover">
              <img
                  :src="activeScreenshot.path"
                  :alt="activeScreenshot.alt"
                  class="project-detail__cover-img"
              />
            </div>
            <div v-if="otherScreenshots.length" class="project-detail__thumbnails">
              <button
                  v-for="screenshot in otherScreenshots"
                  :key="screenshot.id"
                  class="project-detail__thumbnail"
                  :class="{ 'project-detail__thumbnail--active': activeScreenshot.id === screenshot.id }"
                  @click="activeScreenshot = screenshot"
              >
                <img :src="screenshot.path" :alt="screenshot.alt" />
              </button>
            </div>
          </div>

          <!-- Description -->
          <div class="project-detail__section">
            <h2 class="project-detail__section-title">À propos du projet</h2>
            <div class="project-detail__description" v-html="project.description" />
          </div>

          <!-- Features -->
          <div v-if="project.features?.length" class="project-detail__section">
            <h2 class="project-detail__section-title">Fonctionnalités clés</h2>
            <ul class="project-detail__features">
              <li
                  v-for="(feature, i) in project.features"
                  :key="i"
                  class="project-detail__feature"
              >
                <span class="project-detail__feature-dot" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>

        <!-- RIGHT COLUMN (sidebar) -->
        <aside class="project-detail__sidebar">
          <!-- Highlights -->
          <div v-if="project.highlights?.length" class="project-detail__card">
            <h3 class="project-detail__card-title">Points forts</h3>
            <ul class="project-detail__highlights">
              <li
                  v-for="(highlight, i) in project.highlights"
                  :key="i"
                  class="project-detail__highlight"
              >
                <HighlightBolt />
                {{ highlight }}
              </li>
            </ul>
          </div>

          <!-- Links -->
          <div v-if="project.githubUrl || project.siteUrl" class="project-detail__card">
            <h3 class="project-detail__card-title">Liens</h3>
            <div class="project-detail__links">
              <a
                  v-if="project.githubUrl"
                  :href="project.githubUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-detail__link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="21" fill="none">
                  <path d="m9.444 20.436-.01.002-.063.033-.018.004-.012-.004-.063-.034c-.01-.003-.017-.001-.022.005l-.003.01-.016.41.005.02.009.013.093.07.013.005.01-.004.093-.071.011-.016.004-.016-.016-.41c-.002-.01-.007-.016-.015-.017Zm.237-.109-.012.002-.165.09-.009.009-.003.01.017.413.004.012.007.007.18.089c.01.003.02 0 .025-.008l.004-.013-.03-.59c-.004-.011-.01-.018-.018-.021Zm-.638.002a.017.017 0 0 0-.013-.002.018.018 0 0 0-.01.008l-.006.013-.03.59c0 .011.005.019.015.023l.013-.002.18-.09.008-.007.004-.01.015-.414-.003-.011-.009-.01-.164-.088ZM3.847 4.032c-.223-.612-.214-1.312-.115-1.953a5.91 5.91 0 0 1 1.89 1.027c.25.206.577.272.882.173a7.742 7.742 0 0 1 2.412-.376c.856 0 1.67.134 2.41.375.304.1.631.033.88-.172a5.91 5.91 0 0 1 1.89-1.028c.098.64.106 1.34-.115 1.952-.133.369-.066.793.186 1.095.645.771.99 1.657.99 2.58 0 2.03-1.757 4.02-4.578 4.626-.706.152-.981 1.11-.441 1.657.347.352.56.847.56 1.399v2.88c0 .255.095.5.262.68a.86.86 0 0 0 .63.28.86.86 0 0 0 .63-.28 1 1 0 0 0 .262-.68v-2.88c0-.548-.107-1.068-.298-1.54 2.69-1.005 4.755-3.269 4.755-6.143 0-1.293-.431-2.482-1.147-3.478.187-.787.17-1.58.099-2.19-.063-.545-.152-1.26-.508-1.685-.53-.633-1.409-.26-2.033-.031-.67.243-1.307.58-1.894 1.003a9.477 9.477 0 0 0-2.54-.34c-.887 0-1.742.12-2.542.341A7.804 7.804 0 0 0 4.479.321C3.855.09 2.976-.282 2.446.35 2.082.785 2.006 1.442 1.94 2l-.004.037c-.072.61-.088 1.404.1 2.192C1.322 5.225.891 6.412.891 7.704c0 2.874 2.065 5.138 4.755 6.143-.194.48-.295.997-.298 1.52l-.15.033c-.639.095-1.048.01-1.326-.117-.678-.31-1.027-1.088-1.453-1.683-.266-.37-.653-.832-1.247-1.045a.833.833 0 0 0-.68.052.943.943 0 0 0-.447.556c-.075.241-.058.505.048.733a.915.915 0 0 0 .516.481c.497.179.842 1.097 1.157 1.504.333.43.775.88 1.409 1.17.608.278 1.322.377 2.173.265v.951a1 1 0 0 0 .262.68.86.86 0 0 0 .63.28.86.86 0 0 0 .63-.28 1 1 0 0 0 .262-.68v-2.88c0-.552.213-1.047.56-1.399.541-.549.265-1.505-.441-1.657-2.822-.606-4.577-2.597-4.577-4.627 0-.92.343-1.806.988-2.577.252-.302.318-.726.184-1.095Z" fill="#0DCDEF"/>
                </svg>
                GitHub
                <span class="project-detail__link-arrow">↗</span>
              </a>
              <a
                  v-if="project.siteUrl"
                  :href="project.siteUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="project-detail__link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none">
                  <path d="M.75 9.063a8.312 8.312 0 1 0 16.625 0 8.312 8.312 0 0 0-16.625 0Z" stroke="#0DCDEF" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M5.5 9.063c0-2.205.375-4.32 1.043-5.878C7.212 1.625 8.118.75 9.063.75c.944 0 1.85.876 2.519 2.435.668 1.559 1.043 3.673 1.043 5.877 0 2.205-.375 4.32-1.043 5.878-.668 1.56-1.575 2.435-2.52 2.435-.944 0-1.85-.876-2.519-2.435C5.875 13.381 5.5 11.267 5.5 9.063Z" stroke="#0DCDEF" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M1.344 11.834H16.78M1.344 6.292H16.78" stroke="#0DCDEF" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <span class="project-detail__link-dot" />
                Demo
              </a>
            </div>
          </div>

          <!-- Technologies -->
          <div v-if="groupedTechnologies.length" class="project-detail__card">
            <h3 class="project-detail__card-title">Technologies</h3>
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
  </div>
</template>