<script setup lang="ts">
const links = [
  { label: 'Accueil',     to: '#hero' },
  { label: 'À propos',    to: '#about' },
  { label: 'Projets',     to: '#projects' },
  { label: 'Expériences', to: '#experiences' },
  { label: 'Contact',     to: '#contact' },
]
</script>

<template>
  <header class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
    <nav class="flex items-center gap-8 px-6 py-3 rounded-2xl border border-stroke bg-bg/70 backdrop-blur-md">

      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38" fill="none">
          <path d="M0.500002 27.5695L0.500003 9.56955L17 0.569549L33.5 9.56955L33.5 27.5695L17 36.5695L0.500002 27.5695Z" stroke="#0DCDEF"/>
          <path d="M25.9284 24.2899L27.3237 24.8399L25.9284 25.4476H21.2192L18.9518 23.8865V11.6207L20.696 14.9635C20.696 14.9635 19.9983 22.3966 20.696 23.4724C21.3936 24.5481 25.9284 24.2899 25.9284 24.2899Z" fill="#0DCDEF"/>
          <path d="M7.7503 24.2899L6.35498 24.8399L7.7503 25.4476H12.4595L14.7269 23.8865V11.6207L12.9827 14.9635C12.9827 14.9635 13.6804 22.3966 12.9827 23.4724C12.2851 24.5481 7.7503 24.2899 7.7503 24.2899Z" fill="#0DCDEF"/>
        </svg>
      </NuxtLink>

      <!-- Liens -->
      <ul class="flex items-center gap-1 flex-1 justify-center">
        <li v-for="link in links" :key="link.to">
          <NuxtLink
              :to="link.to"
              class="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors duration-200"
              :class="[
              $route.path === link.to
                ? 'bg-aurora-blue/10 text-aurora-blue'
                : 'text-muted hover:text-text'
            ]"
          >
            {{ link.label }}
          </NuxtLink>
        </li>
      </ul>

    </nav>
  </header>
</template>