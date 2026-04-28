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
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M18 2L32 10V26L18 34L4 26V10L18 2Z"
              stroke="#0DCDEF"
              stroke-width="1.5"
              fill="none"
          />
          <text
              x="50%"
              y="54%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="#0DCDEF"
              font-family="Outfit, sans-serif"
              font-size="12"
              font-weight="600"
          >JL</text>
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