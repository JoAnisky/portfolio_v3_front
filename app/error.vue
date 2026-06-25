<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

useHead({ title: props.error.status === 404 ? 'Page introuvable' : 'Erreur' })

const handleGoHome = () => clearError({ redirect: '/' })

function handleNavClick(e: MouseEvent) {
  const anchor = (e.target as HTMLElement).closest('a')
  if (!anchor) return
  e.preventDefault()
  clearError({ redirect: anchor.getAttribute('href') ?? '/' })
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-bg">
    <div @click.capture="handleNavClick">
      <Navbar />
    </div>

    <div class="error-page">
      <div class="error-page__bg"></div>

      <div class="error-page__content">
        <span class="error-page__code">{{ error.status }}</span>

        <h1 class="error-page__title">Page introuvable</h1>

        <p class="error-page__message">
          Cette page s'est perdue quelque part entre les étoiles et les cimes.
        </p>

        <button class="error-page__cta" @click="handleGoHome">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour à l'accueil
        </button>
      </div>
    </div>
  </div>
</template>
