<script setup lang="ts">
import { experiences, diplomas, type TimelineItem } from '~/data/experiences'

type Tab = 'experiences' | 'diplomas'

const activeTab = ref<Tab>('experiences')

const currentItems = computed<TimelineItem[]>(() =>
    activeTab.value === 'experiences' ? experiences : diplomas
)

function getSide(index: number): 'left' | 'right' {
  return index % 2 === 0 ? 'left' : 'right'
}
</script>

<template>
  <section id="experiences" class="experiences">
    <div class="container mx-auto px-6 py-24 lg:py-10">

      <div class="section-header">
        <h2 class="section-title">Expériences & Diplômes</h2>
        <p class="section-quote">« Chaque étape a construit la suivante. »</p>
      </div>

      <div class="experiences__tabs" role="tablist">
        <button
            role="tab"
            :aria-selected="activeTab === 'experiences'"
            class="experiences__tab"
            :class="{ 'experiences__tab--active': activeTab === 'experiences' }"
            @click="activeTab = 'experiences'"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect x="2" y="7" width="20" height="14" rx="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <line x1="12" y1="12" x2="12" y2="16" />
            <line x1="10" y1="14" x2="14" y2="14" />
          </svg>
          Expériences
        </button>

        <button
            role="tab"
            :aria-selected="activeTab === 'diplomas'"
            class="experiences__tab"
            :class="{ 'experiences__tab--active': activeTab === 'diplomas' }"
            @click="activeTab = 'diplomas'"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
          Diplômes
        </button>
      </div>

      <Transition name="experiences__flip" mode="out-in">
        <div :key="activeTab" class="experiences__timeline">
          <div v-for="(item, index) in currentItems" :key="item.id" class="experiences__item" :class="`experiences__item--${getSide(index)}`">
            <article class="experiences__card">

              <header class="experiences__card-header">
                <h3 class="experiences__card-title">{{ item.title }}</h3>
                <span v-if="item.badge" class="experiences__badge" :class="{ 'experiences__badge--validated': item.badge === 'Obtenu' }">
                  <svg v-if="item.badge === 'Obtenu'" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {{ item.badge }}
                </span>
              </header>

              <p class="experiences__company">{{ item.company }}</p>
              <p v-if="item.degree" class="experiences__degree">{{ item.degree }}</p>
              <p class="experiences__period">{{ item.period }}</p>

              <ul class="experiences__description">
                <li v-for="(line, i) in item.description" :key="i" class="experiences__description-item">
                  <svg class="experiences__description-icon" width="6" height="9" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M0.750304 8.75L5.0762 5.28033C5.16304 5.21069 5.23192 5.12801 5.27891 5.03701C5.32591 4.94602 5.3501 4.84849 5.3501 4.75C5.3501 4.65151 5.32591 4.55398 5.27891 4.46299C5.23192 4.37199 5.16304 4.28931 5.0762 4.21967L0.750096 0.75" stroke="#1AD792" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  {{ line }}
                </li>
              </ul>

              <ul v-if="item.technologies?.length" class="projects__techs" aria-label="Technologies utilisées">
                <li v-for="tech in item.technologies" :key="tech.name" class="projects__tech">
                  <ProjectTechnoBadge :label="tech.name" :src="`assets/icons/${tech.icon}.svg`" :name="tech.name"/>
                </li>
              </ul>

            </article>
          </div>
        </div>
      </Transition>

    </div>
  </section>
</template>